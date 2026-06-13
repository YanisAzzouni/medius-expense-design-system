import { ButtonHTMLAttributes, ReactNode } from 'react';

/** Visual weight of the button. */
export type ButtonHierarchy = "primary" | "secondary" | "tertiary";
/** Colour intent of the button. */
export type ButtonAppearance = "default" | "danger" | "ai";
/** Physical size of the button. */
export type ButtonSize = "default" | "small";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Visual hierarchy: filled (primary), outlined (secondary), or ghost (tertiary).
     * @default "primary"
     */
    hierarchy?: ButtonHierarchy;
    /**
     * Colour intent of the action.
     * @default "default"
     */
    appearance?: ButtonAppearance;
    /**
     * Physical size of the button.
     * @default "default"
     */
    size?: ButtonSize;
    /**
     * Optional leading icon. Pass any ReactNode — typically an `<Icon />` from the design system.
     * Ignored when `iconOnly` is true (pass the icon as `children` instead).
     */
    icon?: ReactNode;
    /**
     * Renders a square icon-only button. Pass the icon as `children`.
     * Label text is visually hidden.
     */
    iconOnly?: boolean;
    /**
     * Shows a spinner and blocks interaction. The button is not disabled in the DOM
     * so it remains focusable and keyboard-accessible.
     */
    loading?: boolean;
}
/**
 * Core action button for the Medius Expense design system.
 *
 * @example
 * // Primary action
 * <Button hierarchy="primary" appearance="default">Save</Button>
 *
 * @example
 * // Destructive secondary with icon
 * <Button hierarchy="secondary" appearance="danger" icon={<Icon name="actions--delete" />}>
 *   Delete
 * </Button>
 *
 * @example
 * // Icon-only ghost button
 * <Button hierarchy="tertiary" iconOnly>
 *   <Icon name="navigation--close" />
 * </Button>
 */
export declare const Button: import('react').ForwardRefExoticComponent<ButtonProps & import('react').RefAttributes<HTMLButtonElement>>;
