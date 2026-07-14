import React from 'react';
import { cn } from './Button';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-primary mb-1.5">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-secondary/20 bg-surface px-3 py-2 text-sm text-textDark ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-textDark/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:bg-background disabled:opacity-50 transition-colors hover:border-secondary/40",
            error && "border-red-500 focus-visible:ring-red-500 hover:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
        )}
        {!error && helperText && (
          <p className="mt-1.5 text-xs text-textDark/60">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
