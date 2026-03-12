// src/services/NotificationService.js

const API_BASE_URL = 'http://localhost:8082/api/notifications'; // Có thể config từ env nếu cần

export const getNotifications = async (userId) => {
    const response = await fetch(`${API_BASE_URL}?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch notifications');
    }
    return response.json();
};

export const getUnreadNotifications = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/unread?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch unread notifications');
    }
    return response.json();
};

export const markAsRead = async (id, userId) => {
    const response = await fetch(`${API_BASE_URL}/${id}/read?userId=${userId}`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to mark as read');
    }
    return response; // Không cần json vì endpoint trả về void
};