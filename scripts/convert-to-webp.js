const fs = require('fs');
const path = require('path');

// Script avanzado para optimización de imágenes responsive
// Genera múltiples tamaños y formatos WebP/AVIF

const SIZES = {
  small: 320,
  medium: 640,
  large: 1024,
  xlarge: 1920
};

const QUALITY_SETTINGS = {
  webp: { quality: 85, effort: 6 },
  avif: { quality: 80, effort: 4 },
  jpeg: { quality: 85, progressive: true },
  png: { compressionLevel: 9, progressive: true }
};

const convertToResponsive = async () => {
  try {
    const sharp = require('sharp');
    const publicDir = path.join(__dirname, 'public');
    const imageExtensions = ['.jpg', '.jpeg', '.png'];
    
    const files = fs.readdirSync(publicDir);
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      
      if (imageExtensions.includes(ext)) {
        const inputPath = path.join(publicDir, file);
        const baseName = path.basename(file, ext);
        
        // Get original image metadata
        const metadata = await sharp(inputPath).metadata();
        const originalWidth = metadata.width || 1920;
        
        console.log(`\n📸 Processing: ${file} (${originalWidth}px)`);
        
        // Generate responsive sizes
        for (const [sizeName, targetWidth] of Object.entries(SIZES)) {
          if (targetWidth > originalWidth) continue;
          
          const sizeBaseName = targetWidth === originalWidth ? baseName : `${baseName}-${targetWidth}`;
          
          // Generate WebP
          const webpPath = path.join(publicDir, `${sizeBaseName}.webp`);
          if (!fs.existsSync(webpPath)) {
            await sharp(inputPath)
              .resize(targetWidth, null, { withoutEnlargement: true })
              .webp(QUALITY_SETTINGS.webp)
              .toFile(webpPath);
            console.log(`  ✓ WebP ${sizeName}: ${path.basename(webpPath)}`);
          }
          
          // Generate AVIF (next-gen format)
          const avifPath = path.join(publicDir, `${sizeBaseName}.avif`);
          if (!fs.existsSync(avifPath)) {
            try {
              await sharp(inputPath)
                .resize(targetWidth, null, { withoutEnlargement: true })
                .avif(QUALITY_SETTINGS.avif)
                .toFile(avifPath);
              console.log(`  ✓ AVIF ${sizeName}: ${path.basename(avifPath)}`);
            } catch (error) {
              console.log(`  ⚠ AVIF not supported, skipping`);
            }
          }
          
          // Generate optimized original format
          if (targetWidth !== originalWidth) {
            const optimizedPath = path.join(publicDir, `${sizeBaseName}${ext}`);
            if (!fs.existsSync(optimizedPath)) {
              const settings = ext === '.png' ? QUALITY_SETTINGS.png : QUALITY_SETTINGS.jpeg;
              await sharp(inputPath)
                .resize(targetWidth, null, { withoutEnlargement: true })
                [ext.slice(1)](settings)
                .toFile(optimizedPath);
              console.log(`  ✓ ${ext.toUpperCase()} ${sizeName}: ${path.basename(optimizedPath)}`);
            }
          }
        }
      }
    }
    
    console.log('\n🎉 Responsive image optimization completed!');
    console.log('\n📊 Generated formats:');
    console.log('  • WebP: Modern browsers (85% smaller)');
    console.log('  • AVIF: Latest browsers (50% smaller than WebP)');
    console.log('  • Original: Fallback compatibility');
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('📦 Installing sharp for image optimization...');
      console.log('Run: npm install --save-dev sharp');
      console.log('Then run this script again: node convert-to-webp.js');
    } else {
      console.error('Error:', error.message);
    }
  }
};

convertToResponsive();