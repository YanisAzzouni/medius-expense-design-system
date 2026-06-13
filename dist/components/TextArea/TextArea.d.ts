import { TextareaHTMLAttributes } from 'react';

export type TextAreaState = "default" | "danger" | "success" | "read-only" | "highlighted" | "disabled";
export type TextAreaHintType = "neutral" | "danger" | "success";
export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "disabled" | "readOnly"> {
    /** Visible label rendered to the left of the textarea. */
    label?: string;
    /** Appends an asterisk to the label and sets aria-required. */
    required?: boolean;
    /** Shows a help icon next to the label. */
    helpIcon?: boolean;
    /** Validation / behavioural state. Defaults to "default". */
    state?: TextAreaState;
    /** Helper / error text rendered below the textarea. */
    hint?: string;
    /** Colour variant of the hint message. Defaults to "neutral". */
    hintType?: TextAreaHintType;
}
export declare const TextArea: import('react').ForwardRefExoticComponent<TextAreaProps & import('react').RefAttributes<HTMLTextAreaElement>>;
