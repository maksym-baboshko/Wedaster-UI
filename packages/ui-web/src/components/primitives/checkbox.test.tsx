import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox aria-label="Accept" />)
    const cb = screen.getByRole("checkbox", { name: /accept/i })
    expect(cb.getAttribute("data-state")).toBe("unchecked")
  })

  it("renders checked when defaultChecked", () => {
    render(<Checkbox aria-label="Accept" defaultChecked />)
    const cb = screen.getByRole("checkbox", { name: /accept/i })
    expect(cb.getAttribute("data-state")).toBe("checked")
  })

  it("toggles on click", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Toggle" />)
    const cb = screen.getByRole("checkbox", { name: /toggle/i })
    await user.click(cb)
    expect(cb.getAttribute("data-state")).toBe("checked")
    await user.click(cb)
    expect(cb.getAttribute("data-state")).toBe("unchecked")
  })

  it("calls onCheckedChange", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Notify" onCheckedChange={onCheckedChange} />)
    await user.click(screen.getByRole("checkbox", { name: /notify/i }))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it("does not fire when disabled", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Checkbox aria-label="Disabled" disabled onCheckedChange={onCheckedChange} />
    )
    await user.click(screen.getByRole("checkbox", { name: /disabled/i }))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })
})
