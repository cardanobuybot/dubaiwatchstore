import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { posts } from '@/content/blog/posts';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <BlogList />
      <Footer />
    </main>
  );
}

function BlogList() {
  const t = useTranslations('blog');
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="pb-24 pt-32 md:pt-40">
      <div className="container-x">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
          {t('journal')}
        </p>
        <h1 className="font-display max-w-2xl text-4xl leading-tight text-white md:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-6 max-w-xl text-white/60">{t('subtitle')}</p>

        {sorted.length === 0 ? (
          <p className="mt-20 text-white/40">{t('empty')}</p>
        ) : (
          <ul className="mt-20 divide-y divide-white/5 border-t border-white/5">
            {sorted.map((post) => (
              <li key={post.slug} className="py-10">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                    {post.date}
                  </p>
                  <h2 className="font-display mt-3 text-2xl text-white transition group-hover:text-gold md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-white/60">{post.excerpt}</p>
                  <span className="mt-4 inline-block text-xs uppercase tracking-[0.25em] text-gold">
                    {t('readMore')} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
