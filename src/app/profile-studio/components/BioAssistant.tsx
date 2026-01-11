'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BioSuggestion {
  id: string;
  text: string;
  tone: string;
  engagement: number;
}

interface BioAssistantProps {
  bio: string;
  onBioChange: (bio: string) => void;
}

const BioAssistant = ({ bio, onBioChange }: BioAssistantProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const bioSuggestions: BioSuggestion[] = [
    {
      id: '1',
      text: "Adventure seeker with a passion for hiking and photography. I believe the best stories are written on the trails less traveled. Looking for someone who appreciates spontaneous road trips and deep conversations under the stars.",
      tone: 'Adventurous',
      engagement: 92
    },
    {
      id: '2',
      text: "Tech enthusiast by day, amateur chef by night. I love experimenting with fusion cuisine and discussing the latest innovations. Seeking a partner who enjoys intellectual debates and isn't afraid to try my experimental dishes!",
      tone: 'Intellectual',
      engagement: 88
    },
    {
      id: '3',
      text: "Life's too short for boring conversations. I'm a creative soul who finds inspiration in art galleries, live music, and meaningful connections. Looking for someone who values authenticity and isn't afraid to be themselves.",
      tone: 'Creative',
      engagement: 95
    }
  ];

  const handleGenerateSuggestions = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuggestions(true);
    }, 1500);
  };

  const handleUseSuggestion = (suggestion: BioSuggestion) => {
    onBioChange(suggestion.text);
    setShowSuggestions(false);
  };

  const wordCount = bio.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = bio.length;
  const maxChars = 500;

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          placeholder="Tell your story... What makes you unique? What are you passionate about?"
          className="w-full h-40 px-4 py-3 bg-background border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
          maxLength={maxChars}
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span>{wordCount} words</span>
          <span className={charCount > maxChars * 0.9 ? 'text-warning' : ''}>
            {charCount}/{maxChars}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="SparklesIcon" size={20} className="text-accent" />
          <span className="text-sm font-body text-muted-foreground">
            AI-powered bio suggestions
          </span>
        </div>
        <button
          onClick={handleGenerateSuggestions}
          disabled={isGenerating}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-cta font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Icon name="LightBulbIcon" size={16} />
              Get Suggestions
            </>
          )}
        </button>
      </div>

      {showSuggestions && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-headline font-semibold text-foreground">
              AI-Generated Bio Suggestions
            </h4>
            <button
              onClick={() => setShowSuggestions(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Hide
            </button>
          </div>

          {bioSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="bg-muted/50 border border-border rounded-xl p-4 hover:shadow-subtle transition-all duration-300 cursor-pointer group"
              onClick={() => handleUseSuggestion(suggestion)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-cta font-semibold rounded-full">
                    {suggestion.tone}
                  </span>
                  <div className="flex items-center gap-1">
                    <Icon name="ChartBarIcon" size={14} className="text-success" />
                    <span className="text-xs text-success font-semibold">
                      {suggestion.engagement}% engagement
                    </span>
                  </div>
                </div>
                <button className="px-3 py-1 bg-primary text-primary-foreground text-xs font-cta font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Use This
                </button>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{suggestion.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Icon name="LightBulbIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-headline font-semibold text-foreground">
              Bio Writing Tips
            </h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Be authentic and specific about your interests</li>
              <li>• Show your personality through your writing style</li>
              <li>• Include conversation starters</li>
              <li>• Avoid clichés and generic statements</li>
              <li>• Keep it positive and engaging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioAssistant;