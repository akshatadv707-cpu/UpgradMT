const { pipeline } = require('stream/promises');
const fs = require('fs');
const zlib = require('zlib');

async function run() {
  const src = fs.createReadStream('input.txt');
  const gzip = zlib.createGzip();
  const dest = fs.createWriteStream('output.txt.gz');

  gzip.on('close', () => console.log('[gzip close event fired]'));
  dest.on('close', () => console.log('[dest close event fired]'));

  setTimeout(() => src.destroy(new Error('Simulated mid-stream failure')), 5);

  try {
    await pipeline(src, gzip, dest);
    console.log('Pipeline succeeded');
  } catch (err) {
    console.error('Pipeline failed cleanly:', err.message);
  }
}

run();
