import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthContextType, LoginCredentials, SignupData, AdminLoginData, User } from '../types/auth';

// Mock users database
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'user@greengrid.com',
    name: 'John Consumer',
    role: 'user',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    isActive: true,
    permissions: ['view_consumer_dashboard', 'view_personal_usage']
  },
  {
    id: 'operator-1',
    email: 'operator@greengrid.com',
    name: 'Sarah Operator',
    role: 'operator',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    isActive: true,
    siteAccess: ['site-1', 'site-2'],
    permissions: ['view_all_dashboards', 'control_systems', 'view_diagnostics']
  },
  {
    id: 'admin-1',
    email: 'admin@greengrid.com',
    name: 'Michael Administrator',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    isActive: true,
    permissions: ['full_access', 'user_management', 'system_configuration', 'sensitive_data']
  }
];

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('greengrid_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('greengrid_user');
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // In a real app, you'd verify the password here
      if (credentials.password !== 'password123') {
        throw new Error('Invalid password');
      }
      
      const updatedUser = { ...user, lastLogin: new Date() };
      localStorage.setItem('greengrid_user', JSON.stringify(updatedUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
    }
  };

  const signup = async (data: SignupData): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      if (mockUsers.find(u => u.email === data.email)) {
        throw new Error('User already exists');
      }
      
      const newUser: User = {
        id: `${data.role}-${Date.now()}`,
        email: data.email,
        name: data.name,
        role: data.role,
        createdAt: new Date(),
        lastLogin: new Date(),
        isActive: true,
        permissions: data.role === 'user' 
          ? ['view_consumer_dashboard', 'view_personal_usage']
          : ['view_all_dashboards', 'control_systems', 'view_diagnostics'],
        ...(data.role === 'operator' && { siteAccess: ['site-1'] })
      };
      
      mockUsers.push(newUser);
      localStorage.setItem('greengrid_user', JSON.stringify(newUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
    }
  };

  const adminLogin = async (data: AdminLoginData): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === data.email && u.role === 'admin');
      
      if (!user) {
        throw new Error('Admin user not found');
      }
      
      // Check admin code (in real app, this would be more secure)
      if (data.adminCode !== 'ADMIN2024') {
        throw new Error('Invalid admin code');
      }
      
      if (data.password !== 'admin123') {
        throw new Error('Invalid password');
      }
      
      const updatedUser = { ...user, lastLogin: new Date() };
      localStorage.setItem('greengrid_user', JSON.stringify(updatedUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
    }
  };

  const logout = (): void => {
    localStorage.removeItem('greengrid_user');
    dispatch({ type: 'LOGOUT' });
  };

  const hasPermission = (permission: string): boolean => {
    if (!authState.user) return false;
    return authState.user.permissions?.includes(permission) || 
           authState.user.permissions?.includes('full_access') || false;
  };

  const canAccessDashboard = (dashboard: string): boolean => {
    if (!authState.user) return false;
    
    const { role } = authState.user;
    
    switch (dashboard) {
      case 'consumer':
        return role === 'user' || role === 'operator' || role === 'admin';
      case 'operator':
      case 'main':
      case 'analytics':
      case 'sites':
      case 'predictions':
      case 'alerts':
        return role === 'operator' || role === 'admin';
      case 'admin':
        return role === 'admin';
      default:
        return false;
    }
  };

  const value: AuthContextType = {
    authState,
    login,
    signup,
    adminLogin,
    logout,
    hasPermission,
    canAccessDashboard
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};