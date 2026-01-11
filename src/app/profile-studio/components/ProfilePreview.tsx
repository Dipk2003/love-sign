'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Photo {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

interface PersonalityTrait {
  id: string;
  name: string;
  value: number;
  icon: string;
}

interface ProfilePreviewProps {
  name: string;
  age: number;
  location: string;
  bio: string;
  photos: Photo[];
  traits: PersonalityTrait[];
  interests: string[];
}

const ProfilePreview = ({
  name,
  age,
  location,
  bio,
  photos,
  traits,
  interests
}: ProfilePreviewProps) => {
  const primaryPhoto = photos.find(p => p.isPrimary) || photos[0];
  const topTraits = traits.sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-elevated">
      <div className="relative h-96">
        {primaryPhoto ? (
          <AppImage
            src={primaryPhoto.url}
            alt={primaryPhoto.alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Icon name="UserCircleIcon" size={80} className="text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-headline font-bold mb-1">
                {name || 'Your Name'}, {age || '25'}
              </h2>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <Icon name="MapPinIcon" size={16} />
                <span>{location || 'Your Location'}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300">
                <Icon name="XMarkIcon" size={24} />
              </button>
              <button className="w-12 h-12 bg-gradient-to-r from-brand-coral to-brand-crimson hover:scale-110 rounded-full flex items-center justify-center transition-all duration-300 shadow-elevated">
                <Icon name="HeartIcon" size={24} variant="solid" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-headline font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="DocumentTextIcon" size={18} className="text-primary" />
            About Me
          </h3>
          <p className="text-sm text-foreground leading-relaxed">
            {bio || 'Your bio will appear here. Share your story and what makes you unique!'}
          </p>
        </div>

        {topTraits.length > 0 && (
          <div>
            <h3 className="text-sm font-headline font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="SparklesIcon" size={18} className="text-primary" />
              Personality Highlights
            </h3>
            <div className="space-y-3">
              {topTraits.map((trait) => (
                <div key={trait.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={trait.icon as any} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-body font-medium text-foreground">
                        {trait.name}
                      </span>
                      <span className="text-xs font-cta font-semibold text-primary">
                        {trait.value}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                        style={{ width: `${trait.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {interests.length > 0 && (
          <div>
            <h3 className="text-sm font-headline font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="HeartIcon" size={18} className="text-primary" />
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-body rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {photos.length > 1 && (
          <div>
            <h3 className="text-sm font-headline font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="PhotoIcon" size={18} className="text-primary" />
              More Photos
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {photos.slice(1, 7).map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <AppImage
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;