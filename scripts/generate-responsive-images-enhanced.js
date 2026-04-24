const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración de tamaños responsivos
const RESPONSIVE_SIZES = {
  profile: [270, 320, 640], // Tamaños específicos para imagen de perfil
  projects: [320, 422, 640, 800], // Tamaños para imágenes de proyectos
  general: [320, 640, 768, 1024, 1280] // Tamaños generales
};

// Configuración de calidad por tamaño
const QUALITY_CONFIG = {
  webp: {
    small: 85,  // <= 320px
    medium: 80, // 321-640px
    large: 75   // > 640px
  },
  jpeg: {
    small: 90,
    medium: 85,
    large: 80
  }
};

class ResponsiveImageGenerator {
  constructor() {
    this.publicDir = path.join(__dirname, '..', 'public');
    this.imagesDir = path.join(this.publicDir, 'images');
  }

  async generateResponsiveImages() {
    console.log('🖼️  Generando imágenes responsivas...');

    try {
      await this.processProfileImages();
      await this.processProjectImages();
      console.log('✅ Imágenes responsivas generadas exitosamente');
    } catch (error) {
      console.error('❌ Error generando imágenes responsivas:', error);
      process.exit(1);
    }
  }

  async processProfileImages() {
    const profileDir = path.join(this.imagesDir, 'profile');
    const profileWebP = path.join(profileDir, 'profile-david.webp');
    const profileJPG = path.join(profileDir, 'profile-david.jpg');
    const profileJPEG = path.join(profileDir, 'profile-david.jpeg');

    let profileImage = null;
    if (fs.existsSync(profileWebP)) {
      profileImage = profileWebP;
    } else if (fs.existsSync(profileJPG)) {
      profileImage = profileJPG;
    } else if (fs.existsSync(profileJPEG)) {
      profileImage = profileJPEG;
    }

    if (!profileImage) {
      console.log('⚠️  Imagen de perfil no encontrada, saltando...');
      return;
    }

    if (profileImage !== profileWebP) {
      console.log('♻️  Convirtiendo imagen de perfil de JPG/JPEG a WebP para generar variantes...');
      await this.generateImageVariant(profileImage, profileWebP, 1024, 'webp');
      profileImage = profileWebP;
    }

    console.log('📸 Procesando imagen de perfil...');

    for (const size of RESPONSIVE_SIZES.profile) {
      await this.generateImageVariant(
        profileImage,
        path.join(profileDir, `profile-david-${size}.webp`),
        size,
        'webp'
      );
    }
  }

  async processProjectImages() {
    const projectsDir = path.join(this.imagesDir, 'projects');

    if (!fs.existsSync(projectsDir)) {
      console.log('⚠️  Directorio de proyectos no encontrado, saltando...');
      return;
    }

    const projectFiles = fs.readdirSync(projectsDir)
      .filter(file => file.endsWith('.webp') && !file.includes('-320') && !file.includes('-422'));

    console.log(`📁 Procesando ${projectFiles.length} imágenes de proyectos...`);

    for (const file of projectFiles) {
      const inputPath = path.join(projectsDir, file);
      const baseName = path.basename(file, '.webp');

      for (const size of RESPONSIVE_SIZES.projects) {
        const outputPath = path.join(projectsDir, `${baseName}-${size}.webp`);
        await this.generateImageVariant(inputPath, outputPath, size, 'webp');
      }
    }
  }

  async generateImageVariant(inputPath, outputPath, width, format) {
    try {
      if (fs.existsSync(outputPath)) {
        console.log(`⏭️  ${path.basename(outputPath)} ya existe, saltando...`);
        return;
      }

      const quality = this.getQualityForSize(width, format);
      let pipeline = sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });

      if (format === 'webp') {
        pipeline = pipeline.webp({
          quality,
          effort: 6
        });
      } else if (format === 'jpeg') {
        pipeline = pipeline.jpeg({
          quality,
          progressive: true,
          mozjpeg: true
        });
      }

      await pipeline.toFile(outputPath);
      const stats = fs.statSync(outputPath);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`✅ ${path.basename(outputPath)} - ${width}px - ${sizeKB}KB`);
    } catch (error) {
      console.error(`❌ Error procesando ${inputPath}:`, error.message);
    }
  }

  getQualityForSize(width, format) {
    const config = QUALITY_CONFIG[format];
    if (width <= 320) return config.small;
    if (width <= 640) return config.medium;
    return config.large;
  }

  async optimizeExistingImages() {
    console.log('🔧 Optimizando imágenes existentes...');
    const imageDirs = ['profile', 'projects', 'logos'];

    for (const dir of imageDirs) {
      const dirPath = path.join(this.imagesDir, dir);
      if (!fs.existsSync(dirPath)) continue;

      const files = fs.readdirSync(dirPath)
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

      for (const file of files) {
        const filePath = path.join(dirPath, file);
        await this.optimizeImage(filePath);
      }
    }
  }

  async optimizeImage(imagePath) {
    try {
      const ext = path.extname(imagePath).toLowerCase();
      const tempPath = imagePath + '.tmp';
      let pipeline = sharp(imagePath);

      if (ext === '.webp') {
        pipeline = pipeline.webp({ quality: 85, effort: 6 });
      } else if (['.jpg', '.jpeg'].includes(ext)) {
        pipeline = pipeline.jpeg({ quality: 85, progressive: true, mozjpeg: true });
      } else if (ext === '.png') {
        pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
      }

      await pipeline.toFile(tempPath);
      const originalSize = fs.statSync(imagePath).size;
      const optimizedSize = fs.statSync(tempPath).size;

      if (optimizedSize < originalSize) {
        fs.renameSync(tempPath, imagePath);
        const savedKB = Math.round((originalSize - optimizedSize) / 1024);
        console.log(`✅ ${path.basename(imagePath)} optimizada - Ahorrado: ${savedKB}KB`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`⏭️  ${path.basename(imagePath)} ya está optimizada`);
      }
    } catch (error) {
      console.error(`❌ Error optimizando ${imagePath}:`, error.message);
    }
  }

  async generateSummary() {
    console.log('\n📊 Resumen de imágenes generadas:');
    const dirs = ['profile', 'projects'];
    let totalFiles = 0;
    let totalSize = 0;

    for (const dir of dirs) {
      const dirPath = path.join(this.imagesDir, dir);
      if (!fs.existsSync(dirPath)) continue;

      const files = fs.readdirSync(dirPath)
        .filter(file => /\.(webp|jpg|jpeg|png)$/i.test(file));

      let dirSize = 0;
      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        dirSize += fs.statSync(filePath).size;
      });

      totalFiles += files.length;
      totalSize += dirSize;
      console.log(`📁 ${dir}: ${files.length} archivos - ${Math.round(dirSize / 1024)}KB`);
    }

    console.log(`
📈 Total: ${totalFiles} archivos - ${Math.round(totalSize / 1024)}KB`);
  }
}

if (require.main === module) {
  const generator = new ResponsiveImageGenerator();

  async function main() {
    await generator.generateResponsiveImages();
    await generator.optimizeExistingImages();
    await generator.generateSummary();
  }

  main().catch(console.error);
}

module.exports = ResponsiveImageGenerator;
