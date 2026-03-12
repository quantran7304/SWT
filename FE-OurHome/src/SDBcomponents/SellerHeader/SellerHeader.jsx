import React, { useEffect, useState } from "react";
import "./SellerHeader.css";
import Notification from "../../components/Notifications/Notification";
const SellerHeader = () => {
    // State to hold user data
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        picture: "",
        id: "",
    });

    // Fetch user data from localStorage when component mounts
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser({
                firstName: parsedUser.firstName || "",
                lastName: parsedUser.lastName || "",
                picture: parsedUser.picture || "",
                id: parsedUser.id || "",
            });
        }
    }, []);

    return (
        <header className="seller-header">
            <h1>Seller Dashboard</h1>
            <div className="seller-user-info">
                <Notification/>
                <img
                    src={user.picture || "https://via.placeholder.com/40"} // Fallback image if picture is not available
                    alt="User Avatar"
                    className="seller-user-avatar"
                />
                <span>{`${user.firstName} ${user.lastName}`.trim() || "Seller User"}</span> {/* Combine firstName and lastName */}
            </div>
        </header>
    );
};

export default SellerHeader;