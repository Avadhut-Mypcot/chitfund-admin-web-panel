import type { AuthState } from "./auth.types";
import type { DrawerMenuState } from "./drawermenu.types";
import type { NetworkState } from "./internet.types";
import type { FilterState } from "./filter.types";

export type PersistConfigProps = {
    drawerMenu: DrawerMenuState;
    auth: AuthState;
    network: NetworkState;
    filters: FilterState;
};
