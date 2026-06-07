const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

const baseDir = path.join(__dirname, '../src/app');

walkDir(baseDir, (filePath) => {
  if (!filePath.endsWith('page.js')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Fix 'use client'
  if (content.includes("import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';\n'use client';")) {
    content = content.replace(
      "import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';\n'use client';",
      "'use client';\nimport BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';"
    );
    changed = true;
  }
  // Double quotes case
  if (content.includes("import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';\n\"use client\";")) {
    content = content.replace(
      "import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';\n\"use client\";",
      "\"use client\";\nimport BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';"
    );
    changed = true;
  }

  // 2. Fix await inside inline functions
  if (content.includes("(await params)")) {
    // Instead of doing inline await, let's just make sure we extract it properly or revert and do it right.
    // For faqs/category:
    if (content.includes("c.slug !== (await params).category")) {
      content = content.replace("c.slug !== (await params).category", "c.slug !== cat.slug");
      changed = true;
    }
    // For services/slug
    if (content.includes("(s) => s.slug === (await params).slug")) {
      content = content.replace(
        /const svc = services\.find\(\(s\) => s\.slug === \(await params\)\.slug\);/g,
        "const { slug } = await params;\n  const svc = services.find((s) => s.slug === slug);"
      );
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed', filePath);
  }
});
