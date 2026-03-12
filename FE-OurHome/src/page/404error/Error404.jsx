import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
  // Lấy thời gian hiện tại để hiển thị
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: true,
  });
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Lost in the Night</h2>
        <p className="error-message">
          It's {currentTime} on {currentDate}, and it seems you've wandered into the unknown. The page you're looking for
          doesn't exist under this starry sky.
        </p>
        <div className="error-actions">
          <Link to="/" className="btn primary-btn">
            Return Home
          </Link>
          <Link to="/explore" className="btn secondary-btn">
            Explore More
          </Link>
        </div>
        <div className="error-footer">
          <p>
            Need assistance? <Link to="/help" className="help-link">Reach out to us</Link>
          </p>
        </div>
      </div>
      <div className="background-stars"></div>
    </div>
  );
};

export default Error404;