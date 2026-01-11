import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import RegistrationInteractive from './components/RegistrationInteractive';

export const metadata: Metadata = {
  title: 'Registration - LoveSync AI',
  description: 'Create your LoveSync AI account and start your journey to meaningful connections through intelligent AI-powered matching and personality assessment.',
};

export default function RegistrationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <RegistrationInteractive />
      </div>
    </main>
  );
}