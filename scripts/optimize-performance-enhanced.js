const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

class PerformanceOptimizer {
  constructor() {
    this.buildDir = path.join(__dirname, '../build');
    this.publicDir = path.join(__dirname, '../public');
  }

  async optimizeAll() {
    console.log('🚀 Starting performance optimizations...');
    
    try {
      await this.optimizeImages();
      await this.generateWebPVariants();
      await this.createResponsiveImages();
      await this.optimizeCSS();
      await this.generatePreloadHints();
      await this.createServiceWorkerPrecache();
      
      console.log('✅ Performance optimizations completed!');
    } catch (error) {
      console.error('❌ Optimization failed:', error);
      process.exit(1);
    }
  }

  async optimizeImages() {
    console.log('🖼️ Optimizing images...');
    
    const imageDir = path.join(this.publicDir, 'images');
    const images = this.getAllImages(imageDir);
    
    for (const imagePath of images) {
      try {
        const ext = path.extname(imagePath).toLowerCase();
        
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          await sharp(imagePath)
            .jpeg({ quality: 85, progressive: true })
            .png({ quality: 85, compressionLevel: 9 })
            .toFile(imagePath.replace(ext, '_optimized' + ext));
          
          // Replace original with optimized
          fs.renameSync(imagePath.replace(ext, '_optimized' + ext), imagePath);
        }
      } catch (error) {
        console.warn(`Failed to optimize ${imagePath}:`, error.message);
      }
    }
  }

  async generateWebPVariants() {
    console.log('🔄 Generating WebP variants...');
    
    const imageDir = path.join(this.publicDir, 'images');
    const images = this.getAllImages(imageDir);
    
    for (const imagePath of images) {
      try {
        const ext = path.extname(imagePath).toLowerCase();
        
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const webpPath = imagePath.replace(ext, '.webp');
          
          if (!fs.existsSync(webpPath)) {
            await sharp(imagePath)
              .webp({ quality: 85, effort: 6 })
              .toFile(webpPath);
          }
        }
      } catch (error) {
        console.warn(`Failed to create WebP for ${imagePath}:`, error.message);
      }
    }
  }

  async createResponsiveImages() {
    console.log('📱 Creating responsive image variants...');
    
    const sizes = [320, 640, 1024, 1920];
    const imageDir = path.join(this.publicDir, 'images');
    const images = this.getAllImages(imageDir).filter(img => 
      !img.includes('-320') && !img.includes('-640') && 
      !img.includes('-1024') && !img.includes('-1920')
    );
    
    for (const imagePath of images) {
      try {
        const ext = path.extname(imagePath);
        const baseName = path.basename(imagePath, ext);
        const dir = path.dirname(imagePath);
        
        for (const size of sizes) {
          const outputPath = path.join(dir, `${baseName}-${size}.webp`);
          
          if (!fs.existsSync(outputPath)) {
            await sharp(imagePath)
              .resize(size, null, { 
                withoutEnlargement: true,
                fit: 'inside'
              })
              .webp({ quality: 85, effort: 6 })
              .toFile(outputPath);
          }
        }
      } catch (error) {
        console.warn(`Failed to create responsive variants for ${imagePath}:`, error.message);
      }
    }
  }

  async optimizeCSS() {
    console.log('🎨 Optimizing CSS...');
    
    const cssFiles = this.getAllFiles(this.buildDir, '.css');
    
    for (const cssFile of cssFiles) {
      try {
        let content = fs.readFileSync(cssFile, 'utf8');
        
        // Remove unused CSS (basic implementation)
        content = this.removeUnusedCSS(content);
        
        // Minify CSS
        content = content
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
          .replace(/\s+/g, ' ') // Collapse whitespace
          .replace(/;\s*}/g, '}') // Remove last semicolon
          .replace(/\s*{\s*/g, '{') // Clean braces
          .replace(/;\s*/g, ';') // Clean semicolons
          .trim();
        
        fs.writeFileSync(cssFile, content);
      } catch (error) {
        console.warn(`Failed to optimize CSS ${cssFile}:`, error.message);
      }
    }
  }

  removeUnusedCSS(css) {
    // Basic unused CSS removal - in production, use PurgeCSS
    const unusedSelectors = [
      /\.unused-class[^{]*{[^}]*}/g,
      /\.test-[^{]*{[^}]*}/g
    ];
    
    let optimized = css;
    unusedSelectors.forEach(selector => {
      optimized = optimized.replace(selector, '');
    });
    
    return optimized;
  }

  async generatePreloadHints() {
    console.log('🔗 Generating preload hints...');
    
    const indexPath = path.join(this.buildDir, 'index.html');
    if (!fs.existsSync(indexPath)) return;
    
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Find critical resources
    const criticalResources = [
      { href: '/images/profile/profile-david.webp', as: 'image', type: 'image/webp' },
      { href: '/images/projects/project-portfolio-320.webp', as: 'image', type: 'image/webp' },
      { href: '/static/css/main.css', as: 'style' },
    ];
    
    // Add preload links
    const preloadLinks = criticalResources
      .map(resource => {
        const type = resource.type ? ` type="${resource.type}"` : '';
        return `<link rel="preload" href="${resource.href}" as="${resource.as}"${type}>`;
      })
      .join('\n    ');
    
    html = html.replace(
      '<head>',
      `<head>\n    ${preloadLinks}`
    );
    
    fs.writeFileSync(indexPath, html);
  }

  async createServiceWorkerPrecache() {
    console.log('📦 Creating service worker precache manifest...');
    
    const staticAssets = [];
    
    // Get all static assets
    const staticDir = path.join(this.buildDir, 'static');
    if (fs.existsSync(staticDir)) {
      const jsFiles = this.getAllFiles(staticDir, '.js');
      const cssFiles = this.getAllFiles(staticDir, '.css');
      
      staticAssets.push(...jsFiles.map(f => f.replace(this.buildDir, '')));
      staticAssets.push(...cssFiles.map(f => f.replace(this.buildDir, '')));
    }
    
    // Add critical images
    const criticalImages = [
      '/images/profile/profile-david.webp',
      '/images/projects/project-portfolio-320.webp',
      '/icons/icon-192x192.png'
    ];
    
    staticAssets.push(...criticalImages);
    
    // Update service worker
    const swPath = path.join(this.buildDir, 'sw-enhanced.js');
    if (fs.existsSync(swPath)) {
      let swContent = fs.readFileSync(swPath, 'utf8');
      
      const assetsArray = JSON.stringify(staticAssets, null, 2);
      swContent = swContent.replace(
        /const STATIC_ASSETS = \[[\s\S]*?\];/,
        `const STATIC_ASSETS = ${assetsArray};`
      );
      
      fs.writeFileSync(swPath, swContent);
    }
  }

  getAllImages(dir) {
    const images = [];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'];
    
    const scanDir = (currentDir) => {
      if (!fs.existsSync(currentDir)) return;
      
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (imageExtensions.includes(path.extname(item).toLowerCase())) {
          images.push(fullPath);
        }
      }
    };
    
    scanDir(dir);
    return images;
  }

  getAllFiles(dir, extension) {
    const files = [];
    
    const scanDir = (currentDir) => {
      if (!fs.existsSync(currentDir)) return;
      
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (path.extname(item) === extension) {
          files.push(fullPath);
        }
      }
    };
    
    scanDir(dir);
    return files;
  }
}

// Run optimization if called directly
if (require.main === module) {
  const optimizer = new PerformanceOptimizer();
  optimizer.optimizeAll();
}

module.exports = PerformanceOptimizer;