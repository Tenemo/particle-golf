import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from 'locales/en';
import pl from 'locales/pl';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en,
            pl,
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
