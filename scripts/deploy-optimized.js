const path = require('path');
const { execSync } = require('child_process');

// Cargar .env en local si dotenv esta disponible. En CI se usan env vars.
try {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
} catch (error) {
  if (error.code !== 'MODULE_NOT_FOUND') {
    throw error;
  }
}

const bucketName = process.env.DEPLOY_BUCKET_NAME;
const distributionId = process.env.DEPLOY_DISTRIBUTION_ID;

if (!bucketName) {
  console.error('DEPLOY_BUCKET_NAME no esta definido. Establece el bucket destino como variable de entorno.');
  process.exit(1);
}

const bucketUri = `s3://${bucketName}`;

function run(command) {
  execSync(command, { stdio: 'inherit' });
}

function sync(label, cacheControl, filters) {
  console.log(`📤 ${label} (${cacheControl})`);
  run(`aws s3 sync build/ ${bucketUri} ${filters.join(' ')} --cache-control "${cacheControl}" --size-only`);
}

function deploy() {
  console.log('🚀 Iniciando deploy optimizado (AWS CLI)...');

  try {
    // 1. Assets con hash (JS/CSS/media) - cache inmutable de 1 año
    sync(
      'Assets estáticos con hash',
      'public, max-age=31536000, immutable',
      ['--exclude "*"', '--include "static/*"']
    );

    // 2. Imágenes, íconos y fuentes - cache medio (30 días)
    sync(
      'Imágenes, íconos y fuentes',
      'public, max-age=2592000, stale-while-revalidate=86400',
      [
        '--exclude "*"',
        '--include "images/*"',
        '--include "icons/*"',
        '--include "*.avif"',
        '--include "*.gif"',
        '--include "*.ico"',
        '--include "*.jpeg"',
        '--include "*.jpg"',
        '--include "*.png"',
        '--include "*.svg"',
        '--include "*.webp"',
        '--include "*.woff"',
        '--include "*.woff2"'
      ]
    );

    // 3. Service workers - sin cache
    sync(
      'Service workers',
      'public, max-age=0, must-revalidate',
      ['--exclude "*"', '--include "sw.js"', '--include "sw-enhanced.js"']
    );

    // 4. Resto (HTML, manifest, json, txt, xml) - revalidar siempre
    sync(
      'HTML y metadatos',
      'public, max-age=0, must-revalidate',
      [
        '--exclude "static/*"',
        '--exclude "images/*"',
        '--exclude "icons/*"',
        '--exclude "*.avif"',
        '--exclude "*.gif"',
        '--exclude "*.ico"',
        '--exclude "*.jpeg"',
        '--exclude "*.jpg"',
        '--exclude "*.png"',
        '--exclude "*.svg"',
        '--exclude "*.webp"',
        '--exclude "*.woff"',
        '--exclude "*.woff2"',
        '--exclude "sw.js"',
        '--exclude "sw-enhanced.js"'
      ]
    );

    // 5. Invalidación selectiva de CloudFront
    if (distributionId) {
      console.log('🔄 Invalidando CloudFront (rutas críticas)...');
      run(
        `aws cloudfront create-invalidation --distribution-id ${distributionId} ` +
        `--paths "/" "/index.html" "/sw.js"`
      );
    } else {
      console.warn('⚠️  DEPLOY_DISTRIBUTION_ID no definido: se omite la invalidación de CloudFront.');
    }

    console.log('✅ Deploy optimizado completado!');
  } catch (error) {
    console.error('❌ Error en deploy:', error.message);
    process.exit(1);
  }
}

deploy();
