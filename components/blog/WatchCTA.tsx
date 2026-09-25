import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

type Variant = 'black' | 'steel' | 'gold';

const VARIANT_TO_ID: Record<Variant, 'w1' | 'w2' | 'w3'> = {
  black: 'w1',
  steel: 'w2',
  gold: 'w3',
};

const VARIANT_TO_IMG: Record<Variant, string> = {
  black: '/watch-black.png',
  steel: '/watch-silver.png',
  gold: '/watch-rose.png',
};

export async function WatchCTA({
  locale,
  variant = 'black',
}: {
  locale: string;
  variant?: Variant;
}) {
  const id = VARIANT_TO_ID[variant];
  const [tw, tc] = await Promise.all([
    getTranslations({ locale, namespace: `watches.${id}` }),
    getTranslations({ locale, namespace: 'collection' }),
  ]);
  const brand = tw('brand');
  const model = tw('model');
  return (
    <aside className="my-12 flex flex-col gap-6 border border-gold/30 bg-ink-soft p-5 md:flex-row md:items-center">
      <div className="aspect-square w-full shrink-0 overflow-hidden bg-ink-muted md:w-32">
        <img
          src={VARIANT_TO_IMG[variant]}
          alt={`${brand} · ${model}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">
          The Palm Collection · {tc('limitedBadge')}
        </p>
        <h3 className="font-display mt-2 text-xl text-white">
          {brand} · {model}
        </h3>
        <p className="mt-2 text-sm text-white/60">
          {tc('price')} <span className="text-white/40">· {tc('priceUsd')}</span>
        </p>
      </div>
      <Link
        href="/#collection"
        className="btn-gold shrink-0 whitespace-nowrap self-start md:self-center"
      >
        {tc('inquire')}
      </Link>
    </aside>
  );
}
