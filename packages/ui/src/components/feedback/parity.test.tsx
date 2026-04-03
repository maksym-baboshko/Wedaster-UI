import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Progress } from "./progress"
import { Spinner } from "./spinner"

describe("feedback parity", () => {
  it("renders alert content", () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Visual regression checks are required.</AlertDescription>
      </Alert>
    )

    expect(container.querySelector("[data-slot='alert']")).not.toBeNull()
    expect(screen.getByText("Heads up")).not.toBeNull()
  })

  it("renders progress with supplied value", () => {
    const { container } = render(<Progress value={55} />)

    expect(container.querySelector("[data-slot='progress']")).not.toBeNull()
  })

  it("renders spinner icon wrapper", () => {
    const { container } = render(<Spinner aria-label="Loading" />)

    expect(container.querySelector("[data-slot='spinner']")).not.toBeNull()
  })
})
