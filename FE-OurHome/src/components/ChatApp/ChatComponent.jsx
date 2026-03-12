import React, { useState, useEffect, useRef } from "react";
import "./ChatComponent.css";

const ChatComponent = ({
                           conversations = [],
                           messages = [],
                           currentUser = { id: 1, avatar: "S" },
                           onSendMessage = () => {},
                           onSelectConversation = () => {},
                           defaultConversationId = null,
                           showVoteSection = false,
                           voteSectionData = { username: "Seller Name", avatar: "S" },
                           customLabels = {
                               discussions: "Customer Chats",
                               placeholder: "Type your response...",
                               sendButton: "Send",
                               noConversation: "Select a customer to start chatting",
                               voteSection: "Your Account",
                           },
                       }) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const currentUserId = userData.id || currentUser.id;
    const currentUserAvatar = userData.picture || currentUser.avatar;

    const [selectedConversation, setSelectedConversation] = useState(defaultConversationId);
    const [messageInput, setMessageInput] = useState("");
    const [localMessages, setLocalMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const messagesContainerRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        try {
            const validMessages = Array.isArray(messages) ? messages : [];
            setLocalMessages(validMessages);
            console.log("Loaded messages:", validMessages);
        } catch (err) {
            console.error("Error loading messages:", err);
            setError("Failed to load messages.");
        } finally {
            setLoading(false);
        }
    }, [messages]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        try {
            const validConversations = Array.isArray(conversations) ? conversations : [];
            if (validConversations.length > 0 && !selectedConversation) {
                setSelectedConversation(validConversations[0].id);
            }
            console.log("Loaded conversations:", validConversations);
        } catch (err) {
            console.error("Error loading conversations:", err);
            setError("Failed to load conversations.");
        } finally {
            setLoading(false);
        }
    }, [conversations, selectedConversation]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [localMessages]);

    const handleConversationSelect = (id) => {
        setSelectedConversation(id);
        onSelectConversation(id);
        console.log("Selected conversation ID:", id);
    };

    const handleSendMessage = () => {
        if (messageInput.trim() && selectedConversation) {
            const selectedConv = conversations.find((conv) => conv.id === selectedConversation);
            const receiverId = selectedConv ? (selectedConv.senderId || selectedConv.receiverId || selectedConversation) : selectedConversation;
            const newMessage = {
                senderId: currentUserId,
                receiverId,
                content: messageInput,
                timestamp: new Date().toISOString(),
                status: "SENT",
                conversationId: selectedConversation,
            };
            console.log("Sending message:", newMessage);
            onSendMessage(newMessage, selectedConversation);
            setMessageInput("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const selectedConv = conversations.find((conv) => conv.id === selectedConversation);

    return (
        <div className="chat-container">
            <div className="sidebar">
                <div className="discussions-header">
                    <span className="section-title">{customLabels.discussions}</span>
                    <span className="settings-icon">⚙️</span>
                </div>
                <div className="conversations-list">
                    {loading && <div className="loading">Loading conversations...</div>}
                    {error && <div className="error">{error}</div>}
                    {!loading && !error && conversations
                        .filter((conv) => !conv.isVoteSection)
                        .map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => handleConversationSelect(conv.id)}
                                className={`conversation-item ${selectedConversation === conv.id ? "selected" : ""}`}
                            >
                                <div className="conversation-content">
                                    {conv.avatar ? (
                                        <img
                                            src={conv.avatar}
                                            alt={conv.sender}
                                            className="avatar secondary-avatar"
                                        />
                                    ) : (
                                        <div className="avatar secondary-avatar">
                                            {conv.sender?.charAt(0)}
                                        </div>
                                    )}
                                    <div className="conversation-details">
                                        <div className="conversation-meta">
                                            <span className="sender-name">{conv.sender}</span>
                                            <span className="message-time">{conv.time}</span>
                                        </div>
                                        <p className="last-message">{conv.lastMessage}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="chat-area">
                {loading && <div className="loading">Loading messages...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && (selectedConversation && selectedConv ? (
                    <>
                        <div className="sl-chat-header">
                            {selectedConv.avatar ? (
                                <img
                                    src={selectedConv.avatar}
                                    alt={selectedConv.sender}
                                    className="avatar chat-avatar"
                                />
                            ) : (
                                <div className="avatar chat-avatar">
                                    {selectedConv.sender?.charAt(0)}
                                </div>
                            )}
                            <div className="chat-info">
                                <h3 className="chat-title">Conversation</h3>
                                <span className="chat-subtitle">{selectedConv.sender}</span>
                            </div>
                        </div>
                        <div className="date-separator">
                            <span className="date-badge">
                                {new Date().toLocaleDateString("vi-VN", {
                                    timeZone: "Asia/Ho_Chi_Minh",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </span>
                        </div>
                        <div className="messages-container" ref={messagesContainerRef}>
                            {localMessages.map((msg) => {
                                if (!msg.id || !msg.content) {
                                    console.warn("Invalid message:", msg);
                                    return null;
                                }
                                console.log(
                                    "msg.senderId:",
                                    msg.senderId,
                                    "currentUserId:",
                                    currentUserId,
                                    Number(msg.senderId) === Number(currentUserId)
                                );
                                return (
                                    <div
                                        key={msg.id}
                                        className={`message-wrapper ${
                                            Number(msg.senderId) === Number(currentUserId)
                                                ? "admin-message"
                                                : "user-message"
                                        }`}
                                    >
                                        <div
                                            className={`message-bubble ${
                                                Number(msg.senderId) === Number(currentUserId)
                                                    ? "admin-bubble"
                                                    : "user-bubble"
                                            }`}
                                        >
                                            {msg.content}
                                            <div className="message-timestamp">
                                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="message-input-container">
                            {currentUserAvatar ? (
                                <img
                                    src={currentUserAvatar}
                                    alt="avatar"
                                    className="input-avatar avatar"
                                />
                            ) : (
                                <div className="input-avatar avatar">
                                    {currentUserId.toString().charAt(0)}
                                </div>
                            )}
                            <input
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={customLabels.placeholder}
                                className="message-input"
                                disabled={loading}
                            />
                            <button
                                onClick={handleSendMessage}
                                className="send-button"
                                disabled={!messageInput.trim() || loading}
                            >
                                {customLabels.sendButton}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="chat-placeholder">{customLabels.noConversation}</div>
                ))}
            </div>
        </div>
    );
};

export default ChatComponent;