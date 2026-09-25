import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const ITEMS: Array<{ id: 'w1' | 'w2' | 'w3'; img: string }> = [
  { id: 'w1', img: '/watch-black.png' },
  { id: 'w2', img: '/watch-silver.png' },
  { id: 'w3', img: '/watch-rose.png' },
];

export async function WatchCTAAll({ locale }: { locale: string }) {
  const tc = await getTranslations({ locale, namespace: 'collection' });
  const cards = await Promise.all(
    ITEMS.map(async (it) => {
      const t = await getTranslations({ locale, namespace: `watches.${it.id}` });
      return {
        ...it,
        brand: t('brand'),
        model: t('model'),
        tagline: t('tagline'),
      };
    }),
  );

  return (
    <section className="mt-20 border-t border-white/10 pt-10">
      <p className="mb-6 text-xs uppercase tracking-[0.25em] text-gold">
        The Palm Collection · {tc('limitedBadge')}
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.id}
            href="/#collection"
            className="group flex flex-col border border-white/5 bg-ink-soft p-4 transition hover:border-gold/40"
          >
            <div className="aspect-[4/5] overflow-hidden bg-ink-muted">
              <img
                src={c.img}
                alt={`${c.brand} · ${c.model}`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-gold">
              {c.brand}
            </p>
            <h3 className="font-display mt-1 text-lg text-white">{c.model}</h3>
            <p className="mt-1 text-sm italic text-white/60">{c.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
