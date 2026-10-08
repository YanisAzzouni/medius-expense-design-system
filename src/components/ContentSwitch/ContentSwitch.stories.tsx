import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ContentSwitch, ContentSwitchItem } from "./ContentSwitch";
import { Icon } from "../../icons/Icon";
import { Checkbox } from "../Checkbox/Checkbox";

const meta: Meta<typeof ContentSwitch> = {
  title: "Components/ContentSwitch",
  component: ContentSwitch,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof ContentSwitch>;

/* ─── Playground ─── */
export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState("week");
    return (
      <ContentSwitch label="Period" value={value} onChange={setValue}>
        <ContentSwitchItem value="day" label="Day" />
        <ContentSwitchItem value="week" label="Week" />
        <ContentSwitchItem value="month" label="Month" />
        <ContentSwitchItem value="year" label="Year" />
      </ContentSwitch>
    );
  },
};

/* ─── All states (static) ─── */
export const States: Story = {
  render: () => (
    <ContentSwitch value="selected" onChange={() => {}}>
      <ContentSwitchItem value="default" label="Default" />
      <ContentSwitchItem value="selected" label="Selected" />
      <ContentSwitchItem value="disabled" label="Disabled" disabled />
    </ContentSwitch>
  ),
};

/* ─── Icon-only items (with tooltips) ─── */
export const IconOnly: Story = {
  render: () => {
    const [value, setValue] = useState("list");
    return (
      <ContentSwitch value={value} onChange={setValue}>
        <ContentSwitchItem
          value="list"
          icon={<Icon name="actions--view-list" size="small" />}
          ariaLabel="List view"
          tooltip="List view"
        />
        <ContentSwitchItem
          value="grid"
          icon={<Icon name="actions--view-module" size="small" />}
          ariaLabel="Grid view"
          tooltip="Grid view"
        />
      </ContentSwitch>
    );
  },
};

/* ─── Full width ─── */
export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState("all");
    return (
      <div style={{ maxWidth: 480 }}>
        <ContentSwitch value={value} onChange={setValue} fullWidth>
          <ContentSwitchItem value="all" label="All" />
          <ContentSwitchItem value="pending" label="Pending" />
          <ContentSwitchItem value="approved" label="Approved" />
        </ContentSwitch>
      </div>
    );
  },
};

/* ─── Minimum options (2) ─── */
export const MinimumOptions: Story = {
  render: () => {
    const [value, setValue] = useState("yes");
    return (
      <ContentSwitch value={value} onChange={setValue}>
        <ContentSwitchItem value="yes" label="Yes" />
        <ContentSwitchItem value="no" label="No" />
      </ContentSwitch>
    );
  },
};

/* ───────────────────────────────────────────────────────────────
   Recipe: "Manage" trailing item that opens a popover to add/remove
   options, instead of selecting a value. The Manage item carries a
   sentinel value that onChange intercepts — it never becomes the
   switch's `value`, so it never shows as "selected". This is the
   exact pattern used for vehicle-type switching in the mileage
   rates wizard.
─────────────────────────────────────────────────────────────── */
export const WithManage: Story = {
  name: "Recipe: With Manage",
  render: () => {
    const ALL_VEHICLES = ["Car", "Moped", "Scooter", "Motorcycle", "Van", "Bicycle", "Truck"];
    const [vehicles, setVehicles] = useState(["Car", "Moped", "Scooter", "Motorcycle"]);
    const [current, setCurrent] = useState("Car");
    const [manageOpen, setManageOpen] = useState(false);
    const manageRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (!manageOpen) return;
      function onClick(e: MouseEvent) {
        if (manageRef.current && !manageRef.current.contains(e.target as Node)) setManageOpen(false);
      }
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
    }, [manageOpen]);

    function toggleVehicle(v: string) {
      setVehicles(prev => {
        if (prev.includes(v)) {
          if (prev.length <= 1) return prev;
          const next = prev.filter(x => x !== v);
          if (current === v) setCurrent(next[0] ?? "");
          return next;
        }
        setCurrent(v);
        return [...prev, v];
      });
    }

    return (
      <span ref={manageRef} style={{ position: "relative", display: "inline-flex" }}>
        <ContentSwitch
          value={current}
          onChange={v => (v === "__manage__" ? setManageOpen(o => !o) : setCurrent(v))}
        >
          {vehicles.map(v => (
            <ContentSwitchItem key={v} value={v} label={v} />
          ))}
          <ContentSwitchItem value="__manage__" icon={<Icon name="actions--settings" size="small" />} label="Manage" />
        </ContentSwitch>
        {manageOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              right: 0,
              zIndex: 50,
              background: "var(--color-white)",
              border: "1px solid var(--color-chalk-200)",
              borderRadius: 8,
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              minWidth: 180,
              padding: "6px 0",
            }}
          >
            {ALL_VEHICLES.map(v => (
              <div key={v} style={{ padding: "4px 12px" }}>
                <Checkbox label={v} checked={vehicles.includes(v)} onChange={() => toggleVehicle(v)} />
              </div>
            ))}
          </div>
        )}
      </span>
    );
  },
};

/* ───────────────────────────────────────────────────────────────
   Recipe: "See more" overflow. When there are more options than
   fit, the extras collapse behind a "See more" trigger that opens
   a small dropdown to pick one — like a browser's bookmark-bar
   overflow chevron. If the active value is one of the hidden
   options, the trigger itself shows that option's name (instead
   of "See more") and renders as selected, so it's always clear
   what's currently active even when tucked away.
─────────────────────────────────────────────────────────────── */
export const WithSeeMore: Story = {
  name: "Recipe: With See more",
  render: () => {
    const MAX_VISIBLE = 4;
    const options = ["Car", "Moped", "Scooter", "Motorcycle", "Van", "Bicycle"];
    const [current, setCurrent] = useState("Car");
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (!open) return;
      function onClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
      }
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
    }, [open]);

    const visible = options.slice(0, MAX_VISIBLE);
    const hidden = options.slice(MAX_VISIBLE);
    const activeHidden = hidden.includes(current) ? current : undefined;
    const triggerValue = activeHidden ?? "__see_more__";

    return (
      <ContentSwitch
        value={current}
        onChange={v => {
          if (v === "__see_more__" || v === activeHidden) {
            setOpen(o => !o);
            return;
          }
          setCurrent(v);
        }}
      >
        {visible.map(v => (
          <ContentSwitchItem key={v} value={v} label={v} />
        ))}
        <span ref={ref} style={{ position: "relative", display: "inline-flex" }}>
          <ContentSwitchItem
            value={triggerValue}
            icon={<Icon name="navigation--chevron-right" size="small" />}
            label={activeHidden ?? "See more"}
          />
          {open && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                zIndex: 50,
                background: "var(--color-white)",
                border: "1px solid var(--color-chalk-200)",
                borderRadius: 8,
                boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                minWidth: 140,
                padding: "6px 0",
              }}
            >
              {hidden.map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    setCurrent(v);
                    setOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "6px 12px",
                    border: "none",
                    background: v === activeHidden ? "var(--color-olive-100)" : "none",
                    color: v === activeHidden ? "var(--color-olive-800)" : "var(--color-chalk-900)",
                    fontWeight: v === activeHidden ? "var(--type-body-semibold-weight)" : "var(--type-body-default-weight)",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--type-body-default-size)",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </span>
      </ContentSwitch>
    );
  },
};
