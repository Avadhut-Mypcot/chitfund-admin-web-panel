import type { PermissionObj } from "../types/common.types";

export const getLocalizedEnumValue = (
    enumObj: Record<string, Record<string, string>> | undefined,
    value?: string,
    locale = "en",
) => {
    if (!enumObj) return value;

    const key = Object.keys(enumObj.en).find(
        (enumKey) => enumKey === value || enumObj.en[enumKey] === value,
    );

    if (!key) return value;
    return enumObj[locale]?.[key] ?? enumObj.en[key];
};

export const isDefaultImage = (imageUrl: string) => {
    return imageUrl.includes("/default");
};

let cachedIsHead: boolean = false;
export const getIsHead = (): boolean => {
    try {
        const root = localStorage.getItem("persist:root");
        if (!root) return cachedIsHead;

        const parsedRoot = JSON.parse(root);
        if (!parsedRoot.auth) return cachedIsHead;

        const authObj = JSON.parse(parsedRoot.auth);
        cachedIsHead = authObj?.user?.is_head ?? false;
    } catch (e) {
        console.error("Error parsing persist:root", e);
    }

    return cachedIsHead;
};

export const hasPermission = (
    permissions: Array<string | PermissionObj> | null | undefined,
    codename: string,
): boolean => {
    const isHead = getIsHead();

    if (isHead) return true;
    if (!permissions || permissions.length === 0) return false;

    if (typeof permissions[0] === "string") {
        return (permissions as string[]).includes(codename);
    }
    return (permissions as PermissionObj[]).some(
        (p) => p?.codename === codename,
    );
};
