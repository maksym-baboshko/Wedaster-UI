import type { Meta, StoryObj } from "@storybook/react"

import { Textarea } from "./textarea"

const meta = {
  title: "Forms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <div className="w-[320px]">
      <Textarea {...args} />
    </div>
  ),
  args: {
    placeholder: "Write your message here...",
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled textarea",
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "Invalid content",
  },
}
