const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando optimizaciones SEO...\n');

const publicDir = path.join(__dirname, 'public');
const requiredFiles = [
  'robots.txt',
  'sitemap.xml',
  'manifest.json',
  'og-image.jpg',
  'logo192.png',
  'logo512.png'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - Existe`);
  } else {
    console.log(`❌ ${file} - Falta`);
    allFilesExist = false;
  }
});

// Verificar index.html
const indexPath = path.join(publicDir, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  console.log('\n📄 Verificando index.html:');
  
  const checks = [
    { name: 'Meta description', regex: /<meta name="description"/ },
    { name: 'Meta keywords', regex: /<meta name="keywords"/ },
    { name: 'Open Graph tags', regex: /<meta property="og:/ },
    { name: 'Twitter Cards', regex: /<meta property="twitter:/ },
    { name: 'Structured Data', regex: /<script type="application\/ld\+json">/ },
    { name: 'Canonical URL', regex: /<link rel="canonical"/ },
    { name: 'Lang attribute', regex: /<html lang="/ }
  ];
  
  checks.forEach(check => {
    if (check.regex.test(indexContent)) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name}`);
      allFilesExist = false;
    }
  });
}

console.log('\n📊 Resumen:');
if (allFilesExist) {
  console.log('🎉 ¡Todas las optimizaciones SEO están implementadas!');
  console.log('\n📈 Puntuación SEO estimada: 9/10');
  console.log('\n🚀 Próximos pasos:');
  console.log('- Optimizar imágenes (WebP, tamaños correctos)');
  console.log('- Implementar lazy loading');
  console.log('- Configurar Google Analytics');
  console.log('- Verificar Core Web Vitals');
} else {
  console.log('⚠️  Algunas optimizaciones están pendientes');
  console.log('📈 Puntuación SEO estimada: 7/10');
}

console.log('\n🔗 Recursos útiles:');
console.log('- Google Search Console: https://search.google.com/search-console');
console.log('- PageSpeed Insights: https://pagespeed.web.dev/');
console.log('- Structured Data Testing: https://search.google.com/test/rich-results');