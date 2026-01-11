'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterToggle: () => void;
}

const SearchBar = ({ searchQuery, onSearchChange, onFilterToggle }: SearchBarProps) => {
  return (
    <div className="bg-card rounded-xl shadow-subtle p-4 mb-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={onFilterToggle}
          className="lg:hidden p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-300"
          aria-label="Toggle filters"
        >
          <Icon name="AdjustmentsHorizontalIcon" size={24} variant="outline" />
        </button>

        <div className="flex-1 relative">
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            variant="outline"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by interests, location, or personality traits..."
            className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <button
          className="hidden sm:flex items-center space-x-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg font-cta font-semibold transition-all duration-300"
          aria-label="AI Smart Search"
        >
          <Icon name="SparklesIcon" size={20} variant="solid" />
          <span>AI Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;