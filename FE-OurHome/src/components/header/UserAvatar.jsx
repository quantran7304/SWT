import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAvatar.css";
import DefaultAvatar from "../../Assets/img/DefaultAvatar.jpg";
const UserAvatar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();


  // Hàm lấy dữ liệu user từ localStorage
  const getUserData = () => {
    const userData = localStorage.getItem("user");
    console.log("🧪 User from localStorage:", userData);
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        return parsedUser;
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  };


  // Hàm tạo tên hiển thị
  const getDisplayName = (userData) => {
    if (!userData) return "User";


    // Ưu tiên hiển thị firstName + lastName
    if (userData.firstName && userData.lastName) {
      return `${userData.firstName} ${userData.lastName}`;
    }


    // Nếu chỉ có firstName
    if (userData.firstName) {
      return userData.firstName;
    }


    // Nếu chỉ có lastName
    if (userData.lastName) {
      return userData.lastName;
    }


    // Nếu có name (tên đầy đủ)
    if (userData.name) {
      return userData.name;
    }


    // Fallback
    return "User";
  };


  // Hàm tạo initials cho avatar placeholder
  const getInitials = (userData) => {
    if (!userData) return "U";


    let initials = "";


    if (userData.firstName) {
      initials += userData.firstName[0].toUpperCase();
    }


    if (userData.lastName) {
      initials += userData.lastName[0].toUpperCase();
    }


    // Nếu không có firstName/lastName, thử dùng name
    if (!initials && userData.name) {
      const nameParts = userData.name.split(" ");
      if (nameParts.length >= 2) {
        initials =
            nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
      } else if (nameParts.length === 1) {
        initials = nameParts[0][0].toUpperCase();
      }
    }


    return initials || "U";
  };


  useEffect(() => {
    // Lấy dữ liệu user ban đầu
    getUserData();


    // Thêm event listener để lắng nghe thay đổi localStorage
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        console.log("🔄 User data updated in localStorage");
        getUserData();
      }
    };


    // Thêm event listener cho storage events (khi localStorage thay đổi từ tab khác)
    window.addEventListener("storage", handleStorageChange);


    // Thêm custom event listener cho việc cập nhật user data
    const handleUserUpdate = () => {
      console.log("🔄 User data updated via custom event");
      getUserData();
    };


    window.addEventListener("userDataUpdated", handleUserUpdate);


    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataUpdated", handleUserUpdate);
    };
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-avatar-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    // Xóa dữ liệu từ localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");


    // Cập nhật state local
    setUser(null);
    setShowDropdown(false);


    // Trigger custom event để Header cập nhật UI
    window.dispatchEvent(new CustomEvent("userLoggedOut"));


    // Navigate về trang chủ
    navigate("/login");
  };


  if (!user) return null;


  const displayName = getDisplayName(user);
  const initials = getInitials(user);


  return (
      <div className="user-avatar-container">
        <div
            className="avatar-wrapper"
            onClick={() => setShowDropdown(!showDropdown)}
        >
          {user.picture && user.picture.trim() ? (
              <img src={user.picture} alt="User avatar" className="user-avatar" />
          ) : (
              <img src={DefaultAvatar} alt="Default avatar" className="user-avatar" />
          )}
        </div>


        {showDropdown && (
            <div className="avatar-dropdown">
              <div className="user-info-customer">
                <div className="user-details-customer">
                  <p className="user-name-customer">{displayName}</p>
                  <p className="user-email-customer">{user.email}</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button
                  className="dropdown-item"
                  onClick={() => navigate("/profile")}
              >
                <i className="bi bi-person-fill"style={{ marginRight: "2px" }}></i>


                Profile
              </button>
              <button
                  className="dropdown-item"
                  onClick={() => navigate("/changepassword")}
              >
                <i class="bi bi-key-fill" style={{ marginRight: "6px" }}></i>


                Change Password
              </button>
              <button
                  className="dropdown-item"
                  onClick={() => navigate("/wishlist")}
              >
                <i class="bi bi-card-list"  style={{ marginRight: "6px" }}></i>


                Wishlist
              </button>
              <button
                  className="dropdown-item"
                  onClick={() => navigate("/message")}
              >
                <i className="bi bi-chat-fill" style={{marginRight: "6px"}}></i>
                Messages
              </button>
              <button className="dropdown-item" onClick={handleLogout}>
                <i class="bi bi-box-arrow-right" style={{ marginRight: "6px" }}></i>


                LogOut
              </button>

            </div>
        )}
      </div>
  );
};


export default UserAvatar;



