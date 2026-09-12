import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const t = useTranslations();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-ink/70 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-white hover:text-gold"
        >
          {t('brand.name')}
        </Link>

        <nav className="hidden items-center gap-8 text-xs uppercase tracking-widest text-white/60 md:flex">
          <Link href="/#collection" className="hover:text-gold">
            {t('nav.collection')}
          </Link>
          <Link href="/#about" className="hover:text-gold">
            {t('nav.about')}
          </Link>
          <Link href="/blog" className="hover:text-gold">
            {t('nav.blog')}
          </Link>
          <Link href="/#contact" className="hover:text-gold">
            {t('nav.contact')}
          </Link>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
