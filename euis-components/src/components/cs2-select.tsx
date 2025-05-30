
import Select, { ActionMeta, GetOptionLabel, GetOptionValue, GroupBase, OnChangeValue, OptionsOrGroups, PropsValue } from 'react-select';
import '../styles/cs2-select.scss'
const styleProxy = new Proxy({}, {
    get: (target, propKey) => () => { }
});
export const Cs2Select = <Option, Group extends GroupBase<Option>>(props: {
    value?: PropsValue<Option>,
    options?: OptionsOrGroups<Option, Group>,
    onChange?: (newValue: Option, actionMeta: ActionMeta<Option>) => void
    getOptionLabel?: GetOptionLabel<Option>,
    getOptionValue?: GetOptionValue<Option>,
    defaultValue?: Option,
}) => <>
        <Select
            styles={styleProxy}
            options={props.options}
            className="react-select-container"
            aria-live="off"
            closeMenuOnSelect={false}
            classNames={{
                valueContainer: () => "value-container",
                control: () => "value-control",
                indicatorsContainer: () => "indicators-container",
                menuList: () => "menu-list",
                menu: () => "list-box",
                option: () => "option",
                input: () => "input"
            }}
            getOptionLabel={props.getOptionLabel}
            getOptionValue={props.getOptionValue}
            onChange={props.onChange}
            value={props.value}
            unstyled={true}
            filterOption={(x, input) => (x.label ?? "").toLowerCase().includes(input.toLowerCase())}
            defaultValue={props.defaultValue}
        />
    </>

