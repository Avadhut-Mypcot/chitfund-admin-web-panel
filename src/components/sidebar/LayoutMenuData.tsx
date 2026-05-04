import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL_PATH } from "../../constants/constants";
import type { MenuItem, MenuStates } from "../../types/common.types";

import DashboardSvgComponent from "../../assets/images/svgImageComponents/DashboardSvgComponent";
import LogoutSvgComponent from "../../assets/images/svgImageComponents/LogoutSvgComponent";

const Navdata = () => {
    const location = useLocation();
    const { t } = useTranslation();

    const urls = {
        dashboard: [`${ADMIN_URL_PATH}/dashboard`],
    };

    const [menuStates, setMenuStates] = useState<MenuStates>({
        isDashboard: urls.dashboard.includes(location.pathname),
    });

    useEffect(() => {
        setMenuStates((prev) => ({
            ...prev,
            isDashboard: urls.dashboard.includes(location.pathname),
        }));
    }, [location.pathname]);

    const toggleMenuState = (menuKey: keyof MenuStates): void => {
        setMenuStates((prevState) => {
            const newState = { ...prevState };
            Object.keys(newState).forEach((key) => {
                (newState as Record<string, boolean>)[key] = false;
            });
            if (!prevState[menuKey]) {
                newState[menuKey] = true;
            }
            return newState;
        });
    };

    const createSvgIcon = (
        SvgComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>,
        size: number = 20,
    ) => {
        return (color: string) => (
            <div className="svgIcon">
                <SvgComponent
                    color={color}
                    width={size}
                    height={size}
                    className="display-block"
                />
            </div>
        );
    };

    const menuItems: MenuItem[] = [
        {
            id: "dashboard",
            label: t("Dashboard"),
            iconSvg: createSvgIcon(DashboardSvgComponent, 20),
            link: `${ADMIN_URL_PATH}/dashboard`,
            stateVariables: menuStates.isDashboard,
            isActive: urls.dashboard.some((path) =>
                location.pathname.startsWith(path),
            ),
            click: (e: React.MouseEvent<HTMLElement>): void => {
                e.preventDefault();
                toggleMenuState("isDashboard");
            },
        },
        {
            id: "logout",
            label: t("Logout"),
            iconSvg: createSvgIcon(LogoutSvgComponent, 24),
            stateVariables: false,
            isActive: false,
            click: (e: React.MouseEvent<HTMLElement>): void => {
                e.preventDefault();
            },
        },
    ];

    return menuItems;
};

export default Navdata;
