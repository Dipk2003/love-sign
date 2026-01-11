import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      icon: "CpuChipIcon",
      title: "Advanced AI Matching",
      description: "Our proprietary algorithm analyzes 150+ compatibility factors including personality traits, values, lifestyle preferences, and relationship goals to find your perfect match.",
      color: "from-brand-coral to-brand-crimson"
    },
    {
      icon: "UserGroupIcon",
      title: "Personality-Driven Profiles",
      description: "Go beyond photos with comprehensive personality assessments. Understand compatibility before the first message with detailed insights and compatibility explanations.",
      color: "from-brand-teal to-secondary"
    },
    {
      icon: "ShieldCheckIcon",
      title: "Verified & Safe",
      description: "Multi-layer verification system including photo verification, social media authentication, and AI-powered fraud detection to ensure authentic connections.",
      color: "from-accent to-brand-amber"
    },
    {
      icon: "ChatBubbleLeftRightIcon",
      title: "Smart Conversation Starters",
      description: "AI-generated conversation prompts based on shared interests and compatibility factors. Never struggle with what to say first again.",
      color: "from-primary to-secondary"
    },
    {
      icon: "ChartBarIcon",
      title: "Relationship Analytics",
      description: "Track your dating patterns, understand what works, and get personalized recommendations to improve your success rate with data-driven insights.",
      color: "from-brand-amber to-accent"
    },
    {
      icon: "LightBulbIcon",
      title: "AI Dating Coach",
      description: "Receive personalized advice on profile optimization, messaging strategies, and relationship progression based on successful patterns from our community.",
      color: "from-brand-crimson to-brand-coral"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full mb-6">
            <Icon name="SparklesIcon" size={20} variant="solid" className="text-accent" />
            <span className="text-sm font-body font-medium text-foreground">Science-Backed Compatibility</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-foreground mb-6">
            Why LoveSync AI is Different
          </h2>
          
          <p className="text-lg text-muted-foreground font-body">
            We combine cutting-edge artificial intelligence with relationship psychology to create meaningful connections that last. No more endless swiping—just intelligent matching.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-subtle hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border border-border"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={feature.icon as any} size={28} variant="outline" className="text-white" />
              </div>
              
              <h3 className="text-xl font-headline font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;