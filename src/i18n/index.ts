import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import ar from '@/locales/ar.json';
import bn from '@/locales/bn.json';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import hi from '@/locales/hi.json';
import it from '@/locales/it.json';
import ml from '@/locales/ml.json';
import pl from '@/locales/pl.json';
import ro from '@/locales/ro.json';
import te from '@/locales/te.json';
import ur from '@/locales/ur.json';

export const RTL_LOCALES = ['ar', 'ur'] as const;

export type AppLocale =
  | 'en'
  | 'bn'
  | 'ml'
  | 'ar'
  | 'ro'
  | 'es'
  | 'it'
  | 'pl'
  | 'te'
  | 'hi'
  | 'ur';

export const SUPPORTED_LOCALES: { code: AppLocale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'ar', label: 'العربية' },
  { code: 'ro', label: 'Română' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'pl', label: 'Polski' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ur', label: 'اردو' },
];

export function isRTL(locale: string): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}

export function applyLayoutDirection(locale: string): boolean {
  const rtl = isRTL(locale);
  I18nManager.allowRTL(true);
  if (I18nManager.isRTL !== rtl) {
    I18nManager.forceRTL(rtl);
    return true;
  }
  return false;
}

const resources = {
  en: { translation: en },
  bn: { translation: bn },
  ml: { translation: ml },
  ar: { translation: ar },
  ro: { translation: ro },
  es: { translation: es },
  it: { translation: it },
  pl: { translation: pl },
  te: { translation: te },
  hi: { translation: hi },
  ur: { translation: ur },
};

const initialLocale: AppLocale = 'en';
applyLayoutDirection(initialLocale);

i18n.use(initReactI18next).init({
  resources,
  lng: initialLocale,
  fallbackLng: 'en',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  applyLayoutDirection(lng);
});

export async function changeAppLanguage(locale: AppLocale): Promise<boolean> {
  const needsReload = applyLayoutDirection(locale);
  await i18n.changeLanguage(locale);
  return needsReload;
}

export default i18n;
