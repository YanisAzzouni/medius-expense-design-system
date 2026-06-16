export type SpinnerSize = "small" | "default" | "large";
export interface SpinnerProps {
    size?: SpinnerSize;
    /** Accessible label for screen readers. */
    label?: string;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Spinner — indeterminate loading indicator.
 *
 * Usage:
 *   <Spinner />
 *   <Spinner size="small" />
 *   <Spinner size="large" label="Loading expenses..." />
 */
export declare const Spinner: import('react').ForwardRefExoticComponent<SpinnerProps & import('react').RefAttributes<HTMLSpanElement>>;
