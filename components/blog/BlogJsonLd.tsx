import type { PostFrontmatter } from '@/lib/blog';

const SITE_URL = 'https://dubaiwatchstore.ae';

export function BlogJsonLd({
  frontmatter,
  locale,
  url,
}: {
  frontmatter: PostFrontmatter;
  locale: string;
  url: string;
}) {
  const orgId = `${SITE_URL}#organization`;
  const image = `${SITE_URL}${frontmatter.coverImage}`;

  const blogPosting = {
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: frontmatter.title,
    description: frontmatter.description,
    image,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt,
    author: { '@type': 'Person', name: frontmatter.author },
    publisher: { '@id': orgId },
    inLanguage: locale === 'ar' ? 'ar-AE' : 'en-AE',
    keywords: frontmatter.tags.join(', '),
  };

  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE_URL}/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: frontmatter.title, item: url },
    ],
  };

  const graph: unknown[] = [blogPosting, breadcrumbs];

  if (frontmatter.faq && frontmatter.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: frontmatter.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  );
}
