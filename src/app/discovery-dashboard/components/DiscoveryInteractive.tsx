'use client';

import React, { useState, useEffect } from 'react';
import MatchCard from './MatchCard';
import CompatibilityBreakdown from './CompatibilityBreakdown';
import FilterSidebar from './FilterSidebar';
import SearchBar from './SearchBar';
import StatsBar from './StatsBar';
import EmptyState from './EmptyState';
import LoadingSkeleton from './LoadingSkeleton';

interface Match {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  alt: string;
  compatibility: number;
  bio: string;
  interests: string[];
  distance: string;
  lastActive: string;
  verified: boolean;
}

interface CompatibilityFactor {
  category: string;
  score: number;
  icon: string;
  description: string;
}

interface FilterOptions {
  ageRange: [number, number];
  distance: number;
  interests: string[];
  relationshipGoal: string;
  education: string;
  lifestyle: string[];
}

const DiscoveryInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    ageRange: [22, 45],
    distance: 50,
    interests: [],
    relationshipGoal: '',
    education: '',
    lifestyle: []
  });

  const mockMatches: Match[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    age: 28,
    location: 'San Francisco, CA',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fb6cf439-1763299224286.png",
    alt: 'Professional woman with long brown hair wearing white blouse smiling at camera in bright office setting',
    compatibility: 94,
    bio: 'Tech entrepreneur passionate about AI and sustainable living. Love hiking, trying new restaurants, and deep conversations about the future of technology.',
    interests: ['Technology', 'Travel', 'Fitness', 'Cooking', 'Yoga'],
    distance: '3.2 miles away',
    lastActive: '2 hours ago',
    verified: true
  },
  {
    id: 2,
    name: 'Emily Rodriguez',
    age: 26,
    location: 'Oakland, CA',
    image: "https://images.unsplash.com/photo-1497618538038-925a43c42e65",
    alt: 'Young woman with dark hair in casual denim jacket smiling outdoors with natural lighting',
    compatibility: 89,
    bio: 'Marketing professional who loves art galleries, indie music, and weekend adventures. Looking for someone who appreciates spontaneity and creativity.',
    interests: ['Art', 'Music', 'Photography', 'Travel', 'Dancing'],
    distance: '5.8 miles away',
    lastActive: '1 hour ago',
    verified: true
  },
  {
    id: 3,
    name: 'Jessica Chen',
    age: 30,
    location: 'Berkeley, CA',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14c8876fb-1763294869805.png",
    alt: 'Asian woman with shoulder-length black hair wearing red sweater smiling warmly in urban setting',
    compatibility: 87,
    bio: 'Data scientist by day, foodie by night. Passionate about machine learning, cooking international cuisines, and exploring hidden gems in the Bay Area.',
    interests: ['Technology', 'Cooking', 'Travel', 'Reading', 'Fitness'],
    distance: '7.1 miles away',
    lastActive: '30 minutes ago',
    verified: false
  },
  {
    id: 4,
    name: 'Amanda Thompson',
    age: 27,
    location: 'San Jose, CA',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18d07eb19-1763299289544.png",
    alt: 'Blonde woman in navy blue blazer with professional appearance smiling confidently in modern office',
    compatibility: 85,
    bio: 'Fitness instructor and wellness coach. Believe in living life to the fullest through health, adventure, and meaningful connections.',
    interests: ['Fitness', 'Yoga', 'Travel', 'Photography', 'Music'],
    distance: '12.4 miles away',
    lastActive: '4 hours ago',
    verified: true
  },
  {
    id: 5,
    name: 'Rachel Kim',
    age: 29,
    location: 'Palo Alto, CA',
    image: "https://images.unsplash.com/photo-1597094622619-5c94ac083578",
    alt: 'Woman with long dark hair wearing casual white top smiling naturally in outdoor park setting',
    compatibility: 83,
    bio: 'Product designer creating beautiful digital experiences. Love coffee shops, design thinking workshops, and weekend road trips along the coast.',
    interests: ['Art', 'Technology', 'Travel', 'Photography', 'Reading'],
    distance: '9.6 miles away',
    lastActive: '1 day ago',
    verified: true
  },
  {
    id: 6,
    name: 'Olivia Martinez',
    age: 25,
    location: 'Mountain View, CA',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b10ab58a-1763294942516.png",
    alt: 'Young Hispanic woman with wavy brown hair in casual attire smiling brightly in sunny outdoor location',
    compatibility: 81,
    bio: 'Software engineer who codes by day and paints by night. Seeking someone who appreciates both logic and creativity in equal measure.',
    interests: ['Technology', 'Art', 'Gaming', 'Music', 'Cooking'],
    distance: '15.2 miles away',
    lastActive: '3 hours ago',
    verified: false
  }];


  const compatibilityFactors: CompatibilityFactor[] = [
  {
    category: 'Personality Traits',
    score: 92,
    icon: 'UserCircleIcon',
    description: 'Both introverted with high openness to experience'
  },
  {
    category: 'Life Goals',
    score: 88,
    icon: 'TrophyIcon',
    description: 'Aligned career ambitions and family planning timeline'
  },
  {
    category: 'Communication Style',
    score: 95,
    icon: 'ChatBubbleLeftRightIcon',
    description: 'Similar preferences for deep, meaningful conversations'
  },
  {
    category: 'Interests & Hobbies',
    score: 86,
    icon: 'SparklesIcon',
    description: 'Strong overlap in technology, travel, and fitness activities'
  },
  {
    category: 'Values & Beliefs',
    score: 90,
    icon: 'HeartIcon',
    description: 'Shared perspectives on relationships and personal growth'
  },
  {
    category: 'Lifestyle Compatibility',
    score: 84,
    icon: 'HomeIcon',
    description: 'Compatible daily routines and social preferences'
  }];


  useEffect(() => {
    setIsHydrated(true);
    setTimeout(() => {
      setMatches(mockMatches);
      setFilteredMatches(mockMatches);
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let filtered = [...matches];

    if (searchQuery) {
      filtered = filtered.filter(
        (match) =>
        match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.interests.some((interest) =>
        interest.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        match.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (match) =>
      match.age >= filters.ageRange[0] && match.age <= filters.ageRange[1]
    );

    if (filters.interests.length > 0) {
      filtered = filtered.filter((match) =>
      filters.interests.some((interest) => match.interests.includes(interest))
      );
    }

    setFilteredMatches(filtered);
  }, [searchQuery, filters, matches, isHydrated]);

  const handleLike = (id: number) => {
    if (!isHydrated) return;
    console.log('Liked match:', id);
  };

  const handlePass = (id: number) => {
    if (!isHydrated) return;
    setFilteredMatches(filteredMatches.filter((match) => match.id !== id));
  };

  const handleViewProfile = (id: number) => {
    if (!isHydrated) return;
    setSelectedMatch(id);
  };

  const handleResetFilters = () => {
    if (!isHydrated) return;
    setFilters({
      ageRange: [22, 45],
      distance: 50,
      interests: [],
      relationshipGoal: '',
      education: '',
      lifestyle: []
    });
    setSearchQuery('');
    setFilteredMatches(matches);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <div className="hidden lg:block w-80 flex-shrink-0" />
          <main className="flex-1 p-6">
            <LoadingSkeleton />
          </main>
        </div>
      </div>);

  }

  const selectedMatchData = matches.find((m) => m.id === selectedMatch);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)} />


        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-headline font-bold text-foreground mb-2">
                Discover Your Match
              </h1>
              <p className="text-muted-foreground">
                AI-powered compatibility matching based on personality, interests, and life goals
              </p>
            </div>

            <StatsBar totalMatches={156} newMatches={12} activeChats={8} />

            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onFilterToggle={() => setIsFilterOpen(true)} />


            {isLoading ?
            <LoadingSkeleton /> :
            filteredMatches.length === 0 ?
            <EmptyState onResetFilters={handleResetFilters} /> :

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMatches.map((match) =>
              <MatchCard
                key={match.id}
                match={match}
                onLike={handleLike}
                onPass={handlePass}
                onViewProfile={handleViewProfile} />

              )}
              </div>
            }
          </div>
        </main>
      </div>

      {selectedMatch && selectedMatchData &&
      <CompatibilityBreakdown
        matchId={selectedMatch}
        matchName={selectedMatchData.name}
        overallScore={selectedMatchData.compatibility}
        factors={compatibilityFactors}
        onClose={() => setSelectedMatch(null)} />

      }
    </div>);

};

export default DiscoveryInteractive;