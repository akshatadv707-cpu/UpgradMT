// strictDemo2.ts — three more bugs, three more strict sub-flags
// (bug 1 is a new flag; bugs 2 and 3 revisit strictDemo.ts's flags with fresh code)
// see strictDemo2-exercise.ts for the unlabeled version

// 1) useUnknownInCatchVariables: `err` is `unknown`, not `any` — you can't
// touch a property on it without narrowing first
function parseConfig(json: string) {
  try {
    return JSON.parse(json);
  } catch (err) {
    console.log(`Failed to parse config: ${err.message}`);
    return null;
  }
}

// 2) strictNullChecks: `catalog.get(sku)` might come back empty, but we
// call .toFixed() on it anyway
function priceFor(sku: string, catalog: Map<string, number>) {
  const price = catalog.get(sku);
  return `$${price.toFixed(2)}`;
}

// 3) strictPropertyInitialization: `items` is declared but never assigned
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
