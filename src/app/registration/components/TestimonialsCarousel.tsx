'use client';

import React, { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  alt: string;
  quote: string;
  matchDuration: string;
}

const TestimonialsCarousel = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 28,
    location: 'San Francisco, CA',
    image: "https://images.unsplash.com/photo-1604979093905-73791e4f75f5",
    alt: 'Professional woman with long brown hair smiling warmly in natural outdoor lighting',
    quote: 'The AI matching was incredible! I met my partner within 2 weeks, and we connected on levels I never thought possible. The compatibility insights were spot-on.',
    matchDuration: 'Found match in 2 weeks'
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 32,
    location: 'New York, NY',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c1f09ffa-1763296911571.png",
    alt: 'Asian man in casual blue shirt with confident smile against urban background',
    quote: 'After trying multiple dating apps, LoveSync AI was refreshingly different. The personality assessment helped me understand what I truly wanted in a relationship.',
    matchDuration: 'Found match in 3 weeks'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    age: 26,
    location: 'Austin, TX',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0c4b545-1763298985275.png",
    alt: 'Hispanic woman with curly dark hair and bright smile in casual outdoor setting',
    quote: 'The AI insights showed me compatibility factors I never considered. Met someone who shares my values and life goals. We are planning our future together!',
    matchDuration: 'Found match in 1 month'
  }];


  const handlePrevious = () => {
    setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev === testimonials.length - 1 ? 0 : prev + 1);
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-12 bg-card rounded-2xl shadow-elevated p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-24 bg-muted rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>);

  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 bg-card rounded-2xl shadow-elevated p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-headline font-bold text-primary mb-2">
          Success Stories
        </h3>
        <p className="text-muted-foreground font-body">
          Real couples who found love through LoveSync AI
        </p>
      </div>

      <div className="relative">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-subtle">
            <AppImage
              src={currentTestimonial.image}
              alt={currentTestimonial.alt}
              className="w-full h-full object-cover" />

          </div>

          <div className="text-center space-y-2">
            <h4 className="text-xl font-headline font-semibold text-foreground">
              {currentTestimonial.name}, {currentTestimonial.age}
            </h4>
            <p className="text-sm text-muted-foreground font-body">
              {currentTestimonial.location}
            </p>
            <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full">
              <Icon name="HeartIcon" size={16} variant="solid" />
              <span className="text-xs font-body font-medium">
                {currentTestimonial.matchDuration}
              </span>
            </div>
          </div>

          <div className="relative">
            <Icon
              name="ChatBubbleLeftIcon"
              size={32}
              variant="solid"
              className="absolute -top-4 -left-4 text-brand-coral opacity-20" />

            <p className="text-center text-foreground font-body italic px-4">
              &quot;{currentTestimonial.quote}&quot;
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {testimonials.map((_, index) =>
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary w-8' : 'bg-muted'}`
              }
              aria-label={`Go to testimonial ${index + 1}`} />

            )}
          </div>
        </div>

        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-card border-2 border-border rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-subtle"
          aria-label="Previous testimonial">

          <Icon name="ChevronLeftIcon" size={20} variant="outline" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-card border-2 border-border rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-subtle"
          aria-label="Next testimonial">

          <Icon name="ChevronRightIcon" size={20} variant="outline" />
        </button>
      </div>
    </div>);

};

export default TestimonialsCarousel;