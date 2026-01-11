import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProfileStudioInteractive from './components/ProfileStudioInteractive';

export const metadata: Metadata = {
  title: 'Profile Studio - LoveSync AI',
  description: 'Create and optimize your dating profile with AI-powered suggestions, photo optimization, personality insights, and compatibility scoring for better matches.',
};

export default function ProfileStudioPage() {
  return (
    <>
      <Header />
      <ProfileStudioInteractive />
    </>
  );
}