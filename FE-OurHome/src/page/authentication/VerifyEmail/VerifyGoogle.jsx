import React, { useState } from "react";
import { sendOtp, verifyOtp } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import "../auth-common.css";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Email is required.");
      return;
    }

    try {
      const response = await sendOtp(email);

      if (response.success) {
        setIsOtpSent(true);
        setMessage(response.message);
      } else {
        setMessage(response.message);
        navigate("/signup");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("OTP is required.");
      return;
    }

    try {
      const response = await verifyOtp(email, otp);

      if (response.success) {
        setMessage(response.message);
        navigate("/");
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="authen-container">
      <div className="authen-background">
  
      </div>

      <div className="authen-content">
        <div className="authen-form-container">
          <div className="authen-header">
            <h2>
              {isOtpSent ? "Enter Verification Code" : "Verify Your Email"}
            </h2>
            <p>
              {isOtpSent
                ? "Enter the code we sent to your email"
                : "Enter your email address to receive a verification code"}
            </p>
          </div>

          <form className="authen-form">
            {!isOtpSent ? (
              <div className="authen-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="authen-form-control"
                />
                <button
                  type="button"
                  className="authen-button"
                  onClick={handleSendOtp}
                >
                  Send Verification Code
                </button>
              </div>
            ) : (
              <div className="authen-form-group">
                <label>Verification Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter verification code"
                  className="authen-form-control"
                  maxLength="6"
                />
                <button
                  type="button"
                  className="authen-button"
                  onClick={handleVerifyOtp}
                >
                  Verify Code
                </button>
              </div>
            )}

            {message && (
              <div
                className={`authen-message ${
                  message.includes("success") ? "authen-success" : "authen-error"
                }`}
              >
                {message}
              </div>
            )}

            <div
              className="authen-links"
              style={{ marginTop: "2rem", textAlign: "center" }}
            >
              <a href="/login">Back to Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
