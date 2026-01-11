'use client';

import React, { useState } from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import SuccessStoriesCarousel from './SuccessStoriesCarousel';
import CompatibilityQuizModal from './CompatibilityQuizModal';
import StatsSection from './StatsSection';
import TrustSection from './TrustSection';
import CTASection from './CTASection';
import Footer from './Footer';

const HomepageInteractive = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleStartQuiz = () => {
    setIsQuizOpen(true);
  };

  const handleCloseQuiz = () => {
    setIsQuizOpen(false);
  };

  return (
    <>
      <HeroSection onStartQuiz={handleStartQuiz} />
      <FeaturesSection />
      <StatsSection />
      <SuccessStoriesCarousel />
      <TrustSection />
      <CTASection />
      <Footer />
      <CompatibilityQuizModal isOpen={isQuizOpen} onClose={handleCloseQuiz} />
    </>
  );
};

export default HomepageInteractive;