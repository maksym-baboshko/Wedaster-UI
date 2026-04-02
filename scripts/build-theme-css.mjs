import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, "..")

const args = process.argv.slice(2)
const watchMode = args.includes("--watch")
const positionalArgs = args.filter((arg) => arg !== "--watch")
const [inputPathArg, outputPathArg] = positionalArgs

if (!inputPathArg || !outputPathArg) {
  console.error(
    "Usage: node scripts/build-theme-css.mjs <input.css> <output.css> [--watch]"
  )
  process.exit(1)
}

const inputPath = path.resolve(process.cwd(), inputPathArg)
const outputPath = path.resolve(process.cwd(), outputPathArg)

const importPattern = /^\s*@import\s+["']([^"']+)["']\s*;\s*$/gm
const packageImportMap = {
  "@wedaster/tokens/styles.css": path.join(repoRoot, "packages/tokens/src/styles.css"),
}

function resolveImport(specifier, importerPath) {
  if (specifier in packageImportMap) {
    return packageImportMap[specifier]
  }

  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    return path.resolve(path.dirname(importerPath), specifier)
  }

  throw new Error(`Unsupported CSS import "${specifier}" in ${importerPath}`)
}

function bundleCss(filePath, seen = new Set()) {
  const normalizedPath = path.normalize(filePath)

  if (seen.has(normalizedPath)) {
    throw new Error(`Circular CSS import detected at ${normalizedPath}`)
  }

  seen.add(normalizedPath)

  const source = fs.readFileSync(normalizedPath, "utf8")
  const dependencies = new Set([normalizedPath])

  const bundled = source.replace(importPattern, (_, specifier) => {
    const resolvedImport = resolveImport(specifier, normalizedPath)
    const { content, files } = bundleCss(resolvedImport, new Set(seen))

    for (const file of files) {
      dependencies.add(file)
    }

    return `/* inlined from ${specifier} */\n${content}`
  })

  return { content: bundled.trimEnd() + "\n", files: dependencies }
}

function buildOnce() {
  const { content, files } = bundleCss(inputPath)

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, content, "utf8")

  const relativeOutput = path.relative(repoRoot, outputPath)
  console.log(`theme-css: built ${relativeOutput}`)

  return files
}

let watchers = []
let rebuildTimer = null

function clearWatchers() {
  for (const watcher of watchers) {
    watcher.close()
  }

  watchers = []
}

function scheduleRebuild() {
  if (rebuildTimer) {
    clearTimeout(rebuildTimer)
  }

  rebuildTimer = setTimeout(() => {
    rebuildTimer = null
    setupWatch()
  }, 50)
}

function setupWatch() {
  clearWatchers()

  try {
    const files = buildOnce()

    for (const file of files) {
      const watcher = fs.watch(file, () => {
        scheduleRebuild()
      })

      watchers.push(watcher)
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
  }
}

if (watchMode) {
  setupWatch()
} else {
  buildOnce()
}
