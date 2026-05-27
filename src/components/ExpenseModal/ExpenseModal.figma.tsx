import figma from "@figma/code-connect";
import { ExpenseModal } from "./ExpenseModal";

/* ─── Expense Modal (26:4646) ─── */
figma.connect(
  ExpenseModal,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=26-4646",
  {
    props: {
      showBanner: figma.boolean("Show banner"),
    },
    example: ({ showBanner }) => (
      <ExpenseModal
        title="Expense"
        tags={[
          { label: "e-invoice" },
          { label: "Medius card" },
          { label: "Merge" },
        ]}
        statusLabel="Draft"
        statusVariant="neutral"
        showBanner={showBanner}
        onClose={() => {}}
        onSave={() => {}}
        onNext={() => {}}
      />
    ),
  }
);
