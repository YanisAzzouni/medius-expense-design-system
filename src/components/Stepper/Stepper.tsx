import styles from "./Stepper.module.css";

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

export function Stepper({ steps, value, onChange, className }: StepperProps) {
  return (
    <div
      role="tablist"
      aria-label="Steps"
      className={[styles.stepper, className ?? ""].filter(Boolean).join(" ")}
    >
      {steps.map((step, i) => {
        const isActive = step.value === value;
        return (
          <button
            key={step.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={[styles.step, isActive ? styles.step_active : ""].filter(Boolean).join(" ")}
            onClick={() => onChange?.(step.value)}
          >
            <span className={styles.stepBadge} aria-hidden="true">
              {i + 1}
            </span>
            <span className={styles.stepLabel}>{step.label}</span>
          </button>
        );
      })}
    </div>
  );
}
