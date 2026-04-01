import type { StorybookConfig } from "@storybook/react-vite"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = join(__dirname, "../../../")

const config: StorybookConfig = {
  stories: ["../../../packages/ui-web/src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite")

    return mergeConfig(config, {
      build: {
        chunkSizeWarningLimit: 1200,
        rollupOptions: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onwarn(warning: any, warn: any) {
            if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
              return
            }

            warn(warning)
          },
        },
      },
      server: {
        fs: {
          allow: [workspaceRoot],
        },
      },
      resolve: {
        alias: {
          "@workspace/ui-web": join(workspaceRoot, "packages/ui-web/src"),
          "@workspace/tokens": join(workspaceRoot, "packages/tokens/src"),
        },
      },
    })
  },
}

export default config
