import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import logo from '../../assets/logo.svg';

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', data);
      const { access_token, refresh_token, user } = res.data;
      login(access_token, refresh_token, user || { id: '1', email: data.email, firstName: 'Citizen', lastName: 'User' });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card glass className="w-full">
      <CardHeader className="items-center pb-2">
        <img src={logo} alt="Aether Logo" className="h-12 w-auto mb-2" />
        <CardTitle>Welcome Back</CardTitle>
        <p className="text-sm text-textDark/70">Sign in to your citizen portal</p>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-100/90 rounded-md border border-red-200">
              {error}
            </div>
          )}
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
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message as string}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          <div className="text-sm text-center text-textDark">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-secondary hover:underline">
              Register here
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};
