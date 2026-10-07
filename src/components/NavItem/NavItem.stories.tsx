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

export const Playground: Story = {
  render: () => {
    const [active, setActive] = useState("personal");
    return (
      <div style={{ width: 260, display: "flex", flexDirection: "column", gap: 2 }}>
        <NavItem
          type="parent"
          icon={<Icon name="editor--event" size="small" />}
          label="Year 2026"
          active
          expanded
        />
        <NavItem type="child" label="Personal" active={active === "personal"} onClick={() => setActive("personal")} />
        <NavItem type="child" label="Company" active={active === "company"} onClick={() => setActive("company")} />
        <NavItem
          type="parent"
          icon={<Icon name="editor--event" size="small" />}
          label="Year 2025"
          expanded={false}
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ width: 260, display: "flex", flexDirection: "column", gap: 2 }}>
      <NavItem type="parent" label="Default parent" />
      <NavItem type="parent" label="Active parent" active />
      <NavItem type="child" label="Default child" />
      <NavItem type="child" label="Active child" active />
    </div>
  ),
};
