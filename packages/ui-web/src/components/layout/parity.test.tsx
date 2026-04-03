import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Button } from "../primitives/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"
import { AspectRatio } from "./aspect-ratio"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group"
import { Carousel, CarouselContent, CarouselItem } from "./carousel"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { Item, ItemContent, ItemDescription, ItemTitle } from "./item"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable"
import { ScrollArea } from "./scroll-area"

describe("layout parity", () => {
  it("opens accordion content", async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="one">
          <AccordionTrigger>Open section</AccordionTrigger>
          <AccordionContent>Accordion body</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    await user.click(screen.getByRole("button", { name: /open section/i }))

    expect(screen.getByText("Accordion body")).not.toBeNull()
  })

  it("renders aspect-ratio wrapper", () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <div>Preview</div>
      </AspectRatio>
    )

    expect(container.querySelector("[data-slot='aspect-ratio']")).not.toBeNull()
  })

  it("renders button-group affordances", () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Left</Button>
        <ButtonGroupSeparator />
        <ButtonGroupText>Status</ButtonGroupText>
      </ButtonGroup>
    )

    expect(container.querySelector("[data-slot='button-group']")).not.toBeNull()
    expect(container.querySelector("[data-slot='button-group-separator']")).not.toBeNull()
  })

  it("renders carousel structure", () => {
    const { container } = render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>First</CarouselItem>
          <CarouselItem>Second</CarouselItem>
        </CarouselContent>
      </Carousel>
    )

    expect(container.querySelector("[data-slot='carousel']")).not.toBeNull()
    expect(container.querySelector("[data-slot='carousel-item']")).not.toBeNull()
  })

  it("toggles collapsible content", async () => {
    const user = userEvent.setup()

    render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button>Toggle details</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>
    )

    await user.click(screen.getByRole("button", { name: /toggle details/i }))

    expect(screen.getByText("Hidden details")).not.toBeNull()
  })

  it("renders item compound slots", () => {
    const { container } = render(
      <Item variant="outline">
        <div data-slot="item-media">M</div>
        <ItemContent>
          <ItemTitle>Parity</ItemTitle>
          <ItemDescription>Layout smoke coverage</ItemDescription>
        </ItemContent>
      </Item>
    )

    expect(container.querySelector("[data-slot='item']")).not.toBeNull()
    expect(screen.getByText("Parity")).not.toBeNull()
    expect(container.querySelector("[data-slot='item-media']")).not.toBeNull()
  })

  it("renders resizable panels", () => {
    const { container } = render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={50}>Left</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>Right</ResizablePanel>
      </ResizablePanelGroup>
    )

    expect(container.querySelector("[data-slot='resizable-panel-group']")).not.toBeNull()
    expect(container.querySelector("[data-slot='resizable-handle']")).not.toBeNull()
  })

  it("renders scroll area viewport", () => {
    const { container } = render(
      <ScrollArea className="h-20 w-20">
        <div>Long content</div>
      </ScrollArea>
    )

    expect(container.querySelector("[data-slot='scroll-area']")).not.toBeNull()
    expect(container.querySelector("[data-slot='scroll-area-viewport']")).not.toBeNull()
  })

  it("supports vertical carousel orientation controls", () => {
    const { container } = render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>First</CarouselItem>
          <CarouselItem>Second</CarouselItem>
        </CarouselContent>
        <Button data-slot="carousel-next">Next</Button>
      </Carousel>
    )

    expect(container.querySelector("[data-slot='carousel']")).not.toBeNull()
    expect(container.querySelector("[data-slot='carousel-item']")).not.toBeNull()
  })
})
