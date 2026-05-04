import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationENG from "./en.json";
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from "./helpers/languages";

const resources = {
    en: {
        translation: translationENG,
    },
};

const getStoredLanguage = () => {
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("I18N_LANGUAGE");
        const isAvailable = AVAILABLE_LANGUAGES.some(
            (lang) => lang.code === stored,
        );
        return isAvailable && stored ? stored : DEFAULT_LANGUAGE;
    }
    return DEFAULT_LANGUAGE;
};

i18n.use(detector)
    .use(initReactI18next)
    .init({
        resources,
        lng: getStoredLanguage(),
        fallbackLng: DEFAULT_LANGUAGE,
        keySeparator: ".",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
