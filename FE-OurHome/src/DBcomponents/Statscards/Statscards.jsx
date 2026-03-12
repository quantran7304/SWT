import React from "react";
import "./AdminStatsCards.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const StatsCards = () => {
  const stats = {
    properties: 150,
    users: 1200,
    revenue: 50000,
    transactions: 45,
  };

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

export default StatsCards;