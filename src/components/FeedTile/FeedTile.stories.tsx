import type { Meta, StoryObj } from "@storybook/react";
import { FeedTile } from "./FeedTile";

const meta: Meta<typeof FeedTile> = {
  title: "Components/FeedTile",
  component: FeedTile,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FeedTile>;

export const Number: Story = {
  args: { label: "Cards enrolled", variant: "number", value: 312 },
};

export const Text: Story = {
  args: { label: "Connected on", variant: "text", value: "3 May 2026" },
};

export const Network: Story = {
  args: {
    label: "Network",
    variant: "network",
    logoSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Visa_2014_logo_detail.svg/2560px-Visa_2014_logo_detail.svg.png",
    logoAlt: "VISA",
  },
};

export const Row: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <FeedTile label="Cards enrolled" variant="number" value={312} />
      <FeedTile label="Unmatched"      variant="number" value={3} />
      <FeedTile label="Connected on"   variant="text"   value="Jun 13, 2026" />
      <FeedTile label="Last sync"      variant="text"   value="Today, 09:14" />
      <FeedTile label="Funds"          variant="text"   value="Company funds" />
      <FeedTile
        label="Network"
        variant="network"
        logoSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Visa_2014_logo_detail.svg/2560px-Visa_2014_logo_detail.svg.png"
        logoAlt="VISA"
      />
    </div>
  ),
};
