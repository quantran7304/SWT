import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>FLEX LIVING</h2>
      </div>
      <nav className="admin-sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard/overview">
              <i className="bi bi-house-door"></i>
              <span>Overview</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/analytics">
              <i className="bi bi-bar-chart"></i>
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/properties">
              <i className="bi bi-building"></i>
              <span>Properties</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/transactions">
              <i className="bi bi-currency-dollar"></i>
              <span>Transactions</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users">
              <i className="bi bi-people"></i>
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/settings">
              <i className="bi bi-gear"></i>
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/support">
              <i className="bi bi-headset"></i>
              <span>Support/Tickets</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/reports">
              <i className="bi bi-file-earmark-text"></i>
              <span>Reports</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/notifications">
              <i className="bi bi-bell"></i>
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/logout">
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;