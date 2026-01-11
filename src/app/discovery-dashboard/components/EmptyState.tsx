'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface EmptyStateProps {
  onResetFilters: () => void;
}

const EmptyState = ({ onResetFilters }: EmptyStateProps) => {
  return (
    <div className="bg-card rounded-xl shadow-subtle p-12 text-center">
      <div className="bg-muted/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="MagnifyingGlassIcon" size={48} variant="outline" className="text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-headline font-bold text-foreground mb-3">
        No Matches Found
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        We couldn't find any matches with your current filters. Try adjusting your preferences or expanding your search criteria.
      </p>
      <button
        onClick={onResetFilters}
        className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-cta font-semibold transition-all duration-300 inline-flex items-center space-x-2"
      >
        <Icon name="ArrowPathIcon" size={20} variant="outline" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
};

export default EmptyState;