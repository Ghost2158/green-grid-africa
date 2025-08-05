import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield, Key } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { AdminLoginData } from '../../types/auth';

interface AdminLoginFormProps {
  onSwitchToLogin: () => void;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSwitchToLogin }) => {
  const { adminLogin, authState } = useAuth();
  const [formData, setFormData] = useState<AdminLoginData>({
    email: '',
    password: '',
    adminCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminLogin(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Administrator Access</h2>
        <p className="text-gray-600">Secure login for system administrators</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-red-600" />
          <p className="text-red-800 text-sm font-medium">Restricted Access</p>
        </div>
        <p className="text-red-700 text-xs mt-1">
          This area is for authorized administrators only. All access attempts are logged.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Administrator Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter admin email"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700 mb-2">
            Administrator Code
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showAdminCode ? 'text' : 'password'}
              id="adminCode"
              name="adminCode"
              value={formData.adminCode}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter admin code"
              required
            />
            <button
              type="button"
              onClick={() => setShowAdminCode(!showAdminCode)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showAdminCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {authState.error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800 text-sm">{authState.error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={authState.isLoading}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {authState.isLoading ? 'Authenticating...' : 'Administrator Login'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={onSwitchToLogin}
          className="text-gray-600 hover:text-gray-700 font-semibold text-sm transition-colors"
        >
          ← Back to regular login
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Demo Admin Access:</h4>
        <div className="text-xs text-gray-700 space-y-1">
          <p><strong>Email:</strong> admin@greengrid.com</p>
          <p><strong>Password:</strong> admin123</p>
          <p><strong>Admin Code:</strong> ADMIN2024</p>
        </div>
      </div>
    </div>
  );
};