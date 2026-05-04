import React, { useState } from "react";

type FullscreenDocument = Document & {
    mozCancelFullScreen?: () => void;
    webkitCancelFullScreen?: () => void;
    cancelFullScreen?: () => void;
    fullscreen?: boolean;
    fullscreenElement?: Element | null;
};

type FullscreenElement = HTMLElement & {
    mozRequestFullScreen?: () => void;
    webkitRequestFullscreen?: () => void;
};

const FullScreenDropdown: React.FC = () => {
    const [isFullScreenMode, setIsFullScreenMode] = useState(true);

    const toggleFullscreen = () => {
        const doc: FullscreenDocument = window.document;
        const element: FullscreenElement = doc.documentElement;

        doc.body.classList.add("fullscreen-enable");

        if (!doc.fullscreenElement) {
            setIsFullScreenMode(false);
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
        } else {
            setIsFullScreenMode(true);
            if (doc.cancelFullScreen) {
                doc.cancelFullScreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else if (doc.webkitCancelFullScreen) {
                doc.webkitCancelFullScreen();
            }
        }

        const exitHandler = () => {
            if (!doc.fullscreenElement) {
                doc.body.classList.remove("fullscreen-enable");
            }
        };

        doc.addEventListener("fullscreenchange", exitHandler);
        doc.addEventListener("webkitfullscreenchange", exitHandler);
        doc.addEventListener("mozfullscreenchange", exitHandler);
    };

    return (
        <div className="header-item d-none d-sm-flex">
            <button
                onClick={toggleFullscreen}
                type="button"
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
            >
                <i
                    className={
                        isFullScreenMode
                            ? "ri-fullscreen-line fs-22"
                            : "ri-fullscreen-exit-line fs-22"
                    }
                ></i>
            </button>
        </div>
    );
};

export default React.memo(FullScreenDropdown);
