import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/display/badge": "src/components/display/badge.tsx",
    "components/display/skeleton": "src/components/display/skeleton.tsx",
    "components/display/table": "src/components/display/table.tsx",
    "components/feedback/sonner": "src/components/feedback/sonner.tsx",
    "components/forms/radio-group": "src/components/forms/radio-group.tsx",
    "components/forms/select": "src/components/forms/select.tsx",
    "components/forms/switch": "src/components/forms/switch.tsx",
    "components/layout/card": "src/components/layout/card.tsx",
    "components/navigation/tabs": "src/components/navigation/tabs.tsx",
    "components/overlays/dialog": "src/components/overlays/dialog.tsx",
    "components/overlays/dropdown-menu":
      "src/components/overlays/dropdown-menu.tsx",
    "components/overlays/popover": "src/components/overlays/popover.tsx",
    "components/overlays/sheet": "src/components/overlays/sheet.tsx",
    "components/overlays/tooltip": "src/components/overlays/tooltip.tsx",
    "components/primitives/button": "src/components/primitives/button.tsx",
    "components/primitives/checkbox": "src/components/primitives/checkbox.tsx",
    "components/primitives/input": "src/components/primitives/input.tsx",
    "components/primitives/label": "src/components/primitives/label.tsx",
    "components/primitives/textarea": "src/components/primitives/textarea.tsx",
    "lib/utils": "src/lib/utils.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "next"],
  minify: false,
})
