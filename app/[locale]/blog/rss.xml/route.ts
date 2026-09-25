import { listPosts, type Locale } from '@/lib/blog';

const SITE_URL = 'https://dubaiwatchstore.ae';

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const loc = (locale === 'ar' ? 'ar' : 'en') as Locale;
  const posts = listPosts(loc);
  const feedUrl = `${SITE_URL}/${loc}/blog/rss.xml`;
  const siteBlogUrl = `${SITE_URL}/${loc}/blog`;
  const title =
    loc === 'ar' ? 'Dubai Watch Store — المدوّنة' : 'Dubai Watch Store — Journal';
  const description =
    loc === 'ar'
      ? 'ملاحظات عن الساعات من دبي.'
      : 'Notes on timepieces from Dubai.';
  const lastBuild = new Date(
    posts[0]?.frontmatter.updatedAt || Date.now(),
  ).toUTCString();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/${loc}/blog/${p.frontmatter.slug}`;
      return `    <item>
      <title>${xmlEscape(p.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.frontmatter.publishedAt).toUTCString()}</pubDate>
      <description>${xmlEscape(p.frontmatter.description)}</description>
      ${p.frontmatter.tags.map((t) => `<category>${xmlEscape(t)}</category>`).join('\n      ')}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(title)}</title>
    <link>${siteBlogUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${xmlEscape(description)}</description>
    <language>${loc === 'ar' ? 'ar-AE' : 'en-AE'}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
