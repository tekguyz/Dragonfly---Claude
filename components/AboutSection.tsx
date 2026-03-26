'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import RevealOnScroll from './RevealOnScroll';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-4 md:px-6 relative overflow-hidden border-t border-border-subtle">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, oklch(75% 0.12 176 / 4%) 0%, oklch(4% 0 0) 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        {/* Left: Images */}
        <RevealOnScroll delay={100} className="w-full lg:w-[45%] relative">
          <div className="relative aspect-[4/5] w-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://i.ibb.co/FLzZcbBn/res.jpg"
              alt="Dragonfly Interior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-[200px] h-[200px] rounded-xl overflow-hidden border-4 border-background shadow-2xl hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80"
              alt="Sushi Close-up"
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        </RevealOnScroll>

        {/* Right: Content */}
        <RevealOnScroll delay={300} className="w-full lg:w-[55%] flex flex-col items-start px-2 md:px-0">
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">{t('about.eyebrow')}</span>
          <h2 className="section-heading mb-6">{t('about.heading')}</h2>
          <div className="w-12 h-[2px] bg-accent mb-8" />
          
          <p className="font-body text-textMuted leading-relaxed mb-12 text-lg">
            {t('about.paragraph')}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 mb-12 w-full">
            <div className="flex flex-col items-start gap-2">
              <div className="text-primary text-3xl md:text-4xl font-bold font-display">{t('about.stat1.value')}</div>
              <div>
                <div className="text-white font-bold text-sm md:text-base">{t('about.stat1.label')}</div>
                <div className="text-textMuted text-xs md:text-sm">{t('about.stat1.sublabel')}</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="text-primary text-3xl md:text-4xl font-bold font-display">{t('about.stat2.value')}</div>
              <div>
                <div className="text-white font-bold text-sm md:text-base">{t('about.stat2.label')}</div>
                <div className="text-textMuted text-xs md:text-sm">{t('about.stat2.sublabel')}</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="text-primary text-3xl md:text-4xl font-bold font-display">{t('about.stat3.value')}</div>
              <div>
                <div className="text-white font-bold text-sm md:text-base">{t('about.stat3.label')}</div>
                <div className="text-textMuted text-xs md:text-sm">{t('about.stat3.sublabel')}</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="text-primary text-3xl md:text-4xl font-bold font-display">{t('about.stat4.value')}</div>
              <div>
                <div className="text-white font-bold text-sm md:text-base">{t('about.stat4.label')}</div>
                <div className="text-textMuted text-xs md:text-sm">{t('about.stat4.sublabel')}</div>
              </div>
            </div>
          </div>

          <Link
            href="#contact"
            className="btn-outline-gold px-8 py-4 w-full sm:w-auto text-center"
          >
            {t('about.cta')}
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
