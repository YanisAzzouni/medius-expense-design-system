export type NavItemKey = "dashboard" | "expenses" | "reports" | "requests" | "manager" | "medius-card" | "admin" | "accountant";
export interface NavBarProps {
    /** The key of the currently active nav item. Defaults to "dashboard". */
    activeItem?: NavItemKey;
    /** Called when the user clicks a nav tab. */
    onNavigate?: (key: NavItemKey) => void;
    /** Initials shown in the user avatar. Defaults to "YA". */
    userInitials?: string;
    /** Called when the user avatar is clicked. */
    onUserClick?: () => void;
    /** Show the Requests tab. */
    showRequests?: boolean;
    /** Show the Manager tab. */
    showManager?: boolean;
    /** Show the Medius Card tab. */
    showMediusCard?: boolean;
    /** Show the Admin tab. */
    showAdmin?: boolean;
    /** Show the Accountant tab. */
    showAccountant?: boolean;
    className?: string;
}
export declare function NavBar({ activeItem, onNavigate, userInitials, onUserClick, showRequests, showManager, showMediusCard, showAdmin, showAccountant, className, }: NavBarProps): import("react/jsx-runtime").JSX.Element;
