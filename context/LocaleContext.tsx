import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Locale, getTranslations } from '../locales';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getTranslations>;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function LocaleProvider({ children }: Props) {
  const [locale, setLocale] = useState<Locale>('en');
  const t = getTranslations(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}