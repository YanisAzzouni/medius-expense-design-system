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
export interface ToastProps extends ToastItem {
    onDismiss: (id: string) => void;
}
export declare function Toast({ id, variant, message, description, duration, onDismiss }: ToastProps): import("react/jsx-runtime").JSX.Element;
export interface ToastContainerProps {
    toasts: ToastItem[];
    onDismiss: (id: string) => void;
}
export declare function ToastContainer({ toasts, onDismiss }: ToastContainerProps): import("react/jsx-runtime").JSX.Element | null;
export declare function useToast(): {
    toasts: ToastItem[];
    dismiss: (id: string) => void;
    toast: (item: Omit<ToastItem, "id">) => string;
    success: (message: string, description?: string) => string;
    error: (message: string, description?: string) => string;
    warning: (message: string, description?: string) => string;
    information: (message: string, description?: string) => string;
};
