import type { Meta, StoryObj } from "@storybook/react"

import { Label } from "./label"
import { Input } from "./input"

const meta = {
  title: "Forms/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Email address",
  },
}

export const WithInput: Story = {
  render: () => (
    <div className="grid gap-2 w-[300px]">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}
