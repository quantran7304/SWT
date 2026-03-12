import axios from 'axios';

const API_BASE = 'http://localhost:8082/api/seller';

export const getAllSellers = async () => {
    try {
        const response = await axios.get(`${API_BASE}`);
        return response.data; // mảng UserEntity
    } catch (error) {
        console.error('Failed to fetch sellers:', error);
        throw error;
    }
};

export const getListingsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching listings:', error);
        throw error;
    }
};


export default {
    getAllSellers,
    getListingsByUserId,
};