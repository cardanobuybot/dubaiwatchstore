import { useTranslations } from 'next-intl';

export function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="border-t border-white/5 bg-ink-soft py-24 md:py-32">
      <div className="container-x grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
            03 — Dubai
          </p>
          <h2 className="font-display text-4xl text-white md:text-5xl">
            {t('title')}
          </h2>
        </div>
        <div className="md:col-span-3">
          <p className="text-lg leading-relaxed text-white/70">{t('body')}</p>
        </div>
      </div>
    </section>
  );
}
