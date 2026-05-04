import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import type { BreadCrumbProps } from "../types/common.types";

const NON_CLICKABLE_SIDEBAR_ITEMS = [
    "master",
    "products",
    "banners",
    "distributors",
    "retailers",
    "staffs",
    "general settings",
    "contact us",
    "reports",
    "notifications",
] as const;

const BreadCrumb: React.FC<BreadCrumbProps> = ({ title, pageTitle }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const isNonClickable = (itemName: string): boolean => {
        return NON_CLICKABLE_SIDEBAR_ITEMS.includes(
            itemName.toLowerCase() as any,
        );
    };

    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                {pageTitle.map((page, index) => (
                                    <li key={index} className="breadcrumb-item">
                                        {isNonClickable(page.name) ? (
                                            <span className="breadcrumb-non-clickable">
                                                {t(page.name)}
                                            </span>
                                        ) : (
                                            <span
                                                role="button"
                                                className="breadcrumb-clickable"
                                                onClick={() =>
                                                    navigate(page.path)
                                                }
                                            >
                                                {t(page.name)}
                                            </span>
                                        )}
                                    </li>
                                ))}

                                <li className="breadcrumb-item">
                                    <span className="breadcrumb-non-clickable">
                                        {t(title)}
                                    </span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BreadCrumb;
