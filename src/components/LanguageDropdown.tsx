import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageDropdown: React.FC = () => {
    const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLangObj = availableLanguages.find(
        (lang) => lang.code === currentLanguage,
    );

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguageChange = (selectedLangCode: string) => {
        setLanguage(selectedLangCode);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!currentLangObj) return null;

    return (
        <div className="d-flex" ref={dropdownRef}>
            <div className="dropdown">
                <button
                    className="btn dropdown-toggle d-flex align-items-center"
                    type="button"
                    onClick={handleDropdownToggle}
                    aria-expanded={isOpen}
                >
                    <img
                        src={currentLangObj.image}
                        alt="flag"
                        className="langimg selected-flag language-flag"
                    />
                    <span className="selected-language d-md-flex d-none">
                        {currentLangObj.name}
                    </span>
                </button>

                <ul
                    className={`dropdown-menu dropdown-menu-right text-left ${
                        isOpen ? "show" : ""
                    }`}
                >
                    {availableLanguages.map((lang) => (
                        <li key={lang.code}>
                            <button
                                className="dropdown-item d-flex align-items-center"
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                <img
                                    src={lang.image}
                                    alt="flag"
                                    className="langimg language-flag"
                                />
                                <span className="font-small-3">
                                    {lang.nativeName}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LanguageDropdown;
