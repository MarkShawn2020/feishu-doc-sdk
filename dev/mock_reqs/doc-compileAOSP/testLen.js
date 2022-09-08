const fs = require("fs");



// const s = fs.readFileSync('compile.md', {encoding: 'utf-8'}) // len: 2821
const s = fs.readFileSync('compile.md', {encoding: 'ascii'}) // len: 3141

// target: 3141
console.log(s.length)