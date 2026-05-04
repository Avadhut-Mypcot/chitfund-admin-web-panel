import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { I18nextProvider } from "react-i18next";
import i18n from "./locale/i18n.ts";
import { LanguageProvider } from "./context/LanguageContext.tsx";

const AppWithProviders = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <LanguageProvider>
                    <App />
                </LanguageProvider>
            </Provider>
        </I18nextProvider>
    );
};

createRoot(document.getElementById("root")!).render(
    <BrowserRouter basename={import.meta.env.VITE_BASE_URL_PATH}>
        <AppWithProviders />
    </BrowserRouter>,
);
