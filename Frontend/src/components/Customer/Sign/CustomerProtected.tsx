import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface CustomerProtectedProp {
  children: ReactNode;
}

const CustomerProtected: React.FC<CustomerProtectedProp> = ({ children }) => {
  const token = localStorage.getItem('authToken');
  const Type = localStorage.getItem('Type');

  // Redirect to login if no token or if user is not a Customer
  if (!token || Type !== 'Customer') {
    return <Navigate to="/CustomerLogin" replace />;
  }

  return <>{children}</>;
};

export default CustomerProtected;
