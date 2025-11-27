import { env } from '../config/env';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (baseUrl: string = env.siteUrl): string => {
  const urls: SitemapUrl[] = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/#about`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/#projects`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/#contact`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = (baseUrl: string = env.siteUrl): string => {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
};

// Function to create and download sitemap
export const downloadSitemap = (baseUrl?: string) => {
  const sitemap = generateSitemap(baseUrl);
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadRobotsTxt = (baseUrl?: string) => {
  const robotsTxt = generateRobotsTxt(baseUrl);
  const blob = new Blob([robotsTxt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
