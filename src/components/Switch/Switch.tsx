import { forwardRef, useId } from "react";
import type { ChangeEvent } from "react";
import styles from "./Switch.module.css";

/* ───────────────────────────────────────────
   Ported from the "Box switch" / Toggle button
   component — Figma file "Expense Library (New)",
   node 361:6633.
─────────────────────────────────────────── */

export interface SwitchProps {
  /** On / off. */
  checked?: boolean;
  /** Called when the user toggles the switch. */
  onChange?: (checked: boolean) => void;
  /** Visible label rendered to the right. */
  label?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(
    { checked = false, onChange, label, disabled = false, id: idProp, name, value, className },
    ref
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <label
        htmlFor={id}
        className={[styles.wrapper, disabled ? styles.wrapper_disabled : "", className ?? ""]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Native input — visually hidden, wires up a11y + form semantics */}
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          aria-checked={checked}
          onChange={handleChange}
          className={styles.input}
        />

        {/* Custom track + thumb */}
        <span
          className={[styles.track, checked ? styles.track_checked : "", disabled ? styles.track_disabled : ""]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        >
          <span className={styles.thumb} />
        </span>

        {label && <span className={styles.labelText}>{label}</span>}
      </label>
    );
  }
);
