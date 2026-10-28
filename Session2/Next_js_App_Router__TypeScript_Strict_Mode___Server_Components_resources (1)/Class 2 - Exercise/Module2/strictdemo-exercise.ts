// ============================================================
// STUDENT EXERCISE — make this file pass under --strict
// ============================================================
//
// Three more bugs. Bug 1 is a flag you haven't seen yet; bugs 2 and
// 3 are the same flags from strictDemo-exercise.ts, just in new
// code. Find out which flag catches each one, then fix the code so
// it type-checks clean. Don't change what the functions DO — a
// caller passing valid input should still get the same result they
// get today.
//
// STEP 1 — confirm this compiles loose right now (should be 0 errors):
//   npx tsc --strict false --noEmit strictDemo2-exercise.ts
//
// STEP 2 — turn strict mode on and read what breaks:
//   npx tsc --strict --noEmit strictDemo2-exercise.ts
//
// STEP 3 — fix each bug below (see its hints) until step 2 reports
// 0 errors.
// ============================================================

// ---- Bug 1 -------------------------------------------------
// HINT A: what type does TypeScript give `err` inside a catch
// block under strict mode — and what could actually be thrown
// besides an Error (a string? a number? literally anything)?
// HINT B: which strict flag stops you from assuming a caught
// value has a `.message` property?
// HINT C: narrow it first — e.g. `if (err instanceof Error) { ... }`
// — before touching any property on it.
function parseConfig(json: string) {
  try {
    return JSON.parse(json);
  } catch (err) {
    console.log(`Failed to parse config: ${err.message}`);
    return null;
  }
}

// ---- Bug 2 ---------------------------------------------------
// HINT A: what does `Map.get()` return when the key isn't in the
// map — and is that reflected in what `catalog.get(sku)` is typed
// as here?
// HINT B: which strict flag makes TypeScript worry about that
// "might not be there" case instead of assuming it's always a
// number?
// HINT C: check for undefined before calling `.toFixed()` — an
// `if`, a fallback, or throwing on an unknown sku are all valid.
function priceFor(sku: string, catalog: Map<string, number>) {
  const price = catalog.get(sku);
  return `$${price.toFixed(2)}`;
}

// ---- Bug 3 -----------------------------------------------------
// HINT A: `items: string[]` is declared, but the class body never
// assigns it. Right after `new ShoppingCart()`, what does `.items`
// actually hold — and does that match its declared type?
// HINT B: which strict flag checks that every declared property is
// definitely assigned by the time the constructor finishes?
// HINT C: a few valid fixes — initialize it inline
// (`items: string[] = []`), assign it in a constructor, or accept
// it as a constructor parameter.
class ShoppingCart {
  items: string[];
  addItem(item: string) {
    this.items.push(item);
  }
}

parseConfig('{"ok": true}');
console.log(priceFor("sku-1", new Map([["sku-1", 9.99]])));
const cart = new ShoppingCart();
cart.addItem("widget");

// ============================================================
// Stuck on which flag is responsible for a bug? strictDemo2.ts (in
// this same folder) names all three directly — try to get there on
// your own first.
// ============================================================
