const fs = require('fs');
let code = fs.readFileSync('src/app/api/ops/dashboard/route.js', 'utf8');
const before = code.length;
code = code.split('[[').join('[').split(']]').join(']');
fs.writeFileSync('src/app/api/ops/dashboard/route.js', code);
console.log('Replaced all [[ with [ and ]] with ]');
