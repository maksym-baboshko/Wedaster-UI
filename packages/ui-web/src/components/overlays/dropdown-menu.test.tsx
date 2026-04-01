import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

function DropdownHarness({ onSelect }: { onSelect?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={onSelect}>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

describe("DropdownMenu", () => {
  it("is closed by default", () => {
    render(<DropdownHarness />)
    expect(screen.queryByText("Profile")).toBeNull()
  })

  it("opens on trigger click", async () => {
    const user = userEvent.setup()
    render(<DropdownHarness />)
    await user.click(screen.getByText("Open menu"))
    expect(await screen.findByText("Profile")).not.toBeNull()
    expect(screen.getByText("Settings")).not.toBeNull()
  })

  it("calls onSelect when item is clicked", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<DropdownHarness onSelect={onSelect} />)
    await user.click(screen.getByText("Open menu"))
    await user.click(await screen.findByText("Profile"))
    await waitFor(() => {
      expect(onSelect).toHaveBeenCalled()
    })
  })
})
