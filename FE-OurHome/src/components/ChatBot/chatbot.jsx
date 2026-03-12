import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  FaComments,
  FaTimes,
  FaChevronDown,
  FaSmile,
  FaPaperclip,
  FaPaperPlane,
  FaRobot,
} from "react-icons/fa";
import "./chatbot.css";

const Chatbot = () => {
  const API_KEY = "AIzaSyAGRj31ZePDQFE290ezqWf71uFuKPzBVYI";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  // React state
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello, I'm a chatbot. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Refs
  const chatBodyRef = useRef(null);
  const messageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 768) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile({
          data: e.target.result,
          name: file.name,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Cancel file upload
  const handleCancelFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle emoji selection
  const handleEmojiSelect = (emojiObject) => {
    setInputMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  // Generate bot response
  const generateBotResponse = async (userMessage, userFile = null) => {
    const newHistory = [
      ...chatHistory,
      {
        role: "user",
        parts: [
          { text: userMessage },
          ...(userFile ? [{ inline_data: userFile }] : []),
        ],
      },
    ];

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: newHistory,
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      const apiResponseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text
          ?.replace(/\*\*(.*?)\*\*/g, "$1\n")
          ?.trim() || "";

      // Update chat history
      setChatHistory([
        ...newHistory,
        {
          role: "model",
          parts: [{ text: apiResponseText }],
        },
      ]);

      return apiResponseText;
    } catch (error) {
      console.error("Error sending message:", error);
      return "Error: Failed to send message.";
    }
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedFile) return;

    const userMessage = inputMessage.trim();
    const messageId = Date.now();

    // Add user message to chat
    const newUserMessage = {
      id: messageId,
      type: "user",
      content: userMessage,
      file: selectedFile,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setSelectedFile(null);
    setIsTyping(true);

    // Add typing indicator
    const typingMessage = {
      id: messageId + 1,
      type: "bot",
      content: "",
      isTyping: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, typingMessage]);

    // Generate bot response
    const botResponse = await generateBotResponse(userMessage, selectedFile);

    // Remove typing indicator and add bot response
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === typingMessage.id
          ? { ...msg, content: botResponse, isTyping: false }
          : msg
      )
    );

    setIsTyping(false);
  };

  // Toggle chatbot
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      <button
        id="chatbot-toggler"
        onClick={toggleChatbot}
        className={isChatbotOpen ? "active" : ""}
      >
        {isChatbotOpen ? <FaTimes /> : <FaComments />}
      </button>

      <div className={`chatbot-popup ${isChatbotOpen ? "show" : ""}`}>
        <div className="chat-header">
          <div className="header-info">
            <FaRobot className="chatbot-logo" />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button
            id="close-chatbot"
            onClick={toggleChatbot}
            className="close-btn"
          >
            <FaChevronDown />
          </button>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}-message`}>
              {message.type === "bot" && <FaRobot className="bot-avatar" />}
              <div className="message-text">
                {message.isTyping ? (
                  <div className="thinking-indicator">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                ) : (
                  <>
                    <p>{message.content}</p>
                    {message.file && (
                      <img
                        src={message.file.data}
                        alt={message.file.name}
                        className="attachment"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <textarea
              ref={messageInputRef}
              placeholder="Message..."
              className="message-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              required
            />
            <div className="chat-controls">
              <button
                type="button"
                id="emoji-picker"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <FaSmile />
              </button>

              <div
                className={`file-upload-wrapper ${
                  selectedFile ? "file-uploaded" : ""
                }`}
              >
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />
                {selectedFile && (
                  <img src={selectedFile.data} alt="Selected file" />
                )}
                <button
                  type="button"
                  id="file-upload"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaPaperclip />
                </button>
                {selectedFile && (
                  <button
                    type="button"
                    id="file-cancel"
                    onClick={handleCancelFile}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              <button
                id="send-message"
                type="submit"
                disabled={!inputMessage.trim() && !selectedFile}
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>

          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <EmojiPicker
                onEmojiClick={handleEmojiSelect}
                theme="light"
                skinTonePosition="none"
                previewPosition="none"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chatbot;
