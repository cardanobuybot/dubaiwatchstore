import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function Breadcrumbs({
  locale,
  title,
}: {
  locale: string;
  title: string;
}) {
  const t = await getTranslations({ locale, namespace: 'blog' });
  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.25em] text-white/40">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-gold">
            {t('breadcrumbHome')}
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li>
          <Link href="/blog" className="hover:text-gold">
            {t('journal')}
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li className="text-white/70" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}
