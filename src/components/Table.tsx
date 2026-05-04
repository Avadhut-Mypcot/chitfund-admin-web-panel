import React, { type JSX } from "react";
import { Row, Col, Button, Input, UncontrolledTooltip } from "reactstrap";
import { useTranslation } from "react-i18next";
import ViewSvgComponent from "../assets/images/svgImageComponents/ViewSvgComponent";
import EditSvgComponent from "../assets/images/svgImageComponents/EditSvgComponent";
import DeleteSvgComponent from "../assets/images/svgImageComponents/DeleteSvgComponent";
import UpdatePasswordSvgComponent from "../assets/images/svgImageComponents/UpdatePasswordSvgComponent";
import { formatViewField } from "./CommonUiComponents";
import type {
    RenderActionButtonProps,
    TableProps,
} from "../types/common.types";

const renderActionButton = <
    T extends {
        id?: string | number;
        rowStyleClass?: string | undefined;
        status?: string | boolean | React.ReactNode | undefined;
    },
>({
    type,
    row,
    rowIndex,
    action,
    t,
}: RenderActionButtonProps<T>): JSX.Element => {
    let buttonClass = "";
    let tooltipText = "";

    switch (type) {
        case "edit":
            buttonClass = "link-success fs-15";
            tooltipText = t("Edit");
            break;
        case "delete":
            buttonClass = "link-danger fs-15";
            tooltipText = t("Delete");
            break;

        case "view":
            buttonClass = "link-secondary fs-15";
            tooltipText = t("View");
            break;

        case "updatePassword":
            buttonClass = "link-danger fs-15";
            tooltipText = t("Update_Password");
            break;
    }

    const buttonId = `tooltip-${type}-${rowIndex}`;

    const renderIcon = () => {
        switch (type) {
            case "view":
                return (
                    <ViewSvgComponent width={18} height={18} stroke="#6c757d" />
                );
            case "edit":
                return (
                    <EditSvgComponent width={18} height={18} stroke="#6c757d" />
                );
            case "delete":
                return (
                    <DeleteSvgComponent
                        width={18}
                        height={18}
                        stroke="#6c757d"
                    />
                );
            case "updatePassword":
                return (
                    <UpdatePasswordSvgComponent
                        width={18}
                        height={18}
                        stroke="#6c757d"
                    />
                );

            default:
                return null;
        }
    };

    return (
        <button
            key={`${row.id ?? rowIndex}-${type}`}
            onClick={() => action.onClick(row)}
            className="btn btn-sm"
        >
            <div className={buttonClass} id={buttonId}>
                {renderIcon()}

                <UncontrolledTooltip placement="bottom" target={buttonId}>
                    {tooltipText}
                </UncontrolledTooltip>
            </div>
        </button>
    );
};

function Table<
    T extends {
        id: string | number;
        rowStyleClass?: string;
        status?: string | boolean | React.ReactNode | undefined;
    },
>({
    headers,
    rows,
    rowRenderer,
    actions,
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    currentPage,
    lastPage,
    noDataMessage,
    isImage,
    isLimit,
    handleLimitChange,
    limit,
    totalCount = 0,
    sortColumn = "",
    sortOrder = "",
    sortMappings,
    setSort,
}: TableProps<T>): JSX.Element {
    const { t } = useTranslation();
    const startSerialNo = (currentPage - 1) * limit + 1;

    const handleSort = (column: string): void => {
        if (!sortMappings || !setSort) return;

        const mappedColumn = sortMappings[column];
        if (!mappedColumn) return;

        let newSortColumn = mappedColumn;
        let newSortOrder: "asc" | "desc" | "" = "asc";

        if (sortColumn === mappedColumn) {
            if (sortOrder === "asc") {
                newSortOrder = "desc";
            } else if (sortOrder === "desc") {
                newSortColumn = "";
                newSortOrder = "";
            }
        }

        setSort({ sortOrder: newSortOrder, sortColumn: newSortColumn });
    };

    return (
        <div className="table-responsive-sm">
            {isLimit && (
                <div className="d-flex justify-content-between mb-2 ">
                    <label className="d-flex gap-2">
                        <span>{t("show")} </span>
                        <select
                            value={limit}
                            onChange={handleLimitChange}
                            className="form-select form-select-sm d-inline-block w-auto"
                        >
                            {[10, 15, 20, 25].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>{" "}
                    </label>
                </div>
            )}

            <div className="table-parent table-responsive">
                <table className="table table-striped w-100">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    onClick={() =>
                                        sortMappings?.[header] &&
                                        handleSort(header)
                                    }
                                    className={`custom-th ${
                                        sortMappings?.[header]
                                            ? "cursor-pointer"
                                            : ""
                                    }`}
                                    style={{
                                        width: `${
                                            100 /
                                            (headers.length +
                                                (actions && actions.length > 0
                                                    ? 1
                                                    : 0))
                                        }%`,
                                        verticalAlign: "middle",
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-1 text-black font-weight-bolder">
                                        <span>{t(header)}</span>
                                        {sortMappings?.[header] && (
                                            <span className="d-inline-flex flex-column sort-icons">
                                                <span
                                                    className={`line-height-sm ${
                                                        sortColumn ===
                                                            sortMappings[
                                                                header
                                                            ] &&
                                                        sortOrder === "asc"
                                                            ? "text-primary"
                                                            : "text-muted"
                                                    }`}
                                                >
                                                    ▲
                                                </span>
                                                <span
                                                    className={`line-height-sm ${
                                                        sortColumn ===
                                                            sortMappings[
                                                                header
                                                            ] &&
                                                        sortOrder === "desc"
                                                            ? "text-primary"
                                                            : "text-muted"
                                                    }`}
                                                >
                                                    ▼
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {actions && actions.length > 0 && (
                                <th
                                    className="custom-th"
                                    style={{
                                        width: `${100 / (headers.length + 1)}%`,
                                        verticalAlign: "middle",
                                    }}
                                >
                                    {t("staff.Actions")}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 ? (
                            rows.map((row, rowIndex) => (
                                <tr
                                    key={row.id ?? rowIndex}
                                    className={row.rowStyleClass ?? ""}
                                >
                                    {rowRenderer(row).map((cell, cellIndex) => (
                                        <td
                                            className="custom-td"
                                            key={cellIndex}
                                            style={{ verticalAlign: "middle" }}
                                        >
                                            {React.isValidElement(cell) ? (
                                                cell
                                            ) : typeof cell === "string" &&
                                              cell.trim().startsWith("<") ? (
                                                <span
                                                    className="d-inline-block"
                                                    dangerouslySetInnerHTML={{
                                                        __html: cell,
                                                    }}
                                                />
                                            ) : (
                                                formatViewField(String(cell))
                                            )}
                                        </td>
                                    ))}
                                    {actions && actions.length > 0 && (
                                        <td
                                            className={`actions-td ${isImage ? "min-h-img" : ""}`}
                                            style={{ verticalAlign: "middle" }}
                                        >
                                            <div className="table-actions">
                                                {actions.map((action) => {
                                                    if (
                                                        action.shouldRender &&
                                                        !action.shouldRender(
                                                            row,
                                                        )
                                                    ) {
                                                        return null;
                                                    }

                                                    return (
                                                        <div
                                                            className="hstack"
                                                            key={`${row.id ?? rowIndex}-${action.type}`}
                                                        >
                                                            {action.type ===
                                                            "status" ? (
                                                                <div
                                                                    className="form-check form-switch form-switch-custom"
                                                                    style={{
                                                                        color: "#6c757d",
                                                                    }}
                                                                    id={`tooltipBottomStatus-${
                                                                        row.id ??
                                                                        rowIndex
                                                                    }`}
                                                                >
                                                                    <Input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        checked={
                                                                            !!row.status ===
                                                                            true
                                                                        }
                                                                        onChange={() =>
                                                                            action.onClick(
                                                                                row,
                                                                            )
                                                                        }
                                                                        role="switch"
                                                                        id={`flexSwitchCheckDefault-${
                                                                            row.id ??
                                                                            rowIndex
                                                                        }`}
                                                                    />
                                                                    <UncontrolledTooltip
                                                                        placement="bottom"
                                                                        target={`tooltipBottomStatus-${
                                                                            row.id ??
                                                                            rowIndex
                                                                        }`}
                                                                    >
                                                                        {t(
                                                                            "Status",
                                                                        )}
                                                                    </UncontrolledTooltip>
                                                                </div>
                                                            ) : (
                                                                renderActionButton(
                                                                    {
                                                                        type: action.type,
                                                                        row,
                                                                        rowIndex,
                                                                        action,
                                                                        t,
                                                                    },
                                                                )
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={headers.length + (actions ? 2 : 1)}
                                    className="text-center fw-bold"
                                >
                                    {t(noDataMessage ?? "No_Data_Available")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Row className="pagination-parent">
                <Col>
                    <div className="pagination-text-parent">
                        {t("showing")}{" "}
                        <strong>
                            {`${rows.length > 0 ? startSerialNo : 0} - ${
                                startSerialNo + rows.length - 1 >
                                (totalCount ?? 0)
                                    ? (totalCount ?? 0)
                                    : startSerialNo + rows.length - 1
                            } ${t("of")} ${totalCount ?? 0}`}
                        </strong>
                    </div>
                </Col>
                <Col className="text-end">
                    <div className="pagination-button-parent">
                        <Button
                            color="primary"
                            onClick={previousPage}
                            disabled={!canPreviousPage}
                            type="button"
                        >
                            {"<"}
                        </Button>
                        <span className="user-select-none text-nowrap">
                            {t("page")}{" "}
                            <strong>
                                {lastPage === 0
                                    ? `0 ${t("Of")} 0`
                                    : `${currentPage} ${t("of")} ${lastPage}`}
                            </strong>
                        </span>
                        <Button
                            color="primary"
                            onClick={nextPage}
                            disabled={!canNextPage}
                            type="button"
                        >
                            {">"}
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Table;
