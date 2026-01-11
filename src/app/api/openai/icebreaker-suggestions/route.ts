import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai-client';
import { handleOpenAIError } from '@/lib/openai-error-handler';
import { 
  ApiResponse, 
  IcebreakerRequest, 
  IcebreakerResponse 
} from '@/lib/types/openai';

/**
 * POST /api/openai/icebreaker-suggestions
 * Generates intelligent icebreaker suggestions based on user profiles.
 */
export async function POST(request: NextRequest) {
  try {
    const body: IcebreakerRequest = await request.json();
    const { userProfile, partnerProfile, compatibilityScore, conversationHistory } = body;

    if (!userProfile || !partnerProfile) {
      const errorResponse: ApiResponse = {
        success: false,
        error: {
          message: 'User profile and partner profile are required.',
          isInternal: false,
          statusCode: 400,
        },
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const conversationContext = conversationHistory && conversationHistory.length > 0
      ? `\n\nPrevious conversation context:\n${conversationHistory.map(msg => `${msg.sender}: ${msg.message}`).join('\n')}`
      : '';

    const systemPrompt = `You are an expert dating coach specializing in creating engaging, personalized conversation starters. Generate icebreaker suggestions that:
1. Are natural and authentic
2. Reference shared interests or compatibility points
3. Encourage meaningful dialogue
4. Are appropriate for the relationship stage
5. Show genuine interest in the other person

User Profile (${userProfile.name}):
- Interests: ${userProfile.interests.join(', ')}
- Personality: ${userProfile.personality.join(', ')}

Partner Profile (${partnerProfile.name}):
- Interests: ${partnerProfile.interests.join(', ')}
- Personality: ${partnerProfile.personality.join(', ')}
${partnerProfile.bio ? `- Bio: ${partnerProfile.bio}` : ''}

Compatibility Score: ${compatibilityScore}%${conversationContext}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: 'Generate 5 personalized icebreaker suggestions with categories and reasoning.' 
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'icebreaker_suggestions',
          schema: {
            type: 'object',
            properties: {
              suggestions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    text: { 
                      type: 'string',
                      description: 'The icebreaker message text'
                    },
                    category: { 
                      type: 'string',
                      description: 'Category of the icebreaker (e.g., Shared Interest, Adventure, Lifestyle)'
                    },
                    reasoning: { 
                      type: 'string',
                      description: 'Why this icebreaker is effective for this match'
                    }
                  },
                  required: ['text', 'category', 'reasoning']
                },
                minItems: 5,
                maxItems: 5
              }
            },
            required: ['suggestions'],
            additionalProperties: false,
          },
        },
      },
    });

    const icebreakerData: IcebreakerResponse = JSON.parse(
      response.choices[0].message.content || '{}'
    );

    const successResponse: ApiResponse<IcebreakerResponse> = {
      success: true,
      data: icebreakerData,
    };

    return NextResponse.json(successResponse, { status: 200 });

  } catch (error) {
    const errorResponse = handleOpenAIError(error);
    return NextResponse.json(errorResponse, { status: errorResponse.error.statusCode });
  }
}