// src/ProtectedRoute.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AutenticacionContext from './auth/AutenticacionContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { claims } = useContext(AutenticacionContext);
  const isAuthenticated = claims && claims.length > 0;

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a /login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
