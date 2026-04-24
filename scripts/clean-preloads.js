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

  unnecessaryPreloads.forEach((regex) => {
    html = html.replace(regex, '');
  });

  html = html.replace(
    /<script>new MutationObserver\(\(e,s\)=>[\s\S]*?\.observe\(document\.head,\{childList:!0\}\)<\/script>/g,
    ''
  );

  const mainCssMatch = html.match(/["']([^"']*\/static\/css\/main\.[^"']+\.css)["']/);

  if (mainCssMatch) {
    const mainCssHref = mainCssMatch[1];
    const deferredCssLink = `<link href="${mainCssHref}" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link href="${mainCssHref}" rel="stylesheet"></noscript>`;

    html = html
      .replace(/<link[^>]+href="[^"]*\/static\/css\/main\.[^"]+\.css"[^>]*>/g, '')
      .replace(/<noscript>\s*<\/noscript>/g, '')
      .replace('</head>', `${deferredCssLink}</head>`);
  }

  fs.writeFileSync(buildIndexPath, html);
  console.log('Cleaned unnecessary preloads and deferred non-critical CSS');
} else {
  console.log('Build index.html not found');
}
