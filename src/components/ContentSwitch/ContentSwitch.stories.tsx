import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ContentSwitch, ContentSwitchItem } from "./ContentSwitch";
import { Icon } from "../../icons/Icon";

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
