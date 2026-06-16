import { ReactNode } from 'react';

export interface StepDef {
    title: string;
    description?: string;
    children?: ReactNode;
    lockedMessage?: string;
    /** Mark this step as waiting (async processing). Renders the yellow hourglass badge and a "Waiting…" tag. */
    waiting?: boolean;
}
export interface StepperProps {
    steps: StepDef[];
    activeStep: number;
    onBack?: () => void;
    onNext?: () => void;
    nextLabel?: string;
    /** Disables the primary action button without hiding it. */
    nextDisabled?: boolean;
    /** Shows a spinner inside the primary action button and disables it. */
    nextLoading?: boolean;
    /** Optional icon shown inside the primary action button. */
    nextIcon?: ReactNode;
    secondaryLabel?: string;
    secondaryIcon?: ReactNode;
    onSecondary?: () => void;
    /** Shows a spinner on the secondary action button and disables it. */
    secondaryLoading?: boolean;
    /** Disables the secondary action button without hiding it. */
    secondaryDisabled?: boolean;
    className?: string;
}
export declare const Stepper: import('react').ForwardRefExoticComponent<StepperProps & import('react').RefAttributes<HTMLDivElement>>;
