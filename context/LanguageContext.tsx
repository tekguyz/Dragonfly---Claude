'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TRANSLATIONS } from '@/constants/translations';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isSpanish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('dragonfly-lang') as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
        setLanguageState(savedLang);
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('es')) {
          setLanguageState('es');
        } else {
          setLanguageState('en');
        }
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dragonfly-lang', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language, isMounted]);

  const t = (key: string): string => {
    // During SSR, default to 'en' to avoid hydration mismatch
    const currentLang = isMounted ? language : 'en';
    const translation = TRANSLATIONS[currentLang]?.[key];
    return translation !== undefined ? translation : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language: isMounted ? language : 'en',
        setLanguage,
        t,
        isSpanish: (isMounted ? language : 'en') === 'es',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
