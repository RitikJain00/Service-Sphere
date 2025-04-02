import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProfessionalProtectedProp {
  children: ReactNode;
}

const ProfessionalProtected: React.FC<ProfessionalProtectedProp> = ({ children }) => {
  const token = localStorage.getItem('authToken');
  const Type = localStorage.getItem('Type');

  // Redirect to login if no token or if user is not a Customer
  if (!token || Type !== 'Professional') {
    return <Navigate to="/ProfessionalLogin" replace />;
  }

  return <>{children}</>;
};

export default ProfessionalProtected;
