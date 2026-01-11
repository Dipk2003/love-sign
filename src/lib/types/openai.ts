// API Response Types
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    isInternal: boolean;
    statusCode: number;
  };
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

// Chat Completion Types
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  messages: ChatMessage[];
  reasoningEffort?: 'minimal' | 'low' | 'medium' | 'high';
  verbosity?: 'low' | 'medium' | 'high';
  max_completion_tokens?: number;
  stream?: boolean;
}

export interface ChatCompletionResponse {
  message: string;
}

// Structured Output Types
export interface StructuredOutputRequest {
  messages: ChatMessage[];
  schema?: Record<string, any>;
  schemaName?: string;
}

export interface StructuredOutputResponse<T = any> {
  data: T;
}

// Conversation Analysis Types
export interface ConversationAnalysisRequest {
  messages: Array<{
    sender: string;
    message: string;
    timestamp: string;
  }>;
  userProfile: {
    name: string;
    interests?: string[];
    personality?: string[];
  };
  partnerProfile: {
    name: string;
    interests?: string[];
    personality?: string[];
  };
}

export interface ConversationAnalysisResponse {
  qualityScore: number;
  engagementLevel: string;
  sentimentAnalysis: {
    overall: string;
    trend: string;
  };
  conversationDepth: number;
  responseTimeQuality: number;
  insights: string[];
}

// Icebreaker Suggestions Types
export interface IcebreakerRequest {
  userProfile: {
    name: string;
    interests: string[];
    personality: string[];
  };
  partnerProfile: {
    name: string;
    interests: string[];
    personality: string[];
    bio?: string;
  };
  compatibilityScore: number;
  conversationHistory?: Array<{
    message: string;
    sender: string;
  }>;
}

export interface IcebreakerSuggestion {
  text: string;
  category: string;
  reasoning: string;
}

export interface IcebreakerResponse {
  suggestions: IcebreakerSuggestion[];
}

// Relationship Coaching Types
export interface CoachingRequest {
  userProfile: {
    name: string;
    datingGoals?: string[];
    challenges?: string[];
  };
  conversationHistory: Array<{
    partnerId: number;
    partnerName: string;
    messages: Array<{
      sender: string;
      message: string;
      timestamp: string;
    }>;
    outcome?: string;
  }>;
  currentMetrics: {
    matchCount: number;
    conversationCount: number;
    dateCount: number;
    responseRate: number;
  };
}

export interface CoachingRecommendation {
  category: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionSteps: string[];
  icon: string;
}

export interface CoachingResponse {
  recommendations: CoachingRecommendation[];
  overallAssessment: string;
  strengthAreas: string[];
  improvementAreas: string[];
}