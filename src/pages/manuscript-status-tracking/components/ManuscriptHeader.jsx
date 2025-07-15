import React from 'react';
import Icon from '../../../components/AppIcon';
import StatusNotificationBadge from '../../../components/ui/StatusNotificationBadge';

const ManuscriptHeader = ({ manuscript }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under review':
        return 'bg-yellow-100 text-yellow-800';
      case 'revision requested':
        return 'bg-orange-100 text-orange-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            {manuscript.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Icon name="Users" size={16} className="mr-1" />
              {manuscript.authors.join(', ')}
            </span>
            <span className="flex items-center">
              <Icon name="BookOpen" size={16} className="mr-1" />
              {manuscript.journal}
            </span>
            <span className="flex items-center">
              <Icon name="Calendar" size={16} className="mr-1" />
              Submitted: {manuscript.submissionDate}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(manuscript.status)}`}>
            {manuscript.status}
          </span>
          <StatusNotificationBadge 
            count={manuscript.unreadNotifications} 
            type="error" 
            size="default"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Manuscript ID:</span>
          <span className="text-sm font-medium text-foreground">{manuscript.id}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Days in Review:</span>
          <span className="text-sm font-medium text-foreground">{manuscript.daysInReview}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Expected Decision:</span>
          <span className="text-sm font-medium text-foreground">{manuscript.expectedDecision}</span>
        </div>
      </div>
    </div>
  );
};

export default ManuscriptHeader;