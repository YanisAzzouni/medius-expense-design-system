export type StatusTagVariant = "neutral" | "grey" | "blue" | "green" | "yellow" | "red" | "orange";
export interface StatusTagProps {
    /** Text label displayed inside the tag. */
    label: string;
    /** Colour variant. Defaults to "neutral". */
    variant?: StatusTagVariant;
    className?: string;
}
export declare const StatusTag: import('react').ForwardRefExoticComponent<StatusTagProps & import('react').RefAttributes<HTMLDivElement>>;
