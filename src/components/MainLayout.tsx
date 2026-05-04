import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { useDispatch } from "react-redux";
import {
    setIsLargerScreen,
    toggleIsDrawerFullOpen,
} from "../redux/slice/drawerMenu";

const MainLayout: React.FC = () => {
    const { isDrawerFullOpen, isLargerScreen } = useAppSelector(
        (state) => state.drawerMenu,
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();

    const updateMainContentMargin = () => {
        const mainContent = document.getElementById("main-content");
        if (!mainContent) return;

        const sidebarWidth = isDrawerFullOpen ? 70 : 250;
        const smallScreenSidebarWidth = isDrawerFullOpen ? 70 : 0;

        if (isLargerScreen) {
            mainContent.style.marginInlineStart = `${sidebarWidth}px`;
            mainContent.style.marginInlineEnd = "0px";
        } else {
            mainContent.style.marginInlineStart = `${smallScreenSidebarWidth}px`;
            mainContent.style.marginInlineEnd = "0px";
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.innerWidth >= 992;
            dispatch(setIsLargerScreen(isLargeScreen));

            if (isLargeScreen) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
                dispatch(toggleIsDrawerFullOpen(false));
            }

            updateMainContentMargin();
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [dispatch, isDrawerFullOpen, isLargerScreen]);

    useEffect(() => {
        updateMainContentMargin();
    }, [isDrawerFullOpen, isLargerScreen]);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <div>
            <Header
                layoutModeType={undefined}
                headerClass={undefined}
                isLargerScreen={isLargerScreen}
                toggleSidebar={toggleSidebar}
            />
            <Sidebar
                isLargeScreen={isLargerScreen}
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                layoutType={undefined}
            />
            <div className="main-content" id="main-content">
                <div className="page-content overflow-hidden">
                    <Outlet />
                </div>
            </div>
            <Footer isLargerScreen={isSidebarOpen} />
        </div>
    );
};

export default React.memo(MainLayout);
