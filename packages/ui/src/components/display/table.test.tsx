import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

describe("Table", () => {
  it("renders rows and cells", () => {
    render(
      <Table>
        <TableCaption>Invoice summary</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-001</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByRole("table")).not.toBeNull()
    expect(screen.getByText("Invoice summary")).not.toBeNull()
    expect(screen.getByText("INV-001")).not.toBeNull()
    expect(screen.getAllByRole("row")).toHaveLength(2)
  })
})
