'use client';

import { useCart } from '@/context/CartContext';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingBag } from 'lucide-react';

interface CartButtonProps {
  variant?: 'navbar' | 'floating';
}

export default function CartButton({ variant = 'floating' }: CartButtonProps) {
  const { totalItems, toggleCart } = useCart();
  const [isBouncing, setIsBouncing] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const prevTotalRef = useRef(totalItems);
  const { t } = useLanguage();

  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsBouncing(true);
      setIsPulsing(true);
      const timer = setTimeout(() => {
        setIsBouncing(false);
        setIsPulsing(false);
      }, 400);
      prevTotalRef.current = totalItems;
      return () => clearTimeout(timer);
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  if (variant === 'navbar') {
    return (
      <button
        onClick={() => toggleCart(true)}
        className={`flex items-center justify-center w-10 h-10 rounded-full bg-accent transition-all duration-300 relative
          ${totalItems > 0 ? 'opacity-100 shadow-[0_0_15px_oklch(74%_0.14_80/30%)]' : 'opacity-60'}
          ${isBouncing ? 'animate-bounceIn' : ''}
        `}
        aria-label={totalItems === 0 ? t('cart.button.tooltip.empty') : t('cart.button.tooltip.items')}
      >
        <ShoppingBag size={20} className="text-background" />
        {totalItems > 0 && (
          <span 
            className={`absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full
              ${isPulsing ? 'animate-pulseScale' : ''}
            `}
          >
            {totalItems}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="hidden md:block fixed z-[45] bottom-[calc(1.5rem+60px+16px)] right-6">
      <div className="relative group">
        <button
          onClick={() => toggleCart(true)}
          className={`flex items-center justify-center w-[60px] h-[60px] rounded-full bg-accent transition-all duration-300 relative z-10
            ${totalItems > 0 ? 'shadow-lg opacity-100 scale-100' : 'opacity-60 shadow-none scale-95'}
            ${isBouncing ? 'animate-bounceIn' : 'hover:scale-105'}
          `}
          title={totalItems === 0 ? t('cart.button.tooltip.empty') : t('cart.button.tooltip.items')}
          aria-label={totalItems === 0 ? t('cart.button.tooltip.empty') : t('cart.button.tooltip.items')}
        >
          <ShoppingBag size={28} className="text-background" />
          {totalItems > 0 && (
            <span 
              className={`absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-surface
                ${isPulsing ? 'animate-pulseScale' : ''}
              `}
            >
              {totalItems}
            </span>
          )}
        </button>

        {/* Pulsing Ring - only when items in cart */}
        {totalItems > 0 && (
          <div className="absolute inset-0 rounded-full bg-accent animate-pulseRingGold -z-10" style={{ animationDuration: '3s' }} />
        )}

        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-surface border border-border-subtle text-accent text-sm font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {totalItems === 0 ? t('cart.button.tooltip.empty') : `${totalItems} ${t('cart.drawer.items')}`}
        </div>
      </div>
    </div>
  );
}
