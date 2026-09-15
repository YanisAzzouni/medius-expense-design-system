import { ReactNode } from 'react';

export interface TabsProps {
    /** The value of the currently active tab. */
    value: string;
    /** Called when the user selects a different tab. */
    onChange: (value: string) => void;
    children: ReactNode;
    className?: string;
}
export declare function Tabs({ value, onChange, children, className }: TabsProps): import("react/jsx-runtime").JSX.Element;
export interface TabProps {
    /** Unique value that identifies this tab. */
    value: string;
    /** Visible text label. */
    label: string;
    /** Optional leading icon. */
    icon?: ReactNode;
    /**
     * Optional counter badge shown to the right of the label.
     * Pass a number or short string.
     */
    badge?: string | number;
    /**
     * When true a close (×) button is rendered alongside the tab.
     * The close button is a sibling element (not nested) to keep HTML valid.
     */
    closable?: boolean;
    /** Called when the close button is clicked. */
    onClose?: () => void;
    disabled?: boolean;
    className?: string;
}
export declare function Tab({ value, label, icon, badge, closable, onClose, disabled, className, }: TabProps): import("react/jsx-runtime").JSX.Element;
