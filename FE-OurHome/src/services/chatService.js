import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const API_URL = "http://localhost:8082/api/chat";
const WS_URL = "http://localhost:8082/ws-chat";

class ChatService {
  constructor() {
    this.client = null;
    this.subscriptions = {}; // Store subscriptions by conversationId
  }

  // Initialize WebSocket connection
  connectWebSocket(userId, onMessageReceived) {
    const socket = new SockJS(WS_URL);
    this.client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("WebSocket connected for user:", userId);
        this.subscriptions[`user-${userId}`] = this.client.subscribe(
            `/topic/${userId}`, // Fallback
            (message) => {
              const newMessage = JSON.parse(message.body);
              console.log("Fallback message received:", newMessage);
              onMessageReceived(newMessage);
            }
        );
      },
      onStompError: (error) => {
        console.error("WebSocket error:", error);
      },
    });
    this.client.activate();
  }

  // Subscribe to a specific conversation
  subscribeToConversation(conversationId, onMessageReceived) {
    if (this.client && this.client.connected) {
      console.log("Subscribing to /topic/conversation/" + conversationId);
      const subscription = this.client.subscribe(
          `/topic/conversation/${conversationId}`,
          (message) => {
            const newMessage = JSON.parse(message.body);
            console.log("Received message for conversation:", newMessage);
            if (newMessage && newMessage.conversationId === conversationId) {
              onMessageReceived(newMessage);
            }
          }
      );
      this.subscriptions[conversationId] = subscription;
      return subscription;
    } else {
      console.error("WebSocket not connected for conversation subscription");
      return null;
    }
  }

  // Unsubscribe from a specific conversation
  unsubscribe(subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  // Disconnect WebSocket
  disconnectWebSocket() {
    if (this.client) {
      Object.values(this.subscriptions).forEach((subscription) =>
          subscription.unsubscribe()
      );
      this.subscriptions = {};
      this.client.deactivate();
    }
  }

  // Send message via WebSocket
  sendMessage(messageDTO) {
    if (this.client && this.client.connected) {
      console.log("Sending message:", messageDTO);
      this.client.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(messageDTO),
      });
    } else {
      console.error("WebSocket not connected");
    }
  }

  // Fetch conversations
  async getConversations(userId) {
    try {
      const response = await axios.get(`${API_URL}/conversations/${userId}`);
      console.log("API response for conversations:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  }

  // Fetch messages between users
  async getMessages(userId, conversationId) {
    try {
      const response = await axios.get(
          `${API_URL}/messages/${userId}/${conversationId}`
      );
      console.log("API response for messages:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }
}

export default new ChatService();