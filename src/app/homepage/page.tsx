import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'LoveSync AI - Where AI Meets Authentic Love | Science-Backed Dating',
  description: 'Experience the evolution of digital romance with LoveSync AI. Our advanced AI analyzes 150+ compatibility factors to connect you with meaningful relationships. Join 50,000+ singles finding love through intelligent matching.',
};

export default function Homepage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HomepageInteractive />
      </main>
    </div>
  );
}