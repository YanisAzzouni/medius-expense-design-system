import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Expenses", href: "#" },
      { label: "Q2 Report" },
    ],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Expenses" },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: "Dashboard" }],
  },
};

export const DeepPath: Story = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Administration", href: "#" },
      { label: "Policies", href: "#" },
      { label: "Spending limits", href: "#" },
      { label: "Edit policy" },
    ],
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      { label: "Home", onClick: () => alert("Home") },
      { label: "Settings", onClick: () => alert("Settings") },
      { label: "Profile" },
    ],
  },
};
