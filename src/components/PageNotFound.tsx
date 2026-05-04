import React from "react";
import FourNotFoutImage from "../assets/images/error404-cover.png";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { ADMIN_URL_PATH } from "../constants/constants";

const PageNotFound = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const handleRedirect = () => {
        if (location.pathname.startsWith(ADMIN_URL_PATH)) {
            navigate(`${ADMIN_URL_PATH}/dashboard`);
        } else {
            navigate("/");
        }
    };

    return (
        <div>
            <div className="auth-page-content">
                <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
                    <div className="auth-page-content overflow-hidden p-0">
                        <div className="container">
                            <div className="justify-content-center row">
                                <div className="col-lg-8 col-xl-7">
                                    <div className="text-center">
                                        <img
                                            src={FourNotFoutImage}
                                            alt="error img"
                                            className="img-fluid"
                                        />
                                        <div className="mt-3">
                                            <h3 className="text-uppercase">
                                                {t("Page_Not_Found")}
                                            </h3>
                                            <p className="text-muted mb-4">
                                                {t("Page_Not_Found_Desc")}
                                            </p>
                                            <button
                                                className="btn btn-success"
                                                onClick={handleRedirect}
                                            >
                                                <i className="mdi mdi-home me-1"></i>
                                                {location.pathname.startsWith(
                                                    ADMIN_URL_PATH,
                                                )
                                                    ? t("Go_Back_DASHBOARD")
                                                    : t("Go_Back")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(PageNotFound);
