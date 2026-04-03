import * as React from "react"
import { render, screen } from "@testing-library/react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import { describe, expect, it } from "vitest"

import { Avatar, AvatarFallback } from "./avatar"
import {
  ChartContainer,
  ChartStyle,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "./empty"
import { Kbd } from "./kbd"

const chartConfig = {
  components: {
    label: "Components",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig

describe("display parity", () => {
  it("renders avatar fallback and group affordances", () => {
    const { container } = render(
      <div>
        <Avatar size="lg">
          <AvatarFallback>WU</AvatarFallback>
          <span data-slot="avatar-badge" />
        </Avatar>
        <div data-slot="avatar-group">
          <div data-slot="avatar-group-count">+2</div>
        </div>
      </div>
    )

    expect(container.querySelector("[data-slot='avatar']")).not.toBeNull()
    expect(screen.getByText("WU")).not.toBeNull()
    expect(container.querySelector("[data-slot='avatar-badge']")).not.toBeNull()
    expect(container.querySelector("[data-slot='avatar-group-count']")).not.toBeNull()
  })

  it("renders chart container", () => {
    const { container } = render(
      <div style={{ width: 320 }}>
        <ChartContainer
          config={chartConfig}
          className="w-full"
          initialDimension={{ width: 320, height: 200 }}
        >
          <BarChart data={[{ month: "Jan", components: 5 }]}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="components" fill="var(--color-components)" />
          </BarChart>
        </ChartContainer>
      </div>
    )

    expect(container.querySelector("[data-slot='chart']")).not.toBeNull()
  })

  it("renders chart style rules for themed configs", () => {
    const { container } = render(
      <ChartStyle
        id="chart-test"
        config={{
          visitors: {
            label: "Visitors",
            theme: {
              light: "#0f0",
              dark: "#f00",
            },
          },
        }}
      />
    )

    expect(container.querySelector("style")?.textContent).toContain("--color-visitors")
  })

  it("renders empty state content", () => {
    const { container } = render(
      <Empty>
        <EmptyMedia>•</EmptyMedia>
        <EmptyTitle>Nothing here</EmptyTitle>
        <EmptyDescription>Start by adding a component.</EmptyDescription>
        <EmptyContent>Bring your first primitive into the surface.</EmptyContent>
      </Empty>
    )

    expect(container.querySelector("[data-slot='empty']")).not.toBeNull()
    expect(screen.getByText("Nothing here")).not.toBeNull()
    expect(container.querySelector("[data-slot='empty-content']")).not.toBeNull()
  })

  it("renders keyboard hint", () => {
    const { container } = render(<Kbd>⌘K</Kbd>)

    expect(container.querySelector("[data-slot='kbd']")).not.toBeNull()
  })
})
