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
  const { t, language } = useLanguage();

  const name = language === 'es' ? (item.nameEs || item.name) : item.name;
  const description = language === 'es' ? (item.descriptionEs || item.description) : item.description;

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
        <div className="absolute top-3 right-3 z-20 w-5 h-5 bg-primary text-background font-bold text-xs rounded-full flex items-center justify-center shadow-lg">
          {quantity}
        </div>
      )}
      <div className="relative aspect-[16/9] md:aspect-[4/3] w-full overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={name}
          fill
          referrerPolicy="no-referrer"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8AKpT876YAAAAABJRU5ErkJggg=="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80" />
      </div>
      
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-block px-2 py-1 rounded-full border border-primary text-primary text-[10px] font-semibold uppercase tracking-wider">
            {item.category}
          </span>
          {item.tag && (
            <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider
              ${item.tag === 'Signature' ? 'bg-accent/10 border border-accent text-accent' : ''}
              ${item.tag === 'Popular' ? 'bg-primary/10 border border-primary text-primary' : ''}
              ${item.tag === "Chef's Pick" ? 'bg-purple-500/10 border border-purple-500 text-purple-500' : ''}
              ${item.tag === 'New' ? 'bg-blue-500/10 border border-blue-500 text-blue-500' : ''}
            `}>
              {item.tag}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-display text-xl text-white">{name}</h3>
          {item.isVegetarian && (
            <span className="text-green-400 text-sm" title="Vegetarian">🌿</span>
          )}
          {item.isSpicy && (
            <span className="text-red-400 text-sm" title="Spicy">🌶️</span>
          )}
        </div>
        <p className="font-body text-sm text-textMuted line-clamp-2 flex-1 mb-4">{description}</p>
        
        <div className="mt-auto pt-4 border-t border-border-subtle">
          {!inCart ? (
            <button 
              onClick={handleAdd}
              className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300
                ${isAdded ? 'bg-primary-dark text-black' : 'bg-primary text-black hover:bg-primary-dark'}
              `}
            >
              {isAdded ? t('cart.card.added') : t('cart.card.add')}
            </button>
          ) : (
            <div className="flex items-center w-full h-[40px] animate-fadeIn">
              <button 
                onClick={() => quantity > 1 ? updateQuantity(item.id, quantity - 1) : removeItem(item.id)}
                className="h-full px-4 bg-surface border border-border-subtle rounded-l-lg text-white hover:bg-surface-light transition-colors flex items-center justify-center"
              >
                −
              </button>
              <div className="h-full flex-1 bg-surface-light border-y border-border-subtle text-white font-bold flex items-center justify-center min-w-[40px]">
                {quantity}
              </div>
              <button 
                onClick={() => updateQuantity(item.id, quantity + 1)}
                className="h-full px-4 bg-primary text-black rounded-r-lg hover:bg-primary-dark transition-colors flex items-center justify-center font-bold"
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
