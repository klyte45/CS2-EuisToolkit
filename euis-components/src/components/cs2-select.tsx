
import Select, { ActionMeta, GetOptionLabel, GetOptionValue, GroupBase, OnChangeValue, OptionsOrGroups, PropsValue } from 'react-select';
import '../styles/cs2-select.scss'

export const Cs2Select = <Option, Group extends GroupBase<Option>>(props: {
    value?: PropsValue<Option>,
    options?: OptionsOrGroups<Option, Group>,
    onChange?: (newValue: Option, actionMeta: ActionMeta<Option>) => void
    getOptionLabel?: GetOptionLabel<Option>,
    getOptionValue?: GetOptionValue<Option>,
    defaultValue?: Option,
}) => <>
        <Select
            options={props.options ?? []}
            className="react-select-container"
            aria-live="off"
            closeMenuOnSelect={false}
            menuPortalTarget={document.body.querySelector("[data-safe-name]")}
            menuPosition="absolute"
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
            value={props.value ?? null}
            unstyled={true}
            filterOption={(x, input) => (x.label ?? "").toLowerCase().includes(input.toLowerCase())}
            defaultValue={props.defaultValue ?? null}
            menuShouldScrollIntoView={false}
            menuPlacement='auto'
        />
    </>

