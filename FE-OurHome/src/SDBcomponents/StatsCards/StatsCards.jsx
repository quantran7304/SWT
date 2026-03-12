import React from "react";
import "./StatsCards.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const StatsCards = () => {
  const stats = {
    properties: 5,
    sales: 2,
    revenue: 33000,
  };

  return (
    <div className="seller-stats-cards">
      <div className="seller-card">
        <i className="bi bi-building seller-card-icon"></i>
        <div>
          <h3>{stats.properties}</h3>
          <p>Total Properties</p>
        </div>
      </div>
      <div className="seller-card">
        <i className="bi bi-check-circle seller-card-icon"></i>
        <div>
          <h3>{stats.sales}</h3>
          <p>Completed Sales</p>
        </div>
      </div>
      <div className="seller-card">
        <i className="bi bi-currency-dollar seller-card-icon"></i>
        <div>
          <h3>${stats.revenue}</h3>
          <p>Total Revenue</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;