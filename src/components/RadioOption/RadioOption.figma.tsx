import figma from "@figma/code-connect";
import { RadioOption } from "./RadioOption";

figma.connect(
  RadioOption,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=323-5944",
  {
    props: {
      selected: figma.enum("Selected", {
        On:  true,
        Off: false,
      }),
      description: figma.boolean("Show description", {
        true:  figma.string("Description"),
        false: undefined,
      }),
      icon: figma.boolean("Show icon", {
        true:  figma.children("Icon"),
        false: undefined,
      }),
    },
    example: ({ selected, description, icon }) => (
      <RadioOption
        label="Label"
        description={description}
        icon={icon}
        selected={selected}
        onChange={() => {}}
      />
    ),
  }
);
