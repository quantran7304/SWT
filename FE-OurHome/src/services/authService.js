import axios from "axios";

const API_URL = "http://localhost:8082/api/auth";

// Function to update user data and trigger UI update
export const updateUserData = (userData) => {
  try {
    localStorage.setItem("user", JSON.stringify(userData));
    // Trigger custom event để UserAvatar và Header cập nhật
    window.dispatchEvent(new CustomEvent("userDataUpdated"));
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
};

// Hàm tiện ích để xác định đường dẫn chuyển hướng dựa trên vai trò người dùng
export const getRoleBasedRedirectPath = (role) => {
  switch (role?.toLowerCase()) {
    case "customer":
      return "/";
    case "seller":
      return "/seller/dashboard"; // Chuyển hướng về seller dashboard
    case "admin":
      return "/admin/dashboard"; // Chuyển hướng về admin dashboard
    default:
      return "/"; // Mặc định chuyển hướng về trang chủ
  }
};

export const login = async (email, password) => {
  try {
    // Gửi đúng body mà backend đang yêu cầu
    const response = await axios.post(
      `${API_URL}/login`,
      {
        email, // hoặc username nếu backend yêu cầu
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Kiểm tra phản hồi từ backend
    const data = response.data;

    if (data && data.success) {
      // Lưu user vào localStorage và trigger UI update
      updateUserData(data);

      // Lưu token nếu có
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Lưu role nếu có
      if (data.role) {
        localStorage.setItem("role", data.role);
      }

      // Xác định đường dẫn chuyển hướng dựa trên role
      const redirectPath = getRoleBasedRedirectPath(data.role);

      return {
        success: true,
        message: data.message || "Login successful",
        data: data,
        redirectPath: redirectPath,
      };
    } else {
      // Đăng nhập thất bại có phản hồi hợp lệ từ BE
      return {
        success: false,
        message: data.message || "Invalid credentials",
      };
    }
  } catch (error) {
    let errorMessage = "Đã xảy ra lỗi khi đăng nhập";

    if (error.response) {
      const data = error.response.data;
      if (typeof data === "string") {
        errorMessage = data;
      } else if (data && data.message) {
        errorMessage = data.message;
      } else {
        errorMessage = `Lỗi ${error.response.status}: ${error.response.statusText}`;
      }
    } else if (error.request) {
      errorMessage = "Không thể kết nối đến server";
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const loginWithGoogle = async () => {
  const response = await axios.get(`${API_URL}/google-login-url`);
  window.location.href = response.data.url;
};

export const handleGoogleCallback = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/oauth2/callback`, {
      params: {
        code,
        state: btoa("http://localhost:3000/google-callback"),
      },
    });

    // Nhận dữ liệu từ BE
    const { token, user } = response.data;

    // Lưu vào localStorage nếu cần
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    console.error("Callback error:", error);
    throw error;
  }
};

export const register = async (formData) => {
  try {
    console.log("➡️ Sending form:", formData);
    const response = await axios.post(
      `${API_URL}/signup`,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        birthday: formData.birthday,
        phone: formData.phone,
        password: formData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error creating account";
    return {
      success: false,
      message: message,
    };
  }
};

// Function to send OTP
export const sendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/sendOtp`, { email });

    // Kiểm tra phản hồi và trả về thông báo cùng với success (boolean)
    return {
      success: response.data.success,
      message: response.data.message || "OTP sent to your email.",
    };
  } catch (error) {
    console.error("Error sending OTP", error);
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Failed to send OTP. Please try again.",
    };
  }
};

// Function to verify OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/verify-gmail`, {
      email,
      otp,
    });

    // Kiểm tra phản hồi và trả về thông báo cùng với success (boolean)
    return {
      success: response.data.success,
      message: response.data.message || "OTP verified successfully.",
    };
  } catch (error) {
    console.error("Error verifying OTP", error);
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Failed to verify OTP. Please try again.",
    };
  }
};

export const checkPhoneNumber = async (phoneNumber) => {
  try {
    const response = await axios.get(`${API_URL}/check-phone`, {
      params: { phoneNumber }, // gửi phoneNumber qua query string
    });

    return response.data; // { exists: boolean, message: string }
  } catch (error) {
    console.error("Error checking phone number:", error);
    return {
      exists: false,
      message:
        error.response?.data?.message ||
        `Error checking phone number: ${error.message}`,
    };
  }
};
export const changePassword = async (email, currentPassword, newPassword) => {
  try {
    const response = await axios.put(
        `${API_URL}/password`,
        { email, currentPassword, newPassword },
        { headers: { "Content-Type": "application/json" } }
    );

    // Giả sử BE trả về { success: boolean, message: string }
    return {
      success: response.data.success,
      message: response.data.message || "Đổi mật khẩu thành công.",
    };
  } catch (error) {
    let errorMessage = "Có lỗi khi đổi mật khẩu";
    if (error.response) {
      const data = error.response.data;
      errorMessage = data?.message || `Lỗi ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "Không thể kết nối đến server";
    }
    return { success: false, message: errorMessage };
  }
};

// Function to reset password
export const resetPassword = async (email, password) => {
  try {
    const response = await axios.put(`${API_URL}/reset-password`, {
      email,
      password,
    });

    return {
      success: response.data.success,
      message: response.data.message || "Password reset successfully.",
    };
  } catch (error) {
    console.error("Error resetting password", error);
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Failed to reset password. Please try again.",
    };
  }
};


export default {
  login,
  loginWithGoogle,
  handleGoogleCallback,
  register,
  sendOtp,
  verifyOtp,
  resetPassword,
  updateUserData,
  getRoleBasedRedirectPath,
  changePassword,
};
