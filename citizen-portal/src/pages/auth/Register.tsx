import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import axios from 'axios';
import logo from '../../assets/logo.svg';

export const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const password = watch("password");

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:8080/api/v1/auth/register', {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Basic password strength logic
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength();

  return (
    <Card glass className="w-full">
      <CardHeader className="items-center pb-2">
        <img src={logo} alt="Aether Logo" className="h-10 w-auto mb-2" />
        <CardTitle>Create Account</CardTitle>
        <p className="text-sm text-textDark">Register for your digital identity</p>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-100/90 rounded-md border border-red-200">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              {...register('firstName', { required: 'First name is required' })}
              error={errors.firstName?.message as string}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              {...register('lastName', { required: 'Last name is required' })}
              error={errors.lastName?.message as string}
            />
          </div>
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message as string}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' }
            })}
            error={errors.password?.message as string}
          />
          
          {password && (
            <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  strength <= 25 ? 'bg-red-500' : strength <= 50 ? 'bg-accent' : 'bg-success'
                }`}
                style={{ width: `${strength}%` }}
              />
            </div>
          )}

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            {...register('confirm_password', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            error={errors.confirm_password?.message as string}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
          <div className="text-sm text-center text-textDark">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-secondary hover:underline">
              Sign in here
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};
