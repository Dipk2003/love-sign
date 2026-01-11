'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

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

interface ConversationListProps {
  conversations: Message[];
  selectedConversationId: number | null;
  onSelectConversation: (id: number) => void;
}

const ConversationList = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) => {
  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.userId)}
            className={`w-full p-4 flex items-start gap-3 hover:bg-muted transition-colors border-b border-border ${
              selectedConversationId === conversation.userId ? 'bg-muted' : ''
            }`}
          >
            <div className="relative flex-shrink-0">
              <AppImage
                src={conversation.userImage}
                alt={conversation.userImageAlt}
                className="w-12 h-12 rounded-full object-cover"
              />
              {conversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
              )}
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-headline font-semibold text-foreground truncate">
                  {conversation.userName}
                </h3>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {conversation.timestamp}
                </span>
              </div>

              <p className="text-sm text-muted-foreground truncate mb-1">
                {conversation.lastMessage}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Icon name="HeartIcon" size={14} className="text-error" variant="solid" />
                  <span className="text-xs font-medium text-foreground">
                    {conversation.compatibilityScore}% Match
                  </span>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;