import type { Meta, StoryObj } from "@storybook/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Home01Icon,
  Menu01Icon,
  Note01Icon,
  Search01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "../primitives/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./command"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
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
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "./sidebar"

const meta = {
  title: "Parity/Navigation",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

function SidebarContentAction() {
  const { open, toggleSidebar } = useSidebar()

  return (
    <Button variant="outline" onClick={toggleSidebar}>
      {open ? "Hide sidebar" : "Open sidebar"}
    </Button>
  )
}

export const BreadcrumbPreview: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Parity</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Navigation</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const CommandPreview: Story = {
  render: () => (
    <div className="max-w-md rounded-4xl border">
      <Command>
        <CommandInput placeholder="Search actions..." />
        <CommandList>
          <CommandEmpty>No command found.</CommandEmpty>
          <CommandGroup heading="General">
            <CommandItem>
              <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
              Search components
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />
              Open settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
}

export const MenubarPreview: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New file</MenubarItem>
          <MenubarItem>
            Save draft
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Publish</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

export const NavigationMenuPreview: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-4 md:w-[420px]">
              <NavigationMenuLink href="#">Actions</NavigationMenuLink>
              <NavigationMenuLink href="#">Forms</NavigationMenuLink>
              <NavigationMenuLink href="#">Overlays</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const PaginationPreview: Story = {
  render: () => (
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
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

export const SidebarPreview: Story = {
  render: () => (
    <div className="relative max-w-5xl overflow-hidden rounded-3xl border bg-background">
      <SidebarProvider defaultOpen className="!min-h-[28rem]">
        <Sidebar className="!absolute !h-full">
          <SidebarHeader className="gap-1 border-b">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive size="lg">
                  <span>Wedaster UI</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
                      <span>Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <HugeiconsIcon icon={Note01Icon} strokeWidth={2} />
                      <span>Components</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
                      <span>Patterns</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="min-h-[28rem] bg-background">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <p className="text-sm font-medium">Sidebar Preview</p>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-2xl bg-muted/50" />
              <div className="aspect-video rounded-2xl bg-muted/50" />
              <div className="aspect-video rounded-2xl bg-muted/50" />
            </div>
            <div className="min-h-[16rem] rounded-2xl border bg-card p-6">
              <h3 className="text-xl font-semibold">Sidebar composition</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The story now keeps the desktop sidebar anchored inside the
                preview frame instead of the browser viewport, so the shell
                behaves like a bounded layout.
              </p>
              <div className="mt-4">
                <SidebarContentAction />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ),
}
