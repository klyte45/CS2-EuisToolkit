import { Component, ReactNode } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "../styles/mainSideTabs.scss";
import { GameScrollComponent } from "./GameScrollComponent";

export type MenuItem = {
    name: string,
    iconUrl: string,
    panelContent: JSX.Element
    tintedIcon?: boolean
}

type Props = {
    items: MenuItem[],
    mainIconUrl: string,
    modTitle: string,
    subtitle: string
}
type State = {
    expanded?: boolean
}

export class MainSideTabMenuComponent extends Component<Props, State> {

    render(): ReactNode {
        return <>
            <Tabs className={`mainTabsContainer ${this.state?.expanded ? "expanded" : ""}`} onSelect={() => this.setState({ expanded: false })}>
                <div onClick={x => this.setState({ expanded: !this.state?.expanded })} className="topMainMenuButton" data-tooltip={this.props.modTitle} data-tootip-position="bottom left">
                    <img src={this.props.mainIconUrl} className="tabItemIcon" />
                    <div className="titleContainer">
                        <div className="tabName">{this.props.modTitle}</div>
                        <div className="tabSubName">{this.props.subtitle}</div>
                    </div>
                </div>
                <TabList className="mainMenuStrip">
                    <GameScrollComponent>
                        {this.props.items.map((x, i) => <Tab key={i} className="mainMenuStripTab" data-tooltip={x.name} data-tootip-position="top left">
                            {!x.tintedIcon && <img src={x.iconUrl} className="tabItemIcon" />}
                            {x.tintedIcon && <div className="tabItemIcon" style={{ maskImage: `url(${x.iconUrl})` }} />}
                            <div className="tabName">{x.name}</div>
                        </Tab>)}
                    </GameScrollComponent>
                </TabList>
                {this.props.items.map((x, i) => <TabPanel className="mainMenuStripContent" key={i}>{x.panelContent}</TabPanel>)}
            </Tabs>
        </>
    }
}
