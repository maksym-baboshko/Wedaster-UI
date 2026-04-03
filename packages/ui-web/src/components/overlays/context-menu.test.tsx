import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu"

describe("context-menu", () => {
  it("renders labels, separators, shortcuts, and submenu content", async () => {
    const user = userEvent.setup()

    render(
      <ContextMenu>
        <ContextMenuTrigger>Open menu</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel inset>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem inset>
            Duplicate
            <ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Archive</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    )

    await user.pointer({
      target: screen.getByText("Open menu"),
      keys: "[MouseRight]",
    })
    await user.click(screen.getByText("More"))

    expect(screen.getByText("Actions")).not.toBeNull()
    expect(screen.getByText("⌘D")).not.toBeNull()
    expect(await screen.findByText("Archive")).not.toBeNull()
  })
})
