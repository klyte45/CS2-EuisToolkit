
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "../styles/cs2-side-tabs-menu.scss";
import "../styles/react-tabs.scss";

type H2 = {
    type: "H2",
    title: string
}

type Props<X extends string> = {
    componentsMapViewer: Record<X, JSX.Element>,
    clickableTabs?: X[]
    tabsOrder: (X | H2 | undefined)[]
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
        <Tabs selectedIndex={tabsOrder.filter(x => typeof x == "string").indexOf(currentTab)} onSelect={y => onSetCurrentTab(tabsOrder.filter(x => typeof x == "string")[y] as X)} className={"cs2-side-tab"}>
            <TabList className="sideNav" >
                {tabsOrder.map((x, i) => !x ? <div className="space" key={i}></div>
                    : typeof x == "object" ? <div className={x.type} key={i}>{x.title}</div>
                        : <Tab key={i} disabled={Array.isArray(clickableTabs) && !clickableTabs.includes(x)}>{translateFn(i18nTitlePrefix + x)}</Tab>
                )}
            </TabList>
            <div className="dataPanel">
                {tabsOrder.map((x, i) => x && typeof x == "string" && <TabPanel key={i}>{componentsMapViewer[x]}</TabPanel>)}
            </div>
        </Tabs>
    </>

