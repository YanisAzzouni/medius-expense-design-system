import { ReactNode } from 'react';
import { ButtonHierarchy } from '../Button/Button';
import { BreadcrumbItem } from '../Breadcrumb/Breadcrumb';

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
export declare const PageHeader: import('react').ForwardRefExoticComponent<PageHeaderProps & import('react').RefAttributes<HTMLElement>>;
