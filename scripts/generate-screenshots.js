const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const screenshotsDir = path.join(publicDir, 'screenshots');

async function generateScreenshots() {
  try {
    console.log('🚀 Generando screenshots PWA...');

    // Crear directorio screenshots si no existe
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Screenshot desktop (1280x720)
    const desktopSvg = `
      <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1280" height="720" fill="url(#grad1)"/>
        <text x="640" y="300" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">David Barrera</text>
        <text x="640" y="360" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">Desarrollador Full Stack</text>
        <text x="640" y="420" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="white">React • TypeScript • AWS</text>
      </svg>
    `;

    await sharp(Buffer.from(desktopSvg))
      .png()
      .toFile(path.join(screenshotsDir, 'desktop.png'));
    
    console.log('✅ Generado desktop.png');

    // Screenshot mobile (375x812)
    const mobileSvg = `
      <svg width="375" height="812" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="375" height="812" fill="url(#grad2)"/>
        <text x="187" y="350" font-family="Arial, sans-serif" font-size="28" font-weight="bold" text-anchor="middle" fill="white">David Barrera</text>
        <text x="187" y="390" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="white">Desarrollador Full Stack</text>
        <text x="187" y="430" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="white">React • TypeScript • AWS</text>
      </svg>
    `;

    await sharp(Buffer.from(mobileSvg))
      .png()
      .toFile(path.join(screenshotsDir, 'mobile.png'));
    
    console.log('✅ Generado mobile.png');

    console.log('🎉 Screenshots PWA generados correctamente');

  } catch (error) {
    console.error('❌ Error generando screenshots:', error);
  }
}

generateScreenshots();