import React from "react";
import { Outlet } from "react-router-dom";
import SellerSidebar from "../../SDBcomponents/SellerSidebar/SellerSidebar";
import SellerHeader from "../../SDBcomponents/SellerHeader/SellerHeader";
import "./SellerDashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SellerDashboard = () => {
  
  return (
    <div className="seller-dashboard-container">
      <SellerSidebar />
      <div className="seller-main-content">
        <SellerHeader />
        <div className="seller-dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;