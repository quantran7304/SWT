import React, { useState, useEffect, useRef } from "react";
import "../../page/ChatApp/MessagePage.css";
import ChatComponent from "../../components/ChatApp/ChatComponent";
import ChatService from "../../services/chatService";

const ChatSeller = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setLoading(true);
      ChatService.getConversations(parsedUser.id)
          .then((data) => {
            setConversations(data || []);
            if (data && data.length > 0) {
              setSelectedConversation(data[0].id); // Tự động chọn cuộc trò chuyện đầu tiên
            }
          })
          .catch((error) => {
            console.error("Failed to load conversations:", error);
            setError("Không thể tải cuộc trò chuyện.");
          })
          .finally(() => setLoading(false));

      ChatService.connectWebSocket(parsedUser.id, (msg) => {
        if (msg && msg.conversationId === selectedConversation) {
          setMessages((prev) => [...prev, msg]);
        }
      });
    } else {
      console.error("Không tìm thấy người dùng trong localStorage");
    }

    return () => {
      ChatService.disconnectWebSocket();
    };
  }, [selectedConversation]);

  const handleSelectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
    if (currentUser) {
      setLoading(true);
      setError(null);
      const selectedConv = conversations.find((c) => c.id === conversationId);

      ChatService.getMessages(currentUser.id, conversationId)
          .then((data) => {
            setMessages(data || []);
          })
          .catch((error) => {
            console.error("Lỗi khi tải tin nhắn:", error);
            setError("Không thể tải tin nhắn.");
          })
          .finally(() => setLoading(false));

      if (subscriptionRef.current) {
        ChatService.unsubscribe(subscriptionRef.current);
      }
      subscriptionRef.current = ChatService.subscribeToConversation(
          conversationId,
          (msg) => {
            if (msg && msg.conversationId === conversationId) {
              setMessages((prev) => [...prev, msg]);
            }
          }
      );
    }
  };

  const handleSendMessage = (newMessage, conversationId) => {
    if (currentUser) {
      const selectedConv = conversations.find((c) => c.id === conversationId);
      const otherUserId = selectedConv
          ? parseInt(selectedConv.userId1) === parseInt(currentUser.id)
              ? selectedConv.userId2
              : selectedConv.userId1
          : null;

      if (otherUserId) {
        const updatedMessage = {
          ...newMessage,
          senderId: currentUser.id,
          receiverId: otherUserId,
          conversationId,
        };
        ChatService.sendMessage(updatedMessage);
      } else {
        console.error("Không tìm thấy người nhận trong cuộc trò chuyện.");
      }
    }
  };

  if (!currentUser) {
    return <div>Đang tải dữ liệu người dùng...</div>;
  }

  return (
      <div className="seller-dashboard-layout">
        <div className="page-message-wrapper">
          <div className="page-message-container">
            <ChatComponent
                conversations={conversations}
                messages={messages}
                currentUser={{
                  id: currentUser.id,
                  avatar: currentUser.avatar || "S",
                }}
                onSendMessage={handleSendMessage}
                onSelectConversation={handleSelectConversation}
                defaultConversationId={null}
                showVoteSection={true}
                voteSectionData={{
                  username: currentUser.username || "Seller Name",
                  avatar: currentUser.avatar || "S",
                }}
                customLabels={{
                  discussions: "Customer Chats",
                  placeholder: "Type your response...",
                  sendButton: "Send",
                  noConversation: "Select a customer to start chatting",
                  voteSection: "Your Account",
                }}
            />
            {loading && <div className="loading">Đang tải...</div>}
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      </div>
  );
};

export default ChatSeller;
