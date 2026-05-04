import type { ReactNode } from "react";

export const requiredFieldAsteriskSpan: ReactNode = (
    <span className="text-danger">*</span>
);

export const formatViewField = (value: unknown): string => {
    if (value === 0 || value === "0") return "0";
    if (
        value == null ||
        value === "null" ||
        value === "undefined" ||
        (typeof value === "string" && value.trim() === "")
    ) {
        return "-";
    }
    return String(value);
};
