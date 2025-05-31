import { ColorUtils } from "../utility/ColorUtils";
import { CSSProperties, Component, KeyboardEvent, useState } from "react";
import { Cs2FormLine } from "./Cs2FormLine";
import '../styles/cs2-form-style.scss'

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
    disabled?: boolean;
}

export const Input = (props: InputProps) => <>
    <Cs2FormLine {...props}>
        <SimpleInput {...props} />
    </Cs2FormLine>
</>




export const SimpleInput = (props: Omit<InputProps, 'title'> & { className?: string }) => {

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
                className={["cs2-value-field cs2-form-value", checkInvalidClasses(), props.className].join(" ")}
                onChange={x => setValue(x.target.value)}
                onKeyDown={(x) => onKeyDown(x)}
                onBlur={async () => setValue(await onValueChanged(value))}
                maxLength={props.maxLength}
                onKeyUp={(x) => props.extraKeyPressFilter?.(x)}
                disabled={props.disabled}
            />
        </>
    );
}

type NumberSimpleInputProps = {
    subtitle?: string | JSX.Element;
    getValue: () => number;
    onValueChanged: (newVal: number) => number | Promise<number>;
    isValid?: (newVal: string) => boolean;
    onTab?: (newVal: string, shiftDown: boolean) => string;
    cssCustomOverrides?: {
        backgroundColor?: (value: string) => string,
        color?: (value: string) => string,
        fontWeight?: CSSProperties['fontWeight']
    };
    maxLength?: number;
    extraKeyPressFilter?: (x: KeyboardEvent<HTMLInputElement>) => void;
    className?: string;
    precision?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
};


export const NumberSimpleInput = (props: NumberSimpleInputProps) => {
    const { getValue, onValueChanged, precision, min, max } = props;
    return <SimpleInput {...props} isValid={(x) => {
        const parsed = parseFloat(x?.replace(",", "."));
        return !isNaN(parsed) && isFinite(parsed) && parsed >= (min ?? -Infinity) && parsed <= (max ?? +Infinity) && (props.isValid ? props.isValid(x) : true);
    }} getValue={() => {
        const value = getValue();
        if (isNaN(value) || !isFinite(value)) { return ""; }
        return value.toFixed(precision ?? 3);
    }}
        onValueChanged={async (x) => {
            const result = await onValueChanged(parseFloat(x?.replace(",", ".")));
            if (isNaN(result) || !isFinite(result)) { return ""; }
            return result.toFixed(precision ?? 3);
        }} />
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