import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, redirectPath = '/403', children }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }
    return children;
};

export default ProtectedRoute;