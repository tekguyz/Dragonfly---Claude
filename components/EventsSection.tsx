'use client';

import Link from 'next/link';
import { COPY } from '@/constants/copy';
import { useLanguage } from '@/context/LanguageContext';
import RevealOnScroll from './RevealOnScroll';

export default function EventsSection() {
  const { t } = useLanguage();

  return (
    <section id="events" className="relative w-full py-16 md:py-32 px-4 md:px-6 border-t border-border-subtle">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-surface">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')] bg-cover bg-center opacity-10"
        />
        <div className="absolute inset-0 bg-[oklch(4%_0_0/90%)]" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4 block">{t('events.eyebrow')}</span>
          <h2 className="section-heading mb-6">{t('events.heading')}</h2>
          <p className="text-textMuted max-w-2xl mx-auto text-lg">
            {t('events.subheading')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COPY.EVENT_TYPES.map((event, index) => (
            <RevealOnScroll key={index} delay={index * 150}>
              <div className="glass-card p-6 md:p-8 group">
                <div className="text-5xl mb-6">
                  {event.icon === 'briefcase' && '🍽️'}
                  {event.icon === 'glass-cheers' && '🎉'}
                  {event.icon === 'users' && '👥'}
                </div>
                <h3 className="gold-heading text-2xl mb-4">{t(`events.type${index + 1}.title`)}</h3>
                <p className="text-textMuted mb-8 leading-relaxed">
                  {t(`events.type${index + 1}.desc`)}
                </p>
                <Link href="#contact" className="text-primary font-medium group-hover:underline flex items-center gap-2">
                  {t('events.inquire')} <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
