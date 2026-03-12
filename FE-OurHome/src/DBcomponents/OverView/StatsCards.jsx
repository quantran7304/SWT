import React, { useState, useEffect } from "react";
import "./StatCard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SalesOvertime from "./SalesOvertime";
import TopSellingProduct from "./TopSellingProduct";
import LatestOrders from "./LatestOrders";
import { fetchDashboardData } from "../../services/adminService";

const StatsCards = () => {
    const [stats, setStats] = useState({
        properties: 0,
        users: 0,
        revenue: 0,
        report: 0,
        transactions: 0,
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchDashboardData();
                console.log("Fetched dashboard data:", data);
                setStats({
                    properties: data.properties,
                    users: data.users,
                    revenue:  data.revunements ?? data.revenue ?? 0,
                    report: data.reports ?? 0,
                    transactions:data.transactions,// fallback nếu BE chưa có
                });
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        loadData();
    }, []);

    return (
        <div className="admin-stats-cards">
            <div className="admin-card">
                <i className="bi bi-building admin-card-icon"></i>
                <div>
                    <h3>{stats.properties}</h3>
                    <p>Total Properties</p>
                </div>
            </div>
            <div className="admin-card">
                <i className="bi bi-people admin-card-icon"></i>
                <div>
                    <h3>{stats.users}</h3>
                    <p>Total Users</p>
                </div>
            </div>
            <div className="admin-card">
                <i className="bi bi-currency-dollar admin-card-icon"></i>
                <div>
                    <h3>${stats.revenue}</h3>
                    <p>Monthly Revenue</p>
                </div>
            </div>
            <div className="admin-card">
                <i className="bi bi-receipt admin-card-icon"></i>
                <div>
                    <h3>{stats.transactions}</h3>
                    <p>Pending Transactions</p>
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
                    <div className="sales-overtime">

                        <SalesOvertime />
                    </div>
                    <div className="top-selling-product">
                        <TopSellingProduct />
                    </div>
                </div>
                <div className="latest-orders">
                    <LatestOrders />
                </div>
            </div>
        </div>
    );
};


export default Overview;

