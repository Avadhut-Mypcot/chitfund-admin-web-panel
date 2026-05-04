import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navdata from "./LayoutMenuData";
import color from "../../assets/styles/color";
import CustomModal from "../CustomModal";
import { useAppDispatch } from "../../hooks/redux";
import { clearAuth } from "../../redux/slice/auth";
import { usePersistentFilters } from "../../hooks/usePersistentFilters";
import { ADMIN_URL_PATH } from "../../constants/constants";
import type { VerticalLayoutProps, MenuItem } from "../../types/common.types";

const VerticalLayout: React.FC<VerticalLayoutProps> = (props) => {
    const PAGE_KEY = "";
    const { resetOtherFilters } = usePersistentFilters(PAGE_KEY);
    const { toggleSidebar, isLargeScreen, layoutType, children } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const navData: MenuItem[] = Navdata();

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const renderIcon = (item: MenuItem): React.ReactNode => {
        if (item.iconSvg) {
            if (typeof item.iconSvg === "function") {
                const iconColor = item.isActive ? color.white : color.themeBlue;
                return item.iconSvg(iconColor);
            }
            return item.iconSvg;
        }
        return (
            <i
                className={item.icon}
                style={{
                    color: !item.isActive ? color.themeBlue : color.white,
                }}
            ></i>
        );
    };

    return (
        <React.Fragment>
            {(navData || []).map((item, key) => {
                return (
                    <li className="nav-item nav-item-padding" key={key}>
                        {item.id === "logout" ? (
                            <div
                                onClick={() => setShowLogoutModal(true)}
                                className="nav-link menu-link sidebar-nav-link"
                                style={{
                                    cursor: "pointer",
                                    color: !item.isActive
                                        ? color.themeBlue
                                        : color.white,
                                }}
                            >
                                {renderIcon(item)}
                                <span>{item.label}</span>
                            </div>
                        ) : (
                            <Link
                                onClick={() => {
                                    if (!isLargeScreen) {
                                        toggleSidebar();
                                    }
                                }}
                                className="nav-link menu-link sidebar-nav-link"
                                to={item.link ? item.link : "/#"}
                                style={{
                                    color: !item.isActive
                                        ? color.themeBlue
                                        : color.white,
                                }}
                            >
                                {renderIcon(item)}
                                <span data-key="t-apps">{item.label}</span>
                            </Link>
                        )}
                    </li>
                );
            })}
            {children}
            {showLogoutModal && (
                <CustomModal
                    show={showLogoutModal}
                    title="Logout"
                    description="Are_you_sure_you_want_to_logout?"
                    btn1Text="Cancel"
                    btn2Text="Logout"
                    btn1Click={() => setShowLogoutModal(false)}
                    btn2Click={() => {
                        setShowLogoutModal(false);
                        dispatch(clearAuth());
                        resetOtherFilters();
                        navigate(`${ADMIN_URL_PATH}/login`);
                        window.location.reload();
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default React.memo(VerticalLayout);
