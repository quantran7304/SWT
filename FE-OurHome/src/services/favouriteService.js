import axios from 'axios';

const API_URL = "http://localhost:8082/api/favourites";

const getWishlist = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/list?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }
};

const removeFromWishlist = async (favouriteId, userId, propertyId) => {
    try {
        const response = await axios.delete(`${API_URL}/remove`, {
            data: { favouriteId, userId, propertyId } // Gửi cả favouriteId, userId, và propertyId
        });
        return response.data.success;
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
    }
};


export { getWishlist, removeFromWishlist };