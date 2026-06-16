import { forwardRef } from "react";
import styles from "./Spinner.module.css";

export type SpinnerSize = "small" | "default" | "large";

export interface SpinnerProps {
  size?: SpinnerSize;
  /** Accessible label for screen readers. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Spinner — indeterminate loading indicator.
 *
 * Usage:
 *   <Spinner />
 *   <Spinner size="small" />
 *   <Spinner size="large" label="Loading expenses..." />
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner({ size = "default", label = "Loading…", className, style }, ref) {
    return (
      <span
        ref={ref}
        className={[styles.spinner, styles[`spinner_${size}`], className ?? ""]
          .filter(Boolean)
          .join(" ")}
        style={style}
        role="status"
        aria-label={label}
      />
    );
  }
);

Spinner.displayName = "Spinner";
