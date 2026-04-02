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
          "@wedaster/ui-web/styles.css": join(
            workspaceRoot,
            "packages/ui-web/src/styles/styles.css"
          ),
          "@wedaster/ui-web/base.css": join(
            workspaceRoot,
            "packages/ui-web/src/styles/base.css"
          ),
          "@wedaster/ui-web/globals.css": join(
            workspaceRoot,
            "packages/ui-web/src/styles/globals.css"
          ),
          "@wedaster/theme-default/styles.css": join(
            workspaceRoot,
            "packages/theme-default/src/styles.css"
          ),
          "@wedaster/theme-obsidian/styles.css": join(
            workspaceRoot,
            "packages/theme-obsidian/src/styles.css"
          ),
          "@wedaster/tokens/styles.css": join(
            workspaceRoot,
            "packages/tokens/src/styles.css"
          ),
          "@wedaster/ui-web": join(workspaceRoot, "packages/ui-web/src"),
          "@wedaster/theme-default": join(
            workspaceRoot,
            "packages/theme-default/src"
          ),
          "@wedaster/theme-obsidian": join(
            workspaceRoot,
            "packages/theme-obsidian/src"
          ),
          "@wedaster/tokens": join(workspaceRoot, "packages/tokens/src"),
        },
      },
    })
  },
}

export default config
