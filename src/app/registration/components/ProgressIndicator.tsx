import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

interface Step {
  number: number;
  title: string;
  icon: string;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const steps: Step[] = [
    { number: 1, title: 'Account', icon: 'UserIcon' },
    { number: 2, title: 'Profile', icon: 'IdentificationIcon' },
    { number: 3, title: 'Confirm', icon: 'CheckCircleIcon' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= step.number
                    ? 'bg-primary text-white shadow-subtle'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.number ? (
                  <Icon name="CheckIcon" size={24} variant="solid" />
                ) : (
                  <Icon name={step.icon as any} size={24} variant="outline" />
                )}
              </div>
              <span
                className={`mt-2 text-sm font-body font-medium ${
                  currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 relative">
                <div className="absolute inset-0 bg-muted rounded-full"></div>
                <div
                  className={`absolute inset-0 bg-primary rounded-full transition-all duration-500 ${
                    currentStep > step.number ? 'w-full' : 'w-0'
                  }`}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;