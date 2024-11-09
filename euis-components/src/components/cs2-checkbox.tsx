import { Component, useState } from "react";
import { Cs2FormLine } from "./Cs2FormLine";

export interface Cs2CheckboxProps {
    title: string;
    isChecked: () => boolean;
    onValueToggle: (newVal: boolean) => void;
}

export const Cs2CheckboxWithLine = ({ title, onValueToggle, isChecked }: Cs2CheckboxProps) => <>
    <Cs2FormLine title={title} onClick={() => onValueToggle(!isChecked())}>
        <Cs2Checkbox isChecked={isChecked} onValueToggle={(x) => onValueToggle(x)} />
    </Cs2FormLine>
</>

interface Cs2CheckboxTitlelessProps {
    isChecked: () => boolean;
    onValueToggle: (newVal: boolean) => void;
}

export const Cs2Checkbox = ({ onValueToggle, isChecked }: Cs2CheckboxTitlelessProps) => <>
    <div className={`cs2-toggle cs2-item-mouse-states cs2-toggle2 ${isChecked() ? "checked" : "unchecked"}`} onClick={() => onValueToggle(!isChecked())}>
        <div className={`cs2-checkmark ${isChecked() ? "checked" : ""}`}></div>
    </div>
</>

export interface Cs2TriCheckboxProps {
    isChecked: true | false | null;
    onValueToggle: (newVal: true | false | null) => void;
}

const getNexState = (prev: true | false | null) => {
    switch (prev) {
        case true: return null;
        case null: return false;
        case false: return true;
    }
}

export const Cs2TriCheckbox = ({ isChecked, onValueToggle }: Cs2TriCheckboxProps) => <>
    <div className={`cs2-toggle cs2-item-mouse-states cs2-toggle2 ${isChecked == true ? "checked" : isChecked === null ? "forbid" : "unchecked"}`} onClick={() => onValueToggle(getNexState(isChecked))}>
        <div className={`cs2-checkmark ${isChecked == true ? "checked" : isChecked === null ? "forbid" : ""}`}></div>
    </div>
</>



