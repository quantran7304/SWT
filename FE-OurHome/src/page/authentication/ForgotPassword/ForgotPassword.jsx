import React, { useState } from "react";
import "./ForgotPassword.css";
import { sendOtp, verifyOtp, resetPassword } from "../../../services/authService"; // Adjust path if needed

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Password validation
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    return {
      isValid: hasUpperCase && hasNumber && hasSpecialChar && hasMinLength,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
      hasMinLength,
    };
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    console.log("Email being sent:", email); // Log email
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const result = await sendOtp(email);
      console.log("Result from sendOtp:", result); // Log result
      if (result.success) {
        setMessage(result.message);
        setStep(2);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error in handleSendOtp:", err); // Log error
      setError("An error occurred while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await verifyOtp(email, otp); // Ensure verifyOtp is defined
      if (result.success) {
        setMessage(result.message);
        setStep(3);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError("Password does not meet security requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Confirm password does not match");
      return;
    }

    setLoading(true);
    try {
      const result = await resetPassword(email, password); // Ensure resetPassword is defined
      if (result.success) {
        setMessage("Password reset successful! Please log in again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while resetting the password");
    } finally {
      setLoading(false);
    }
  };

  const passwordValidation = validatePassword(password);

  return (
      <div className="fp-container">
        <div className="authen-background"></div>
        <div className="fp-content">
          <div className="fp-form">
            {/* Step 1: Enter email */}
            {step === 1 && (
                <div className="fp-step">
                  <h2>Forgot Password</h2>
                  <p>Enter your email to receive an OTP</p>
                  <form onSubmit={handleSendOtp}>
                    <input
                        type="email"
                        className="fp-input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="fp-button-group">
                      <button
                          type="submit"
                          className="fp-btn fp-btn-primary"
                          disabled={loading}
                      >
                        {loading ? "Sending..." : "Send OTP"}
                      </button>
                    </div>
                  </form>
                  <p className="fp-link">
                    Remember your password? <a href="/login">Log in</a>
                  </p>
                </div>
            )}

            {/* Step 2: Enter OTP */}
            {step === 2 && (
                <div className="fp-step">
                  <h2>Verify OTP</h2>
                  <p>Enter the OTP sent to {email}</p>
                  <form onSubmit={handleVerifyOtp}>
                    <input
                        type="text"
                        className="fp-input"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                    />
                    <div className="fp-button-group">
                      <button
                          type="submit"
                          className="fp-btn fp-btn-primary"
                          disabled={loading}
                      >
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>
                      <button
                          type="button"
                          className="fp-btn"
                          onClick={() => setStep(1)}
                      >
                        Back
                      </button>
                    </div>
                  </form>
                </div>
            )}

            {/* Step 3: Reset password */}
            {step === 3 && (
                <div className="fp-step">
                  <h2>Reset Password</h2>
                  <p>Create a new password for your account</p>
                  <form onSubmit={handleResetPassword}>
                    <input
                        type="password"
                        className="fp-input"
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="fp-input"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <div className="fp-input-hint">
                      <p>Password must have:</p>
                      <ul>
                        <li
                            className={
                              passwordValidation.hasMinLength ? "valid" : "invalid"
                            }
                        >
                          ✓ At least 8 characters
                        </li>
                        <li
                            className={
                              passwordValidation.hasUpperCase ? "valid" : "invalid"
                            }
                        >
                          ✓ At least 1 uppercase letter
                        </li>
                        <li
                            className={
                              passwordValidation.hasNumber ? "valid" : "invalid"
                            }
                        >
                          ✓ At least 1 number
                        </li>
                        <li
                            className={
                              passwordValidation.hasSpecialChar ? "valid" : "invalid" // Changed from emailValidation to passwordValidation
                            }
                        >
                          ✓ At least 1 special character
                        </li>
                      </ul>
                    </div>
                    <div className="fp-button-group">
                      <button
                          type="submit"
                          className="fp-btn fp-btn-primary"
                          disabled={
                              loading ||
                              !passwordValidation.isValid ||
                              password !== confirmPassword
                          }
                      >
                        {loading ? "Resetting..." : "Reset Password"}
                      </button>
                      <button
                          type="button"
                          className="fp-btn"
                          onClick={() => setStep(2)}
                      >
                        Back
                      </button>
                    </div>
                  </form>
                </div>
            )}

            {/* Display messages */}
            {message && <div className="fp-message success">{message}</div>}
            {error && <div className="fp-message error">{error}</div>}
          </div>
        </div>
      </div>
  );
};

export default ForgotPassword;