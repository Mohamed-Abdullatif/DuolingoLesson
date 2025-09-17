import { en } from './en';
import { es } from './es';

export type Locale = 'en' | 'es';

export const translations = {
  en,
  es,
};

export const getTranslations = (locale: Locale) => translations[locale];