import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

const BenefitsSection = () => {
  const benefits: Benefit[] = [
    {
      icon: 'SparklesIcon',
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms analyze 50+ compatibility factors to find your perfect match',
    },
    {
      icon: 'ChartBarIcon',
      title: 'Personality Insights',
      description: 'Deep psychological profiling reveals compatibility patterns and relationship potential',
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Verified Profiles',
      description: 'Every profile is verified for authenticity, ensuring genuine connections only',
    },
    {
      icon: 'ChatBubbleLeftRightIcon',
      title: 'Smart Conversations',
      description: 'AI-suggested conversation starters based on shared interests and compatibility',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-headline font-bold text-primary mb-2">
          Why Choose LoveSync AI?
        </h3>
        <p className="text-muted-foreground font-body">
          Join thousands finding meaningful connections through intelligent matching
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 bg-card rounded-lg p-4 shadow-subtle hover:shadow-elevated transition-all duration-300"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-coral to-brand-crimson rounded-lg flex items-center justify-center">
              <Icon name={benefit.icon as any} size={24} variant="outline" className="text-white" />
            </div>
            <div>
              <h4 className="font-headline font-semibold text-foreground mb-1">
                {benefit.title}
              </h4>
              <p className="text-sm text-muted-foreground font-body">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full">
          <Icon name="CheckBadgeIcon" size={20} variant="solid" />
          <span className="text-sm font-body font-medium">
            92% success rate in finding compatible matches
          </span>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;