'use client';

import React, { useState, useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

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

interface UserProfile {
  id: number;
  name: string;
  image: string;
  imageAlt: string;
  isOnline: boolean;
  compatibilityScore: number;
}

interface ChatWindowProps {
  selectedUser: UserProfile | null;
  messages: ChatMessage[];
  currentUserId: number;
  onSendMessage: (message: string, type: 'text' | 'image' | 'voice') => void;
}

const ChatWindow = ({
  selectedUser,
  messages,
  currentUserId,
  onSendMessage,
}: ChatWindowProps) => {
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput, 'text');
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="ChatBubbleLeftRightIcon" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-headline font-semibold text-foreground mb-2">
            Select a conversation
          </h3>
          <p className="text-muted-foreground">
            Choose a match to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border bg-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <AppImage
              src={selectedUser.image}
              alt={selectedUser.imageAlt}
              className="w-10 h-10 rounded-full object-cover"
            />
            {selectedUser.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
            )}
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground">
              {selectedUser.name}
            </h3>
            <div className="flex items-center gap-1">
              <Icon name="HeartIcon" size={12} className="text-error" variant="solid" />
              <span className="text-xs text-muted-foreground">
                {selectedUser.compatibilityScore}% Compatible
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Video call"
          >
            <Icon name="VideoCameraIcon" size={20} className="text-foreground" />
          </button>
          <button
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Voice call"
          >
            <Icon name="PhoneIcon" size={20} className="text-foreground" />
          </button>
          <button
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="More options"
          >
            <Icon name="EllipsisVerticalIcon" size={20} className="text-foreground" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isSent = msg.senderId === currentUserId;
          return (
            <div
              key={msg.id}
              className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${isSent ? 'order-2' : 'order-1'}`}>
                {msg.type === 'text' && (
                  <div
                    className={`px-4 py-2.5 rounded-2xl ${
                      isSent
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                )}
                {msg.type === 'image' && msg.mediaUrl && (
                  <div className="rounded-2xl overflow-hidden">
                    <AppImage
                      src={msg.mediaUrl}
                      alt={msg.mediaAlt || 'Shared image'}
                      className="w-full h-auto"
                    />
                  </div>
                )}
                {msg.type === 'voice' && (
                  <div
                    className={`px-4 py-2.5 rounded-2xl flex items-center gap-3 ${
                      isSent
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-foreground'
                    }`}
                  >
                    <Icon name="PlayIcon" size={20} variant="solid" />
                    <div className="flex-1 h-1 bg-muted rounded-full">
                      <div className="w-1/3 h-full bg-accent rounded-full"></div>
                    </div>
                    <span className="text-xs">0:15</span>
                  </div>
                )}
                <div
                  className={`flex items-center gap-1 mt-1 ${
                    isSent ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span className="text-xs text-muted-foreground">
                    {msg.timestamp}
                  </span>
                  {isSent && (
                    <Icon
                      name="CheckIcon"
                      size={14}
                      className={msg.isRead ? 'text-primary' : 'text-muted-foreground'}
                      variant={msg.isRead ? 'solid' : 'outline'}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card px-4 py-2.5 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-end gap-2">
          <button
            className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
            aria-label="Attach file"
          >
            <Icon name="PaperClipIcon" size={20} className="text-foreground" />
          </button>
          <button
            className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
            aria-label="Send image"
          >
            <Icon name="PhotoIcon" size={20} className="text-foreground" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>
          <button
            className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
            aria-label="Voice message"
          >
            <Icon name="MicrophoneIcon" size={20} className="text-foreground" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Send message"
          >
            <Icon name="PaperAirplaneIcon" size={20} variant="solid" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;