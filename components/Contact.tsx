import { useTranslations } from 'next-intl';
import { CONTACT, whatsappLink } from '@/lib/contact';

export function Contact() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="border-t border-white/5 py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
            06 — Contact
          </p>
          <h2 className="font-display text-4xl text-white md:text-6xl">
            {t('title')}
          </h2>
          <p className="mt-6 text-white/60">{t('subtitle')}</p>

          <div className="mt-12 flex flex-col items-center gap-4">
            <a
              href={whatsappLink("Hi, I'd like to reserve one of The Palm Collection (1 of 1).")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full sm:w-auto"
            >
              {t('whatsapp')}
            </a>
            <a
              href={CONTACT.revolut}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.25em] text-white/50 hover:text-gold"
            >
              {t('orPay')} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
