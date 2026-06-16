import { StatusTagVariant } from '../StatusTag/StatusTag';

export type ColumnSize = "S" | "M" | "L";
export type CellType = "alerts" | "thumbnail" | "status" | "amount" | "date" | "icon" | "actions" | "expense-title" | "check" | "text-link" | "text" | "text-long";
export type ColumnDef = {
    /** Unique key — also used to look up cell data in RowData. */
    key: string;
    /** Header label. Omit to render no label text. */
    title?: string;
    /** Cell type determines which renderer is used. */
    type: CellType;
    /**
     * Column width class:
     * S = 60px min-width, M = 120px min-width, L = 220px min-width.
     * Fixed-width types (alerts, thumbnail, check, expense-title) ignore this.
     */
    size?: ColumnSize;
    /** Makes the column grow to fill all remaining horizontal space. */
    fill?: boolean;
    /** Shows sort chevrons in the header. Fires onSort when clicked. */
    sortable?: boolean;
};
export type AlertsCellData = {
    warning?: boolean;
    duplicate?: boolean;
    policyAlert?: boolean;
};
export type StatusCellData = {
    label: string;
    variant?: StatusTagVariant;
};
export type AmountCellData = {
    amount: string;
    currency: string;
    /** Optional second amount (e.g. reimbursement currency). */
    amount2?: string;
    currency2?: string;
};
export type ThumbnailCellData = {
    src: string;
    alt?: string;
};
export type ActionsCellData = {
    icon: string;
    label?: string;
    onClick: () => void;
    disabled?: boolean;
    secondary?: {
        icon: string;
        label?: string;
        onClick: () => void;
    };
};
export type AttributeType = "manual-addition" | "split" | "email" | "card-statement" | "file-attached" | "guest" | "merged" | "medius-card" | "e-invoice" | "e-invoice-expected" | "e-invoice-not-expected" | "transaction-expected";
export type TitleCellData = {
    title: string;
    attributes?: AttributeType[];
};
export type LinkCellData = {
    text: string;
    href?: string;
    onClick?: () => void;
};
export type CheckCellData = {
    checked: boolean;
    onChange?: (checked: boolean) => void;
};
/** Union of all cell data shapes — use the right one per column type. */
export type CellData = AlertsCellData | StatusCellData | AmountCellData | ThumbnailCellData | ActionsCellData | TitleCellData | LinkCellData | CheckCellData | string | null | undefined;
/** A single table row. `id` is required; other keys map to column keys. */
export type RowData = {
    id: string;
} & Record<string, CellData>;
export interface DataTableProps {
    columns: ColumnDef[];
    rows: RowData[];
    /**
     * Prepends a checkbox column for row selection.
     * Works in both controlled and uncontrolled modes.
     */
    selectable?: boolean;
    /** Controlled: IDs of currently selected rows. */
    selectedIds?: string[];
    /** Controlled: called when selection changes. */
    onSelectionChange?: (ids: string[]) => void;
    /** Key of the currently sorted column. */
    sortKey?: string;
    /** Direction of the current sort. */
    sortDirection?: "asc" | "desc";
    /**
     * Called when a sortable header is clicked.
     * Toggles asc → desc → asc (no unsorted state).
     */
    onSort?: (key: string, direction: "asc" | "desc") => void;
    /** Called when a data row is clicked (excluding interactive cells). */
    onRowClick?: (id: string) => void;
    /** Shown centred inside the table when rows.length === 0. */
    emptyMessage?: string;
    className?: string;
}
export declare function DataTable({ columns, rows, selectable, selectedIds: controlledSelectedIds, onSelectionChange, sortKey, sortDirection, onSort, onRowClick, emptyMessage, className, }: DataTableProps): import("react/jsx-runtime").JSX.Element;
