import { ReactNode } from 'react';

export interface BoxSwitchProps {
    /** Card title, shown next to the switch. */
    label: string;
    /** Optional helper text under the label. */
    description?: string;
    /** On / off. */
    checked: boolean;
    /** Called when the user toggles the switch. */
    onChange: (checked: boolean) => void;
    /** Content revealed below the header when `checked` is true. */
    children?: ReactNode;
    disabled?: boolean;
    className?: string;
}
export declare function BoxSwitch({ label, description, checked, onChange, children, disabled, className, }: BoxSwitchProps): import("react/jsx-runtime").JSX.Element;
