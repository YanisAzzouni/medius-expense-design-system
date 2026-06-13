export interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}
export declare function Breadcrumb({ items, className }: BreadcrumbProps): import("react/jsx-runtime").JSX.Element;
