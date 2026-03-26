'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { MENU } from '@/constants/menu';
import MenuCard from './MenuCard';
import { BRAND } from '@/constants/brand';
import { useLanguage } from '@/context/LanguageContext';
import RevealOnScroll from './RevealOnScroll';

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState(MENU[0].id);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useLanguage();

  const activeCategory = MENU.find(c => c.id === activeTab);
  const items = activeCategory?.items || [];

  const handleTabChange = (id: string) => {
    if (id === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(id);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section id="menu" className="bg-background py-24 px-4 md:px-6 relative">
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
        <div className="sticky top-[64px] md:top-[80px] z-30 flex justify-start md:justify-center mb-12 -mx-4 px-4 md:mx-0 md:px-0 overflow-hidden">
          <div className="bg-surface rounded-full p-1 flex overflow-x-auto hide-scrollbar snap-x snap-mandatory max-w-full shadow-xl border border-border-subtle gap-1 relative">
            {MENU.map((category) => (
              <button
                key={category.id}
                onClick={() => handleTabChange(category.id)}
                className={`snap-start whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 flex items-center gap-2 flex-shrink-0 relative z-10 ${
                  activeTab === category.id
                    ? 'text-white'
                    : 'text-textMuted hover:text-white'
                }`}
              >
                <span>{category.emoji} {t(`menu.tabs.${category.id}`)}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === category.id ? 'bg-primary/20 text-primary' : 'bg-surface border border-border-subtle text-textMuted'
                }`}>
                  {category.items.length}
                </span>
                {activeTab === category.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {items.map((item, index) => (
            <RevealOnScroll key={item.id} delay={index * 100}>
              <MenuCard item={item} />
            </RevealOnScroll>
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
              className="btn-primary px-8 py-4 w-full sm:w-auto text-center"
            >
              {t('menu.cta.whatsapp')}
            </a>
            <a
              href={`tel:${BRAND.PHONE_PRIMARY.replace(/\s+/g, '')}`}
              className="btn-outline-gold px-8 py-4 w-full sm:w-auto text-center"
            >
              {t('menu.cta.call')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
