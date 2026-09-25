import { useTranslations } from 'next-intl';

export function Policy() {
  const t = useTranslations('policy');

  const items = [
    { title: t('b1Title'), body: t('b1Body') },
    { title: t('b2Title'), body: t('b2Body') },
    { title: t('b3Title'), body: t('b3Body') },
    { title: t('b4Title'), body: t('b4Body') },
  ];

  return (
    <section id="terms" className="border-t border-white/5 bg-ink-soft py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
            05 — {t('title')}
          </p>
          <h2 className="font-display text-4xl text-white md:text-5xl">
            {t('subtitle')}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="border-t border-white/10 pt-6">
              <h3 className="font-display text-xl text-gold">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
