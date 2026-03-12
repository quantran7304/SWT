import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import HomePage from './page/homepage/HomePage';
import MessagePage from './page/ChatApp/MessagePage';

import Login from './page/authentication/login/Login';
import GoogleCallback from './page/authentication/Google-CallBack/google-callback';
import PropertyDetails from './page/propertydetails/PropertyDetails'; // Cập nhật đường dẫn
import Dashboard from './page/Dashboard/Dashboard';
import SellerDashboard from './page/sellerdashboard/SellerDashboard';
import VerifyGoogle from './page/authentication/VerifyEmail/VerifyGoogle';
import PhoneAuth from './page/authentication/VerifyPhone/verifyphone'
import ForgotPassword from "./page/authentication/ForgotPassword/ForgotPassword";
import SignUp from "./page/authentication/signup/SignUp";
import Error404 from './page/404error/Error404';
import Sale from './page/salepage/Sale';
import Profile from './page/authentication/Profile/profile';
import ChangePassWord from './page/authentication/ChangePassWord/changepassword';
import AgentDetails from './page/agentdetails/AgentDetails';
import Logout from "./DBcomponents/Logout/Logout";
import Wishlist from './page/wishlist/Wishlist';
import Agent from './page/Agent/Agent';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// Đảm bảo đường dẫn đúng theo cấu trúc dự án
// Components for Dashboard
import StatsCards from './DBcomponents/OverView/StatsCards';
import RevenueChart from './DBcomponents/RevenueChart/RevenueChart';
import Transactions from './DBcomponents/Transactions/Transactions';
import Users from './DBcomponents/Users/Users';
import Settings from './DBcomponents/Settings/Setting';
import Notifications from './DBcomponents/Notifications/Notifications';
import MembershipAdmin from './DBcomponents/Membership/Membership';
import MembershipForm from './DBcomponents/Membership/MembershipForm';
import AdminProfile from './DBcomponents/Profile/AdminProfile';

import Sidebar from './DBcomponents/Sidebar/Sidebar';
import Header from './DBcomponents/Header/Header';
// Placeholder components for new routes
// import Support from "./DBcomponents/Support/Support";
import Reports from "./DBcomponents/Reports/Reports";
import AllProperties from"./DBcomponents/DBProperties/Properties"
import SellerChat from './SDBcomponents/ChatApp/SellerChat';
import SellerProfile from "./SDBcomponents/SellerProfile/SellerProfile";

// Components for SellerDashboard
import RecentProperties from "./SDBcomponents/RecentProperties/RecentProperties";
import DBPropertyDetails from "./SDBcomponents/DBProperty/DBPropertyDetails";
import DBPropertyEdit from "./SDBcomponents/DBProperty/DBPropertyEdit";
import DBPropertyCreate from "./SDBcomponents/DBProperty/DBPropertyCreate";
import SalesAnalytics from "./SDBcomponents/SalesAnalytics/SalesAnalytics";
import StatsCardsSeller from "./SDBcomponents/OverView/StatsCards";

import SellerNotifications from "./SDBcomponents/SellerNotification/sellernotification";
import ListingPage from'./page/ListingPage/ListingPage'
import TransactionHistory from './page/transactionHistory/TransactionHistory';
import SellerTransactionHistory from './page/transactionHistory/SellerTransactionHistory';
import Membership from './page/membership/Membership';
import PayOSIntegration from './page/PayOSIntergation';
import { useLocation } from 'react-router-dom';
function PayOSWithPlan() {
    const location = useLocation();
    const plan = location.state?.plan;
    return <PayOSIntegration plan={plan} />;
}

function App() {
    return (


        <Router>
            <div className="App">
                {/* Thông báo popup (toast) */}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                {/* Định tuyến các trang */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/google-callback" element={<GoogleCallback />} />
                    <Route path="/property/:id" element={<PropertyDetails />} /> {/* Route cho PropertyDetails */}
                    {/* <Route path='/dashboard' element={<Dashboard />} /> */}
                    <Route element={<ProtectedRoute allowedRole="seller" />}>
                        <Route path="/seller" element={<SellerDashboard />}>
                            <Route path="dashboard" element={<StatsCardsSeller />} />
                            <Route path="dashboard/contact" element={<SellerNotifications/>} />
                            <Route path="dashboard/property" element={<RecentProperties />} />
                            <Route path="dashboard/property/:id" element={<DBPropertyDetails/>} />
                            <Route path="dashboard/property/form/:id" element={<DBPropertyEdit />} />
                            <Route path="dashboard/property/new" element={<DBPropertyCreate />} />
                            <Route path="analytics" element={<SalesAnalytics />} />
                            <Route path="add-property" element={<div>Add Property Placeholder</div>} />
                            <Route path="logout" element={<Logout />} />
                            <Route path="dashboard/message" element={<SellerChat />} />
                        </Route>
                    </Route>
                    {/* <Route path='/sellerdashboard' element={<SellerDashboard />} /> */}
                    <Route element={<ProtectedRoute allowedRole="admin" />}>
                        <Route path="admin/dashboard" element={<Dashboard />}>
                            <Route index element={<StatsCards />} />
                            <Route path="properties" element={<AllProperties />} />
                            <Route path="property/:id" element={<DBPropertyDetails/>} />
                            <Route path="overview" element={<StatsCards />} />
                            <Route path="analytics" element={<RevenueChart />} />
                            <Route path="transactions" element={<Transactions />} />
                            <Route path="users" element={<Users />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="notifications" element={<Notifications />} />
                            <Route path="membership" element={<MembershipAdmin />} />
                            <Route path="membership/new" element={<MembershipForm />} />
                            <Route path="membership/edit/:id" element={<MembershipForm />} />
                            <Route path="reports" element={<Reports />} />
                            <Route path="logout" element={<Logout />} />
                        </Route>
                    </Route>

                    <Route path='/sale' element={<Sale />} />
                    <Route path='/error' element={<Error404 />} />
                    <Route path='/verify-gmail' element={<VerifyGoogle />} />
                    <Route path='/verify-phone' element={<PhoneAuth />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/seller/profile' element={<SellerProfile />} />
                    <Route path='/admin/profile' element={<AdminProfile />} />
                    <Route path='/changepassword' element={<ChangePassWord />} />
                    <Route path="/agent-property/:userId" element={<AgentDetails />}/>
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/agent" element={<Agent />} />
                    <Route path="/listings" element={<ListingPage />} />

                    <Route path="/transaction-history" element={<TransactionHistory />} />
                    <Route path="/seller/transaction-history" element={<SellerTransactionHistory />} />
                    <Route path="/membership" element={<Membership />} />
                    <Route path="/payos" element={<PayOSWithPlan />} />
                    <Route path="/payos" element={<PayOSWithPlan />} />
                    <Route path="/message" element={<MessagePage />} />


                    {/* Mở rộng sau: */}
                        {/* <Route path="/signup" element={<Signup />} /> */}
                        {/* <Route path="/about" element={<AboutPage />} /> */}
                        {/* ... */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;