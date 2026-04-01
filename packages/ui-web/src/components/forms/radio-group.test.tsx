import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { RadioGroup, RadioGroupItem } from "./radio-group"

function Harness({
  defaultValue,
  onValueChange,
}: {
  defaultValue?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <RadioGroup defaultValue={defaultValue} onValueChange={onValueChange}>
      <RadioGroupItem value="a" aria-label="Option A" />
      <RadioGroupItem value="b" aria-label="Option B" />
      <RadioGroupItem value="c" aria-label="Option C" />
    </RadioGroup>
  )
}

describe("RadioGroup", () => {
  it("renders all items", () => {
    render(<Harness />)
    expect(screen.getAllByRole("radio")).toHaveLength(3)
  })

  it("marks the defaultValue item as checked", () => {
    render(<Harness defaultValue="b" />)
    expect(
      screen.getByRole("radio", { name: /option b/i }).getAttribute("data-state")
    ).toBe("checked")
  })

  it("selects an item on click", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Harness onValueChange={onValueChange} />)
    await user.click(screen.getByRole("radio", { name: /option a/i }))
    expect(onValueChange).toHaveBeenCalledWith("a")
  })

  it("only one item is checked at a time", async () => {
    const user = userEvent.setup()
    render(<Harness defaultValue="a" />)
    await user.click(screen.getByRole("radio", { name: /option c/i }))
    expect(
      screen.getByRole("radio", { name: /option a/i }).getAttribute("data-state")
    ).toBe("unchecked")
    expect(
      screen.getByRole("radio", { name: /option c/i }).getAttribute("data-state")
    ).toBe("checked")
  })
})
