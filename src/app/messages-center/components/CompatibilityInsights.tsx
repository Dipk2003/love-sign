'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { ConversationAnalysisResponse } from '@/lib/types/openai';

interface CompatibilityDetail {
  category: string;
  score: number;
  icon: string;
  description: string;
}

interface Milestone {
  id: number;
  title: string;
  date: string;
  icon: string;
  achieved: boolean;
}

interface ConversationStarter {
  id: number;
  text: string;
  category: string;
  reasoning?: string;
}

interface CompatibilityInsightsProps {
  selectedUser: {
    name: string;
    compatibilityScore: number;
  } | null;
  compatibilityDetails: CompatibilityDetail[];
  milestones: Milestone[];
  conversationStarters: ConversationStarter[];
  onUseStarter: (text: string) => void;
  onRefreshStarters?: () => void;
  loadingStarters?: boolean;
}

const CompatibilityInsights = ({
  selectedUser,
  compatibilityDetails,
  milestones,
  conversationStarters,
  onUseStarter,
  onRefreshStarters,
  loadingStarters = false,
}: CompatibilityInsightsProps) => {
  const [analysis, setAnalysis] = useState<ConversationAnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isAuthError, setIsAuthError] = useState(false);

  const analyzeConversation = async () => {
    if (!selectedUser) return;

    setIsAnalyzing(true);
    setAnalysisError(null);
    setIsAuthError(false);

    try {
      const response = await fetch('/api/openai/conversation-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              sender: 'You',
              message: `Hey ${selectedUser.name}, how has your week been so far?`,
              timestamp: new Date().toISOString(),
            },
            {
              sender: selectedUser.name,
              message:
                "It's been good! Been busy with work but trying to make time for hobbies too.",
              timestamp: new Date().toISOString(),
            },
          ],
          userProfile: {
            name: 'You',
            interests: ['hiking', 'photography'],
            personality: ['adventurous', 'creative'],
          },
          partnerProfile: {
            name: selectedUser.name,
            interests: ['travel', 'art'],
            personality: ['outgoing', 'thoughtful'],
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.data as ConversationAnalysisResponse);
      } else {
        setAnalysisError(data.error.message);
        setIsAuthError(data.error.statusCode === 401);

        if (!data.error.isInternal) {
          // eslint-disable-next-line no-console
          console.error('Conversation analysis error:', data.error.message);
        }
      }
    } catch (error) {
      setAnalysisError('Failed to analyze conversation. Please try again.');
      // eslint-disable-next-line no-console
      console.error('Network error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center bg-card p-6">
        <div className="text-center">
          <Icon name="LightBulbIcon" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Select a conversation to view insights
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="SparklesIcon" size={20} className="text-accent" variant="solid" />
          <h3 className="font-headline font-semibold text-foreground">
            Compatibility Insights
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          AI-powered analysis of your connection with {selectedUser.name}
        </p>
      </div>

      <div className="p-6 border-b border-border">
        <h4 className="font-headline font-semibold text-foreground mb-4">
          Overall Compatibility
        </h4>
        <div className="relative">
          <div className="flex items-center justify-center mb-2">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 56 * (1 - selectedUser.compatibilityScore / 100)
                  }`}
                  className="text-primary transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-headline font-bold text-foreground">
                  {selectedUser.compatibilityScore}%
                </span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Excellent compatibility match
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <button
            type="button"
            onClick={analyzeConversation}
            disabled={isAnalyzing}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {isAnalyzing ? 'Analyzing conversation…' : 'Analyze Conversation with AI'}
          </button>

          {analysisError && (
            <p className="text-sm text-red-600">
              {analysisError}
              {isAuthError && (
                <>
                  {' '}
                  Please confirm your <code className="px-1 py-0.5 rounded bg-red-100 text-xs">OPENAI_API_KEY</code>{' '}
                  is set in your <code className="px-1 py-0.5 rounded bg-red-100 text-xs">.env</code> file and restart the app.
                </>
              )}
            </p>
          )}

          {analysis && (
            <div className="rounded-lg border border-border bg-background p-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Conversation quality</span>
                <span className="font-semibold text-primary">{analysis.qualityScore}/100</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Engagement: {analysis.engagementLevel} · Sentiment: {analysis.sentimentAnalysis.overall} (
                {analysis.sentimentAnalysis.trend})
              </p>
              <p className="text-xs text-muted-foreground">
                Depth: {analysis.conversationDepth}/100 · Response timing: {analysis.responseTimeQuality}/100
              </p>
              {analysis.insights?.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                  {analysis.insights.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 border-b border-border">
        <h4 className="font-headline font-semibold text-foreground mb-4">
          Compatibility Breakdown
        </h4>
        <div className="space-y-4">
          {compatibilityDetails.map((detail, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon
                    name={detail.icon as any}
                    size={16}
                    className="text-primary"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {detail.category}
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {detail.score}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-1">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${detail.score}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">{detail.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-b border-border">
        <h4 className="font-headline font-semibold text-foreground mb-4">
          Relationship Milestones
        </h4>
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                milestone.achieved ? 'bg-success/10' : 'bg-muted'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  milestone.achieved
                    ? 'bg-success text-success-foreground'
                    : 'bg-background text-muted-foreground'
                }`}
              >
                <Icon
                  name={milestone.icon as any}
                  size={16}
                  variant={milestone.achieved ? 'solid' : 'outline'}
                />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-medium text-foreground">
                  {milestone.title}
                </h5>
                <p className="text-xs text-muted-foreground">{milestone.date}</p>
              </div>
              {milestone.achieved && (
                <Icon
                  name="CheckCircleIcon"
                  size={20}
                  className="text-success flex-shrink-0"
                  variant="solid"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-headline font-semibold text-foreground">
            AI Conversation Starters
          </h4>
          {onRefreshStarters && (
            <button
              onClick={onRefreshStarters}
              disabled={loadingStarters}
              className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
              aria-label="Refresh suggestions"
            >
              <Icon 
                name="ArrowPathIcon" 
                size={16} 
                className={`text-primary ${loadingStarters ? 'animate-spin' : ''}`}
              />
            </button>
          )}
        </div>
        {loadingStarters ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full p-3 bg-muted rounded-lg animate-pulse">
                <div className="h-4 bg-background rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-background rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {conversationStarters.map((starter) => (
              <button
                key={starter.id}
                onClick={() => onUseStarter(starter.text)}
                className="w-full text-left p-3 bg-background hover:bg-muted rounded-lg transition-colors border border-border group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <span className="text-xs font-medium text-primary mb-1 block">
                      {starter.category}
                    </span>
                    <p className="text-sm text-foreground">{starter.text}</p>
                    {starter.reasoning && (
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        {starter.reasoning}
                      </p>
                    )}
                  </div>
                  <Icon
                    name="ArrowRightIcon"
                    size={16}
                    className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1"
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompatibilityInsights;