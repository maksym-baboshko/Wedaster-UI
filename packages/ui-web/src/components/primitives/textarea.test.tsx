import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Textarea } from "./textarea"

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea placeholder="Write here" />)
    const el = screen.getByPlaceholderText("Write here")
    expect(el.tagName.toLowerCase()).toBe("textarea")
    expect(el.getAttribute("data-slot")).toBe("textarea")
  })

  it("updates value when typing", async () => {
    const user = userEvent.setup()
    render(<Textarea placeholder="Type here" />)
    const el = screen.getByPlaceholderText("Type here") as HTMLTextAreaElement
    await user.type(el, "hello world")
    expect(el.value).toBe("hello world")
  })

  it("respects disabled state", () => {
    render(<Textarea disabled placeholder="Disabled" />)
    expect(
      (screen.getByPlaceholderText("Disabled") as HTMLTextAreaElement).disabled
    ).toBe(true)
  })
})
