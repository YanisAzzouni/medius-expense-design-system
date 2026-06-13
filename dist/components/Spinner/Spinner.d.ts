export type SpinnerSize = "small" | "default" | "large";
export interface SpinnerProps {
    size?: SpinnerSize;
    /** Accessible label for screen readers. */
    label?: string;
}
/**
 * Spinner — indeterminate loading indicator.
 *
 * Usage:
 *   <Spinner />
 *   <Spinner size="small" />
 *   <Spinner size="large" label="Loading expenses..." />
 */
export declare function Spinner({ size, label }: SpinnerProps): import("react/jsx-runtime").JSX.Element;
