import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { translations, TranslationKey } from '../constants/translations';

type Language = 'ar' | 'en';

interface LocalizationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, substitutions?: { [key: string]: string }) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = useCallback((key: TranslationKey, substitutions?: { [key: string]: string }): string => {
    let translation = translations[key]?.[language] || key;

    if (substitutions) {
      Object.entries(substitutions).forEach(([subKey, value]) => {
        // Using split/join for wider compatibility instead of replaceAll
        translation = translation.split(`{${subKey}}`).join(value);
      });
    }

    return translation;
  }, [language]);


  useEffect(() => {
    // Update HTML attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Update body font
    const body = document.querySelector('body');
    if (body) {
      body.style.fontFamily = language === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif";
    }
    
    // Dynamically update meta tags for SEO and social sharing
    document.title = t('meta_title');
    
    const metaDesc = document.getElementById('meta-description');
    if (metaDesc) metaDesc.setAttribute('content', t('meta_description'));
    
    const ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.setAttribute('content', t('og_title'));
    
    const ogDesc = document.getElementById('og-description');
    if (ogDesc) ogDesc.setAttribute('content', t('og_description'));

  }, [language, t]);

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};