import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { QrCode, ShieldCheck, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export const VerifyCredential = () => {
  const [credentialData, setCredentialData] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentialData.trim()) return;

    setIsVerifying(true);
    setResult(null);

    // Mock verification delay and response
    setTimeout(() => {
      setIsVerifying(false);
      // Simulate validation logic
      if (credentialData.includes('invalid')) {
        setResult({
          status: 'invalid',
          trustLevel: 'Low',
          message: 'The provided credential signature is invalid or has been revoked.',
          date: new Date().toISOString(),
        });
      } else {
        setResult({
          status: 'valid',
          trustLevel: 'High',
          credentialId: 'ZWE-ID-' + Math.floor(Math.random() * 10000),
          holderName: 'V***** *******', // Masked name
          date: new Date().toISOString(),
          issuer: 'Aether Authority',
        });
      }
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">Verify Credential</h2>
        <p className="text-textDark/60 mt-1">Validate a citizen's digital credential to establish trust.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <QrCode className="mr-2 h-5 w-5 text-secondary" />
            Scan or Enter Credential
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleVerify}>
          <CardContent className="space-y-4">
            <div className="bg-background/50 border border-dashed border-secondary/30 rounded-lg p-8 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-background transition-colors">
              <QrCode className="h-12 w-12 text-secondary/40 mb-3" />
              <p className="font-medium text-primary">Click to activate scanner</p>
              <p className="text-sm text-textDark/50 mt-1">Scan the QR code presented by the citizen</p>
            </div>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-secondary/10"></div>
              <span className="flex-shrink-0 mx-4 text-textDark/40 text-xs font-semibold uppercase">OR ENTER MANUALLY</span>
              <div className="flex-grow border-t border-secondary/10"></div>
            </div>

            <Input
              label="Credential JWT / Token String"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={credentialData}
              onChange={(e) => setCredentialData(e.target.value)}
              disabled={isVerifying}
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button 
              type="submit" 
              variant="primary" 
              disabled={isVerifying || !credentialData.trim()}
              className="w-full sm:w-auto"
            >
              {isVerifying ? 'Verifying...' : 'Verify Credential'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {result && (
        <Card className={result.status === 'valid' ? 'border-success/30 bg-success/5' : 'border-red-500/30 bg-red-50'}>
          <CardHeader className="border-b-0 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                {result.status === 'valid' ? (
                  <><ShieldCheck className="mr-2 h-6 w-6 text-success" /> Valid Credential</>
                ) : (
                  <><ShieldAlert className="mr-2 h-6 w-6 text-red-600" /> Invalid Credential</>
                )}
              </CardTitle>
              <Badge variant={result.status === 'valid' ? 'success' : 'error'} className="text-sm px-3 py-1">
                {result.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {result.status === 'valid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <p className="text-xs text-textDark/50 uppercase font-semibold">Credential ID</p>
                  <p className="font-mono text-primary font-medium">{result.credentialId}</p>
                </div>
                <div>
                  <p className="text-xs text-textDark/50 uppercase font-semibold">Trust Level</p>
                  <p className="text-success font-bold">{result.trustLevel}</p>
                </div>
                <div>
                  <p className="text-xs text-textDark/50 uppercase font-semibold">Holder Name (Masked)</p>
                  <p className="text-primary font-medium flex items-center">
                    {result.holderName}
                    <CheckCircle2 className="ml-2 h-4 w-4 text-success" />
                  </p>
                </div>
                <div>
                  <p className="text-xs text-textDark/50 uppercase font-semibold">Issuer</p>
                  <p className="text-primary font-medium flex items-center">
                    <FileText className="mr-1 h-4 w-4 text-secondary/60" /> {result.issuer}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-textDark/50 uppercase font-semibold">Verified At</p>
                  <p className="text-primary text-sm">{new Date(result.date).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <p className="text-red-700 font-medium mt-2">{result.message}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
