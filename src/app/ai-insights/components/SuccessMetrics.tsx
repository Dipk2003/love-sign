'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Metric {
  id: number;
  label: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

interface SuccessMetricsProps {
  metrics: Metric[];
}

const SuccessMetrics: React.FC<SuccessMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div 
          key={metric.id}
          className="bg-card rounded-xl p-6 shadow-subtle border border-border hover:shadow-elevated transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.color}`}>
              <Icon name={metric.icon as any} size={24} variant="solid" className="text-white" />
            </div>
            <div className={`flex items-center space-x-1 ${metric.change >= 0 ? 'text-success' : 'text-error'}`}>
              <Icon 
                name={metric.change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'} 
                size={16} 
                variant="solid" 
              />
              <span className="text-sm font-semibold">{Math.abs(metric.change)}%</span>
            </div>
          </div>
          
          <div className="text-3xl font-headline font-bold text-foreground mb-1">
            {metric.value}
          </div>
          
          <div className="text-sm text-muted-foreground">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuccessMetrics;