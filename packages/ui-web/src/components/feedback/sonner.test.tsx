import { act, render, screen } from "@testing-library/react"
import { toast } from "sonner"
import { describe, expect, it } from "vitest"

import { Toaster } from "./sonner"

describe("Toaster", () => {
  it("renders Wedaster toast defaults and displays a toast", async () => {
    render(<Toaster theme="dark" />)

    act(() => {
      toast.success("Saved")
    })

    expect(await screen.findByText("Saved")).not.toBeNull()

    const toaster = document.querySelector(
      '[data-sonner-toaster="true"]'
    ) as HTMLElement | null

    expect(toaster).not.toBeNull()
    expect(toaster?.style.getPropertyValue("--normal-bg")).toBe(
      "var(--popover)"
    )
  })
})
