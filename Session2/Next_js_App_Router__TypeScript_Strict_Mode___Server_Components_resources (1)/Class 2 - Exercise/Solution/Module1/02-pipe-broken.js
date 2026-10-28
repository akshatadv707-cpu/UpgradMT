const fs = require('fs');
const zlib = require('zlib');

const src = fs.createReadStream('input.txt');
const gzip = zlib.createGzip();
const dest = fs.createWriteStream('output-broken.txt.gz');

src.on('error', (err) => console.log('[src error]', err.message));
gzip.on('close', () => console.log('[gzip close event fired]'));
dest.on('close', () => console.log('[dest close event fired]'));
dest.on('finish', () => console.log('[dest finish event fired]'));

src.pipe(gzip).pipe(dest);

setTimeout(() => src.destroy(new Error('Simulated mid-stream failure')), 5);

setTimeout(() => {
  console.log('--- 500ms later ---');
  console.log('Notice: no [gzip close] / [dest close] / [dest finish] ever printed above.');
  console.log('gzip and dest were silently abandoned mid-stream a real leak in a long-lived process.');
}, 500);
