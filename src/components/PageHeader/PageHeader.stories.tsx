import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./PageHeader";
import { Icon } from "../../icons/Icon";

const meta: Meta<typeof PageHeader> = {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

const BREADCRUMBS = [
  { label: "Home", href: "#" },
  { label: "Administration", href: "#" },
  { label: "Spending policies" },
];

export const Default: Story = {
  args: {
    breadcrumbs: BREADCRUMBS,
    actions: [
      { label: "Cancel", hierarchy: "tertiary" },
      { label: "Save draft", hierarchy: "secondary" },
      { label: "Publish", hierarchy: "primary" },
    ],
  },
};

export const PrimaryOnly: Story = {
  args: {
    breadcrumbs: BREADCRUMBS,
    actions: [{ label: "Save", hierarchy: "primary" }],
  },
};

export const WithIcons: Story = {
  args: {
    breadcrumbs: BREADCRUMBS,
    actions: [
      {
        label: "Delete",
        icon: <Icon name="actions--delete" size="small" />,
        hierarchy: "tertiary",
      },
      {
        label: "Export",
        icon: <Icon name="actions--download" size="small" />,
        hierarchy: "secondary",
      },
      {
        label: "Add policy",
        icon: <Icon name="actions--add" size="small" />,
        hierarchy: "primary",
      },
    ],
  },
};

export const IconOnlyActions: Story = {
  args: {
    breadcrumbs: BREADCRUMBS,
    actions: [
      {
        icon: <Icon name="actions--delete" size="small" />,
        hierarchy: "tertiary",
        ariaLabel: "Delete",
      },
      {
        icon: <Icon name="actions--download" size="small" />,
        hierarchy: "secondary",
        ariaLabel: "Export",
      },
      {
        icon: <Icon name="actions--add" size="small" />,
        hierarchy: "primary",
        ariaLabel: "Add",
      },
    ],
  },
};

export const NoActions: Story = {
  args: {
    breadcrumbs: BREADCRUMBS,
  },
};

export const ShallowBreadcrumb: Story = {
  args: {
    breadcrumbs: [{ label: "Home", href: "#" }, { label: "Dashboard" }],
    actions: [
      { label: "New expense", hierarchy: "primary" },
    ],
  },
};
