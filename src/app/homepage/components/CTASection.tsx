import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-96 h-96 bg-brand-coral rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-teal rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
          <Icon name="SparklesIcon" size={20} variant="solid" className="text-brand-amber" />
          <span className="text-sm font-body font-medium text-white">Join 50,000+ Singles</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-white mb-6">
          Ready to Find Your Perfect Match?
        </h2>

        <p className="text-lg sm:text-xl text-white/90 font-body mb-12 max-w-2xl mx-auto">
          Start your journey to meaningful connections today. Our AI-powered platform is free to join and takes less than 5 minutes to get started.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/registration"
            className="group px-8 py-4 bg-white text-primary font-cta font-semibold rounded-lg shadow-elevated hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Create Free Account</span>
            <Icon name="ArrowRightIcon" size={20} variant="outline" className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <Link
            href="/discovery-dashboard"
            className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-cta font-semibold rounded-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            Browse Matches
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/90">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircleIcon" size={20} variant="solid" />
            <span className="text-sm font-body">Free to join</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircleIcon" size={20} variant="solid" />
            <span className="text-sm font-body">No credit card required</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircleIcon" size={20} variant="solid" />
            <span className="text-sm font-body">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;