'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import PhotoUploadZone from './PhotoUploadZone';
import PersonalityTraitSlider from './PersonalityTraitSlider';
import BioAssistant from './BioAssistant';
import ProfileCompleteness from './ProfileCompleteness';
import PrivacyControls from './PrivacyControls';
import ProfilePreview from './ProfilePreview';

interface Photo {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  optimizationScore: number;
  suggestions: string[];
}

interface PersonalityTrait {
  id: string;
  name: string;
  description: string;
  value: number;
  icon: string;
  compatibilityImpact: 'high' | 'medium' | 'low';
}

interface ProfileSection {
  id: string;
  name: string;
  completed: boolean;
  icon: string;
  points: number;
}

interface PrivacySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
}

const ProfileStudioInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Alex Morgan',
    age: 28,
    location: 'San Francisco, CA',
    bio: '',
    interests: ['Hiking', 'Photography', 'Cooking', 'Travel', 'Music', 'Yoga']
  });

  const [photos, setPhotos] = useState<Photo[]>([
  {
    id: '1',
    url: "https://img.rocket.new/generatedImages/rocket_gen_img_14adda060-1763293938201.png",
    alt: 'Professional portrait of young man with short brown hair in navy blue shirt smiling at camera',
    isPrimary: true,
    optimizationScore: 94,
    suggestions: [
    'Excellent natural lighting and genuine smile',
    'Clear facial features enhance recognition',
    'Professional yet approachable appearance']

  },
  {
    id: '2',
    url: "https://images.unsplash.com/photo-1604857209516-fe60ee97246b",
    alt: 'Casual outdoor photo of man with beard wearing gray hoodie in natural setting',
    isPrimary: false,
    optimizationScore: 87,
    suggestions: [
    'Great casual vibe showing personality',
    'Natural outdoor setting adds authenticity',
    'Consider adding more variety in poses']

  }]
  );

  const [personalityTraits, setPersonalityTraits] = useState<PersonalityTrait[]>([
  {
    id: 'openness',
    name: 'Openness to Experience',
    description: 'Curiosity, creativity, and willingness to try new things',
    value: 75,
    icon: 'SparklesIcon',
    compatibilityImpact: 'high'
  },
  {
    id: 'conscientiousness',
    name: 'Conscientiousness',
    description: 'Organization, reliability, and goal-oriented behavior',
    value: 68,
    icon: 'CheckCircleIcon',
    compatibilityImpact: 'high'
  },
  {
    id: 'extraversion',
    name: 'Extraversion',
    description: 'Social energy, assertiveness, and enthusiasm',
    value: 82,
    icon: 'UserGroupIcon',
    compatibilityImpact: 'medium'
  },
  {
    id: 'agreeableness',
    name: 'Agreeableness',
    description: 'Compassion, cooperation, and trust in others',
    value: 79,
    icon: 'HeartIcon',
    compatibilityImpact: 'high'
  },
  {
    id: 'emotional-stability',
    name: 'Emotional Stability',
    description: 'Calmness, resilience, and emotional regulation',
    value: 71,
    icon: 'ShieldCheckIcon',
    compatibilityImpact: 'medium'
  }]
  );

  const [profileSections, setProfileSections] = useState<ProfileSection[]>([
  { id: 'photos', name: 'Profile Photos', completed: true, icon: 'PhotoIcon', points: 25 },
  { id: 'bio', name: 'About Me Bio', completed: false, icon: 'DocumentTextIcon', points: 20 },
  { id: 'personality', name: 'Personality Traits', completed: true, icon: 'SparklesIcon', points: 20 },
  { id: 'interests', name: 'Interests & Hobbies', completed: true, icon: 'HeartIcon', points: 15 },
  { id: 'preferences', name: 'Match Preferences', completed: false, icon: 'AdjustmentsHorizontalIcon', points: 10 },
  { id: 'verification', name: 'Profile Verification', completed: false, icon: 'ShieldCheckIcon', points: 10 }]
  );

  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
  {
    id: 'profile-visibility',
    name: 'Profile Visibility',
    description: 'Allow your profile to be discovered by potential matches',
    enabled: true,
    icon: 'EyeIcon'
  },
  {
    id: 'location-sharing',
    name: 'Location Sharing',
    description: 'Share your approximate location for distance-based matching',
    enabled: true,
    icon: 'MapPinIcon'
  },
  {
    id: 'online-status',
    name: 'Online Status',
    description: 'Show when you\'re active on the platform',
    enabled: false,
    icon: 'SignalIcon'
  },
  {
    id: 'read-receipts',
    name: 'Read Receipts',
    description: 'Let others know when you\'ve read their messages',
    enabled: true,
    icon: 'CheckBadgeIcon'
  },
  {
    id: 'match-notifications',
    name: 'Match Notifications',
    description: 'Receive notifications for new matches and messages',
    enabled: true,
    icon: 'BellIcon'
  }]
  );

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const updatedSections = profileSections.map((section) => {
        if (section.id === 'photos') {
          return { ...section, completed: photos.length >= 3 };
        }
        if (section.id === 'bio') {
          return { ...section, completed: profileData.bio.length >= 100 };
        }
        return section;
      });
      setProfileSections(updatedSections);
    }
  }, [photos, profileData.bio, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded-lg w-1/3" />
            <div className="h-64 bg-muted rounded-2xl" />
            <div className="h-96 bg-muted rounded-2xl" />
          </div>
        </div>
      </div>);

  }

  const handlePhotosChange = (newPhotos: Photo[]) => {
    setPhotos(newPhotos);
  };

  const handleTraitChange = (traitId: string, value: number) => {
    setPersonalityTraits((prev) =>
    prev.map((trait) =>
    trait.id === traitId ? { ...trait, value } : trait
    )
    );
  };

  const handleBioChange = (bio: string) => {
    setProfileData((prev) => ({ ...prev, bio }));
  };

  const handlePrivacyChange = (settingId: string, enabled: boolean) => {
    setPrivacySettings((prev) =>
    prev.map((setting) =>
    setting.id === settingId ? { ...setting, enabled } : setting
    )
    );
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 2000);
  };

  const totalPoints = profileSections.
  filter((s) => s.completed).
  reduce((sum, s) => sum + s.points, 0);
  const maxPoints = profileSections.reduce((sum, s) => sum + s.points, 0);

  const tabs = [
  { id: 'photos', name: 'Photos', icon: 'PhotoIcon' },
  { id: 'bio', name: 'Bio', icon: 'DocumentTextIcon' },
  { id: 'personality', name: 'Personality', icon: 'SparklesIcon' },
  { id: 'privacy', name: 'Privacy', icon: 'ShieldCheckIcon' }];


  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-headline font-bold text-foreground mb-2">
                Profile Studio
              </h1>
              <p className="text-muted-foreground">
                Craft your perfect profile with AI-powered optimization
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-card border border-border text-foreground rounded-lg font-cta font-semibold hover:bg-muted transition-all duration-300 flex items-center gap-2">

                <Icon name="EyeIcon" size={18} />
                {showPreview ? 'Hide' : 'Preview'}
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-cta font-semibold hover:shadow-elevated hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2">

                {isSaving ?
                <>
                    <Icon name="ArrowPathIcon" size={18} className="animate-spin" />
                    Saving...
                  </> :

                <>
                    <Icon name="CheckIcon" size={18} />
                    Save Profile
                  </>
                }
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex border-b border-border overflow-x-auto">
                {tabs.map((tab) =>
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-cta font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id ?
                  'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`
                  }>

                    <Icon name={tab.icon as any} size={20} />
                    {tab.name}
                  </button>
                )}
              </div>

              <div className="p-6">
                {activeTab === 'photos' &&
                <PhotoUploadZone photos={photos} onPhotosChange={handlePhotosChange} />
                }
                {activeTab === 'bio' &&
                <BioAssistant bio={profileData.bio} onBioChange={handleBioChange} />
                }
                {activeTab === 'personality' &&
                <PersonalityTraitSlider
                  traits={personalityTraits}
                  onTraitChange={handleTraitChange} />

                }
                {activeTab === 'privacy' &&
                <PrivacyControls
                  settings={privacySettings}
                  onSettingChange={handlePrivacyChange} />

                }
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProfileCompleteness
              sections={profileSections}
              totalPoints={totalPoints}
              maxPoints={maxPoints} />


            {showPreview &&
            <div className="animate-fade-in">
                <ProfilePreview
                name={profileData.name}
                age={profileData.age}
                location={profileData.location}
                bio={profileData.bio}
                photos={photos}
                traits={personalityTraits}
                interests={profileData.interests} />

              </div>
            }
          </div>
        </div>
      </div>
    </div>);

};

export default ProfileStudioInteractive;