import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const ProtectedRoute = ({ element, role, ...rest }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // You can customize this
    }

    if (user) {
        if (role && !user.roles.includes(role)) {
            // If user does not have the required role, redirect
            return <Navigate to="/unauthorized" />;
        }
        return element;
    }

    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
};

export default ProtectedRoute;
