'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { openWhatsAppOrder } from '@/utils/buildWhatsAppMessage';
import { BRAND } from '@/constants/brand';
import { useLanguage } from '@/context/LanguageContext';
import ConfirmationModal from './ConfirmationModal';

export default function CartDrawer() {
  const { items, totalItems, isOpen, toggleCart, updateQuantity, removeItem, clearCart } = useCart();
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity"
        onClick={() => toggleCart(false)}
      />

      {/* Drawer */}
      <div 
        className="fixed bottom-0 left-0 w-full md:right-0 md:top-0 md:h-full md:w-[450px] bg-surface border-t md:border-t-0 md:border-l border-border-subtle shadow-[-20px_0_60px_oklch(0%_0_0/80%)] z-50 flex flex-col rounded-t-[2rem] md:rounded-none animate-slideInUp md:animate-slideInRight h-[92vh] md:h-full"
      >
        {/* Drag Handle (Mobile) */}
        <div className="md:hidden w-full flex justify-center py-4">
          <div className="w-16 h-1.5 bg-border-subtle rounded-full" />
        </div>

        {/* Header */}
        <div className="bg-surface px-6 py-6 border-b border-border-subtle flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-display text-accent text-2xl flex items-center gap-3">
              <span className="text-primary">🛒</span> {t('cart.drawer.heading')}
            </h2>
            <p className="text-textMuted text-sm font-medium">{totalItems} {t('cart.drawer.items')}</p>
          </div>
          <button 
            onClick={() => toggleCart(false)}
            className="text-accent hover:text-white transition-all hover:rotate-90 duration-300 w-12 h-12 flex items-center justify-center bg-surface-light rounded-full border border-border-subtle text-2xl"
            aria-label={t('cart.drawer.close')}
          >
            ✕
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 rounded-full bg-surface-light flex items-center justify-center mb-6 border border-border-subtle">
                <span className="text-5xl opacity-20">🛒</span>
              </div>
              <h3 className="text-white font-display text-2xl mb-3">{t('cart.drawer.empty.heading')}</h3>
              <p className="text-textMuted text-base mb-8 max-w-[250px] mx-auto leading-relaxed">{t('cart.drawer.empty.body')}</p>
              <button 
                onClick={() => {
                  toggleCart(false);
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary px-10 py-4 text-base font-bold"
              >
                {t('cart.drawer.empty.cta')}
              </button>
            </div>
          ) : (
            items.map(item => (
              <div 
                key={item.id} 
                className={`flex items-center gap-4 bg-surface-light rounded-2xl p-4 border border-border-subtle hover:border-primary/30 transition-all duration-300 ease-in-out overflow-hidden
                  ${removingIds.has(item.id) ? 'max-h-0 opacity-0 py-0 my-0 border-0' : 'max-h-[140px] opacity-100'}
                `}
              >
                <div className="w-14 h-14 rounded-xl bg-background flex items-center justify-center text-3xl shrink-0 border border-border-subtle">
                  {item.emoji}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-base truncate mb-0.5">{t(`menu.items.${item.id}.name`)}</h4>
                  <p className="text-textMuted text-xs font-medium uppercase tracking-wider">{t(`menu.tabs.${item.category}`)}</p>
                </div>

                <div className="flex items-center shrink-0 gap-3">
                  <div className="flex items-center bg-background rounded-full border border-border-subtle p-1">
                    <button 
                      onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : handleRemove(item.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-red-500/10 hover:text-red-500 transition-colors text-lg"
                      aria-label={t('cart.drawer.quantity.decrease')}
                    >
                      −
                    </button>
                    <span className="text-white font-bold min-w-[32px] text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 transition-transform text-lg"
                      aria-label={t('cart.drawer.quantity.increase')}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="text-textMuted hover:text-red-500 transition-colors w-10 h-10 flex items-center justify-center bg-background rounded-full border border-border-subtle text-lg"
                    title={t('cart.drawer.item.remove')}
                    aria-label={t('cart.drawer.item.remove')}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary Bar */}
        <div className="border-t border-border-subtle bg-surface px-6 py-8 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-textMuted text-sm font-medium uppercase tracking-widest">{t('cart.drawer.summary.items')} ({totalItems})</span>
            <span className="text-accent text-xs italic font-medium">{t('cart.drawer.summary.pricing')}</span>
          </div>

          <div className="mb-6">
            <label htmlFor="customerName" className="block text-xs font-bold text-textMuted mb-2 uppercase tracking-wider">
              {t('cart.drawer.name.label')}
            </label>
            <input 
              type="text" 
              id="customerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('cart.drawer.name.placeholder')}
              className="w-full bg-surface-light border border-border-subtle rounded-xl px-5 py-3.5 text-white placeholder-textMuted text-base input-focus"
            />
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleSendOrder}
              disabled={items.length === 0 || isSending}
              className={`w-full bg-primary text-black font-bold rounded-2xl py-5 text-lg transition-all duration-300 shadow-xl shadow-primary/10
                ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-primary/30 hover:-translate-y-1 active:scale-[0.98]'}
              `}
            >
              {isSending ? t('cart.drawer.sending') : t('cart.drawer.send')}
            </button>
            
            {items.length > 0 && (
              <button 
                onClick={() => setIsClearModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 text-textMuted text-sm hover:text-red-500 transition-colors py-2 font-medium"
              >
                <span className="text-base">🗑️</span> {t('cart.drawer.clear')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={clearCart}
        title={t('cart.drawer.clear.confirm.title')}
        message={t('cart.drawer.clear.confirm.message')}
        cancelText={t('cart.drawer.clear.confirm.cancel')}
        confirmText={t('cart.drawer.clear.confirm.action')}
      />
    </>
  );
}

