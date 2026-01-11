'use client';

import React, { useState, useEffect } from 'react';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import CompatibilityInsights from './CompatibilityInsights';
import { ApiResponse, IcebreakerResponse } from '@/lib/types/openai';

interface Message {
  id: number;
  userId: number;
  userName: string;
  userImage: string;
  userImageAlt: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  compatibilityScore: number;
}

interface ChatMessage {
  id: number;
  senderId: number;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'image' | 'voice';
  mediaUrl?: string;
  mediaAlt?: string;
}

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
}

const MessagesCenterInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [showInsights, setShowInsights] = useState(true);
  const [loadingStarters, setLoadingStarters] = useState(false);
  const [aiConversationStarters, setAiConversationStarters] = useState<ConversationStarter[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockConversations: Message[] = [
  {
    id: 1,
    userId: 101,
    userName: 'Sarah Mitchell',
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_13fd90a86-1763294635574.png",
    userImageAlt: 'Professional woman with long brown hair smiling warmly in natural lighting',
    lastMessage: "I'd love to hear more about your travel experiences!",
    timestamp: '2m ago',
    unreadCount: 2,
    isOnline: true,
    compatibilityScore: 92
  },
  {
    id: 2,
    userId: 102,
    userName: 'Emily Rodriguez',
    userImage: "https://images.unsplash.com/photo-1601847003984-1d63d654b860",
    userImageAlt: 'Young woman with dark hair in casual attire smiling at camera outdoors',
    lastMessage: 'That sounds amazing! When are you free to meet?',
    timestamp: '15m ago',
    unreadCount: 0,
    isOnline: true,
    compatibilityScore: 88
  },
  {
    id: 3,
    userId: 103,
    userName: 'Jessica Chen',
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1124a4601-1763295240952.png",
    userImageAlt: 'Asian woman with black hair in professional attire with confident expression',
    lastMessage: 'Thanks for the book recommendation!',
    timestamp: '1h ago',
    unreadCount: 0,
    isOnline: false,
    compatibilityScore: 85
  },
  {
    id: 4,
    userId: 104,
    userName: 'Amanda Thompson',
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c40e3fcf-1766747628474.png",
    userImageAlt: 'Blonde woman in white shirt smiling brightly in outdoor setting',
    lastMessage: 'Your photography portfolio is incredible!',
    timestamp: '3h ago',
    unreadCount: 1,
    isOnline: false,
    compatibilityScore: 90
  },
  {
    id: 5,
    userId: 105,
    userName: 'Rachel Kim',
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_154a96764-1763300123486.png",
    userImageAlt: 'Woman with shoulder-length brown hair in casual wear with friendly smile',
    lastMessage: 'Looking forward to our coffee date!',
    timestamp: '5h ago',
    unreadCount: 0,
    isOnline: true,
    compatibilityScore: 87
  }];


  const mockChatMessages: {[key: number]: ChatMessage[];} = {
    101: [
    {
      id: 1,
      senderId: 101,
      message: "Hi! I noticed we both love hiking. What's your favorite trail?",
      timestamp: '10:30 AM',
      isRead: true,
      type: 'text'
    },
    {
      id: 2,
      senderId: 1,
      message: "Hey Sarah! I absolutely love the Pacific Crest Trail. The views are breathtaking!",
      timestamp: '10:32 AM',
      isRead: true,
      type: 'text'
    },
    {
      id: 3,
      senderId: 101,
      message: "That's amazing! I've always wanted to do that trail. Have you done the entire thing?",
      timestamp: '10:35 AM',
      isRead: true,
      type: 'text'
    },
    {
      id: 4,
      senderId: 1,
      message: 'Not yet, but I completed a 200-mile section last summer. Planning to do more this year!',
      timestamp: '10:37 AM',
      isRead: true,
      type: 'text'
    },
    {
      id: 5,
      senderId: 101,
      message: "I'd love to hear more about your travel experiences!",
      timestamp: '10:40 AM',
      isRead: false,
      type: 'text'
    }],

    102: [
    {
      id: 1,
      senderId: 102,
      message: 'Your profile mentioned you love cooking. What cuisine do you specialize in?',
      timestamp: '9:15 AM',
      isRead: true,
      type: 'text'
    },
    {
      id: 2,
      senderId: 1,
      message: "I love experimenting with Italian and Thai cuisine! There's something magical about fresh pasta.",
      timestamp: '9:18 AM',
      isRead: true,
      type: 'text'
    },
    {
      id: 3,
      senderId: 102,
      message: 'That sounds amazing! When are you free to meet?',
      timestamp: '9:45 AM',
      isRead: true,
      type: 'text'
    }],

    103: [
    {
      id: 1,
      senderId: 1,
      message: 'Hi Jessica! I saw you enjoy reading sci-fi. Have you read "Project Hail Mary"?',
      timestamp: 'Yesterday',
      isRead: true,
      type: 'text'
    },
    {
      id: 2,
      senderId: 103,
      message: 'Yes! That book was incredible. The science was so well-researched.',
      timestamp: 'Yesterday',
      isRead: true,
      type: 'text'
    },
    {
      id: 3,
      senderId: 103,
      message: 'Thanks for the book recommendation!',
      timestamp: '1h ago',
      isRead: true,
      type: 'text'
    }],

    104: [
    {
      id: 1,
      senderId: 104,
      message: 'Your photography portfolio is incredible!',
      timestamp: '3h ago',
      isRead: false,
      type: 'text'
    }],

    105: [
    {
      id: 1,
      senderId: 105,
      message: 'Looking forward to our coffee date!',
      timestamp: '5h ago',
      isRead: true,
      type: 'text'
    }]

  };

  const mockCompatibilityDetails: CompatibilityDetail[] = [
  {
    category: 'Interests',
    score: 95,
    icon: 'HeartIcon',
    description: 'You both love outdoor adventures and photography'
  },
  {
    category: 'Values',
    score: 92,
    icon: 'StarIcon',
    description: 'Strong alignment on life goals and family values'
  },
  {
    category: 'Communication',
    score: 88,
    icon: 'ChatBubbleLeftRightIcon',
    description: 'Similar communication styles and humor'
  },
  {
    category: 'Lifestyle',
    score: 90,
    icon: 'HomeIcon',
    description: 'Compatible daily routines and social preferences'
  }];


  const mockMilestones: Milestone[] = [
  {
    id: 1,
    title: 'First Message Sent',
    date: 'January 8, 2026',
    icon: 'ChatBubbleLeftIcon',
    achieved: true
  },
  {
    id: 2,
    title: 'First Voice Call',
    date: 'January 9, 2026',
    icon: 'PhoneIcon',
    achieved: true
  },
  {
    id: 3,
    title: 'First Date Scheduled',
    date: 'January 12, 2026',
    icon: 'CalendarIcon',
    achieved: false
  },
  {
    id: 4,
    title: 'One Week Connection',
    date: 'January 15, 2026',
    icon: 'HeartIcon',
    achieved: false
  }];


  const mockConversationStarters: ConversationStarter[] = [
  {
    id: 1,
    text: "I noticed you love hiking too! What's the most memorable trail you've explored?",
    category: 'Shared Interests'
  },
  {
    id: 2,
    text: 'Your travel photos are amazing! Which destination surprised you the most?',
    category: 'Travel & Adventure'
  },
  {
    id: 3,
    text: "I see we both value family time. What's your favorite family tradition?",
    category: 'Values & Lifestyle'
  },
  {
    id: 4,
    text: 'Your taste in music is great! Have you been to any concerts recently?',
    category: 'Entertainment'
  }];


  const selectedUser = mockConversations.find((c) => c.userId === selectedConversationId);
  const currentMessages = selectedConversationId ? mockChatMessages[selectedConversationId] || [] : [];

  const handleSendMessage = (message: string, type: 'text' | 'image' | 'voice') => {
    console.log('Sending message:', message, type);
  };

  const handleUseStarter = (text: string) => {
    console.log('Using conversation starter:', text);
  };

  const fetchAIIcebreakers = async (userId: number) => {
    const selectedConv = mockConversations.find(c => c.userId === userId);
    if (!selectedConv) return;

    setLoadingStarters(true);
    try {
      const response = await fetch('/api/openai/icebreaker-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userProfile: {
            name: 'You',
            interests: ['hiking', 'photography', 'travel', 'cooking'],
            personality: ['adventurous', 'creative', 'empathetic'],
          },
          partnerProfile: {
            name: selectedConv.userName,
            interests: ['outdoor activities', 'art', 'music', 'food'],
            personality: ['outgoing', 'thoughtful', 'passionate'],
            bio: 'Loves exploring new places and trying new cuisines',
          },
          compatibilityScore: selectedConv.compatibilityScore,
          conversationHistory: mockChatMessages[userId]?.slice(-5).map(msg => ({
            sender: msg.senderId === 1 ? 'You' : selectedConv.userName,
            message: msg.message,
          })),
        }),
      });

      const data: ApiResponse<IcebreakerResponse> = await response.json();

      if (data.success) {
        const startersWithIds = data.data.suggestions.map((suggestion, index) => ({
          id: Date.now() + index,
          text: suggestion.text,
          category: suggestion.category,
          reasoning: suggestion.reasoning,
        }));
        setAiConversationStarters(startersWithIds);
      } else {
        if (!data.error.isInternal) {
          console.error('Error fetching icebreakers:', data.error.message);
        }
        // Fallback to mock data
        setAiConversationStarters(mockConversationStarters);
      }
    } catch (error) {
      console.error('Network error fetching icebreakers:', error);
      // Fallback to mock data
      setAiConversationStarters(mockConversationStarters);
    } finally {
      setLoadingStarters(false);
    }
  };

  const handleSelectConversation = (userId: number) => {
    setSelectedConversationId(userId);
    fetchAIIcebreakers(userId);
  };

  const handleRefreshStarters = () => {
    if (selectedConversationId) {
      fetchAIIcebreakers(selectedConversationId);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading messages...</p>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="h-[calc(100vh-4rem)] flex">
        <div className="w-full lg:w-80 xl:w-96 border-r border-border flex-shrink-0">
          <ConversationList
            conversations={mockConversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation} />

        </div>

        <div className="flex-1 hidden lg:flex">
          <ChatWindow
            selectedUser={
            selectedUser ?
            {
              id: selectedUser.userId,
              name: selectedUser.userName,
              image: selectedUser.userImage,
              imageAlt: selectedUser.userImageAlt,
              isOnline: selectedUser.isOnline,
              compatibilityScore: selectedUser.compatibilityScore
            } :
            null
            }
            messages={currentMessages}
            currentUserId={1}
            onSendMessage={handleSendMessage} />

        </div>

        {showInsights &&
          <div className="w-80 xl:w-96 border-l border-border hidden xl:block flex-shrink-0">
            <CompatibilityInsights
              selectedUser={
                selectedUser
                  ? {
                      name: selectedUser.userName,
                      compatibilityScore: selectedUser.compatibilityScore,
                    }
                  : null
              }
              compatibilityDetails={mockCompatibilityDetails}
              milestones={mockMilestones}
              conversationStarters={
                aiConversationStarters.length > 0
                  ? aiConversationStarters
                  : mockConversationStarters
              }
              onUseStarter={handleUseStarter}
              onRefreshStarters={handleRefreshStarters}
              loadingStarters={loadingStarters}
            />

          </div>
        }
      </div>
    </div>);

};

export default MessagesCenterInteractive;