import type { Preview } from "@storybook/react"
import { withThemeByClassName } from "@storybook/addon-themes"

import "../../../packages/tokens/src/styles.css"
import "../../../packages/ui-web/src/styles/globals.css"

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    a11y: {
      element: "#storybook-root",
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
    (Story) => (
      <div className="inline-flex max-w-full items-start rounded-3xl bg-background p-6 text-foreground">
        <Story />
      </div>
    ),
  ],
}

export default preview
