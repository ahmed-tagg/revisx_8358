import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      badge: null,
      tooltip: 'Overview of your manuscripts and recent activity'
    },
    {
      label: 'Submit Manuscript',
      path: '/manuscript-submission',
      icon: 'FileText',
      badge: null,
      tooltip: 'Submit a new manuscript for review'
    },
    {
      label: 'My Manuscripts',
      path: '/manuscript-status-tracking',
      icon: 'Files',
      badge: 3,
      tooltip: 'Track status of your submitted manuscripts'
    },
    {
      label: 'Library',
      path: '/manuscript-library',
      icon: 'Library',
      badge: null,
      tooltip: 'Browse your manuscript collection'
    },
    {
      label: 'Profile',
      path: '/profile-management',
      icon: 'User',
      badge: null,
      tooltip: 'Manage your academic profile and preferences'
    },
    {
      label: 'Administration',
      path: '/admin-panel',
      icon: 'Settings',
      badge: 2,
      tooltip: 'Administrative tools and journal management'
    }
  ];

  const isActivePath = (path) => {
    return location.pathname === path || 
           (path === '/manuscript-status-tracking' && location.pathname === '/manuscript-library');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 z-100 h-full bg-surface border-r border-border transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-60'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <Link to="/dashboard" className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary-foreground"
                  >
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="currentColor"
                      fillOpacity="0.1"
                    />
                    <polyline
                      points="14,2 14,8 20,8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="16"
                      y1="13"
                      x2="8"
                      y2="13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="16"
                      y1="17"
                      x2="8"
                      y2="17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xl font-heading font-semibold text-foreground">
                  RevisX
                </span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <div className="relative flex items-center">
                    <Icon name={item.icon} size={20} />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-200">
                    {item.label}
                    {item.tooltip && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.tooltip}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-muted-foreground" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Dr. Sarah Johnson
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    sarah.johnson@university.edu
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        {/* This will be handled by the Header component's mobile menu */}
      </div>
    </>
  );
};

export default Sidebar;