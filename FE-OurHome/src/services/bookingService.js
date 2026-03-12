import axios from "axios";

const API_URL = "http://localhost:8082/api/contact";

export const createBooking = async (userId, propertyId) => {
  try {
    const response = await axios.post(API_URL, {
      userId,
      propertyId,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo booking:", error.response?.data || error.message);
    return { success: false, message: "Lỗi khi lưu booking" };
  }
};

//Seller Dashboard
export const markAsViewed = async (contactId) => {
  try {
    const response = await axios.put(`${API_URL}/${contactId}/view`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đã xem:", error);
    return null;
  }
};

//using for admin page
export const getAllBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách booking:", error);
    return [];
  }
};


