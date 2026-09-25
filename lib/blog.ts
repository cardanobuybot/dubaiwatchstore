import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Locale = 'en' | 'ar';

export type FaqItem = { q: string; a: string };

export type PostFrontmatter = {
  title: string;
  seoTitle?: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  lang: Locale;
  relatedWatches?: Array<'black' | 'steel' | 'gold'>;
  faq?: FaqItem[];
  draft?: boolean;
};

export type Post = {
  frontmatter: PostFrontmatter;
  content: string;
  readingMinutes: number;
  headings: Array<{ text: string; id: string }>;
};

const ROOT = path.join(process.cwd(), 'content', 'blog');

// GitHub-style slug: lowercase, non-alphanumeric → -, trim. Matches
// rehype-slug output well enough for our simple H2-only TOC.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Grab H2 headings for TOC (skip inside fenced code blocks).
function extractHeadings(content: string): Array<{ text: string; id: string }> {
  const lines = content.split('\n');
  const headings: Array<{ text: string; id: string }> = [];
  let inFence = false;
  for (const line of lines) {
    if (line.startsWith('```')) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) headings.push({ text: m[1], id: slugify(m[1]) });
  }
  return headings;
}

function dirFor(locale: Locale): string {
  return path.join(ROOT, locale);
}

// HTML comments are used in posts as author-only notes (e.g. `<!-- VERIFY -->`).
// react-markdown without rehype-raw escapes them into visible text, so we
// strip them here before parsing. Multi-line comments are covered too.
function stripHtmlComments(md: string): string {
  return md.replace(/<!--[\s\S]*?-->/g, '');
}

function readMdx(locale: Locale, slug: string): Post | null {
  const file = path.join(dirFor(locale), `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content: rawContent } = matter(raw);
  const content = stripHtmlComments(rawContent);
  const frontmatter = { ...data, slug, lang: locale } as PostFrontmatter;
  return {
    frontmatter,
    content,
    readingMinutes: readingTime(content),
    headings: extractHeadings(content),
  };
}

export function listPosts(locale: Locale, includeDrafts = false): Post[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const posts = files
    .map((f) => readMdx(locale, f.replace(/\.md$/, '')))
    .filter((p): p is Post => p !== null)
    .filter((p) => includeDrafts || !p.frontmatter.draft)
    .sort((a, b) =>
      b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt),
    );
  return posts;
}

export function getPost(locale: Locale, slug: string): Post | null {
  const p = readMdx(locale, slug);
  if (!p) return null;
  if (p.frontmatter.draft) return null;
  return p;
}

// Alternate exists when a published (non-draft) MDX with same slug is present
// under the other locale. Drives hreflang alternates.
export function hasTranslation(otherLocale: Locale, slug: string): boolean {
  const p = readMdx(otherLocale, slug);
  return !!p && !p.frontmatter.draft;
}

export function relatedPosts(locale: Locale, current: Post, limit = 3): Post[] {
  const all = listPosts(locale);
  const tags = new Set(current.frontmatter.tags);
  const scored = all
    .filter((p) => p.frontmatter.slug !== current.frontmatter.slug)
    .map((p) => {
      const overlap = p.frontmatter.tags.filter((t) => tags.has(t)).length;
      return { post: p, overlap };
    })
    .filter((x) => x.overlap > 0)
    .sort((a, b) =>
      b.overlap - a.overlap ||
      b.post.frontmatter.publishedAt.localeCompare(a.post.frontmatter.publishedAt),
    );
  return scored.slice(0, limit).map((x) => x.post);
}

export function allSlugsForStaticParams(): Array<{ locale: Locale; slug: string }> {
  const out: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of ['en', 'ar'] as const) {
    for (const p of listPosts(locale)) {
      out.push({ locale, slug: p.frontmatter.slug });
    }
  }
  return out;
}
