
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "../styles/cs2-side-tabs-menu.scss";
import "../styles/react-tabs.scss";

type Props<X extends string> = {
    componentsMapViewer: Record<X, JSX.Element>,
    clickableTabs?: X[]
    tabsOrder: (X | undefined)[]
    currentTab: X
    i18nTitlePrefix: string
    translateFn: (key: string, fallback?: string) => string
    onSetCurrentTab: (newTab: X) => void
};

export const Cs2SideTabs = <X extends string>({
    componentsMapViewer,
    clickableTabs,
    tabsOrder,
    currentTab,
    i18nTitlePrefix,
    translateFn,
    onSetCurrentTab
}: Props<X>) => <>
        <Tabs selectedIndex={tabsOrder.filter(x => x != undefined).indexOf(currentTab)} onSelect={y => onSetCurrentTab(tabsOrder.filter(x => x != undefined)[y])} className={"cs2-side-tab"}>
            <TabList className="sideNav" >
                {tabsOrder.map((x, i) => !x
                    ? <div className="space" key={i}></div>
                    : <Tab key={i} disabled={Array.isArray(clickableTabs) && !clickableTabs.includes(x)}>{translateFn(i18nTitlePrefix + x)}</Tab>
                )}
            </TabList>
            <div className="dataPanel">
                {tabsOrder.map((x, i) => x && <TabPanel key={i}>{componentsMapViewer[x]}</TabPanel>)}
            </div>
        </Tabs>
    </>

