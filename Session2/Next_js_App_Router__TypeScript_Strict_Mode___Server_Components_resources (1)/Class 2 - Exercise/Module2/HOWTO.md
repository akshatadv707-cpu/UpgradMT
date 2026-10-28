# Module 2 — Setup & Exercises

## Setup

```bash
npm i
```

## 1. `strictdemo.ts` — strict mode catching three bugs

Three functions, each broken by a different strict flag: `useUnknownInCatchVariables` (touching `err.message` before narrowing), `strictNullChecks` (`catalog.get(sku)` may be `undefined`), `strictPropertyInitialization` (`items` declared but never assigned).

```bash
npx tsc --strict false --noEmit strictdemo.ts   # 0 errors
npx tsc --strict --noEmit strictdemo.ts         # 3 errors
```

## 2. `strictdemo-exercise.ts` — fix the same three bugs

Same three bugs, unlabeled — read the hints in the file and fix each one.

```bash
npx tsc --strict false --noEmit strictdemo-exercise.ts   # 0 errors (starting point)
npx tsc --strict --noEmit strictdemo-exercise.ts         # fix until this is 0 errors too
```

## 3. `generic-queue-exercise.ts` — implement a generic `Queue<T>`

Fill in the TODOs (`enqueue`, `dequeue`, `peek`, `size`, `isEmpty`) so the demo at the bottom prints the expected values.

```bash
npx tsc --strict --noEmit generic-queue-exercise.ts
node generic-queue-exercise.ts
```
