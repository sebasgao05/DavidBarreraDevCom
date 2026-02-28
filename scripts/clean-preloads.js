const fs = require('fs');
const path = require('path');

const buildIndexPath = path.join(__dirname, '../build/index.html');

if (fs.existsSync(buildIndexPath)) {
  let html = fs.readFileSync(buildIndexPath, 'utf8');
  
  // Eliminar preloads innecesarios que causan warnings
  const unnecessaryPreloads = [
    /\s*<link rel="preload" href="[^"]*profile-david\.webp"[^>]*>\s*/g,
    /\s*<link rel="preload" href="[^"]*project-portfolio-320\.webp"[^>]*>\s*/g,
    /\s*<link rel="preload" href="[^"]*project-aws-iot-320\.webp"[^>]*>\s*/g,
    /\s*<link rel="preload" href="[^"]*main\.css"[^>]*>\s*/g
  ];
  
  unnecessaryPreloads.forEach(regex => {
    html = html.replace(regex, '');
  });
  
  fs.writeFileSync(buildIndexPath, html);
  console.log('✅ Cleaned unnecessary preloads from build HTML');
} else {
  console.log('⚠️  Build index.html not found');
}