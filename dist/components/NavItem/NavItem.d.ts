import { ReactNode } from 'react';

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
export declare function NavItem({ label, type, icon, active, expanded, showChevron, onClick, className, }: NavItemProps): import("react/jsx-runtime").JSX.Element;
