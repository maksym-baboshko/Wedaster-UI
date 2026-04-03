import { cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import { afterEach, vi } from "vitest"

afterEach(() => {
  cleanup()
})

if (!globalThis.DOMRect.fromRect) {
  Object.defineProperty(globalThis.DOMRect, "fromRect", {
    value: ({
      x = 0,
      y = 0,
      width = 0,
      height = 0,
    }: Partial<DOMRectInit> = {}) => new DOMRect(x, y, width, height),
  })
}

if (!("PointerEvent" in globalThis)) {
  Reflect.set(globalThis, "PointerEvent", MouseEvent)
}

if (!("ResizeObserver" in globalThis)) {
  class ResizeObserver {
    observe() {}

    unobserve() {}

    disconnect() {}
  }

  Reflect.set(globalThis, "ResizeObserver", ResizeObserver)
}

if (!("IntersectionObserver" in globalThis)) {
  class IntersectionObserver {
    root = null
    rootMargin = ""
    thresholds = []

    observe() {}

    unobserve() {}

    disconnect() {}

    takeRecords() {
      return []
    }
  }

  Reflect.set(globalThis, "IntersectionObserver", IntersectionObserver)
}

if (typeof window.matchMedia !== "function") {
  const matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })

  Reflect.set(window, "matchMedia", matchMedia)
  Reflect.set(globalThis, "matchMedia", matchMedia)
}

if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = vi.fn()
}

if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false
}

if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {}
}

if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {}
}
