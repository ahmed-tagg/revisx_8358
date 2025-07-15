import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ className = '' }) => {
  const quickActions = [
    {
      id: 'new-submission',
      label: 'New Submission',
      description: 'Submit a new manuscript for review',
      icon: 'Plus',
      href: '/manuscript-submission',
      variant: 'default',
      primary: true
    },
    {
      id: 'view-all',
      label: 'View All Manuscripts',
      description: 'Browse your complete manuscript library',
      icon: 'Library',
      href: '/manuscript-library',
      variant: 'outline'
    },
    {
      id: 'track-status',
      label: 'Track Status',
      description: 'Monitor submission progress and reviews',
      icon: 'BarChart3',
      href: '/manuscript-status-tracking',
      variant: 'outline'
    },
    {
      id: 'profile',
      label: 'Update Profile',
      description: 'Manage your academic profile and preferences',
      icon: 'User',
      href: '/profile-management',
      variant: 'outline'
    }
  ];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-sm text-gray-500 mt-1">Common tasks and shortcuts</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              asChild
              variant={action.variant}
              className={`h-auto p-4 justify-start ${action.primary ? 'col-span-full sm:col-span-2' : ''}`}
            >
              <Link to={action.href} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  action.primary 
                    ? 'bg-blue-600 text-white' :'bg-gray-100 text-gray-600'
                }`}>
                  <Icon name={action.icon} size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-medium ${
                    action.primary ? 'text-white' : 'text-gray-900'
                  }`}>
                    {action.label}
                  </p>
                  <p className={`text-sm mt-1 ${
                    action.primary ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {action.description}
                  </p>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className={action.primary ? 'text-blue-200' : 'text-gray-400'} 
                />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;