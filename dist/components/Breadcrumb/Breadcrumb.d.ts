export interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}
export declare const Breadcrumb: import('react').ForwardRefExoticComponent<BreadcrumbProps & import('react').RefAttributes<HTMLElement>>;
