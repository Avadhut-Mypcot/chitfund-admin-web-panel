import { lazy } from "react";
import {
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../hooks/redux";
import MainLayout from "../components/MainLayout";
import PageNotFound from "../components/PageNotFound";
import { ADMIN_URL_PATH } from "../constants/constants";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/slice/auth";
import { generalDebounceTime, inactivityTime } from "../constants/constants";

const MainDashBoard = lazy(() => import("../pages/dashboard/Index"));
const Login = lazy(() => import("../pages/auth/Login"));

const AuthenticateRouteWrapper = () => {
    const { token } = useAppSelector((state) => state.auth);
    return token ? (
        <Outlet />
    ) : (
        <Navigate to={`${ADMIN_URL_PATH}/login`} replace />
    );
};

const MainRoutes = () => {
    const { token } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleOnUserIdle = () => {
        if (token && location.pathname.includes(ADMIN_URL_PATH)) {
            dispatch(clearAuth());
            navigate(`${ADMIN_URL_PATH}/login`);
        }
    };
    useIdleTimer({
        timeout: inactivityTime,
        onIdle: handleOnUserIdle,
        debounce: generalDebounceTime,
    });

    return (
        <>
            <Routes>
                <Route
                    path={`/`}
                    element={
                        token ? (
                            <Navigate
                                to={`${ADMIN_URL_PATH}/dashboard`}
                                replace
                            />
                        ) : (
                            <Navigate to={`${ADMIN_URL_PATH}/login`} replace />
                        )
                    }
                />
                <Route path={`/login`} element={<Login />} />
                <Route element={<AuthenticateRouteWrapper />}>
                    <Route path={``} element={<MainLayout />}>
                        <Route path="dashboard" element={<MainDashBoard />} />
                    </Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                limit={5}
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default MainRoutes;
