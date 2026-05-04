import { useEffect } from "react";
import "./App.css";
import "./assets/css/Style.css";
import "./assets/Scss/themes.scss";
import "remixicon/fonts/remixicon.css";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setOffline, setOnline } from "./redux/slice/internet";
import NoInternetConnection from "./components/NoInternetConnection";
import RootRoutes from "./routes/RootRoutes";

function App() {
    const dispatch = useAppDispatch();
    const { isOnline } = useAppSelector((state) => state.network);

    useEffect(() => {
        const handleOnline = () => dispatch(setOnline());
        const handleOffline = () => dispatch(setOffline());
        const handleManualOffline = () => dispatch(setOffline());

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        window.addEventListener("network-offline", handleManualOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("network-offline", handleManualOffline);
        };
    }, [dispatch]);

    return (
        <>
            {isOnline ? (
                <RootRoutes />
            ) : (
                <NoInternetConnection
                    onRetry={() => window.location.reload()}
                />
            )}
        </>
    );
}

export default App;
