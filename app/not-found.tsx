'use client';

import Link from 'next/link';
import { BRAND } from '@/constants/brand';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-24">
      <div className="absolute inset-0 z-0 bg-background" />
      <div className="relative z-10 max-w-xl text-center">
        <h1 className="gold-heading text-6xl md:text-8xl mb-4">404</h1>
        <h2 className="section-heading text-3xl md:text-4xl mb-6">{t('notFound.heading')}</h2>
        <p className="text-textMuted mb-10 text-lg">
          {t('notFound.subheading')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="btn-primary px-8 py-4">
            {t('notFound.cta.home')}
          </Link>
          <a
            href={BRAND.WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold px-8 py-4"
          >
            {t('notFound.cta.whatsapp')}
          </a>
        </div>
      </div>
    </section>
  );
}
