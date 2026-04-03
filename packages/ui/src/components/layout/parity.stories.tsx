import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "../primitives/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"
import { AspectRatio } from "./aspect-ratio"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "./button-group"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "./item"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable"
import { ScrollArea } from "./scroll-area"

const meta = {
  title: "Parity/Layout",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const AccordionPreview: Story = {
  render: () => (
    <Accordion type="single" collapsible className="max-w-xl">
      <AccordionItem value="tokens">
        <AccordionTrigger>Semantic tokens</AccordionTrigger>
        <AccordionContent>
          Components consume semantic variables, so visual refactors stay
          centralized.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="stories">
        <AccordionTrigger>Storybook parity</AccordionTrigger>
        <AccordionContent>
          Every new shadcn primitive should stay visible and easy to verify.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const AspectRatioPreview: Story = {
  render: () => (
    <div className="w-[360px] max-w-full">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-3xl border bg-card">
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-muted via-card to-muted/70 text-sm text-muted-foreground">
          16:9 surface
        </div>
      </AspectRatio>
    </div>
  ),
}

export const ButtonGroupPreview: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Next</Button>
      <ButtonGroupSeparator />
      <ButtonGroupText>3 of 12</ButtonGroupText>
    </ButtonGroup>
  ),
}

export const CarouselPreview: Story = {
  render: () => (
    <div className="mx-auto max-w-xl px-12">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {["Foundations", "Forms", "Overlays"].map((label) => (
            <CarouselItem key={label} className="basis-full">
              <div className="rounded-3xl border bg-card p-8 text-center">
                <p className="text-sm text-muted-foreground">Slide</p>
                <p className="mt-2 text-lg font-medium">{label}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

export const CollapsiblePreview: Story = {
  render: () => (
    <Collapsible defaultOpen className="max-w-xl rounded-3xl border p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Release checklist</p>
          <p className="text-sm text-muted-foreground">
            Keep the summary short and shippable.
          </p>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pt-4 text-sm text-muted-foreground">
        Typecheck, lint, tests, Storybook, smoke app and docs contract.
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const ItemPreview: Story = {
  render: () => (
    <ItemGroup className="max-w-xl">
      <Item variant="outline">
        <ItemMedia variant="icon">01</ItemMedia>
        <ItemContent>
          <ItemTitle>Component parity</ItemTitle>
          <ItemDescription>
            Bring the remaining primitives into the shared UI package first.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Review</Button>
        </ItemActions>
      </Item>
      <Item variant="muted" size="sm">
        <ItemContent>
          <ItemTitle>Design system pass</ItemTitle>
          <ItemDescription>
            Only after parity is stable do we start shaping the custom recipes.
          </ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
}

export const ResizablePreview: Story = {
  render: () => (
    <div className="max-w-3xl rounded-3xl border">
      <ResizablePanelGroup orientation="horizontal" className="min-h-56">
        <ResizablePanel defaultSize={35}>
          <div className="flex size-full items-center justify-center p-6 text-sm text-muted-foreground">
            Navigation
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65}>
          <div className="flex size-full items-center justify-center p-6 text-sm text-muted-foreground">
            Content
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

export const ScrollAreaPreview: Story = {
  render: () => (
    <ScrollArea className="h-64 max-w-md rounded-3xl border p-4">
      <div className="space-y-3">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="rounded-2xl bg-muted p-3 text-sm">
            Scroll item {index + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
