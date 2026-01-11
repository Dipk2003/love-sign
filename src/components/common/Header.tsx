'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'HomeIcon' },
    { name: 'Discovery', path: '/discovery-dashboard', icon: 'SparklesIcon' },
    { name: 'Profile', path: '/profile-studio', icon: 'UserCircleIcon' },
    { name: 'Messages', path: '/messages-center', icon: 'ChatBubbleLeftRightIcon' },
    { name: 'AI Insights', path: '/ai-insights', icon: 'LightBulbIcon' },
  ];

  const isActivePath = (path: string) => pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`bg-card shadow-md fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          <Link href="/homepage" className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="url(#heartGradient)"
                />
                <defs>
                  <linearGradient id="heartGradient" x1="2" y1="12" x2="22" y2="12">
                    <stop offset="0%" stopColor="#ff6b6b" />
                    <stop offset="100%" stopColor="#4ecdc4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-xl font-headline font-bold text-primary hidden sm:block">
              LoveSync AI
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ease-out ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-foreground hover:bg-muted hover:scale-102'
                }`}
              >
                <Icon name={item.icon as any} size={20} variant="outline" />
                <span className="font-body font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/registration"
              className="px-6 py-2.5 bg-gradient-to-r from-brand-coral to-brand-crimson text-white font-cta font-semibold rounded-lg shadow-subtle hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 ease-out animate-pulse-subtle"
            >
              Start Assessment
            </Link>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
              size={24}
              variant="outline"
            />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <nav className="flex flex-col py-4 px-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground shadow-subtle'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} variant="outline" />
                  <span className="font-body font-medium">{item.name}</span>
                </Link>
              ))}
              <Link
                href="/registration"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-brand-coral to-brand-crimson text-white font-cta font-semibold rounded-lg shadow-subtle text-center"
              >
                Start Assessment
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;