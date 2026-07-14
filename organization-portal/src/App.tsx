import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthLayout } from './components/layout/AuthLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { VerifyCredential } from './pages/verify/VerifyCredential';
import { VerificationHistory } from './pages/history/VerificationHistory';
import { ApiKeys } from './pages/settings/ApiKeys';
import { Profile } from './pages/settings/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public / Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/verify" element={<VerifyCredential />} />
            <Route path="/history" element={<VerificationHistory />} />
            <Route path="/settings/api-keys" element={<ApiKeys />} />
            <Route path="/settings/profile" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
