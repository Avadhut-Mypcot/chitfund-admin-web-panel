import engImage from "../../assets/images/EnglishLang.svg";
import type { Language } from "../../types/common.types";

export const lang = {
    ENGLISH: "en",
};

export const AVAILABLE_LANGUAGES: Language[] = [
    {
        name: "English",
        image: engImage,
        code: lang.ENGLISH,
        nativeName: "English",
        flag: "https://flagcdn.com/w40/gb.png",
        flagAlt: "🇬🇧",
    },
];

export const getLanguageByCode = (code: string): Language | undefined => {
    return AVAILABLE_LANGUAGES.find((lang) => lang.code === code);
};

export const DEFAULT_LANGUAGE = AVAILABLE_LANGUAGES[0].code;
