import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button } from "./button"

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole("button", { name: /click me/i }).textContent).toBe(
      "Click me"
    )
  })

  it("fires onClick", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Click</Button>)

    await user.click(screen.getByRole("button", { name: /click/i }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("disabled state prevents clicks", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    )

    const button = screen.getByRole("button", { name: /disabled/i })

    await user.click(button)

    expect((button as HTMLButtonElement).disabled).toBe(true)
    expect(onClick).not.toHaveBeenCalled()
  })

  it("renders all variants without throwing", () => {
    const variants = [
      "default",
      "secondary",
      "outline",
      "ghost",
      "destructive",
    ] as const

    for (const variant of variants) {
      expect(() =>
        render(<Button variant={variant}>{variant}</Button>)
      ).not.toThrow()
    }
  })
})
