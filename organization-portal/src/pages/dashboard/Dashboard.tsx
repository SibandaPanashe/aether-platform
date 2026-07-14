import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { ShieldCheck, Clock, AlertTriangle, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const Dashboard = () => {
  const stats = [
    { title: 'Total Verifications', value: '12,450', icon: ShieldCheck, color: 'text-primary' },
    { title: 'Verified Today', value: '342', icon: FileCheck, color: 'text-success' },
    { title: 'Pending Reviews', value: '18', icon: Clock, color: 'text-accent' },
    { title: 'Fraud Alerts', value: '3', icon: AlertTriangle, color: 'text-red-500' },
  ];

  const recentActivity = [
    { id: 'VER-001', date: '2026-07-13 14:30', credential: 'ZWE-ID-9923', status: 'valid', trust: 'High' },
    { id: 'VER-002', date: '2026-07-13 14:15', credential: 'ZWE-DL-1104', status: 'valid', trust: 'High' },
    { id: 'VER-003', date: '2026-07-13 13:45', credential: 'ZWE-PP-5521', status: 'invalid', trust: 'Low' },
    { id: 'VER-004', date: '2026-07-13 13:20', credential: 'ZWE-ID-8832', status: 'valid', trust: 'Medium' },
    { id: 'VER-005', date: '2026-07-13 12:50', credential: 'ZWE-ID-1029', status: 'valid', trust: 'High' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Overview</h2>
        <Link to="/verify">
          <Button variant="primary">
            Verify a Credential
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center mr-4">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-textDark/60">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Verifications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Verification ID</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Credential Ref</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trust Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium text-primary">{activity.id}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell className="font-mono text-xs">{activity.credential}</TableCell>
                  <TableCell>
                    <Badge variant={activity.status === 'valid' ? 'success' : 'error'}>
                      {activity.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm font-semibold ${
                      activity.trust === 'High' ? 'text-success' : 
                      activity.trust === 'Medium' ? 'text-accent' : 'text-red-500'
                    }`}>
                      {activity.trust}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
