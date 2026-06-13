import { ReactNode } from 'react';

export type LabelTagColor = "neutral" | "grey" | "blue" | "green" | "orange" | "red" | "teal";
export type LabelTagSize = "default" | "small";
export interface LabelTagProps {
    /** Text content of the tag. Omit for icon-only usage. */
    label?: string;
    /** Colour variant. Defaults to "neutral". */
    color?: LabelTagColor;
    /** Size variant. Defaults to "default". */
    size?: LabelTagSize;
    /** Optional leading icon node. */
    icon?: ReactNode;
    className?: string;
    title?: string;
    "aria-label"?: string;
}
export declare const LabelTag: import('react').ForwardRefExoticComponent<LabelTagProps & import('react').RefAttributes<HTMLSpanElement>>;
