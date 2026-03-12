import React from "react";
import { Link } from "react-router-dom";
import "./SellerSidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../../Assets/LogoFooter.svg";
const SellerSidebar = () => {
  return (
    <aside className="seller-sidebar">
      <div className="seller-sidebar-header">
        <img src={Logo} alt="Logo" />
      </div>
      <nav className="seller-sidebar-nav">
        <ul>
          <li>
            <Link to="/seller/dashboard">
              <i className="bi bi-house-door"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/seller/dashboard/contact">
              <i className="bi bi-person-lines-fill"></i>
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link to="/seller/dashboard/property">
              <i className="bi bi-plus-square"></i>
              <span>Property Manager</span>
            </Link>
          </li>
          <li>
            <Link to="/seller/dashboard/message">
              <i className="bi bi-chat"></i>
              <span>Chat App</span>
            </Link>
          </li>
          {/*<li>*/}
          {/*  <Link to="/seller/statscards">*/}
          {/*    <i className="bi bi-graph-up"></i>*/}
          {/*    <span>Stats</span>*/}
          {/*  </Link>*/}
          {/*</li>*/}
          <li>
            <Link to="/seller/profile">
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/seller/logout">
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SellerSidebar;