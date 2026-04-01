import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Badge } from "./badge"

describe("Badge", () => {
  it("renders with text", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).not.toBeNull()
  })

  it("renders with data-slot attribute", () => {
    render(<Badge>Tag</Badge>)
    expect(screen.getByText("Tag").getAttribute("data-slot")).toBe("badge")
  })

  it("renders all variants without throwing", () => {
    const variants = [
      "default",
      "secondary",
      "destructive",
      "outline",
      "ghost",
    ] as const
    for (const variant of variants) {
      expect(() =>
        render(<Badge variant={variant}>{variant}</Badge>)
      ).not.toThrow()
    }
  })
})
