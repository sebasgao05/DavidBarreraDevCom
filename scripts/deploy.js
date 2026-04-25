const path = require('path');
const { execSync } = require('child_process');

// Cargar .env en local si dotenv esta disponible. En GitHub Actions se usan env vars.
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

function syncWithCacheControl(label, cacheControl, filters) {
  const filterArgs = filters.join(' ');
  console.log(`Uploading ${label} (${cacheControl})...`);
  run(`aws s3 sync build/ ${bucketUri} ${filterArgs} --cache-control "${cacheControl}"`);
}

function deploy() {
  try {
    console.log('Cleaning old files...');
    run(`aws s3 rm ${bucketUri} --recursive`);

    syncWithCacheControl(
      'hashed static assets',
      'public, max-age=31536000, immutable',
      ['--exclude "*"', '--include "static/*"']
    );

    syncWithCacheControl(
      'images and icons',
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
        '--include "*.webp"'
      ]
    );

    syncWithCacheControl(
      'service workers',
      'public, max-age=0, must-revalidate',
      ['--exclude "*"', '--include "sw.js"', '--include "sw-enhanced.js"']
    );

    syncWithCacheControl(
      'remaining files',
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
        '--exclude "sw.js"',
        '--exclude "sw-enhanced.js"'
      ]
    );

    if (distributionId) {
      console.log('Creating CloudFront invalidation...');
      run(`aws cloudfront create-invalidation --distribution-id ${distributionId} --paths "/*"`);
    }

    console.log('Deployment completed!');
  } catch (error) {
    console.error('Deployment failed:', error.message);
    process.exit(1);
  }
}

deploy();
