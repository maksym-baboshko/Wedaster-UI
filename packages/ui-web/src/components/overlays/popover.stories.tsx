import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "../primitives/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover"

const meta = {
  title: "Overlay/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover title</PopoverTitle>
          <PopoverDescription>
            This is a popover with a title and description.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Settings</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Quick settings</PopoverTitle>
          <PopoverDescription>Adjust your preferences.</PopoverDescription>
        </PopoverHeader>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button size="sm" className="flex-1">
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
