const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const iconsDir = path.join(publicDir, 'icons');
const sourceIcon = path.join(publicDir, 'logo512.png');

// Tamaños de iconos necesarios según manifest.json
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  try {
    // Verificar que existe el icono fuente
    if (!fs.existsSync(sourceIcon)) {
      console.error('❌ No se encontró logo512.png como fuente');
      return;
    }

    // Crear directorio icons si no existe
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }

    console.log('🚀 Generando iconos PWA...');

    // Generar cada tamaño
    for (const size of iconSizes) {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
      
      await sharp(sourceIcon)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png({ quality: 100, compressionLevel: 6 })
        .toFile(outputPath);
      
      console.log(`✅ Generado icon-${size}x${size}.png`);
    }

    // Generar iconos adicionales para shortcuts
    const shortcutIcons = [
      { name: 'projects-icon.png', emoji: '💼' },
      { name: 'contact-icon.png', emoji: '📧' }
    ];

    for (const icon of shortcutIcons) {
      const outputPath = path.join(iconsDir, icon.name);
      
      // Crear un SVG simple con emoji
      const svgIcon = `
        <svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
          <rect width="96" height="96" fill="#3b82f6" rx="12"/>
          <text x="48" y="60" font-size="40" text-anchor="middle" fill="white">${icon.emoji}</text>
        </svg>
      `;
      
      await sharp(Buffer.from(svgIcon))
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generado ${icon.name}`);
    }

    console.log('🎉 Todos los iconos PWA generados correctamente');

  } catch (error) {
    console.error('❌ Error generando iconos:', error);
  }
}

generateIcons();