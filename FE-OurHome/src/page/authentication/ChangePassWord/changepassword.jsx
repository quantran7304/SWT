import React, { useState } from "react";
import "./changepassword.css";
import Header from "../../../components/Navigation/Header";
import Footer from "../../../components/Footer/Footer";
import { changePassword } from "../../../services/authService"; // Adjust path if needed
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset messages
        setErrorMessage("");
        setSuccessMessage("");

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setErrorMessage("New password and confirm password do not match.");
            return;
        }
        let email = null;
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.email) {
                email = storedUser.email;
            }
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
        }
        console.log("email", email);
        setLoading(true);
        const result = await changePassword(email,currentPassword, newPassword);
        console.log("result", result);
        setLoading(false);

        if (result.success) {
            setSuccessMessage(result.message);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            navigate("/login");
        } else {
            setErrorMessage(result.message);
        }
    };

    return (
        <>
            <div className="custom-password-header">
                <Header />
            </div>
            <div
                style={{
                    minHeight: "80vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f9f9f9"
                }}
            >
            <div className="custom-password-body">
                <div className="custom-password-container">
                    <h2>Change Password</h2>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                style={{ width: "640px", height: "60px", padding: "10px" }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                style={{ width: "640px", height: "60px", padding: "10px" }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                                style={{ width: "640px", height: "60px", padding: "10px" }}
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="save-btn" disabled={loading}>
                                {loading ? "Saving..." : "Save New Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
            <div className="custom-password-footer">
                <Footer />
            </div>
        </>
    );
};

export default ChangePassword;