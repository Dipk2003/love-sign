'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartDataPoint {
  month: string;
  matches: number;
  conversations: number;
  dates: number;
}

interface DatingPatternChartProps {
  data: ChartDataPoint[];
}

const DatingPatternChart: React.FC<DatingPatternChartProps> = ({ data }) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-subtle border border-border">
      <h3 className="text-lg font-headline font-semibold text-foreground mb-6">
        Dating Activity Trends
      </h3>
      
      <div className="w-full h-80" aria-label="Dating Activity Trends Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="month" 
              stroke="#64748B"
              style={{ fontSize: '12px', fontFamily: 'Source Sans 3, sans-serif' }}
            />
            <YAxis 
              stroke="#64748B"
              style={{ fontSize: '12px', fontFamily: 'Source Sans 3, sans-serif' }}
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
            <Line 
              type="monotone" 
              dataKey="matches" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Matches"
            />
            <Line 
              type="monotone" 
              dataKey="conversations" 
              stroke="#4ecdc4" 
              strokeWidth={2}
              dot={{ fill: '#4ecdc4', r: 4 }}
              activeDot={{ r: 6 }}
              name="Conversations"
            />
            <Line 
              type="monotone" 
              dataKey="dates" 
              stroke="#ff6b6b" 
              strokeWidth={2}
              dot={{ fill: '#ff6b6b', r: 4 }}
              activeDot={{ r: 6 }}
              name="Dates"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DatingPatternChart;