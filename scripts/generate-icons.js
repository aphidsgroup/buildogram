const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../public/icons');
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// Generate base SVG
const svgBase = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#FC6E20" rx="100" ry="100"/>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-weight="900" font-size="300" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">B</text>
</svg>
`;

const maskableSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#FC6E20" />
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-weight="900" font-size="300" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">B</text>
</svg>
`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generate() {
  const baseBuffer = Buffer.from(svgBase);
  const maskableBuffer = Buffer.from(maskableSvg);

  // Generate standard icons
  for (const size of sizes) {
    await sharp(baseBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(ICONS_DIR, `icon-${size}x${size}.png`));
    console.log(`Created icon-${size}x${size}.png`);
  }

  // Generate Apple Touch Icon (180x180)
  await sharp(baseBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(ICONS_DIR, `apple-touch-icon.png`));
  console.log('Created apple-touch-icon.png');

  // Generate Maskable Icons
  await sharp(maskableBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(ICONS_DIR, `maskable-icon-192x192.png`));
  console.log('Created maskable-icon-192x192.png');

  await sharp(maskableBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(ICONS_DIR, `maskable-icon-512x512.png`));
  console.log('Created maskable-icon-512x512.png');
}

generate().catch(console.error);
