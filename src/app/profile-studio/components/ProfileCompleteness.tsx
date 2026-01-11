'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProfileSection {
  id: string;
  name: string;
  completed: boolean;
  icon: string;
  points: number;
}

interface ProfileCompletenessProps {
  sections: ProfileSection[];
  totalPoints: number;
  maxPoints: number;
}

const ProfileCompleteness = ({ sections, totalPoints, maxPoints }: ProfileCompletenessProps) => {
  const completionPercentage = Math.round((totalPoints / maxPoints) * 100);
  const completedSections = sections.filter(s => s.completed).length;

  const getCompletionLevel = () => {
    if (completionPercentage >= 90) return { label: 'Excellent', color: 'text-success', bg: 'bg-success' };
    if (completionPercentage >= 70) return { label: 'Good', color: 'text-primary', bg: 'bg-primary' };
    if (completionPercentage >= 50) return { label: 'Fair', color: 'text-warning', bg: 'bg-warning' };
    return { label: 'Needs Work', color: 'text-error', bg: 'bg-error' };
  };

  const level = getCompletionLevel();

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-headline font-bold text-foreground mb-1">
            Profile Strength
          </h3>
          <p className="text-sm text-muted-foreground">
            Complete your profile to increase match quality
          </p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-headline font-bold ${level.color}`}>
            {completionPercentage}%
          </div>
          <div className={`text-xs font-cta font-semibold ${level.color}`}>
            {level.label}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${level.bg} transition-all duration-1000 ease-out rounded-full relative`}
            style={{ width: `${completionPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>
        <div className="absolute -top-1 left-0 right-0 flex justify-between px-1">
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className={`w-0.5 h-6 ${
                completionPercentage >= mark ? 'bg-white' : 'bg-border'
              } transition-colors duration-500`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {completedSections} of {sections.length} sections completed
        </span>
        <span className="font-cta font-semibold text-primary">
          {totalPoints} / {maxPoints} points
        </span>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
              section.completed
                ? 'bg-success/10 border border-success/20' :'bg-muted/50 border border-border hover:bg-muted'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  section.completed
                    ? 'bg-success text-white' :'bg-muted-foreground/20 text-muted-foreground'
                }`}
              >
                {section.completed ? (
                  <Icon name="CheckIcon" size={16} />
                ) : (
                  <Icon name={section.icon as any} size={16} />
                )}
              </div>
              <span
                className={`text-sm font-body font-medium ${
                  section.completed ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {section.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-cta font-semibold ${
                  section.completed ? 'text-success' : 'text-muted-foreground'
                }`}
              >
                +{section.points}
              </span>
              {!section.completed && (
                <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground" />
              )}
            </div>
          </div>
        ))}
      </div>

      {completionPercentage < 100 && (
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Icon name="TrophyIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-headline font-semibold text-foreground mb-1">
                Unlock Premium Matching
              </h4>
              <p className="text-xs text-muted-foreground">
                Complete your profile to 100% to access advanced AI matching algorithms and get 3x more quality matches!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCompleteness;