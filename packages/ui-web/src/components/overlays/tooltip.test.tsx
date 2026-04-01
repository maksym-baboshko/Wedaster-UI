import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

function TooltipHarness() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent data-testid="tooltip-content">Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

describe("Tooltip", () => {
  it("shows tooltip content on hover", async () => {
    const user = userEvent.setup()
    render(<TooltipHarness />)
    expect(screen.queryByRole("tooltip")).toBeNull()
    await user.hover(screen.getByText("Hover me"))
    expect(await screen.findByRole("tooltip")).not.toBeNull()
  })

  it("renders tooltip content with correct data-slot", async () => {
    const user = userEvent.setup()
    render(<TooltipHarness />)
    await user.hover(screen.getByText("Hover me"))
    const content = await screen.findByTestId("tooltip-content")
    expect(content.getAttribute("data-slot")).toBe("tooltip-content")
  })
})
