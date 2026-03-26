'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/constants/brand';
import { useLanguage } from '@/context/LanguageContext';

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
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,10,0.95)] via-[rgba(10,10,10,0.5)] to-[rgba(10,10,10,0.2)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent h-full w-full" style={{ background: 'linear-gradient(to top, #0A0A0A 0%, transparent 40%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:items-start items-center text-center md:text-left pt-20">
        <div className="max-w-[700px]">
          {/* Eyebrow */}
          <div className="inline-block px-4 py-1.5 rounded-full border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.08)] text-accent text-xs font-semibold tracking-wider mb-6 uppercase">
            ✦ {t('hero.eyebrow')}
          </div>

          {/* Headline */}
          <h1 className="section-heading text-[42px] md:text-[72px] leading-[1.1] mb-6">
            {t('hero.headline.line1')} <br />
            <span className="bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent">{t('hero.headline.line2')}</span>
          </h1>

          {/* Divider */}
          <div className="w-10 h-[2px] bg-primary mb-6 mx-auto md:mx-0" />

          {/* Subheadline */}
          <p className="font-inter text-lg text-textMuted mb-10">
            {t('hero.subheadline')}
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-12">
            <Link
              href="#menu"
              className="btn-primary px-8 py-4"
            >
              📖 {t('hero.cta.menu')}
            </Link>
            <a
              href={BRAND.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold px-8 py-4"
            >
              📲 {t('hero.cta.whatsapp')}
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-textMuted font-inter">
            <span className="flex items-center gap-2">⭐ {t('hero.badge.rated')}</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-primary" />
            <span className="flex items-center gap-2">🍣 {t('hero.badge.sushi')}</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-primary" />
            <span className="flex items-center gap-2">🕐 {t('hero.badge.hours')}</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-primary" />
            <span className="flex items-center gap-2">📍 {t('hero.badge.location')}</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-[1px] h-16 bg-[rgba(0,201,167,0.2)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-scrollDown" />
        </div>
        <span className="text-primary text-[10px] tracking-[0.2em] font-bold uppercase rotate-90 mt-4">{t('hero.scroll')}</span>
      </div>

    </section>
  );
}
