import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Skeleton } from "./skeleton"

describe("Skeleton", () => {
  it("renders with data-slot attribute", () => {
    render(<Skeleton data-testid="sk" />)
    expect(
      screen.getByTestId("sk").getAttribute("data-slot")
    ).toBe("skeleton")
  })

  it("applies custom className", () => {
    render(<Skeleton data-testid="sk" className="h-4 w-32" />)
    const el = screen.getByTestId("sk")
    expect(el.className).toContain("h-4")
    expect(el.className).toContain("w-32")
  })
})
