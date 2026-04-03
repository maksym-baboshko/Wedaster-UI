import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

describe("Card", () => {
  it("renders the composed surface and exposes the size contract", () => {
    render(
      <Card data-testid="card" size="sm">
        <CardHeader>
          <CardTitle>Project health</CardTitle>
          <CardDescription>Weekly delivery summary</CardDescription>
          <CardAction>Updated now</CardAction>
        </CardHeader>
        <CardContent>72% of milestones are on track.</CardContent>
        <CardFooter>Keep shipping.</CardFooter>
      </Card>
    )

    expect(screen.getByTestId("card").getAttribute("data-size")).toBe("sm")
    expect(screen.getByText("Project health")).not.toBeNull()
    expect(screen.getByText("Weekly delivery summary")).not.toBeNull()
    expect(screen.getByText("Updated now")).not.toBeNull()
    expect(screen.getByText("72% of milestones are on track.")).not.toBeNull()
    expect(screen.getByText("Keep shipping.")).not.toBeNull()
  })
})
