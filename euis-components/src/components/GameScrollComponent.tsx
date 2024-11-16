
import 'coherent-gameface-scrollable-container';
import '../styles/GameScrollComponent.scss';
import { ReactNode } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'gameface-scrollable-container': GamefaceScrollableContainer
            'component-slot': GamefaceComponentSlotProps
        }
    }
}

interface GamefaceScrollableContainer extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    automatic?: boolean,
    class?: string
}
interface GamefaceComponentSlotProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    'data-name': string,
    class?: string
}

type GameScrollComponentProps = {
    contentClass?: string,
    parentContainerClass?: string
    children?: ReactNode
}

export const GameScrollComponent = ( { parentContainerClass, contentClass, children }: GameScrollComponentProps) => {
    return <gameface-scrollable-container class={"no-arrows " + parentContainerClass} automatic style={{
        display: "flex",
        flex: "1 1"
    }}>
        <component-slot data-name="scrollable-content" class={contentClass}>
            {children}
        </component-slot>
    </gameface-scrollable-container>
}