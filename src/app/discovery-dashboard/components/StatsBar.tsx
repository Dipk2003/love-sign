'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatsBarProps {
  totalMatches: number;
  newMatches: number;
  activeChats: number;
}

const StatsBar = ({ totalMatches, newMatches, activeChats }: StatsBarProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-card rounded-xl shadow-subtle p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Total Matches</p>
            <p className="text-3xl font-headline font-bold text-foreground">
              {totalMatches}
            </p>
          </div>
          <div className="bg-primary/10 p-3 rounded-lg">
            <Icon name="HeartIcon" size={28} variant="solid" className="text-primary" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-subtle p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm mb-1">New Today</p>
            <p className="text-3xl font-headline font-bold text-foreground">
              {newMatches}
            </p>
          </div>
          <div className="bg-accent/10 p-3 rounded-lg">
            <Icon name="SparklesIcon" size={28} variant="solid" className="text-accent" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-subtle p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Active Chats</p>
            <p className="text-3xl font-headline font-bold text-foreground">
              {activeChats}
            </p>
          </div>
          <div className="bg-secondary/10 p-3 rounded-lg">
            <Icon
              name="ChatBubbleLeftRightIcon"
              size={28}
              variant="solid"
              className="text-secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;