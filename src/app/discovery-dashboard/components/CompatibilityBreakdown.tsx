'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CompatibilityFactor {
  category: string;
  score: number;
  icon: string;
  description: string;
}

interface CompatibilityBreakdownProps {
  matchId: number;
  matchName: string;
  overallScore: number;
  factors: CompatibilityFactor[];
  onClose: () => void;
}

const CompatibilityBreakdown = ({
  matchName,
  overallScore,
  factors,
  onClose,
}: CompatibilityBreakdownProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-headline font-bold text-foreground">
              Compatibility with {matchName}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              AI-powered compatibility analysis
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-300"
            aria-label="Close compatibility breakdown"
          >
            <Icon name="XMarkIcon" size={24} variant="outline" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-center mb-6">
            <div className="text-6xl font-headline font-bold text-white mb-2">
              {overallScore}%
            </div>
            <p className="text-white/90 text-lg">Overall Compatibility Score</p>
          </div>

          <div className="space-y-4">
            {factors.map((factor, index) => (
              <div
                key={index}
                className={`${getScoreBgColor(factor.score)} rounded-lg p-4 border border-border`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-card p-2 rounded-lg">
                      <Icon name={factor.icon as any} size={24} variant="outline" />
                    </div>
                    <div>
                      <h3 className="font-headline font-semibold text-foreground">
                        {factor.category}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {factor.description}
                      </p>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(factor.score)}`}>
                    {factor.score}%
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      factor.score >= 80
                        ? 'bg-success'
                        : factor.score >= 60
                        ? 'bg-warning' :'bg-error'
                    }`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="LightBulbIcon" size={24} variant="solid" className="text-accent" />
              <div>
                <h4 className="font-headline font-semibold text-foreground mb-2">
                  AI Recommendation
                </h4>
                <p className="text-muted-foreground text-sm">
                  Based on your compatibility analysis, we recommend starting a conversation about shared interests in {factors[0]?.category.toLowerCase()}. Your high alignment in this area provides excellent conversation starters and potential for meaningful connection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityBreakdown;