import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "../locale/i18n";
import {
    AVAILABLE_LANGUAGES,
    DEFAULT_LANGUAGE,
} from "../locale/helpers/languages";
import type { LanguageContextType } from "../types/common.types";

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
        const stored = localStorage.getItem("I18N_LANGUAGE");
        const isAvailable = AVAILABLE_LANGUAGES.some(
            (lang) => lang.code === stored,
        );
        return isAvailable && stored ? stored : DEFAULT_LANGUAGE;
    });

    const setLanguage = (langCode: string) => {
        const isAvailable = AVAILABLE_LANGUAGES.some(
            (lang) => lang.code === langCode,
        );
        if (!isAvailable) return;

        setCurrentLanguage(langCode);
        localStorage.setItem("I18N_LANGUAGE", langCode);
        i18n.changeLanguage(langCode);
    };

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, []);

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage,
                setLanguage,
                availableLanguages: AVAILABLE_LANGUAGES,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
};
