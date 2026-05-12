import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import deTranslations from '../i18n/de';

export type Language = 'de' | 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof deTranslations & ((key: string) => string);
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getBrowserLanguage = (): Language => {
  const saved = localStorage.getItem('language');
  if (saved && ['de', 'en', 'ru'].includes(saved)) {
    return saved as Language;
  }

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('de')) return 'de';
  if (browserLang.startsWith('ru')) return 'ru';
  if (browserLang.startsWith('en')) return 'en';

  return 'de';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getBrowserLanguage);
  const [translations, setTranslations] = useState<typeof deTranslations>(deTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const module = await import(`../i18n/${language}.ts`);
        setTranslations(module.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}`, error);
      }
    };

    loadTranslations();
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  const translateFunction = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  const t = Object.assign(translateFunction, translations);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
