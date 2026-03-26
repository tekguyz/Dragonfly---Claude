'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { COPY } from '@/constants/copy';
import { BRAND } from '@/constants/brand';
import { useLanguage } from '@/context/LanguageContext';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const SYSTEM_INSTRUCTION = `You are the friendly and knowledgeable AI assistant for Dragonfly, an upscale Fusion Asian Restaurant at Plaza Farallones, Modulo #3, Chinandega, Nicaragua.

Your personality: warm, helpful, sophisticated but approachable. You're proud of Dragonfly and genuinely excited to help guests.

ESSENTIAL FACTS — always accurate:
Hours: Open daily, 12:00 PM to 12:00 AM (midnight)
Primary Phone: +505 8563-9999
Secondary Phone: +505 2350-1521  
WhatsApp: https://wa.me/50585639999
Email: dragonfly_chinandega@hotmail.com
Address: Plaza Farallones, Modulo #3, Chinandega, Nicaragua
Instagram: @dragonfly_chinandega

MENU (complete):

SUSHI: Yummy Roll (tuna + crispy wonton, spicy mayo), JB Tempura (sweet salmon tempura), Dragon Roll (shrimp tempura, avocado), Spicy Tuna, Chef's Omakase Specials.

STARTERS: Tuna Nachos (wonton chips + tuna tartare), Copa Camarón (tempura shrimp + spicy mayo), Camarones al Chile (chili-glazed), Gyoza (pan-fried dumplings), Edamame.

MAINS: Corte de Carne (premium Nicaraguan beef), Ribeye (aged, grilled), Chicken Teriyaki (house teriyaki glaze), Salmon Filet (pan-seared, ginger butter).

PIZZA & BURGERS: Dragonfly Pizza (rotating signature), BBQ Chicken Pizza, Dragonfly Burger (house blend + brioche), Wagyu Smash Burger.

DRINKS: Dragon Cocktail (house signature), Japanese Whisky selection, Wine list (red/white/sparkling), Craft beers (local + imported), Mocktails & fresh juices.

KEY SELLING POINTS:
- Only sushi restaurant in Chinandega (unique)
- Virtual Stadium with giant screens for live football (unique)
- Business lunches, private events, group dinners available
- Outdoor seating available
- Trendy, cozy, relaxed atmosphere
- Dragonfly does NOT take orders through the website or this chat. Always direct to WhatsApp or phone for ordering.

RESPONSE RULES:
1. Reply in the same language the user writes (English or Spanish)
2. Keep replies concise — under 4 sentences when possible
3. For prices: say honestly "Prices aren't listed on our site — WhatsApp us for current pricing!"
4. For reservations: direct to WhatsApp or phone
5. For ordering: ALWAYS direct to WhatsApp first
6. If unsure: be honest and suggest calling
7. Never make up menu items or facts not listed above
8. Be warm and inviting — you want them to visit!`;

export default function ChatWidget() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when language changes or on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: t('chat.welcome'),
          timestamp: new Date(),
        },
      ]);
    } else if (messages.length === 1 && messages[0].id === 'welcome') {
      // Update welcome message if it's the only one and language changes
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: t('chat.welcome'),
          timestamp: new Date(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, hasError]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (text: string = inputValue) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    setHasError(false);

    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const contents = [
        ...history,
        { role: 'user', parts: [{ text: trimmed }] }
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: SYSTEM_INSTRUCTION + `\n\nIMPORTANT: The user is currently browsing the website in ${language === 'es' ? 'Spanish' : 'English'}. Please respond in ${language === 'es' ? 'Spanish' : 'English'}.`,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate response');
      const data = await response.json();
      const replyText = data.text || t('chat.error');

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (query: string) => {
    handleSend(query);
  };

  return (
    <div className="fixed z-50 bottom-[calc(68px+16px+env(safe-area-inset-bottom,0px))] right-4 md:bottom-6 md:right-6">
      {/* Floating Button */}
      {!isOpen && (
        <div className="relative group">
          <button
            onClick={() => setIsOpen(true)}
            className="w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center shadow-lg relative z-10 hover:scale-105 transition-transform"
            aria-label="Open Chat"
          >
            <span className="text-2xl">🐉</span>
          </button>
          
          {/* Pulsing Ring */}
          <div className="absolute inset-0 rounded-full bg-primary animate-pulseRing -z-10" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-surface border border-border-subtle text-accent text-sm font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
            {t('chat.tooltip')}
          </div>
        </div>
      )}

      {/* Chat Drawer */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:absolute md:bottom-0 md:right-0 w-full md:w-[440px] h-[85vh] md:h-[650px] bg-[oklch(4%_0_0)] rounded-t-2xl md:rounded-2xl border border-[oklch(75%_0.12_176/20%)] shadow-[0_25px_50px_oklch(0%_0_0/80%)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-surface px-5 py-4 flex items-center justify-between border-b border-border-subtle shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🐉</span>
              <div>
                <h3 className="font-display text-accent font-bold">
                  {t('chat.title')}
                </h3>
                <p className="text-textMuted text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  {t('chat.status')}
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-accent hover:text-white transition-colors p-1" aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'assistant' && (
                    <span className="text-xl mb-1 shrink-0">🐉</span>
                  )}
                  <div className={`px-4 py-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-teal-500/20 text-teal-400 rounded-2xl rounded-tr-none' 
                      : 'bg-surface text-white rounded-2xl rounded-tl-none border-l-[3px] border-primary'
                  }`}>
                    {msg.content}
                  </div>
                </div>
                <span className="text-textMuted text-[10px] mt-1 mx-8">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="flex items-end gap-2 max-w-[85%] flex-row">
                  <span className="text-xl mb-1 shrink-0">🐉</span>
                  <div className="bg-surface text-white rounded-2xl rounded-tl-none border-l-[3px] border-primary px-4 py-4 flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            )}

            {hasError && (
              <div className="flex flex-col items-start">
                <div className="flex items-end gap-2 max-w-[85%] flex-row">
                  <span className="text-xl mb-1 shrink-0">🐉</span>
                  <div className="bg-surface text-white rounded-2xl rounded-tl-none border-l-[3px] border-red-500 px-4 py-3 text-sm flex flex-col gap-3">
                    <p>{t('chat.error')}</p>
                    <a 
                      href={BRAND.WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs px-4 py-2 text-center"
                    >
                      {t('chat.whatsapp')}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Replies */}
            {messages.length === 1 && !isLoading && !hasError && (
              <div className="flex flex-wrap gap-2 mt-2 ml-8">
                {['menu', 'hours', 'location', 'order'].map((key) => (
                  <button 
                    key={key} 
                    onClick={() => handleQuickReply(t(`chat.quick.${key}.query`))}
                    className="whitespace-nowrap rounded-full border border-primary/40 text-primary text-xs px-3 py-1.5 hover:bg-primary/10 transition-colors"
                  >
                    {t(`chat.quick.${key}.label`)}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-surface px-4 py-3 shrink-0 bg-surface pb-[calc(16px+env(safe-area-inset-bottom,0px))]">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={t('chat.placeholder')}
                className="w-full bg-surface border border-border-subtle rounded-xl pl-4 pr-12 py-3 text-base text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                disabled={isLoading}
              />
              <button 
                onClick={() => handleSend()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary p-2 hover:text-primaryDark transition-colors disabled:opacity-50" 
                disabled={isLoading || !inputValue.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
