import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BoxSwitch } from "./BoxSwitch";

const meta: Meta<typeof BoxSwitch> = {
  title: "Components/BoxSwitch",
  component: BoxSwitch,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof BoxSwitch>;

export const Off: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ maxWidth: 880 }}>
        <BoxSwitch label="Distance ranges" checked={checked} onChange={setChecked} />
      </div>
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ maxWidth: 880 }}>
        <BoxSwitch
          label="Distance ranges"
          description="Split the reimbursement rate based on how far the employee has driven."
          checked={checked}
          onChange={setChecked}
        />
      </div>
    );
  },
};

export const Expanded: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <div style={{ maxWidth: 880 }}>
        <BoxSwitch
          label="Distance ranges"
          description="Split the reimbursement rate based on how far the employee has driven."
          checked={checked}
          onChange={setChecked}
        >
          <p style={{ margin: 0, fontFamily: "var(--font-family)", fontSize: 14, color: "var(--color-chalk-600)" }}>
            Range editor content goes here (e.g. start/end distance rows).
          </p>
        </BoxSwitch>
      </div>
    );
  },
};
