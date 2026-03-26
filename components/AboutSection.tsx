'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(0,201,167,0.04) 0%, #0A0A0A 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        {/* Left: Images */}
        <div className="w-full lg:w-[45%] relative">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
              alt="Dragonfly Interior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-[200px] h-[200px] rounded-xl overflow-hidden border-4 border-background shadow-2xl hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80"
              alt="Sushi Close-up"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-[55%] flex flex-col items-start">
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">{t('about.eyebrow')}</span>
          <h2 className="section-heading mb-6">{t('about.heading')}</h2>
          <div className="w-12 h-[2px] bg-accent mb-8" />
          
          <p className="font-inter text-textMuted leading-relaxed mb-12 text-lg">
            {t('about.paragraph')}
          </p>

          <div className="flex flex-col gap-6 mb-12 w-full">
            <div className="flex items-center gap-6">
              <div className="w-16 text-primary text-3xl font-bold font-playfair text-right">{t('about.stat1.value')}</div>
              <div>
                <div className="text-white font-bold">{t('about.stat1.label')}</div>
                <div className="text-textMuted text-sm">{t('about.stat1.sublabel')}</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 text-primary text-3xl font-bold font-playfair text-right">{t('about.stat2.value')}</div>
              <div>
                <div className="text-white font-bold">{t('about.stat2.label')}</div>
                <div className="text-textMuted text-sm">{t('about.stat2.sublabel')}</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 text-primary text-3xl font-bold font-playfair text-right">{t('about.stat3.value')}</div>
              <div>
                <div className="text-white font-bold">{t('about.stat3.label')}</div>
                <div className="text-textMuted text-sm">{t('about.stat3.sublabel')}</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 text-primary text-3xl font-bold font-playfair text-right">{t('about.stat4.value')}</div>
              <div>
                <div className="text-white font-bold">{t('about.stat4.label')}</div>
                <div className="text-textMuted text-sm">{t('about.stat4.sublabel')}</div>
              </div>
            </div>
          </div>

          <Link
            href="#contact"
            className="btn-outline-gold px-8 py-4"
          >
            {t('about.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
