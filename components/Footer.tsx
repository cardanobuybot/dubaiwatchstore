import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-ink-soft py-10">
      <div className="container-x flex flex-col items-center justify-between gap-3 text-xs text-white/40 md:flex-row">
        <p>
          © {year} {t('brand.name')}. {t('footer.rights')}
        </p>
        <p className="max-w-md text-center md:text-right">
          {t('footer.disclaimer')}
        </p>
      </div>
    </footer>
  );
}
