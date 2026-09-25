import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const SITE_URL = 'https://dubaiwatchstore.ae';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isAr = locale === 'ar';

  return {
    title: 'The Palm Collection — Three One-of-One Automatic Watches, Dubai',
    description:
      'Three unique automatic watches with a hand-designed Palm dial. One of each, never repeated. Free worldwide tracked shipping.',
    metadataBase: new URL(SITE_URL),
    // Canonical и hreflang для каждой локали — Google больше не считает
    // en/ar «копиями без выбранного каноникала».
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ar: '/ar',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: 'The Palm Collection — Dubai, on your wrist.',
      description:
        'Three one-of-one automatic watches with a hand-designed Palm dial. Free worldwide tracked shipping.',
      url: `${SITE_URL}/${locale}`,
      siteName: 'The Palm Collection',
      type: 'website',
      locale: isAr ? 'ar_AE' : 'en_AE',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'The Palm Collection — three one-of-one automatic watches with a Palm dial',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Palm Collection',
      description:
        'Three one-of-one automatic watches with a hand-designed Palm dial.',
      images: ['/og.png'],
    },
    verification: {
      google: 'VLFCe_9aYn3PBBDTp8otVOhLO8St893nyIV6yOfaNts',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&family=Amiri:wght@400;700&display=swap"
        />
      </head>
      <body className="bg-ink text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
