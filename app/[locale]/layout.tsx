import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Dubai Watch Store — Assembled in Dubai, Shipped Worldwide',
  description:
    'A limited trio of Seiko Mod skeleton timepieces inspired by Palm Jumeirah. Japanese TMI movements. Assembled in Dubai. Free worldwide shipping.',
  metadataBase: new URL('https://dubaiwatchstore.ae'),
  openGraph: {
    title: 'Dubai Watch Store',
    description:
      'A limited trio of Seiko Mod skeleton timepieces. Assembled in Dubai.',
    url: 'https://dubaiwatchstore.ae',
    siteName: 'Dubai Watch Store',
    type: 'website',
  },
  verification: {
    google: 'VLFCe_9aYn3PBBDTp8otVOhLO8St893nyIV6yOfaNts',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
