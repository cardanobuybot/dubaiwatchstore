import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Collection } from '@/components/Collection';
import { Dial } from '@/components/Dial';
import { Motion } from '@/components/Motion';
import { About } from '@/components/About';
import { Policy } from '@/components/Policy';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { HomeJsonLd } from '@/components/JsonLd';

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
      <Dial />
      <Motion />
      <About />
      <Policy />
      <Contact />
      <Footer />
      {/* Structured data: Organization + WebSite + 3 Products (DXB-01/02/03).
          Enables Google Rich Results (price, availability) and gives AI
          crawlers a canonical view of the inventory. */}
      <HomeJsonLd locale={locale} />
    </main>
  );
}
