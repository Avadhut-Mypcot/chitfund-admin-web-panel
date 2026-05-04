const errorMessage = "something went wrong, please try again later!";
const emailLinkExpirationTime = 900;
const inactivityTime = 10 * 60 * 1000;
const generalDebounceTime = 500;

const displayLangCode = {
    en: "En",
};

const ADMIN_URL_PATH = import.meta.env.VITE_ADMIN_URL_PATH;

export {
    errorMessage,
    emailLinkExpirationTime,
    generalDebounceTime,
    inactivityTime,
    displayLangCode,
    ADMIN_URL_PATH,
};
