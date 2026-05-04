import { combineReducers } from "@reduxjs/toolkit";
import type { Reducer } from "@reduxjs/toolkit";
import type { PersistConfigProps } from "../../types/reduxreducer.types";
import authSlice from "../slice/auth";
import drawerMenuSlice from "../slice/drawerMenu";
import networkSlice from "../slice/internet";
import filterSlice from "../slice/filter";

const rootReducer: Reducer<PersistConfigProps> = combineReducers({
    drawerMenu: drawerMenuSlice,
    auth: authSlice,
    network: networkSlice,
    filters: filterSlice,
});

export default rootReducer;
