# Hands-On Lab — An AI-Generated Modal, Audited and Fixed

**Lecture 3 · Module 3 · IIT Kharagpur × upGrad**


# Setup

## Before the session

| Requirement | Check |
|---|---|
| Node.js 20+ | `node -v` |
| npm | `npm -v` |


## 1. Scaffold the project

```bash
npx create-next-app@latest a11y-lab --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd a11y-lab
```

## 2. Add shadcn/ui

```bash
npx shadcn@latest init -d
npx shadcn@latest add button dialog
```

`-d` accepts the defaults so nobody gets stuck on prompts. This does four things worth noticing:

- creates `components.json` (your design token + path config)
- creates `src/lib/utils.ts` (the `cn()` class merger)
- installs `class-variance-authority`, `tailwind-merge`, `lucide-react`, and `@radix-ui/react-dialog`
- **copies real source files into `src/components/ui/`** — `button.tsx` and `dialog.tsx`

Open `src/components/ui/dialog.tsx` right now and skim it. It is about eighty lines of your own code wrapping Radix primitives. Nothing is hidden in `node_modules`. That is Chapter 1's entire argument, sitting in your repo — and by Step 4 you'll be very glad it's there.

## 3. Install the test tools

```bash
npm install -D jest jest-environment-jsdom ts-node @types/jest \
  @testing-library/react @testing-library/dom @testing-library/jest-dom \
  jest-axe @types/jest-axe
```

- `jest` + `jest-environment-jsdom` — test runner and a fake DOM
- `@testing-library/react` — renders the component (`@testing-library/dom` is its peer)
- `jest-axe` — runs axe-core on the rendered markup, plus the `toHaveNoViolations` matcher

## 4. Configure Jest

**`jest.config.ts`**

```ts
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
```

**`jest.setup.ts`**

```ts
import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
```

**`package.json`** — add the script:

```json
"scripts": {
  "test": "jest"
}
```

## 5. Check it works

```bash
npm test
```

"No tests found" is the expected result here. If Jest itself errors, fix that now — see [Troubleshooting](#troubleshooting).

---

# Step 1 — Generate the Component

Give your AI agent this prompt:
(Please feel free to modify the prompt to suit your needs, but keep the accessibility requirements. The below prompt is a sample that was used to generate the code in the lab.)
```
Build a DeleteConfirmModal for a Next.js + Tailwind + shadcn/ui app.

Requirements:
- Triggered by a "Delete" button
- Cancel / Delete actions
- Fully keyboard operable
- Traps focus while open, restores focus on close
- Follows the WAI-ARIA Dialog pattern

Props: open, onCancel, onConfirm.
Client component. Put it in src/components/delete-confirm-modal.tsx
```

Save the output to `src/components/delete-confirm-modal.tsx`.

The accessibility requirements are stated **in the prompt** — that alone puts you ahead of most real-world usage. You will still find gaps.

### Use this just as a sample 

Paste this in as `src/components/delete-confirm-modal.tsx`.

```tsx
"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ open, onCancel, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div role="dialog" className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-lg font-semibold">Delete this project?</div>

          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <div
            onClick={onCancel}
            className="cursor-pointer rounded-md px-4 py-2 text-sm text-gray-400"
          >
            Cancel
          </div>

          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
```


### Mount it so you can test by hand later

**`src/app/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Project 42</h1>
      <p>Some page content behind the modal.</p>

      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete project
      </Button>

      <DeleteConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </main>
  );
}
```

Run `npm run dev` and click the button. **It looks completely fine.** Hold on to that.

---

# Step 2 — Run axe-core Immediately

**`src/components/delete-confirm-modal.test.tsx`**

```tsx
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { DeleteConfirmModal } from "./delete-confirm-modal";

const noop = () => {};

it("has no accessibility violations", async () => {
  // Render with the modal already open — that's the state we care about
  const { baseElement } = render(
    <DeleteConfirmModal open onCancel={noop} onConfirm={noop} />
  );

  // axe() scans the rendered DOM; fails with a readable report if unclean
  expect(await axe(baseElement)).toHaveNoViolations();
});
```

```bash
npm test
```

It should **fail**, with a rule id, an impact level, and the offending HTML for each violation.


**What you should see:**

| Rule | Impact | Why |
|---|---|---|
| `button-name` | critical | The close button holds only an icon, so it has no accessible name |
| `aria-dialog-name` | serious | `role="dialog"` with no accessible name |

Two violations. The component has considerably more than two problems.

---

# Step 3 — Triage the Findings

axe hands you a list. It does not tell you what it missed. Work through both halves before fixing anything.

### What axe found

| Finding | WCAG | Impact |
|---|---|---|
| Close button has no accessible name | 4.1.2 Name, Role, Value | Critical |
| Dialog has no accessible name | 4.1.2 | Serious |

### What you have to find yourself

Open the app, take your hand off the mouse, and Tab through it.

| Finding | WCAG | How you find it |
|---|---|---|
| Cancel is a `<div onClick>` — never receives focus, Enter/Space do nothing | 2.1.1 Keyboard | Tab through the modal |
| Focus is not moved into the dialog when it opens | 2.4.3 Focus Order | Open it, press Tab |
| Tab escapes to the page behind | 2.4.3 | Keep pressing Tab |
| Escape does not close it | 2.1.2 | Press Escape |
| Focus is not restored to the trigger on close | 2.4.3 | Close it, press Tab |
| Background is not marked inert | 4.1.2 | Read the markup |
| Title is a `<div>`, not a heading | 1.3.1 | Read the markup |
| Cancel text `text-gray-400` on white ≈ 2.5:1 | 1.4.3 Contrast | Contrast checker |

**Eight of ten were invisible to the scan.** That's the 57% / 43% split from Chapter 3, on your own screen.

Two things to sit with:

1. **The `<div onClick>` produces no axe violation at all.** The most common AI accessibility defect there is, and the automated tool is silent — because axe reads the DOM and cannot see a React event handler.
2. **Every element that came from shadcn/ui is clean.** Both `Button`s pass. All ten findings are in the markup the agent hand-wrote. That is the argument for reaching for the primitive, stated as data rather than opinion.

### Fix order

1. Critical and serious axe violations first
2. Keyboard operability next
3. Contrast and focus visibility last
4. Re-run axe after each fix, not once at the end

---

# Step 4 — Fix with the shadcn/ui Dialog

You do not need to write a focus trap, an Escape handler, or a single ARIA attribute. The component that does all of it has been in `src/components/ui/dialog.tsx` since setup.

Replace **`src/components/delete-confirm-modal.tsx`** entirely (again this is a sample , that my AI agent generated) :

```tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ open, onCancel, onConfirm }: Props) {
  return (
    // Owns open state, Escape key, and outside-click to close
    <Dialog open={open} onOpenChange={(next) => { if (!next) onCancel(); }}>
      {/* Portals, dims and inerts the page, traps focus, restores it on close */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {/* Wired to the dialog's aria-labelledby automatically */}
          <DialogTitle>Delete this project?</DialogTitle>
          {/* Wired to aria-describedby automatically */}
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          {/* onCancel flips `open` in the parent, which closes the dialog */}
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={onConfirm} autoFocus>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```


That's the whole component. Note there is no close button in your code — `DialogContent` renders one, already labelled.

### What you just deleted

| You did not write | Because |
|---|---|
| `role="dialog"`, `aria-modal="true"` | `DialogContent` sets both |
| `aria-labelledby` / `aria-describedby` and matching ids | `DialogTitle` / `DialogDescription` wire themselves |
| A `useFocusTrap` hook | `DialogContent` traps Tab and Shift+Tab |
| Focus-restore-on-close logic | `DialogContent` returns focus to the trigger |
| An Escape key handler | `Dialog` handles it |
| `aria-hidden` on the rest of the page | The overlay marks it inert |
| A labelled close button | `DialogContent` ships one with `sr-only` text |
| A visible focus ring | `Button`'s `cva` base classes include `focus-visible:ring-2` |

### Go and look at why it works

Open `src/components/ui/dialog.tsx`. Every fix above traces to `@radix-ui/react-dialog` imported at the top of a file **in your own repo**. You can read it, step through it, and edit it — and so can your AI agent, which is exactly the claim from Chapter 1's slide on why AI tooling favours shadcn/ui.

---

# Step 5 — Re-Test and Verify by Hand

```bash
npm test
```

```
 PASS  src/components/delete-confirm-modal.test.tsx
  ✓ has no accessibility violations (142 ms)
```

Then the manual pass. Hand off the mouse:

```
# Tab       -> focus reaches the "Delete project" trigger, ring visible
# Enter     -> modal opens, focus lands inside it
# Tab       -> Close -> Cancel -> Delete -> Close (trapped, never escapes)
# Shift+Tab -> cycles backwards, also trapped
# Space     -> activates the focused button
# Escape    -> closes, focus returns to the trigger
# Ctrl/Cmd + '+' to 200% -> nothing clipped
```
