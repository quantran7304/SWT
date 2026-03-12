import axios from "axios";

const API_URL = "http://localhost:8082/api/customers";
const API_URL_Favourite = "http://localhost:8082/api/favourites";

export const getUserInformation = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Lỗi khi lấy thông tin người dùng");
    }
};

export const updateUserInformation = async (userId, userDTO) => {
    try {
        const response = await axios.put(
            `${API_URL}/${userId}`,
            userDTO,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Lỗi khi cập nhật thông tin người dùng";
        return { success: false, message };
    }
};

export const updateAvatarProfile = async (userId, formData) => {
    try {
        console.log("➡️ Updating profile image:", {
            userId,
            hasFile: formData.has("avatar"),
        });
        const response = await axios.put(
            `${API_URL}/${userId}/avatar`,
            formData
        );
        console.log("➡️ Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật avatar:", error.response?.data || error.message);
        const message = error.response?.data?.message || "Lỗi khi cập nhật ảnh đại diện";
        return { success: false, message };
    }
};

export const addToFavourite = async (userId, propertyId) => {
    try {
        const response = await axios.post(`${API_URL_Favourite}/add`, {
            userId: userId,
            propertyId: parseInt(propertyId)
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to favourite:', error);
        throw error;
    }
};


export default {
    getUserInformation,
    updateUserInformation,
    updateAvatarProfile,
    addToFavourite,
};