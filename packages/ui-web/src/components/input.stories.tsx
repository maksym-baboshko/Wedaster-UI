import type { Meta, StoryObj } from "@storybook/react"

import { Input } from "./input"

const meta = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  render: (args) => (
    <div className="w-[320px]">
      <Input {...args} />
    </div>
  ),
  args: {
    placeholder: "Enter your email",
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "broken@example.com",
  },
}
