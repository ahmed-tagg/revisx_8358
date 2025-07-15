import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingTasksWidget = ({ tasks, onTaskAction }) => {
  const getTaskIcon = (type) => {
    switch (type) {
      case 'review_overdue':
        return { name: 'Clock', color: 'text-error' };
      case 'reviewer_assignment':
        return { name: 'UserPlus', color: 'text-warning' };
      case 'editorial_decision':
        return { name: 'CheckCircle', color: 'text-primary' };
      case 'system_alert':
        return { name: 'AlertTriangle', color: 'text-error' };
      default:
        return { name: 'Bell', color: 'text-muted-foreground' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-error';
      case 'medium':
        return 'border-l-warning';
      case 'low':
        return 'border-l-success';
      default:
        return 'border-l-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Pending Tasks</h3>
          <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="CheckCircle" size={32} className="mx-auto text-success mb-2" />
            <p className="text-sm text-muted-foreground">All tasks completed!</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {tasks.map((task) => {
              const iconConfig = getTaskIcon(task.type);
              return (
                <div
                  key={task.id}
                  className={`p-4 border-l-4 ${getPriorityColor(task.priority)} hover:bg-muted/30 transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-1 rounded ${iconConfig.color}`}>
                        <Icon name={iconConfig.name} size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {task.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {task.description}
                        </p>
                        {task.due_date && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTaskAction('view', task.id)}
                      >
                        <Icon name="Eye" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTaskAction('complete', task.id)}
                      >
                        <Icon name="Check" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {tasks.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onTaskAction('view_all')}
            className="w-full"
          >
            View All Tasks
          </Button>
        </div>
      )}
    </div>
  );
};

export default PendingTasksWidget;