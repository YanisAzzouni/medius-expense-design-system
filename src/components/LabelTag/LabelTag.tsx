import { forwardRef } from "react";
import type { ReactNode } from "react";
import styles from "./LabelTag.module.css";

export type LabelTagColor =
  | "neutral"
  | "grey"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "teal"
  | "yellow";

export type LabelTagSize = "default" | "small";

export interface LabelTagProps {
  /** Text content of the tag. Omit for icon-only usage. */
  label?: string;
  /** Colour variant. Defaults to "neutral". */
  variant?: LabelTagColor;
  /** Size variant. Defaults to "default". */
  size?: LabelTagSize;
  /** Optional leading icon node. */
  icon?: ReactNode;
  className?: string;
  title?: string;
  "aria-label"?: string;
}

export const LabelTag = forwardRef<HTMLSpanElement, LabelTagProps>(
  function LabelTag(
    { label, variant = "neutral", size = "default", icon, className, title, "aria-label": ariaLabel },
    ref
  ) {
    return (
      <span
        ref={ref}
        className={[
          styles.tag,
          styles[`size_${size}`],
          styles[`color_${variant}`],
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        title={title}
        aria-label={ariaLabel}
      >
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        {label && <span className={styles.label}>{label}</span>}
      </span>
    );
  }
);
