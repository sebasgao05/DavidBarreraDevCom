const fs = require('fs');
const path = require('path');

// Script simple para generar favicon
// En un entorno real, usarías una librería como 'to-ico' o 'sharp'
// Por ahora, copiamos el PNG como ICO (funciona en la mayoría de navegadores)

const sourceIcon = path.join(__dirname, '..', 'public', 'icons', 'icon-192x192.png');
const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');

try {
  // Copiar el PNG como ICO (funciona en navegadores modernos)
  fs.copyFileSync(sourceIcon, faviconPath);
  console.log('✅ Favicon generado exitosamente');
  
  // Verificar que el archivo existe
  if (fs.existsSync(faviconPath)) {
    const stats = fs.statSync(faviconPath);
    console.log(`📁 Tamaño del favicon: ${stats.size} bytes`);
  }
} catch (error) {
  console.error('❌ Error generando favicon:', error.message);
}