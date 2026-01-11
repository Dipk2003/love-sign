import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import MessagesCenterInteractive from './components/MessagesCenterInteractive';

export const metadata: Metadata = {
  title: 'Messages Center - LoveSync AI',
  description: 'Smart messaging hub with AI-powered conversation starters, compatibility insights, and relationship milestone tracking for meaningful connections.',
};

export default function MessagesCenterPage() {
  return (
    <>
      <Header />
      <MessagesCenterInteractive />
    </>
  );
}