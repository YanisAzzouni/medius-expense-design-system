import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.css";

/** Validation / behavioural state of the input. Hover and focus are CSS-only. */
export type TextInputState =
  | "default"
  | "danger"
  | "success"
  | "read-only"
  | "highlighted"
  | "disabled";

export type TextInputHintType = "neutral" | "danger" | "success";

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "disabled" | "readOnly"> {
  /** Visible label rendered above the input. */
  label?: string;
  /** Appends an asterisk to the label and sets aria-required. */
  required?: boolean;
  /** Validation / behavioural state. Defaults to "default". */
  state?: TextInputState;
  /** Optional unit suffix displayed inside the trailing edge (e.g. "USD", "kg"). */
  unit?: string;
  /** Helper / error text rendered below the input. */
  hint?: string;
  /** Colour variant of the hint message. Defaults to "neutral". */
  hintType?: TextInputHintType;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      label,
      required = false,
      state = "default",
      unit,
      hint,
      hintType = "neutral",
      className,
      id: idProp,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const hintId = `${id}-hint`;

    const isDisabled = state === "disabled";
    const isReadOnly = state === "read-only";

    // CSS class name: "state_read_only" etc.
    const stateClass = styles[`state_${state.replace(/-/g, "_")}`] ?? "";

    return (
      <div className={`${styles.field} ${className ?? ""}`}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                {" *"}
              </span>
            )}
          </label>
        )}

        <div className={`${styles.inputWrapper} ${stateClass}`}>
          <input
            ref={ref}
            id={id}
            className={styles.input}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={required}
            aria-invalid={state === "danger" ? true : undefined}
            aria-describedby={hint ? hintId : undefined}
            {...rest}
          />
          {unit && <span className={styles.unit}>{unit}</span>}
        </div>

        {hint && (
          <p
            id={hintId}
            className={`${styles.hint} ${styles[`hint_${hintType}`] ?? ""}`}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);
