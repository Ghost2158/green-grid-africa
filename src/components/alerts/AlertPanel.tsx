import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';
import { Alert } from '../../types';
import { clsx } from 'clsx';

interface AlertPanelProps {
  alerts: Alert[];
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return Zap;
      case 'info': return Clock;
      default: return AlertTriangle;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-orange-500 bg-orange-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-orange-500';
      case 'success': return 'text-green-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => {
        const Icon = getIcon(alert.type);
        return (
          <div
            key={alert.id}
            className={clsx(
              'border-l-4 p-4 rounded-r-lg transition-all duration-200 hover:shadow-md',
              getTypeColor(alert.type)
            )}
          >
            <div className="flex items-start space-x-3">
              <Icon className={clsx('w-5 h-5 mt-0.5', getIconColor(alert.type))} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-gray-900">{alert.title}</h4>
                  <span className="text-xs text-gray-500">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{alert.message}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};