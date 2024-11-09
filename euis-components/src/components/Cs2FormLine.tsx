import { Component } from "react";
import '../styles/cs2-form-style.scss'

type Props = {
    title: string | JSX.Element;
    onClick?: () => void;
    compact?: boolean
    className?: string
    subtitle?: string | JSX.Element
    children?: JSX.Element | JSX.Element[] | string
}

export const Cs2FormLine = ({
    title,
    onClick,
    compact,
    className,
    subtitle,
    children,
}: Props) => {
    return (
        <>
            <div className={["cs2-fieldStyle2", (compact ? "cs2-fieldStyle-compact" : "cs2-fieldStyle"), className ?? ""].join(" ")} onClick={() => onClick?.()}>
                <div className="cs2-form-item-label cs2-form-item-label2">
                    {title}
                    {subtitle}
                </div>
                {children}
            </div>
        </>
    );
}

