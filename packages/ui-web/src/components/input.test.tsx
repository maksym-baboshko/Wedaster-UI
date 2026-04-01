import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Input } from "./input"

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Email" />)

    expect(screen.getByPlaceholderText("Email").getAttribute("data-slot")).toBe(
      "input"
    )
  })

  it("updates value when typing", async () => {
    const user = userEvent.setup()

    render(<Input placeholder="Type here" />)

    const input = screen.getByPlaceholderText("Type here") as HTMLInputElement

    await user.type(input, "wedaster")

    expect(input.value).toBe("wedaster")
  })

  it("keeps the disabled state", () => {
    render(<Input disabled placeholder="Disabled field" />)

    expect(
      (screen.getByPlaceholderText("Disabled field") as HTMLInputElement)
        .disabled
    ).toBe(true)
  })
})
