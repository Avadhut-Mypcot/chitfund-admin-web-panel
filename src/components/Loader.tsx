import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderImage from "../assets/Timeline14.gif";
import type { LoaderProps } from "../types/common.types";

const Loader: React.FC<LoaderProps> = (props) => {
    const { isButton = false, error } = props;

    if (error) {
        toast.error(error, {
            position: document.dir === "rtl" ? "top-left" : "top-right",
            hideProgressBar: false,
            progress: undefined,
            toastId: "",
        });
    }

    return (
        <div
            className={`d-flex justify-content-center ${
                isButton ? "m-0" : "mx-2 mt-2"
            }`}
        >
            <img
                src={LoaderImage}
                alt="Loading..."
                className={isButton ? "sm" : "md"}
                style={{
                    width: isButton ? "24px" : "64px",
                    height: isButton ? "24px" : "64px",
                }}
            />
        </div>
    );
};

export default Loader;
