import figma from "@figma/code-connect";
import { Tooltip } from "./Tooltip";

figma.connect(
  Tooltip,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=24-16760",
  {
    props: {
      // Figma beak booleans → placement prop
      // bottomBeak = true  →  tooltip is above the trigger (placement="top")
      // topBeak    = true  →  tooltip is below the trigger (placement="bottom")
      // rightBeak  = true  →  tooltip is to the left      (placement="left")
      // leftBeak   = true  →  tooltip is to the right     (placement="right")
      placement: figma.enum("Beak", {
        Bottom: "top",
        Top:    "bottom",
        Right:  "left",
        Left:   "right",
      }),
    },
    example: ({ placement }) => (
      <Tooltip content="Tooltip text" placement={placement}>
        <button type="button">Trigger</button>
      </Tooltip>
    ),
  }
);
