import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthContextType, LoginCredentials, SignupData, AdminLoginData, User, ProfileData } from '../types/auth';
import { supabase, createUser, signInUser, getUserProfile, updateUserProfile, updateLastLogin } from '../utils/supabase';

// Mock users database for demo accounts
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'user@greengrid.com',
    name: 'John Consumer',
    role: 'user',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    isActive: true,
    permissions: ['view_consumer_dashboard', 'view_personal_usage'],
    profileCompleted: true,
    fullName: 'John Consumer',
    dateOfBirth: '1990-01-01',
    address: '123 Main Street, Nairobi',
    country: 'Kenya',
    state: 'Nairobi',
    phoneNumber: '+254700000000'
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
    permissions: ['view_all_dashboards', 'control_systems', 'view_diagnostics'],
    profileCompleted: true,
    fullName: 'Sarah Operator',
    dateOfBirth: '1985-05-15',
    address: '456 Industrial Ave, Mombasa',
    country: 'Kenya',
    state: 'Mombasa',
    phoneNumber: '+254711111111'
  },
  {
    id: 'admin-1',
    email: 'admin@greengrid.com',
    name: 'Michael Administrator',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    isActive: true,
    permissions: ['full_access', 'user_management', 'system_configuration', 'sensitive_data'],
    profileCompleted: true,
    fullName: 'Michael Administrator',
    dateOfBirth: '1980-12-20',
    address: '789 Admin Blvd, Nairobi',
    country: 'Kenya',
    state: 'Nairobi',
    phoneNumber: '+254722222222'
  }
];

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  showProfileModal: false
};

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SHOW_PROFILE_MODAL' }
  | { type: 'HIDE_PROFILE_MODAL' }
  | { type: 'UPDATE_USER'; payload: User };

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
        error: null,
        showProfileModal: !action.payload.profileCompleted
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
        error: null,
        showProfileModal: false
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SHOW_PROFILE_MODAL':
      return { ...state, showProfileModal: true };
    case 'HIDE_PROFILE_MODAL':
      return { ...state, showProfileModal: false };
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: action.payload,
        showProfileModal: false
      };
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
      // Check if it's a demo account
      const demoUser = mockUsers.find(u => u.email === credentials.email);
      if (demoUser) {
        // Handle demo login
        const user: User = {
          ...demoUser,
          lastLogin: new Date(),
          profileCompleted: demoUser.profileCompleted || false
        };
        
        localStorage.setItem('greengrid_user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return;
      }
      
      // Handle real Supabase authentication
      const authResult = await signInUser(credentials.email, credentials.password);
      
      if (authResult.user) {
        // Get user profile from database
        const profile = await getUserProfile(credentials.email);
        
        if (profile) {
          const user: User = {
            id: authResult.user.id,
            email: credentials.email,
            name: profile.fullName || 'User',
            role: 'user' as const, // Default role for new users
            createdAt: new Date(),
            lastLogin: new Date(),
            isActive: true,
            profileCompleted: profile.profileCompleted || false,
            fullName: profile.fullName || '',
            dateOfBirth: profile.dateOfBirth || '',
            address: profile.address || '',
            country: profile.country || '',
            state: profile.state || '',
            phoneNumber: profile.phoneNumber || '',
            permissions: ['view_consumer_dashboard', 'view_personal_usage']
          };

          localStorage.setItem('greengrid_user', JSON.stringify(user));
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } else {
          // Create basic user if no profile found
          const user: User = {
            id: authResult.user.id,
            email: credentials.email,
            name: 'User',
            role: 'user' as const,
            createdAt: new Date(),
            lastLogin: new Date(),
            isActive: true,
            profileCompleted: false,
            fullName: '',
            dateOfBirth: '',
            address: '',
            country: '',
            state: '',
            phoneNumber: '',
            permissions: ['view_consumer_dashboard', 'view_personal_usage']
          };

          localStorage.setItem('greengrid_user', JSON.stringify(user));
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        }
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
    }
  };

  const signup = async (data: SignupData): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Check if user already exists (demo or real)
      const existingDemoUser = mockUsers.find(u => u.email === data.email);
      if (existingDemoUser) {
        throw new Error('User already exists');
      }
      
      // Create user in Supabase
      const authResult = await createUser({
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role
      });

      // Fetch the user profile from Supabase
      const profile = await getUserProfile(data.email);

      // For all new users, start with blank/zero data before adding a solar system
      const newUser: User = {
        id: authResult.user.id,
        email: data.email,
        name: data.name,
        role: data.role,
        createdAt: new Date(),
        lastLogin: new Date(),
        isActive: true,
        profileCompleted: false,
        fullName: '',
        dateOfBirth: '',
        address: '',
        country: '',
        state: '',
        phoneNumber: '',
        permissions: data.role === 'user' 
          ? ['view_consumer_dashboard', 'view_personal_usage']
          : data.role === 'operator'
          ? ['view_all_dashboards', 'control_systems', 'view_diagnostics']
          : ['full_access', 'user_management', 'system_configuration', 'sensitive_data'],
        ...(data.role === 'operator' && { siteAccess: ['site-1'] })
      };
      localStorage.setItem('greengrid_user', JSON.stringify(newUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
    }
  };

  const adminLogin = async (data: AdminLoginData): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const user = mockUsers.find(u => u.email === data.email && u.role === 'admin');
      
      if (!user) {
        throw new Error('Admin user not found');
      }
      
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

  const refreshUserProfile = async () => {
    try {
      console.log('AuthContext: Refreshing user profile...');
      console.log('Current user state:', authState.user);
      
      if (!authState.user?.email) {
        console.log('AuthContext: No user email available for profile refresh');
        return;
      }
      
      const profile = await getUserProfile(authState.user.email);
      console.log('AuthContext: Retrieved profile from Supabase:', profile);
      
      if (profile) {
        console.log('AuthContext: Updating user state with profile data');
        dispatch({
          type: 'UPDATE_USER',
          payload: {
            ...authState.user,
            ...profile
          }
        });
        console.log('AuthContext: User state updated successfully');
      } else {
        console.log('AuthContext: No profile data found, keeping current user state');
      }
    } catch (error) {
      console.error('AuthContext: Error refreshing user profile:', error);
      // Don't throw error to prevent app crashes
    }
  };

  const updateProfile = async (profileData: ProfileData): Promise<void> => {
    if (!authState.user?.email) {
      throw new Error('No user email available for profile update');
    }

    try {
      console.log('Updating profile for:', authState.user.email, profileData);
      
      // Convert ProfileData to the format expected by updateUserProfile
      const updateData = {
        full_name: profileData.fullName,
        date_of_birth: profileData.dateOfBirth,
        address: profileData.address,
        country: profileData.country,
        state: profileData.state,
        phone_number: profileData.phoneNumber
      };
      
      await updateUserProfile(authState.user.id, updateData);
      
      // Refresh the user profile from database
      const updatedProfile = await getUserProfile(authState.user.email);
      
      if (updatedProfile) {
        const updatedUser: User = {
          ...authState.user,
          profileCompleted: updatedProfile.profileCompleted || true,
          fullName: updatedProfile.fullName || profileData.fullName,
          dateOfBirth: updatedProfile.dateOfBirth || profileData.dateOfBirth,
          address: updatedProfile.address || profileData.address,
          country: updatedProfile.country || profileData.country,
          state: updatedProfile.state || profileData.state,
          phoneNumber: updatedProfile.phoneNumber || profileData.phoneNumber
        };

        localStorage.setItem('greengrid_user', JSON.stringify(updatedUser));
        dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      } else {
        // If no profile found, update with the provided data
        const updatedUser: User = {
          ...authState.user,
          profileCompleted: true,
          fullName: profileData.fullName,
          dateOfBirth: profileData.dateOfBirth,
          address: profileData.address,
          country: profileData.country,
          state: profileData.state,
          phoneNumber: profileData.phoneNumber
        };

        localStorage.setItem('greengrid_user', JSON.stringify(updatedUser));
        dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('greengrid_user');
    dispatch({ type: 'LOGOUT' });
  };

  const closeProfileModal = (): void => {
    dispatch({ type: 'HIDE_PROFILE_MODAL' });
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
      case 'profile':
        return true; // Allow all authenticated users to access profile
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
    canAccessDashboard,
    updateProfile,
    refreshUserProfile,
    closeProfileModal
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