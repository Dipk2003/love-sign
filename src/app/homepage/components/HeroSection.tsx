import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  onStartQuiz: () => void;
}

const HeroSection = ({ onStartQuiz }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-coral rounded-full blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-teal rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Icon name="SparklesIcon" size={20} variant="solid" className="text-brand-amber" />
              <span className="text-sm font-body font-medium">AI-Powered Compatibility Matching</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold leading-tight">
              Where AI Meets <span className="text-brand-coral">Authentic Love</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 font-body leading-relaxed">
              Experience the evolution of digital romance. Our advanced AI analyzes personality traits, values, and compatibility factors to connect you with meaningful relationships—not endless swipes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartQuiz}
                className="group px-8 py-4 bg-gradient-to-r from-brand-coral to-brand-crimson text-white font-cta font-semibold rounded-lg shadow-elevated hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2">

                <span>Take Free Compatibility Quiz</span>
                <Icon name="ArrowRightIcon" size={20} variant="outline" className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <Link
                href="/registration"
                className="px-8 py-4 bg-white text-primary font-cta font-semibold rounded-lg shadow-subtle hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 text-center">

                Start Your Journey
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-headline font-bold">50K+</div>
                <div className="text-sm text-white/80 font-body">Active Users</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-headline font-bold">12K+</div>
                <div className="text-sm text-white/80 font-body">Success Stories</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-headline font-bold">94%</div>
                <div className="text-sm text-white/80 font-body">Match Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <AppImage
                src="https://images.unsplash.com/photo-1642180284916-31e33d24a8d8"
                alt="Happy couple laughing together outdoors in sunny park with autumn leaves in background"
                className="w-full h-full object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-elevated">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-coral to-brand-crimson rounded-full flex items-center justify-center">
                    <Icon name="HeartIcon" size={24} variant="solid" className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-body text-muted-foreground">AI Compatibility Score</div>
                    <div className="text-2xl font-headline font-bold text-primary">98% Match</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;