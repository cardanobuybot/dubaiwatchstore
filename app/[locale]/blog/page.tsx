import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link, type Locale } from '@/i18n/routing';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { listPosts } from '@/lib/blog';

const SITE_URL = 'https://dubaiwatchstore.ae';
const PAGE_SIZE = 12;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: `${t('title')} — Dubai Watch Store`,
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { en: '/en/blog', ar: '/ar/blog', 'x-default': '/en/blog' },
    },
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      url: `${SITE_URL}/${locale}/blog`,
      type: 'website',
    },
  };
}

export default async function BlogIndex({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const loc = locale as Locale;

  const posts = listPosts(loc);
  const page = Math.max(1, Number(pageParam) || 1);
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const current = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <section className="pb-24 pt-32 md:pt-40">
        <div className="container-x">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
            {t('journal')}
          </p>
          <h1 className="font-display max-w-2xl text-4xl leading-tight text-white md:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-xl text-white/60">{t('subtitle')}</p>

          {current.length === 0 ? (
            <p className="mt-20 text-white/40">{t('empty')}</p>
          ) : (
            <ul className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {current.map((post) => (
                <li key={post.frontmatter.slug}>
                  <Link
                    href={`/blog/${post.frontmatter.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[4/3] overflow-hidden border border-white/5 bg-ink-muted">
                      <img
                        src={post.frontmatter.coverImage}
                        alt={post.frontmatter.coverAlt}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/40">
                      {post.frontmatter.publishedAt}
                    </p>
                    <h2 className="font-display mt-2 text-xl text-white transition group-hover:text-gold md:text-2xl">
                      {post.frontmatter.title}
                    </h2>
                    <p className="mt-2 text-sm text-white/60">
                      {post.frontmatter.description}
                    </p>
                    <span className="mt-3 inline-block text-xs uppercase tracking-[0.25em] text-gold">
                      {t('readMore')} →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-16 flex items-center justify-between border-t border-white/5 pt-6 text-xs uppercase tracking-[0.25em]"
            >
              {page > 1 ? (
                <Link
                  href={`/blog${page - 1 > 1 ? `?page=${page - 1}` : ''}`}
                  className="text-gold hover:text-white"
                >
                  ← {t('prev')}
                </Link>
              ) : (
                <span className="text-white/20">← {t('prev')}</span>
              )}
              <span className="text-white/40">
                {page} / {totalPages}
              </span>
              {page < totalPages ? (
                <Link
                  href={`/blog?page=${page + 1}`}
                  className="text-gold hover:text-white"
                >
                  {t('next')} →
                </Link>
              ) : (
                <span className="text-white/20">{t('next')} →</span>
              )}
            </nav>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
