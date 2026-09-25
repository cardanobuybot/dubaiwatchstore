import { getTranslations } from 'next-intl/server';

export async function AuthorBox({
  locale,
  author,
}: {
  locale: string;
  author: string;
}) {
  const t = await getTranslations({ locale, namespace: 'blog' });
  return (
    <aside className="mt-16 border-t border-white/10 pt-8">
      <p className="text-xs uppercase tracking-[0.25em] text-gold">
        {t('authorLabel')}
      </p>
      <p className="mt-3 text-white/70">
        {t('authorBio', { author })}
      </p>
    </aside>
  );
}
