import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { TooltipProvider } from "../overlays/tooltip"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./sidebar"

function SidebarConsumer() {
  useSidebar()
  return null
}

function setViewportWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: width,
    writable: true,
  })
}

describe("sidebar", () => {
  it("throws outside the sidebar provider", () => {
    expect(() => render(<SidebarConsumer />)).toThrow(/SidebarProvider/i)
  })

  it("supports controlled desktop state and keyboard toggling", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    setViewportWidth(1280)

    render(
      <TooltipProvider>
        <SidebarProvider open={false} onOpenChange={onOpenChange}>
          <Sidebar variant="floating">
            <SidebarHeader>
              <SidebarTrigger />
            </SidebarHeader>
          </Sidebar>
        </SidebarProvider>
      </TooltipProvider>
    )

    await user.click(screen.getByRole("button", { name: /toggle sidebar/i }))
    await user.keyboard("{Meta>}b{/Meta}")

    expect(onOpenChange).toHaveBeenCalled()
    expect(document.cookie).toContain("sidebar_state=true")
  })

  it("renders the non-collapsible branch", () => {
    setViewportWidth(1280)

    const { container } = render(
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarContent>Static content</SidebarContent>
        </Sidebar>
      </SidebarProvider>
    )

    expect(container.querySelector("[data-slot='sidebar']")).not.toBeNull()
    expect(screen.getByText("Static content")).not.toBeNull()
  })

  it("opens the mobile sheet when the trigger is pressed", async () => {
    const user = userEvent.setup()

    setViewportWidth(640)

    render(
      <SidebarProvider>
        <SidebarTrigger />
        <Sidebar>
          <SidebarContent>Mobile nav</SidebarContent>
        </Sidebar>
      </SidebarProvider>
    )

    await user.click(screen.getByRole("button", { name: /toggle sidebar/i }))

    expect(await screen.findByRole("dialog")).not.toBeNull()
    expect(screen.getByText("Mobile nav")).not.toBeNull()
  })

  it("renders menu affordances, tooltip, and nested menu structures when collapsed", async () => {
    const user = userEvent.setup()

    setViewportWidth(1280)

    const { container } = render(
      <TooltipProvider>
        <SidebarProvider defaultOpen={false}>
          <Sidebar side="right" variant="inset" collapsible="icon">
            <SidebarHeader>
              <SidebarInput placeholder="Search" />
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarGroupAction aria-label="Add section">+</SidebarGroupAction>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip="Overview"
                        variant="outline"
                        size="lg"
                        isActive
                      >
                        <span>Overview</span>
                      </SidebarMenuButton>
                      <SidebarMenuAction showOnHover aria-label="Open menu">
                        ⋯
                      </SidebarMenuAction>
                      <SidebarMenuBadge>9</SidebarMenuBadge>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#details" isActive>
                            <span>Details</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>Footer</SidebarFooter>
            <SidebarRail />
          </Sidebar>
          <SidebarInset>Page</SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    )

    await user.hover(screen.getByText("Overview"))

    expect(await screen.findByText("Overview", { selector: "[data-slot='tooltip-content'] *" })).not.toBeNull()
    expect(container.querySelector("[data-slot='sidebar-menu-action']")).not.toBeNull()
    expect(container.querySelector("[data-slot='sidebar-menu-badge']")).not.toBeNull()
    expect(container.querySelector("[data-slot='sidebar-menu-skeleton']")).not.toBeNull()
    expect(container.querySelector("[data-slot='sidebar-rail']")).not.toBeNull()
    expect(container.querySelector("[data-slot='sidebar-menu-sub-button']")).not.toBeNull()

    await waitFor(() => {
      expect(screen.getByText("Footer")).not.toBeNull()
    })
  })
})
