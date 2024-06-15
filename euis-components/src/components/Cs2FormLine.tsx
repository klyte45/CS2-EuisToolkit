import { Component } from "react";
import '../styles/cs2-form-style.scss'


export class Cs2FormLine extends Component<{
    title: string | JSX.Element;
    onClick?: () => void;
    compact?: boolean
    className?: string
}, {}> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                <div className={["cs2-fieldStyle2", (this.props.compact ? "cs2-fieldStyle-compact" : "cs2-fieldStyle"), this.props.className ?? ""].join(" ")} onClick={() => this.props.onClick?.()}>
                    <div className="cs2-form-item-label cs2-form-item-label2">
                        {this.props.title}
                    </div>
                    {this.props.children}
                </div>
            </>
        );
    }
}
