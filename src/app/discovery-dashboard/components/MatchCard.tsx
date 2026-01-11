'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface MatchCardProps {
  match: {
    id: number;
    name: string;
    age: number;
    location: string;
    image: string;
    alt: string;
    compatibility: number;
    bio: string;
    interests: string[];
    distance: string;
    lastActive: string;
    verified: boolean;
  };
  onLike: (id: number) => void;
  onPass: (id: number) => void;
  onViewProfile: (id: number) => void;
}

const MatchCard = ({ match, onLike, onPass, onViewProfile }: MatchCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300 overflow-hidden border border-border">
      <div className="relative h-80 overflow-hidden">
        <AppImage
          src={match.image}
          alt={match.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          {match.verified && (
            <div className="bg-success text-success-foreground px-3 py-1 rounded-full flex items-center space-x-1">
              <Icon name="CheckBadgeIcon" size={16} variant="solid" />
              <span className="text-xs font-medium">Verified</span>
            </div>
          )}
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold text-sm">
            {match.compatibility}% Match
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white font-headline font-bold text-2xl">
            {match.name}, {match.age}
          </h3>
          <div className="flex items-center space-x-4 mt-2 text-white/90">
            <div className="flex items-center space-x-1">
              <Icon name="MapPinIcon" size={16} variant="outline" />
              <span className="text-sm">{match.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="SignalIcon" size={16} variant="outline" />
              <span className="text-sm">{match.distance}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-foreground text-sm mb-4 line-clamp-2">{match.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {match.interests.slice(0, 3).map((interest, index) => (
            <span
              key={index}
              className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium"
            >
              {interest}
            </span>
          ))}
          {match.interests.length > 3 && (
            <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
              +{match.interests.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>Active {match.lastActive}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onPass(match.id)}
            className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-3 rounded-lg font-cta font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            aria-label={`Pass on ${match.name}`}
          >
            <Icon name="XMarkIcon" size={20} variant="outline" />
            <span>Pass</span>
          </button>
          <button
            onClick={() => onViewProfile(match.id)}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 rounded-lg font-cta font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            aria-label={`View ${match.name}'s profile`}
          >
            <Icon name="UserIcon" size={20} variant="outline" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => onLike(match.id)}
            className="flex-1 bg-gradient-to-r from-brand-coral to-brand-crimson text-white py-3 rounded-lg font-cta font-semibold transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            aria-label={`Like ${match.name}`}
          >
            <Icon name="HeartIcon" size={20} variant="solid" />
            <span>Like</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;