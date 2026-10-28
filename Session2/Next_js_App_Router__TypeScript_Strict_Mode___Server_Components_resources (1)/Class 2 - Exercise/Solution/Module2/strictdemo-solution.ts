// strictDemo2-solution.ts — strictDemo2-exercise.ts, fixed
// `npx tsc --strict --noEmit strictDemo2-solution.ts` → 0 errors

// ---- Bug 1 fix: useUnknownInCatchVariables ------------------
// `err` is `unknown`, so narrow it before touching a property.
function parseConfig(json: string) {
  try {
    return JSON.parse(json);
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Failed to parse config: ${err.message}`);
    } else {
      console.log(`Failed to parse config: ${String(err)}`);
    }
    return null;
  }
}

// ---- Bug 2 fix: strictNullChecks -------------------------------
// `catalog.get(sku)` can come back `undefined` — handle it before
// calling `.toFixed()`.
function priceFor(sku: string, catalog: Map<string, number>) {
  const price = catalog.get(sku);
  if (price === undefined) {
    throw new Error(`Unknown sku: ${sku}`);
  }
  return `$${price.toFixed(2)}`;
}

// ---- Bug 3 fix: strictPropertyInitialization --------------------
// Give `items` a default so it's always assigned by the time the
// constructor finishes.
class ShoppingCart {
  items: string[] = [];
  addItem(item: string) {
    this.items.push(item);
  }
}

parseConfig('{"ok": true}');
console.log(priceFor("sku-1", new Map([["sku-1", 9.99]])));
const cart = new ShoppingCart();
cart.addItem("widget");
