import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavItem } from "./NavItem";
import { Icon } from "../../icons/Icon";

const meta: Meta<typeof NavItem> = {
  title: "Components/NavItem",
  component: NavItem,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof NavItem>;

/* ─────────────────────────────────────────────────────────────
   Shared ".Navigation/Bar" shell — white card, 238px wide,
   16px padding, 4px gap between every row. Matches the Figma
   spacing spec (Expense Library, node 401:5202) exactly.
───────────────────────────────────────────────────────────── */
function NavBarShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 238,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: 16,
        background: "var(--color-white)",
        border: "1px solid var(--color-chalk-200)",
        borderRadius: 8,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-family)",
          fontSize: "var(--type-small-semibold-size)",
          fontWeight: "var(--type-small-semibold-weight)",
          lineHeight: "var(--type-small-semibold-line-height)",
          color: "var(--color-chalk-900)",
        }}
      >
        {title}
      </span>
      {children}
    </div>
  );
}

/* ─── Full worked example — mirrors the Figma reference exactly:
   "Medius France" title, Year 2026 expanded (Personal active),
   Year 2027 / Year 2028 collapsed. Fully interactive: click a
   year to expand/collapse it, click Personal/Company to select. ─── */
export const NavigationBar: Story = {
  name: "Navigation Bar (full example)",
  render: () => {
    const years = ["2026", "2027", "2028"];
    const [expanded, setExpanded] = useState("2026");
    const [active, setActive] = useState({ year: "2026", ownership: "personal" });

    return (
      <NavBarShell title="Medius France">
        {years.map(year => {
          const isExpanded = expanded === year;
          const containsActive = active.year === year;
          return (
            <div key={year} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <NavItem
                type="parent"
                icon={<Icon name="editor--event" size="small" />}
                label={`Year ${year}`}
                active={containsActive}
                expanded={isExpanded}
                onClick={() => setExpanded(e => (e === year ? "" : year))}
              />
              {isExpanded && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <NavItem
                    type="child"
                    label="Personal"
                    active={active.year === year && active.ownership === "personal"}
                    onClick={() => setActive({ year, ownership: "personal" })}
                  />
                  <NavItem
                    type="child"
                    label="Company"
                    active={active.year === year && active.ownership === "company"}
                    onClick={() => setActive({ year, ownership: "company" })}
                  />
                </div>
              )}
            </div>
          );
        })}
      </NavBarShell>
    );
  },
};

/* ─── Minimal interactive playground (single period) ─── */
export const Playground: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(true);
    const [active, setActive] = useState("personal");
    return (
      <div style={{ width: 238, display: "flex", flexDirection: "column", gap: 4 }}>
        <NavItem
          type="parent"
          icon={<Icon name="editor--event" size="small" />}
          label="Year 2026"
          active={expanded}
          expanded={expanded}
          onClick={() => setExpanded(e => !e)}
        />
        {expanded && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <NavItem type="child" label="Personal" active={active === "personal"} onClick={() => setActive("personal")} />
            <NavItem type="child" label="Company" active={active === "company"} onClick={() => setActive("company")} />
          </div>
        )}
        <NavItem type="parent" icon={<Icon name="editor--event" size="small" />} label="Year 2025" expanded={false} />
      </div>
    );
  },
};

/* ─── Every state side by side, for visual QA ─── */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-family)", fontSize: 12, color: "var(--color-chalk-500)" }}>
          Parent — collapsed
        </span>
        <div style={{ width: 206 }}>
          <NavItem type="parent" icon={<Icon name="editor--event" size="small" />} label="Default" expanded={false} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-family)", fontSize: 12, color: "var(--color-chalk-500)" }}>
          Parent — expanded / active
        </span>
        <div style={{ width: 206 }}>
          <NavItem type="parent" icon={<Icon name="editor--event" size="small" />} label="Active" active expanded />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-family)", fontSize: 12, color: "var(--color-chalk-500)" }}>
          Child — default
        </span>
        <div style={{ width: 206 }}>
          <NavItem type="child" label="Default" />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-family)", fontSize: 12, color: "var(--color-chalk-500)" }}>
          Child — active
        </span>
        <div style={{ width: 206 }}>
          <NavItem type="child" label="Active" active />
        </div>
      </div>
    </div>
  ),
};
