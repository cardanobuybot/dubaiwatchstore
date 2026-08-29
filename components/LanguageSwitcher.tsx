'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const swap = (next: Locale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
      <button
        onClick={() => swap('en')}
        className={locale === 'en' ? 'text-gold' : 'text-white/50 hover:text-white'}
      >
        EN
      </button>
      <span className="text-white/20">/</span>
      <button
        onClick={() => swap('ar')}
        className={locale === 'ar' ? 'text-gold' : 'text-white/50 hover:text-white'}
      >
        AR
      </button>
    </div>
  );
}
