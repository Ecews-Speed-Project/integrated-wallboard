import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authContext ';

const PrivateRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
