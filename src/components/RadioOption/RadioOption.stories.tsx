import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioOption } from "./RadioOption";

/* Placeholder icon matching the Figma design's icon slot */
function PlaceholderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 6h16M6 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const meta: Meta<typeof RadioOption> = {
  title: "Components/RadioOption",
  component: RadioOption,
  parameters: { layout: "padded" },
  argTypes: {
    label:       { control: "text" },
    description: { control: "text" },
    selected:    { control: "boolean" },
    disabled:    { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof RadioOption>;

/* ─── Playground ─── */
export const Playground: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return (
      <div style={{ width: 308 }}>
        <RadioOption
          {...args}
          selected={args.selected !== undefined ? args.selected : selected}
          onChange={setSelected}
          icon={<PlaceholderIcon />}
        />
      </div>
    );
  },
  args: {
    label:       "Label",
    description: "Description",
    disabled:    false,
  },
};

/* ─── All four visual states ─── */
export const AllStates: Story = {
  name: "All states",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 308 }}>
      <RadioOption
        label="Unselected"
        description="Default idle state"
        icon={<PlaceholderIcon />}
        selected={false}
        onChange={() => {}}
      />
      <RadioOption
        label="Selected"
        description="Active selected state"
        icon={<PlaceholderIcon />}
        selected
        onChange={() => {}}
      />
      <RadioOption
        label="No description"
        icon={<PlaceholderIcon />}
        selected={false}
        onChange={() => {}}
      />
      <RadioOption
        label="No icon"
        description="Icon slot omitted"
        selected={false}
        onChange={() => {}}
      />
      <RadioOption
        label="Disabled"
        description="Cannot be interacted with"
        icon={<PlaceholderIcon />}
        selected={false}
        disabled
        onChange={() => {}}
      />
      <RadioOption
        label="Disabled selected"
        description="Cannot be interacted with"
        icon={<PlaceholderIcon />}
        selected
        disabled
        onChange={() => {}}
      />
    </div>
  ),
};

/* ─── Radio group (single-select) ─── */
export const RadioGroup: Story = {
  name: "Radio group",
  render: () => {
    const OPTIONS = [
      { value: "government", label: "Government rate",  description: "Applies the official government mileage rate" },
      { value: "fixed",      label: "Fixed rate",       description: "A custom flat rate per kilometre" },
      { value: "custom",     label: "Custom rate",      description: "Configure a rate table per engine size and distance" },
    ];
    const [selected, setSelected] = useState("government");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 360 }}>
        {OPTIONS.map(opt => (
          <RadioOption
            key={opt.value}
            name="rate-type"
            value={opt.value}
            label={opt.label}
            description={opt.description}
            icon={<PlaceholderIcon />}
            selected={selected === opt.value}
            onChange={() => setSelected(opt.value)}
          />
        ))}
      </div>
    );
  },
};

/* ─── Without icon ─── */
export const WithoutIcon: Story = {
  name: "Without icon",
  render: () => {
    const [selected, setSelected] = useState("b");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 308 }}>
        {(["a", "b", "c"] as const).map(v => (
          <RadioOption
            key={v}
            name="no-icon-group"
            value={v}
            label={`Option ${v.toUpperCase()}`}
            description="Supporting description text"
            selected={selected === v}
            onChange={() => setSelected(v)}
          />
        ))}
      </div>
    );
  },
};
