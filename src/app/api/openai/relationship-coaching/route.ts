import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai-client';
import { handleOpenAIError } from '@/lib/openai-error-handler';
import { 
  ApiResponse, 
  CoachingRequest, 
  CoachingResponse 
} from '@/lib/types/openai';

/**
 * POST /api/openai/relationship-coaching
 * Provides personalized relationship coaching recommendations.
 */
export async function POST(request: NextRequest) {
  try {
    const body: CoachingRequest = await request.json();
    const { userProfile, conversationHistory, currentMetrics } = body;

    if (!userProfile || !currentMetrics) {
      const errorResponse: ApiResponse = {
        success: false,
        error: {
          message: 'User profile and current metrics are required.',
          isInternal: false,
          statusCode: 400,
        },
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const conversationSummary = conversationHistory && conversationHistory.length > 0
      ? conversationHistory.map(conv => {
          const messageCount = conv.messages.length;
          const lastMessage = conv.messages[conv.messages.length - 1];
          return `- Conversation with ${conv.partnerName}: ${messageCount} messages, last message: "${lastMessage.message.substring(0, 50)}..." ${conv.outcome ? `(Outcome: ${conv.outcome})` : ''}`;
        }).join('\n')
      : 'No conversation history available';

    const systemPrompt = `You are an expert relationship and dating coach with deep expertise in communication, emotional intelligence, and relationship building. Provide personalized, actionable coaching recommendations.

User Profile (${userProfile.name}):
- Dating Goals: ${userProfile.datingGoals?.join(', ') || 'Not specified'}
- Challenges: ${userProfile.challenges?.join(', ') || 'Not specified'}

Current Metrics:
- Total Matches: ${currentMetrics.matchCount}
- Active Conversations: ${currentMetrics.conversationCount}
- Dates Scheduled: ${currentMetrics.dateCount}
- Response Rate: ${currentMetrics.responseRate}%

Conversation History Summary:
${conversationSummary}

Provide comprehensive coaching recommendations that are:
1. Specific and actionable
2. Based on observed patterns
3. Prioritized by impact
4. Supportive and encouraging
5. Focused on genuine connection and growth`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: 'Analyze my dating patterns and provide personalized coaching recommendations with actionable steps.' 
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'coaching_recommendations',
          schema: {
            type: 'object',
            properties: {
              recommendations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    category: { 
                      type: 'string',
                      description: 'Category of recommendation (e.g., Communication, Profile, Engagement)'
                    },
                    title: { 
                      type: 'string',
                      description: 'Clear, actionable title'
                    },
                    description: { 
                      type: 'string',
                      description: 'Detailed explanation of the recommendation'
                    },
                    impact: { 
                      type: 'string',
                      enum: ['high', 'medium', 'low'],
                      description: 'Expected impact level'
                    },
                    actionSteps: {
                      type: 'array',
                      items: { type: 'string' },
                      description: 'Specific action steps to implement'
                    },
                    icon: { 
                      type: 'string',
                      description: 'Heroicon name for visual representation'
                    }
                  },
                  required: ['category', 'title', 'description', 'impact', 'actionSteps', 'icon']
                },
                minItems: 4,
                maxItems: 6
              },
              overallAssessment: {
                type: 'string',
                description: 'Overall assessment of dating approach and progress'
              },
              strengthAreas: {
                type: 'array',
                items: { type: 'string' },
                description: 'Areas where the user is doing well'
              },
              improvementAreas: {
                type: 'array',
                items: { type: 'string' },
                description: 'Areas with room for improvement'
              }
            },
            required: ['recommendations', 'overallAssessment', 'strengthAreas', 'improvementAreas'],
            additionalProperties: false,
          },
        },
      },
    });

    const coachingData: CoachingResponse = JSON.parse(
      response.choices[0].message.content || '{}'
    );

    const successResponse: ApiResponse<CoachingResponse> = {
      success: true,
      data: coachingData,
    };

    return NextResponse.json(successResponse, { status: 200 });

  } catch (error) {
    const errorResponse = handleOpenAIError(error);
    return NextResponse.json(errorResponse, { status: errorResponse.error.statusCode });
  }
}