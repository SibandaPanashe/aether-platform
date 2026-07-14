import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.svg';

export const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Subtle geometric background pattern for organization formal feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <img src={logo} alt="Aether Logo" className="h-12 w-auto mb-4 drop-shadow-md" />
          <h1 className="text-2xl font-bold text-primary tracking-tight">Organization Portal</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
