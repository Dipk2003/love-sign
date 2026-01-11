'use client';

import React, { useState, useEffect } from 'react';
import InsightsHeader from './InsightsHeader';
import CompatibilityScore from './CompatibilityScore';
import SuccessMetrics from './SuccessMetrics';
import DatingPatternChart from './DatingPatternChart';
import PersonalityInsights from './PersonalityInsights';
import ConversationQuality from './ConversationQuality';
import ImprovementRecommendations from './ImprovementRecommendations';
import ProgressTracker from './ProgressTracker';
import PremiumUpgradeCard from './PremiumUpgradeCard';
import { ApiResponse, CoachingResponse } from '@/lib/types/openai';

interface ChartDataPoint {
  month: string;
  matches: number;
  conversations: number;
  dates: number;
}

interface PersonalityTrait {
  trait: string;
  score: number;
  ideal: number;
}

interface QualityData {
  category: string;
  score: number;
}

interface Metric {
  id: number;
  label: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

interface Recommendation {
  id: number;
  category: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  icon: string;
  actionSteps?: string[];
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date?: string;
  icon: string;
}

interface Feature {
  id: number;
  text: string;
  icon: string;
}

const AIInsightsInteractive: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [loadingConversationQuality, setLoadingConversationQuality] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<Recommendation[]>([]);
  const [aiConversationQuality, setAiConversationQuality] = useState<QualityData[]>([]);

  useEffect(() => {
    setIsHydrated(true);
    fetchAIRecommendations();
  }, []);

  const userName = "Sarah";
  const memberSince = "March 2025";

  const compatibilityData = {
    score: 87,
    trend: 'up' as const,
    change: 12
  };

  const successMetrics: Metric[] = [
    {
      id: 1,
      label: "Quality Matches",
      value: "156",
      change: 23,
      icon: "HeartIcon",
      color: "bg-brand-coral"
    },
    {
      id: 2,
      label: "Meaningful Conversations",
      value: "89",
      change: 18,
      icon: "ChatBubbleLeftRightIcon",
      color: "bg-brand-teal"
    },
    {
      id: 3,
      label: "Successful Dates",
      value: "34",
      change: 15,
      icon: "CalendarDaysIcon",
      color: "bg-accent"
    },
    {
      id: 4,
      label: "Response Rate",
      value: "92%",
      change: 8,
      icon: "BoltIcon",
      color: "bg-primary"
    }
  ];

  const datingPatternData: ChartDataPoint[] = [
    { month: "Jul", matches: 18, conversations: 12, dates: 4 },
    { month: "Aug", matches: 24, conversations: 16, dates: 6 },
    { month: "Sep", matches: 31, conversations: 22, dates: 8 },
    { month: "Oct", matches: 28, conversations: 19, dates: 7 },
    { month: "Nov", matches: 35, conversations: 25, dates: 10 },
    { month: "Dec", matches: 42, conversations: 31, dates: 12 }
  ];

  const personalityData: PersonalityTrait[] = [
    { trait: "Openness", score: 85, ideal: 78 },
    { trait: "Conscientiousness", score: 72, ideal: 80 },
    { trait: "Extraversion", score: 68, ideal: 75 },
    { trait: "Agreeableness", score: 90, ideal: 85 },
    { trait: "Emotional Stability", score: 78, ideal: 82 },
    { trait: "Adventurousness", score: 82, ideal: 88 }
  ];

  const conversationQualityData: QualityData[] = [
    { category: "Engagement", score: 88 },
    { category: "Response Time", score: 92 },
    { category: "Depth", score: 76 },
    { category: "Positivity", score: 85 },
    { category: "Authenticity", score: 90 }
  ];

  const recommendations: Recommendation[] = [
    {
      id: 1,
      category: "Profile Optimization",
      title: "Add More Lifestyle Photos",
      description: "Profiles with 5+ diverse photos receive 40% more quality matches. Consider adding photos of your hobbies and interests.",
      impact: "high",
      icon: "CameraIcon"
    },
    {
      id: 2,
      category: "Communication",
      title: "Improve Response Timing",
      description: "Responding within 2 hours increases conversation continuation by 65%. Try to check messages more frequently.",
      impact: "high",
      icon: "ClockIcon"
    },
    {
      id: 3,
      category: "Engagement",
      title: "Ask More Open-Ended Questions",
      description: "Conversations with open-ended questions last 3x longer. Try asking about experiences rather than yes/no questions.",
      impact: "medium",
      icon: "ChatBubbleBottomCenterTextIcon"
    },
    {
      id: 4,
      category: "Profile Content",
      title: "Update Your Bio",
      description: "Your bio hasn't been updated in 3 months. Fresh content can increase profile views by 25%.",
      impact: "medium",
      icon: "PencilSquareIcon"
    }
  ];

  const milestones: Milestone[] = [
    {
      id: 1,
      title: "Profile Completed",
      description: "Added all essential information and photos",
      completed: true,
      date: "March 15, 2025",
      icon: "UserCircleIcon"
    },
    {
      id: 2,
      title: "First Quality Match",
      description: "Received your first 90%+ compatibility match",
      completed: true,
      date: "March 22, 2025",
      icon: "HeartIcon"
    },
    {
      id: 3,
      title: "Meaningful Conversation",
      description: "Had a conversation lasting over 50 messages",
      completed: true,
      date: "April 5, 2025",
      icon: "ChatBubbleLeftRightIcon"
    },
    {
      id: 4,
      title: "First Date Scheduled",
      description: "Successfully planned your first in-person meeting",
      completed: true,
      date: "April 18, 2025",
      icon: "CalendarDaysIcon"
    },
    {
      id: 5,
      title: "Relationship Milestone",
      description: "Reached 3 months with a compatible match",
      completed: false,
      icon: "SparklesIcon"
    }
  ];

  const premiumFeatures: Feature[] = [
    { id: 1, text: "Advanced compatibility deep-dive reports", icon: "CheckIcon" },
    { id: 2, text: "Priority matching with top 1% profiles", icon: "CheckIcon" },
    { id: 3, text: "Personalized AI relationship coaching", icon: "CheckIcon" },
    { id: 4, text: "Unlimited conversation insights", icon: "CheckIcon" },
    { id: 5, text: "Exportable relationship analytics", icon: "CheckIcon" }
  ];

  const fetchAIRecommendations = async () => {
    setLoadingRecommendations(true);
    try {
      const response = await fetch('/api/openai/relationship-coaching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userProfile: {
            name: userName,
            datingGoals: ['meaningful relationship', 'authentic connection', 'shared values'],
            challenges: ['starting conversations', 'maintaining engagement'],
          },
          conversationHistory: [
            {
              partnerId: 101,
              partnerName: 'Sarah Mitchell',
              messages: [
                { sender: 'You', message: 'Hi! I noticed we both love hiking.', timestamp: '10:30 AM' },
                { sender: 'Sarah Mitchell', message: 'Yes! What\'s your favorite trail?', timestamp: '10:32 AM' },
              ],
              outcome: 'ongoing',
            },
          ],
          currentMetrics: {
            matchCount: 156,
            conversationCount: 89,
            dateCount: 34,
            responseRate: 92,
          },
        }),
      });

      const data: ApiResponse<CoachingResponse> = await response.json();

      if (data.success) {
        const recommendationsWithIds = data.data.recommendations.map((rec, index) => ({
          id: index + 1,
          category: rec.category,
          title: rec.title,
          description: rec.description,
          impact: rec.impact,
          icon: rec.icon,
          actionSteps: rec.actionSteps,
        }));
        setAiRecommendations(recommendationsWithIds);
      } else {
        if (!data.error.isInternal) {
          console.error('Error fetching recommendations:', data.error.message);
        }
        // Fallback to mock data
        setAiRecommendations(recommendations);
      }
    } catch (error) {
      console.error('Network error fetching recommendations:', error);
      // Fallback to mock data
      setAiRecommendations(recommendations);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-8 p-8">
          <div className="h-48 bg-muted rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-xl" />
            ))}
          </div>
          <div className="h-96 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <InsightsHeader userName={userName} memberSince={memberSince} />
      
      <SuccessMetrics metrics={successMetrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CompatibilityScore 
            score={compatibilityData.score}
            trend={compatibilityData.trend}
            change={compatibilityData.change}
          />
        </div>
        <div>
          <PremiumUpgradeCard features={premiumFeatures} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DatingPatternChart data={datingPatternData} />
        <PersonalityInsights data={personalityData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ConversationQuality data={conversationQualityData} />
        <ImprovementRecommendations 
          recommendations={aiRecommendations.length > 0 ? aiRecommendations : recommendations}
          loading={loadingRecommendations}
        />
      </div>
      
      <ProgressTracker milestones={milestones} />
    </div>
  );
};

export default AIInsightsInteractive;