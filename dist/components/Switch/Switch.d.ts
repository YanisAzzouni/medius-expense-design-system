export interface SwitchProps {
    /** On / off. */
    checked?: boolean;
    /** Called when the user toggles the switch. */
    onChange?: (checked: boolean) => void;
    /** Visible label rendered to the right. */
    label?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    className?: string;
}
export declare const Switch: import('react').ForwardRefExoticComponent<SwitchProps & import('react').RefAttributes<HTMLInputElement>>;
