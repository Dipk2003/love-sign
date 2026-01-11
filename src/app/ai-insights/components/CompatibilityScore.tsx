'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CompatibilityScoreProps {
  score: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

const CompatibilityScore: React.FC<CompatibilityScoreProps> = ({ score, trend, change }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'ArrowTrendingUpIcon';
    if (trend === 'down') return 'ArrowTrendingDownIcon';
    return 'MinusIcon';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-subtle border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-headline font-semibold text-foreground">
          Overall Compatibility Score
        </h3>
        <Icon name="SparklesIcon" size={24} variant="solid" className="text-accent" />
      </div>
      
      <div className="flex items-end space-x-4">
        <div className="text-5xl font-headline font-bold text-primary">
          {score}%
        </div>
        <div className={`flex items-center space-x-1 mb-2 ${getTrendColor()}`}>
          <Icon name={getTrendIcon() as any} size={20} variant="solid" />
          <span className="text-sm font-semibold">{change}%</span>
        </div>
      </div>
      
      <div className="mt-4 bg-muted rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-brand-coral to-brand-teal transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
      
      <p className="mt-3 text-sm text-muted-foreground">
        Your compatibility metrics have improved by {change}% this month
      </p>
    </div>
  );
};

export default CompatibilityScore;