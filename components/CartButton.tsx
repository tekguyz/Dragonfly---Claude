'use client';

import { useCart } from '@/context/CartContext';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

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
        className={`flex items-center justify-center w-9 h-9 rounded-full bg-accent transition-all duration-300 relative
          ${totalItems > 0 ? 'opacity-100' : 'opacity-60'}
          ${isBouncing ? 'animate-bounceIn' : ''}
        `}
        aria-label={totalItems === 0 ? t('cart.button.tooltip.empty') : t('cart.button.tooltip.items')}
      >
        <span className="text-base">🛒</span>
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
    <button
      onClick={() => toggleCart(true)}
      className={`hidden md:flex fixed z-[45] items-center justify-center w-14 h-14 rounded-full bg-accent transition-all duration-300
        bottom-8 right-24
        ${totalItems > 0 ? 'shadow-[0_0_20px_oklch(74%_0.14_80/40%)] opacity-100' : 'opacity-60 shadow-none'}
        ${isBouncing ? 'animate-bounceIn' : ''}
      `}
      title={totalItems === 0 ? t('cart.button.tooltip.empty') : t('cart.button.tooltip.items')}
      aria-label={totalItems === 0 ? t('cart.button.tooltip.empty') : t('cart.button.tooltip.items')}
    >
      <span className="text-2xl">🛒</span>
      {totalItems > 0 && (
        <span 
          className={`absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full
            ${isPulsing ? 'animate-pulseScale' : ''}
          `}
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}
