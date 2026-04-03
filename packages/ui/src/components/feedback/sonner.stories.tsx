import type { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"

import { Button } from "../primitives/button"
import { Toaster } from "./sonner"

const meta = {
  title: "Feedback/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

export const Success: Story = {
  render: () => (
    <Button onClick={() => toast.success("Changes saved successfully")}>
      Show success toast
    </Button>
  ),
}

export const Error: Story = {
  render: () => (
    <Button
      variant="destructive"
      onClick={() => toast.error("Something went wrong")}
    >
      Show error toast
    </Button>
  ),
}

export const Info: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.info("New update available")}
    >
      Show info toast
    </Button>
  ),
}

export const Warning: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.warning("Your session is expiring soon")}
    >
      Show warning toast
    </Button>
  ),
}
