import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

// Transform translations to i18next format
const resources = {
  es: { translation: translations.es },
  en: { translation: translations.en }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Save language preference
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;