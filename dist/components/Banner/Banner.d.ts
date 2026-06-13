import { ReactNode } from 'react';

export type BannerType = "information" | "warning" | "error" | "success";
export interface BannerProps {
    /** Visual style / severity of the banner. */
    type?: BannerType;
    /** Optional bold title line rendered above the body. */
    title?: string;
    /** Body text or any React content. */
    children?: ReactNode;
    /** Whether the leading type icon is shown. Defaults to true. */
    showIcon?: boolean;
    /** Whether a dismiss (×) button is rendered. */
    dismissible?: boolean;
    /** Called when the dismiss button is clicked. */
    onDismiss?: () => void;
    /** Label for the primary action button. If omitted the button is hidden. */
    action1Label?: string;
    /** Called when the primary action button is clicked. */
    onAction1?: () => void;
    /** Label for the secondary action button. If omitted the button is hidden. */
    action2Label?: string;
    /** Called when the secondary action button is clicked. */
    onAction2?: () => void;
    className?: string;
}
export declare const Banner: import('react').ForwardRefExoticComponent<BannerProps & import('react').RefAttributes<HTMLDivElement>>;
