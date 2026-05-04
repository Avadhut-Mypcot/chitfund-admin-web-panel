import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classNames from "classnames";
import { useLanguage } from "../context/LanguageContext";

const LanguageTabs: React.FC = () => {
    const { currentLanguage, availableLanguages } = useLanguage();
    const [selectedTab, setSelectedTab] = React.useState(currentLanguage);

    const handleChange = (langCode: string) => {
        setSelectedTab(langCode);
    };

    return (
        <Nav tabs className="border-bottom-0">
            {availableLanguages.map((lang) => (
                <NavItem key={lang.code}>
                    <NavLink
                        href="#"
                        onClick={() => handleChange(lang.code)}
                        className={classNames("language-btn-div text-center", {
                            active: selectedTab === lang.code,
                        })}
                        style={{
                            borderBottom:
                                selectedTab === lang.code
                                    ? "none"
                                    : "1px solid #ddd",
                            backgroundColor:
                                selectedTab === lang.code ? "#f2f2f2" : "white",
                            color:
                                selectedTab === lang.code ? "#000" : "#7b61ff", // purple like screenshot
                            fontWeight: selectedTab === lang.code ? 600 : 500,
                        }}
                    >
                        {lang.nativeName}
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    );
};

export default LanguageTabs;
