'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BRAND } from '@/constants/brand';
import { Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import CartButton from '@/components/CartButton';

export default function Navbar() {
  const { scrollY, direction } = useScrollPosition();
  const scrolled = scrollY > 50;
  const hidden = direction === 'down' && scrollY > 100;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: t('nav.menu'), href: '#menu' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.events'), href: '#events' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'bg-[oklch(4%_0_0/85%)] backdrop-blur-[20px] border-b border-border-subtle py-3'
            : 'bg-transparent py-3 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-[40px] md:h-auto">
          {/* Left: Logo */}
          <Link href="/" className="flex flex-col items-start group max-w-[calc(100%-120px)]">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐉</span>
              <span className="font-display text-accent tracking-[0.15em] text-lg md:text-xl font-bold uppercase truncate">
                {BRAND.BUSINESS_NAME}
              </span>
            </div>
            <span className="hidden sm:block text-primary text-[10px] tracking-widest mt-0.5 ml-8">
              {BRAND.TAGLINE}
            </span>
          </Link>

          {/* Center: Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 group ${
                  activeSection === link.href.substring(1) ? 'text-primary' : 'text-off-white hover:text-primary'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-[2px] bg-primary origin-left transition-transform duration-300 ${
                    activeSection === link.href.substring(1) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 md:gap-4 z-[70]">
            {/* Language Toggle */}
            <div 
              role="radiogroup" 
              aria-label="Select language"
              className="flex items-center w-[70px] md:w-[80px] h-[28px] md:h-[32px] bg-surface-hover border border-border rounded-full p-[2px] cursor-pointer"
            >
              <button
                role="radio"
                aria-checked={language === 'en'}
                onClick={() => setLanguage('en')}
                className={`flex-1 rounded-full text-[10px] md:text-xs font-bold flex items-center justify-center transition-all duration-250 ease-in-out h-full ${
                  language === 'en' 
                    ? 'bg-accent text-background' 
                    : 'bg-transparent text-text-muted hover:text-text-primary'
                }`}
              >
                EN
              </button>
              <button
                role="radio"
                aria-checked={language === 'es'}
                onClick={() => setLanguage('es')}
                className={`flex-1 rounded-full text-[10px] md:text-xs font-bold flex items-center justify-center transition-all duration-250 ease-in-out h-full ${
                  language === 'es' 
                    ? 'bg-accent text-background' 
                    : 'bg-transparent text-text-muted hover:text-text-primary'
                }`}
              >
                ES
              </button>
            </div>

            <a
              href={BRAND.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn-primary px-5 py-2 text-sm"
            >
              📲 {t('nav.orderWhatsapp')}
            </a>
            
            <div className="md:hidden">
              <CartButton variant="navbar" />
            </div>

            <button
              className="md:hidden w-[44px] h-[44px] flex items-center justify-center text-accent relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-2 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-[oklch(4%_0_0/97%)] flex flex-col items-center justify-center gap-8 transition-all duration-350 ease-in-out md:hidden ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-full pointer-events-none invisible'
        }`}
      >
        <div className="flex flex-col items-center gap-4 w-full px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-accent font-display text-[clamp(1.75rem,5vw,2.25rem)] font-bold py-3 px-6 tracking-[0.05em] transition-all duration-200 border-l-0 hover:border-l-[3px] hover:border-primary hover:pl-10"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="absolute bottom-10 flex flex-col items-center gap-6">
          {/* Mobile Language Toggle */}
          <div 
            role="radiogroup" 
            aria-label="Select language"
            className="flex items-center w-[80px] h-[32px] bg-surface-hover border border-border rounded-full p-[2px] cursor-pointer"
          >
            <button
              role="radio"
              aria-checked={language === 'en'}
              onClick={() => setLanguage('en')}
              className={`flex-1 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-250 ease-in-out h-full ${
                language === 'en' 
                  ? 'bg-accent text-background' 
                  : 'bg-transparent text-text-muted hover:text-text-primary'
              }`}
            >
              EN
            </button>
            <button
              role="radio"
              aria-checked={language === 'es'}
              onClick={() => setLanguage('es')}
              className={`flex-1 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-250 ease-in-out h-full ${
                language === 'es' 
                  ? 'bg-accent text-background' 
                  : 'bg-transparent text-text-muted hover:text-text-primary'
              }`}
            >
              ES
            </button>
          </div>

          <div className="flex gap-6">
            <a href={BRAND.INSTAGRAM_URL} className="text-primary hover:text-accent transition-colors w-[44px] h-[44px] flex items-center justify-center"><Instagram size={24} /></a>
            <a href={BRAND.FACEBOOK_URL} className="text-primary hover:text-accent transition-colors w-[44px] h-[44px] flex items-center justify-center"><Facebook size={24} /></a>
          </div>
          
          <p className="text-text-muted text-sm">{BRAND.PHONE_PRIMARY_DISPLAY}</p>
        </div>
      </div>
    </>
  );
}
