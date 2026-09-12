import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Collection } from '@/components/Collection';
import { About } from '@/components/About';
import { Policy } from '@/components/Policy';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <Hero />
      <Collection />
      <About />
      <Policy />
      <Contact />
      <Footer />
    </main>
  );
}
