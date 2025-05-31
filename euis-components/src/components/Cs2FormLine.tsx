import { Component, ReactNode, useRef } from "react";
import '../styles/cs2-form-style.scss'

export const Cs2FormBoundaries = ({ children, className }: {
    children: ReactNode,
    className?: string
}) => {
    function onKeyUp(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Tab" && ["INPUT", "BUTTON"].includes((e.target as Node).nodeName)) {
            let topParent = e.target as HTMLElement;
            while (topParent && !topParent.classList.contains("cs2-formBoundaries")) {
                topParent = (topParent as HTMLElement).parentElement;
            }
            const inputList = [...(topParent ?? document).querySelectorAll("input,button") as any].filter((x: HTMLElement) => !x.hasAttribute("disabled"));
            const idx = inputList.indexOf(e.target as any);
            const nextElement = inputList[(idx + (e.shiftKey ? -1 : 1) + inputList.length) % inputList.length] as HTMLElement;
            if (nextElement) {
                nextElement?.focus();
            }
        }
    }
    return <div className={["cs2-formBoundaries", className].join(" ")} onKeyUp={onKeyUp}>{children}</div>;
};

type Props = {
    title: string | JSX.Element;
    onClick?: () => void;
    compact?: boolean
    className?: string
    subtitle?: string | JSX.Element
    children?: ReactNode
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
                    <div className="title">{title}</div>
                    <div className="subtitle">{subtitle}</div>
                </div>
                <div className="cs2-form-item-content">
                    {children}
                </div>
            </div>
        </>
    );
}

