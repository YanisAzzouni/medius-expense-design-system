import type { ReactNode } from "react";
import { Button } from "../Button/Button";
import { Icon } from "../../icons/Icon";
import styles from "./Stepper.module.css";

/* ─── Public types ──────────────────────────────────────────────────────── */

export interface StepDef {
  title: string;
  /** Shown below the title when active or locked. Hidden when done. */
  description?: string;
  /**
   * Content rendered inside the step when active (form fields, etc.).
   * When done, rendered as a compact summary below the title.
   */
  children?: ReactNode;
  /** Override the disabled button text shown on locked steps.
   *  Receives the 1-based active step number. Defaults to "Complete step N first". */
  lockedMessage?: string;
}

export interface StepperProps {
  steps: StepDef[];
  /** 0-based index of the currently active step. */
  activeStep: number;
  /** Called when the Back button is clicked. */
  onBack?: () => void;
  /** Called when the primary action button is clicked. */
  onNext?: () => void;
  /** Label for the primary action. Defaults to "Next" (or "Submit" on the last step). */
  nextLabel?: string;
  /** Label for the optional secondary action button. */
  secondaryActionLabel?: string;
  /** Called when the secondary action button is clicked. */
  onSecondaryAction?: () => void;
  className?: string;
}

/* ─── Internal: badge ───────────────────────────────────────────────────── */

function StepBadge({ state, number }: { state: "active" | "done" | "locked"; number: number }) {
  return (
    <div className={[
      styles.badge,
      state === "done"   ? styles.badge_done   : "",
      state === "locked" ? styles.badge_locked : "",
    ].filter(Boolean).join(" ")}
    aria-hidden="true">
      {state === "done"
        ? <Icon name="navigation--check" size="small" />
        : <span className={styles.badgeNumber}>{number}</span>
      }
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export function Stepper({
  steps,
  activeStep,
  onBack,
  onNext,
  nextLabel,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}: StepperProps) {
  const isLastStep = activeStep === steps.length - 1;
  const resolvedNextLabel = nextLabel ?? (isLastStep ? "Submit" : "Next");

  return (
    <div className={[styles.stepper, className ?? ""].filter(Boolean).join(" ")}>
      {steps.map((step, i) => {
        const state: "active" | "done" | "locked" =
          i < activeStep  ? "done"   :
          i === activeStep ? "active" : "locked";

        const stepNumber = i + 1;

        return (
          <div key={i} className={styles.stepWrapper}>
            {i > 0 && <div className={styles.divider} />}

            <div className={[
              styles.stepRow,
              state === "active" ? styles.stepRow_active : "",
            ].filter(Boolean).join(" ")}>

              <StepBadge state={state} number={stepNumber} />

              {/* ── Active ── */}
              {state === "active" && (
                <div className={styles.activeContent}>
                  <div className={styles.titleBlock}>
                    <span className={styles.title}>{step.title}</span>
                    {step.description && (
                      <span className={styles.description}>{step.description}</span>
                    )}
                  </div>

                  {step.children && (
                    <div className={styles.contentSlot}>{step.children}</div>
                  )}

                  <div className={styles.footer}>
                    <Button
                      hierarchy="secondary"
                      icon={<Icon name="navigation--arrow-back" size="small" />}
                      onClick={onBack}
                      disabled={!onBack}
                    >
                      Back
                    </Button>
                    <div className={styles.footerActions}>
                      {secondaryActionLabel && (
                        <Button hierarchy="secondary" onClick={onSecondaryAction}>
                          {secondaryActionLabel}
                        </Button>
                      )}
                      <Button hierarchy="primary" onClick={onNext}>
                        {resolvedNextLabel}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Locked ── */}
              {state === "locked" && (
                <div className={styles.lockedContent}>
                  <div className={styles.lockedText}>
                    <span className={styles.titleLocked}>{step.title}</span>
                    {step.description && (
                      <span className={styles.descriptionLocked}>{step.description}</span>
                    )}
                  </div>
                  <Button hierarchy="primary" disabled>
                    {step.lockedMessage ?? `Complete step ${activeStep + 1} first`}
                  </Button>
                </div>
              )}

              {/* ── Done ── */}
              {state === "done" && (
                <div className={styles.doneContent}>
                  <span className={styles.titleDone}>{step.title}</span>
                  {step.children && (
                    <div className={styles.doneSummary}>{step.children}</div>
                  )}
                </div>
              )}

            </div>
          </div>
        );
      })}
    </div>
  );
}
