import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import CustomModal from "./CustomModal";
import { clearAuth } from "../redux/slice/auth";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL_PATH } from "../constants/constants";

const ProfileDropdown = () => {
    const { t } = useTranslation();
    const { user } = useAppSelector((state) => state.auth);
    const [userName, setUserName] = useState(user?.name || "Admin");
    const [userInitials, setUserInitials] = useState("A");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const updateUserDetails = () => {
            if (user) {
                let fullName = user?.name || "Admin";
                const nameParts: string[] = fullName.split(" ");
                const initials: string = nameParts
                    .slice(0, 2)
                    .map((part: string) => part.charAt(0))
                    .join("")
                    .toUpperCase();

                if (fullName.length > 20) {
                    fullName = fullName.substring(0, 20) + "...";
                }

                setUserInitials(initials);
                setUserName(fullName);
            }
        };

        updateUserDetails();
        window.addEventListener("resize", updateUserDetails);

        return () => {
            window.removeEventListener("resize", updateUserDetails);
        };
    }, [user]);

    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleItemClick = () => {
        setIsProfileDropdown(false);
    };

    return (
        <React.Fragment>
            <Dropdown
                show={isProfileDropdown}
                onToggle={() => setIsProfileDropdown(!isProfileDropdown)}
            >
                <Dropdown.Toggle
                    variant="light"
                    className="header-item btn custom-dropdown-toggle toggle-div"
                >
                    <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center user-initials-div">
                        {userInitials}
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Header>
                        {t("welcome")} {userName}
                    </Dropdown.Header>
                    <Link
                        to={`${ADMIN_URL_PATH}/profile`}
                        className="dropdown-item"
                        onClick={handleItemClick}
                    >
                        <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                        {t("profile")}
                    </Link>
                    <Link
                        to={`${ADMIN_URL_PATH}/change-password`}
                        className="dropdown-item"
                        onClick={handleItemClick}
                    >
                        <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>
                        {t("change_password")}
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item
                        onClick={() => {
                            setShowLogoutModal(true);
                            setIsProfileDropdown(false);
                        }}
                    >
                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                        {t("Logout")}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

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
                        navigate(`${ADMIN_URL_PATH}/login`);
                        window.location.reload();
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default React.memo(ProfileDropdown);
