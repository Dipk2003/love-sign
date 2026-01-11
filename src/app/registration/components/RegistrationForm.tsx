'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';


interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
  lookingFor: string;
  location: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface RegistrationFormProps {
  onStepChange: (step: number) => void;
  currentStep: number;
}

const RegistrationForm = ({ onStepChange, currentStep }: RegistrationFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    lookingFor: '',
    location: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (formData.password) {
      calculatePasswordStrength(formData.password);
    }
  }, [formData.password]);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    setPasswordStrength(Math.min(strength, 100));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Name must be at least 2 characters';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      } else {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
          newErrors.dateOfBirth = 'You must be at least 18 years old';
        }
      }

      if (!formData.gender) {
        newErrors.gender = 'Please select your gender';
      }

      if (!formData.lookingFor) {
        newErrors.lookingFor = 'Please select who you are looking for';
      }

      if (!formData.location.trim()) {
        newErrors.location = 'Location is required';
      }
    }

    if (step === 3) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the Terms of Service';
      }
      if (!formData.agreeToPrivacy) {
        newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        onStepChange(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Registration successful! Redirecting to AI personality assessment...');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    alert(`${provider} login integration would happen here`);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-error';
    if (passwordStrength < 70) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 70) return 'Medium';
    return 'Strong';
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-card rounded-2xl shadow-elevated p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="space-y-4">
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-2xl shadow-elevated p-8">
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-headline font-bold text-primary">Create Your Account</h2>
            <p className="text-muted-foreground font-body">
              Start your journey to meaningful connections
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-border rounded-lg hover:bg-muted transition-all duration-300"
              >
                <Icon name="GlobeAltIcon" size={20} variant="outline" />
                <span className="font-body font-medium">Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-border rounded-lg hover:bg-muted transition-all duration-300"
              >
                <Icon name="UserGroupIcon" size={20} variant="outline" />
                <span className="font-body font-medium">Facebook</span>
              </button>
              <button
                onClick={() => handleSocialLogin('Apple')}
                className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-border rounded-lg hover:bg-muted transition-all duration-300"
              >
                <Icon name="DevicePhoneMobileIcon" size={20} variant="outline" />
                <span className="font-body font-medium">Apple</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground font-body">
                  Or continue with email
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-body font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
                    errors.fullName ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-error font-body">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-body font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
                    errors.email ? 'border-error' : 'border-border'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error font-body">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-body font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
                      errors.password ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} variant="outline" />
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-xs font-body">
                      <span className="text-muted-foreground">Password strength:</span>
                      <span className={`font-medium ${passwordStrength < 40 ? 'text-error' : passwordStrength < 70 ? 'text-warning' : 'text-success'}`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="mt-1 text-sm text-error font-body">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-body font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
                      errors.confirmPassword ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} variant="outline" />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error font-body">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleNextStep}
            className="w-full px-6 py-4 bg-gradient-to-r from-brand-coral to-brand-crimson text-white font-cta font-semibold rounded-lg shadow-subtle hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300"
          >
            Continue to Profile Details
          </button>

          <p className="text-center text-sm text-muted-foreground font-body">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-headline font-bold text-primary">Tell Us About Yourself</h2>
            <p className="text-muted-foreground font-body">
              Help us find your perfect match
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-body font-medium text-foreground mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
                  errors.dateOfBirth ? 'border-error' : 'border-border'
                }`}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-error font-body">{errors.dateOfBirth}</p>
              )}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-body font-medium text-foreground mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
                  errors.gender ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-error font-body">{errors.gender}</p>
              )}
            </div>

            <div>
              <label htmlFor="lookingFor" className="block text-sm font-body font-medium text-foreground mb-2">
                Looking For
              </label>
              <select
                id="lookingFor"
                name="lookingFor"
                value={formData.lookingFor}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
                  errors.lookingFor ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Who are you looking for?</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="everyone">Everyone</option>
              </select>
              {errors.lookingFor && (
                <p className="mt-1 text-sm text-error font-body">{errors.lookingFor}</p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-body font-medium text-foreground mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
                  errors.location ? 'border-error' : 'border-border'
                }`}
                placeholder="City, State"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-error font-body">{errors.location}</p>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handlePreviousStep}
              className="flex-1 px-6 py-4 border-2 border-primary text-primary font-cta font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={handleNextStep}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-brand-coral to-brand-crimson text-white font-cta font-semibold rounded-lg shadow-subtle hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-headline font-bold text-primary">Almost There!</h2>
            <p className="text-muted-foreground font-body">
              Review and agree to our terms
            </p>
          </div>

          <div className="space-y-6 bg-muted rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Icon name="ShieldCheckIcon" size={24} variant="solid" className="text-success flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-headline font-semibold text-foreground mb-1">Your Privacy Matters</h3>
                <p className="text-sm text-muted-foreground font-body">
                  We use end-to-end encryption to protect your data and never share your information without consent.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="SparklesIcon" size={24} variant="solid" className="text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-headline font-semibold text-foreground mb-1">AI-Powered Matching</h3>
                <p className="text-sm text-muted-foreground font-body">
                  Our advanced algorithms analyze compatibility factors to suggest meaningful connections.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="HeartIcon" size={24} variant="solid" className="text-brand-coral flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-headline font-semibold text-foreground mb-1">Verified Profiles</h3>
                <p className="text-sm text-muted-foreground font-body">
                  We verify all profiles to ensure authentic connections and a safe dating environment.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 text-primary border-2 border-border rounded focus:ring-2 focus:ring-primary cursor-pointer"
              />
              <label htmlFor="agreeToTerms" className="text-sm font-body text-foreground cursor-pointer">
                I agree to the{' '}
                <a href="/terms" className="text-primary hover:underline font-medium">
                  Terms of Service
                </a>{' '}
                and understand that my profile will be visible to other users
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-error font-body ml-8">{errors.agreeToTerms}</p>
            )}

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeToPrivacy"
                name="agreeToPrivacy"
                checked={formData.agreeToPrivacy}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 text-primary border-2 border-border rounded focus:ring-2 focus:ring-primary cursor-pointer"
              />
              <label htmlFor="agreeToPrivacy" className="text-sm font-body text-foreground cursor-pointer">
                I have read and accept the{' '}
                <a href="/privacy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a>{' '}
                and consent to data processing for matching purposes
              </label>
            </div>
            {errors.agreeToPrivacy && (
              <p className="text-sm text-error font-body ml-8">{errors.agreeToPrivacy}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handlePreviousStep}
              className="flex-1 px-6 py-4 border-2 border-primary text-primary font-cta font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={handleNextStep}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-brand-coral to-brand-crimson text-white font-cta font-semibold rounded-lg shadow-subtle hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300"
            >
              Complete Registration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;