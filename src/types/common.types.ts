import type { ReactNode, CSSProperties } from "react";
import type { AVAILABLE_LANGUAGES } from "../locale/helpers/languages";
import type { TFunction } from "i18next";

export interface BreadCrumbProps {
    title: string;
    pageTitle: { name: string; path: string }[];
}

export interface DropdownItem {
    key: number | string;
    value: string;
    extra_key?: string;
    extra_id?: string;
    is_already_taken?: boolean;
}

export interface CheckboxSelectProps {
    options: DropdownItem[];
    value: string[];
    onChange: (selectedValues: string[]) => void;
    placeholder?: string;
    isLoading?: boolean;
    onLoadMore?: () => void;
    onSearch?: (searchTerm: string) => void;
    onOpen?: () => void;
    disabled?: boolean;
    invalid?: boolean;
    customLabels?: Record<string, string>;
}

export interface RawOption {
    key: number | string;
    value: string;
}

type LocalizedEnum = Record<string, Record<string, string>>;

export interface CustomSelectForDropDownProps {
    options: RawOption[];
    value?: string | boolean | number | null;
    onChange: (selectedId: number | string | null) => void;
    onBlur?: () => void;
    placeholder?: string;
    isClearable?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    styles?: CSSProperties;
    width?: string | number;
    isValid?: boolean;
    enumObj?: LocalizedEnum;
    components?: any;
    onLoadMore?: () => void;
    onInputChange?: (
        inputValue: string,
        { action }: { action: string },
    ) => void;
    noOptionsMessage?: (obj: { inputValue: string }) => ReactNode;
    filterOption?: any;
}

export interface LanguageContextType {
    currentLanguage: string;
    setLanguage: (langCode: string) => void;
    availableLanguages: typeof AVAILABLE_LANGUAGES;
}

export interface Language {
    code: string;
    name: string;
    flag: string;
    flagAlt: string;
    nativeName: string;
    image: string;
}

export interface ImagePreviewComponentProps {
    imageUrl: string;
    altText?: string;
    className?: string;
    wrapperClassName?: string;
    showTitle?: boolean;
    title?: string;
}

export interface ImagePreviewModalProps {
    isOpen: boolean;
    toggle: () => void;
    imageUrl?: string;
    alt?: string;
    title?: string;
}

export interface LoaderProps {
    isButton?: boolean;
    error?: boolean | string | null;
}

export interface CustomModalProps {
    show: boolean;
    title: string;
    description: string;
    btn1Text: string;
    btn2Text: string;
    btn1Click: () => void;
    btn2Click: () => void;
}

export interface ConfirmationModalProps {
    show: boolean;
    title: string;
    description: string;
    descriptionAddon: string;
    btn1Text: string;
    btn2Text: string;
    btn1Click: () => void;
    btn2Click: () => void;
}

export interface HeaderProps {
    layoutModeType: string | undefined;
    headerClass: string | undefined;
    isLargerScreen: boolean;
    toggleSidebar: () => void;
}

export interface LanguageButtonsProps {
    languages: Language[];
    activeLanguage: string;
    onLanguageChange: (code: string) => void;
    className?: string;
}

export interface ResetConfirmationModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
}

export interface Action<T> {
    type: "edit" | "delete" | "view" | "status" | "updatePassword";
    onClick: (row: T) => void;
    shouldRender?: (row: T) => boolean;
    permissionCode: string;
}

export interface TableProps<T> {
    headers: string[];
    rows: T[];
    rowRenderer: (row: T) => React.ReactNode[];
    previousPage: () => void;
    canPreviousPage: boolean;
    nextPage: () => void;
    canNextPage: boolean;
    currentPage: number;
    lastPage: number;
    isLimit: boolean;
    handleLimitChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    limit: number;
    actions?: Action<T>[];
    noDataMessage?: string | null;
    isImage?: boolean;
    totalCount?: number;
    sortColumn?: string;
    sortOrder?: string;
    sortMappings?: Record<string, string>;
    setSort?: (sortConfig: { sortOrder: string; sortColumn: string }) => void;
}

export interface RenderActionButtonProps<T> {
    type: "edit" | "delete" | "status" | "view" | "updatePassword";
    row: T;
    rowIndex: number;
    action: Action<T>;
    t: TFunction;
}

export type SortOrderPersistentFilter = "" | "asc" | "desc";

export interface PaginationPersistentFilter {
    currentPage: number;
    pageSize: number;
    isPersistPage?: boolean;
}

export interface SortPersistentFilter {
    sortColumn: string;
    sortOrder: SortOrderPersistentFilter;
    isPersistPage?: boolean;
}

export interface FilterStatePersistentFilter {
    searchParams: Record<string, string | number | boolean>;
    pagination: PaginationPersistentFilter;
    sort: SortPersistentFilter;
}

export type PermissionObj = {
    codename: string;
    parent_id?: number;
    id?: number;
};

export interface VerticalLayoutProps {
    layoutType?: string;
    toggleSidebar: () => void;
    isLargeScreen: boolean;
    children?: React.ReactNode;
}

export interface SubMenuItem {
    id: string;
    label: string;

    link?: string;
    isActive?: boolean;

    parentId?: string;

    isChildItem?: boolean;
    stateVariables?: boolean;
    click?: () => void;
    childItems?: SubMenuItem[];
}

export interface MenuItem {
    id: string;
    label: string | React.ReactNode;
    icon?: string;
    iconSvg?: React.ReactNode | ((color: string) => React.ReactNode);
    link?: string;
    stateVariables?: boolean;
    isActive?: boolean;
    hasSubItems?: boolean;
    click: (e: React.MouseEvent<HTMLElement>) => void;
    subItems?: SubMenuItem[];
}

export interface MenuStates {
    isDashboard: boolean;
}

export interface UrlPaths {
    dashboard: string[];
}
