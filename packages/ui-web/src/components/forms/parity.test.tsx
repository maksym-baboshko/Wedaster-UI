import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm } from "react-hook-form"
import { describe, expect, it } from "vitest"

import { Input } from "../primitives/input"
import { Calendar } from "./calendar"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./combobox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./field"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./input-otp"
import {
  NativeSelect,
  NativeSelectOption,
} from "./native-select"
import { Slider } from "./slider"
import { Toggle } from "./toggle"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

function FormHarness() {
  const form = useForm<{ name: string }>({
    defaultValues: { name: "" },
    mode: "onSubmit",
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => undefined)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Project name is required." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Used in release notes.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  )
}

describe("forms parity", () => {
  it("renders the calendar root", () => {
    const { container } = render(
      <Calendar mode="single" selected={new Date("2026-04-03")} />
    )

    expect(container.querySelector("[data-slot='calendar']")).not.toBeNull()
  })

  it("opens combobox options", async () => {
    const user = userEvent.setup()

    render(
      <Combobox>
        <ComboboxInput aria-label="Framework" placeholder="Search..." showClear />
        <ComboboxContent>
          <ComboboxEmpty>No result found.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxItem value="nextjs">Next.js</ComboboxItem>
            <ComboboxItem value="react">React</ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )

    await user.click(screen.getByRole("button", { name: "" }))

    expect(await screen.findByText("Next.js")).not.toBeNull()
  })

  it("renders field helpers", () => {
    const { container } = render(
      <FieldSet>
        <FieldLegend variant="label">Release metadata</FieldLegend>
        <Field orientation="horizontal" data-invalid>
          <FieldLabel htmlFor="release-name">Release name</FieldLabel>
          <FieldContent>
            <FieldTitle>Internal title</FieldTitle>
            <Input id="release-name" />
            <FieldDescription>Used in changelog headings.</FieldDescription>
          </FieldContent>
        </Field>
        <FieldSeparator>Validation</FieldSeparator>
        <FieldError
          errors={[
            { message: "Title is required." },
            { message: "Title is required." },
            { message: "Keep it short." },
          ]}
        />
      </FieldSet>
    )

    expect(container.querySelector("[data-slot='field-set']")).not.toBeNull()
    expect(container.querySelector("[data-slot='field']")).not.toBeNull()
    expect(screen.getByText("Release name")).not.toBeNull()
    expect(screen.getByRole("alert")).not.toBeNull()
  })

  it("shows form validation message", async () => {
    const user = userEvent.setup()

    render(<FormHarness />)

    await user.click(screen.getByRole("button", { name: /submit/i }))

    expect(await screen.findByText("Project name is required.")).not.toBeNull()
  })

  it("renders input-group structure", () => {
    const { container } = render(
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput />
      </InputGroup>
    )

    expect(container.querySelector("[data-slot='input-group']")).not.toBeNull()
    expect(container.querySelector("[data-slot='input-group-control']")).not.toBeNull()
  })

  it("renders input otp slots", () => {
    const { container } = render(
      <InputOTP maxLength={4} defaultValue="1234">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    )

    expect(container.querySelector("[data-slot='input-otp']")).not.toBeNull()
    expect(container.querySelectorAll("[data-slot='input-otp-slot']")).toHaveLength(4)
  })

  it("renders native select options", () => {
    render(
      <NativeSelect defaultValue="docs" aria-label="Channel">
        <NativeSelectOption value="docs">Docs</NativeSelectOption>
        <NativeSelectOption value="storybook">Storybook</NativeSelectOption>
      </NativeSelect>
    )

    const select = screen.getByRole("combobox", { name: /channel/i })
    expect(select).not.toBeNull()
  })

  it("renders slider root", () => {
    const { container } = render(<Slider defaultValue={[33]} max={100} />)

    expect(container.querySelector("[data-slot='slider']")).not.toBeNull()
  })

  it("toggles pressed state", async () => {
    const user = userEvent.setup()

    render(<Toggle aria-label="Pin">Pinned</Toggle>)

    const toggle = screen.getByRole("button", { name: /pin/i })
    await user.click(toggle)

    await waitFor(() => {
      expect(toggle.getAttribute("aria-pressed")).toBe("true")
    })
  })

  it("renders toggle-group items", () => {
    const { container } = render(
      <ToggleGroup type="single" defaultValue="grid">
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        <ToggleGroupItem value="list">List</ToggleGroupItem>
      </ToggleGroup>
    )

    expect(container.querySelector("[data-slot='toggle-group']")).not.toBeNull()
    expect(container.querySelectorAll("[data-slot='toggle-group-item']")).toHaveLength(2)
  })
})
