'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface SuccessStory {
  id: number;
  names: string;
  image: string;
  alt: string;
  story: string;
  matchScore: number;
  location: string;
  relationshipLength: string;
}

const SuccessStoriesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories: SuccessStory[] = [
  {
    id: 1,
    names: "Sarah & Michael",
    image: "https://images.unsplash.com/photo-1608956327743-3ebcf5846e05",
    alt: "Happy couple embracing and smiling at camera in urban setting with brick wall background",
    story: "We matched with a 96% compatibility score and instantly connected over our shared love for hiking and sustainable living. Three months later, we're planning our first international trip together. LoveSync AI's personality insights helped us understand each other on a deeper level from day one.",
    matchScore: 96,
    location: "San Francisco, CA",
    relationshipLength: "6 months together"
  },
  {
    id: 2,
    names: "Jessica & David",
    image: "https://images.unsplash.com/photo-1662867991365-ce724692253b",
    alt: "Couple holding hands and walking together in autumn park with golden leaves falling",
    story: "After years of disappointing dating app experiences, LoveSync AI was a breath of fresh air. The AI matching actually works! We discovered we had the same career goals, family values, and even the same favorite obscure indie band. Now we're engaged and couldn't be happier.",
    matchScore: 98,
    location: "Austin, TX",
    relationshipLength: "1 year together"
  },
  {
    id: 3,
    names: "Emily & James",
    image: "https://images.unsplash.com/photo-1712701082760-77d33e4b13c5",
    alt: "Young couple laughing together on beach at sunset with ocean waves in background",
    story: "The compatibility quiz revealed things about myself I hadn't even considered. When I matched with James at 94%, I was skeptical, but our first conversation lasted four hours! The AI insights about our communication styles helped us navigate early relationship challenges smoothly.",
    matchScore: 94,
    location: "Seattle, WA",
    relationshipLength: "8 months together"
  },
  {
    id: 4,
    names: "Rachel & Tom",
    image: "https://images.unsplash.com/photo-1670242837233-659cf7b7c57d",
    alt: "Couple sitting close together on wooden bench in park smiling warmly at each other",
    story: "As a busy professional, I didn't have time for endless swiping. LoveSync AI's intelligent matching saved me countless hours by connecting me with Tom, who shares my ambition and values work-life balance. The relationship analytics feature helped us grow together intentionally.",
    matchScore: 97,
    location: "Boston, MA",
    relationshipLength: "10 months together"
  }];


  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const currentStory = stories[currentIndex];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-muted to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full mb-6 shadow-subtle">
            <Icon name="HeartIcon" size={20} variant="solid" className="text-brand-coral" />
            <span className="text-sm font-body font-medium text-foreground">Real Love Stories</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-foreground mb-6">
            12,000+ Successful Matches
          </h2>
          
          <p className="text-lg text-muted-foreground font-body">
            Join thousands of couples who found their perfect match through intelligent compatibility matching. These are real stories from real people.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-elevated overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <AppImage
                  src={currentStory.image}
                  alt={currentStory.alt}
                  className="w-full h-full object-cover" />

                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-subtle">
                  <div className="flex items-center space-x-2">
                    <Icon name="SparklesIcon" size={16} variant="solid" className="text-accent" />
                    <span className="text-sm font-cta font-semibold text-primary">{currentStory.matchScore}% Match</span>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-2xl lg:text-3xl font-headline font-bold text-foreground mb-2">
                    {currentStory.names}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground font-body">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPinIcon" size={16} variant="outline" />
                      <span>{currentStory.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="ClockIcon" size={16} variant="outline" />
                      <span>{currentStory.relationshipLength}</span>
                    </div>
                  </div>
                </div>

                <blockquote className="text-foreground font-body leading-relaxed mb-8 italic">
                  "{currentStory.story}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {stories.map((_, index) =>
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-primary w-8' : 'bg-border'}`
                      }
                      aria-label={`Go to story ${index + 1}`} />

                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={prevStory}
                      className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                      aria-label="Previous story">

                      <Icon name="ChevronLeftIcon" size={20} variant="outline" />
                    </button>
                    <button
                      onClick={nextStory}
                      className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                      aria-label="Next story">

                      <Icon name="ChevronRightIcon" size={20} variant="outline" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default SuccessStoriesCarousel;