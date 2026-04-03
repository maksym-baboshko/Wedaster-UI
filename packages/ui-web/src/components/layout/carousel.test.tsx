import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

const emblaApi = {
  canScrollPrev: vi.fn(),
  canScrollNext: vi.fn(),
  scrollPrev: vi.fn(),
  scrollNext: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
}

const emblaRef = vi.fn()

vi.mock("embla-carousel-react", () => ({
  default: vi.fn(() => [emblaRef, emblaApi]),
}))

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "./carousel"

function OutsideCarousel() {
  useCarousel()
  return null
}

describe("carousel", () => {
  beforeEach(() => {
    emblaApi.canScrollPrev.mockReturnValue(true)
    emblaApi.canScrollNext.mockReturnValue(false)
    emblaApi.scrollPrev.mockReset()
    emblaApi.scrollNext.mockReset()
    emblaApi.on.mockReset()
    emblaApi.off.mockReset()
  })

  it("throws when carousel controls are used outside the provider", () => {
    expect(() => render(<OutsideCarousel />)).toThrow(/Carousel/i)
  })

  it("wires the api, buttons, and keyboard navigation", async () => {
    const user = userEvent.setup()
    const setApi = vi.fn()

    const { unmount } = render(
      <Carousel setApi={setApi}>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )

    expect(setApi).toHaveBeenCalledWith(emblaApi)

    const region = screen.getByRole("region", { name: "" })
    const previous = screen.getByRole("button", { name: /previous slide/i })
    const next = screen.getByRole("button", { name: /next slide/i })

    expect(previous.hasAttribute("disabled")).toBe(false)
    expect(next.hasAttribute("disabled")).toBe(true)

    await user.click(previous)
    fireEvent.keyDown(region, { key: "ArrowLeft" })
    fireEvent.keyDown(region, { key: "ArrowRight" })

    expect(emblaApi.scrollPrev).toHaveBeenCalledTimes(2)
    expect(emblaApi.scrollNext).toHaveBeenCalledTimes(1)
    expect(emblaApi.on).toHaveBeenCalledWith("reInit", expect.any(Function))
    expect(emblaApi.on).toHaveBeenCalledWith("select", expect.any(Function))

    unmount()

    expect(emblaApi.off).toHaveBeenCalledWith("select", expect.any(Function))
  })

  it("supports vertical orientation layouts", () => {
    const { container } = render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Vertical 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )

    expect(container.querySelector("[data-slot='carousel-content'] > div")?.className).toContain(
      "flex-col"
    )
    expect(container.querySelector("[data-slot='carousel-item']")?.className).toContain(
      "pt-4"
    )
  })
})
