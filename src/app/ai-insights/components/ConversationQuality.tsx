'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface QualityData {
  category: string;
  score: number;
}

interface ConversationQualityProps {
  data: QualityData[];
}

const ConversationQuality: React.FC<ConversationQualityProps> = ({ data }) => {
  const COLORS = ['#3B82F6', '#4ecdc4', '#ff6b6b', '#ffa726', '#059669'];

  return (
    <div className="bg-card rounded-xl p-6 shadow-subtle border border-border">
      <h3 className="text-lg font-headline font-semibold text-foreground mb-6">
        Conversation Quality Analysis
      </h3>
      
      <div className="w-full h-80" aria-label="Conversation Quality Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="category" 
              stroke="#64748B"
              style={{ fontSize: '12px', fontFamily: 'Source Sans 3, sans-serif' }}
            />
            <YAxis 
              stroke="#64748B"
              style={{ fontSize: '12px', fontFamily: 'Source Sans 3, sans-serif' }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontFamily: 'Source Sans 3, sans-serif'
              }}
            />
            <Legend 
              wrapperStyle={{ 
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '14px'
              }}
            />
            <Bar 
              dataKey="score" 
              name="Quality Score"
              radius={[8, 8, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p className="mt-4 text-sm text-muted-foreground">
        AI analysis of your conversation engagement and quality metrics
      </p>
    </div>
  );
};

export default ConversationQuality;