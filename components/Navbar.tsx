'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BRAND } from '@/constants/brand';
import { Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          scrolled
            ? 'bg-[rgba(10,10,10,0.85)] backdrop-blur-[20px] border-b border-border-subtle py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐉</span>
              <span className="font-playfair text-accent tracking-[0.15em] text-xl font-bold uppercase">
                {BRAND.BUSINESS_NAME}
              </span>
            </div>
            <span className="text-primary text-[10px] tracking-widest mt-0.5 ml-8">
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
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div 
              role="radiogroup" 
              aria-label="Select language"
              className="hidden md:flex items-center w-[80px] h-[32px] bg-surface-hover border border-border rounded-full p-[2px] cursor-pointer"
            >
              <button
                role="radio"
                aria-checked={language === 'en'}
                onClick={() => setLanguage('en')}
                className={`flex-1 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-250 ease-in-out h-full ${
                  language === 'en' 
                    ? 'bg-accent text-[#0a0a0a]' 
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
                    ? 'bg-accent text-[#0a0a0a]' 
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
            
            <button
              className="md:hidden text-textPrimary p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" className="animate-in fade-in duration-300" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" className="animate-in fade-in duration-300" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(10,10,10,0.97)] backdrop-blur-md flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-8 w-full px-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-playfair text-accent text-3xl opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </Link>
            ))}
            
            <a
              href={BRAND.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 btn-primary px-8 py-3 text-lg opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${navLinks.length * 0.1}s` }}
            >
              📲 {t('nav.orderWhatsapp')}
            </a>

            {/* Mobile Language Toggle */}
            <div 
              role="radiogroup" 
              aria-label="Select language"
              className="flex items-center w-[80px] h-[32px] bg-surface-hover border border-border rounded-full p-[2px] cursor-pointer mt-8 opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${(navLinks.length + 0.5) * 0.1}s` }}
            >
              <button
                role="radio"
                aria-checked={language === 'en'}
                onClick={() => setLanguage('en')}
                className={`flex-1 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-250 ease-in-out h-full ${
                  language === 'en' 
                    ? 'bg-accent text-[#0a0a0a]' 
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
                    ? 'bg-accent text-[#0a0a0a]' 
                    : 'bg-transparent text-text-muted hover:text-text-primary'
                }`}
              >
                ES
              </button>
            </div>

            <div 
              className="flex gap-6 mt-6 opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${(navLinks.length + 1) * 0.1}s` }}
            >
              <a href={BRAND.INSTAGRAM_URL} className="text-accent hover:text-primary transition-colors"><Instagram size={24} /></a>
              <a href={BRAND.FACEBOOK_URL} className="text-accent hover:text-primary transition-colors"><Facebook size={24} /></a>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
}
