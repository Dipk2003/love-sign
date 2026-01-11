import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

interface Expert {
  name: string;
  title: string;
  image: string;
  alt: string;
  quote: string;
}

const TrustSection = () => {
  const trustBadges: TrustBadge[] = [
  {
    icon: "ShieldCheckIcon",
    title: "Verified Profiles",
    description: "Multi-layer verification ensures authentic users"
  },
  {
    icon: "LockClosedIcon",
    title: "Privacy Protected",
    description: "Bank-level encryption for your personal data"
  },
  {
    icon: "CheckBadgeIcon",
    title: "AI Safety",
    description: "Advanced fraud detection and content moderation"
  }];


  const experts: Expert[] = [
  {
    name: "Dr. Sarah Mitchell",
    title: "Relationship Psychologist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f4bfc892-1763296428258.png",
    alt: "Professional woman with glasses and brown hair in business attire smiling confidently",
    quote: "LoveSync AI's approach to compatibility matching is grounded in solid psychological research. Their algorithm considers factors that truly matter for long-term relationship success."
  },
  {
    name: "Dr. James Chen",
    title: "Behavioral Scientist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a99cc915-1763299240589.png",
    alt: "Asian man in navy suit with short black hair smiling professionally in office setting",
    quote: "The platform's use of personality assessments and behavioral data creates a more scientific approach to dating. It's refreshing to see technology used thoughtfully in this space."
  }];


  const mediaLogos = [
  { name: "TechCrunch", width: "w-32" },
  { name: "Forbes", width: "w-28" },
  { name: "Wired", width: "w-24" },
  { name: "The Verge", width: "w-32" }];


  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full mb-6">
            <Icon name="ShieldCheckIcon" size={20} variant="solid" className="text-success" />
            <span className="text-sm font-body font-medium text-foreground">Trusted & Secure</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-foreground mb-6">
            Safety & Trust First
          </h2>
          
          <p className="text-lg text-muted-foreground font-body">
            Your safety and privacy are our top priorities. We use advanced technology and human moderation to create a secure dating environment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {trustBadges.map((badge, index) =>
          <div
            key={index}
            className="bg-card rounded-2xl p-8 text-center shadow-subtle hover:shadow-elevated transition-all duration-300 border border-border">

              <div className="w-16 h-16 bg-gradient-to-br from-success to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name={badge.icon as any} size={32} variant="outline" className="text-white" />
              </div>
              <h3 className="text-xl font-headline font-bold text-foreground mb-3">
                {badge.title}
              </h3>
              <p className="text-muted-foreground font-body">
                {badge.description}
              </p>
            </div>
          )}
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-headline font-bold text-foreground text-center mb-12">
            Expert Endorsements
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {experts.map((expert, index) =>
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-subtle hover:shadow-elevated transition-all duration-300 border border-border">

                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <AppImage
                    src={expert.image}
                    alt={expert.alt}
                    className="w-full h-full object-cover" />

                  </div>
                  <div>
                    <div className="font-headline font-bold text-foreground">{expert.name}</div>
                    <div className="text-sm text-muted-foreground font-body">{expert.title}</div>
                  </div>
                </div>
                <blockquote className="text-foreground font-body leading-relaxed italic">
                  "{expert.quote}"
                </blockquote>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-headline font-bold text-foreground mb-8">
            Featured In
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {mediaLogos.map((logo, index) =>
            <div
              key={index}
              className={`${logo.width} h-8 bg-muted rounded flex items-center justify-center font-headline font-bold text-foreground`}>

                {logo.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TrustSection;