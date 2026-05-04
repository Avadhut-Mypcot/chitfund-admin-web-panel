import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { Collapse, Container } from "reactstrap";
import VerticalLayout from "../sidebar/VerticalLayout";
import color from "../../assets/styles/color";
import Styles from "../../assets/styles/typographyStyles";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearAuth } from "../../redux/slice/auth";
import CustomModal from "../CustomModal";
import BrandLogo from "../../assets/images/EnglishLang.svg";
import BrandNameLogo from "../../assets/images/EnglishLang.svg";
import "../../App.css";
import { usePersistentFilters } from "../../hooks/usePersistentFilters";
import { useTranslation } from "react-i18next";
import { ADMIN_URL_PATH } from "../../constants/constants";
import DashboardSvgComponent from "../../assets/images/svgImageComponents/DashboardSvgComponent";
import LogoutSvgComponent from "../../assets/images/svgImageComponents/LogoutSvgComponent";

type MenuItemsProps = {
    label: string;
    link?: string;
    isDisabled?: boolean;
    fontSize?: string;
    marginLeft?: string;
    hasNested?: boolean;
    nestedItems?: MenuItemsProps[];
    onClick?: () => void;
};

type SidebarMenuOnCollapseProps = {
    isOpen: boolean;
    items: MenuItemsProps[];
    handleClickOutside: (event: MouseEvent) => void;
    color: typeof color;
    isDrawerFullOpen: boolean;
    topWidth?: string;
    nestedOpenStates?: Record<string, boolean>;
    onNestedToggle?: (key: string) => void;
};

type MenuKeys = "dashboard" | "logout";

type MenuState = {
    [key in MenuKeys]: boolean;
};

type SidebarProps = {
    layoutType: string | undefined;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isLargeScreen: boolean;
};

const initialMenuState: MenuState = {
    dashboard: false,
    logout: false,
};

const urls = {
    dashboard: [`${ADMIN_URL_PATH}/dashboard`],
    logout: ["/logout"],
};

const Sidebar: React.FC<SidebarProps> = ({
    layoutType,
    isSidebarOpen,
    toggleSidebar,
    isLargeScreen,
}) => {
    const PAGE_KEY = "";
    const { resetOtherFilters } = usePersistentFilters(PAGE_KEY);
    const navigate = useNavigate();
    const { isDrawerFullOpen } = useAppSelector((state) => state.drawerMenu);
    const location = useLocation();
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const [isSidebarMenuOpen, setIsSidebarMenuOpen] =
        useState<MenuState>(initialMenuState);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const menuRefs = {
        dashboard: useRef<HTMLDivElement>(null),
    };

    const isMenuActive = (menuKey: keyof typeof urls): boolean => {
        const paths = urls[menuKey];
        if (!paths) return false;
        return paths.some((path) => location.pathname.startsWith(path));
    };

    useEffect(() => {
        const newMenuState = { ...initialMenuState };
        if (isMenuActive("dashboard")) newMenuState.dashboard = true;
        setIsSidebarMenuOpen(newMenuState);
    }, [location.pathname]);

    const SidebarMenuOnCollapse: React.FC<SidebarMenuOnCollapseProps> = ({
        isOpen,
        items,
        color,
        isDrawerFullOpen,
        topWidth,
    }) => {
        return (
            <Collapse
                className="menu-dropdown menu-dropdown-div"
                isOpen={isOpen}
                style={{
                    backgroundColor: color.primary,
                    top: `${!isDrawerFullOpen ? "0px" : topWidth || "0px"}`,
                }}
            >
                <ul className="nav nav-sm flex-column">
                    {items.map((item, index) => (
                        <li
                            className="text-start"
                            key={index}
                            style={{ marginLeft: item.marginLeft || "0px" }}
                        >
                            <Link
                                to={item.link || "#"}
                                className="nav-link padding10"
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsSidebarMenuOpen(initialMenuState);
                                    if (item.onClick) item.onClick();
                                }}
                                style={{
                                    color:
                                        item.link &&
                                        location.pathname.startsWith(item.link)
                                            ? color.white
                                            : color.themeBlue,
                                    fontSize: item.fontSize || ".9rem",
                                    opacity: item.isDisabled ? 0.5 : 1,
                                }}
                            >
                                {t(item.label)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Collapse>
        );
    };

    const getTopPosition = (key: string): string => {
        const menuRef = (menuRefs as any)[key];
        if (menuRef?.current) {
            const rect = menuRef.current.getBoundingClientRect();
            return `${rect.top}px`;
        }
        return "0px";
    };

    const handleMenuToggle = (key: MenuKeys) => {
        setIsSidebarMenuOpen((prev) => {
            if (prev[key]) return { ...initialMenuState };
            return { ...initialMenuState, [key]: true };
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsSidebarMenuOpen(initialMenuState);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <React.Fragment>
            {!isDrawerFullOpen ? (
                isSidebarOpen ? (
                    <div
                        className={`app-menu navbar-menu`}
                        style={{ backgroundColor: color.primary }}
                    >
                        <div className="d-block d-lg-block d-xl-none float-end">
                            {!isLargeScreen && (
                                <button
                                    type="button"
                                    className="btn btn-sm p-0 fs-20 text-white"
                                    onClick={toggleSidebar}
                                >
                                    <i
                                        className="ri-close-line"
                                        style={{ color: color.white }}
                                    ></i>
                                </button>
                            )}
                        </div>
                        <div className="d-flex justify-content-between align-items-center sidebar-close-icon-div">
                            <div
                                style={{
                                    ...Styles.poppinsBold20,
                                    color: color.white,
                                    textAlign: isLargeScreen
                                        ? "center"
                                        : "left",
                                }}
                                className="paddingTop20"
                            >
                                <img
                                    src={BrandNameLogo}
                                    alt="Brand Logo"
                                    className="mt-2 brand-logos"
                                    title="ChitFund"
                                />
                            </div>
                        </div>
                        <div className="navbar-brand-box">
                            <button
                                type="button"
                                className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
                            >
                                <i className="ri-record-circle-line"></i>
                            </button>
                        </div>
                        <SimpleBar id="scrollbar" className="h-100">
                            <Container>
                                <div id="two-column-menu"></div>
                                <ul
                                    className="navbar-nav overflow-auto"
                                    id="navbar-nav"
                                >
                                    <VerticalLayout
                                        toggleSidebar={toggleSidebar}
                                        isLargeScreen={isLargeScreen}
                                    />
                                </ul>
                            </Container>
                        </SimpleBar>
                        <div className="sidebar-background"></div>
                    </div>
                ) : null
            ) : (
                <div
                    className="nav-bar-menu-div"
                    ref={ref}
                    onScroll={() => setIsSidebarMenuOpen(initialMenuState)}
                    style={{ backgroundColor: color.primary }}
                >
                    <div className="navbar-brand-box d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                            <img
                                src={BrandLogo}
                                alt="Brand Logo"
                                className="mt-3 brand-logo"
                                title={t("ChitFund")}
                            />
                        </div>

                        {/* Dashboard */}
                        <h2 className="logo logo-dark" title={t("Dashboard")}>
                            <Link
                                to={`${ADMIN_URL_PATH}/dashboard`}
                                className="logo-link"
                                onClick={() =>
                                    setIsSidebarMenuOpen(initialMenuState)
                                }
                            >
                                <DashboardSvgComponent
                                    color={
                                        isMenuActive("dashboard")
                                            ? color.white
                                            : color.themeBlue
                                    }
                                />
                            </Link>
                        </h2>

                        {/* Logout */}
                        <h2
                            className="logo logo-dark"
                            title={t("Logout")}
                            onClick={() => setShowLogoutModal(true)}
                        >
                            <LogoutSvgComponent color={color.themeBlue} />
                        </h2>
                    </div>
                </div>
            )}

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

export default Sidebar;
