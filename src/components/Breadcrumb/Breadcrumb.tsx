import type { ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={[styles.breadcrumb, className].filter(Boolean).join(" ")}
    >
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isActive = i === items.length - 1;

          let content: ReactNode;
          if (isActive) {
            content = <span className={styles.label_active}>{item.label}</span>;
          } else if (item.href) {
            content = (
              <a href={item.href} className={styles.label_inactive}>
                {item.label}
              </a>
            );
          } else if (item.onClick) {
            content = (
              <button type="button" onClick={item.onClick} className={styles.label_inactive}>
                {item.label}
              </button>
            );
          } else {
            content = <span className={styles.label_inactive}>{item.label}</span>;
          }

          return (
            <li key={i} className={styles.item}>
              <span
                className={[
                  styles.separator,
                  isActive ? styles.separator_active : styles.separator_inactive,
                ].join(" ")}
                aria-hidden="true"
              >
                <Icon name="navigation--chevron-right" size="small" />
              </span>
              {content}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
