import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "./item"

describe("item", () => {
  it("renders grouped item composition across variants", () => {
    const { container } = render(
      <ItemGroup>
        <Item asChild size="xs" variant="muted">
          <a href="#activity">
            <ItemHeader>
              <ItemTitle>Activity</ItemTitle>
              <ItemActions>Open</ItemActions>
            </ItemHeader>
            <ItemContent>
              <ItemDescription>Recent timeline summary.</ItemDescription>
            </ItemContent>
            <ItemFooter>
              <span>2 min ago</span>
              <span>Live</span>
            </ItemFooter>
          </a>
        </Item>
        <ItemSeparator />
        <Item variant="outline">
          <ItemMedia variant="image">
            <img alt="Preview" src="https://example.com/preview.png" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Preview</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
    )

    expect(container.querySelector("[data-slot='item-group']")).not.toBeNull()
    expect(container.querySelector("[data-slot='item-separator']")).not.toBeNull()
    expect(container.querySelector("[data-slot='item-header']")).not.toBeNull()
    expect(container.querySelector("[data-slot='item-footer']")).not.toBeNull()
    expect(container.querySelector("[data-slot='item-media'][data-variant='image']")).not.toBeNull()
    expect(screen.getByText("Activity")).not.toBeNull()
    expect(screen.getByText("Preview")).not.toBeNull()
  })
})
