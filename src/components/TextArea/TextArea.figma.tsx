import figma from "@figma/code-connect";
import { TextArea } from "./TextArea";

/**
 * Code Connect mapping for the Medius Expense TextArea component.
 *
 * Figma file: Medius Expense – Components (New)
 * File key:   ul424E6sV0pCsCIxzA7ZMC
 * Node:       Field/Text Area ComponentSet (26:4981)
 */
figma.connect(
  TextArea,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=26-4981",
  {
    props: {
      label: figma.boolean("Show label", {
        true: "Label",
        false: undefined,
      }),
      state: figma.enum("State", {
        Default: "default",
        Danger: "danger",
        Success: "success",
        "Read Only": "read-only",
        Highlighted: "highlighted",
        Disabled: "disabled",
      }),
    },

    example: ({ label, state }) => (
      <TextArea
        label={label}
        placeholder="Enter text…"
        state={state}
      />
    ),
  }
);
