import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic logout (ví dụ: xóa token)
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <div className="logout">
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout} className="logout-button">
        Confirm Logout
      </button>
    </div>
  );
};

export default Logout;