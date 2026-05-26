import figma from "@figma/code-connect";
import { Select } from "./Select";

/**
 * Code Connect mapping for the Medius Expense Select/Dropdown component.
 *
 * Figma file: Medius Expense – Components (New)
 * File key:   ul424E6sV0pCsCIxzA7ZMC
 * Node:       Field/Dropdown ComponentSet (23:15152)
 */
figma.connect(
  Select,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=23-15152",
  {
    props: {
      label: figma.boolean("Show Label", {
        true: "Label",
        false: undefined,
      }),
      state: figma.enum("State", {
        Default: "default",
        "Read Only": "read-only",
        Highlighted: "highlighted",
      }),
    },

    example: ({ label, state }) => (
      <Select
        label={label}
        placeholder="Select an option…"
        state={state}
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2" },
          { label: "Option 3", value: "option-3" },
        ]}
        onChange={(value) => console.log(value)}
      />
    ),
  }
);
