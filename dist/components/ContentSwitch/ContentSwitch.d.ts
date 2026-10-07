import { ReactNode } from 'react';

export interface ContentSwitchProps {
    /** The value of the currently selected item. */
    value: string;
    /** Called when the user selects a different item. */
    onChange: (value: string) => void;
    /** Optional label rendered above the control. */
    label?: string;
    /** Stretches the control to fill its container, sharing width evenly between items. */
    fullWidth?: boolean;
    children: ReactNode;
    className?: string;
}
export declare function ContentSwitch({ value, onChange, label, fullWidth, children, className, }: ContentSwitchProps): import("react/jsx-runtime").JSX.Element;
export interface ContentSwitchItemProps {
    /** Unique value that identifies this item. */
    value: string;
    /** Visible text label. Omit for an icon-only item (requires `ariaLabel`). */
    label?: string;
    /** Optional leading icon. Required for icon-only items. */
    icon?: ReactNode;
    /** Accessible name — required when the item has no visible `label`. */
    ariaLabel?: string;
    /** Tooltip shown on hover/focus — most useful for icon-only items. */
    tooltip?: ReactNode;
    disabled?: boolean;
    className?: string;
}
export declare function ContentSwitchItem({ value, label, icon, ariaLabel, tooltip, disabled, className, }: ContentSwitchItemProps): import("react/jsx-runtime").JSX.Element;
