import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />

      <div className="container-x relative z-10">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">
          {t('eyebrow')}
        </p>
        <h1 className="font-display max-w-3xl text-5xl leading-[1.05] text-white md:text-7xl">
          {t('title')}
        </h1>
        <p className="mt-8 max-w-xl text-lg text-white/70">{t('subtitle')}</p>
        <a href="#collection" className="btn-gold mt-12">
          {t('cta')}
        </a>
      </div>
    </section>
  );
}
