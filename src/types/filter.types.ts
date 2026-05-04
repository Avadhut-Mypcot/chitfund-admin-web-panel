export interface FilterPagination {
    currentPage: number;
    pageSize: number;
    isPersistPage?: boolean;
}

export interface FilterSort {
    sortOrder: string;
    sortColumn: string;
}

export interface FilterPageState<
    S extends Record<string, unknown> = Record<string, unknown>,
> {
    searchParams: S;
    pagination: FilterPagination;
    sort: FilterSort;
}

export interface FilterState {
    [pageKey: string]: FilterPageState;
}

export interface SetFilterStatePayload<
    S extends Record<string, unknown> = Record<string, unknown>,
> {
    pageKey: string;
    searchParams?: Partial<S>;
    pagination?: Partial<FilterPagination>;
    sort?: Partial<FilterSort>;
}
