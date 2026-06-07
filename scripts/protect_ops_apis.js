const fs = require('fs');
const path = require('path');

const opsApiDir = path.join(__dirname, '../src/app/api/ops');

const permissionMap = {
  'bqs': 'manage_bqs',
  'content-calendar': 'manage_content',
  'invoices': 'manage_finance',
  'revenue': 'manage_finance',
  'materials': 'manage_projects', // Assuming projects handles materials
  'notification': 'manage_notification_rules',
  'partner': 'manage_partners',
  'projects': 'manage_projects',
  'property-passports': 'manage_passports',
  'reels': 'manage_content',
  'proof-assets': 'manage_content',
  'whatsapp': 'manage_whatsapp_templates'
};

function getPermissionForRoute(routePath) {
  for (const [key, perm] of Object.entries(permissionMap)) {
    if (routePath.includes(`/${key}`) || routePath.includes(`\\${key}`)) {
      return perm;
    }
  }
  return 'ops_admin'; // Fallback
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const reqPerm = getPermissionForRoute(filePath);
  
  let modified = false;

  // Add import if missing
  if (!content.includes("import { requirePermission") && !content.includes("import { requireAnyPermission")) {
    const importStatement = `import { requirePermission } from '@/lib/auth/permissions';\n`;
    content = importStatement + content;
    modified = true;
  } else if (!content.includes("requirePermission")) {
    content = content.replace(/import {([^}]*)} from '@\/lib\/auth\/permissions';/, (match, p1) => {
      return `import { ${p1}, requirePermission } from '@/lib/auth/permissions';`;
    });
    modified = true;
  }

  const methodRegex = /export async function (POST|PATCH|PUT|DELETE)\(([^)]*)\)\s*{/g;
  let newContent = content;
  
  const matches = [...content.matchAll(methodRegex)];
  
  for (const match of matches) {
    const fnStart = match[0];
    if (fnStart.includes('GET')) continue; // Skip GET, though regex doesn't match GET

    // Check if we already injected it right after the brace
    const index = match.index + fnStart.length;
    const nextFewLines = content.substring(index, index + 200);
    
    if (!nextFewLines.includes('await requirePermission(') && !nextFewLines.includes('requireRole(')) {
      // Inject permission check
      const injection = `\n  await requirePermission('${reqPerm}');`;
      newContent = newContent.replace(fnStart, fnStart + injection);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Protected: ${filePath} with ${reqPerm}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('route.js')) {
      processFile(fullPath);
    }
  }
}

walkDir(opsApiDir);
console.log('Done protecting APIs.');
