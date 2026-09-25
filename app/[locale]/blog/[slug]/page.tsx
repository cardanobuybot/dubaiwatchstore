import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { type Locale } from '@/i18n/routing';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { AuthorBox } from '@/components/blog/AuthorBox';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { WatchCTA } from '@/components/blog/WatchCTA';
import { WatchCTAAll } from '@/components/blog/WatchCTAAll';
import { BlogJsonLd } from '@/components/blog/BlogJsonLd';
import { PostBody } from '@/components/blog/PostBody';
import {
  allSlugsForStaticParams,
  getPost,
  hasTranslation,
  relatedPosts,
  slugify,
} from '@/lib/blog';

const SITE_URL = 'https://dubaiwatchstore.ae';

export function generateStaticParams() {
  return allSlugsForStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale as Locale, slug);
  if (!post) return {};
  const fm = post.frontmatter;
  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  const otherLocale: Locale = locale === 'ar' ? 'en' : 'ar';
  const hasOther = hasTranslation(otherLocale, slug);

  const languages: Record<string, string> = {
    [locale]: `/${locale}/blog/${slug}`,
  };
  if (hasOther) {
    languages[otherLocale] = `/${otherLocale}/blog/${slug}`;
    languages['x-default'] = `/en/blog/${slug}`;
  }

  return {
    title: fm.seoTitle || fm.title,
    description: fm.description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages,
    },
    openGraph: {
      title: fm.title,
      description: fm.description,
      url,
      type: 'article',
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt,
      authors: [fm.author],
      tags: fm.tags,
      images: [{ url: fm.coverImage, alt: fm.coverAlt }],
      locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
    },
    twitter: {
      card: 'summary_large_image',
      title: fm.title,
      description: fm.description,
      images: [fm.coverImage],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(locale as Locale, slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });
  const fm = post.frontmatter;
  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  const related = relatedPosts(locale as Locale, post, 3);
  // Pre-render each WatchCTA server-side so the client PostBody just
  // slots the finished element in when it finds a [[watch-cta:X]] line.
  const watchCtas = {
    black: <WatchCTA locale={locale} variant="black" />,
    steel: <WatchCTA locale={locale} variant="steel" />,
    gold: <WatchCTA locale={locale} variant="gold" />,
  };

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <article className="pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-2xl px-6">
          <Breadcrumbs locale={locale} title={fm.title} />

          <h1 className="font-display mt-8 text-4xl leading-tight text-white md:text-5xl">
            {fm.title}
          </h1>

          <p className="mt-6 text-lg text-white/70">{fm.description}</p>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-white/40">
            <time dateTime={fm.updatedAt}>
              {t('updatedOn', { date: fm.updatedAt })}
            </time>
            <span aria-hidden="true"> · </span>
            {t('readingTime', { minutes: post.readingMinutes })}
          </p>

          <figure className="mt-10">
            <img
              src={fm.coverImage}
              alt={fm.coverAlt}
              width={1200}
              height={800}
              className="w-full border border-white/5"
              loading="eager"
              decoding="async"
            />
          </figure>

          <TableOfContents locale={locale} headings={post.headings} />

          <div className="prose-invert">
            <PostBody content={post.content} watchCtas={watchCtas} />
          </div>

          {fm.faq && fm.faq.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-10">
              <p className="mb-6 text-xs uppercase tracking-[0.25em] text-gold">
                {t('faq')}
              </p>
              <dl className="space-y-6">
                {fm.faq.map((item) => (
                  <div key={item.q} id={slugify(item.q)} className="scroll-mt-24">
                    <dt className="font-display text-xl text-white">
                      {item.q}
                    </dt>
                    <dd className="mt-2 text-white/70">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <WatchCTAAll locale={locale} />
          <RelatedPosts locale={locale} posts={related} />
          <AuthorBox locale={locale} author={fm.author} />
        </div>
      </article>
      <BlogJsonLd frontmatter={fm} locale={locale} url={url} />
      <Footer />
    </main>
  );
}
