import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../../Assets/LogoFooter.svg";
const AdminSidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="seller-sidebar-header">
                <img src={Logo} alt="Logo" />
            </div>
            <nav className="admin-sidebar-nav">
                <ul>
                    <li>
                        <Link to="/admin/dashboard/overview">
                            <i className="bi bi-house-door"></i>
                            <span>Overview</span>
                        </Link>
                    </li>
                    {/*<li>*/}
                    {/*    <Link to="/admin/dashboard/analytics">*/}
                    {/*        <i className="bi bi-bar-chart"></i>*/}
                    {/*        <span>Analytics</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    <li>
                        <Link to="/admin/dashboard/properties">
                            <i className="bi bi-building"></i>
                            <span>Properties</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/dashboard/transactions">
                            <i className="bi bi-currency-dollar"></i>
                            <span>Transactions</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/dashboard/users">
                            <i className="bi bi-people"></i>
                            <span>Users</span>
                        </Link>
                    </li>
                    {/*<li>*/}
                    {/*    <Link to="/admin/dashboard/settings">*/}
                    {/*        <i className="bi bi-gear"></i>*/}
                    {/*        <span>Settings</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <Link to="/admin/dashboard/support">*/}
                    {/*        <i className="bi bi-headset"></i>*/}
                    {/*        <span>Support/Tickets</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    <li>
                        <Link to="/admin/dashboard/reports">
                            <i className="bi bi-file-earmark-text"></i>
                            <span>Reports</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/dashboard/notifications">
                            <i className="bi bi-bell"></i>
                            <span>Notifications</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/dashboard/membership">
                            <i className="bi bi-credit-card"></i>
                            <span>Membership</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/profile">
                            <i className="bi bi-person"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/dashboard/logout">
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