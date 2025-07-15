import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionDropdown = ({
  actions = [],
  trigger = 'dots',
  position = 'bottom-right',
  size = 'default',
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleActionClick = (action) => {
    if (action.onClick) {
      action.onClick();
    }
    if (!action.keepOpen) {
      setIsOpen(false);
    }
  };

  const getTriggerIcon = () => {
    switch (trigger) {
      case 'chevron':
        return 'ChevronDown';
      case 'menu':
        return 'Menu';
      default:
        return 'MoreVertical';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'top-full left-0 mt-1';
      case 'bottom-right':
        return 'top-full right-0 mt-1';
      case 'top-left':
        return 'bottom-full left-0 mb-1';
      case 'top-right':
        return 'bottom-full right-0 mb-1';
      default:
        return 'top-full right-0 mt-1';
    }
  };

  const getActionClasses = (action) => {
    let baseClasses = 'flex items-center space-x-3 px-3 py-2 text-sm transition-colors duration-200 cursor-pointer';
    
    if (action.disabled) {
      baseClasses += ' text-muted-foreground cursor-not-allowed opacity-50';
    } else if (action.variant === 'destructive') {
      baseClasses += ' text-error hover:bg-error/10';
    } else if (action.variant === 'success') {
      baseClasses += ' text-success hover:bg-success/10';
    } else if (action.variant === 'warning') {
      baseClasses += ' text-warning hover:bg-warning/10';
    } else {
      baseClasses += ' text-foreground hover:bg-muted';
    }

    return baseClasses;
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Button
        ref={triggerRef}
        variant="ghost"
        size={size === 'sm' ? 'sm' : 'icon'}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="h-8 w-8"
      >
        <Icon 
          name={getTriggerIcon()} 
          size={size === 'sm' ? 14 : 16}
          className={isOpen ? 'rotate-180 transition-transform duration-200' : 'transition-transform duration-200'}
        />
      </Button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`
            absolute z-200 min-w-48 bg-popover border border-border rounded-md shadow-lg
            ${getPositionClasses()}
            animate-fade-in
          `}
        >
          <div className="py-1">
            {actions.map((action, index) => (
              <React.Fragment key={action.id || index}>
                {action.type === 'separator' ? (
                  <div className="h-px bg-border my-1" />
                ) : (
                  <div
                    className={getActionClasses(action)}
                    onClick={() => !action.disabled && handleActionClick(action)}
                  >
                    {action.icon && (
                      <Icon 
                        name={action.icon} 
                        size={16} 
                        className={action.disabled ? 'opacity-50' : ''}
                      />
                    )}
                    <span className="flex-1">{action.label}</span>
                    {action.shortcut && (
                      <span className="text-xs text-muted-foreground">
                        {action.shortcut}
                      </span>
                    )}
                    {action.badge && (
                      <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                        {action.badge}
                      </span>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActionDropdown;