import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
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
    subtitle: string,
    tooltip?: string
}

export const MainSideTabMenuComponent = (props: Props) => {
    const [expanded, setExpanded] = useState(false);
    return <>
        <Tabs className={`mainTabsContainer ${expanded ? "expanded" : ""}`} onSelect={() => setExpanded(false)}>
            <div onClick={x => setExpanded(!expanded)} className="topMainMenuButton" data-tooltip={props.tooltip ?? props.modTitle} data-tootip-position="bottom left">
                <img src={props.mainIconUrl} className="tabItemIcon" />
                <div className="titleContainer">
                    <div className="tabName">{props.modTitle}</div>
                    <div className="tabSubName">{props.subtitle}</div>
                </div>
            </div>
            <TabList className="mainMenuStrip">
                <GameScrollComponent>
                    {props.items.map((x, i) => <Tab key={i} className="mainMenuStripTab" data-tooltip={x.name} data-tootip-position="top left">
                        {!x.tintedIcon && <img src={x.iconUrl} className="tabItemIcon" />}
                        {x.tintedIcon && <div className="tabItemIcon" style={{ maskImage: `url(${x.iconUrl})` }} />}
                        <div className="tabName">{x.name}</div>
                    </Tab>)}
                </GameScrollComponent>
            </TabList>
            {props.items.map((x, i) => <TabPanel className="mainMenuStripContent" key={i}>{x.panelContent}</TabPanel>)}
        </Tabs>
    </>
}
