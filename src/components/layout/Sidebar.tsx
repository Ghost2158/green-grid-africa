import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Zap, 
  Sun, 
  Activity,
  MapPin,
  BarChart3,
  Shield
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'main', name: 'Main Dashboard', icon: LayoutDashboard, roles: ['operator', 'admin'] },
  { id: 'operator', name: 'Operator Dashboard', icon: Settings, roles: ['operator', 'admin'] },
  { id: 'consumer', name: 'Consumer Dashboard', icon: Users, roles: ['user', 'operator', 'admin'] },
  { id: 'admin', name: 'Admin Dashboard', icon: Shield, roles: ['admin'] },
  { id: 'analytics', name: 'Energy Analytics', icon: BarChart3, roles: ['operator', 'admin'] },
  { id: 'sites', name: 'Site Monitoring', icon: MapPin, roles: ['operator', 'admin'] },
  { id: 'predictions', name: 'AI Predictions', icon: Activity, roles: ['operator', 'admin'] },
  { id: 'alerts', name: 'Alerts & Monitoring', icon: Zap, roles: ['operator', 'admin'] },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { authState } = useAuth();
  
  const userRole = authState.user?.role;
  const availableNavigation = navigation.filter(item => 
    userRole && item.roles.includes(userRole)
  );

  return (
    <div className="bg-white shadow-lg h-full w-64 flex-shrink-0">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-primary-500 to-solar-500 p-2 rounded-lg">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">GreenGrid</h1>
              <p className="text-sm text-gray-500">Africa</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {availableNavigation.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={clsx(
                'w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 text-left',
                activeTab === item.id
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">System Status</p>
              <p className="text-xs text-green-600">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};