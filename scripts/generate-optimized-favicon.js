const fs = require('fs');
const path = require('path');

// Generar un favicon optimizado para navegadores
const sourceIcon = path.join(__dirname, '..', 'public', 'icons', 'icon-72x72.png');
const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');

try {
  // Usar el icono más pequeño para mejor rendimiento
  fs.copyFileSync(sourceIcon, faviconPath);
  console.log('✅ Favicon optimizado generado exitosamente');
  
  // Verificar que el archivo existe
  if (fs.existsSync(faviconPath)) {
    const stats = fs.statSync(faviconPath);
    console.log(`📁 Tamaño del favicon: ${stats.size} bytes`);
  }
  
  // También crear una copia con timestamp para forzar actualización
  const timestampFavicon = path.join(__dirname, '..', 'public', `favicon-${Date.now()}.ico`);
  fs.copyFileSync(sourceIcon, timestampFavicon);
  console.log(`📁 Favicon con timestamp creado: ${path.basename(timestampFavicon)}`);
  
} catch (error) {
  console.error('❌ Error generando favicon:', error.message);
}