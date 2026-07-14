import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Shield, Share2, Download, Copy } from 'lucide-react';

export const Credentials = () => {
  const { user } = useAuth();
  
  // Mock credential data
  const credential = {
    id: 'AETH-8492-7164-X9',
    issuedDate: '2026-07-13',
    expiryDate: '2031-07-13',
    trustLevel: 'Level 3 - Biometrically Verified',
    status: 'Active'
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Digital Credentials</h1>
          <p className="text-textDark/70 mt-1">Manage and share your verified identity.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="bg-surface">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <Button variant="primary">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="overflow-hidden border-0 shadow-lg relative bg-gradient-to-br from-primary to-secondary">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Shield className="w-32 h-32 text-surface" />
          </div>
          <CardHeader className="relative z-10 pb-0">
            <div className="flex items-center justify-between">
              <span className="text-surface font-semibold tracking-widest text-sm opacity-80 uppercase">Republic of Zimbabwe</span>
              <Badge variant="success" className="bg-success text-surface border-0 shadow-sm">VERIFIED</Badge>
            </div>
            <h3 className="text-surface font-bold text-2xl mt-4">Digital ID</h3>
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-surface/60 text-xs uppercase tracking-wider mb-1">Full Name</p>
                <p className="text-surface font-medium text-lg">{user?.firstName} {user?.lastName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-surface/60 text-xs uppercase tracking-wider mb-1">ID Number</p>
                  <p className="text-surface font-mono">{credential.id.split('-').slice(1).join('-')}</p>
                </div>
                <div>
                  <p className="text-surface/60 text-xs uppercase tracking-wider mb-1">Date of Issue</p>
                  <p className="text-surface">{credential.issuedDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="bg-surface/10 backdrop-blur-sm mt-4 p-4 border-t border-surface/20 flex justify-between items-center relative z-10">
            <div className="text-surface font-mono text-xs opacity-70">
              AETHER-DID-VALID
            </div>
            <Shield className="w-6 h-6 text-accent" />
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Credential Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2 border-b border-secondary/10">
                <span className="text-sm text-textDark/60">Credential ID</span>
                <span className="text-sm font-mono font-medium flex items-center">
                  {credential.id}
                  <button className="ml-2 text-secondary/60 hover:text-secondary"><Copy className="h-3 w-3" /></button>
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-secondary/10">
                <span className="text-sm text-textDark/60">Status</span>
                <Badge variant="success" className="h-5">{credential.status}</Badge>
              </div>
              <div className="flex justify-between py-2 border-b border-secondary/10">
                <span className="text-sm text-textDark/60">Trust Level</span>
                <span className="text-sm font-medium text-accent flex items-center">
                  <Shield className="h-3.5 w-3.5 mr-1.5" />
                  {credential.trustLevel}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-secondary/10">
                <span className="text-sm text-textDark/60">Valid Until</span>
                <span className="text-sm font-medium">{credential.expiryDate}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-textDark mb-1">Verify with QR</h4>
                <p className="text-xs text-textDark/60 max-w-[200px]">Scan to verify authenticity with the Aether App.</p>
              </div>
              <div className="w-24 h-24 bg-surface border-2 border-secondary/10 p-2 rounded-lg flex items-center justify-center">
                {/* Mock QR Code Pattern */}
                <div className="w-full h-full bg-[radial-gradient(#1B3A5C_2px,transparent_2px)] [background-size:6px_6px]"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
