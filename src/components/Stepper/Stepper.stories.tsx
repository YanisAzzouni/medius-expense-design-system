import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";
import { LabelTag } from "../LabelTag/LabelTag";
import { Icon } from "../../icons/Icon";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const STEPS = [
  {
    title: "Company details",
    description: "Enter your company name and registration number.",
  },
  {
    title: "Bank account",
    description: "Link the bank account for reimbursements.",
  },
  {
    title: "Spending policy",
    description: "Set per-category limits and approval thresholds.",
  },
  {
    title: "Review & submit",
    description: "Confirm all details before submitting.",
  },
];

/* ── Step 1 active ── */
export const Step1Active: Story = {
  args: {
    steps: STEPS,
    activeStep: 0,
    nextLabel: "Next",
  },
};

/* ── Step 2 active (step 1 done) ── */
export const Step2Active: Story = {
  args: {
    steps: [
      {
        ...STEPS[0],
        children: (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <LabelTag
              label="Medius AB — registered"
              variant="green"
              size="small"
              icon={<Icon name="navigation--check" size="small" />}
            />
          </div>
        ),
      },
      ...STEPS.slice(1),
    ],
    activeStep: 1,
    nextLabel: "Next",
    secondaryLabel: "Save draft",
  },
};

/* ── Last step ── */
export const LastStep: Story = {
  args: {
    steps: STEPS,
    activeStep: 3,
    nextLabel: "Submit",
  },
};

/* ── Interactive ── */
export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <Stepper
        steps={STEPS}
        activeStep={active}
        onBack={active > 0 ? () => setActive((p) => p - 1) : undefined}
        onNext={active < STEPS.length - 1 ? () => setActive((p) => p + 1) : undefined}
        nextLabel={active === STEPS.length - 1 ? "Submit" : "Next"}
      />
    );
  },
};

/* ── With content slot ── */
export const WithContentSlot: Story = {
  args: {
    steps: [
      {
        title: "Company details",
        description: "Enter your company name and registration number.",
        children: (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              placeholder="Company name"
              style={{ height: 40, padding: "0 12px", border: "1px solid #eaeaed", borderRadius: 4, fontFamily: "inherit", fontSize: 14 }}
            />
            <input
              placeholder="Registration number"
              style={{ height: 40, padding: "0 12px", border: "1px solid #eaeaed", borderRadius: 4, fontFamily: "inherit", fontSize: 14 }}
            />
          </div>
        ),
      },
      ...STEPS.slice(1),
    ],
    activeStep: 0,
    nextLabel: "Next",
  },
};
