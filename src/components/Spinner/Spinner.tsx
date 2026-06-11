import styles from "./Spinner.module.css";

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
export function Spinner({ size = "default", label = "Loading…" }: SpinnerProps) {
  return (
    <span
      className={[styles.spinner, styles[`spinner_${size}`]].join(" ")}
      role="status"
      aria-label={label}
    />
  );
}
