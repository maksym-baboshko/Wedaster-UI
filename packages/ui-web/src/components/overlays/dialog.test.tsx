import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

function DialogHarness() {
  return (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite teammate</DialogTitle>
          <DialogDescription>
            Send access to the shared workspace.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

describe("Dialog", () => {
  it("opens and closes from the trigger", async () => {
    const user = userEvent.setup()

    render(<DialogHarness />)

    expect(screen.queryByRole("dialog")).toBeNull()

    await user.click(screen.getByRole("button", { name: /open dialog/i }))

    expect(await screen.findByRole("dialog")).not.toBeNull()
    expect(screen.getByText("Invite teammate")).not.toBeNull()

    await user.click(screen.getByRole("button", { name: /close/i }))

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull()
    })
  })
})
