import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, FileUp, Activity, Shield, LogOut } from 'lucide-react';
import logo from '../../assets/logo.svg';

export const DashboardLayout = () => {
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload Document', path: '/verify/upload', icon: FileUp },
    { name: 'Verification Status', path: '/verify/status', icon: Activity },
    { name: 'Credentials', path: '/credentials', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-secondary/10 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-secondary/10">
          <img src={logo} alt="Aether Logo" className="h-8 w-auto mr-2" />
          <span className="font-bold text-xl text-primary tracking-tight">Aether</span>
        </div>
        
        <div className="p-4 flex-1">
          <div className="text-xs font-semibold text-textDark/50 uppercase tracking-wider mb-4 px-3">
            Menu
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-secondary/10 text-secondary'
                      : 'text-textDark hover:bg-secondary/5 hover:text-secondary'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-secondary' : 'text-textDark/50'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-secondary/10">
          <div className="flex items-center mb-4 px-3">
            <div className="w-8 h-8 rounded-full bg-secondary text-surface flex items-center justify-center font-bold text-sm">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-textDark">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-textDark/60 truncate w-36">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-surface border-b border-secondary/10 flex items-center justify-between px-4">
          <div className="flex items-center">
            <img src={logo} alt="Aether Logo" className="h-8 w-auto mr-2" />
            <span className="font-bold text-lg text-primary">Aether</span>
          </div>
          <button onClick={logout} className="text-textDark/60">
            <LogOut className="h-6 w-6" />
          </button>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
