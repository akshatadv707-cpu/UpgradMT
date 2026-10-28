// ============================================================
// STUDENT EXERCISE — make this pipeline production-safe
// ============================================================
//
// This is the same broken .pipe().pipe() chain from the live demo
// (02-pipe-broken.js). It "works" on a clean run, but if the source
// stream fails partway through, gzip and dest are never told —
// their close/finish events never fire, and their file handles leak.
//
// YOUR TASK: rewrite the pipeline below using stream/promises'
// pipeline() so a failure anywhere in the chain cleans up every
// stream in it src, gzip, and dest automatically.
//
// CHECK YOUR WORK: run `node pipe-exercise.js` before and after.
// Before: only [src error] prints, and you need the artificial
// 500ms timer just to notice something's missing. After: all the
// close/finish events fire immediately and the script exits on its
// own — the timer becomes unnecessary.
// ============================================================

const fs = require('fs');
const zlib = require('zlib');

const src = fs.createReadStream('input.txt');
const gzip = zlib.createGzip();
const dest = fs.createWriteStream('output-exercise.txt.gz');

src.on('error', (err) => console.log('[src error]', err.message));
gzip.on('close', () => console.log('[gzip close event fired]'));
dest.on('close', () => console.log('[dest close event fired]'));
dest.on('finish', () => console.log('[dest finish event fired]'));

// HINT 1 — this line is the entire bug. .pipe() returns the
// destination stream so you can chain another .pipe() onto it, but
// it does NOT forward errors between streams. If `src` errors,
// `gzip` and `dest` are simply never told.
src.pipe(gzip).pipe(dest);

// Simulates a real-world mid-stream failure — a dropped connection,
// a corrupted read, a disk error. Leave this line as-is; it's not
// what you're fixing.
setTimeout(() => src.destroy(new Error('Simulated mid-stream failure')), 5);

// HINT 2 — delete this whole block once your fix works. It only
// exists to prove the bug: it waits 500ms and then points out that
// gzip/dest never closed. A correct pipeline() fix reports failure
// (or success) immediately, on its own — it won't need this crutch.
setTimeout(() => {
  console.log('--- 500ms later ---');
  console.log('Notice: no [gzip close] / [dest close] / [dest finish] ever printed above.');
  console.log('gzip and dest were silently abandoned mid-stream a real leak in a long-lived process.');
}, 500);

// ============================================================
// MORE HINTS — try before reading each one
// ============================================================
//
// HINT 3 — the fix lives in Node's stream/promises module:
//   const { pipeline } = require('stream/promises');
//
// HINT 4 — pipeline() takes the streams as arguments, in order, and
// returns a Promise. It replaces the entire `.pipe().pipe()` line:
//   await pipeline(src, gzip, dest);
//
// HINT 5 — because it's a Promise, `await` needs to be inside an
// async function:
//   async function run() {
//     try {
//       await pipeline(src, gzip, dest);
//       console.log('Pipeline succeeded');
//     } catch (err) {
//       console.error('Pipeline failed cleanly:', err.message);
//     }
//   }
//   run();
//
// HINT 6 — your .on('close'/'finish', ...) listeners don't need to
// change at all. They still fire they just fire correctly now.
// ============================================================
