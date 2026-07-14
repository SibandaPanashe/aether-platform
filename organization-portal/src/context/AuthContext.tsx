import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api, { setAccessToken } from '../services/api';

interface OrgUser {
  id: string;
  email: string;
  name: string;
  organization_id: string;
  role: string;
}

interface AuthContextType {
  user: OrgUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (access: string, refresh: string, user: OrgUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<OrgUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('orgUser');
    const refreshToken = localStorage.getItem('orgRefreshToken');
    
    if (storedUser && refreshToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (access: string, refresh: string, userData: OrgUser) => {
    setAccessToken(access);
    localStorage.setItem('orgRefreshToken', refresh);
    localStorage.setItem('orgUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('orgRefreshToken');
    localStorage.removeItem('orgUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
