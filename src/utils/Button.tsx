import React, { ReactElement } from "react";

export default function Button({
    children,
    onClick,
    type = "button",disabled=false,className="btn btn-primary"
}: buttonProps) {
    return (
        <button type={type} disabled={disabled} className={className} onClick={onClick}>
            {children}
        </button>
    );
}

interface buttonProps {
    children?: React.ReactNode;
    onClick?(): void;
    type?: "button" | "submit";
    disabled?:boolean;
    className?:string
}