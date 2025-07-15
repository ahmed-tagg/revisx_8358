import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusTimeline = ({ timeline }) => {
  const getStepIcon = (status, isCompleted, isCurrent) => {
    if (isCompleted) {
      return { name: 'CheckCircle', color: 'text-success' };
    } else if (isCurrent) {
      return { name: 'Clock', color: 'text-primary' };
    } else {
      return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStepClasses = (isCompleted, isCurrent) => {
    if (isCompleted) {
      return 'bg-success text-success-foreground';
    } else if (isCurrent) {
      return 'bg-primary text-primary-foreground';
    } else {
      return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-heading font-semibold text-foreground mb-6">Review Timeline</h2>
      
      <div className="relative">
        {timeline.map((step, index) => {
          const isLast = index === timeline.length - 1;
          const stepIcon = getStepIcon(step.status, step.isCompleted, step.isCurrent);
          
          return (
            <div key={index} className="relative flex items-start pb-8">
              {!isLast && (
                <div className={`absolute left-4 top-8 w-0.5 h-full ${
                  step.isCompleted ? 'bg-success' : 'bg-border'
                }`} />
              )}
              
              <div className={`
                relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2
                ${getStepClasses(step.isCompleted, step.isCurrent)}
                ${step.isCompleted ? 'border-success' : step.isCurrent ? 'border-primary' : 'border-border'}
              `}>
                <Icon name={stepIcon.name} size={16} />
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-foreground">{step.title}</h3>
                  {step.date && (
                    <span className="text-xs text-muted-foreground">{step.date}</span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                
                {step.details && (
                  <div className="bg-muted/50 rounded-md p-3 mb-2">
                    <p className="text-xs text-muted-foreground">{step.details}</p>
                  </div>
                )}
                
                {step.responsibleParty && (
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="User" size={12} />
                    <span>{step.responsibleParty}</span>
                  </div>
                )}
                
                {step.actions && step.actions.length > 0 && (
                  <div className="flex items-center space-x-2 mt-2">
                    {step.actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        className="text-xs text-primary hover:text-primary/80 underline"
                        onClick={action.onClick}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;