import { useEffect, useRef } from "react";
import { Icon } from "../../icons/Icon";
import styles from "./Toast.module.css";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type ToastVariant = "success" | "error" | "warning" | "information";

export interface ToastItem {
  /** Unique identifier for this toast. */
  id: string;
  /** Visual style. */
  variant: ToastVariant;
  /** Main message. */
  message: string;
  /** Optional secondary line. */
  description?: string;
  /** Auto-dismiss after this many ms. 0 = never auto-dismiss. Default: 4000. */
  duration?: number;
}

interface ToastProps extends ToastItem {
  onDismiss: (id: string) => void;
}

/* ─── Config ─────────────────────────────────────────────────────────────── */

const VARIANT_CONFIG: Record<
  ToastVariant,
  { icon: string; modifier: string }
> = {
  success:     { icon: "alerts--check-circle",    modifier: styles.toast_success     },
  error:       { icon: "alert--error-filled",     modifier: styles.toast_error       },
  warning:     { icon: "alert--warning-filled",   modifier: styles.toast_warning     },
  information: { icon: "actions--info",           modifier: styles.toast_information },
};

/* ─── Single toast ───────────────────────────────────────────────────────── */

export function Toast({ id, variant, message, description, duration = 4000, onDismiss }: ToastProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => onDismiss(id), duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [id, duration, onDismiss]);

  const { icon, modifier } = VARIANT_CONFIG[variant];

  return (
    <div
      className={[styles.toast, modifier].join(" ")}
      role="alert"
      aria-live="polite"
    >
      <span className={styles.icon} aria-hidden="true">
        <Icon name={icon} size="default" />
      </span>

      <div className={styles.body}>
        <span className={styles.message}>{message}</span>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>

      <button
        type="button"
        className={styles.closeBtn}
        onClick={() => onDismiss(id)}
        aria-label="Dismiss"
      >
        <Icon name="navigation--close" size="small" />
      </button>
    </div>
  );
}

/* ─── Toast container ────────────────────────────────────────────────────── */

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} aria-label="Notifications">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

/* ─── useToast hook ──────────────────────────────────────────────────────── */

import { useState, useCallback } from "react";

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((item: Omit<ToastItem, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { ...item, id }]);
    return id;
  }, []);

  /** Convenience shorthands */
  const success     = useCallback((message: string, description?: string) =>
    toast({ variant: "success",     message, description }), [toast]);
  const error       = useCallback((message: string, description?: string) =>
    toast({ variant: "error",       message, description }), [toast]);
  const warning     = useCallback((message: string, description?: string) =>
    toast({ variant: "warning",     message, description }), [toast]);
  const information = useCallback((message: string, description?: string) =>
    toast({ variant: "information", message, description }), [toast]);

  return { toasts, dismiss, toast, success, error, warning, information };
}
