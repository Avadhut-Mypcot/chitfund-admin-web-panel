import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DrawerMenuState } from "../../types/drawermenu.types";

const initialState: DrawerMenuState = {
    isDrawerFullOpen: false,
    isLargerScreen: false,
};

const drawerMenuSlice = createSlice({
    name: "drawerMenu",
    initialState,
    reducers: {
        toggleIsDrawerFullOpen: (state, action: PayloadAction<boolean>) => {
            state.isDrawerFullOpen = action.payload;
        },
        resetToggleForDrawer: (state) => {
            state.isDrawerFullOpen = false;
        },
        setIsLargerScreen: (state, action: PayloadAction<boolean>) => {
            state.isLargerScreen = action.payload;
        },
    },
});

export const {
    toggleIsDrawerFullOpen,
    resetToggleForDrawer,
    setIsLargerScreen,
} = drawerMenuSlice.actions;

export default drawerMenuSlice.reducer;
