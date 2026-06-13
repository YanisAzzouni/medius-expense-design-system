/** Supported icon render sizes. */
export type IconSize = "small" | "default" | "large";
export interface IconProps {
    /** Full icon name in the form `category--name` (e.g. "navigation--chevron-right"). */
    name: string;
    /** Render size. Defaults to "default" (20px). */
    size?: IconSize;
    /** CSS color value. Defaults to `currentColor`. */
    color?: string;
    /** Additional class names. */
    className?: string;
}
/**
 * Renders a design-system icon by name.
 *
 * @example
 * <Icon name="navigation--chevron-right" size="small" color="var(--color-olive-500)" />
 */
export declare function Icon({ name, size, color, className, }: IconProps): import("react/jsx-runtime").JSX.Element;
