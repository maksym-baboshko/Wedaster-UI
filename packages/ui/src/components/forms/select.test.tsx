import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select"

function SelectHarness() {
  return (
    <Select>
      <SelectTrigger aria-label="Status">
        <SelectValue placeholder="Pick a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Statuses</SelectLabel>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="published">Published</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

describe("Select", () => {
  it("opens the menu and selects an option", async () => {
    const user = userEvent.setup()

    render(<SelectHarness />)

    const trigger = screen.getByRole("combobox", { name: /status/i })

    expect(trigger.textContent).toContain("Pick a status")

    await user.click(trigger)

    const option = await screen.findByRole("option", { name: "Published" })

    await user.click(option)

    await waitFor(() => {
      expect(trigger.textContent).toContain("Published")
    })
  })
})
