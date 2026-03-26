'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { openWhatsAppOrder } from '@/utils/buildWhatsAppMessage';
import { BRAND } from '@/constants/brand';
import { useLanguage } from '@/context/LanguageContext';

export default function CartDrawer() {
  const { items, totalItems, isOpen, toggleCart, updateQuantity, removeItem, clearCart } = useCart();
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const { t, language } = useLanguage();

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleRemove = (id: string) => {
    setRemovingIds(prev => new Set(prev).add(id));
    setTimeout(() => {
      removeItem(id);
      setRemovingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300);
  };

  const handleSendOrder = () => {
    setIsSending(true);
    setTimeout(() => {
      openWhatsAppOrder(items, name, language);
      setIsSending(false);
      toggleCart(false);
      clearCart();
    }, 1000);
  };

  const handleClearCart = () => {
    if (window.confirm(t('cart.drawer.clearConfirm'))) {
      clearCart();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => toggleCart(false)}
      />

      {/* Drawer */}
      <div 
        className="fixed right-0 top-0 h-[100vh] w-[100vw] md:w-[420px] bg-surface border-l border-[rgba(0,201,167,0.2)] shadow-[-20px_0_60px_rgba(0,0,0,0.6)] z-50 flex flex-col animate-slideInRight"
      >
        {/* Header */}
        <div className="bg-surface px-6 py-5 border-b border-border-subtle flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-playfair text-accent text-xl flex items-center gap-2">
              <span>🛒</span> {t('cart.drawer.title')}
            </h2>
            <p className="text-textMuted text-sm">{totalItems} {t('cart.drawer.items')}</p>
          </div>
          <button 
            onClick={() => toggleCart(false)}
            className="text-accent hover:text-white transition-colors w-11 h-11 flex items-center justify-center text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-6xl mb-4">🛒</span>
              <h3 className="text-white font-semibold text-lg mb-2">{t('cart.drawer.empty')}</h3>
              <p className="text-textMuted text-sm mb-6">{t('cart.drawer.browse')}</p>
              <button 
                onClick={() => {
                  toggleCart(false);
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary px-6 py-3 text-sm"
              >
                {t('cart.drawer.browseBtn')}
              </button>
            </div>
          ) : (
            items.map(item => (
              <div 
                key={item.id} 
                className={`flex items-center gap-4 bg-[#1A1A1A] rounded-xl p-4 border border-border-subtle hover:border-[rgba(0,201,167,0.5)] transition-all duration-200 overflow-hidden
                  ${removingIds.has(item.id) ? 'max-h-0 opacity-0 py-0 my-0 border-0' : 'max-h-[120px] opacity-100'}
                `}
              >
                <div className="w-11 h-11 rounded-full bg-[rgba(0,201,167,0.1)] flex items-center justify-center text-2xl shrink-0">
                  {item.emoji}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm truncate">{t(`menu.items.${item.id}.name`)}</h4>
                  <p className="text-textMuted text-xs truncate">{t(`menu.tabs.${item.category}`)}</p>
                </div>

                <div className="flex items-center shrink-0">
                  <div className="flex items-center">
                    <button 
                      onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : handleRemove(item.id)}
                      className="w-7 h-7 rounded-full border border-border-subtle flex items-center justify-center text-white hover:border-red-500 hover:text-red-500 transition-colors"
                    >
                      −
                    </button>
                    <span className="text-white font-bold min-w-[24px] text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-primary text-black flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="text-textMuted hover:text-red-500 text-sm ml-3 transition-colors"
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary Bar */}
        <div className="border-t border-border-subtle bg-surface px-6 py-5 shrink-0">
          <div className="flex justify-between items-center mb-4">
            <span className="text-textMuted text-sm">{totalItems} {t('cart.drawer.items')}</span>
            <span className="text-textMuted text-xs italic">{t('cart.drawer.prices')}</span>
          </div>

          <div className="mb-4">
            <label htmlFor="customerName" className="block text-sm font-medium text-textMuted mb-2">
              {t('cart.drawer.name')}
            </label>
            <input 
              type="text" 
              id="customerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('cart.drawer.namePlaceholder')}
              className="w-full bg-[#1A1A1A] border border-border-subtle rounded-lg px-4 py-2.5 text-white placeholder-textMuted text-sm focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={handleSendOrder}
              disabled={items.length === 0 || isSending}
              className={`w-full bg-primary text-black font-bold rounded-xl py-4 text-base transition-all duration-300
                ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_15px_rgba(0,201,167,0.4)] hover:-translate-y-[1px]'}
              `}
            >
              {isSending ? t('cart.drawer.sending') : t('cart.drawer.send')}
            </button>
            
            {items.length > 0 && (
              <button 
                onClick={handleClearCart}
                className="w-full text-center text-textMuted text-sm hover:text-red-500 transition-colors py-2"
              >
                🗑️ {t('cart.drawer.clear')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
