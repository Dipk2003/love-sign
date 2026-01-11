'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface InsightsHeaderProps {
  userName: string;
  memberSince: string;
}

const InsightsHeader: React.FC<InsightsHeaderProps> = ({ userName, memberSince }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white shadow-elevated">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold mb-2">
            Your Relationship Intelligence Dashboard
          </h1>
          <p className="text-lg opacity-90 mb-4">
            Welcome back, {userName}
          </p>
          <div className="flex items-center space-x-2 text-sm opacity-80">
            <Icon name="CalendarIcon" size={16} variant="outline" className="text-white" />
            <span>Member since {memberSince}</span>
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <Icon name="ChartBarIcon" size={32} variant="solid" className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default InsightsHeader;