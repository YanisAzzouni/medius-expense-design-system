import { forwardRef } from "react";
import type { ReactNode } from "react";
import styles from "./FeedTile.module.css";

export type FeedTileVariant = "number" | "text" | "network";
export type FeedTileNumberColor = "default" | "success";

export interface FeedTileProps {
  /** Label shown above the value. */
  label: string;
  /** Controls how the value is rendered. */
  variant?: FeedTileVariant;
  /** Used for "number" and "text" variants. */
  value?: string | number;
  /** Color override for the "number" variant. "success" renders green (e.g. unmatched = 0). */
  numberColor?: FeedTileNumberColor;
  /** Used for the "network" variant — URL to the network logo image. */
  logoSrc?: string;
  /** Alt text for the network logo. Falls back to text when no logoSrc. */
  logoAlt?: string;
  className?: string;
}

export const FeedTile = forwardRef<HTMLDivElement, FeedTileProps>(
  function FeedTile(
    {
      label,
      variant = "text",
      value,
      numberColor = "default",
      logoSrc,
      logoAlt = "",
      className,
    },
    ref
  ) {
  let content: ReactNode;

  if (variant === "number") {
    content = (
      <span className={[styles.number, numberColor === "success" ? styles.number_success : ""].filter(Boolean).join(" ")}>
        {value}
      </span>
    );
  } else if (variant === "text") {
    content = <span className={styles.text}>{value}</span>;
  } else {
    content = logoSrc
      ? <img src={logoSrc} alt={logoAlt} className={styles.logo} />
      : <span className={styles.text}>{logoAlt || "—"}</span>;
  }

  return (
    <div ref={ref} className={[styles.tile, className].filter(Boolean).join(" ")}>
      <span className={styles.label}>{label}</span>
      <div className={styles.value}>{content}</div>
    </div>
  );
}
);

FeedTile.displayName = "FeedTile";
