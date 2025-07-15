import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTimeline = ({ activities, className = '' }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'submission':
        return { name: 'FileText', color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'review':
        return { name: 'Eye', color: 'text-yellow-600', bg: 'bg-yellow-50' };
      case 'revision':
        return { name: 'Edit', color: 'text-orange-600', bg: 'bg-orange-50' };
      case 'acceptance':
        return { name: 'CheckCircle', color: 'text-green-600', bg: 'bg-green-50' };
      case 'rejection':
        return { name: 'XCircle', color: 'text-red-600', bg: 'bg-red-50' };
      case 'publication':
        return { name: 'Globe', color: 'text-purple-600', bg: 'bg-purple-50' };
      case 'comment':
        return { name: 'MessageCircle', color: 'text-gray-600', bg: 'bg-gray-50' };
      default:
        return { name: 'Circle', color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityTime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <p className="text-sm text-gray-500 mt-1">Latest updates on your manuscripts</p>
      </div>
      
      <div className="p-6">
        {activities.length > 0 ? (
          <div className="flow-root">
            <ul className="-mb-8">
              {activities.map((activity, index) => {
                const isLast = index === activities.length - 1;
                const iconConfig = getActivityIcon(activity.type);
                
                return (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {!isLast && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full ${iconConfig.bg} flex items-center justify-center ring-8 ring-white`}>
                            <Icon 
                              name={iconConfig.name} 
                              size={16} 
                              className={iconConfig.color} 
                            />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">{activity.title}</span>
                            </p>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {formatTimeAgo(activity.timestamp)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {activity.description}
                          </p>
                          {activity.manuscriptTitle && (
                            <p className="text-sm text-blue-600 mt-1 font-medium">
                              {activity.manuscriptTitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Clock" size={48} className="mx-auto text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h4>
            <p className="text-gray-500">Activity will appear here as you submit and manage manuscripts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;