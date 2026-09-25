import { getTranslations } from 'next-intl/server';
import { watches } from '@/data/watches';
import { CONTACT } from '@/lib/contact';

const SITE_URL = 'https://dubaiwatchstore.ae';
const PRICE_AED = 5500;

/**
 * Structured data (schema.org) — Organization + one Product per watch.
 *
 * Emits a single <script type="application/ld+json"> containing a
 * @graph of all entities so Google can parse them in one pass and
 * cross-link Product.brand back to the Organization.
 *
 * Only rendered on the homepage (see app/[locale]/page.tsx). Blog
 * posts and other routes get their own metadata via generateMetadata.
 */
export async function HomeJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'watches' });

  const orgId = `${SITE_URL}#organization`;

  const products = watches.map((w) => ({
    '@type': 'Product',
    '@id': `${SITE_URL}/${locale}#${w.id}`,
    sku: t(`${w.id}.reference`),
    name: `${t(`${w.id}.brand`)} ${t(`${w.id}.model`)}`,
    description: t(`${w.id}.description`),
    image: `${SITE_URL}${w.image}`,
    brand: { '@id': orgId },
    productionDate: String(t(`${w.id}.year`)),
    itemCondition: 'https://schema.org/NewCondition',
    releaseDate: '2025',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AED',
      price: PRICE_AED,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      areaServed: { '@type': 'Place', name: 'Worldwide' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: 'AED',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          name: 'Worldwide',
        },
      },
      seller: { '@id': orgId },
      url: `${SITE_URL}/${locale}#${w.id}`,
    },
  }));

  const graph = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: 'Dubai Watch Store',
      url: SITE_URL,
      logo: `${SITE_URL}/apple-icon.png`,
      description:
        'Private UAE-based seller of the Dubai Series — a trio of Seiko Mod skeleton timepieces assembled in Dubai.',
      email: CONTACT.email,
      sameAs: [
        `https://www.instagram.com/${CONTACT.instagram}`,
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: `+${CONTACT.whatsapp}`,
          areaServed: 'Worldwide',
          availableLanguage: ['English', 'Arabic'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: 'Dubai Watch Store',
      inLanguage: locale === 'ar' ? 'ar-AE' : 'en-AE',
      publisher: { '@id': orgId },
    },
    ...products,
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph,
        }),
      }}
    />
  );
}
