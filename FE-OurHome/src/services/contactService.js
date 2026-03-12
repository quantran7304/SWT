import axios from "axios";


const URL_API = "http://localhost:8082/api/contact";


export const createContact = async (userId, propertyId) => {
    try {
        const response = await axios.post(URL_API, {
            userId,
            propertyId,
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo booking:", error.response?.data || error.message);
        return { success: false, message: "Lỗi khi lưu booking" };
    }
};


export const getAllBookings = async () => {
    try {
        const response = await axios.get(`${URL_API}/all`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách booking:", error);
        return [];
    }
};


export const markAsViewed = async (UserId) => {
    try {
        const response = await axios.put(`${URL_API}/${UserId}/view`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái đã xem:", error);
        return null;
    }
};

export const fetchSellerContacts = async (sellerUserId) => {
    if (!sellerUserId || sellerUserId <= 0) {
        throw new Error("ID người bán không hợp lệ");
    }

    try {
        const response = await axios.get(`${URL_API}/${sellerUserId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi fetch danh sách liên hệ người bán:", error);
        throw error;
    }
};

export default {
    createContact,
    getAllBookings,
    markAsViewed,
    fetchSellerContacts
};