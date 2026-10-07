import type { ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import styles from "./NavItem.module.css";

/* ───────────────────────────────────────────
   Ported from ".Navigation/Item (Polaris)" —
   Figma file "🧱 Components", node 22335:38790.
   Used for collapsible nested navigation lists
   (e.g. a period > ownership tree).
─────────────────────────────────────────── */

export interface NavItemProps {
  /** Visible text. */
  label: string;
  /**
   * "parent" — a rounded card row with an optional leading icon and
   * expand/collapse chevron (e.g. a period like "Year 2026").
   * "child" — an indented row with a vertical bar indicator instead of a
   * background fill (e.g. "Personal" / "Company" under a period).
   */
  type?: "parent" | "child";
  /** Leading icon — parent rows only. */
  icon?: ReactNode;
  /** Highlights the row as the current selection. */
  active?: boolean;
  /** Parent rows only: flips the chevron when the section is expanded. */
  expanded?: boolean;
  /** Parent rows only: whether to show the expand/collapse chevron at all. */
  showChevron?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavItem({
  label,
  type = "parent",
  icon,
  active = false,
  expanded = true,
  showChevron,
  onClick,
  className,
}: NavItemProps) {
  const isParent = type === "parent";
  const resolvedShowChevron = showChevron ?? isParent;

  return (
    <button
      type="button"
      className={[
        styles.item,
        isParent ? styles.item_parent : styles.item_child,
        active ? (isParent ? styles.item_parent_active : styles.item_child_active) : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
    >
      {isParent ? (
        <>
          {icon && (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          )}
          <span className={styles.label}>{label}</span>
          {resolvedShowChevron && (
            <span
              className={[styles.chevron, expanded ? styles.chevron_expanded : ""].filter(Boolean).join(" ")}
              aria-hidden="true"
            >
              <Icon name="navigation--expand-more" size="small" />
            </span>
          )}
        </>
      ) : (
        <>
          <span className={[styles.bar, active ? styles.bar_active : ""].filter(Boolean).join(" ")} aria-hidden="true" />
          <span className={styles.label}>{label}</span>
        </>
      )}
    </button>
  );
}
