export type CheckboxState = "default" | "danger" | "disabled";
export interface CheckboxProps {
    /** Checked, unchecked, or indeterminate (−). */
    checked?: boolean | "indeterminate";
    /** Called when the user toggles the checkbox. */
    onChange?: (checked: boolean) => void;
    /** Visible label rendered to the right. */
    label?: string;
    /** Visual / validation state. */
    state?: CheckboxState;
    id?: string;
    name?: string;
    value?: string;
    className?: string;
}
export declare const Checkbox: import('react').ForwardRefExoticComponent<CheckboxProps & import('react').RefAttributes<HTMLInputElement>>;
