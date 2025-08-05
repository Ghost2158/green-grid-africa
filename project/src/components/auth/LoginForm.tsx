import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginCredentials } from '../../types/auth';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToAdmin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, onSwitchToAdmin }) => {
  const { login, authState } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-3">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
        </div>
        <p className="text-gray-600 text-lg">Sign in to your GreenGrid Africa account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white hover:border-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white hover:border-gray-300"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {authState.error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-pulse">
            <p className="text-red-800 text-sm font-medium">{authState.error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={authState.isLoading}
          className="w-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:via-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {authState.isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing In...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </div>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-lg">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-green-600 hover:text-green-700 font-bold transition-colors underline decoration-2 underline-offset-4 hover:decoration-green-700"
          >
            Sign up here
          </button>
        </p>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
        <h4 className="text-sm font-bold text-green-900 mb-3 flex items-center">
          <Sparkles className="w-4 h-4 mr-2" />
          Demo Accounts:
        </h4>
        <div className="text-sm text-green-800 space-y-2">
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <p className="font-semibold text-green-900">Consumer:</p>
            <p className="text-green-700">user@greengrid.com / password123</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <p className="font-semibold text-green-900">Operator:</p>
            <p className="text-green-700">operator@greengrid.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};