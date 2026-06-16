import { useState, useEffect } from "react";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { StatusTag } from "../StatusTag/StatusTag";
import type { StatusTagVariant } from "../StatusTag/StatusTag";
import { LabelTag } from "../LabelTag/LabelTag";
import type { LabelTagColor } from "../LabelTag/LabelTag";
import { Tooltip } from "../Tooltip/Tooltip";
import { Icon } from "../../icons/Icon";
import styles from "./DataTable.module.css";

/* ─── Public types ──────────────────────────────────────────────────────── */

export type ColumnSize = "S" | "M" | "L";

export type CellType =
  | "alerts"
  | "thumbnail"
  | "status"
  | "amount"
  | "date"
  | "icon"
  | "actions"
  | "expense-title"
  | "check"
  | "text-link"
  | "text"
  | "text-long";

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

/* ─── Per-type cell data ────────────────────────────────────────────────── */

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

export type AttributeType =
  | "manual-addition"
  | "split"
  | "email"
  | "card-statement"
  | "file-attached"
  | "guest"
  | "merged"
  | "medius-card"
  | "e-invoice"
  | "e-invoice-expected"
  | "e-invoice-not-expected"
  | "transaction-expected";

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
export type CellData =
  | AlertsCellData
  | StatusCellData
  | AmountCellData
  | ThumbnailCellData
  | ActionsCellData
  | TitleCellData
  | LinkCellData
  | CheckCellData
  | string    // text, text-long, date, icon (icon name)
  | null
  | undefined;

/** A single table row. `id` is required; other keys map to column keys. */
export type RowData = {
  id: string;
} & Record<string, CellData>;

/* ─── Main component props ──────────────────────────────────────────────── */

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
  /** When true the table stretches to 100% of its container (useful when a fill column is present). */
  fillWidth?: boolean;
  className?: string;
}

/* ─── Attribute icon map ────────────────────────────────────────────────── */

const ATTRIBUTE_ICON: Record<AttributeType, string> = {
  "manual-addition":        "hardware--keyboard",
  "split":                  "communication--call-split",
  "email":                  "communication--email",
  "card-statement":         "actions--credit-card",
  "file-attached":          "editor--attach-file",
  "guest":                  "social--person-add",
  "merged":                 "editor--merge-type",
  "medius-card":            "actions--medius-card",
  "e-invoice":              "actions--e-invoice",
  "e-invoice-expected":     "actions--e-invoice",
  "e-invoice-not-expected": "actions--no-e-invoice",
  "transaction-expected":   "actions--transaction",
};

const ATTRIBUTE_LABEL: Record<AttributeType, string> = {
  "manual-addition":        "Manual addition",
  "split":                  "Split",
  "email":                  "Email",
  "card-statement":         "Card statement",
  "file-attached":          "File attached",
  "guest":                  "Guest",
  "merged":                 "Merged",
  "medius-card":            "Medius card",
  "e-invoice":              "E-invoice",
  "e-invoice-expected":     "E-invoice expected",
  "e-invoice-not-expected": "E-invoice not expected",
  "transaction-expected":   "Transaction expected",
};

const ATTRIBUTE_COLOR: Record<AttributeType, LabelTagColor> = {
  "manual-addition":        "grey",
  "split":                  "neutral",
  "email":                  "neutral",
  "card-statement":         "neutral",
  "file-attached":          "neutral",
  "guest":                  "neutral",
  "merged":                 "neutral",
  "medius-card":            "neutral",
  "e-invoice":              "neutral",
  "e-invoice-expected":     "orange",
  "e-invoice-not-expected": "grey",
  "transaction-expected":   "orange",
};

/** Per-attribute icon colour override (CSS variable string).
 *  When set, the icon is tinted with this colour instead of inheriting
 *  the badge's text colour. */
const ATTRIBUTE_ICON_COLOR: Partial<Record<AttributeType, string>> = {
  "medius-card": "var(--color-olive-500)",
  "e-invoice":   "var(--color-blue-500)",
};

/* ─── Internal: Header cell ─────────────────────────────────────────────── */

interface HeaderCellProps {
  col: ColumnDef;
  isSorted: boolean;
  sortDirection?: "asc" | "desc";
  onSort?: () => void;
}

function HeaderCell({ col, isSorted, sortDirection, onSort }: HeaderCellProps) {
  return (
    <div
      className={[
        styles.headerCell,
        col.size === "S" || col.type === "alerts" || col.type === "thumbnail" || col.type === "icon" || col.type === "actions"
          ? styles.headerCell_S : "",
        col.size === "L" || col.type === "text-long" ? styles.headerCell_L : "",
        col.type === "expense-title" || col.fill ? styles.headerCell_title : "",
        col.type === "check" ? styles.headerCell_check : "",
        col.type === "date" ? styles.headerCell_date : "",
        col.type === "status" ? styles.headerCell_status : "",
      ].filter(Boolean).join(" ")}
    >
      {col.title && (
        <span className={styles.headerCellTitle}>{col.title}</span>
      )}
      {col.sortable && (
        <button
          type="button"
          className={[styles.sortBtn, isSorted ? styles.sortBtn_active : ""].filter(Boolean).join(" ")}
          onClick={onSort}
          aria-label={`Sort by ${col.title ?? col.key}`}
        >
          <span
            className={[
              styles.sortIcon,
              isSorted && sortDirection === "asc" ? styles.sortIcon_active : "",
            ].filter(Boolean).join(" ")}
            aria-hidden="true"
          >
            <Icon name="navigation--expand-less" size="small" />
          </span>
          <span
            className={[
              styles.sortIcon,
              isSorted && sortDirection === "desc" ? styles.sortIcon_active : "",
            ].filter(Boolean).join(" ")}
            aria-hidden="true"
          >
            <Icon name="navigation--expand-more" size="small" />
          </span>
        </button>
      )}
    </div>
  );
}

/* ─── Internal: Cell renderers ──────────────────────────────────────────── */

function AlertsCell({ data }: { data: AlertsCellData }) {
  return (
    <div className={styles.alertsCell}>
      {data.warning && (
        <Tooltip content="Warning" placement="top">
          <span className={styles.alertIcon_warning} aria-label="Warning">
            <Icon name="alert--warning-filled" size="small" />
          </span>
        </Tooltip>
      )}
      {data.duplicate && (
        <Tooltip content="Duplicate" placement="top">
          <span className={styles.alertIcon_duplicate} aria-label="Duplicate">
            <Icon name="content--file-copy" size="small" />
          </span>
        </Tooltip>
      )}
      {data.policyAlert && (
        <Tooltip content="Policy alert" placement="top">
          <span className={styles.alertIcon_policy} aria-label="Policy alert">
            <Icon name="actions--gavel" size="small" />
          </span>
        </Tooltip>
      )}
    </div>
  );
}

function ThumbnailCell({ data }: { data: ThumbnailCellData }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className={styles.thumbnailCell}>
      <button
        type="button"
        className={styles.thumbnailBtn}
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        aria-label="View receipt"
      >
        <img
          src={data.src}
          alt={data.alt ?? "Receipt"}
          className={styles.thumbnailImg}
        />
      </button>
      {open && (
        <div
          className={styles.lightboxBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label="Receipt preview"
          onClick={() => setOpen(false)}
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={data.src}
              alt={data.alt ?? "Receipt"}
              className={styles.lightboxImage}
            />
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setOpen(false)}
              aria-label="Close receipt preview"
            >
              <Icon name="navigation--close" size="default" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AmountCell({ data }: { data: AmountCellData }) {
  return (
    <div className={styles.amountCell}>
      <span className={styles.amountRow}>
        <span className={styles.amountValue}>{data.amount}</span>
        <span className={styles.amountCurrency}>{data.currency}</span>
      </span>
      {data.amount2 && (
        <span className={styles.amountRow}>
          <span className={styles.amountValue2}>{data.amount2}</span>
          <span className={styles.amountCurrency}>{data.currency2}</span>
        </span>
      )}
    </div>
  );
}

function TitleCell({ data }: { data: TitleCellData }) {
  return (
    <div className={styles.titleCell}>
      <span className={styles.titleText}>{data.title}</span>
      {data.attributes && data.attributes.length > 0 && (
        <span className={styles.titleAttributes}>
          {data.attributes.map((attr) => {
            const iconColor = ATTRIBUTE_ICON_COLOR[attr];
            const iconEl = iconColor
              ? <span style={{ color: iconColor, display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}><Icon name={ATTRIBUTE_ICON[attr]} size="small" /></span>
              : <Icon name={ATTRIBUTE_ICON[attr]} size="small" />;
            return (
              <Tooltip key={attr} content={ATTRIBUTE_LABEL[attr]} placement="top">
                <LabelTag
                  size="small"
                  color={ATTRIBUTE_COLOR[attr]}
                  icon={iconEl}
                  aria-label={ATTRIBUTE_LABEL[attr]}
                />
              </Tooltip>
            );
          })}
        </span>
      )}
    </div>
  );
}

function ActionsCell({ data }: { data: ActionsCellData }) {
  return (
    <div className={styles.actionsCell}>
      <Button
        hierarchy="secondary"
        size="small"
        iconOnly
        disabled={data.disabled}
        onClick={data.onClick}
        aria-label={data.label ?? "Action"}
        title={data.label}
      >
        <Icon name={data.icon} size="small" />
      </Button>
      {data.secondary && (
        <Button
          hierarchy="secondary"
          size="small"
          iconOnly
          onClick={data.secondary.onClick}
          aria-label={data.secondary.label ?? "Action"}
          title={data.secondary.label}
        >
          <Icon name={data.secondary.icon} size="small" />
        </Button>
      )}
    </div>
  );
}

function LinkCell({ data }: { data: LinkCellData }) {
  if (data.href) {
    return (
      <a href={data.href} className={styles.linkCell} onClick={data.onClick}>
        {data.text}
      </a>
    );
  }
  return (
    <button type="button" className={styles.linkCell} onClick={data.onClick}>
      {data.text}
    </button>
  );
}

/* ─── Internal: DataCell dispatcher ────────────────────────────────────── */

interface DataCellProps {
  col: ColumnDef;
  value: CellData;
}

function DataCell({ col, value }: DataCellProps) {
  const base = [
    styles.cell,
    col.size === "S" || col.type === "alerts" || col.type === "thumbnail" || col.type === "icon" || col.type === "actions"
      ? styles.cell_S : "",
    col.size === "L" || col.type === "text-long" ? styles.cell_L : "",
    col.type === "expense-title" || col.fill ? styles.cell_title : "",
    col.type === "check" ? styles.cell_check : "",
    col.type === "date" ? styles.cell_date : "",
    col.type === "status" ? styles.cell_status : "",
  ].filter(Boolean).join(" ");

  switch (col.type) {
    case "alerts":
      return (
        <div className={base}>
          <AlertsCell data={(value as AlertsCellData) ?? {}} />
        </div>
      );
    case "thumbnail":
      return (
        <div className={base}>
          {value && <ThumbnailCell data={value as ThumbnailCellData} />}
        </div>
      );
    case "status":
      return (
        <div className={base}>
          {value && (
            (value as StatusCellData).variant !== undefined
              ? <StatusTag label={(value as StatusCellData).label} variant={(value as StatusCellData).variant} />
              : <span className={styles.textCell}>{(value as StatusCellData).label}</span>
          )}
        </div>
      );
    case "amount":
      return (
        <div className={base}>
          {value && <AmountCell data={value as AmountCellData} />}
        </div>
      );
    case "date":
      return (
        <div className={base}>
          <span className={styles.textCell}>{value as string}</span>
        </div>
      );
    case "icon":
      return (
        <div className={base}>
          {value && <Icon name={value as string} size="default" />}
        </div>
      );
    case "actions":
      return (
        <div className={base}>
          {value && <ActionsCell data={value as ActionsCellData} />}
        </div>
      );
    case "expense-title":
      return (
        <div className={base}>
          {value && <TitleCell data={value as TitleCellData} />}
        </div>
      );
    case "check":
      return (
        <div className={base}>
          {value != null && (
            <Checkbox
              checked={(value as CheckCellData).checked}
              onChange={(checked) => (value as CheckCellData).onChange?.(checked)}
            />
          )}
        </div>
      );
    case "text-link":
      return (
        <div className={base}>
          {value && <LinkCell data={value as LinkCellData} />}
        </div>
      );
    case "text":
    case "text-long":
    default:
      return (
        <div className={base}>
          <span className={styles.textCell}>{value as string}</span>
        </div>
      );
  }
}

/* ─── Main component ────────────────────────────────────────────────────── */

export function DataTable({
  columns,
  rows,
  selectable = false,
  selectedIds: controlledSelectedIds,
  onSelectionChange,
  sortKey,
  sortDirection,
  onSort,
  onRowClick,
  emptyMessage = "No results found.",
  fillWidth = false,
  className,
}: DataTableProps) {
  // Uncontrolled selection state (fallback when no controlled ids provided)
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);

  const isControlled = controlledSelectedIds !== undefined;
  const selectedIds = isControlled ? controlledSelectedIds : internalSelectedIds;

  function handleSelectionChange(ids: string[]) {
    if (!isControlled) setInternalSelectedIds(ids);
    onSelectionChange?.(ids);
  }

  function toggleRow(id: string) {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    handleSelectionChange(next);
  }

  function toggleAll() {
    if (selectedIds.length === rows.length) {
      handleSelectionChange([]);
    } else {
      handleSelectionChange(rows.map((r) => r.id));
    }
  }

  function handleSortClick(key: string) {
    const nextDir: "asc" | "desc" =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    onSort?.(key, nextDir);
  }

  const allSelected   = rows.length > 0 && selectedIds.length === rows.length;
  const someSelected  = selectedIds.length > 0 && selectedIds.length < rows.length;

  return (
    <div
      className={[styles.table, fillWidth ? styles.table_fill : "", className ?? ""].filter(Boolean).join(" ")}
      role="table"
      aria-label="Data table"
    >
      {/* ─── Header ─── */}
      <div className={styles.header} role="row">
        {selectable && (
          <div className={styles.headerCheckCell} role="columnheader">
            <Checkbox
              checked={allSelected ? true : someSelected ? "indeterminate" : false}
              onChange={toggleAll}
            />
          </div>
        )}
        {columns.map((col) => (
          <div key={col.key} role="columnheader" style={{ display: "contents" }}>
            <HeaderCell
              col={col}
              isSorted={sortKey === col.key}
              sortDirection={sortDirection}
              onSort={col.sortable ? () => handleSortClick(col.key) : undefined}
            />
          </div>
        ))}
      </div>

      {/* ─── Body ─── */}
      <div role="rowgroup">
        {rows.length === 0 ? (
          <div className={styles.emptyState} role="row">
            <span className={styles.emptyMessage}>{emptyMessage}</span>
          </div>
        ) : (
          rows.map((row) => {
            const isSelected = selectedIds.includes(row.id);
            return (
              <div
                key={row.id}
                className={[
                  styles.row,
                  isSelected ? styles.row_selected : "",
                  onRowClick  ? styles.row_clickable : "",
                ].filter(Boolean).join(" ")}
                role="row"
                aria-selected={selectable ? isSelected : undefined}
                onClick={() => onRowClick?.(row.id)}
              >
                {selectable && (
                  <div
                    className={styles.rowCheckCell}
                    role="cell"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleRow(row.id)}
                    />
                  </div>
                )}
                {columns.map((col) => (
                  <div key={col.key} role="cell" style={{ display: "contents" }}>
                    <DataCell col={col} value={row[col.key]} />
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
