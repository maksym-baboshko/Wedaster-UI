import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { useForm } from "react-hook-form"

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
  FieldLabel,
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
  NativeSelectOptGroup,
  NativeSelectOption,
} from "./native-select"
import { Slider } from "./slider"
import { Toggle } from "./toggle"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

const meta = {
  title: "Parity/Forms",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

function FormExample() {
  const form = useForm<{ project: string }>({
    defaultValues: {
      project: "Wedaster UI",
    },
  })

  return (
    <Form {...form}>
      <form className="max-w-sm space-y-4">
        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The label, description and validation wiring come from the shared form helpers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export const CalendarPreview: Story = {
  render: () => <Calendar mode="single" selected={new Date("2026-04-03")} className="rounded-3xl border" />,
}

export const ComboboxPreview: Story = {
  render: () => (
    <div className="w-72">
      <Combobox>
        <ComboboxInput placeholder="Search framework..." showClear />
        <ComboboxContent>
          <ComboboxEmpty>No result found.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxItem value="nextjs">Next.js</ComboboxItem>
            <ComboboxItem value="react">React</ComboboxItem>
            <ComboboxItem value="storybook">Storybook</ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}

export const FieldPreview: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="release-title">Release title</FieldLabel>
      <FieldContent>
        <Input id="release-title" placeholder="Parity milestone" />
      </FieldContent>
      <FieldDescription>
        Field is a lighter-weight helper than the full RHF form composition.
      </FieldDescription>
    </Field>
  ),
}

export const FormPreview: Story = {
  render: () => <FormExample />,
}

export const InputGroupPreview: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="wedaster.dev" />
    </InputGroup>
  ),
}

export const InputOTPPreview: Story = {
  render: () => (
    <InputOTP maxLength={6} defaultValue="123456">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const NativeSelectPreview: Story = {
  render: () => (
    <NativeSelect defaultValue="docs" className="min-w-56">
      <NativeSelectOptGroup label="Channels">
        <NativeSelectOption value="docs">Documentation</NativeSelectOption>
        <NativeSelectOption value="storybook">Storybook</NativeSelectOption>
        <NativeSelectOption value="smoke">React smoke</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
}

export const SliderPreview: Story = {
  render: () => (
    <div className="w-80 max-w-full">
      <Slider defaultValue={[42]} max={100} step={1} />
    </div>
  ),
}

export const TogglePreview: Story = {
  render: () => <Toggle aria-label="Pin">Pinned</Toggle>,
}

export const ToggleGroupPreview: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="grid" variant="outline">
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="kanban">Kanban</ToggleGroupItem>
    </ToggleGroup>
  ),
}
