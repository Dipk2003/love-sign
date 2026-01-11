'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

interface CompatibilityQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompatibilityQuizModal = ({ isOpen, onClose }: CompatibilityQuizModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What's your ideal weekend activity?",
      options: [
        "Exploring nature and outdoor adventures",
        "Cozy indoor activities like reading or movies",
        "Social gatherings with friends and family",
        "Trying new restaurants and cultural experiences"
      ]
    },
    {
      id: 2,
      question: "How do you handle conflicts in relationships?",
      options: [
        "Direct communication and immediate resolution",
        "Taking time to process before discussing",
        "Seeking compromise and middle ground",
        "Using humor to diffuse tension"
      ]
    },
    {
      id: 3,
      question: "What's most important to you in a partner?",
      options: [
        "Emotional intelligence and empathy",
        "Shared values and life goals",
        "Sense of humor and fun personality",
        "Ambition and career drive"
      ]
    },
    {
      id: 4,
      question: "How do you prefer to show affection?",
      options: [
        "Physical touch and closeness",
        "Words of affirmation and compliments",
        "Acts of service and thoughtful gestures",
        "Quality time and undivided attention"
      ]
    },
    {
      id: 5,
      question: "What's your approach to future planning?",
      options: [
        "Detailed plans with clear timelines",
        "Flexible goals with room for spontaneity",
        "Living in the present moment",
        "Big picture vision with adaptable steps"
      ]
    }
  ];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  if (!isOpen || !isHydrated) return null;

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const compatibilityScore = 85 + Math.floor(Math.random() * 13);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {!showResults ? (
          <div className="p-8 lg:p-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-coral to-brand-crimson rounded-full flex items-center justify-center">
                  <Icon name="SparklesIcon" size={24} variant="solid" className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-headline font-bold text-foreground">Compatibility Quiz</h3>
                  <p className="text-sm text-muted-foreground font-body">Question {currentQuestion + 1} of {questions.length}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full hover:bg-muted transition-colors duration-300 flex items-center justify-center"
                aria-label="Close quiz"
              >
                <Icon name="XMarkIcon" size={24} variant="outline" />
              </button>
            </div>

            <div className="mb-8">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-coral to-brand-crimson transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-2xl font-headline font-bold text-foreground mb-6">
                {questions[currentQuestion].question}
              </h4>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-muted transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full border-2 border-border group-hover:border-primary transition-colors duration-300 flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <span className="font-body text-foreground">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 lg:p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-brand-coral to-brand-crimson rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <Icon name="HeartIcon" size={48} variant="solid" className="text-white" />
              </div>
              <h3 className="text-3xl font-headline font-bold text-foreground mb-4">
                Your Compatibility Profile
              </h3>
              <p className="text-lg text-muted-foreground font-body">
                Based on your responses, here's what we learned about you
              </p>
            </div>

            <div className="bg-gradient-to-br from-muted to-background rounded-2xl p-8 mb-8">
              <div className="text-6xl font-headline font-bold text-primary mb-2">
                {compatibilityScore}%
              </div>
              <p className="text-lg text-foreground font-body mb-4">
                Average Match Potential
              </p>
              <p className="text-muted-foreground font-body">
                You value emotional connection and meaningful conversations. Your ideal partner shares your approach to communication and future planning.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3 text-left">
                <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-success flex-shrink-0 mt-1" />
                <div>
                  <div className="font-body font-semibold text-foreground">Relationship Style</div>
                  <div className="text-sm text-muted-foreground">You prefer deep emotional connections with clear communication</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-left">
                <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-success flex-shrink-0 mt-1" />
                <div>
                  <div className="font-body font-semibold text-foreground">Compatibility Factors</div>
                  <div className="text-sm text-muted-foreground">Best matches share your values and lifestyle preferences</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-left">
                <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-success flex-shrink-0 mt-1" />
                <div>
                  <div className="font-body font-semibold text-foreground">Growth Potential</div>
                  <div className="text-sm text-muted-foreground">You're open to personal development and relationship growth</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleClose}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-coral to-brand-crimson text-white font-cta font-semibold rounded-lg shadow-subtle hover:shadow-elevated transition-all duration-300"
              >
                Create Free Account
              </button>
              <button
                onClick={resetQuiz}
                className="flex-1 px-6 py-3 bg-muted text-foreground font-cta font-semibold rounded-lg hover:bg-border transition-all duration-300"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompatibilityQuizModal;