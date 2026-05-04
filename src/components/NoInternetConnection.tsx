import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";

interface NoInternetConnectionProps {
    onRetry?: () => void;
}

const NoInternetConnection: React.FC<NoInternetConnectionProps> = ({
    onRetry,
}) => {
    const { t } = useTranslation();

    return (
        <div
            style={{ minHeight: "100vh" }}
            className="d-flex justify-content-center align-items-center bg-light"
        >
            <div
                className="card shadow-sm border-0 text-center"
                style={{
                    maxWidth: "480px",
                    width: "100%",
                    borderRadius: "12px",
                }}
            >
                <div className="card-body p-4 p-md-5">
                    <div className="mb-3">
                        <i
                            className="ri-wifi-off-line text-primary"
                            style={{ fontSize: "65px" }}
                        ></i>
                    </div>

                    <h4 className="fw-bold text-dark mb-2">
                        {t("no_internet_connection")}
                    </h4>

                    <p className="text-muted small mb-4">
                        {t("offline_message")}
                    </p>

                    <Button color="primary" className="px-4" onClick={onRetry}>
                        {t("retry")}
                    </Button>

                    <p
                        className="text-muted mt-4 mb-0"
                        style={{ fontSize: "12px" }}
                    >
                        {t("contact_admin")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NoInternetConnection;
