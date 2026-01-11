'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import ExclamationTriangleIcon from '../../../components/ui/ExclamationTriangleIcon';

interface Recommendation {
  id: number;
  category: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  icon: string;
  actionSteps?: string[];
}

interface ImprovementRecommendationsProps {
  recommendations: Recommendation[];
  loading?: boolean;
}

const ImprovementRecommendations: React.FC<ImprovementRecommendationsProps> = ({ 
  recommendations: initialRecommendations,
  loading: loadingProp = false 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthError, setIsAuthError] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    setIsAuthError(false);

    try {
      const response = await fetch('/api/openai/relationship-coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: {
            name: 'You',
            datingGoals: ['meaningful connection', 'long-term relationship'],
            challenges: ['starting conversations', 'maintaining engagement'],
          },
          conversationHistory: [
            {
              partnerId: 1,
              partnerName: 'Alex',
              messages: [
                { sender: 'You', message: 'Hey! How was your weekend?', timestamp: '2024-01-15T10:00:00Z' },
                { sender: 'Alex', message: 'Great! Went hiking. You?', timestamp: '2024-01-15T10:05:00Z' },
              ],
              outcome: 'ongoing',
            },
          ],
          currentMetrics: {
            matchCount: 12,
            conversationCount: 8,
            dateCount: 2,
            responseRate: 75,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRecommendations(data.data.recommendations);
      } else {
        setError(data.error.message);
        setIsAuthError(data.error.statusCode === 401);
        
        if (!data.error.isInternal) {
          console.error('Coaching recommendations error:', data.error.message);
        }
      }
    } catch (error) {
      setError('Failed to load recommendations. Please try again.');
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'high') return 'bg-success/10 text-success border-success/20';
    if (impact === 'medium') return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-muted text-muted-foreground border-border';
  };

  const getImpactLabel = (impact: string) => {
    if (impact === 'high') return 'High Impact';
    if (impact === 'medium') return 'Medium Impact';
    return 'Low Impact';
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-subtle border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold text-foreground">
          AI-Powered Recommendations
        </h3>
        <Icon name="LightBulbIcon" size={24} variant="solid" className="text-accent" />
      </div>
      
      {error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start gap-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-semibold text-red-900 mb-2">
                {isAuthError ? 'OpenAI API Key Required' : 'Unable to Load Recommendations'}
              </h3>
              <p className="text-sm text-red-700 mb-3">{error}</p>
              {isAuthError && (
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <p className="text-sm font-medium text-red-900 mb-2">Setup Instructions:</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-red-700">
                    <li>
                      Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-red-900">OpenAI Platform</a> to get your API key
                    </li>
                    <li>Copy your API key</li>
                    <li>Update the <code className="px-1.5 py-0.5 bg-red-100 rounded text-xs font-mono">OPENAI_API_KEY</code> value in your <code className="px-1.5 py-0.5 bg-red-100 rounded text-xs font-mono">.env</code> file</li>
                    <li>Restart your development server</li>
                  </ol>
                </div>
              )}
              <button
                onClick={fetchRecommendations}
                className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background rounded-lg p-4 border border-border animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id}
              className="bg-background rounded-lg p-4 border border-border hover:shadow-subtle transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={rec.icon as any} size={20} variant="outline" className="text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-body font-semibold text-foreground">
                      {rec.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getImpactColor(rec.impact)}`}>
                      {getImpactLabel(rec.impact)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {rec.description}
                  </p>
                  
                  {rec.actionSteps && rec.actionSteps.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-medium text-foreground">Action Steps:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {rec.actionSteps.map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <span className="text-xs text-primary font-medium mt-2 inline-block">
                    {rec.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImprovementRecommendations;