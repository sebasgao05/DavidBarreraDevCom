const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Configurando todos los assets del proyecto...\n');

const scripts = [
  'generate-icons.js',
  'generate-responsive-images.js', 
  'generate-screenshots.js',
  'optimize-images.js'
];

async function runSetup() {
  try {
    for (const script of scripts) {
      const scriptPath = path.join(__dirname, script);
      console.log(`📦 Ejecutando ${script}...`);
      
      try {
        execSync(`node "${scriptPath}"`, { 
          stdio: 'inherit',
          cwd: path.join(__dirname, '..')
        });
        console.log(`✅ ${script} completado\n`);
      } catch (error) {
        console.error(`❌ Error en ${script}:`, error.message);
      }
    }

    console.log('🎉 ¡Configuración de assets completada!');
    console.log('\n📋 Resumen:');
    console.log('   • Iconos PWA generados en /public/icons/');
    console.log('   • Imágenes responsive creadas con sufijos -320, -640, -1024');
    console.log('   • Screenshots PWA generados en /public/screenshots/');
    console.log('   • Imágenes optimizadas a WebP');

  } catch (error) {
    console.error('❌ Error en la configuración:', error);
  }
}

runSetup();