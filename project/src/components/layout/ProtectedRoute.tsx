import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'operator' | 'admin';
  requiredPermission?: string;
  dashboard?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  requiredPermission,
  dashboard 
}) => {
  const { authState, hasPermission, canAccessDashboard } = useAuth();

  if (!authState.isAuthenticated || !authState.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  // Check role-based access
  if (requiredRole && authState.user.role !== requiredRole && authState.user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">
            You don't have permission to access this page. Required role: {requiredRole}
          </p>
        </div>
      </div>
    );
  }

  // Check permission-based access
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Insufficient Permissions</h2>
          <p className="text-gray-600">
            You don't have the required permissions to access this page.
          </p>
        </div>
      </div>
    );
  }

  // Check dashboard-specific access
  if (dashboard && !canAccessDashboard(dashboard)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Access Denied</h2>
          <p className="text-gray-600">
            You don't have access to the {dashboard} dashboard.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};