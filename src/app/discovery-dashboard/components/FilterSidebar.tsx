'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterOptions {
  ageRange: [number, number];
  distance: number;
  interests: string[];
  relationshipGoal: string;
  education: string;
  lifestyle: string[];
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar = ({
  filters,
  onFilterChange,
  onReset,
  isOpen,
  onClose,
}: FilterSidebarProps) => {
  const availableInterests = [
    'Travel',
    'Fitness',
    'Reading',
    'Cooking',
    'Music',
    'Art',
    'Technology',
    'Sports',
    'Photography',
    'Yoga',
    'Dancing',
    'Gaming',
  ];

  const relationshipGoals = [
    'Long-term relationship',
    'Marriage',
    'Dating',
    'Friendship',
    'Open to anything',
  ];

  const educationLevels = [
    'High School',
    'Some College',
    "Bachelor\'s Degree",
    "Master\'s Degree",
    'Doctorate',
    'Trade School',
  ];

  const lifestyleOptions = [
    'Non-smoker',
    'Social drinker',
    'Fitness enthusiast',
    'Pet lover',
    'Vegetarian',
    'Night owl',
    'Early bird',
    'Homebody',
  ];

  const handleInterestToggle = (interest: string) => {
    const newInterests = filters.interests.includes(interest)
      ? filters.interests.filter((i) => i !== interest)
      : [...filters.interests, interest];
    onFilterChange({ ...filters, interests: newInterests });
  };

  const handleLifestyleToggle = (lifestyle: string) => {
    const newLifestyle = filters.lifestyle.includes(lifestyle)
      ? filters.lifestyle.filter((l) => l !== lifestyle)
      : [...filters.lifestyle, lifestyle];
    onFilterChange({ ...filters, lifestyle: newLifestyle });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-card border-r border-border w-80 z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-headline font-bold text-foreground">
              Filters
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-300"
              aria-label="Close filters"
            >
              <Icon name="XMarkIcon" size={24} variant="outline" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="18"
                  max="80"
                  value={filters.ageRange[0]}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      ageRange: [parseInt(e.target.value), filters.ageRange[1]],
                    })
                  }
                  className="w-full"
                />
                <input
                  type="range"
                  min="18"
                  max="80"
                  value={filters.ageRange[1]}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      ageRange: [filters.ageRange[0], parseInt(e.target.value)],
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Distance: {filters.distance} miles
              </label>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={filters.distance}
                onChange={(e) =>
                  onFilterChange({ ...filters, distance: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {availableInterests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      filters.interests.includes(interest)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Relationship Goal
              </label>
              <select
                value={filters.relationshipGoal}
                onChange={(e) =>
                  onFilterChange({ ...filters, relationshipGoal: e.target.value })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Any</option>
                {relationshipGoals.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Education Level
              </label>
              <select
                value={filters.education}
                onChange={(e) =>
                  onFilterChange({ ...filters, education: e.target.value })
                }
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Any</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Lifestyle
              </label>
              <div className="flex flex-wrap gap-2">
                {lifestyleOptions.map((lifestyle) => (
                  <button
                    key={lifestyle}
                    onClick={() => handleLifestyleToggle(lifestyle)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      filters.lifestyle.includes(lifestyle)
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {lifestyle}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-border">
              <button
                onClick={onReset}
                className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-cta font-semibold transition-all duration-300"
              >
                Reset
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-cta font-semibold transition-all duration-300"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;