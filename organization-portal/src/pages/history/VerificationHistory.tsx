import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Download, Search, Filter } from 'lucide-react';

export const VerificationHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const historyData = [
    { id: 'VER-001', date: '2026-07-13 14:30', credential: 'ZWE-ID-9923', status: 'valid', trust: 'High', operator: 'admin@bank.co.zw' },
    { id: 'VER-002', date: '2026-07-13 14:15', credential: 'ZWE-DL-1104', status: 'valid', trust: 'High', operator: 'teller1@bank.co.zw' },
    { id: 'VER-003', date: '2026-07-13 13:45', credential: 'ZWE-PP-5521', status: 'invalid', trust: 'Low', operator: 'teller2@bank.co.zw' },
    { id: 'VER-004', date: '2026-07-13 13:20', credential: 'ZWE-ID-8832', status: 'valid', trust: 'Medium', operator: 'admin@bank.co.zw' },
    { id: 'VER-005', date: '2026-07-13 12:50', credential: 'ZWE-ID-1029', status: 'valid', trust: 'High', operator: 'admin@bank.co.zw' },
    { id: 'VER-006', date: '2026-07-12 16:45', credential: 'ZWE-ID-7741', status: 'valid', trust: 'High', operator: 'teller1@bank.co.zw' },
    { id: 'VER-007', date: '2026-07-12 15:10', credential: 'ZWE-ID-3392', status: 'invalid', trust: 'Low', operator: 'teller1@bank.co.zw' },
    { id: 'VER-008', date: '2026-07-12 11:25', credential: 'ZWE-DL-4819', status: 'valid', trust: 'High', operator: 'admin@bank.co.zw' },
  ];

  const filteredData = historyData.filter(item => 
    item.credential.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Verification History</h2>
          <p className="text-textDark/60 mt-1">Review past credential validations.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textDark/40" />
            <Input 
              placeholder="Search by Credential or Verification ID..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="secondary" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Verification ID</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Credential Ref</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trust Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium text-primary">{activity.id}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell className="font-mono text-xs">{activity.credential}</TableCell>
                  <TableCell className="text-sm text-textDark/70">{activity.operator}</TableCell>
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
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-textDark/50">
                    No verification records found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
