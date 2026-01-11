import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import DiscoveryInteractive from './components/DiscoveryInteractive';

export const metadata: Metadata = {
  title: 'Discovery Dashboard - LoveSync AI',
  description: 'Discover compatible matches through AI-powered compatibility analysis. Advanced filtering, personality insights, and intelligent recommendations help you find meaningful connections based on shared interests, values, and life goals.',
};

export default function DiscoveryDashboardPage() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <DiscoveryInteractive />
      </div>
    </>
  );
}