'use client';

import { useState } from 'react';
import { MENU } from '@/constants/menu';
import MenuCard from './MenuCard';
import { BRAND } from '@/constants/brand';
import { useLanguage } from '@/context/LanguageContext';

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState(MENU[0].id);
  const { t } = useLanguage();

  const activeCategory = MENU.find(c => c.id === activeTab);
  const items = activeCategory?.items || [];

  return (
    <section id="menu" className="bg-background py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-xs font-bold tracking-widest uppercase mb-4 block">{t('menu.eyebrow')}</span>
          <h2 className="section-heading mb-4">{t('menu.heading')}</h2>
          <p className="text-textMuted max-w-2xl mx-auto">
            {t('menu.subheading')}
          </p>
        </div>

        {/* Tabs */}
        <div className="sticky top-[80px] z-30 flex justify-center mb-12">
          <div className="bg-surface rounded-full p-1 flex overflow-x-auto hide-scrollbar snap-x snap-mandatory max-w-full shadow-xl border border-border-subtle">
            {MENU.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`snap-center whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeTab === category.id
                    ? 'bg-primary text-background shadow-md'
                    : 'text-textMuted hover:text-white hover:bg-surfaceHover'
                }`}
              >
                {category.emoji} {t(`menu.tabs.${category.id}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* CTA Card */}
        <div className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h3 className="gold-heading text-3xl mb-3">{t('menu.cta.heading')}</h3>
          <p className="text-textMuted mb-8">{t('menu.cta.subtext')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={BRAND.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4"
            >
              {t('menu.cta.whatsapp')}
            </a>
            <a
              href={`tel:${BRAND.PHONE_PRIMARY.replace(/\s+/g, '')}`}
              className="btn-outline-gold px-8 py-4"
            >
              {t('menu.cta.call')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
