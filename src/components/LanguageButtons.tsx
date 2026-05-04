import React from "react";
import classNames from "classnames";
import type { LanguageButtonsProps } from "../types/common.types";

const LanguageButtons: React.FC<LanguageButtonsProps> = ({
    languages,
    activeLanguage,
    onLanguageChange,
}) => {
    return (
        <ul className="nav nav-tabs">
            {languages.length > 1 &&
                languages.map((lang) => (
                    <li key={lang.code} className="nav-item">
                        <button
                            type="button"
                            className={classNames("language-btn-div", {
                                active: activeLanguage === lang.code,
                            })}
                            onClick={() => onLanguageChange(lang.code)}
                            style={{
                                borderBottom:
                                    activeLanguage === lang.code
                                        ? "none"
                                        : "1px solid #ddd",
                                backgroundColor:
                                    activeLanguage === lang.code
                                        ? "#00235A"
                                        : "white",
                                color:
                                    activeLanguage === lang.code
                                        ? "#fff"
                                        : "#7b61ff",
                                fontWeight:
                                    activeLanguage === lang.code ? 600 : 500,
                            }}
                        >
                            {lang.code}
                        </button>
                    </li>
                ))}
        </ul>
    );
};

export default LanguageButtons;
