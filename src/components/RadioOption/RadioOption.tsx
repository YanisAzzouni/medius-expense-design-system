import { forwardRef, useId } from "react";
import type { ReactNode } from "react";
import styles from "./RadioOption.module.css";

export interface RadioOptionProps {
  /** Primary label text. */
  label: string;
  /** Optional secondary description line. */
  description?: string;
  /** Optional icon rendered to the left of the text block. */
  icon?: ReactNode;
  /** Whether this option is currently selected. */
  selected?: boolean;
  /** Called when the user selects this option. */
  onChange?: (selected: boolean) => void;
  /** Disables interaction. */
  disabled?: boolean;
  id?: string;
  /** Radio group name — required for single-select behaviour in a group. */
  name?: string;
  /** Value submitted with the form. */
  value?: string;
  className?: string;
}

export const RadioOption = forwardRef<HTMLInputElement, RadioOptionProps>(
  function RadioOption(
    {
      label,
      description,
      icon,
      selected = false,
      onChange,
      disabled = false,
      id: idProp,
      name,
      value,
      className,
    },
    ref
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    return (
      <label
        htmlFor={id}
        className={[
          styles.wrapper,
          selected  ? styles.wrapper_selected  : "",
          disabled  ? styles.wrapper_disabled  : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Native input — visually hidden, wires up a11y + form semantics */}
        <input
          ref={ref}
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={selected}
          disabled={disabled}
          onChange={e => onChange?.(e.target.checked)}
          className={styles.input}
        />

        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}

        <span className={styles.textBlock}>
          <span className={styles.label}>{label}</span>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </span>

        {/* Custom radio circle */}
        <span
          className={`${styles.radio} ${selected ? styles.radio_checked : ""}`}
          aria-hidden="true"
        >
          {selected && <span className={styles.radioDot} />}
        </span>
      </label>
    );
  }
);
