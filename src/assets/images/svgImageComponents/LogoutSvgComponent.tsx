import * as React from "react";
const LogoutSvgComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width={props.width || 24}
        height={props.height || 24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M12 2V12M7 5.5C5.39456 6.57268 4.17664 8.13324 3.52614 9.95119C2.87564 11.7691 2.82704 13.7481 3.38751 15.5958C3.94799 17.4435 5.08782 19.062 6.63867 20.2122C8.18953 21.3624 10.0692 21.9833 12 21.9833C13.9308 21.9833 15.8105 21.3624 17.3613 20.2122C18.9122 19.062 20.052 17.4435 20.6125 15.5958C21.173 13.7481 21.1244 11.7691 20.4739 9.95119C19.8234 8.13324 18.6054 6.57268 17 5.5"
            stroke="#F9F4F0"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default LogoutSvgComponent;
