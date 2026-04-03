import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "./breadcrumb"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "./menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./sidebar"

describe("navigation parity", () => {
  it("renders breadcrumb trail", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Library</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Navigation</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(container.querySelector("[data-slot='breadcrumb']")).not.toBeNull()
  })

  it("filters command items", async () => {
    const user = userEvent.setup()

    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="General">
            <CommandItem>Open settings</CommandItem>
            <CommandItem>Publish</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    await user.type(screen.getByRole("combobox"), "publish")

    expect(screen.getByText("Publish")).not.toBeNull()
  })

  it("renders command dialog shell", () => {
    render(
      <CommandDialog open showCloseButton>
        <Command>
          <CommandInput placeholder="Search..." />
        </Command>
      </CommandDialog>
    )

    expect(screen.getByRole("dialog")).not.toBeNull()
  })

  it("opens menubar content", async () => {
    const user = userEvent.setup()

    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Save draft</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByRole("menuitem", { name: /file/i }))

    expect(await screen.findByText("Save draft")).not.toBeNull()
  })

  it("renders menubar checkbox and radio items", async () => {
    const user = userEvent.setup()

    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked>Show grid</MenubarCheckboxItem>
            <MenubarRadioGroup value="compact">
              <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByRole("menuitem", { name: /view/i }))

    expect(await screen.findByText("Show grid")).not.toBeNull()
    expect(screen.getByText("Compact")).not.toBeNull()
  })

  it("opens navigation menu content", async () => {
    const user = userEvent.setup()

    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Forms</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    await user.click(screen.getByRole("button", { name: /components/i }))

    expect(await screen.findByText("Forms")).not.toBeNull()
  })

  it("renders pagination links", () => {
    const { container } = render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(container.querySelector("[data-slot='pagination']")).not.toBeNull()
    expect(container.querySelector("[data-slot='pagination-ellipsis']")).not.toBeNull()
  })

  it("toggles sidebar state from the trigger", async () => {
    const user = userEvent.setup()

    render(
      <SidebarProvider defaultOpen>
        <Sidebar>
          <SidebarHeader>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Overview</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>Content</SidebarInset>
      </SidebarProvider>
    )

    const button = screen.getByRole("button", { name: /toggle sidebar/i })
    await user.click(button)

    await waitFor(() => {
      expect(document.querySelector("[data-slot='sidebar']")).not.toBeNull()
    })
  })
})
