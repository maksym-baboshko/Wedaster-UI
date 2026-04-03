import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Switch } from "./switch"

describe("Switch", () => {
  it("renders unchecked by default", () => {
    render(<Switch aria-label="Notifications" />)
    const sw = screen.getByRole("switch", { name: /notifications/i })
    expect(sw.getAttribute("data-state")).toBe("unchecked")
  })

  it("renders checked when defaultChecked", () => {
    render(<Switch aria-label="Notifications" defaultChecked />)
    const sw = screen.getByRole("switch", { name: /notifications/i })
    expect(sw.getAttribute("data-state")).toBe("checked")
  })

  it("toggles on click", async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Toggle" />)
    const sw = screen.getByRole("switch", { name: /toggle/i })
    await user.click(sw)
    expect(sw.getAttribute("data-state")).toBe("checked")
    await user.click(sw)
    expect(sw.getAttribute("data-state")).toBe("unchecked")
  })

  it("calls onCheckedChange", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Feature" onCheckedChange={onCheckedChange} />)
    await user.click(screen.getByRole("switch", { name: /feature/i }))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it("does not fire when disabled", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Switch aria-label="Disabled" disabled onCheckedChange={onCheckedChange} />
    )
    await user.click(screen.getByRole("switch", { name: /disabled/i }))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })
})
