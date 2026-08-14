# Hyperion

Hyperion is a single, flat Tauri 2 + Next.js application — the desktop/mobile agentic workspace client. There is no monorepo: one `package.json`, one `src/`, one `src-tauri/`, all at the repo root.

The app is a standard Next.js 16 codebase built as a static HTML export (`output: "export"`), which Tauri 2 loads into a Rust-backed system webview for Windows, macOS, Linux, Android, and iOS. Pages, components, hooks, stores, config, and the design system all live under `src/`.

The project includes 40+ OKLCh color themes with light/dark variants, type-safe i18n via next-intl, a command palette (Cmd+K), keyboard shortcuts, and a sidebar dashboard layout. State management uses Zustand with localStorage persistence. Styling uses Tailwind CSS v4 with shadcn/ui components built on Radix UI.

CI/CD runs through GitHub Actions with Release Please for Conventional Commits-based versioning and automated changelogs.

## Setup and commands

```bash
# Install: always use pnpm, never npm/yarn
pnpm install

# Development
pnpm dev                   # Next.js dev server (http://localhost:3000)
pnpm tauri dev             # Desktop
pnpm tauri android dev     # Android
pnpm tauri ios dev         # iOS

# Quality gates (CI runs all of these on every PR)
pnpm check                 # Biome/Ultracite check
pnpm typecheck             # tsc --noEmit
pnpm build                 # Full production build (next build)

# Utilities
pnpm fix                   # Auto-format and fix lint issues
pnpm clean                 # Remove build artifacts
pnpm shadcn add <name>     # Add a shadcn/ui component to src/components
pnpm deps:check            # Check for outdated deps
pnpm deps:update           # Interactive update
```

Run everything from the repo root — there are no workspace packages or filters to worry about.

## Project structure

```
src/
  app/            Next.js App Router pages ([locale] routing via next-intl)
  components/     shadcn/ui primitives + feature components (auth, kanban, layout, navigation, panels, terminal...)
  hooks/          Shared React hooks
  i18n/           next-intl routing, navigation, plugin, messages/*.json
  lib/            Utilities (cn, motion, storage, AI provider factory, ...)
  pages/          Top-level page components rendered by app routes
  providers/      Context providers (theme, auth)
  stores/         Zustand stores
  config/         Site, navigation, hotkeys, notifications config
  styles/         Tailwind v4 global styles + theme tokens
  scripts/        Client-side init scripts

src-tauri/        Rust backend, Tauri config, capabilities, platform gen/
public/           Static assets
```

Everything is imported via the `@/*` path alias (e.g. `@/components/button`, `@/lib/utils`, `@/i18n/routing`) — never deep relative paths across top-level `src/` folders.

## Coding standards

### TypeScript

- Strict mode is on globally (`strict: true`, `noUncheckedIndexedAccess: true`).
- Target: `ES2022`. Module: `ESNext` / `Bundler` resolution.
- All new code must be TypeScript. No `.js` files in `src/`.

### Formatting and Linting (Biome/Ultracite)

- This project uses **Ultracite** as a zero-config preset over Biome.
- Formatting is strictly enforced (double quotes, 2-space indent).
- Linting catches issues but favors warnings or auto-fixing over failing builds locally.
- Tailwind class sorting is handled natively by Biome (`npx @biomejs/biome check`).
- Stylesheet reference: `src/styles/globals.css`.
- Run `pnpm fix` to automatically resolve formatting and lint issues.

### Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/). Release Please parses these to auto-generate changelogs.

| Prefix      | Purpose                             |
| ----------- | ----------------------------------- |
| `feat:`     | New feature                         |
| `fix:`      | Bug fix                             |
| `docs:`     | Documentation only                  |
| `style:`    | Formatting, no logic                |
| `refactor:` | Refactor, no behavior change        |
| `perf:`     | Performance improvement             |
| `test:`     | Adding/fixing tests                 |
| `deps:`     | Dependency updates                  |
| `ci:`       | CI config changes                   |
| `chore:`    | Maintenance (hidden from changelog) |

## Architecture boundaries

### Do

- Add new UI primitives to `src/components/`. Use shadcn/ui patterns.
- Add shared pages to `src/pages/`, hooks to `src/hooks/`, stores to `src/stores/`.
- Add new translations to `src/i18n/messages/*.json`.
- Use the `@/*` path alias for all imports, never deep relative paths across top-level `src/` folders.

### Do not

- Do not modify `release-please-config.json`, `.release-please-manifest.json`, or GitHub workflow files without explicit approval.
- Do not use `npm` or `yarn`. This repo uses pnpm exclusively (v10+, corepack-managed).
- Do not add `"use server"` directives. The app must stay static-export compatible (`output: "export"`).
- Do not edit auto-generated directories: `.next/`, `out/`, `dist/`, `src-tauri/gen/`, `src-tauri/target/`, `node_modules/`.

## Config locations

| What                | Where                          |
| ------------------- | ------------------------------ |
| Site metadata        | `src/config/site.ts`           |
| Navigation config    | `src/config/navigation.ts`     |
| Global CSS + themes  | `src/styles/globals.css`, `src/app/globals.css` |
| Tauri config         | `src-tauri/tauri.conf.json`    |
| Next.js config       | `next.config.ts`               |
| i18n routing/messages| `src/i18n/routing.ts`, `src/i18n/messages/*.json` |

## Gotchas

- This app sets `output: "export"` in `next.config.ts`. API routes, server components, and `revalidate` will not work.
- This project uses Tailwind CSS v4 with `@tailwindcss/postcss`. Configuration lives in `globals.css`, not `tailwind.config.ts`.
- The static-export locale loading path is `src/i18n/request.ts` (messages are loaded client-side via `NextIntlClientProvider` in `src/app/[locale]/layout.tsx`, not via server-side request config).
- Always add shadcn/ui components via `pnpm shadcn add <name>` from root. They land in `src/components/`.
- The repo requires squash merging with PR title as commit message. This keeps a linear history for Release Please.

## Testing

- No test framework is configured yet. When adding tests, use Vitest and co-locate test files next to source (`*.test.ts`).

## Prerequisites

- Node.js >= 20
- pnpm >= 10 (via corepack: `corepack enable`)
- Rust (latest stable), required only for native/desktop/mobile builds
- Platform-specific tools for native builds: see [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/)


# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `pnpm dlx ultracite fix`
- **Check for issues**: `pnpm dlx ultracite check`
- **Diagnose setup**: `pnpm dlx ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `pnpm dlx ultracite fix` before committing to ensure compliance.
