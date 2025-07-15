import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({
  steps = [],
  currentStep = 0,
  type = 'linear', // 'linear' or 'circular'
  size = 'default',
  showLabels = true,
  showDescription = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: {
      step: 'w-6 h-6 text-xs',
      line: 'h-0.5',
      text: 'text-xs'
    },
    default: {
      step: 'w-8 h-8 text-sm',
      line: 'h-1',
      text: 'text-sm'
    },
    lg: {
      step: 'w-10 h-10 text-base',
      line: 'h-1.5',
      text: 'text-base'
    }
  };

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'pending';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary ring-2 ring-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getLineClasses = (index) => {
    const isCompleted = index < currentStep;
    return `flex-1 ${sizeClasses[size].line} ${
      isCompleted ? 'bg-success' : 'bg-border'
    } transition-colors duration-300`;
  };

  if (type === 'circular') {
    const progress = ((currentStep + 1) / steps.length) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        <div className="relative">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--color-border)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--color-primary)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        {showLabels && steps[currentStep] && (
          <div className="text-center">
            <p className="font-medium text-foreground">{steps[currentStep].label}</p>
            {showDescription && steps[currentStep].description && (
              <p className="text-sm text-muted-foreground mt-1">
                {steps[currentStep].description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={`
                    ${sizeClasses[size].step}
                    ${getStepClasses(status)}
                    rounded-full border-2 flex items-center justify-center
                    font-medium transition-all duration-300
                  `}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {showLabels && (
                  <div className="mt-2 text-center max-w-24">
                    <p className={`${sizeClasses[size].text} font-medium text-foreground`}>
                      {step.label}
                    </p>
                    {showDescription && step.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
              {!isLast && (
                <div className={getLineClasses(index)} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;