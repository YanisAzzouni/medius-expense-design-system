import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { Icon } from "../../icons/Icon";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "padded" },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "read-only", "highlighted", "disabled"],
    },
    hintType: {
      control: "select",
      options: ["neutral", "danger", "success"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    required: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

const EXPENSE_CATEGORIES = [
  { label: "Accommodation", value: "accommodation" },
  { label: "Air travel", value: "air-travel" },
  { label: "Car rental", value: "car-rental" },
  { label: "Client entertainment", value: "client-entertainment" },
  { label: "Meals & subsistence", value: "meals" },
  { label: "Office supplies", value: "office-supplies" },
];

const containerStyle = { maxWidth: 320 };

/* ─── Playground ─── */
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div style={containerStyle}>
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={EXPENSE_CATEGORIES}
        />
      </div>
    );
  },
  args: {
    label: "Expense category",
    placeholder: "Select a category…",
    state: "default",
    required: false,
  },
};

/* ─── All states ─── */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
      <Select
        label="Default (no selection)"
        placeholder="Select a category…"
        options={EXPENSE_CATEGORIES}
        leadingIcon={<Icon name="editor--attach-money" size="small" />}
        onChange={() => {}}
      />
      <Select
        label="Default (with selection)"
        placeholder="Select a category…"
        value="meals"
        options={EXPENSE_CATEGORIES}
        onChange={() => {}}
      />
      <Select
        label="Highlighted"
        placeholder="Select a category…"
        value="air-travel"
        state="highlighted"
        options={EXPENSE_CATEGORIES}
        onChange={() => {}}
      />
      <Select
        label="Read only"
        placeholder="Select a category…"
        value="accommodation"
        state="read-only"
        options={EXPENSE_CATEGORIES}
        onChange={() => {}}
      />
      <Select
        label="Disabled"
        placeholder="Select a category…"
        state="disabled"
        options={EXPENSE_CATEGORIES}
        onChange={() => {}}
      />
    </div>
  ),
};

/* ─── With hint ─── */
export const WithHint: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
      <Select
        label="Category"
        placeholder="Select…"
        options={EXPENSE_CATEGORIES}
        hint="Choose the expense type that best matches."
        hintType="neutral"
        onChange={() => {}}
      />
      <Select
        label="Category"
        placeholder="Select…"
        options={EXPENSE_CATEGORIES}
        hint="A category is required."
        hintType="danger"
        onChange={() => {}}
      />
    </div>
  ),
};

/* ─── With leading icon ─── */
export const WithLeadingIcon: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div style={containerStyle}>
        <Select
          label="Currency"
          placeholder="Select currency…"
          value={value}
          onChange={setValue}
          leadingIcon={<Icon name="editor--attach-money" size="small" />}
          options={[
            { label: "Euro (EUR)", value: "eur" },
            { label: "US Dollar (USD)", value: "usd" },
            { label: "British Pound (GBP)", value: "gbp" },
            { label: "Swedish Krona (SEK)", value: "sek" },
          ]}
        />
      </div>
    );
  },
};

/* ─── Required ─── */
export const Required: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div style={containerStyle}>
        <Select
          label="Expense category"
          placeholder="Select a category…"
          value={value}
          onChange={setValue}
          options={EXPENSE_CATEGORIES}
          required
          hint="Required to submit the expense."
          hintType="neutral"
        />
      </div>
    );
  },
};

/* ─── Controlled (interactive demo) ─── */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string>("meals");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
        <Select
          label="Expense category"
          value={value}
          onChange={setValue}
          options={EXPENSE_CATEGORIES}
        />
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-family)",
            fontSize: "var(--type-small-size)",
            color: "var(--color-chalk-500)",
          }}
        >
          Selected: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};
