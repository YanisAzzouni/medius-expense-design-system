import { Icon } from "../../icons/Icon";
import styles from "./Navbar.module.css";

/* ─── Nav item definitions ──────────────────────────────────────────────── */

export type NavItemKey =
  | "dashboard"
  | "expenses"
  | "reports"
  | "requests"
  | "manager"
  | "medius-card"
  | "admin"
  | "accountant";

interface NavItemDef {
  key: NavItemKey;
  label: string;
  icon: string;
  alwaysVisible: boolean;
}

const NAV_ITEMS: NavItemDef[] = [
  { key: "dashboard",   label: "Dashboard",   icon: "actions--dashboard",       alwaysVisible: true  },
  { key: "expenses",    label: "Expenses",    icon: "actions--receipt",          alwaysVisible: true  },
  { key: "reports",     label: "Reports",     icon: "editor--insert-chart",      alwaysVisible: true  },
  { key: "requests",    label: "Requests",    icon: "actions--assignment",       alwaysVisible: false },
  { key: "manager",     label: "Manager",     icon: "social--people",            alwaysVisible: false },
  { key: "medius-card", label: "Medius Card", icon: "actions--credit-card",      alwaysVisible: false },
  { key: "admin",       label: "Admin",       icon: "actions--settings",         alwaysVisible: false },
  { key: "accountant",  label: "Accountant",  icon: "actions--account-balance",  alwaysVisible: false },
];

/* ─── Internal: logo ────────────────────────────────────────────────────── */

function MediusExpenseLogo() {
  return (
    <div className={styles.logo} aria-label="Medius Expense home">
      {/* Medius logomark — red circle with stylised wave mark */}
      <svg
        className={styles.logoMark}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="12" fill="#E4001B" />
        <path
          d="M5.5 15.5V9l3 4 3.5-5 3.5 5 3-4v6.5"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className={styles.logoWordmark}>
        <span className={styles.logoMedius}>medius</span>
        <span className={styles.logoExpense}> Expense</span>
      </span>
    </div>
  );
}

/* ─── Internal: single nav tab ──────────────────────────────────────────── */

interface NavTabProps {
  item: NavItemDef;
  isActive: boolean;
  onClick: () => void;
}

function NavTab({ item, isActive, onClick }: NavTabProps) {
  return (
    <button
      type="button"
      className={[styles.navTab, isActive ? styles.navTab_active : ""].filter(Boolean).join(" ")}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={styles.navTabIcon} aria-hidden="true">
        <Icon name={item.icon as never} size="large" />
      </span>
      <span className={styles.navTabLabel}>{item.label}</span>
    </button>
  );
}

/* ─── Internal: user avatar ─────────────────────────────────────────────── */

interface UserAvatarProps {
  initials: string;
  onClick?: () => void;
}

function UserAvatar({ initials, onClick }: UserAvatarProps) {
  return (
    <button
      type="button"
      className={styles.userBtn}
      onClick={onClick}
      aria-label={`Open user menu (${initials})`}
    >
      <span className={styles.avatar} aria-hidden="true">
        {initials}
      </span>
    </button>
  );
}

/* ─── Public types ──────────────────────────────────────────────────────── */

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
  "data-testid"?: string;
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export function NavBar({
  activeItem = "dashboard",
  onNavigate,
  userInitials = "YA",
  onUserClick,
  showRequests = false,
  showManager = false,
  showMediusCard = false,
  showAdmin = false,
  showAccountant = false,
  className,
  "data-testid": testId,
}: NavBarProps) {
  const visibilityMap: Record<NavItemKey, boolean> = {
    dashboard:    true,
    expenses:     true,
    reports:      true,
    requests:     showRequests,
    manager:      showManager,
    "medius-card": showMediusCard,
    admin:        showAdmin,
    accountant:   showAccountant,
  };

  const visibleItems = NAV_ITEMS.filter((item) => visibilityMap[item.key]);

  return (
    <nav
      className={[styles.navbar, className ?? ""].filter(Boolean).join(" ")}
      aria-label="Main navigation"
      data-component="NavBar"
      data-testid={testId}
    >
      {/* ─── Logo ─── */}
      <MediusExpenseLogo />

      {/* ─── Nav tabs ─── */}
      <div className={styles.tabs} role="list">
        {visibleItems.map((item) => (
          <div key={item.key} role="listitem">
            <NavTab
              item={item}
              isActive={item.key === activeItem}
              onClick={() => onNavigate?.(item.key)}
            />
          </div>
        ))}
      </div>

      {/* ─── Spacer ─── */}
      <div className={styles.spacer} aria-hidden="true" />

      {/* ─── User avatar ─── */}
      <UserAvatar initials={userInitials} onClick={onUserClick} />
    </nav>
  );
}
