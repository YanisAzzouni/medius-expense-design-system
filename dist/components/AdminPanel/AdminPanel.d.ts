export type AdminSectionItem = {
    /** Unique identifier for this sub-item. */
    key: string;
    /** Display label. */
    label: string;
};
export type AdminSectionDef = {
    /** Unique identifier for this section. */
    key: string;
    /** Display label. */
    label: string;
    /** Icon name (e.g. "social--person"). */
    icon: string;
    /**
     * Sub-items. When defined (even if empty), the section header shows a
     * chevron and is collapsible. When absent, the section is a leaf node
     * (no chevron) and clicking it calls onNavigate directly.
     */
    items?: AdminSectionItem[];
};
export interface AdminPanelProps {
    /** Company / tenant name shown at the top. */
    companyName?: string;
    /** List of sections. Defaults to the standard Medius Expense admin nav. */
    sections?: AdminSectionDef[];
    /**
     * Key of the currently active section. Used to:
     * - Pre-expand that section on mount.
     * - Apply the selected style to its header.
     */
    activeSection?: string;
    /** Key of the currently active sub-item within the active section. */
    activeItem?: string;
    /** Called when the user clicks a section header (leaf) or a sub-item. */
    onNavigate?: (sectionKey: string, itemKey?: string) => void;
    className?: string;
}
export declare const DEFAULT_ADMIN_SECTIONS: AdminSectionDef[];
export declare function AdminPanel({ companyName, sections, activeSection, activeItem, onNavigate, className, }: AdminPanelProps): import("react/jsx-runtime").JSX.Element;
