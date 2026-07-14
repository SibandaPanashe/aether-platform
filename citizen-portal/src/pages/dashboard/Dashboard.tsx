import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle2, AlertCircle, FileText, ChevronRight } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'verified' | 'rejected'>('pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Welcome, {user?.firstName}</h1>
        <p className="text-textDark/70 mt-1">Manage your digital identity and view your verification status.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-secondary/10 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Identity Verification Status</CardTitle>
              <Badge 
                variant={status === 'verified' ? 'success' : status === 'rejected' ? 'error' : status === 'in-progress' ? 'warning' : 'default'}
              >
                {status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start p-4 bg-background rounded-lg mb-6">
              {status === 'pending' && <AlertCircle className="h-6 w-6 text-secondary mt-0.5 mr-3" />}
              {status === 'in-progress' && <Clock className="h-6 w-6 text-accent mt-0.5 mr-3" />}
              {status === 'verified' && <CheckCircle2 className="h-6 w-6 text-success mt-0.5 mr-3" />}
              <div>
                <h4 className="font-semibold text-textDark">
                  {status === 'pending' ? 'Verification Required' : 
                   status === 'in-progress' ? 'Review in Progress' : 
                   status === 'verified' ? 'Identity Verified' : 'Verification Failed'}
                </h4>
                <p className="text-sm text-textDark/70 mt-1">
                  {status === 'pending' ? 'Please upload your official government ID to verify your identity.' : 
                   status === 'in-progress' ? 'Our AI systems are currently reviewing your documents.' : 
                   status === 'verified' ? 'Your identity has been successfully verified.' : 'There was an issue with your documents. Please try again.'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-textDark uppercase tracking-wider">Quick Actions</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link to="/verify/upload" className="flex items-center justify-between p-3 border border-secondary/20 rounded-lg hover:border-secondary transition-colors group">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-secondary mr-2" />
                    <span className="font-medium text-sm text-textDark">Upload Document</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-textDark/40 group-hover:text-secondary" />
                </Link>
                <Link to="/verify/status" className="flex items-center justify-between p-3 border border-secondary/20 rounded-lg hover:border-secondary transition-colors group">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 text-secondary mr-2" />
                    <span className="font-medium text-sm text-textDark">Check Status</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-textDark/40 group-hover:text-secondary" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-secondary/20 before:to-transparent">
              <div className="relative flex items-center space-x-3 text-sm">
                <div className="flex items-center justify-center w-5 h-5 bg-surface rounded-full border border-secondary/30 z-10">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                </div>
                <div>
                  <p className="font-medium text-textDark">Account Created</p>
                  <p className="text-xs text-textDark/50">Today at 10:23 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Activity icon for dashboard component inline fix
const Activity = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);
