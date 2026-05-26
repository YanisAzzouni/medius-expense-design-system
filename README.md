# Medius Expense Design System

React component library for the Medius Expense product — tokens, icons, and components,
published as `@medius-expense/design-system`.

---

## Setup

**Requirements:** Node 20 (`nvm use`)

```bash
nvm use
npm install
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Storybook on port 6006 |
| `npm run build` | Build the library (ESM + CJS + types) |
| `npm run build-storybook` | Build static Storybook for deployment |
| `npm run icons:generate` | Re-run the SVG → React component pipeline |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting |
| `npm run figma:connect` | Publish Code Connect mappings to Figma |

---

## Folder structure

```
src/
  tokens/           Color, typography, and elevation token definitions + tokens.css
  icons/
    svg/            Raw SVG files exported from Figma (category--name.svg)
    components/     Auto-generated React components (do not edit manually)
    Icon.tsx        <Icon name="category--name" size="small|default|large" />
    manifest.ts     Auto-generated icon registry
  primitives/       Future: spacing, radius, etc.
  components/       Future: compound components (Button, Input, …)
  index.ts          Library barrel export
scripts/
  generate-icons.ts SVG → React pipeline
.storybook/
  main.ts           Storybook config (Vite builder, path aliases)
  preview.ts        Global decorators and parameters
  manager.ts        Custom Medius Expense theme
```

---

## Adding icons

1. Export SVGs from Figma using the naming convention `category--name.svg`
   (e.g. `navigation--chevron-right.svg`, `action--check.svg`).
2. Drop the files into `src/icons/svg/`.
3. Run `npm run icons:generate`.
4. The components, barrel index, and manifest are regenerated automatically.

---

## Using tokens

Import the CSS in your app entry point:

```ts
import "@medius-expense/design-system/styles";
```

Then use CSS custom properties anywhere:

```css
.my-element {
  color: var(--color-olive-500);
  font-size: var(--type-h2-size);
  box-shadow: var(--shadow-16);
}
```

Or import typed JS objects for logic:

```ts
import { colors, elevation, typography } from "@medius-expense/design-system";
```

---

## Code Connect

[Figma Code Connect](https://github.com/figma/code-connect) links Figma components
to their React source so that dev-mode shows real code snippets alongside designs.

### Infrastructure

- Config: `figma.config.json` at the root (`parser: "react"`, `include: src/**/*.figma.tsx`)
- Mappings live in `*.figma.tsx` files alongside each component
- Publish with `npm run figma:connect` (requires `FIGMA_ACCESS_TOKEN` in env)

### Workflow (when adding a new component)

1. Build the React component in `src/components/`.
2. Add a `ComponentName.figma.tsx` next to it:
   ```tsx
   import figma from "@figma/code-connect";
   import { MyComponent } from "./MyComponent";

   figma.connect(MyComponent, "https://www.figma.com/file/YOUR_FILE_ID?node-id=COMPONENT_NODE_ID", {
     props: {
       variant: figma.enum("Variant", { primary: "primary", secondary: "secondary" }),
     },
     example: ({ variant }) => <MyComponent variant={variant} />,
   });
   ```
3. Run `npm run figma:connect` to publish.

No `.figma.tsx` files are included yet — the infrastructure is in place,
ready to add mappings as components are built.
