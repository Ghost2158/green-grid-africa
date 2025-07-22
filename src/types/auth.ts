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
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
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

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  adminLogin: (data: AdminLoginData) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  canAccessDashboard: (dashboard: string) => boolean;
}