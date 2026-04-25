const fs = require('fs');
const path = require('path');

console.log('🔍 Validating build configuration...');

// Validate that critical images exist
const criticalImages = [
  'public/images/projects/Generador-CV.webp',
  'public/images/profile/profile-david.jpg',
  'public/images/profile/profile-david.webp',
  'public/favicon.ico',
  'public/icons/icon-192x192.png'
];

let hasErrors = false;

criticalImages.forEach(imagePath => {
  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Missing critical image: ${imagePath}`);
    hasErrors = true;
  } else {
    console.log(`✅ Found: ${imagePath}`);
  }
});

// Validate service worker syntax
try {
  const swContent = fs.readFileSync('public/sw.js', 'utf8');
  if (swContent.includes('Promise.then') && !swContent.includes('.catch(')) {
    console.warn('⚠️  Service worker may have unhandled promises');
  } else {
    console.log('✅ Service worker validation passed');
  }
} catch (error) {
  console.error('❌ Service worker validation failed:', error.message);
  hasErrors = true;
}

// Validate HTML preload resources
try {
  const htmlContent = fs.readFileSync('public/index.html', 'utf8');
  const preloadMatches = htmlContent.match(/rel="preload"[^>]*href="([^"]*)"[^>]*as="image"/g);
  
  if (preloadMatches) {
    preloadMatches.forEach(match => {
      const href = match.match(/href="([^"]*)"/)[1];
      const cleanPath = href.replace('%PUBLIC_URL%/', 'public/');
      
      if (!fs.existsSync(cleanPath)) {
        console.error(`❌ Preloaded image not found: ${cleanPath}`);
        hasErrors = true;
      } else {
        console.log(`✅ Preload resource exists: ${cleanPath}`);
      }
    });
  }
} catch (error) {
  console.error('❌ HTML validation failed:', error.message);
  hasErrors = true;
}

if (hasErrors) {
  console.error('❌ Build validation failed. Please fix the errors above.');
  process.exit(1);
} else {
  console.log('✅ Build validation passed. Ready for deployment!');
}
