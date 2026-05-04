import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { useAppSelector } from "../hooks/redux";
import { useTranslation } from "react-i18next";

const Footer = ({ isLargerScreen }: { isLargerScreen: boolean }) => {
    const { isDrawerFullOpen } = useAppSelector((state) => state.drawerMenu);
    const { t } = useTranslation();

    useEffect(() => {
        const footerContent = document.getElementById("footer");

        if (footerContent) {
            if (isDrawerFullOpen) {
                footerContent.style.left =
                    isLargerScreen && !isDrawerFullOpen ? "250px" : "70px";
                footerContent.style.right = "0";
            } else {
                footerContent.style.left = isLargerScreen ? "250px" : "0px";
                footerContent.style.right = "0";
            }
        }
    }, [isDrawerFullOpen, isLargerScreen]);

    return (
        <footer className="footer" id="footer">
            <Container fluid>
                <div className="text-center">
                    {t("Copyright")} © {new Date().getFullYear()}{" "}
                    {t("All_rights_reserved")}.
                </div>
            </Container>
        </footer>
    );
};

export default React.memo(Footer);
