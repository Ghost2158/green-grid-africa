import React, { useState } from 'react';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthPage } from './pages/AuthPage';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { MainDashboard } from './pages/MainDashboard';
import { OperatorDashboard } from './pages/OperatorDashboard';
import { ConsumerDashboard } from './pages/ConsumerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AlertsMonitoring } from './pages/AlertsMonitoring';
import { EnergyAnalytics } from './pages/EnergyAnalytics';
import { SiteMonitoring } from './pages/SiteMonitoring';
import { AIPredictions } from './pages/AIPredictions';
import { LogOut, User } from 'lucide-react';

const dashboardConfig = {
  main: {
    title: 'Main Dashboard',
    subtitle: 'System overview and key metrics',
    component: MainDashboard,
    requiredRole: 'operator' as const
  },
  operator: {
    title: 'Operator Dashboard',
    subtitle: 'Technical controls and diagnostics',
    component: OperatorDashboard,
    requiredRole: 'operator' as const
  },
  consumer: {
    title: 'Consumer Dashboard',
    subtitle: 'Personal energy insights and savings',
    component: ConsumerDashboard,
    requiredRole: 'user' as const
  },
  admin: {
    title: 'Administrator Dashboard',
    subtitle: 'System administration and user management',
    component: AdminDashboard,
    requiredRole: 'admin' as const
  },
  analytics: {
    title: 'Energy Analytics',
    subtitle: 'Comprehensive energy performance analysis',
    component: EnergyAnalytics,
    requiredRole: 'operator' as const
  },
  sites: {
    title: 'Site Monitoring',
    subtitle: 'Real-time monitoring and control of all installations',
    component: SiteMonitoring,
    requiredRole: 'operator' as const
  },
  predictions: {
    title: 'AI Predictions',
    subtitle: 'Advanced machine learning forecasting and analytics',
    component: AIPredictions,
    requiredRole: 'operator' as const
  },
  alerts: {
    title: 'AI Alerts & Monitoring',
    subtitle: 'Intelligent monitoring and predictive analytics',
    component: AlertsMonitoring,
    requiredRole: 'operator' as const
  }
};

const AppContent: React.FC = () => {
  const { authState, logout, canAccessDashboard } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(() => {
    if (!authState.user) return 'main';
    
    // Set default dashboard based on user role
    switch (authState.user.role) {
      case 'user':
        return 'consumer';
      case 'operator':
        return 'main';
      case 'admin':
        return 'admin';
      default:
        return 'main';
    }
  });

  // Update active tab when user logs in
  React.useEffect(() => {
    if (authState.user) {
      switch (authState.user.role) {
        case 'user':
          setActiveTab('consumer');
          break;
        case 'operator':
          setActiveTab('main');
          break;
        case 'admin':
          setActiveTab('admin');
          break;
      }
    }
  }, [authState.user]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  if (!authState.isAuthenticated) {
    return <AuthPage />;
  }

  const currentDashboard = dashboardConfig[activeTab as keyof typeof dashboardConfig];
  const DashboardComponent = currentDashboard.component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            if (canAccessDashboard(tab)) {
              setActiveTab(tab);
            }
          }}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between bg-white shadow-sm border-b border-gray-200 h-16 px-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{currentDashboard.title}</h1>
              <p className="text-sm text-gray-500">{currentDashboard.subtitle}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{authState.user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{authState.user?.role}</p>
                </div>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
          
          <main className="flex-1 overflow-y-auto p-6">
            <ProtectedRoute 
              requiredRole={currentDashboard.requiredRole}
              dashboard={activeTab}
            >
              <DashboardComponent />
            </ProtectedRoute>
          </main>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;