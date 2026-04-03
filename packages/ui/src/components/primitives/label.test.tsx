import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Label } from "./label"

describe("Label", () => {
  it("renders label text", () => {
    render(<Label>Email</Label>)
    expect(screen.getByText("Email")).not.toBeNull()
  })

  it("sets htmlFor correctly", () => {
    render(<Label htmlFor="email-input">Email</Label>)
    expect(screen.getByText("Email").getAttribute("for")).toBe("email-input")
  })

  it("renders with data-slot attribute", () => {
    render(<Label>Name</Label>)
    expect(
      screen.getByText("Name").getAttribute("data-slot")
    ).toBe("label")
  })
})
