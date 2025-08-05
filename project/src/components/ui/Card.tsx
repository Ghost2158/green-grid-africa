import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick, title, subtitle }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-xl hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="p-6 pb-4">
          {title && <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className={title || subtitle ? "px-6 pb-6" : "p-6"}>
        {children}
      </div>
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={clsx('p-6 pb-4', className)}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={clsx('p-6 pt-0', className)}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return (
    <h3 className={clsx('text-lg font-semibold text-gray-900', className)}>
      {children}
    </h3>
  );
};