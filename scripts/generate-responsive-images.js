const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images', 'projects');

// Imágenes que necesitan versiones responsive
const projectImages = [
  'Generador-CV.jpg',
  'project-taxi-pricing.jpg'
];

// Tamaños responsive
const sizes = [
  { suffix: '-320', width: 320 },
  { suffix: '-640', width: 640 },
  { suffix: '-1024', width: 1024 }
];

async function generateResponsiveImages() {
  try {
    console.log('🚀 Generando imágenes responsive...');

    for (const imageName of projectImages) {
      const inputPath = path.join(publicDir, imageName);
      
      if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  No se encontró ${imageName}, saltando...`);
        continue;
      }

      for (const size of sizes) {
        // Generar versión JPG
        const jpgOutputPath = path.join(publicDir, imageName.replace('.jpg', `${size.suffix}.jpg`));
        await sharp(inputPath)
          .resize(size.width, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .jpeg({ quality: 80 })
          .toFile(jpgOutputPath);
        
        console.log(`✅ Generado ${path.basename(jpgOutputPath)}`);

        // Generar versión WebP
        const webpOutputPath = path.join(publicDir, imageName.replace('.jpg', `${size.suffix}.webp`));
        await sharp(inputPath)
          .resize(size.width, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: 80 })
          .toFile(webpOutputPath);
        
        console.log(`✅ Generado ${path.basename(webpOutputPath)}`);
      }
    }

    console.log('🎉 Todas las imágenes responsive generadas correctamente');

  } catch (error) {
    console.error('❌ Error generando imágenes responsive:', error);
  }
}

generateResponsiveImages();