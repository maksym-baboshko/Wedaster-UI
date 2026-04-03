import type { Meta, StoryObj } from "@storybook/react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import { HugeiconsIcon } from "@hugeicons/react"
import { InboxDownloadIcon } from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty"
import { Kbd } from "./kbd"

const chartData = [
  { month: "Jan", components: 8 },
  { month: "Feb", components: 14 },
  { month: "Mar", components: 22 },
]

const chartConfig = {
  components: {
    label: "Components",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig

const meta = {
  title: "Parity/Display",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const AvatarPreview: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage alt="Wedaster" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop" />
        <AvatarFallback>WU</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>DS</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const ChartPreview: Story = {
  render: () => (
    <div className="w-[520px] max-w-full">
      <ChartContainer
        config={chartConfig}
        className="w-full"
        initialDimension={{ width: 520, height: 240 }}
      >
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="components" radius={18} fill="var(--color-components)" />
        </BarChart>
      </ChartContainer>
    </div>
  ),
}

export const EmptyPreview: Story = {
  render: () => (
    <Empty className="max-w-xl">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={InboxDownloadIcon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>No audit notes yet</EmptyTitle>
        <EmptyDescription>
          Once the design system pass starts, findings and tasks can live here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        Try adding a first parity checkpoint or import an existing audit list.
      </EmptyContent>
    </Empty>
  ),
}

export const KbdPreview: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      Toggle the sidebar with
      <Kbd>⌘</Kbd>
      <Kbd>B</Kbd>
    </div>
  ),
}
