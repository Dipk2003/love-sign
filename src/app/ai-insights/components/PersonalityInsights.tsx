'use client';

import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

interface PersonalityTrait {
  trait: string;
  score: number;
  ideal: number;
}

interface PersonalityInsightsProps {
  data: PersonalityTrait[];
}

const PersonalityInsights: React.FC<PersonalityInsightsProps> = ({ data }) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-subtle border border-border">
      <h3 className="text-lg font-headline font-semibold text-foreground mb-6">
        Personality Compatibility Analysis
      </h3>
      
      <div className="w-full h-80" aria-label="Personality Compatibility Radar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis 
              dataKey="trait" 
              stroke="#64748B"
              style={{ fontSize: '12px', fontFamily: 'Source Sans 3, sans-serif' }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              stroke="#64748B"
              style={{ fontSize: '10px', fontFamily: 'Source Sans 3, sans-serif' }}
            />
            <Radar 
              name="Your Profile" 
              dataKey="score" 
              stroke="#3B82F6" 
              fill="#3B82F6" 
              fillOpacity={0.6}
            />
            <Radar 
              name="Ideal Match" 
              dataKey="ideal" 
              stroke="#ff6b6b" 
              fill="#ff6b6b" 
              fillOpacity={0.3}
            />
            <Legend 
              wrapperStyle={{ 
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '14px'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <p className="mt-4 text-sm text-muted-foreground">
        Your personality traits compared to your ideal match preferences
      </p>
    </div>
  );
};

export default PersonalityInsights;