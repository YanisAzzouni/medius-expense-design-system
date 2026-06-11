import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "default", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: "default" },
};

export const Small: Story = {
  args: { size: "small" },
};

export const Large: Story = {
  args: { size: "large" },
};

export const AllSizes: StoryObj = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Spinner size="small" />
      <Spinner size="default" />
      <Spinner size="large" />
    </div>
  ),
};
