'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/#collection', label: t('nav.collection') },
    { href: '/#about', label: t('nav.about') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/#contact', label: t('nav.contact') },
  ];

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-white hover:text-gold"
          onClick={close}
        >
          {t('brand.name')}
        </Link>

        <nav className="hidden items-center gap-8 text-xs uppercase tracking-widest text-white/60 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gold">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-5 bg-white transition-transform ${open ? 'translate-y-[6px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`h-px w-5 bg-white transition-transform ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-ink/95 backdrop-blur-md md:hidden">
          <nav className="container-x flex flex-col divide-y divide-white/5 py-2 text-sm uppercase tracking-[0.25em] text-white/80">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                className="py-4 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
