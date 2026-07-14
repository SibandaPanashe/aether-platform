import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

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
      // For now, mock a successful login if the API isn't ready
      // const res = await axios.post('http://localhost:8080/api/v1/auth/login', data);
      // const { access_token, refresh_token, user } = res.data;
      
      // Mock Data
      const access_token = 'mock_access_token';
      const refresh_token = 'mock_refresh_token';
      const user = {
        id: 'org_user_1',
        email: data.email,
        name: 'Admin User',
        organization_id: 'ORG-CBZ-001',
        role: 'admin'
      };

      login(access_token, refresh_token, user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl">Organization Access</CardTitle>
        <p className="text-sm text-textDark/60 mt-1">Sign in with your organizational credentials</p>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
              {error}
            </div>
          )}
          <Input
            label="Organization Email"
            type="email"
            placeholder="admin@institution.co.zw"
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
            {loading ? 'Authenticating...' : 'Access Portal'}
          </Button>
          <p className="text-xs text-center text-textDark/50">
            For access issues, please contact the Aether support desk.
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};
