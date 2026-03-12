import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/memberships'; // Cập nhật URL nếu khác

export const fetchMemberships = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("❌ Failed to fetch memberships:", error);
        throw error;
    }
};

export const getMembershipById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch membership');
    }
};

export const createMembership = async (membership) => {
    try {
        const response = await axios.post(BASE_URL, membership);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create membership');
    }
};

export const updateMembership = async (id, membership) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, membership);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update membership');
    }
};

export const disableMembership = async (id) => {
    try {
        await axios.put(`${BASE_URL}/${id}/disable`);
    } catch (error) {
        throw new Error('Failed to disable membership');
    }
};