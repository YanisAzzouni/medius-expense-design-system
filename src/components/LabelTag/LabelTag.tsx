import { forwardRef } from "react";
import type { ReactNode } from "react";
import styles from "./LabelTag.module.css";

export type LabelTagColor =
  | "neutral"
  | "grey"
  | "blue"
  | "green"
  | "orange"
  | "red";

export type LabelTagSize = "default" | "small";

export interface LabelTagProps {
  /** Text content of the tag. */
  label: string;
  /** Colour variant. Defaults to "neutral". */
  color?: LabelTagColor;
  /** Size variant. Defaults to "default". */
  size?: LabelTagSize;
  /** Optional leading icon node. */
  icon?: ReactNode;
  className?: string;
  "data-testid"?: string;
}

export const LabelTag = forwardRef<HTMLDivElement, LabelTagProps>(
  function LabelTag(
    { label, color = "neutral", size = "default", icon, className, "data-testid": testId },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={[
          styles.tag,
          styles[`size_${size}`],
          styles[`color_${color}`],
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        data-component="LabelTag"
        data-testid={testId}
      >
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={styles.label}>{label}</span>
      </div>
    );
  }
);
