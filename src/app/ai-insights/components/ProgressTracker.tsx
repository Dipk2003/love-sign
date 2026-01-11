'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Milestone {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date?: string;
  icon: string;
}

interface ProgressTrackerProps {
  milestones: Milestone[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ milestones }) => {
  const completedCount = milestones.filter(m => m.completed).length;
  const progressPercentage = (completedCount / milestones.length) * 100;

  return (
    <div className="bg-card rounded-xl p-6 shadow-subtle border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold text-foreground">
          Relationship Journey Progress
        </h3>
        <div className="text-sm font-semibold text-primary">
          {completedCount}/{milestones.length} Completed
        </div>
      </div>
      
      <div className="mb-6">
        <div className="bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                milestone.completed 
                  ? 'bg-success text-white' :'bg-muted text-muted-foreground'
              }`}>
                <Icon 
                  name={milestone.completed ? 'CheckIcon' : milestone.icon as any} 
                  size={20} 
                  variant={milestone.completed ? 'solid' : 'outline'} 
                />
              </div>
              {index < milestones.length - 1 && (
                <div className={`absolute left-1/2 top-10 w-0.5 h-8 -ml-px ${
                  milestone.completed ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
            
            <div className="flex-1 pb-4">
              <h4 className={`font-body font-semibold mb-1 ${
                milestone.completed ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {milestone.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-1">
                {milestone.description}
              </p>
              {milestone.completed && milestone.date && (
                <span className="text-xs text-success font-medium">
                  Completed on {milestone.date}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;