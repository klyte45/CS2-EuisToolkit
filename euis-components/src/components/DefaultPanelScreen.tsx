import { GameScrollComponent } from "./GameScrollComponent";

type Props = {
    title: string;
    subtitle?: string;
    buttonsRowContent?: JSX.Element,
    children?: JSX.Element | JSX.Element[] | string,
    scrollable?: boolean,
    offsets?: {
        bottom?: number,
        left?: number,
        right?: number,
        top?: number
    }
    size?: 'h1' | 'h2' | 'h3'
}

export const DefaultPanelScreen = ({ title, subtitle, buttonsRowContent, children, scrollable, offsets, size }: Props) => {
    const titleStyle = { marginBottom: 0 }
    const subtitleStyle = { marginTop: 0, color: "var(--textColorDimmer)", fontWeight: 'normal' }
    return <>
        {size == 'h2' ? <h2 style={titleStyle} >{title}</h2> : size == 'h3' ? <h3 style={titleStyle}>{title}</h3> : <h1 style={titleStyle}>{title}</h1>}
        {subtitle && (size == 'h2' ? <h4 style={subtitleStyle}>{subtitle}</h4> : size == 'h3' ? <h5 style={subtitleStyle}>{subtitle}</h5> : <h3 style={subtitleStyle}>{subtitle}</h3>)}
        <section style={{
            overflow: "scroll", position: "absolute",
            bottom: (offsets?.bottom ?? 0) + (buttonsRowContent ? 52 : 5),
            left: offsets?.left ?? 5,
            right: offsets?.right ?? 5,
            top: offsets?.top ?? (size == 'h2' ? 55 : size == 'h3' ? 45 : 80) * (subtitle ? 1.5 : 1)
        }}>
            {scrollable ? <GameScrollComponent>{children}</GameScrollComponent> : children}
        </section>
        {buttonsRowContent && <div style={{ display: "flex", position: "absolute", left: "5rem", right: "5rem", bottom: "5rem", flexDirection: "row-reverse", maxHeight: "43rem" }}>
            {buttonsRowContent}
        </div>}
    </>

}

