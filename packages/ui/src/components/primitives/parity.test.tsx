import * as React from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { DirectionProvider, useDirection } from "./direction"
import { Separator } from "./separator"

function DirectionHarness() {
  const direction = useDirection()
  return <span>{direction}</span>
}

describe("primitive parity", () => {
  it("provides direction context", () => {
    render(
      <DirectionProvider dir="rtl" direction="rtl">
        <DirectionHarness />
      </DirectionProvider>
    )

    expect(screen.getByText("rtl")).not.toBeNull()
  })

  it("renders separator slot", () => {
    const { container } = render(<Separator />)

    expect(container.querySelector("[data-slot='separator']")).not.toBeNull()
  })
})
