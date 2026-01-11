'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Feature {
  id: number;
  text: string;
  icon: string;
}

interface PremiumUpgradeCardProps {
  features: Feature[];
}

const PremiumUpgradeCard: React.FC<PremiumUpgradeCardProps> = ({ features }) => {
  return (
    <div className="bg-gradient-to-br from-accent to-brand-crimson rounded-xl p-8 text-white shadow-elevated">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-headline font-bold mb-2">
            Unlock Advanced AI Insights
          </h3>
          <p className="text-sm opacity-90">
            Get deeper relationship analytics and personalized coaching
          </p>
        </div>
        <Icon name="SparklesIcon" size={32} variant="solid" className="text-white" />
      </div>
      
      <div className="space-y-3 mb-6">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name={feature.icon as any} size={14} variant="solid" className="text-white" />
            </div>
            <span className="text-sm">{feature.text}</span>
          </div>
        ))}
      </div>
      
      <Link
        href="/premium-upgrade"
        className="block w-full py-3 bg-white text-accent font-cta font-semibold rounded-lg text-center hover:bg-opacity-90 transition-all duration-300 shadow-subtle"
      >
        Upgrade to Premium
      </Link>
    </div>
  );
};

export default PremiumUpgradeCard;
