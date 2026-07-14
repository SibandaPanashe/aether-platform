import React, { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, ShieldCheck, History, Key, Building2, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import logo from '../../assets/logo.svg';
import { cn } from '../ui/Button';

export const DashboardLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Verify Credential', path: '/verify', icon: ShieldCheck },
    { name: 'Verification History', path: '/history', icon: History },
    { name: 'API Keys', path: '/settings/api-keys', icon: Key },
    { name: 'Organization Profile', path: '/settings/profile', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-primary p-4 text-surface z-50 shadow-md">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
          <span className="font-bold tracking-tight">Organization Portal</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-primary text-surface transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex md:flex-col shadow-xl",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-20 hidden md:flex items-center px-6 border-b border-surface/10">
          <img src={logo} alt="Aether Logo" className="h-8 w-auto mr-3" />
          <span className="text-xl font-bold tracking-tight">Aether Org</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-16 md:mt-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-secondary text-surface shadow-sm" 
                    : "text-surface/70 hover:bg-secondary/50 hover:text-surface"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-accent" : "")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-surface/10">
          <div className="mb-4 px-4">
            <p className="text-sm font-medium text-surface truncate">{user?.name}</p>
            <p className="text-xs text-surface/50 truncate">{user?.email}</p>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-surface/70 hover:text-surface hover:bg-secondary/50" 
            onClick={logout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar for desktop */}
        <header className="h-20 hidden md:flex items-center justify-between px-8 bg-surface border-b border-secondary/10 shrink-0 shadow-sm">
          <h1 className="text-xl font-semibold text-primary capitalize">
            {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
          </h1>
          <div className="flex items-center">
            <span className="text-sm font-medium text-textDark/70 bg-background px-3 py-1.5 rounded-full border border-secondary/10">
              Org ID: {user?.organization_id}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
