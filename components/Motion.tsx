import { useTranslations } from 'next-intl';

const clips = ['/motion-1.mp4', '/motion-2.mp4', '/motion-3.mp4'];

export function Motion() {
  const t = useTranslations('motion');

  return (
    <section id="motion" className="border-t border-white/5 py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
            02 — {t('eyebrow')}
          </p>
          <h2 className="font-display text-4xl text-white md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-sm text-white/50">{t('subtitle')}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {clips.map((src) => (
            <div
              key={src}
              className="relative aspect-video overflow-hidden border border-white/5 bg-ink-muted"
            >
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
