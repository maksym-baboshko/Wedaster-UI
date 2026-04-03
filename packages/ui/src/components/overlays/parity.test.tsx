import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Button } from "../primitives/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"

describe("overlay parity", () => {
  it("opens and closes alert-dialog", async () => {
    const user = userEvent.setup()

    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Open alert dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm archive</AlertDialogTitle>
            <AlertDialogDescription>
              This can be restored later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Archive</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    await user.click(screen.getByRole("button", { name: /open alert dialog/i }))
    expect(await screen.findByRole("alertdialog")).not.toBeNull()

    await user.click(screen.getByRole("button", { name: /cancel/i }))
    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).toBeNull()
    })
  })

  it("opens context-menu on context click", async () => {
    const user = userEvent.setup()

    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Duplicate</ContextMenuItem>
          <ContextMenuCheckboxItem checked>Show grid</ContextMenuCheckboxItem>
          <ContextMenuRadioGroup value="compact">
            <ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Archive</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    )

    await user.pointer({
      target: screen.getByText("Right click"),
      keys: "[MouseRight]",
    })

    expect(await screen.findByText("Duplicate")).not.toBeNull()
    expect(screen.getByText("Show grid")).not.toBeNull()
  })

  it("opens drawer content", async () => {
    const user = userEvent.setup()

    render(
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Mobile panel</DrawerTitle>
            <DrawerDescription>Auxiliary context.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )

    await user.click(screen.getByRole("button", { name: /open drawer/i }))
    expect(await screen.findByText("Mobile panel")).not.toBeNull()
  })

  it("reveals hover-card content", async () => {
    const user = userEvent.setup()

    render(
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Button>Hover card</Button>
        </HoverCardTrigger>
        <HoverCardContent>Context preview</HoverCardContent>
      </HoverCard>
    )

    await user.hover(screen.getByRole("button", { name: /hover card/i }))

    expect(await screen.findByText("Context preview")).not.toBeNull()
  })
})
