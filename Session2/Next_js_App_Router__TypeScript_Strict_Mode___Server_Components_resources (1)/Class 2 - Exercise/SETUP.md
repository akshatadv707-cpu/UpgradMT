# Setup — Windows / macOS / Linux

This course has three module folders. **Node.js is the only thing you install once** — each module is otherwise a separate, independent project with its own dependencies.

## What's in each module

- **`Module1/`** — Event loop & stream exercises. Plain `.js` files, run directly with `node`. No install step, no `package.json`.
- **`Module2/`** — TypeScript strict-mode & generics exercises. Has its own `package.json` (installs `typescript`) — see `Module2/HOWTO.md` for what each file does and how to run it.
- **`Module3/`** — A small Next.js documentation-site lab (routing, caching, SQLite, error boundaries). Has its own `package.json` — see `Module3/LAB.md` once it's running.

## 1. Install Node.js

You need **Node.js v22.5 or newer** (**v24 LTS recommended** — Module3 needs v22.5+ specifically, for the built-in `node:sqlite` module).

### Windows

- **Easiest:** download the LTS installer from [nodejs.org](https://nodejs.org) and run it.
- **winget:** `winget install OpenJS.NodeJS.LTS`
- **nvm for Windows** (to switch versions later): https://github.com/coreybutler/nvm-windows
- Use PowerShell or Command Prompt — everything below works in either.

### macOS

- **Easiest:** download the installer from [nodejs.org](https://nodejs.org).
- **Homebrew:** `brew install node@24`
- **nvm:** https://github.com/nvm-sh/nvm, then `nvm install 24`

### Linux

- **nvm** (recommended — distro package managers often ship an old Node): https://github.com/nvm-sh/nvm, then `nvm install 24`
- Or your distro's package manager / NodeSource setup script.

### Verify it worked

```bash
node --version
# should print v22.5.0 or higher — ideally v24.x
```

`Module3/` also ships a `.nvmrc` — if you use nvm, `cd Module3 && nvm install && nvm use` picks the right version for you automatically.

## 2. Get the project

Unzip the folder wherever you like, then open a terminal **inside that folder**.

**Windows note:** if the unzipped folder ends up inside a OneDrive-synced directory (common on managed machines), OneDrive can intermittently lock files while Module3's dev server writes its build cache. If you hit unexplained file-lock errors, move the folder somewhere not synced (e.g. `C:\dev\upgrad`) and try again.

## 3. Install dependencies — once per module, separately

**`Module2` and `Module3` each need their own `npm install`, run from inside that module's own folder.** They have separate `package.json` files and separate dependencies — running `npm install` in one does *not* install anything for the other. `Module1` needs no install at all.

```bash
cd Module2
npm install

cd ../Module3
npm install
```

**Do this yourself on your own machine — don't reuse someone else's `node_modules` folder**, even zipped up together with the project. Some dependencies compile a different binary per OS/CPU; `npm install` fetches the right one for you.

## 4. Run each module

- **Module1:** run any file directly, e.g. `node Module1/event-loop-puzzle-1.js`.
- **Module2:** from inside `Module2/`, follow `HOWTO.md` — mostly `npx tsc --strict --noEmit <file>.ts` and `node <file>.ts`.
- **Module3:** from inside `Module3/`, `npm run dev`, then open **http://localhost:3000**. If port 3000 is busy: `npm run dev -- -p 3007`. Once it's running, start with `LAB.md`.

## Troubleshooting

- **`Cannot find module 'node:sqlite'`** (Module3 only) — your Node.js is too old; re-check step 1, needs v22.5+.
- **`ExperimentalWarning: SQLite is an experimental feature...`** (Module3 only) — expected, printed by Node itself, not an error.
- **Port already in use** (Module3) — pick a different port with `-p`, as above.
- **Something looks broken after copying a module folder around** delete that module's `node_modules` (and `Module3`'s `.next`, both safe to delete/regenerate) and run `npm install` again *inside that module's folder*.
