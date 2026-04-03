import * as React from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

vi.mock("recharts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("recharts")>()

  return {
    ...actual,
    ResponsiveContainer: ({
      children,
    }: {
      children: React.ReactNode | ((dimension: { width: number; height: number }) => React.ReactNode)
    }) => (
      <div data-testid="responsive-container">
        {typeof children === "function"
          ? children({ width: 320, height: 200 })
          : children}
      </div>
    ),
  }
})

import {
  ChartContainer,
  ChartLegendContent,
  ChartStyle,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart"

function TestIcon() {
  return <svg data-testid="chart-icon" />
}

const visitorsTooltipPayload = [
  {
    graphicalItemId: "visitors-series",
    name: "visitors",
    value: 1280,
    color: "#0f0",
    dataKey: "visitors",
    payload: { visitors: 1280 },
  },
] as NonNullable<React.ComponentProps<typeof ChartTooltipContent>["payload"]>

const revenueTooltipPayload = [
  {
    graphicalItemId: "revenue-series",
    name: "revenue",
    value: 42,
    color: "#f5f5f5",
    payload: { series: "revenue" },
  },
] as NonNullable<React.ComponentProps<typeof ChartTooltipContent>["payload"]>

const legendPayload = [
  {
    dataKey: "revenue",
    value: "Revenue",
    color: "#f5f5f5",
    type: "line",
  },
  {
    dataKey: "visitors",
    value: "Visitors",
    color: "#0f0",
    type: "square",
  },
] as NonNullable<React.ComponentProps<typeof ChartLegendContent>["payload"]>

const config = {
  visitors: {
    label: "Visitors",
    color: "#0f0",
  },
  revenue: {
    label: "Revenue",
    theme: {
      light: "#111111",
      dark: "#f5f5f5",
    },
    icon: TestIcon,
  },
} satisfies ChartConfig

function ChartTestHarness({
  children,
  chartConfig = config,
}: {
  children: React.ReactNode
  chartConfig?: ChartConfig
}) {
  return (
    <ChartContainer
      config={chartConfig}
      initialDimension={{ width: 320, height: 200 }}
    >
      {children}
    </ChartContainer>
  )
}

describe("chart", () => {
  it("throws when tooltip content is rendered outside the chart container", () => {
    expect(() =>
      render(
        <ChartTooltipContent
          active
          payload={visitorsTooltipPayload}
        />
      )
    ).toThrow(/ChartContainer/i)
  })

  it("renders tooltip label, formatter output, and numeric values", () => {
    render(
      <ChartTestHarness>
        <ChartTooltipContent
          active
          label="visitors"
          payload={visitorsTooltipPayload}
        />
      </ChartTestHarness>
    )

    expect(screen.getAllByText("Visitors")).toHaveLength(2)
    expect(screen.getByText("1,280")).not.toBeNull()
  })

  it("supports custom label formatting, themed payload lookups, and custom formatters", () => {
    render(
      <ChartTestHarness>
        <ChartTooltipContent
          active
          indicator="dashed"
          labelKey="series"
          nameKey="series"
          label="revenue"
          labelFormatter={(value) => `Series: ${value}`}
          formatter={(value, name) => (
            <div>{`Formatted ${String(name)}: ${String(value)}`}</div>
          )}
          payload={revenueTooltipPayload}
        />
      </ChartTestHarness>
    )

    expect(screen.queryByText("Series: Revenue")).toBeNull()
    expect(screen.getByText("Formatted revenue: 42")).not.toBeNull()
  })

  it("renders legend content with icons and fallback swatches", () => {
    render(
      <ChartTestHarness>
        <ChartLegendContent
          verticalAlign="top"
          payload={legendPayload}
        />
      </ChartTestHarness>
    )

    expect(screen.getByTestId("chart-icon")).not.toBeNull()
    expect(screen.getByText("Revenue")).not.toBeNull()
    expect(screen.getByText("Visitors")).not.toBeNull()
  })

  it("skips inline styles when the config has no colors to emit", () => {
    const { container } = render(
      <ChartStyle
        id="chart-no-colors"
        config={{
          plain: {
            label: "Plain",
          },
        }}
      />
    )

    expect(container.querySelector("style")).toBeNull()
  })

  it("emits theme-aware style variables", () => {
    const { container } = render(<ChartStyle id="chart-theme" config={config} />)

    expect(container.querySelector("style")?.textContent).toContain(
      "--color-revenue: #111111;"
    )
    expect(container.querySelector("style")?.textContent).toContain(
      ".dark [data-chart=chart-theme]"
    )
  })
})
