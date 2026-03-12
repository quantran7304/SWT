import React, { useState, useEffect } from "react";
import "./StatCard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ContactsOvertime from "./SalesOvertime";
import TopProperties from "./TopSelling";

const StatsCards = () => {
    const [stats, setStats] = useState({
        activePosts: 0,
        membership: "None",
        contacts: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            const userJson = localStorage.getItem("user"); // Assuming the key is "user"
            if (!userJson) {
                console.error("User data not found in localStorage");
                return;
            }

            try {
                const user = JSON.parse(userJson);
                const userId = user.id;

                if (!userId) {
                    console.error("User ID not found in user data");
                    return;
                }

                // Fetch all stats from a single endpoint
                const statsResponse = await fetch(`http://localhost:8082/api/seller/stats?userId=${userId}`);
                if (!statsResponse.ok) {
                    const errorText = await statsResponse.text();
                    console.error("Error response:", errorText);
                    throw new Error(`HTTP error! status: ${statsResponse.status}`);
                }
                const statsData = await statsResponse.json();
                const activePosts = statsData.listings || 0;
                const membership = statsData.membership || "None";
                const contacts = statsData.contacts || 0;

                setStats({
                    activePosts,
                    membership,
                    contacts,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="admin-stats-cards">
            <div className="admin-card">
                <i className="bi bi-file-post admin-card-icon"></i>
                <div>
                    <h3>{stats.activePosts}</h3>
                    <p>Active Listings</p>
                </div>
            </div>
            <div className="admin-card">
                <i className="bi bi-award admin-card-icon"></i>
                <div>
                    <h3>{stats.membership}</h3>
                    <p>Current Membership Plan</p>
                </div>
            </div>
            <div className="admin-card">
                <i className="bi bi-chat-dots admin-card-icon"></i>
                <div>
                    <h3>{stats.contacts}</h3>
                    <p>Contact Count from Users (Tenants)</p>
                </div>
            </div>
        </div>
    );
};

const Overview = () => {
    return (
        <div className="overview">
            <StatsCards />
            <div className="overview-main">
                <div className="overview-middle">
                    <div className="latest-orders">
                        <ContactsOvertime />
                    </div>
                    <div className="top-selling-product">
                        <TopProperties />
                    </div>
                </div>
                {/*<div className="sales-overtime">*/}
                {/*    <LatestOrders />*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Overview;
