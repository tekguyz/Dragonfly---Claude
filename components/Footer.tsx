'use client';

import Link from 'next/link';
import { BRAND } from '@/constants/brand';
import { COPY } from '@/constants/copy';
import { Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#060606] border-t border-border-subtle pt-16 pb-24 md:pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Col 1 - Brand */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex flex-col items-start mb-4">
              <span className="font-playfair text-accent text-2xl font-bold uppercase tracking-widest">
                🐉 {BRAND.BUSINESS_NAME}
              </span>
              <span className="text-primary text-sm tracking-widest mt-1 ml-8">
                {BRAND.TAGLINE}
              </span>
            </Link>
            <p className="text-textMuted italic mb-6 ml-8">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4 ml-8">
              <a href={BRAND.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href={BRAND.FACEBOOK_URL} className="text-textMuted hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Col 2 - Links */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">{t('footer.explore')}</h4>
            <ul className="space-y-4">
              {['Menu', 'About', 'Gallery', 'Events', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-textMuted hover:text-primary transition-colors text-sm">
                    {t(`nav.${item.toLowerCase()}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Contact */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">{t('footer.visit')}</h4>
            <ul className="space-y-4 text-sm text-textMuted mb-8">
              <li>{BRAND.LOCATION}</li>
              <li>
                <a href={`tel:${BRAND.PHONE_PRIMARY.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors">
                  {BRAND.PHONE_PRIMARY}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.EMAIL}`} className="hover:text-primary transition-colors break-all">
                  {BRAND.EMAIL}
                </a>
              </li>
              <li>{BRAND.HOURS_DISPLAY}</li>
            </ul>
            <a
              href={BRAND.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center btn-primary px-6 py-2.5 text-sm"
            >
              {t('footer.whatsapp')}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-textMuted text-center md:text-left">
          <p>© {new Date().getFullYear()} Dragonfly Restaurant. {t('footer.rights')}</p>
          <p>Plaza Farallones, Chinandega, Nicaragua</p>
        </div>
      </div>
    </footer>
  );
}
