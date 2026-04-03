import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { DirectionProvider, useDirection } from "./direction"
import { Separator } from "./separator"

const meta = {
  title: "Parity/Primitives",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

function DirectionBadge() {
  const direction = useDirection()

  return (
    <div className="rounded-2xl border px-3 py-2 text-sm">
      Active direction: <span className="font-medium">{direction}</span>
    </div>
  )
}

export const DirectionPreview: Story = {
  render: () => (
    <DirectionProvider dir="rtl" direction="rtl">
      <DirectionBadge />
    </DirectionProvider>
  ),
}

export const SeparatorPreview: Story = {
  render: () => (
    <div className="max-w-sm rounded-3xl border p-4">
      <p className="text-sm font-medium">Wedaster UI</p>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">
        Shared primitive separators now exist in the public library surface.
      </p>
    </div>
  ),
}
