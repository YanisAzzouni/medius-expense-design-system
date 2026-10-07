import type { ReactNode } from "react";
import { Switch } from "../Switch/Switch";
import styles from "./BoxSwitch.module.css";

/* ───────────────────────────────────────────
   Ported from the "Box switch" component —
   Figma file "Expense Library (New)", node 361:6633.
   A bordered card with a label/description header,
   a Switch, and an optional content area revealed
   when the switch is on (e.g. a distance-ranges editor).
─────────────────────────────────────────── */

export interface BoxSwitchProps {
  /** Card title, shown next to the switch. */
  label: string;
  /** Optional helper text under the label. */
  description?: string;
  /** On / off. */
  checked: boolean;
  /** Called when the user toggles the switch. */
  onChange: (checked: boolean) => void;
  /** Content revealed below the header when `checked` is true. */
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function BoxSwitch({
  label,
  description,
  checked,
  onChange,
  children,
  disabled,
  className,
}: BoxSwitchProps) {
  return (
    <div className={[styles.card, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.body}>
        <div className={styles.content}>
          <span className={styles.label}>{label}</span>
          {description && <span className={styles.description}>{description}</span>}
        </div>
        <Switch checked={checked} onChange={onChange} disabled={disabled} />
      </div>
      {checked && children && <div className={styles.contentSlot}>{children}</div>}
    </div>
  );
}
