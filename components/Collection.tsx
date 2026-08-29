import { useTranslations } from 'next-intl';
import { watches } from '@/data/watches';
import { WatchCard } from './WatchCard';

export function Collection() {
  const t = useTranslations('collection');

  return (
    <section id="collection" className="border-t border-white/5 py-24 md:py-32">
      <div className="container-x">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
            01 — {t('title')}
          </p>
          <h2 className="font-display text-4xl text-white md:text-5xl">
            {t('subtitle')}
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {watches.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      </div>
    </section>
  );
}
