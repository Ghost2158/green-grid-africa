import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  color?: 'primary' | 'solar' | 'grid' | 'success' | 'warning' | 'error';
  className?: string;
}

const colorClasses = {
  primary: 'bg-primary-50 text-primary-600 border-primary-200',
  solar: 'bg-solar-50 text-solar-600 border-solar-200',
  grid: 'bg-grid-50 text-grid-600 border-grid-200',
  success: 'bg-green-50 text-green-600 border-green-200',
  warning: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  error: 'bg-red-50 text-red-600 border-red-200',
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  icon: Icon,
  color = 'primary',
  className
}) => {
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {unit && (
              <span className="text-sm font-medium text-gray-500">{unit}</span>
            )}
          </div>
          {change && (
            <div className={cn(
              "flex items-center mt-2 text-sm font-medium",
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            )}>
              <span className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs",
                change.type === 'increase' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              )}>
                {change.type === 'increase' ? '↗' : '↘'} {Math.abs(change.value)}%
              </span>
            </div>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl border-2",
          colorClasses[color]
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};