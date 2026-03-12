import React, { useState, useEffect } from "react";
import "./navbar.css";
import Logo from "../../Assets/Logo.svg";
import { Link } from "react-router-dom";
import "../../Assets/Asset/Reset.css";
import "../../Assets/Asset/Global.css";
import UserAvatar from "../header/UserAvatar";
import Notification from "../Notifications/Notification";
import { getRoleBasedRedirectPath } from "../../services/authService";

const Header = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // Hàm lấy dữ liệu user từ localStorage
  const getUserData = () => {
    const userData = localStorage.getItem("user");
    const userRole = localStorage.getItem("role");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setRole(userRole?.toLowerCase());
        return parsedUser;
      } catch (e) {
        console.error("Error parsing user data from localStorage:", e);
        setUser(null);
        setRole(null);
        return null;
      }
    } else {
      setUser(null);
      setRole(null);
      return null;
    }
  };

  useEffect(() => {
    // Lấy dữ liệu user ban đầu
    getUserData();

    // Thêm event listener để lắng nghe thay đổi localStorage
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === "role") {
        console.log("🔄 User/Role data updated in localStorage");
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

    // Thêm custom event listener cho việc logout
    const handleLogout = () => {
      console.log("🔄 User logged out");
      setUser(null);
      setRole(null);
    };

    window.addEventListener("userDataUpdated", handleUserUpdate);
    window.addEventListener("userLoggedOut", handleLogout);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataUpdated", handleUserUpdate);
      window.removeEventListener("userLoggedOut", handleLogout);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <a href="/" className="logo">
            <div className="logo-icon">
              <img src={Logo} alt="Logo" />
            </div>
          </a>

          {/* Navigation Menu */}
          <nav className="navigation">
            <Link to="/" className="nav-item">
              <span>Home</span>
            </Link>
            <Link to="/listings" className="nav-item">
              <span>Listings</span>
            </Link>
            <Link to="/membership" className="nav-item">
              <span>Members</span>
            </Link>
            {/*<Link to="/blog" className="nav-item">*/}
            {/*  <span>Blog</span>*/}
            {/*</Link>*/}
            <Link to="/agent" className="nav-item">
              <span>Agent</span>
            </Link>
            {/*<Link to="/contact" className="nav-item-simple">*/}
            {/*  <span>Contact</span>*/}
            {/*</Link>*/}
          </nav>

          {/* Right Side Actions */}
          <div className="actions">
            {user && role === "customer" ? (
                <>
                <Notification />
              <UserAvatar />
                </>
            ) : (
              <Link to="/login">
                <button className="add-property-button">Sign-In</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
