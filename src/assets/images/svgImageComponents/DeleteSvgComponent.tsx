import * as React from "react";

const DeleteSvgComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width={props.width || 24}
        height={props.height || 24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
            stroke={props.color || "#E74C3C"}
            strokeWidth={1.5}
            strokeLinecap="round"
        />
        <path
            d="M20.5 6H3.49994"
            stroke={props.color || "#E74C3C"}
            strokeWidth={1.5}
            strokeLinecap="round"
        />
        <path
            d="M18.8334 8.5L18.3734 15.3991C18.1964 18.054 18.1079 19.3815 17.2429 20.1907C16.3779 21 15.0475 21 12.3867 21H11.6133C8.95254 21 7.62214 21 6.75713 20.1907C5.89212 19.3815 5.80362 18.054 5.62663 15.3991L5.16669 8.5"
            stroke={props.color || "#E74C3C"}
            strokeWidth={1.5}
            strokeLinecap="round"
        />
        <path
            d="M9.5 11L10 16"
            stroke={props.color || "#E74C3C"}
            strokeWidth={1.5}
            strokeLinecap="round"
        />
        <path
            d="M14.5 11L14 16"
            stroke={props.color || "#E74C3C"}
            strokeWidth={1.5}
            strokeLinecap="round"
        />
    </svg>
);

export default DeleteSvgComponent;
