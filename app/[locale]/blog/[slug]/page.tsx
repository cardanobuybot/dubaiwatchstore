import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, type Locale } from '@/i18n/routing';
import { posts, getPost } from '@/content/blog/posts';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Markdown } from '@/components/Markdown';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const loc = locale as Locale;
  return {
    title: `${post.title[loc]} — Dubai Watch Store`,
    description: post.excerpt[loc],
    openGraph: {
      title: post.title[loc],
      description: post.excerpt[loc],
      type: 'article',
      publishedTime: post.date,
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
  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const loc = locale as Locale;

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <article className="pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-2xl px-6">
          <Link
            href="/blog"
            className="text-xs uppercase tracking-[0.25em] text-white/50 hover:text-gold"
          >
            ← {t('back')}
          </Link>
          <p className="mt-10 text-xs uppercase tracking-[0.3em] text-gold">
            {post.date}
          </p>
          <h1 className="font-display mt-3 text-4xl leading-tight text-white md:text-5xl">
            {post.title[loc]}
          </h1>
          <div className="mt-10 space-y-6">
            <Markdown>{post.body[loc]}</Markdown>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
