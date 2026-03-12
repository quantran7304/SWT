import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic logout (ví dụ: xóa token, session)
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div className="admin-logout">
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout} className="admin-logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Logout;