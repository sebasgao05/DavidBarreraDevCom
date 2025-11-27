const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const imageExtensions = ['.jpg', '.jpeg', '.png'];

function optimizeImages() {
  const files = fs.readdirSync(publicDir);
  
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext)) {
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(publicDir, file.replace(ext, '.webp'));
      
      if (!fs.existsSync(outputPath)) {
        sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath)
          .then(() => console.log(`✅ Converted ${file} to WebP`))
          .catch(err => console.error(`❌ Error converting ${file}:`, err));
      }
    }
  });
}

optimizeImages();