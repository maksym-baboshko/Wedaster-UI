import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./menubar"

describe("menubar", () => {
  it("renders labels, separators, shortcuts, and submenu content", async () => {
    const user = userEvent.setup()

    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel inset>Display</MenubarLabel>
            <MenubarSeparator />
            <MenubarItem inset>
              Toggle preview
              <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger inset>Density</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Compact</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByRole("menuitem", { name: /view/i }))
    await user.click(screen.getByText("Density"))

    expect(screen.getByText("Display")).not.toBeNull()
    expect(screen.getByText("⌘P")).not.toBeNull()
    expect(await screen.findByText("Compact")).not.toBeNull()
  })
})
