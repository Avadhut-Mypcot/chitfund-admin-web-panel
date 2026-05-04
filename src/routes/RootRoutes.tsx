import { Routes, Route } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import PageNotFound from "../components/PageNotFound";
import { ADMIN_URL_PATH } from "../constants/constants";

const RootRoutes = () => {
    return (
        <Routes>
            <Route path={`${ADMIN_URL_PATH}/*`} element={<MainRoutes />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default RootRoutes;
