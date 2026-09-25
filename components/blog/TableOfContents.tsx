import { getTranslations } from 'next-intl/server';

export async function TableOfContents({
  locale,
  headings,
}: {
  locale: string;
  headings: Array<{ text: string; id: string }>;
}) {
  if (headings.length < 2) return null;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return (
    <aside
      aria-label={t('toc')}
      className="my-10 border-s-2 border-gold/40 ps-6"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-gold">
        {t('toc')}
      </p>
      <ol className="space-y-2 text-sm text-white/70">
        {headings.map((h, i) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="hover:text-gold">
              <span className="text-white/40">{String(i + 1).padStart(2, '0')}.</span>{' '}
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
