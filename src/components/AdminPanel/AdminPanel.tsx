import { useState } from "react";
import { Icon } from "../../icons/Icon";
import styles from "./AdminPanel.module.css";

/* ─── Public types ──────────────────────────────────────────────────────── */

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

/* ─── Default section data (matches Figma node 52:1130) ────────────────── */

export const DEFAULT_ADMIN_SECTIONS: AdminSectionDef[] = [
  {
    key: "users-access",
    label: "Users and Access",
    icon: "social--person",
    items: [
      { key: "users",       label: "Users"       },
      { key: "groups",      label: "Groups"      },
      { key: "delegations", label: "Delegations" },
      { key: "contacts",    label: "Contacts"    },
      { key: "absences",    label: "Absences"    },
    ],
  },
  {
    key: "expenses-requests",
    label: "Expenses and Requests",
    icon: "actions--receipt",
    items: [
      { key: "reports",           label: "Reports"           },
      { key: "expenses-list",     label: "Expenses list"     },
      { key: "e-invoices-list",   label: "E-invoices list"   },
      { key: "budgets",           label: "Budgets"           },
      { key: "spending-policies", label: "Spending policies" },
    ],
  },
  {
    key: "payment",
    label: "Payment",
    icon: "editor--monetization-on",
    items: [
      { key: "transactions",         label: "Transactions"         },
      { key: "advances",             label: "Advances"             },
      { key: "payment-instruments",  label: "Payment instruments"  },
      { key: "role-management",      label: "Role management"      },
      { key: "bank-accounts",        label: "Bank accounts"        },
    ],
  },
  {
    key: "advanced-settings",
    label: "Advanced Settings",
    icon: "actions--settings",
    items: [
      { key: "categories",    label: "Categories"    },
      { key: "projects",      label: "Projects"      },
      { key: "custom-fields", label: "Custom fields" },
    ],
  },
  {
    key: "rates-vehicles",
    label: "Rates and Vehicles",
    icon: "maps--directions-car",
    items: [
      { key: "mileage-rates", label: "Mileage rates" },
      { key: "vehicles",      label: "Vehicles"      },
    ],
  },
  {
    key: "global-settings",
    label: "Global Settings",
    icon: "device--brightness-low",
    items: [
      { key: "expense",           label: "Expense"           },
      { key: "approval",          label: "Approval"          },
      { key: "accounting",        label: "Accounting"        },
      { key: "employee-handbook", label: "Employee Handbook" },
    ],
  },
  {
    key: "integrations",
    label: "Integrations",
    icon: "actions--extension",
    // no items → leaf node, no chevron
  },
  {
    key: "import-export",
    label: "Import / Export Histories",
    icon: "communication--import-export",
  },
  {
    key: "insights",
    label: "Insights and Reporting",
    icon: "editor--bar-chart",
  },
  {
    key: "subscription-bills",
    label: "Subscription and Bills",
    icon: "av--subscriptions",
    items: [
      { key: "subscription", label: "Subscription" },
      { key: "bills",        label: "Bills"        },
    ],
  },
];

/* ─── Component ─────────────────────────────────────────────────────────── */

export function AdminPanel({
  companyName = "Company name",
  sections = DEFAULT_ADMIN_SECTIONS,
  activeSection,
  activeItem,
  onNavigate,
  className,
}: AdminPanelProps) {
  // Sections that are currently expanded (uncontrolled).
  // Pre-expand the active section on mount.
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const set = new Set<string>();
    if (activeSection) set.add(activeSection);
    return set;
  });

  function toggleSection(key: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <aside
      className={[styles.panel, className ?? ""].filter(Boolean).join(" ")}
      aria-label="Admin navigation"
    >
      {/* ─── Company name ─── */}
      <div className={styles.companyName}>{companyName}</div>

      {/* ─── Nav sections ─── */}
      <nav className={styles.nav} aria-label="Admin sections">
        {sections.map((section) => {
          const isCollapsible = section.items !== undefined;
          const isExpanded    = isCollapsible && expandedSections.has(section.key);
          const isSectionActive = section.key === activeSection;

          return (
            <div key={section.key} className={styles.section}>

              {/* Section header */}
              <button
                type="button"
                className={[
                  styles.sectionHeader,
                  isExpanded ? styles.sectionHeader_expanded : "",
                ].filter(Boolean).join(" ")}
                onClick={() => {
                  if (isCollapsible) {
                    toggleSection(section.key);
                  } else {
                    onNavigate?.(section.key);
                  }
                }}
                aria-expanded={isCollapsible ? isExpanded : undefined}
              >
                <span className={styles.sectionHeaderInner}>
                  <span className={styles.sectionIcon} aria-hidden="true">
                    <Icon name={section.icon} size="default" />
                  </span>
                  <span className={styles.sectionLabel}>{section.label}</span>
                </span>

                {isCollapsible && (
                  <span className={styles.chevron} aria-hidden="true">
                    <Icon
                      name={
                        isExpanded
                          ? "hardware--keyboard-arrow-up"
                          : "hardware--keyboard-arrow-down"
                      }
                      size="default"
                    />
                  </span>
                )}
              </button>

              {/* Sub-items (only when expanded and there are items) */}
              {isExpanded && section.items && section.items.length > 0 && (
                <div className={styles.items} role="list">
                  {section.items.map((item) => {
                    const isItemActive =
                      isSectionActive && item.key === activeItem;

                    return (
                      <div key={item.key} role="listitem" className={styles.itemOuter}>
                        <button
                          type="button"
                          className={[
                            styles.item,
                            isItemActive ? styles.item_selected : "",
                          ].filter(Boolean).join(" ")}
                          onClick={() => onNavigate?.(section.key, item.key)}
                          aria-current={isItemActive ? "page" : undefined}
                        >
                          {item.label}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
