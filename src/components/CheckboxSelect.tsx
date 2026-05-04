import React, { useState, useEffect, useRef } from "react";
import { Input, Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";
import type { CheckboxSelectProps } from "../types/common.types";

const CheckboxSelect: React.FC<CheckboxSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select",
    isLoading = false,
    onLoadMore,
    onSearch,
    onOpen,
    disabled = false,
    invalid = false,
    customLabels = {},
}) => {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState<number>(1);
    const [labelCache, setLabelCache] = useState<Record<string, string>>({});

    const dropdownRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const displayRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const getLabel = (key: string) => {
        if (customLabels[key]) return customLabels[key];
        if (labelCache[key]) return labelCache[key];

        const opt = options.find((o) => String(o.key) === key);
        if (!opt) return key;

        return opt.value;
    };

    useEffect(() => {
        setLabelCache((prev) => {
            const next = { ...prev };
            let hasChanged = false;

            // Merge customLabels
            Object.entries(customLabels).forEach(([key, val]) => {
                if (next[key] !== val) {
                    next[key] = val;
                    hasChanged = true;
                }
            });

            options.forEach((opt) => {
                const key = String(opt.key);
                if (next[key] !== opt.value) {
                    next[key] = opt.value;
                    hasChanged = true;
                }
            });

            return hasChanged ? next : prev;
        });
    }, [options, customLabels]);
    const displayableValue = React.useMemo(() => {
        return value.filter((v) => getLabel(v) !== v);
    }, [value, options, labelCache, customLabels]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                if (searchTerm !== "") {
                    setSearchTerm("");
                    onSearch?.("");
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, searchTerm, onSearch]);

    useEffect(() => {
        if (
            !displayRef.current ||
            !measureRef.current ||
            displayableValue.length === 0
        ) {
            setVisibleCount(1);
            return;
        }

        const containerWidth = displayRef.current.offsetWidth;
        let usedWidth = 0;
        let count = 0;

        for (const key of displayableValue) {
            const label = getLabel(key);
            measureRef.current.innerText = count === 0 ? label : `, ${label}`;

            const labelWidth = measureRef.current.offsetWidth;

            if (usedWidth + labelWidth > containerWidth - 40) break;

            usedWidth += labelWidth;
            count++;
        }

        setVisibleCount(Math.max(count, 1));
    }, [displayableValue, options, labelCache]);

    const handleToggle = () => {
        if (disabled) return;

        const next = !isOpen;
        setIsOpen(next);
        if (next) onOpen?.();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            onSearch?.(term);
        }, 500);
    };

    const handleCheckboxChange = (key: string, checked: boolean) => {
        if (checked) {
            onChange([...value, key]);
        } else {
            onChange(value.filter((v) => v !== key));
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const isBottom =
            target.scrollHeight - target.scrollTop <= target.clientHeight + 10;

        if (isBottom && onLoadMore && !isLoading) {
            onLoadMore();
        }
    };

    const getDisplayText = () => {
        if (value.length === 0) {
            return <span style={{ color: "#999" }}>{t(placeholder)}</span>;
        }

        const visibleValues = displayableValue
            .slice(0, visibleCount)
            .map(getLabel);
        const remaining = value.length - visibleValues.length;

        return (
            <div
                ref={displayRef}
                className="d-flex align-items-center"
                style={{ width: "100%", overflow: "hidden" }}
            >
                <span className="text-truncate">
                    {visibleValues.join(", ")}
                </span>
                {remaining > 0 && !(isLoading && options.length === 0) && (
                    <span className="ms-1 flex-shrink-0">
                        + {remaining} {t("more")}
                    </span>
                )}
            </div>
        );
    };

    const selectableOptions = options.filter((o) => !o.is_already_taken);
    const areAllSelected =
        selectableOptions.length > 0 &&
        selectableOptions.every((o) => value.includes(String(o.key)));

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;

        if (checked) {
            const newValues = [...value];
            selectableOptions.forEach((o) => {
                const key = String(o.key);
                if (!newValues.includes(key)) newValues.push(key);
            });
            onChange(newValues);
        } else {
            if (searchTerm.trim() === "") {
                onChange([]);
            } else {
                const keys = new Set(
                    selectableOptions.map((o) => String(o.key)),
                );
                onChange(value.filter((v) => !keys.has(v)));
            }
        }
    };

    return (
        <div
            className="checkbox-select-container"
            ref={dropdownRef}
            style={{ position: "relative" }}
        >
            <span
                ref={measureRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: "inherit",
                    fontFamily: "inherit",
                }}
            />

            <div
                className={`form-control d-flex align-items-center justify-content-between ${
                    invalid ? "is-invalid" : ""
                }`}
                onClick={handleToggle}
                style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: disabled ? "#e9ecef" : "#fff",
                    minHeight: "38px",
                }}
            >
                <div style={{ flex: 1, overflow: "hidden", marginRight: 8 }}>
                    {getDisplayText()}
                </div>
                <div className="d-flex align-items-center gap-2">
                    {isLoading && (
                        <div className="jumping-dots-loader">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    )}
                    <i
                        className={`ri-arrow-${isOpen ? "up" : "down"}-s-line`}
                    />
                </div>
            </div>

            {isOpen && (
                <div
                    className="shadow rounded"
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        zIndex: 1050,
                        backgroundColor: "#fff",
                        marginTop: 4,
                        border: "1px solid rgba(0,0,0,.15)",
                        padding: 8,
                    }}
                >
                    <div className="mb-2">
                        <Input
                            type="text"
                            placeholder={t("Search...")}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            autoFocus
                            className="form-control-sm"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {options.length > 0 && (
                        <div
                            className="form-check border-bottom pb-2 mb-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <label className="form-check-label fw-bold">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    checked={areAllSelected}
                                    onChange={handleSelectAll}
                                />
                                {t("Select All")}
                            </label>
                        </div>
                    )}

                    <div
                        ref={listRef}
                        onScroll={handleScroll}
                        style={{ maxHeight: 90, overflowY: "auto" }}
                    >
                        {options.map((option) => (
                            <div
                                key={option.key}
                                className="form-check mb-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <label
                                    className="form-check-label d-flex align-items-center"
                                    style={{
                                        cursor: option.is_already_taken
                                            ? "not-allowed"
                                            : "pointer",
                                        color: option.is_already_taken
                                            ? "#999"
                                            : "inherit",
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        checked={value.includes(
                                            String(option.key),
                                        )}
                                        disabled={
                                            option.is_already_taken &&
                                            !value.includes(String(option.key))
                                        }
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                String(option.key),
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    {option.is_already_taken
                                        ? `${option.value}`
                                        : option.value}
                                </label>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="text-center p-2">
                                <Spinner size="sm" />
                            </div>
                        )}

                        {!isLoading && options.length === 0 && (
                            <div className="text-center text-muted p-2">
                                {t("No data")}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const JumpingDotsStyles = `
  .jumping-dots-loader {
    display: flex;
    gap: 2px;
  }
  .jumping-dots-loader .dot {
    width: 4px;
    height: 4px;
    background-color: #666;
    border-radius: 50%;
    animation: jumpingDots 0.8s infinite ease-in-out;
  }
  .jumping-dots-loader .dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  .jumping-dots-loader .dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes jumpingDots {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-4px); }
  }
`;

export default CheckboxSelect;

// Inject styles
if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = JumpingDotsStyles;
    document.head.appendChild(style);
}
