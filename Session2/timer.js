import fs from 'node:fs'

fs.readFile('a.txt',()=>{
    setTimeout(()=>{console.log('timeout')},0)
    setImmediate(()=>{console.log('immediate')})
});

