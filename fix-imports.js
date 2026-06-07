const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('page.js')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src/app');
let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('@/components/seo/generateSEOMetadata')) {
        content = content.replace(/@\/components\/seo\/generateSEOMetadata/g, '@/lib/seo/metadata');
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});
console.log('Fixed ' + count + ' files.');
