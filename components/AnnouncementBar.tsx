'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function AnnouncementBar() {
  const { t } = useLanguage();
  const content = t('announcement.text');

  return (
    <div className="h-[44px] w-full bg-gradient-to-r from-accent via-[#C9A227] to-accent overflow-hidden flex items-center relative">
      <div className="whitespace-nowrap flex animate-marquee">
        <span className="text-background font-semibold text-[13px] uppercase tracking-[0.1em] px-4">
          {content}
        </span>
        <span className="text-background font-semibold text-[13px] uppercase tracking-[0.1em] px-4">
          {content}
        </span>
      </div>
      
    </div>
  );
}
