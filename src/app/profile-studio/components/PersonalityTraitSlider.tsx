'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface PersonalityTrait {
  id: string;
  name: string;
  description: string;
  value: number;
  icon: string;
  compatibilityImpact: 'high' | 'medium' | 'low';
}

interface PersonalityTraitSliderProps {
  traits: PersonalityTrait[];
  onTraitChange: (traitId: string, value: number) => void;
}

const PersonalityTraitSlider = ({ traits, onTraitChange }: PersonalityTraitSliderProps) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-success/10 text-success';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {traits.map((trait) => (
        <div
          key={trait.id}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-subtle transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name={trait.icon as any} size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-base font-headline font-semibold text-foreground">
                    {trait.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-cta font-semibold ${getImpactBadge(
                      trait.compatibilityImpact
                    )}`}
                  >
                    {trait.compatibilityImpact.toUpperCase()} IMPACT
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{trait.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-body text-muted-foreground">Low</span>
              <span className="text-lg font-headline font-bold text-primary">
                {trait.value}%
              </span>
              <span className="text-sm font-body text-muted-foreground">High</span>
            </div>

            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={trait.value}
                onChange={(e) => onTraitChange(trait.id, parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${trait.value}%, var(--color-muted) ${trait.value}%, var(--color-muted) 100%)`
                }}
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Icon
                name="InformationCircleIcon"
                size={16}
                className={getImpactColor(trait.compatibilityImpact)}
              />
              <span className={getImpactColor(trait.compatibilityImpact)}>
                This trait has {trait.compatibilityImpact} impact on compatibility matching
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonalityTraitSlider;