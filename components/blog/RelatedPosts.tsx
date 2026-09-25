import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Post } from '@/lib/blog';

export async function RelatedPosts({
  locale,
  posts,
}: {
  locale: string;
  posts: Post[];
}) {
  if (posts.length === 0) return null;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return (
    <section className="mt-20 border-t border-white/10 pt-10">
      <p className="mb-6 text-xs uppercase tracking-[0.25em] text-gold">
        {t('related')}
      </p>
      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.frontmatter.slug}
            href={`/blog/${p.frontmatter.slug}`}
            className="group block"
          >
            <div className="aspect-[4/3] overflow-hidden border border-white/5 bg-ink-muted">
              <img
                src={p.frontmatter.coverImage}
                alt={p.frontmatter.coverAlt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/40">
              {p.frontmatter.publishedAt}
            </p>
            <h3 className="font-display mt-2 text-lg text-white transition group-hover:text-gold">
              {p.frontmatter.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
