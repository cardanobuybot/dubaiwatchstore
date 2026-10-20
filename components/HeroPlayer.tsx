'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const VIDEO_ID = 'd5Jr9U-BSDw';
const EMBED_URL = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&playsinline=1`;

/**
 * Lite YouTube-плеер в hero. Пока юзер не кликнул — только золотая
 * кнопка «▶ Play». По клику заменяется на iframe с autoplay, прослушивание
 * засчитывается YouTube-счётчиком. Iframe не грузится до клика, поэтому
 * не влияет на LCP/первый paint.
 *
 * Трек: «تحت قمر دبي (Slowed)» — «Under Dubai Moon». Арабское название
 * показываем на обеих локалях (en/ar) — у трека нет английского варианта.
 */
export function HeroPlayer() {
  const t = useTranslations('heroPlayer');
  const [played, setPlayed] = useState(false);

  return (
    <div className="mt-10 max-w-md">
      <div className="rounded-xl border border-gold/30 bg-ink-soft/60 p-3 backdrop-blur-sm">
        <div className="mb-2 flex items-center gap-2 px-1 text-xs">
          <span className="text-gold">♪</span>
          <span className="font-arabic text-white/85">تحت قمر دبي</span>
          <span className="text-white/40">(Slowed)</span>
          <span className="ml-auto text-[10px] uppercase tracking-wider text-white/40">
            {t('onYouTube')}
          </span>
        </div>
        {played ? (
          <iframe
            src={EMBED_URL}
            title="تحت قمر دبي (Slowed) — YouTube"
            allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="aspect-video w-full rounded-lg border-0 bg-black"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlayed(true)}
            aria-label={t('ariaPlay')}
            className="group flex w-full items-center gap-3 rounded-lg border border-gold/20 bg-ink/60 px-4 py-3 text-left text-sm text-white/85 transition hover:border-gold/60 hover:bg-gold/10 active:scale-[0.98]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition group-hover:bg-gold-light">
              ▶
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-white">{t('playLabel')}</span>
              <span className="block truncate text-xs text-white/55">
                تحت قمر دبي · My Sigma Baby
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
