import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'submission':
        return { name: 'FileText', color: 'text-blue-600' };
      case 'review':
        return { name: 'Eye', color: 'text-green-600' };
      case 'status_change':
        return { name: 'RefreshCw', color: 'text-orange-600' };
      case 'user_registration':
        return { name: 'UserPlus', color: 'text-purple-600' };
      case 'system':
        return { name: 'Settings', color: 'text-gray-600' };
      default:
        return { name: 'Bell', color: 'text-muted-foreground' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Activity" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activities.map((activity) => {
              const iconConfig = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-muted ${iconConfig.color}`}>
                      <Icon name={iconConfig.name} size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>
                        {' '}
                        <span>{activity.action}</span>
                      </p>
                      {activity.details && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.details}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTimeAgo(activity.timestamp)}
                      </p>
                    </div>
                    {activity.priority === 'high' && (
                      <div className="w-2 h-2 bg-error rounded-full"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;