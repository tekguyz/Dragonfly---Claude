'use client';

import Image from 'next/image';
import { MenuItem } from '@/constants/menu';
import { useCart } from '@/context/CartContext';
import { getCategoryEmoji } from '@/utils/buildWhatsAppMessage';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const { addItem, removeItem, updateQuantity, getQuantity, isInCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { t } = useLanguage();

  const quantity = getQuantity(item.id);
  const inCart = isInCart(item.id);

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      category: item.category,
      quantity: 1,
      emoji: getCategoryEmoji(item.category)
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 800);
  };

  return (
    <div className="menu-card group flex flex-col h-full relative">
      {inCart && (
        <div className="absolute top-3 right-3 z-20 w-5 h-5 bg-primary text-black font-bold text-xs rounded-full flex items-center justify-center shadow-lg">
          {quantity}
        </div>
      )}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          referrerPolicy="no-referrer"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80" />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <span className="inline-block px-2 py-1 rounded-full border border-primary text-primary text-[10px] font-semibold uppercase tracking-wider">
            {item.category}
          </span>
        </div>
        
        <h3 className="font-playfair text-xl text-white mb-2">{t(`menu.items.${item.id}.name`)}</h3>
        <p className="font-inter text-sm text-textMuted line-clamp-2 flex-1 mb-4">{t(`menu.items.${item.id}.desc`)}</p>
        
        <div className="mt-auto pt-4 border-t border-border-subtle">
          {!inCart ? (
            <button 
              onClick={handleAdd}
              className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300
                ${isAdded ? 'bg-[#00e6bf] text-black' : 'bg-primary text-black hover:bg-[#00e6bf]'}
              `}
            >
              {isAdded ? t('cart.card.added') : t('cart.card.add')}
            </button>
          ) : (
            <div className="flex items-center w-full h-[40px] animate-fadeIn">
              <button 
                onClick={() => quantity > 1 ? updateQuantity(item.id, quantity - 1) : removeItem(item.id)}
                className="h-full px-4 bg-surface border border-border-subtle rounded-l-lg text-white hover:bg-[#1A1A1A] transition-colors flex items-center justify-center"
              >
                −
              </button>
              <div className="h-full flex-1 bg-[#1A1A1A] border-y border-border-subtle text-white font-bold flex items-center justify-center min-w-[40px]">
                {quantity}
              </div>
              <button 
                onClick={() => updateQuantity(item.id, quantity + 1)}
                className="h-full px-4 bg-primary text-black rounded-r-lg hover:bg-[#00e6bf] transition-colors flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
