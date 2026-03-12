import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../DBcomponents/Sidebar/Sidebar";
import AdminHeader from "../../DBcomponents/Header/Header";
import "./AdminDashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader />
        <div className="admin-dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;