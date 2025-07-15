import React from 'react';
import StatusNotificationBadge from '../../../components/ui/StatusNotificationBadge';

const StatusFilterTabs = ({ activeTab, onTabChange, statusCounts, className = '' }) => {
  const tabs = [
    {
      id: 'all',
      label: 'All Manuscripts',
      count: statusCounts.all || 0
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      count: statusCounts.inProgress || 0
    },
    {
      id: 'under-review',
      label: 'Under Review',
      count: statusCounts.underReview || 0
    },
    {
      id: 'revision-requested',
      label: 'Revision Requested',
      count: statusCounts.revisionRequested || 0
    },
    {
      id: 'completed',
      label: 'Completed',
      count: statusCounts.completed || 0
    }
  ];

  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2
              ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <StatusNotificationBadge
                count={tab.count}
                type={activeTab === tab.id ? 'default' : 'muted'}
                size="sm"
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default StatusFilterTabs;