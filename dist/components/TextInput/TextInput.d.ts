import { InputHTMLAttributes } from 'react';

export type TextInputState = "default" | "danger" | "success" | "read-only" | "highlighted" | "disabled";
export type TextInputHintType = "neutral" | "danger" | "success";
export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "disabled" | "readOnly"> {
    /** Visible label rendered to the left of the input. */
    label?: string;
    /** Appends an asterisk to the label and sets aria-required. */
    required?: boolean;
    /** Shows a help icon next to the label. */
    helpIcon?: boolean;
    /** Validation / behavioural state. Defaults to "default". */
    state?: TextInputState;
    /** Optional unit suffix inside the trailing edge (e.g. "USD", "kg"). */
    unit?: string;
    /** Helper / error text rendered below the input. */
    hint?: string;
    /** Colour variant of the hint message. Defaults to "neutral". */
    hintType?: TextInputHintType;
}
export declare const TextInput: import('react').ForwardRefExoticComponent<TextInputProps & import('react').RefAttributes<HTMLInputElement>>;
