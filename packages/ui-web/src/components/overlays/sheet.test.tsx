import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

function SheetHarness() {
  return (
    <Sheet>
      <SheetTrigger>Open sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your details.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

describe("Sheet", () => {
  it("is closed by default", () => {
    render(<SheetHarness />)
    expect(screen.queryByText("Edit profile")).toBeNull()
  })

  it("opens on trigger click", async () => {
    const user = userEvent.setup()
    render(<SheetHarness />)
    await user.click(screen.getByText("Open sheet"))
    expect(await screen.findByText("Edit profile")).not.toBeNull()
    expect(screen.getByText("Update your details.")).not.toBeNull()
  })

  it("closes via the close button", async () => {
    const user = userEvent.setup()
    render(<SheetHarness />)
    await user.click(screen.getByText("Open sheet"))
    await screen.findByText("Edit profile")
    await user.click(screen.getByRole("button", { name: /close/i }))
    await waitFor(() => {
      expect(screen.queryByText("Edit profile")).toBeNull()
    })
  })
})
