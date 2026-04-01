import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverHeader,
  PopoverTrigger,
} from "./popover"

function PopoverHarness() {
  return (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover heading</PopoverTitle>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}

describe("Popover", () => {
  it("is closed by default", () => {
    render(<PopoverHarness />)
    expect(screen.queryByText("Popover heading")).toBeNull()
  })

  it("opens on trigger click", async () => {
    const user = userEvent.setup()
    render(<PopoverHarness />)
    await user.click(screen.getByText("Open popover"))
    expect(await screen.findByText("Popover heading")).not.toBeNull()
  })

  it("closes when clicking outside", async () => {
    const user = userEvent.setup()
    render(
      <div>
        <PopoverHarness />
        <button>Outside</button>
      </div>
    )
    await user.click(screen.getByText("Open popover"))
    await screen.findByText("Popover heading")
    await user.click(screen.getByText("Outside"))
    await waitFor(() => {
      expect(screen.queryByText("Popover heading")).toBeNull()
    })
  })
})
