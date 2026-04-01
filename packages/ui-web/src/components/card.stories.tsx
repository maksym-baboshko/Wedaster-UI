import type { Meta, StoryObj } from "@storybook/react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Button } from "./button"

const meta = {
  title: "Layout/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Wedaster UI</CardTitle>
        <CardDescription>
          A baseline card story for layout and spacing verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This content area gives us a stable visual baseline in both light and
          dark themes.
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="outline">Secondary</Button>
      </CardFooter>
    </Card>
  ),
}

export const Compact: Story = {
  render: () => (
    <Card size="sm" className="w-[320px]">
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
        <CardDescription>Smaller vertical rhythm.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Useful for denser dashboard-style layouts.
        </p>
      </CardContent>
    </Card>
  ),
}
