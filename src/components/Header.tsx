import React, { useEffect } from "react";
import ProfileDropdown from "./ProfileDropDown";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toggleIsDrawerFullOpen } from "../redux/slice/drawerMenu";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";
import type { HeaderProps } from "../types/common.types";
import { AVAILABLE_LANGUAGES } from "../locale/helpers/languages";

const Header: React.FC<HeaderProps> = ({
    headerClass,
    isLargerScreen,
    toggleSidebar,
}) => {
    const { t } = useTranslation();
    const { user } = useAppSelector((state) => state.auth);
    const { isDrawerFullOpen } = useAppSelector((state) => state.drawerMenu);
    const dispatch = useAppDispatch();
    const toggleMenuBtn = () => {
        if (isLargerScreen) {
            dispatch(toggleIsDrawerFullOpen(!isDrawerFullOpen));
        } else {
            toggleSidebar();
        }
    };

    useEffect(() => {
        const topbarElement = document.getElementById("page-topbar");

        if (topbarElement) {
            if (isDrawerFullOpen) {
                topbarElement.style.left =
                    isLargerScreen && !isDrawerFullOpen ? "250px" : "70px";
                topbarElement.style.right = "0";
            } else {
                topbarElement.style.left = isLargerScreen ? "250px" : "0px";
                topbarElement.style.right = "0";
            }
        }
    }, [isDrawerFullOpen, isLargerScreen]);

    // const getTrimmedName = (name: string | undefined): string => {
    //   if (!name) return "User";
    //   return name.length > 20 ? `${name.substring(0, 15)}...` : name;
    // };

    return (
        <React.Fragment>
            <header id="page-topbar" className={headerClass}>
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">
                            {!isDrawerFullOpen ? (
                                <button
                                    onClick={toggleMenuBtn}
                                    type="button"
                                    className="btn btn-sm fs-16 header-item vertical-menu-btn topnav-hamburger"
                                    id="topnav-hamburger-icon"
                                >
                                    <span className="hamburger-icon">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                </button>
                            ) : (
                                <button
                                    onClick={toggleMenuBtn}
                                    type="button"
                                    className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger material-shadow-none"
                                    id="topnav-hamburger-icon"
                                >
                                    <span className="hamburger-icon open">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                </button>
                            )}
                            <span className="d-xl-inline-block fw-bold user-name-text align-self-center d-none d-sm-inline">
                                {`${t("welcome")} ${user?.name} ${t("to_Sagar_Wines_Panel")}`}
                            </span>
                        </div>
                        <div className="d-flex align-items-center">
                            {AVAILABLE_LANGUAGES.length > 1 && (
                                <LanguageDropdown />
                            )}
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default React.memo(Header);
