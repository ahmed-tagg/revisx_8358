import React from 'react';
import Icon from '../AppIcon';

const StatusNotificationBadge = ({ 
  count = 0, 
  type = 'default', 
  size = 'default',
  showIcon = false,
  animate = true,
  className = ''
}) => {
  if (count === 0) return null;

  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    default: 'w-5 h-5 text-xs',
    lg: 'w-6 h-6 text-sm'
  };

  const typeClasses = {
    default: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground',
    muted: 'bg-muted text-muted-foreground'
  };

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <span 
      className={`
        inline-flex items-center justify-center
        ${sizeClasses[size]}
        ${typeClasses[type]}
        rounded-full font-medium
        ${animate ? 'animate-fade-in' : ''}
        ${className}
      `}
    >
      {showIcon && count === 1 ? (
        <Icon name="AlertCircle" size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} />
      ) : (
        displayCount
      )}
    </span>
  );
};

export default StatusNotificationBadge;