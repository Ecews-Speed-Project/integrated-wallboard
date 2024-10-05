// src/components/ProtectedRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from './store';

interface ProtectedRouteProps {
  allowedRoles: ('admin' | 'user')[];  // Explicit union type for allowed roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { roles } = useSelector((state: RootState) => state.auth);  // Assuming roles is a generic string array

  // Check if any of the user's roles matches an allowed role
  const hasAccess = roles?.some((role: string) => allowedRoles.includes(role as 'admin' | 'user'));

  if (!hasAccess) {
    return null;  // Redirect to home page if the user lacks the required role
  }

  return null;  // Render the child route if access is granted
};

export default ProtectedRoute;
