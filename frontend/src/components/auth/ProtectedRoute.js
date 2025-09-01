import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, loading, user, hasRole } = useAuth();

  // Debug logging
  console.log('ProtectedRoute Debug:', {
    isAuthenticated,
    loading,
    user,
    allowedRoles,
    hasRequiredRole: allowedRoles.length > 0 ? allowedRoles.some(role => hasRole(role)) : true
  });

  if (loading) {
    console.log('ProtectedRoute: Loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.some(role => hasRole(role))) {
    console.log('ProtectedRoute: User does not have required role, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute: Access granted');
  return children;
};

export default ProtectedRoute;
