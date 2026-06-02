# CLAUDE.md — Medius Expense Design System

## Golden Rules

1. **Always use existing components from this library first.** Never recreate a UI element that already exists here.
2. **If a needed component does not exist → stop.** Say explicitly:
   > "There's no `[X]` component in `medius-expense-design-system` yet. Do you want me to build it in the design system first, or use a one-off?"
   Do not silently build a custom version.
3. **Never invent props.** Read the TypeScript interface before using a component.
4. **When a new component is added to this library, update this file immediately** — add it to the component list below.

---

## Package

```
import { ComponentName } from "medius-expense-design-system";
```

Styles (app entry point):
```ts
import "medius-expense-design-system/dist/tokens/tokens.css";
```

---

## Available Components

### Button

```ts
import { Button } from "medius-expense-design-system";

hierarchy?: "primary" | "secondary" | "tertiary"   // default: "primary"
appearance?: "default" | "danger" | "ai"            // default: "default"
size?:       "default" | "small"                    // default: "default"
icon?:       ReactNode   // leading icon
iconOnly?:   boolean     // square icon-only variant — pass icon as children
loading?:    boolean
```

### TextInput

```ts
import { TextInput } from "medius-expense-design-system";

label?:     string
required?:  boolean
helpIcon?:  boolean
state?:     "default" | "danger" | "success" | "read-only" | "highlighted" | "disabled"
unit?:      string   // trailing unit suffix, e.g. "%" or "kg"
hint?:      string
hintType?:  "neutral" | "danger" | "success"
// + all standard <input> HTML attributes (type, value, onChange, placeholder, …)
```

### TextArea

```ts
import { TextArea } from "medius-expense-design-system";

label?:     string
required?:  boolean
helpIcon?:  boolean
state?:     "default" | "danger" | "success" | "read-only" | "highlighted" | "disabled"
hint?:      string
hintType?:  "neutral" | "danger" | "success"
// + all standard <textarea> HTML attributes (rows, value, onChange, …)
```

### Select

```ts
import { Select } from "medius-expense-design-system";
import type { SelectOption } from "medius-expense-design-system";

// SelectOption: { value: string; label: string; icon?: ReactNode }

label?:       string
required?:    boolean
helpIcon?:    boolean
placeholder?: string
value?:       string
onChange?:    (value: string) => void
options:      SelectOption[]
state?:       "default" | "read-only" | "highlighted" | "disabled"
leadingIcon?: ReactNode   // icon shown in the trigger when no option is selected
hint?:        string
hintType?:    "neutral" | "danger" | "success"
```

### Banner

```ts
import { Banner } from "medius-expense-design-system";

type?:         "information" | "warning" | "error" | "success"  // default: "information"
title?:        string
children?:     ReactNode   // body text
showIcon?:     boolean     // default: true
dismissible?:  boolean
onDismiss?:    () => void
action1Label?: string
onAction1?:    () => void
action2Label?: string
onAction2?:    () => void
```

### StatusTag

```ts
import { StatusTag } from "medius-expense-design-system";

label:     string
variant?:  "neutral" | "grey" | "blue" | "green" | "yellow" | "red" | "orange"
```

Renders a pill badge with a coloured dot. Use for workflow states (Draft, Submitted, Approved, …).

### LabelTag

```ts
import { LabelTag } from "medius-expense-design-system";

label:   string
color?:  "neutral" | "grey" | "blue" | "green" | "orange" | "red"  // default: "neutral"
size?:   "default" | "small"                                         // default: "default"
icon?:   ReactNode   // optional leading icon
```

Use for metadata labels (categories, flags, document types, …).

### Tooltip

```ts
import { Tooltip } from "medius-expense-design-system";

content:        ReactNode
placement?:     "top" | "right" | "bottom" | "left"  // default: "top"
children:       ReactNode   // the trigger element
open?:          boolean     // controlled open state; omit for CSS-only hover/focus behavior
onOpenChange?:  (open: boolean) => void  // called on mouse/focus events when controlled
```

Uncontrolled (default): CSS hover/focus drives visibility. No JS state needed.  
Controlled: pass `open` to drive visibility from JS — useful for agents and tests.

```tsx
// Controlled example
const [open, setOpen] = useState(false);
<Tooltip content="Help text" open={open} onOpenChange={setOpen}>
  <button>Hover me</button>
</Tooltip>
```

Wraps the trigger — no extra wrapper div needed.

### Tabs + Tab (compound component)

```ts
import { Tabs, Tab } from "medius-expense-design-system";

// Tabs (container / tablist)
value:     string          // active tab value
onChange:  (v: string) => void
children:  ReactNode

// Tab (individual item)
value:     string
label:     string
icon?:     ReactNode
badge?:    string | number   // counter bubble
closable?: boolean
onClose?:  () => void
disabled?: boolean
```

Keyboard navigation (Arrow Left/Right/Home/End) and roving tabindex are built in.

### Checkbox

```ts
import { Checkbox } from "medius-expense-design-system";

checked?:   boolean | "indeterminate"
onChange?:  (checked: boolean) => void
label?:     string
state?:     "default" | "danger" | "disabled"
disabled?:  boolean   // alias for state="disabled"
// + id, name, value, className
```

### NavBar

```ts
import { NavBar } from "medius-expense-design-system";
import type { NavItemKey } from "medius-expense-design-system";

// NavItemKey: "dashboard" | "expenses" | "reports" | "requests"
//           | "manager" | "medius-card" | "admin" | "accountant"

activeItem?:     NavItemKey   // default: "dashboard"
onNavigate?:     (key: NavItemKey) => void
userInitials?:   string       // default: "YA"
onUserClick?:    () => void
showRequests?:   boolean      // default: false
showManager?:    boolean      // default: false
showMediusCard?: boolean      // default: false
showAdmin?:      boolean      // default: false
showAccountant?: boolean      // default: false
```

72px horizontal bar with Medius Expense logo, nav tabs, and user avatar.
Always-visible tabs: Dashboard, Expenses, Reports. Optional tabs toggled via props.
Tab states: default (white/chalk-600), hover (chalk-200/chalk-900), active (olive-200/olive-700).

---

### ExpenseModal

```ts
import { ExpenseModal } from "medius-expense-design-system";
import type { ExpenseTag } from "medius-expense-design-system";

// ExpenseTag: { label: string }

title?:         string          // default: "Expense"
tags?:          ExpenseTag[]    // small label tags in the header
statusLabel?:   string          // default: "Draft"
statusVariant?: StatusTagVariant
showBanner?:    boolean         // shows a dismissible info banner
bannerMessage?: string
onClose?:       () => void
onSave?:        () => void
onNext?:        () => void
```

Full expense entry modal. Tabs: General, Merchant, Guest, Transaction, Attached files.
Receipt preview panel is a placeholder — not yet a component.

---

## Icon

```ts
import { Icon } from "medius-expense-design-system";

name:   string   // "category--icon-name", e.g. "navigation--close"
size?:  "small" | "medium" | "large"  // 16 / 20 / 24 px  — default: "medium"
```

Icon names follow the pattern `category--kebab-name`. Key categories:
`actions` · `alert` · `alerts` · `content` · `editor` · `maps` · `navigation` · `social`

To verify a name exists, use the exported manifest (no shell access required):
```ts
import { iconNames } from "medius-expense-design-system";
// iconNames: string[] — all valid "category--name" identifiers, e.g. "navigation--close"
```

Or grep in a shell context:
```bash
grep '"name": "your-icon-name"' src/icons/manifest.ts
```

Never guess an icon name. If unsure, check `iconNames` or grep the manifest first.

---

## Design Tokens

CSS custom properties — use these instead of hardcoded values.

**Colors:** `--color-{family}-{step}` where step ∈ 100–1000  
Families: `chalk` · `olive` · `blue` · `green` · `red` · `orange` · `yellow` · `teal` · `purple` · `pink` · `space` · `white`

**Typography:**
`--type-body-default-{size|weight|line-height|letter-spacing}`
`--type-small-{size|weight|line-height|letter-spacing}`
`--type-small-semibold-{size|weight|line-height|letter-spacing}`

**Font family:** `--font-family`

---

## Agent & Testing Conventions

### data-component
Every component renders `data-component="ComponentName"` on its root element. Use this to identify which component owns a DOM node when inspecting the tree (e.g. screenshots, DOM queries):
```ts
document.querySelector('[data-component="Button"]')
```

### data-testid
Pass `data-testid` to any component to attach a stable test selector.

For **Button**, **TextInput**, **TextArea** — `data-testid` flows through `...rest` to the semantic element (`<button>`, `<input>`, `<textarea>`). This is the correct target for interaction-based tests.

For all other components — `data-testid` is an explicit prop and lands on the root element.

```tsx
<Button data-testid="save-btn">Save</Button>
<TextInput data-testid="amount-input" label="Amount" />
<Select data-testid="category-select" options={opts} />
<Banner data-testid="error-banner" type="error">…</Banner>
```

### Tooltip controlled mode
For agent/test scenarios where CSS hover cannot be triggered, use the `open` prop:
```tsx
<Tooltip content="Details" open={true}>…</Tooltip>
```

### Icon discovery (no shell required)
```ts
import { iconNames } from "medius-expense-design-system";
const isValid = iconNames.includes("navigation--close"); // true
```

---

## Rules for Consumer Projects

- Import only from `"medius-expense-design-system"` — never from internal paths.
- For layout and custom styling that the design system doesn't cover, plain CSS/CSS Modules are fine — but prefer token CSS variables over hardcoded values.
- Do not recreate spacing, colours, or typography by hand if a token exists.
