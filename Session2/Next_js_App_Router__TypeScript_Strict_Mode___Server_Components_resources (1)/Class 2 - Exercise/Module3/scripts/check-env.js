#!/usr/bin/env node
// Runs automatically before install/dev/build/start (see package.json's
// "pre*" scripts). Pure Node, no dependencies — works identically on
// Windows, macOS, and Linux before `npm install` has even run.

try {
  require("node:sqlite");
} catch {
  console.error(`
✗ This project needs a Node.js version with built-in SQLite support
  (node:sqlite). Your current version is ${process.version}, which
  doesn't have it.

  Install a recent Node.js — v22.5 or newer, v24 LTS recommended — from
  one of:

    - https://nodejs.org           (installer for Windows / macOS / Linux)
    - nvm (macOS/Linux):           https://github.com/nvm-sh/nvm
    - nvm-windows:                 https://github.com/coreybutler/nvm-windows
    - Volta (all platforms):       https://volta.sh

  This project ships a .nvmrc, so if you use nvm/nvm-windows you can
  just run:  nvm install && nvm use

  After installing, re-run:  npm install
`);
  process.exit(1);
}
