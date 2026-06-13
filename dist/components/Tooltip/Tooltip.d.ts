import { ReactNode } from 'react';

export type TooltipPlacement = "top" | "right" | "bottom" | "left";
export interface TooltipProps {
    /** Text or node shown inside the tooltip bubble. */
    content: ReactNode;
    /**
     * Which side of the trigger the bubble appears on.
     * The beak always points back toward the trigger.
     * Defaults to "top".
     */
    placement?: TooltipPlacement;
    /** The element that triggers the tooltip on hover / focus. */
    children: ReactNode;
    className?: string;
}
export declare function Tooltip({ content, placement, children, className, }: TooltipProps): import("react/jsx-runtime").JSX.Element;
