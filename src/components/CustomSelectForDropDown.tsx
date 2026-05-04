import React from "react";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";
import type { MenuListProps, GroupBase, Props } from "react-select";
import { Spinner } from "reactstrap";
import { getLocalizedEnumValue } from "../utils/common";
import type {
    DropdownItem,
    CustomSelectForDropDownProps,
} from "../types/common.types";
import { useLanguage } from "../context/LanguageContext";

interface FixedCustomSelectProps extends Omit<
    CustomSelectForDropDownProps,
    "value" | "onChange" | "options"
> {
    options?: DropdownItem[];
    value: DropdownItem | string | number | null;
    onChange: (value: DropdownItem) => void;
    isInvalid?: boolean;
    components?: any;
    onLoadMore?: () => void;
    paginationLoading?: boolean;
}

const PaginatedMenuList = (
    props: MenuListProps<any> & {
        selectProps: { onLoadMore?: () => void; paginationLoading?: boolean };
    },
) => {
    const { children, innerRef, innerProps } = props;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const isBottom =
            target.scrollHeight - target.scrollTop <= target.clientHeight + 5;

        if (
            isBottom &&
            props.selectProps.onLoadMore &&
            !props.selectProps.paginationLoading
        ) {
            props.selectProps.onLoadMore();
        }
    };

    return (
        <components.MenuList
            {...props}
            innerRef={innerRef}
            innerProps={{
                ...innerProps,
                onScroll: handleScroll,
            }}
        >
            {children}
            {props.selectProps.paginationLoading && (
                <div style={{ textAlign: "center", padding: "8px" }}>
                    <Spinner size="sm" />
                </div>
            )}
        </components.MenuList>
    );
};

// Create a typed version of Select that accepts our custom props
const SelectComponent = Select as React.ComponentType<
    Props<any, false, GroupBase<any>> & {
        onLoadMore?: () => void;
        paginationLoading?: boolean;
    }
>;

export const CustomSelectForDropDown: React.FC<FixedCustomSelectProps> = ({
    options,
    value,
    onChange,
    onBlur,
    placeholder = "Select",
    isClearable = true,
    isDisabled = false,
    isLoading = false,
    width = "",
    isValid = true,
    enumObj,
    components: componentsProp,
    noOptionsMessage,
    onLoadMore,
    paginationLoading = false,
    ...rest
}) => {
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();

    const transformedOptions =
        options?.map((opt) => ({
            value: opt,
            label: getLocalizedEnumValue(enumObj, opt.value, currentLanguage),
        })) || [];

    const isDropdownItem = (val: unknown): val is DropdownItem => {
        return (
            typeof val === "object" &&
            val !== null &&
            "key" in val &&
            "value" in val
        );
    };

    const selectedOption =
        transformedOptions.find((opt) => {
            if (isDropdownItem(value)) {
                return opt.value.key === value.key;
            } else if (typeof value === "string") {
                return opt.value.value === value || opt.value.key === value;
            }
            return false;
        }) ||
        (isDropdownItem(value)
            ? {
                  value: value,
                  label: getLocalizedEnumValue(
                      enumObj,
                      value.value,
                      currentLanguage,
                  ),
              }
            : null);

    const hasPagination = !!onLoadMore;

    const mergedComponents = React.useMemo(() => {
        return hasPagination
            ? { MenuList: PaginatedMenuList, ...componentsProp }
            : componentsProp;
    }, [hasPagination, componentsProp]);

    const showBuiltInLoading = hasPagination
        ? isLoading && (!options || options.length === 0)
        : isLoading;

    const isInvalidFinal = !isValid || rest.isInvalid;

    return (
        <SelectComponent
            {...rest}
            options={transformedOptions}
            value={selectedOption}
            isOptionDisabled={(option) =>
                option.value.is_already_taken === true
            }
            onChange={(selected) => {
                onChange(selected ? selected.value : (null as any));
            }}
            onBlur={onBlur}
            placeholder={t(placeholder)}
            isClearable={isClearable}
            isDisabled={isDisabled}
            isLoading={showBuiltInLoading}
            noOptionsMessage={noOptionsMessage || (() => "No data")}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            components={mergedComponents}
            onLoadMore={onLoadMore}
            paginationLoading={
                paginationLoading ||
                (hasPagination && isLoading && options && options.length > 0)
            }
            className={isInvalidFinal ? "is-invalid" : ""}
            classNamePrefix="react-select"
            styles={{
                control: (base, state) => ({
                    ...base,
                    boxShadow: isInvalidFinal
                        ? state.isFocused
                            ? "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
                            : "none"
                        : "none",
                    width: width,
                    borderColor: isInvalidFinal
                        ? "#dc3545"
                        : state.isFocused
                          ? "#2684ff"
                          : "#ced4da",
                    "&:hover": {
                        borderColor: isInvalidFinal
                            ? "#dc3545"
                            : state.isFocused
                              ? "#2684ff"
                              : "#ced4da",
                    },
                }),
                menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                }),
            }}
        />
    );
};
