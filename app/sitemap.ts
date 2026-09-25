import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { listPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://dubaiwatchstore.ae';
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    });
    entries.push({
      url: `${base}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
    for (const post of listPosts(locale)) {
      entries.push({
        url: `${base}/${locale}/blog/${post.frontmatter.slug}`,
        lastModified: new Date(post.frontmatter.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
