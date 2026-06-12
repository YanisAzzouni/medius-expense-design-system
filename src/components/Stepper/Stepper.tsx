import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "../Button/Button";
import { Icon } from "../../icons/Icon";
import styles from "./Stepper.module.css";

/* ─── Public types ──────────────────────────────────────────────────────── */

export interface StepDef {
  title: string;
  description?: string;
  children?: ReactNode;
  lockedMessage?: string;
}

export interface StepperProps {
  steps: StepDef[];
  activeStep: number;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

/* ─── Internal: badge ───────────────────────────────────────────────────── */

function StepBadge({
  state,
  number,
  wasJustDone,
}: {
  state: "active" | "done" | "locked";
  number: number;
  wasJustDone: boolean;
}) {
  return (
    <div
      className={[
        styles.badge,
        state === "done"              ? styles.badge_done   : "",
        state === "locked"            ? styles.badge_locked : "",
        wasJustDone                   ? styles.badge_pop    : "",
      ].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      {state === "done" ? (
        <span className={[styles.checkIcon, wasJustDone ? styles.checkIcon_in : ""].filter(Boolean).join(" ")}>
          <Icon name="navigation--check" size="small" />
        </span>
      ) : (
        <span className={styles.badgeNumber}>{number}</span>
      )}
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
  const isLastStep        = activeStep === steps.length - 1;
  const resolvedNextLabel = nextLabel ?? (isLastStep ? "Submit" : "Next");

  // Track which step was just completed so we can trigger the badge pop + check animation
  const prevRef        = useRef(activeStep);
  const [justDone, setJustDone] = useState<number | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    if (activeStep !== prev) {
      // Going forward: the step we just left becomes "done" → pop its badge
      if (activeStep > prev) setJustDone(prev);
      prevRef.current = activeStep;
    }
  }, [activeStep]);

  // Clear the "just done" marker after the animation plays (400ms)
  useEffect(() => {
    if (justDone === null) return;
    const id = setTimeout(() => setJustDone(null), 400);
    return () => clearTimeout(id);
  }, [justDone]);

  return (
    <div className={[styles.stepper, className ?? ""].filter(Boolean).join(" ")}>
      {steps.map((step, i) => {
        const state: "active" | "done" | "locked" =
          i < activeStep   ? "done"   :
          i === activeStep ? "active" : "locked";

        const stepNumber  = i + 1;
        const wasJustDone = justDone === i;

        return (
          <div key={i} className={styles.stepWrapper}>
            {i > 0 && <div className={styles.divider} />}

            <div className={[
              styles.stepRow,
              state === "active" ? styles.stepRow_active : "",
            ].filter(Boolean).join(" ")}>

              <StepBadge state={state} number={stepNumber} wasJustDone={wasJustDone} />

              {/* ── Active ── */}
              {state === "active" && (
                // key forces remount → CSS entrance animation fires on every step change
                <div key={`active-${i}`} className={styles.activeContent}>
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
                <div className={[styles.doneContent, wasJustDone ? styles.doneContent_in : ""].filter(Boolean).join(" ")}>
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
