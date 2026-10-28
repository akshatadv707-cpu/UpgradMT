
// Predict the output order
// Can you explain what is the reason

console.log('1: top-level start');

setTimeout(() => console.log('2: top-level setTimeout'), 0);
setImmediate(() => console.log('3: top-level setImmediate'));
process.nextTick(() => console.log('4: top-level nextTick'));
Promise.resolve().then(() => console.log('5: top-level promise'));

console.log('6: top-level end');
