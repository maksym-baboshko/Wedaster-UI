import type { Meta, StoryObj } from "@storybook/react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Alert02Icon } from "@hugeicons/core-free-icons"

import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Progress } from "./progress"
import { Spinner } from "./spinner"

const meta = {
  title: "Parity/Feedback",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const AlertPreview: Story = {
  render: () => (
    <Alert className="max-w-xl">
      <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
      <AlertTitle>Migration in progress</AlertTitle>
      <AlertDescription>
        New shadcn primitives are landing in waves before the design-system pass.
      </AlertDescription>
    </Alert>
  ),
}

export const ProgressPreview: Story = {
  render: () => (
    <div className="w-80 max-w-full">
      <Progress value={72} />
    </div>
  ),
}

export const SpinnerPreview: Story = {
  render: () => (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <Spinner />
      Syncing Storybook coverage
    </div>
  ),
}
