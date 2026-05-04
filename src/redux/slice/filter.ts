import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    FilterPageState,
    FilterState,
    SetFilterStatePayload,
} from "../../types/filter.types";

const initialState: FilterState = {};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilterState<
            S extends Record<string, unknown> = Record<string, unknown>,
        >(state: FilterState, action: PayloadAction<SetFilterStatePayload<S>>) {
            const { pageKey, searchParams, pagination, sort } = action.payload;

            if (!state[pageKey]) {
                state[pageKey] = {
                    searchParams: {} as S,
                    pagination: {
                        currentPage: 1,
                        pageSize: 10,
                        isPersistPage: false,
                    },
                    sort: { sortColumn: "", sortOrder: "" },
                };
            }

            const pageState = state[pageKey] as FilterPageState<S>;

            if (searchParams) {
                pageState.searchParams = {
                    ...pageState.searchParams,
                    ...searchParams,
                } as S;
            }

            if (pagination) {
                pageState.pagination = {
                    ...pageState.pagination,
                    ...pagination,
                };
            }

            if (sort) {
                pageState.sort = {
                    ...pageState.sort,
                    ...sort,
                };
            }
        },

        resetFilterState(state, action: PayloadAction<string>) {
            const pageKey = action.payload;
            delete state[pageKey];
        },
    },
});

export const { setFilterState, resetFilterState } = filterSlice.actions;
export default filterSlice.reducer;
