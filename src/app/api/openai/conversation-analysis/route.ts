import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai-client';
import { handleOpenAIError } from '@/lib/openai-error-handler';
import { 
  ApiResponse, 
  ConversationAnalysisRequest, 
  ConversationAnalysisResponse 
} from '@/lib/types/openai';

/**
 * POST /api/openai/conversation-analysis
 * Analyzes conversation quality and provides insights.
 */
export async function POST(request: NextRequest) {
  try {
    const body: ConversationAnalysisRequest = await request.json();
    const { messages, userProfile, partnerProfile } = body;

    if (!messages || messages.length === 0) {
      const errorResponse: ApiResponse = {
        success: false,
        error: {
          message: 'Messages array is required and cannot be empty.',
          isInternal: false,
          statusCode: 400,
        },
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Build conversation context
    const conversationText = messages
      .map(msg => `${msg.sender}: ${msg.message}`)
      .join('\n');

    const systemPrompt = `You are an expert relationship coach and conversation analyst. Analyze the following conversation between ${userProfile.name} and ${partnerProfile.name}.

User Profile (${userProfile.name}):
- Interests: ${userProfile.interests?.join(', ') || 'Not specified'}
- Personality: ${userProfile.personality?.join(', ') || 'Not specified'}

Partner Profile (${partnerProfile.name}):
- Interests: ${partnerProfile.interests?.join(', ') || 'Not specified'}
- Personality: ${partnerProfile.personality?.join(', ') || 'Not specified'}

Provide a detailed analysis of the conversation quality, engagement, sentiment, and actionable insights.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: `Analyze this conversation and provide structured insights:\n\n${conversationText}` 
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'conversation_analysis',
          schema: {
            type: 'object',
            properties: {
              qualityScore: { 
                type: 'number', 
                minimum: 0, 
                maximum: 100,
                description: 'Overall conversation quality score (0-100)'
              },
              engagementLevel: { 
                type: 'string',
                enum: ['low', 'medium', 'high', 'excellent'],
                description: 'Level of engagement between participants'
              },
              sentimentAnalysis: {
                type: 'object',
                properties: {
                  overall: { 
                    type: 'string',
                    enum: ['positive', 'neutral', 'negative'],
                    description: 'Overall sentiment of the conversation'
                  },
                  trend: { 
                    type: 'string',
                    enum: ['improving', 'stable', 'declining'],
                    description: 'Sentiment trend over time'
                  }
                },
                required: ['overall', 'trend']
              },
              conversationDepth: { 
                type: 'number',
                minimum: 0,
                maximum: 100,
                description: 'Depth of conversation topics (0-100)'
              },
              responseTimeQuality: { 
                type: 'number',
                minimum: 0,
                maximum: 100,
                description: 'Quality of response timing and engagement (0-100)'
              },
              insights: {
                type: 'array',
                items: { type: 'string' },
                description: 'Key insights and observations about the conversation'
              }
            },
            required: ['qualityScore', 'engagementLevel', 'sentimentAnalysis', 'conversationDepth', 'responseTimeQuality', 'insights'],
            additionalProperties: false,
          },
        },
      },
    });

    const analysisData: ConversationAnalysisResponse = JSON.parse(
      response.choices[0].message.content || '{}'
    );

    const successResponse: ApiResponse<ConversationAnalysisResponse> = {
      success: true,
      data: analysisData,
    };

    return NextResponse.json(successResponse, { status: 200 });

  } catch (error) {
    const errorResponse = handleOpenAIError(error);
    return NextResponse.json(errorResponse, { status: errorResponse.error.statusCode });
  }
}