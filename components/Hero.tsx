'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/constants/brand';
import { useLanguage } from '@/context/LanguageContext';
import RevealOnScroll from './RevealOnScroll';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[100svh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1920&q=80"
          alt="Dragonfly Sushi"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(4%_0_0/95%)] via-[oklch(4%_0_0/50%)] to-[oklch(4%_0_0/20%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(4%_0_0)] to-transparent h-full w-full" style={{ background: 'linear-gradient(to top, oklch(4% 0 0) 0%, transparent 40%)' }} />
      </div>

      {/* Content */}
      <RevealOnScroll delay={100} className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:items-start items-center text-center md:text-left pt-20">
        <div className="max-w-[700px]">
          {/* Eyebrow */}
          <div className="inline-block px-4 py-1.5 rounded-full border border-[oklch(74%_0.14_80/40%)] bg-[oklch(74%_0.14_80/8%)] text-accent text-xs font-semibold tracking-wider mb-6 uppercase">
            ✦ {t('hero.eyebrow')}
          </div>

          {/* Headline */}
          <h1 className="section-heading text-[clamp(2.25rem,8vw,4.5rem)] leading-[1.1] mb-6">
            {t('hero.headline.line1')} <br />
            <span className="bg-[var(--gradient-teal-gold)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
              {t('hero.headline.line2')}
            </span>
          </h1>

          {/* Divider */}
          <div className="w-10 h-[2px] bg-primary mb-6 mx-auto md:mx-0" />

          {/* Subheadline */}
          <p className="font-body text-lg text-textMuted mb-10">
            {t('hero.subheadline')}
          </p>

          {/* CTA Row */}
          <div className="flex flex-col min-[380px]:flex-row items-center justify-center md:justify-start gap-4 mb-12 w-full min-[380px]:w-auto">
            <Link
              href="#menu"
              className="btn-primary px-8 py-4 w-full min-[380px]:w-auto text-center"
            >
              📖 {t('hero.cta.menu')}
            </Link>
            <a
              href={BRAND.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold px-8 py-4 w-full min-[380px]:w-auto text-center"
            >
              📲 {t('hero.cta.whatsapp')}
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-textMuted font-body text-left md:text-center">
            <span className="flex items-center gap-2">⭐ {t('hero.badge.rated')}</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-primary" />
            <span className="flex items-center gap-2">🍣 {t('hero.badge.sushi')}</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-primary" />
            <span className="flex items-center gap-2">🕐 {t('hero.badge.hours')}</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-primary" />
            <span className="flex items-center gap-2">📍 {t('hero.badge.location')}</span>
          </div>
        </div>
      </RevealOnScroll>

      {/* Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10">
        <div className="w-[1px] h-16 bg-[oklch(75%_0.12_176/20%)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-primary animate-scroll-dot" />
        </div>
        <span className="text-primary text-[10px] tracking-[0.2em] font-bold uppercase rotate-90 mt-4">{t('hero.scroll')}</span>
      </div>

    </section>
  );
}
