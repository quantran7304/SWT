import React, { useState, useEffect, useRef } from "react";
import "./Notification.css";
import { getNotifications, markAsRead } from "../../services/notificationServices"; // Adjust path as needed

const Notification = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const notificationRef = useRef(null);

    const [userId, setUserId] = useState(null);

    // Fetch userId from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserId(user.id ? parseInt(user.id, 10) : null); // Parse id as integer if possible
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
            }
        }
    }, []);

    // Đóng box thông báo khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        };

        if (isNotificationOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isNotificationOpen]);

    // Fetch notifications when dropdown opens and userId is available
    useEffect(() => {
        if (isNotificationOpen && userId) {
            fetchNotifications();
        }
    }, [isNotificationOpen, userId]);

    const fetchNotifications = async () => {
        try {
            const data = await getNotifications(userId);
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await markAsRead(id, userId);
            // Refetch notifications after marking as read
            fetchNotifications();
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    // Simple relative time formatter (assuming createdAt is ISO date string)
    const formatRelativeTime = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInMs = now - date;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays >= 1) {
            return `${diffInDays} days ago`;
        } else if (diffInHours >= 1) {
            return `${diffInHours} hours ago`;
        } else if (diffInMinutes >= 1) {
            return `${diffInMinutes} minutes ago`;
        } else {
            return 'Just now';
        }
    };

    // Toggle notification dropdown
    const toggleNotification = () => {
        console.log("Toggling notification dropdown");
        setIsNotificationOpen(!isNotificationOpen);
    };

    return (
        <div className="notification-container" ref={notificationRef}>
            <button
                onClick={toggleNotification}
                className="notification-button"
                aria-label="Notifications"
            >
                {typeof window !== "undefined" ? (
                    <svg
                        className="notification-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                ) : (
                    <span role="img" aria-label="bell">🔔</span>
                )}
            </button>
            {isNotificationOpen && (
                <div className="notification-dropdown">
                    <div className="notification-content">
                        <h3 className="notification-title">Notifications</h3>
                        <ul className="notification-list">
                            {notifications.length > 0 ? (
                                notifications.map((notif) => (
                                    <li
                                        key={notif.id}
                                        className={`notification-item ${notif.isRead ? 'read' : 'unread'}`}
                                        onClick={() => !notif.isRead && handleMarkAsRead(notif.id)}
                                    >
                                        <p className="notification-text">{notif.message || notif.text}</p> {/* Assuming 'message' or 'text' field */}
                                        <p className="notification-time">
                                            {formatRelativeTime(notif.createdAt)}
                                        </p> {/* Assuming 'createdAt' field */}
                                    </li>
                                ))
                            ) : (
                                <li className="notification-item">
                                    <p className="notification-text">No notifications</p>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;