import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Playground: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch label="Enable compensation" checked={checked} onChange={setChecked} />;
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Switch label="Off" checked={false} onChange={() => {}} />
      <Switch label="On" checked={true} onChange={() => {}} />
      <Switch label="Disabled off" checked={false} onChange={() => {}} disabled />
      <Switch label="Disabled on" checked={true} onChange={() => {}} disabled />
    </div>
  ),
};
