import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (roleRequired === 'admin' && !isAdmin) {
    return <Navigate to="/store" replace />;
  }

  return children;
};

export default ProtectedRoute;
