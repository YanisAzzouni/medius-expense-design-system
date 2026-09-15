import { ReactNode } from 'react';

export interface RadioOptionProps {
    /** Primary label text. */
    label: string;
    /** Optional secondary description line. */
    description?: string;
    /** Optional icon rendered to the left of the text block. */
    icon?: ReactNode;
    /** Whether this option is currently selected. */
    selected?: boolean;
    /** Called when the user selects this option. */
    onChange?: (selected: boolean) => void;
    /** Disables interaction. */
    disabled?: boolean;
    id?: string;
    /** Radio group name — required for single-select behaviour in a group. */
    name?: string;
    /** Value submitted with the form. */
    value?: string;
    className?: string;
}
export declare const RadioOption: import('react').ForwardRefExoticComponent<RadioOptionProps & import('react').RefAttributes<HTMLInputElement>>;
