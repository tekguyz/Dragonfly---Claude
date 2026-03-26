'use client';

import { useCart } from '@/context/CartContext';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function CartButton() {
  const { totalItems, toggleCart } = useCart();
  const [isBouncing, setIsBouncing] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const prevTotalRef = useRef(totalItems);
  const { t } = useLanguage();

  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsBouncing(true);
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return (
    <button
      onClick={() => toggleCart(true)}
      className={`fixed z-[45] flex items-center justify-center w-14 h-14 rounded-full bg-accent transition-all duration-300
        md:bottom-8 md:right-24 top-4 right-16 md:top-auto
        ${totalItems > 0 ? 'shadow-[0_0_20px_rgba(212,175,55,0.4)] opacity-100' : 'opacity-60 shadow-none'}
        ${isBouncing ? 'animate-bounceIn' : ''}
      `}
      title={totalItems === 0 ? t('cart.button.empty') : t('cart.button.view')}
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
