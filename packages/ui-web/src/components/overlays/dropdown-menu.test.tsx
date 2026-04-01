import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  DropdownMenuCheckboxItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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

  it("renders compound menu parts and nested content", async () => {
    const user = userEvent.setup()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open actions</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DropdownMenuLabel inset>Workspace</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem checked inset>
                Notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuRadioGroup value="member">
                <DropdownMenuRadioItem value="owner">
                  Owner
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="member" inset>
                  Member
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset>More</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  Open
                  <DropdownMenuShortcut>Cmd+O</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    )

    await user.click(screen.getByRole("button", { name: /open actions/i }))

    expect(await screen.findByText("Workspace")).not.toBeNull()
    expect(screen.getByText("Notifications")).not.toBeNull()
    expect(screen.getByText("Owner")).not.toBeNull()
    expect(screen.getByText("Member")).not.toBeNull()

    await user.hover(screen.getByText("More"))

    expect(await screen.findByText("Open")).not.toBeNull()
    expect(screen.getByText("Cmd+O")).not.toBeNull()
  })
})
