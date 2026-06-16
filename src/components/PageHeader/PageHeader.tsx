import { forwardRef } from "react";
import type { ReactNode } from "react";
import { Button } from "../Button/Button";
import type { ButtonHierarchy } from "../Button/Button";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import type { BreadcrumbItem } from "../Breadcrumb/Breadcrumb";
import styles from "./PageHeader.module.css";

export interface PageHeaderAction {
  label?: string;
  icon?: ReactNode;
  hierarchy?: ButtonHierarchy;
  onClick?: () => void;
  disabled?: boolean;
  /** aria-label required when label is omitted (icon-only button) */
  ariaLabel?: string;
}

export interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  actions?: PageHeaderAction[];
  className?: string;
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  function PageHeader({ breadcrumbs, actions, className }, ref) {
  return (
    <header
      ref={ref}
      className={[styles.header, className].filter(Boolean).join(" ")}
    >
      <div className={styles.breadcrumbSlot}>
        <Breadcrumb items={breadcrumbs} />
      </div>

      {actions && actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((action, i) => {
            const iconOnly = !action.label && Boolean(action.icon);
            return (
              <Button
                key={i}
                hierarchy={action.hierarchy ?? "secondary"}
                icon={!iconOnly ? action.icon : undefined}
                iconOnly={iconOnly}
                onClick={action.onClick}
                disabled={action.disabled}
                aria-label={iconOnly ? action.ariaLabel : undefined}
              >
                {iconOnly ? action.icon : action.label}
              </Button>
            );
          })}
        </div>
      )}
    </header>
  );
}
);

PageHeader.displayName = "PageHeader";
