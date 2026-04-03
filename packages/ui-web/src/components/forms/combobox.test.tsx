import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Combobox,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  useComboboxAnchor,
} from "./combobox"

function AnchoredCombobox() {
  const anchor = useComboboxAnchor()

  return (
    <Combobox>
      <div ref={anchor} />
      <ComboboxInput
        aria-label="Framework"
        placeholder="Search framework..."
        showTrigger={false}
        showClear
      />
      <ComboboxContent anchor={anchor}>
        <ComboboxGroup>
          <ComboboxLabel>Popular</ComboboxLabel>
          <ComboboxList>
            <ComboboxItem value="nextjs">Next.js</ComboboxItem>
            <ComboboxItem value="react">React</ComboboxItem>
          </ComboboxList>
        </ComboboxGroup>
        <ComboboxSeparator />
        <ComboboxEmpty>No result found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}

function ChipsCombobox() {
  return (
    <Combobox multiple defaultValue={["react"]}>
      <ComboboxChips>
        <ComboboxChipsInput aria-label="Libraries" />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="react">React</ComboboxItem>
          <ComboboxItem value="nextjs">Next.js</ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

describe("combobox", () => {
  it("renders grouped anchored content without the trigger button", async () => {
    const user = userEvent.setup()
    const { container } = render(<AnchoredCombobox />)

    await user.type(screen.getByRole("combobox", { name: /framework/i }), "next")

    expect(screen.getByText("Popular")).not.toBeNull()
    expect(screen.getByText("Next.js")).not.toBeNull()
    expect(container.querySelector("[data-slot='combobox-trigger']")).toBeNull()
  })

  it("renders chip input mode for multi-select comboboxes", async () => {
    const user = userEvent.setup()
    const { container } = render(<ChipsCombobox />)

    await user.type(screen.getByRole("combobox", { name: /libraries/i }), "rea")

    expect(container.querySelector("[data-slot='combobox-chips']")).not.toBeNull()
    expect(container.querySelector("[data-slot='combobox-chip-input']")).not.toBeNull()
  })
})
