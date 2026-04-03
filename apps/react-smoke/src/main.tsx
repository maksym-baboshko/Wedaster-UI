import React from "react"
import { createRoot } from "react-dom/client"

import "@wedaster/ui-web/styles.css"
import "@wedaster/ui-web/base.css"
import "./index.css"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@wedaster/ui-web"

function App() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Badge variant="secondary">react-smoke</Badge>
          <h1 className="font-heading text-3xl font-medium">
            @wedaster/ui-web in plain React
          </h1>
          <p className="text-sm text-muted-foreground">
            This app verifies that the package works outside Next.js and
            consumes the built library contract directly.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Smoke test surface</CardTitle>
            <CardDescription>
              A minimal card with core form and action primitives.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input placeholder="Type something here" />
            <div className="flex flex-wrap gap-3">
              <Button>Primary action</Button>
              <Button variant="outline">Secondary action</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
