// Predict the output order
// Can you explain what is the reason

const fs = require('fs');

console.log('1: top-level start');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('2: nested setTimeout'), 0);
  setImmediate(() => console.log('3: nested setImmediate'));
  process.nextTick(() => console.log('4: nested nextTick'));
  Promise.resolve().then(() => console.log('5: nested promise'));
});

console.log('6: top-level end');