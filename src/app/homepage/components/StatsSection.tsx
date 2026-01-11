import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  icon: string;
  value: string;
  label: string;
  description: string;
}

const StatsSection = () => {
  const stats: Stat[] = [
    {
      icon: "UserGroupIcon",
      value: "50,000+",
      label: "Active Users",
      description: "Growing community of relationship-focused singles"
    },
    {
      icon: "HeartIcon",
      value: "12,000+",
      label: "Success Stories",
      description: "Couples who found love through our platform"
    },
    {
      icon: "ChartBarIcon",
      value: "94%",
      label: "Match Satisfaction",
      description: "Users satisfied with their match quality"
    },
    {
      icon: "SparklesIcon",
      value: "150+",
      label: "Compatibility Factors",
      description: "Data points analyzed for each match"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary via-secondary to-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-white mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-white/90 font-body">
            Our AI-powered platform has helped thousands find meaningful connections. Here's what makes us different.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name={stat.icon as any} size={32} variant="outline" className="text-white" />
              </div>
              <div className="text-4xl font-headline font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-body font-semibold text-white mb-2">
                {stat.label}
              </div>
              <p className="text-sm text-white/80 font-body">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;