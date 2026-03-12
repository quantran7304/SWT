import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api/admin'; // Adjust to your backend URL

//Overview
export const fetchDashboardData = async () => {
    const res = await axios.get(`${API_BASE_URL}/dashboard`);
    return res.data;
};


export const fetchTopSelling = async () => {
    try {
        const response = await  axios.get(`${API_BASE_URL}/top-selling`);
        return response.data;
    } catch (error) {
        console.error("Error in fetchTopSelling:", error);
        throw error;
    }
};


//User Management
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const updateUserRole = async (userId, roleId) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update-role/${userId}`, null, {
            params: { roleId },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
};

export const banUser = async (userId) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/ban-account/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error banning user:', error);
        throw error;
    }
};

export default {
    fetchDashboardData,
    getAllUsers,
    updateUserRole,
    banUser,
}