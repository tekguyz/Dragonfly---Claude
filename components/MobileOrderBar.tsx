'use client';

import { BRAND } from '@/constants/brand';

export default function MobileOrderBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-border-subtle z-40 flex items-center h-[calc(68px+env(safe-area-inset-bottom,0px))] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex-1 flex items-center justify-center border-r border-border-subtle h-full">
        <a
          href="#menu"
          className="text-white font-bold text-sm text-center w-full h-full flex items-center justify-center"
        >
          View Menu
        </a>
      </div>
      <div className="flex-1 flex items-center justify-center h-full">
        <a
          href={BRAND.WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold text-sm text-center w-full h-full flex items-center justify-center"
        >
          Order Now
        </a>
      </div>
    </div>
  );
}
