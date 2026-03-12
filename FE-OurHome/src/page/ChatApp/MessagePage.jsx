import React, { useState, useEffect } from "react";
import "./MessagePage.css";
import Navbar from "../../components/Navigation/Header";
import Footer from "../../components/Footer/Footer";
import ChatComponent from "../../components/ChatApp/ChatComponent";
import ChatService from "../../services/chatService";
import { useRef } from "react";

const MessagePage = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    console.log("ChatService:", ChatService);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setLoading(true);
      setError(null);
      ChatService.getConversations(parsedUser.id)
          .then((data) => {
            console.log("Fetched conversations:", data);
            setConversations(data || []);
            if (data && data.length > 0) {
              setSelectedConversation(data[0].id); // Chọn conversation đầu tiên
            }
          })
          .catch((error) => {
            console.error("Lỗi khi lấy danh sách cuộc trò chuyện:", error);
            setError("Không thể tải danh sách cuộc trò chuyện.");
          })
          .finally(() => setLoading(false));
      ChatService.connectWebSocket(parsedUser.id, (msg) => {
        console.log("WebSocket message received:", msg);
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
      const selectedConv = conversations.find((conv) => conv.id === conversationId);

        ChatService.getMessages(currentUser.id, conversationId)
            .then((data) => {
              console.log("Fetched messages for conversation:", data);
              setMessages(data || []);
            })
            .catch((error) => {
              console.error("Lỗi khi lấy tin nhắn:", error);
              setError("Không thể tải tin nhắn cho cuộc trò chuyện này.");
            })
            .finally(() => setLoading(false));
      if (subscriptionRef.current) {
        ChatService.unsubscribe(subscriptionRef.current);
        subscriptionRef.current = null;
      }
      if (conversationId && ChatService.subscribeToConversation) {
        subscriptionRef.current = ChatService.subscribeToConversation(
            conversationId,
            (msg) => {
              console.log("Subscribed message:", msg);
              if (msg && msg.conversationId === conversationId) {
                setMessages((prev) => [...prev, msg]);
              }
            }
        );
      }
    }
  };

    const handleSendMessage = (newMessage, conversationId) => {
        if (currentUser) {
            const selectedConv = conversations.find((conv) => conv.id === conversationId);
            console.log("Selected conversation:", selectedConv);

            const otherUserId = selectedConv
                ? (parseInt(selectedConv.userId1) === parseInt(currentUser.id)
                    ? selectedConv.userId2
                    : selectedConv.userId1)
                : null;

            console.log("Other user ID:", otherUserId);

            if (otherUserId) {
                const updatedMessage = {
                    ...newMessage,
                    senderId: currentUser.id,
                    receiverId: otherUserId,
                    conversationId,
                };
                console.log("Sending message:", updatedMessage);
                ChatService.sendMessage(updatedMessage);
            } else {
                console.error("Không tìm thấy otherUserId cho conversationId:", conversationId);
            }
        }
    };



    if (!currentUser) {
    return <div>Đang tải dữ liệu người dùng...</div>;
  }

  return (
      <>
        <Navbar />
        <div className="page-message-wrapper">
          <div className="page-message-container">
            <ChatComponent
                conversations={conversations}
                messages={messages}
                currentUser={{ id: currentUser.id, avatar: currentUser.avatar || "S" }}
                onSendMessage={handleSendMessage}
                onSelectConversation={handleSelectConversation}
                defaultConversationId={null}
                showVoteSection={true}
                voteSectionData={{ username: currentUser.username || "Tên người bán", avatar: currentUser.avatar || "S" }}
                customLabels={{
                  discussions: "Cuộc trò chuyện với khách hàng",
                  placeholder: "Nhập câu trả lời của bạn...",
                  sendButton: "Gửi",
                  noConversation: "Chọn một khách hàng để bắt đầu trò chuyện",
                  voteSection: "Tài khoản của bạn",
                }}
            />
            {loading && <div className="loading">Đang tải...</div>}
            {error && <div className="error">{error}</div>}
          </div>
        </div>
        <Footer />
      </>
  );
};

export default MessagePage;