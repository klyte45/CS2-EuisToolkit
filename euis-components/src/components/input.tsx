import { ColorUtils } from "../utility/ColorUtils";
import { CSSProperties, Component, KeyboardEvent, useState } from "react";

interface InputProps {
    title: string | JSX.Element;
    subtitle?: string | JSX.Element;
    getValue: () => string;
    onValueChanged: (newVal: string) => string | Promise<string>;
    isValid?: (newVal: string) => boolean
    onTab?: (newVal: string, shiftDown: boolean) => string
    cssCustomOverrides?: {
        backgroundColor?: (value: string) => string,
        color?: (value: string) => string,
        fontWeight?: CSSProperties['fontWeight']
    }
    maxLength?: number,
    extraKeyPressFilter?: (x: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = (props: InputProps) => <>
    <div className="cs2-fieldStyle cs2-fieldStyle2">
        <div className="cs2-form-item-label cs2-form-item-label2">
            {props.title}
            {props.subtitle}
        </div>
        <SimpleInput {...props} />
    </div>
</>




export const SimpleInput = (props: Omit<InputProps, 'title'>) => {

    const [value, setValue] = useState(props.getValue());
    const [refValue, setRefValue] = useState(props.getValue());

    function onKeyDown(x: KeyboardEvent<HTMLInputElement>): void {
        if (x.key == "Escape") {
            const currentTarget = x.currentTarget;
            setValue(props.getValue())
            currentTarget.value = value
            currentTarget.blur();
        } else if (x.key == "Enter") {
            if (!props.isValid || props.isValid(x.currentTarget.value)) {
                x.currentTarget.blur();
            }
        } else if (x.key == "Tab") {
            if (props.onTab) {
                setValue(props.onTab(value, x.shiftKey))
            }
        }
    }


    function checkInvalidClasses() {
        if (props.isValid && !props.isValid(value)) {
            return "input_invalidValue"
        }
    }

    const { onValueChanged } = props;
    const currentOuterValue = props.getValue();
    let targetValue = value;
    if (currentOuterValue != refValue) {
        setValue(targetValue = props.getValue())
        setRefValue(props.getValue())

    }
    const overrideStyle: any = { width: "50%" };
    if (props.cssCustomOverrides && (!props.isValid || props.isValid(value))) {
        overrideStyle.backgroundColor = props.cssCustomOverrides.backgroundColor?.(value);
        overrideStyle.color = props.cssCustomOverrides.color?.(value);
        overrideStyle.fontWeight = props.cssCustomOverrides.fontWeight;
    }
    return (
        <>
            <input style={overrideStyle}
                value={targetValue}
                className={"cs2-value-field cs2-form-value " + checkInvalidClasses()}
                onChange={x => setValue(x.target.value)}
                onKeyDown={(x) => onKeyDown(x)}
                onBlur={async () => setValue(await onValueChanged(value))}
                maxLength={props.maxLength}
                onKeyDownCapture={(x) => props.extraKeyPressFilter?.(x)}
            />
        </>
    );


}



export const ColorRgbInput = (props: ColorInputProps) => <Input
    {...props}
    cssCustomOverrides={{
        backgroundColor: (val) => ColorUtils.toRGB6(val),
        color: (val) => {
            let rgb = ColorUtils.toRGB6(val);
            return rgb ? ColorUtils.toRGBA(ColorUtils.getContrastColorFor(ColorUtils.toColor01(rgb))) : "";
        },
        fontWeight: 'bold'
    }}
    maxLength={7}
    isValid={x => !!ColorUtils.getHexRegexParts(x)}
    onValueChanged={(x) => props.onValueChanged(ColorUtils.toRGB6(x))} />

interface ColorInputProps {
    title: string;
    getValue: () => `#${string}`;
    onValueChanged: (newVal: `#${string}`) => `#${string}` | Promise<`#${string}`>;
    onTab?: (newVal: `#${string}`, shiftDown: boolean) => `#${string}`;
}