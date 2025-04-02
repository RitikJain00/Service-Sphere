import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AdminProtectedProp {
  children: ReactNode;
}

const AdminProtected: React.FC<AdminProtectedProp> = ({ children }) => {
  const token = localStorage.getItem('authToken');
  const Type = localStorage.getItem('Type');

  // Redirect to login if no token or if user is not a Customer
  if (!token || Type !== 'Admin') {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default AdminProtected;
