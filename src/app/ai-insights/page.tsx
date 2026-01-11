import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AIInsightsInteractive from './components/AIInsightsInteractive';

export const metadata: Metadata = {
  title: 'AI Insights - LoveSync AI',
  description: 'Access your personal relationship analytics dashboard with AI-powered dating pattern analysis, compatibility insights, and personalized improvement recommendations to enhance your dating success.',
};

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AIInsightsInteractive />
        </div>
      </main>
      
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LoveSync AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}