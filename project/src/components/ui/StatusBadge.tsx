import React from 'react';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'maintenance' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const statusClasses = {
    online: 'bg-green-100 text-green-800',
    offline: 'bg-red-100 text-red-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    warning: 'bg-orange-100 text-orange-800',
  };

  return (
    <span className={clsx(baseClasses, sizeClasses[size], statusClasses[status])}>
      <span className={clsx('w-2 h-2 rounded-full mr-2', {
        'bg-green-500': status === 'online',
        'bg-red-500': status === 'offline',
        'bg-yellow-500': status === 'maintenance',
        'bg-orange-500': status === 'warning',
      })} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};