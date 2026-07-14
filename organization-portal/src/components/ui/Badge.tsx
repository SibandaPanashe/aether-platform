import React from 'react';
import { cn } from './Button';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
          {
            'bg-secondary/10 text-secondary': variant === 'default',
            'bg-success/10 text-success': variant === 'success',
            'bg-accent/20 text-accent': variant === 'warning',
            'bg-red-500/10 text-red-600': variant === 'error',
            'border border-secondary/20 text-secondary': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
