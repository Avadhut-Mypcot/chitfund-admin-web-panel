import { useAppDispatch, useAppSelector } from "./redux";
import { setFilterState, resetFilterState } from "../redux/slice/filter";
import type {
    FilterStatePersistentFilter,
    PaginationPersistentFilter,
} from "../types/common.types";

export const usePersistentFilters = <T extends Record<string, any>>(
    pageKey: string,
) => {
    const dispatch = useAppDispatch();

    const defaultFilterState: FilterStatePersistentFilter = {
        searchParams: {} as T,
        pagination: { currentPage: 1, pageSize: 10, isPersistPage: false },
        sort: { sortColumn: "", sortOrder: "", isPersistPage: false },
    };

    const filterState = useAppSelector((state) => {
        const pageFilter = state.filters?.[pageKey] || {};

        return {
            searchParams: (pageFilter.searchParams ||
                defaultFilterState.searchParams) as T,
            pagination: {
                ...defaultFilterState.pagination,
                ...pageFilter.pagination,
            },
            sort: { ...defaultFilterState.sort, ...pageFilter.sort },
        };
    });

    const setFilters = (
        searchParams: T,
        pagination?: Partial<PaginationPersistentFilter>,
    ): void => {
        const currentPagination = filterState.pagination;
        setPagination({
            currentPage: 1,
            isPersistPage: false,
            pageSize: currentPagination.pageSize,
        });

        dispatch(setFilterState({ pageKey, searchParams, pagination }));
    };

    const setPagination = (
        pagination: Partial<PaginationPersistentFilter>,
    ): void => {
        dispatch(setFilterState({ pageKey, pagination }));
    };

    const setSort = (sort: { sortOrder: string; sortColumn: string }): void => {
        dispatch(setFilterState({ pageKey, sort }));
    };

    const resetFilters = (): void => {
        dispatch(resetFilterState(pageKey));
    };

    const allFilters = useAppSelector((state) => state.filters) || {};

    const resetOtherFilters = (): void => {
        Object.keys(allFilters).forEach((key) => {
            if (key !== pageKey) {
                dispatch(resetFilterState(key));
            }
        });
    };

    return {
        filters: filterState.searchParams,
        pagination: filterState.pagination,
        sort: filterState.sort,
        setFilters,
        setPagination,
        setSort,
        resetFilters,
        allFilters,
        resetOtherFilters,
    };
};
