'use client';

import React, { useState, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Photo {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  optimizationScore: number;
  suggestions: string[];
}

interface PhotoUploadZoneProps {
  photos: Photo[];
  onPhotosChange: (photos: Photo[]) => void;
}

const PhotoUploadZone = ({ photos, onPhotosChange }: PhotoUploadZoneProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Mock photo upload - in real app would upload to server
      const newPhoto: Photo = {
        id: `photo-${Date.now()}`,
        url: "https://img.rocket.new/generatedImages/rocket_gen_img_116022a91-1763299783599.png",
        alt: 'Professional portrait of person in business casual attire with natural lighting',
        isPrimary: photos.length === 0,
        optimizationScore: Math.floor(Math.random() * 30) + 70,
        suggestions: [
        'Great natural lighting!',
        'Consider a closer crop for better facial visibility',
        'Smile more naturally for higher engagement']

      };
      onPhotosChange([...photos, newPhoto]);
    }
  }, [photos, onPhotosChange]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newPhoto: Photo = {
        id: `photo-${Date.now()}`,
        url: "https://img.rocket.new/generatedImages/rocket_gen_img_116022a91-1763299783599.png",
        alt: 'Professional portrait of person in business casual attire with natural lighting',
        isPrimary: photos.length === 0,
        optimizationScore: Math.floor(Math.random() * 30) + 70,
        suggestions: [
        'Great natural lighting!',
        'Consider a closer crop for better facial visibility',
        'Smile more naturally for higher engagement']

      };
      onPhotosChange([...photos, newPhoto]);
    }
  };

  const setPrimaryPhoto = (photoId: string) => {
    const updatedPhotos = photos.map((photo) => ({
      ...photo,
      isPrimary: photo.id === photoId
    }));
    onPhotosChange(updatedPhotos);
  };

  const removePhoto = (photoId: string) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
    if (updatedPhotos.length > 0 && !updatedPhotos.some((p) => p.isPrimary)) {
      updatedPhotos[0].isPrimary = true;
    }
    onPhotosChange(updatedPhotos);
    if (selectedPhoto === photoId) {
      setSelectedPhoto(null);
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
        dragActive ?
        'border-primary bg-primary/5 scale-102' : 'border-border hover:border-primary/50'}`
        }
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}>

        <input
          type="file"
          id="photo-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
          multiple />

        <label
          htmlFor="photo-upload"
          className="flex flex-col items-center justify-center cursor-pointer">

          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Icon name="PhotoIcon" size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-headline font-semibold text-foreground mb-2">
            Upload Your Photos
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Drag and drop your photos here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Recommended: 3-6 high-quality photos showing your personality
          </p>
        </label>
      </div>

      {photos.length > 0 &&
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) =>
        <div
          key={photo.id}
          className="relative group rounded-xl overflow-hidden bg-card border border-border hover:shadow-elevated transition-all duration-300 cursor-pointer"
          onClick={() => setSelectedPhoto(photo.id)}>

              <div className="aspect-square relative">
                <AppImage
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {photo.isPrimary &&
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-cta font-semibold">
                  Primary
                </div>
          }

              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {!photo.isPrimary &&
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPrimaryPhoto(photo.id);
              }}
              className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-subtle"
              aria-label="Set as primary photo">

                    <Icon name="StarIcon" size={16} className="text-accent" />
                  </button>
            }
                <button
              onClick={(e) => {
                e.stopPropagation();
                removePhoto(photo.id);
              }}
              className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-subtle"
              aria-label="Remove photo">

                  <Icon name="TrashIcon" size={16} className="text-error" />
                </button>
              </div>

              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/95 rounded-lg px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-body font-medium text-foreground">
                      Optimization Score
                    </span>
                    <span className="text-xs font-cta font-semibold text-success">
                      {photo.optimizationScore}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                  className="bg-success h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${photo.optimizationScore}%` }} />

                  </div>
                </div>
              </div>
            </div>
        )}
        </div>
      }

      {selectedPhoto &&
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-headline font-semibold text-foreground">
                Photo Optimization Insights
              </h3>
              <button
              onClick={() => setSelectedPhoto(null)}
              className="w-8 h-8 hover:bg-muted rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Close modal">

                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>

            {photos.
          filter((p) => p.id === selectedPhoto).
          map((photo) =>
          <div key={photo.id} className="p-6 space-y-6">
                  <div className="aspect-video relative rounded-xl overflow-hidden">
                    <AppImage
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover" />

                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body font-medium text-foreground">
                        Overall Score
                      </span>
                      <span className="text-2xl font-headline font-bold text-success">
                        {photo.optimizationScore}%
                      </span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                  className="bg-gradient-to-r from-success to-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${photo.optimizationScore}%` }} />

                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-headline font-semibold text-foreground">
                        AI Optimization Suggestions
                      </h4>
                      {photo.suggestions.map((suggestion, index) =>
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">

                          <Icon
                    name="LightBulbIcon"
                    size={20}
                    className="text-accent flex-shrink-0 mt-0.5" />

                          <p className="text-sm text-foreground">{suggestion}</p>
                        </div>
                )}
                    </div>
                  </div>
                </div>
          )}
          </div>
        </div>
      }
    </div>);

};

export default PhotoUploadZone;