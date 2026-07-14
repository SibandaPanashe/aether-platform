import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Plus, Copy, Trash2, Key } from 'lucide-react';

export const ApiKeys = () => {
  const keys = [
    { id: 'key_1', name: 'Production Backend', prefix: 'pk_live_...', created: '2026-01-10', lastUsed: '2026-07-13 14:30', status: 'active' },
    { id: 'key_2', name: 'Development Environment', prefix: 'pk_test_...', created: '2026-02-15', lastUsed: '2026-07-12 09:15', status: 'active' },
    { id: 'key_3', name: 'Legacy Integration', prefix: 'pk_live_...', created: '2025-11-20', lastUsed: '2026-05-01 11:20', status: 'revoked' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-primary">API Keys</h2>
          <p className="text-textDark/60 mt-1">Manage your API keys for programmatic verification access.</p>
        </div>
        <Button variant="primary">
          <Plus className="mr-2 h-4 w-4" /> Generate New Key
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="mr-2 h-5 w-5 text-secondary" />
            Active Keys
          </CardTitle>
          <CardDescription>
            These keys grant access to the Aether Verification API on behalf of your organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key Name</TableHead>
                <TableHead>Prefix</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium text-primary">{key.name}</TableCell>
                  <TableCell className="font-mono text-xs text-textDark/70">{key.prefix}</TableCell>
                  <TableCell className="text-sm">{key.created}</TableCell>
                  <TableCell className="text-sm">{key.lastUsed}</TableCell>
                  <TableCell>
                    <Badge variant={key.status === 'active' ? 'success' : 'error'}>
                      {key.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {key.status === 'active' && (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" title="Copy Key ID">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="danger" size="sm" title="Revoke Key">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
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
