import React, { useState, useEffect } from "react";
import DefaultAvatar from "../../Assets/img/DefaultAvatar.jpg";
import "./AdminHeader.css";

const AdminHeader = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        picture: "",
    });

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setUser({
                    firstName: parsed.firstName || "",
                    lastName: parsed.lastName || "",
                    picture: parsed.picture || "",
                });
            } catch (err) {
                console.error("Dữ liệu user trong localStorage không hợp lệ:", err);
            }
        }
    }, []);

    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
    const avatarSrc = user.picture && user.picture.startsWith("http")
        ? user.picture
        : DefaultAvatar;

    return (
        <header className="admin-header">
            <h1>Admin Dashboard</h1>
            <div className="admin-user-info">
                <img
                    src={avatarSrc}
                    alt="User Avatar"
                    className="admin-user-avatar"
                />
                <span>{fullName || "Admin User"}</span>
            </div>
        </header>
    );
};

export default AdminHeader;
