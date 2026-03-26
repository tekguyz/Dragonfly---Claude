'use client';

import { BRAND } from '@/constants/brand';

export default function MobileOrderBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-border-subtle p-4 z-40 flex items-center justify-between pb-safe">
      <div className="flex flex-col">
        <span className="text-white font-bold text-sm">Ready to order?</span>
        <span className="text-textMuted text-xs">Pickup or Delivery</span>
      </div>
      <a
        href={BRAND.WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary px-6 py-2.5 text-sm"
      >
        WhatsApp
      </a>
    </div>
  );
}
