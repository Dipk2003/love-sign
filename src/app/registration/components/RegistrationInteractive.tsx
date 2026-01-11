'use client';

import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import ProgressIndicator from './ProgressIndicator';
import BenefitsSection from './BenefitsSection';
import TestimonialsCarousel from './TestimonialsCarousel';

const RegistrationInteractive = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <ProgressIndicator currentStep={currentStep} totalSteps={3} />
        <RegistrationForm onStepChange={setCurrentStep} currentStep={currentStep} />
        <BenefitsSection />
        <TestimonialsCarousel />
      </div>
    </div>
  );
};

export default RegistrationInteractive;