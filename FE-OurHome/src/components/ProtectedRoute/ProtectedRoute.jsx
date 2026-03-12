import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const getUserRole = () => {
    return localStorage.getItem('role') || null;
};

const ProtectedRoute = ({ allowedRole }) => {
    const userRole = getUserRole();
    console.log(userRole);
    if (!userRole || userRole !== allowedRole) {
        return <Navigate to="/error" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;