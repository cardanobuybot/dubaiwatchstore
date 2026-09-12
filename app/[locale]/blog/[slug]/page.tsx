import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Dubai Watch Store`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
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

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <Article post={post} />
      <Footer />
    </main>
  );
}

function Article({ post }: { post: NonNullable<ReturnType<typeof getPost>> }) {
  const t = useTranslations('blog');

  return (
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
          {post.title}
        </h1>
        <div className="mt-10 space-y-6">
          <Markdown>{post.body}</Markdown>
        </div>
      </div>
    </article>
  );
}
