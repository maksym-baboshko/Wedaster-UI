import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

function TabsHarness() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  )
}

describe("Tabs", () => {
  it("renders triggers", () => {
    render(<TabsHarness />)
    expect(screen.getByRole("tab", { name: /tab 1/i })).not.toBeNull()
    expect(screen.getByRole("tab", { name: /tab 2/i })).not.toBeNull()
  })

  it("shows default tab content", () => {
    render(<TabsHarness />)
    expect(screen.getByText("Content 1")).not.toBeNull()
    expect(screen.queryByText("Content 2")).toBeNull()
  })

  it("switches content on trigger click", async () => {
    const user = userEvent.setup()
    render(<TabsHarness />)
    await user.click(screen.getByRole("tab", { name: /tab 2/i }))
    expect(screen.getByText("Content 2")).not.toBeNull()
    expect(screen.queryByText("Content 1")).toBeNull()
  })
})
