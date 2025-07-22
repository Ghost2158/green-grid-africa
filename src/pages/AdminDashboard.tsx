import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Database, 
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  UserPlus,
  Trash2,
  Edit
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { StatusBadge } from '../components/ui/StatusBadge';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'operator' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: Date;
  createdAt: Date;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock admin data
  const systemUsers: SystemUser[] = [
    {
      id: 'user-1',
      name: 'John Consumer',
      email: 'user@greengrid.com',
      role: 'user',
      status: 'active',
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'operator-1',
      name: 'Sarah Operator',
      email: 'operator@greengrid.com',
      role: 'operator',
      status: 'active',
      lastLogin: new Date(Date.now() - 30 * 60 * 1000),
      createdAt: new Date('2024-01-10')
    },
    {
      id: 'admin-1',
      name: 'Michael Administrator',
      email: 'admin@greengrid.com',
      role: 'admin',
      status: 'active',
      lastLogin: new Date(),
      createdAt: new Date('2024-01-01')
    }
  ];

  const systemStats = {
    totalUsers: systemUsers.length,
    activeUsers: systemUsers.filter(u => u.status === 'active').length,
    totalSites: 4,
    systemUptime: 99.8,
    dataIntegrity: 100,
    securityAlerts: 0
  };

  const securityLogs = [
    {
      id: 'log-1',
      type: 'login',
      user: 'admin@greengrid.com',
      action: 'Administrator login successful',
      timestamp: new Date(),
      severity: 'info'
    },
    {
      id: 'log-2',
      type: 'access',
      user: 'operator@greengrid.com',
      action: 'Accessed operator dashboard',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      severity: 'info'
    },
    {
      id: 'log-3',
      type: 'warning',
      user: 'system',
      action: 'Failed login attempt detected',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      severity: 'warning'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={systemStats.totalUsers}
          icon={Users}
          color="primary"
          change={{ value: 12, type: 'increase' }}
        />
        <MetricCard
          title="Active Users"
          value={systemStats.activeUsers}
          icon={Activity}
          color="success"
        />
        <MetricCard
          title="System Uptime"
          value={systemStats.systemUptime}
          unit="%"
          icon={CheckCircle}
          color="success"
        />
        <MetricCard
          title="Security Alerts"
          value={systemStats.securityAlerts}
          icon={Shield}
          color={systemStats.securityAlerts > 0 ? 'error' : 'success'}
        />
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="System Health" subtitle="Critical system components">
          <div className="space-y-4">
            {[
              { name: 'Database', status: 'operational', uptime: '99.9%' },
              { name: 'API Gateway', status: 'operational', uptime: '99.8%' },
              { name: 'Authentication Service', status: 'operational', uptime: '100%' },
              { name: 'Data Processing', status: 'operational', uptime: '99.7%' },
              { name: 'Monitoring System', status: 'operational', uptime: '99.9%' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-gray-900">{service.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">Operational</div>
                  <div className="text-xs text-gray-500">{service.uptime} uptime</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Security Overview" subtitle="Recent security events">
          <div className="space-y-3">
            {securityLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  log.severity === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{log.user}</span>
                    <span className="text-xs text-gray-500">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {systemUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'operator' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge 
                      status={user.status === 'active' ? 'online' : 'offline'} 
                      size="sm" 
                    />
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {user.lastLogin.toLocaleDateString()} {user.lastLogin.toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">System Configuration</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Security Settings" subtitle="Authentication and access control">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                <div className="text-sm text-gray-500">Require 2FA for all admin accounts</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Session Timeout</div>
                <div className="text-sm text-gray-500">Auto-logout after inactivity</div>
              </div>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
                <option>4 hours</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Login Monitoring</div>
                <div className="text-sm text-gray-500">Track failed login attempts</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>

        <Card title="Data Management" subtitle="Backup and retention policies">
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">Automatic Backups</div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-sm text-gray-600">
                Last backup: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Data Retention</div>
              <div className="text-sm text-gray-600">
                Sensor data: 2 years<br />
                User logs: 1 year<br />
                System logs: 6 months
              </div>
            </div>
            
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Configure Backup Settings
            </button>
          </div>
        </Card>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'System Overview', icon: Activity },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'security', name: 'Security Logs', icon: Shield },
    { id: 'settings', name: 'System Settings', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <Shield className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">Administrator Dashboard</h1>
            <p className="text-red-100">System administration and management</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'users' && renderUserManagement()}
      {activeTab === 'security' && (
        <Card title="Security Logs" subtitle="System access and security events">
          <div className="space-y-3">
            {securityLogs.map((log) => (
              <div key={log.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                <div className={`w-3 h-3 rounded-full mt-1 ${
                  log.severity === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{log.action}</p>
                    <span className="text-sm text-gray-500">
                      {log.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">User: {log.user}</p>
                  <p className="text-xs text-gray-500 mt-1">Type: {log.type}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {activeTab === 'settings' && renderSystemSettings()}
    </div>
  );
};