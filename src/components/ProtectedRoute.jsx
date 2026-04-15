import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
