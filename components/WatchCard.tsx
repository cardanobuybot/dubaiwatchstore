import { useTranslations } from 'next-intl';
import type { Watch } from '@/data/watches';
import { whatsappLink } from '@/lib/contact';

export function WatchCard({ watch }: { watch: Watch }) {
  const t = useTranslations();
  const brand = t(`watches.${watch.id}.brand`);
  const model = t(`watches.${watch.id}.model`);
  const reference = t(`watches.${watch.id}.reference`);
  const year = t(`watches.${watch.id}.year`);
  const condition = t(`watches.${watch.id}.condition`);
  const description = t(`watches.${watch.id}.description`);

  const msg = `Hi, I'm interested in the ${brand} ${model} (${reference}).`;

  return (
    <article className="group flex flex-col border border-white/5 bg-ink-soft transition hover:border-gold/40">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-muted">
        <img
          src={watch.image}
          alt={`${brand} ${model}`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">{brand}</p>
        <h3 className="font-display mt-2 text-2xl text-white">{model}</h3>

        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 text-xs">
          <div>
            <dt className="uppercase tracking-widest text-white/40">
              {t('collection.reference')}
            </dt>
            <dd className="mt-1 text-white/80">{reference}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-white/40">
              {t('collection.year')}
            </dt>
            <dd className="mt-1 text-white/80">{year}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-white/40">
              {t('collection.condition')}
            </dt>
            <dd className="mt-1 text-white/80">{condition}</dd>
          </div>
        </dl>

        <p className="mt-6 flex-1 text-sm leading-relaxed text-white/60">
          {description}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
          <span className="text-xs uppercase tracking-widest text-white/50">
            {t('collection.priceLabel')}
          </span>
          <a
            href={whatsappLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-gold hover:text-gold-light"
          >
            {t('collection.inquire')} →
          </a>
        </div>
      </div>
    </article>
  );
}
