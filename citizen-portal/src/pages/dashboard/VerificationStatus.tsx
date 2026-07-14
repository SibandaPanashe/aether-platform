import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CheckCircle2, Clock, UploadCloud, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const VerificationStatus = () => {
  // Mock current step for demonstration (0: uploaded, 1: processing, 2: verified)
  const currentStep = 1;

  const steps = [
    {
      title: 'Document Uploaded',
      description: 'Your National ID has been securely uploaded.',
      icon: UploadCloud,
      status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'current' : 'pending',
      date: 'Today, 10:45 AM',
    },
    {
      title: 'AI Verification Processing',
      description: 'Liveness detection and face matching in progress.',
      icon: Clock,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending',
      date: 'Estimated completion: 2 mins',
    },
    {
      title: 'Identity Verified',
      description: 'Your digital identity credential is ready.',
      icon: CheckCircle2,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending',
      date: '',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Verification Status</h1>
        <p className="text-textDark/70 mt-1">Track the progress of your identity verification.</p>
      </div>

      <Card>
        <CardHeader className="border-b border-secondary/10 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Current Status: In Progress</CardTitle>
            <Badge variant="warning">PROCESSING</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="relative border-l border-secondary/20 ml-4 md:ml-6 space-y-10 pb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';
              
              return (
                <div key={index} className="relative pl-8 md:pl-10">
                  <div 
                    className={`absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-surface ${
                      isCompleted ? 'bg-success text-surface' : 
                      isCurrent ? 'bg-accent text-primary shadow-sm' : 
                      'bg-background border-2 border-secondary/20 text-secondary/40'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className={`text-base font-semibold ${isCurrent ? 'text-accent drop-shadow-sm' : 'text-textDark'}`}>
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-textDark/70">{step.description}</p>
                    {step.date && (
                      <p className={`mt-2 text-xs font-medium ${isCurrent ? 'text-accent/80' : 'text-textDark/50'}`}>
                        {step.date}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="bg-surface border border-secondary/10 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start">
          <ShieldAlert className="h-5 w-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-sm text-textDark">Need help?</h4>
            <p className="text-xs text-textDark/70 mt-0.5">If your verification takes longer than 24 hours, contact support.</p>
          </div>
        </div>
        <Link to="/dashboard">
          <Button variant="outline" size="sm">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};
