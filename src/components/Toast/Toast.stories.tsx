import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastContainer, useToast } from "./Toast";
import { Button } from "../Button";
import type { ToastVariant } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

/* ─── Single variants ─── */

export const Success: Story = {
  args: {
    id: "1",
    variant: "success",
    message: "Changes saved",
    description: "Your changes have been saved successfully.",
    onDismiss: () => {},
  },
};

export const Error: Story = {
  args: {
    id: "2",
    variant: "error",
    message: "Something went wrong",
    description: "We couldn't process your request. Please try again.",
    onDismiss: () => {},
  },
};

export const Warning: Story = {
  args: {
    id: "3",
    variant: "warning",
    message: "Budget exceeded",
    description: "This expense exceeds the team spending limit.",
    onDismiss: () => {},
  },
};

export const Information: Story = {
  args: {
    id: "4",
    variant: "information",
    message: "Syncing data",
    description: "Your changes will appear shortly.",
    onDismiss: () => {},
  },
};

export const NoDescription: Story = {
  args: {
    id: "5",
    variant: "success",
    message: "User deleted",
    onDismiss: () => {},
  },
};

/* ─── Interactive — fire toasts with buttons ─── */

export const Interactive: StoryObj = {
  render: () => {
    const { toasts, dismiss, success, error, warning, information } = useToast();

    const variants: { label: string; fn: () => void; variant: ToastVariant }[] = [
      { label: "Success",     fn: () => success("Changes saved", "Your changes have been saved."),          variant: "success"     },
      { label: "Error",       fn: () => error("Something went wrong", "Please try again."),                 variant: "error"       },
      { label: "Warning",     fn: () => warning("Budget exceeded", "This expense exceeds the limit."),      variant: "warning"     },
      { label: "Information", fn: () => information("Syncing…", "Your changes will appear shortly."),       variant: "information" },
    ];

    return (
      <div style={{ display: "flex", gap: 8 }}>
        {variants.map(({ label, fn }) => (
          <Button key={label} hierarchy="secondary" onClick={fn}>
            {label}
          </Button>
        ))}
        <ToastContainer toasts={toasts} onDismiss={dismiss} />
      </div>
    );
  },
};

/* ─── Stack — multiple toasts at once ─── */

export const Stack: StoryObj = {
  render: () => {
    const { toasts, dismiss, success, error, warning, information } = useToast();

    function fireAll() {
      information("Syncing data…");
      success("Row updated", "The expense has been saved.");
      warning("Approaching limit", "75% of the budget has been spent.");
      error("Export failed", "Please check your connection and try again.");
    }

    return (
      <div>
        <Button onClick={fireAll}>Fire all 4 toasts</Button>
        <ToastContainer toasts={toasts} onDismiss={dismiss} />
      </div>
    );
  },
};

/* ─── Persistent (no auto-dismiss) ─── */

export const Persistent: StoryObj = {
  render: () => {
    const { toasts, dismiss, toast } = useToast();

    return (
      <div>
        <Button
          hierarchy="secondary"
          onClick={() =>
            toast({ variant: "error", message: "Session expired", description: "Please log in again.", duration: 0 })
          }
        >
          Fire persistent toast
        </Button>
        <ToastContainer toasts={toasts} onDismiss={dismiss} />
      </div>
    );
  },
};
