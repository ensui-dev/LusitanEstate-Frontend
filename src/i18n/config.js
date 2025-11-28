import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import en from './locales/en.json';
import pt from './locales/pt.json';

// Region-specific language mapping
const REGION_LANGUAGE_MAP = {
  PT: 'pt', // Portugal
  BR: 'pt', // Brazil
  US: 'en',
  GB: 'en',
  // Add more mappings as needed
};

// Custom language detector that checks region
const regionDetector = {
  name: 'regionDetector',
  lookup() {
    // Try to detect user's region from browser
    const language = navigator.language || navigator.userLanguage;

    if (language) {
      // Extract region code (e.g., 'pt-BR' -> 'BR', 'pt-PT' -> 'PT')
      const regionMatch = language.match(/[_-]([A-Z]{2})/i);
      if (regionMatch) {
        const region = regionMatch[1].toUpperCase();
        return REGION_LANGUAGE_MAP[region] || null;
      }

      // Check if language code directly matches
      const langCode = language.split(/[_-]/)[0].toLowerCase();
      if (langCode === 'pt' || langCode === 'en') {
        return langCode;
      }
    }

    return null;
  }
};

// Custom detection order: localStorage -> database (handled in LanguageProvider) -> region -> default
const languageDetector = new LanguageDetector();
languageDetector.addDetector(regionDetector);

const i18nInstance = i18n
  .use(languageDetector)
  .use(initReactI18next);

i18nInstance.init({
    resources: {
      en: { translation: en },
      pt: { translation: pt }
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt'],
    debug: false, // Set to true to debug i18n issues
    detection: {
      order: ['localStorage', 'regionDetector', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'preferredLanguage'
    },
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p']
    }
  });

export default i18nInstance;
