export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'operator' | 'admin';
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  siteAccess?: string[]; // For operators - which sites they can access
  permissions?: string[]; // For fine-grained permissions
  // Profile information
  fullName?: string;
  dateOfBirth?: string;
  address?: string;
  country?: string;
  state?: string;
  phoneNumber?: string;
  profileCompleted?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  showProfileModal: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: 'user' | 'operator';
}

export interface AdminLoginData {
  email: string;
  password: string;
  adminCode: string;
}

export interface ProfileData {
  fullName: string;
  dateOfBirth: string;
  address: string;
  country: string;
  state: string;
  phoneNumber: string;
}

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  adminLogin: (data: AdminLoginData) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  canAccessDashboard: (dashboard: string) => boolean;
  updateProfile: (data: ProfileData) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  closeProfileModal: () => void;
}