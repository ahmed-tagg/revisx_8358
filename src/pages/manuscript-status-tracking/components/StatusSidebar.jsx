import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusNotificationBadge from '../../../components/ui/StatusNotificationBadge';

const StatusSidebar = ({ manuscript, nextSteps, deadlines, quickActions }) => {
  const getStatusProgress = (status) => {
    const statusMap = {
      'submitted': 20,
      'under review': 40,
      'revision requested': 60,
      'accepted': 100,
      'rejected': 100
    };
    return statusMap[status.toLowerCase()] || 0;
  };

  const getDeadlineUrgency = (deadline) => {
    const daysUntil = Math.ceil((new Date(deadline.date) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntil < 0) return 'overdue';
    if (daysUntil <= 3) return 'urgent';
    if (daysUntil <= 7) return 'warning';
    return 'normal';
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'overdue':
        return 'text-error';
      case 'urgent':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-foreground';
    }
  };

  const getUrgencyBg = (urgency) => {
    switch (urgency) {
      case 'overdue':
        return 'bg-error/10 border-error/20';
      case 'urgent':
        return 'bg-error/10 border-error/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'bg-muted/50 border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Current Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-foreground">
              {getStatusProgress(manuscript.status)}%
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${getStatusProgress(manuscript.status)}%` }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-foreground">{manuscript.status}</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Next Steps</h3>
        <div className="space-y-3">
          {nextSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{step.title}</p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                )}
                {step.deadline && (
                  <p className="text-xs text-warning mt-1">
                    Due: {step.deadline}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deadlines */}
      {deadlines.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {deadlines.map((deadline, index) => {
              const urgency = getDeadlineUrgency(deadline);
              return (
                <div key={index} className={`p-3 rounded-lg border ${getUrgencyBg(urgency)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{deadline.description}</p>
                    </div>
                    {urgency === 'overdue' || urgency === 'urgent' && (
                      <Icon name="AlertTriangle" size={16} className={getUrgencyColor(urgency)} />
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-medium ${getUrgencyColor(urgency)}`}>
                      {deadline.date}
                    </span>
                    <span className={`text-xs ${getUrgencyColor(urgency)}`}>
                      {deadline.daysRemaining > 0 
                        ? `${deadline.daysRemaining} days left`
                        : urgency === 'overdue' ?'Overdue' :'Due today'
                      }
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-full justify-start h-auto p-2"
              onClick={action.onClick}
            >
              <Icon name={action.icon} size={16} className="mr-2" />
              <span className="text-sm">{action.label}</span>
              {action.badge && (
                <StatusNotificationBadge 
                  count={action.badge} 
                  size="sm" 
                  className="ml-auto"
                />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Manuscript Info */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Manuscript Info</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Submission ID:</span>
            <span className="text-foreground font-mono">{manuscript.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Journal:</span>
            <span className="text-foreground">{manuscript.journal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category:</span>
            <span className="text-foreground">{manuscript.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Word Count:</span>
            <span className="text-foreground">{manuscript.wordCount?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pages:</span>
            <span className="text-foreground">{manuscript.pages}</span>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Need Help?</h3>
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Icon name="HelpCircle" size={16} className="mr-2" />
            View Guidelines
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Contact Support
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Icon name="FileText" size={16} className="mr-2" />
            FAQ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatusSidebar;