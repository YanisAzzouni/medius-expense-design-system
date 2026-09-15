export interface StepDef {
    value: string;
    label: string;
}
export interface StepperProps {
    steps: StepDef[];
    /** Value of the currently active step. */
    value: string;
    /** Called when the user clicks a step. */
    onChange?: (value: string) => void;
    className?: string;
}
export declare function Stepper({ steps, value, onChange, className }: StepperProps): import("react/jsx-runtime").JSX.Element;
