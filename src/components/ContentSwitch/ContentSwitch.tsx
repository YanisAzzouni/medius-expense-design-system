import { createContext, useContext, useRef, useId } from "react";
import type { ReactNode, KeyboardEvent } from "react";
import { Tooltip } from "../Tooltip/Tooltip";
import styles from "./ContentSwitch.module.css";

/* ───────────────────────────────────────────
   Ported from NorthStar's Segmented Control
   (👩‍💻 ContentSwitch) — Figma file "🧱 Components",
   node 29799:92543.
─────────────────────────────────────────── */

/* ─── Context ─── */
interface ContentSwitchContextValue {
  value: string;
  onChange: (v: string) => void;
}

const ContentSwitchContext = createContext<ContentSwitchContextValue | null>(null);

/* ───────────────────────────────────────────
   ContentSwitch — container / radiogroup
─────────────────────────────────────────── */
export interface ContentSwitchProps {
  /** The value of the currently selected item. */
  value: string;
  /** Called when the user selects a different item. */
  onChange: (value: string) => void;
  /** Optional label rendered above the control. */
  label?: string;
  /** Stretches the control to fill its container, sharing width evenly between items. */
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

export function ContentSwitch({
  value,
  onChange,
  label,
  fullWidth,
  children,
  className,
}: ContentSwitchProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  /* Arrow-key navigation — moves focus AND selects the item */
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      groupRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="radio"]:not(:disabled)'
      ) ?? []
    );
    const idx = items.indexOf(document.activeElement as HTMLButtonElement);
    if (idx === -1) return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = items[(idx + 1) % items.length];
      next.focus();
      onChange(next.dataset.value ?? "");
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = items[(idx - 1 + items.length) % items.length];
      prev.focus();
      onChange(prev.dataset.value ?? "");
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0].focus();
      onChange(items[0].dataset.value ?? "");
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1].focus();
      onChange(items[items.length - 1].dataset.value ?? "");
    }
  };

  return (
    <ContentSwitchContext.Provider value={{ value, onChange }}>
      <div className={[styles.wrapper, className ?? ""].filter(Boolean).join(" ")}>
        {label && (
          <span id={labelId} className={styles.label}>
            {label}
          </span>
        )}
        <div
          ref={groupRef}
          role="radiogroup"
          aria-labelledby={label ? labelId : undefined}
          className={[styles.stack, fullWidth ? styles.stack_fullWidth : ""]
            .filter(Boolean)
            .join(" ")}
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
      </div>
    </ContentSwitchContext.Provider>
  );
}

/* ───────────────────────────────────────────
   ContentSwitchItem — individual item
─────────────────────────────────────────── */
export interface ContentSwitchItemProps {
  /** Unique value that identifies this item. */
  value: string;
  /** Visible text label. Omit for an icon-only item (requires `ariaLabel`). */
  label?: string;
  /** Optional leading icon. Required for icon-only items. */
  icon?: ReactNode;
  /** Accessible name — required when the item has no visible `label`. */
  ariaLabel?: string;
  /** Tooltip shown on hover/focus — most useful for icon-only items. */
  tooltip?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function ContentSwitchItem({
  value,
  label,
  icon,
  ariaLabel,
  tooltip,
  disabled,
  className,
}: ContentSwitchItemProps) {
  const context = useContext(ContentSwitchContext);
  if (context === null) {
    throw new Error("<ContentSwitchItem> must be rendered inside a <ContentSwitch> component.");
  }
  const { value: activeValue, onChange } = context;
  const isSelected = activeValue === value;
  const iconOnly = !label;

  const button = (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={iconOnly ? ariaLabel : undefined}
      disabled={disabled}
      /* Roving tabindex: only the selected item is in the natural tab order */
      tabIndex={isSelected ? 0 : -1}
      /* data-value is read by the arrow-key handler in ContentSwitch */
      data-value={value}
      className={[
        styles.item,
        iconOnly ? styles.item_iconOnly : "",
        isSelected ? styles.item_selected : "",
        disabled ? styles.item_disabled : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => !disabled && onChange(value)}
    >
      {icon && (
        <span className={styles.itemIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      {label && <span className={styles.itemLabel}>{label}</span>}
    </button>
  );

  return tooltip ? <Tooltip content={tooltip}>{button}</Tooltip> : button;
}
