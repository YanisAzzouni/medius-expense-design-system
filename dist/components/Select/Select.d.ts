import { ReactNode } from 'react';

export interface SelectOption {
    label: string;
    value: string;
    /** Optional icon displayed to the left of the label inside the option row. */
    icon?: ReactNode;
}
export type SelectState = "default" | "read-only" | "highlighted" | "disabled";
export type SelectHintType = "neutral" | "danger" | "success";
export interface SelectProps {
    /** Visible label rendered to the left of the trigger. */
    label?: string;
    /** Appends an asterisk to the label. */
    required?: boolean;
    /** Shows a help icon next to the label. */
    helpIcon?: boolean;
    /** Placeholder shown when no value is selected. */
    placeholder?: string;
    /** Currently selected value (controlled). */
    value?: string;
    /** Called when the user selects an option. */
    onChange?: (value: string) => void;
    /** List of selectable options. */
    options: SelectOption[];
    /** Behavioural state. Defaults to "default". */
    state?: SelectState;
    /** Icon displayed inside the leading edge of the trigger button. */
    leadingIcon?: ReactNode;
    /** Helper text rendered below the trigger. */
    hint?: string;
    /** Colour variant of the hint message. */
    hintType?: SelectHintType;
    /** Show a search input inside the dropdown to filter options. */
    searchable?: boolean;
    className?: string;
    id?: string;
}
export declare const Select: import('react').ForwardRefExoticComponent<SelectProps & import('react').RefAttributes<HTMLDivElement>>;
