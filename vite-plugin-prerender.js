import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.anatoly-mook.de';

const mainRoutes = [
  { path: '/', title: 'Anatoly Mook – Klarheit, bewusste Führung & persönliche Meisterschaft', description: 'Anatoly Mook steht für Klarheit statt Suche. Bewusstseinsarbeit, Coaching und Formate für Menschen, die Verantwortung übernehmen und ihr Leben konsequent gestalten wollen.' },
  { path: '/about', title: 'Über Anatoly Mook – Methode & Philosophie', description: 'Erfahren Sie mehr über Anatoly Mooks Ansatz, seine Methode und die Philosophie hinter Klarheit und bewusster Führung.' },
  { path: '/seminare', title: 'Seminare & Workshops – Anatoly Mook', description: 'Intensive Seminare und Workshops für Bewusstseinsentwicklung, persönliche Meisterschaft und bewusste Führung.' },
  { path: '/coaching', title: '1:1 Coaching & Mentoring – Anatoly Mook', description: 'Individuelles Coaching und Mentoring für Klarheit, Entscheidungsstärke und nachhaltige Transformation.' },
  { path: '/keynotes', title: 'Keynote-Vorträge – Anatoly Mook', description: 'Inspirierende Keynote-Vorträge zu Klarheit, Bewusstsein und persönlicher Meisterschaft für Ihr Event.' },
  { path: '/events', title: 'Events & Veranstaltungen – Anatoly Mook', description: 'Aktuelle Events, Veranstaltungen und Termine von Anatoly Mook.' },
  { path: '/corporate', title: 'Corporate-Programme – Anatoly Mook', description: 'Führungskräfteentwicklung und Organisationstransformation durch bewusste Führung für Unternehmen.' },
  { path: '/transformation', title: 'Transformation – Anatoly Mook', description: 'Der Weg zur persönlichen Transformation: Bewusstseinsentwicklung und nachhaltige Veränderung.' },
  { path: '/blog', title: 'Blog – Insights & Perspektiven von Anatoly Mook', description: 'Artikel, Insights und Perspektiven zu Bewusstsein, Führung und persönlicher Meisterschaft.' },
  { path: '/produkte', title: 'Shop – Digitale Produkte & Kurse', description: 'Digitale Produkte, Online-Kurse und Materialien für persönliche Meisterschaft und bewusste Führung.' },
  { path: '/resources', title: 'Ressourcen & Downloads – Anatoly Mook', description: 'Kostenlose Ressourcen, Guides und Downloads für Ihre persönliche Entwicklung.' },
  { path: '/faq', title: 'Häufige Fragen (FAQ) – Anatoly Mook', description: 'Antworten auf häufig gestellte Fragen zu Coaching, Seminaren, Corporate-Programmen und Buchung.' },
  { path: '/kontakt', title: 'Kontakt – Anatoly Mook', description: 'Nehmen Sie Kontakt mit Anatoly Mook auf. Anfragen zu Coaching, Seminaren und Keynotes.' },
  { path: '/booking', title: 'Termin buchen – Anatoly Mook', description: 'Buchen Sie Ihren Termin für Coaching, Seminare oder ein Erstgespräch mit Anatoly Mook.' },
  { path: '/quiz', title: 'Bewusstseins-Quiz – Anatoly Mook', description: 'Testen Sie Ihr Bewusstseinsniveau mit dem interaktiven Quiz von Anatoly Mook.' },
  { path: '/impressum', title: 'Impressum – Anatoly Mook', description: 'Impressum und rechtliche Informationen zur Website www.anatoly-mook.de.' },
  { path: '/datenschutz', title: 'Datenschutz – Anatoly Mook', description: 'Datenschutzerklärung und Informationen zum Umgang mit personenbezogenen Daten.' },
];

const enRoutes = mainRoutes
  .filter(r => !['/impressum', '/datenschutz', '/quiz', '/'].includes(r.path))
  .map(r => ({ path: `/en${r.path}`, title: r.title, description: r.description }));

const ruRoutes = mainRoutes
  .filter(r => !['/impressum', '/datenschutz', '/quiz', '/'].includes(r.path))
  .map(r => ({ path: `/ru${r.path}`, title: r.title, description: r.description }));

function generateMetaTags(route) {
  const fullUrl = `${BASE_URL}${route.path === '/' ? '' : route.path}`;
  const ogImage = `${BASE_URL}/bildschirmfoto_2025-12-10_um_20.44.33.png`;
  const cleanPath = route.path.replace(/^\/(en|ru)/, '') || '/';
  const pagePath = cleanPath === '/' ? '' : cleanPath;
  return `
    <title>${route.title}</title>
    <meta name="title" content="${route.title}" />
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${fullUrl}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="Anatoly Mook" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${ogImage}" />
    <link rel="alternate" hreflang="x-default" href="${BASE_URL}${pagePath}" />
    <link rel="alternate" hreflang="de" href="${BASE_URL}${pagePath}" />
    <link rel="alternate" hreflang="en" href="${BASE_URL}/en${pagePath}" />
    <link rel="alternate" hreflang="ru" href="${BASE_URL}/ru${pagePath}" />`;
}

// ---------------------------------------------------------------------------
// Sitemap generation helpers
// ---------------------------------------------------------------------------

function extractSlugs(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const slugs = [];
    const re = /slug:\s*['"]([^'"]+)['"]/g;
    let m;
    while ((m = re.exec(content)) !== null) slugs.push(m[1]);
    return [...new Set(slugs)];
  } catch { return []; }
}

function extractTopicSlugs(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const entries = [];
    const blocks = content.split(/\{\s*slug:/);
    for (const block of blocks.slice(1)) {
      const slug = block.match(/^\s*['"]([^'"]+)['"]/)?.[1];
      const slugEn = block.match(/slugEn:\s*['"]([^'"]+)['"]/)?.[1];
      const slugRu = block.match(/slugRu:\s*['"]([^'"]+)['"]/)?.[1];
      if (slug) entries.push({ slug, slugEn: slugEn || slug, slugRu: slugRu || slug });
    }
    return entries;
  } catch { return []; }
}

function xmlEsc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function hreflangBlock(pagePath) {
  const clean = pagePath.replace(/^\/(en|ru)/, '') || '/';
  const p = clean === '/' ? '' : clean;
  return [
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${p}" />`,
    `      <xhtml:link rel="alternate" hreflang="de" href="${BASE_URL}${p}" />`,
    `      <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en${p}" />`,
    `      <xhtml:link rel="alternate" hreflang="ru" href="${BASE_URL}/ru${p}" />`,
  ].join('\n');
}

function urlEntry(loc, priority, freq, lastmod) {
  return `  <url>
    <loc>${xmlEsc(BASE_URL + loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
${hreflangBlock(loc)}
  </url>`;
}

function writeSitemap(distPath, filename, entries) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(distPath, filename), xml, 'utf-8');
  return entries.length;
}

function generateSitemaps(distPath, srcDir) {
  const NOW = new Date().toISOString().split('T')[0];
  const services = ['seminare', 'coaching', 'keynotes', 'corporate', 'transformation', 'resources', 'booking'];
  const langs = ['', '/en', '/ru'];

  console.log('\n🗺️  Generating sitemaps...\n');

  // Main pages
  const mainEntries = [];
  const mainPriorities = { '/': '1.0', '/about': '0.9', '/seminare': '0.9', '/coaching': '0.9', '/keynotes': '0.8', '/events': '0.8', '/corporate': '0.8', '/transformation': '0.8', '/blog': '0.7', '/produkte': '0.7', '/resources': '0.6', '/faq': '0.6', '/kontakt': '0.6', '/booking': '0.7', '/quiz': '0.5', '/impressum': '0.3', '/datenschutz': '0.3' };
  for (const r of mainRoutes) {
    mainEntries.push(urlEntry(r.path, mainPriorities[r.path] || '0.5', r.path === '/' ? 'daily' : 'weekly', NOW));
    if (!['/', '/impressum', '/datenschutz', '/quiz'].includes(r.path)) {
      mainEntries.push(urlEntry(`/en${r.path}`, '0.7', 'monthly', NOW));
      mainEntries.push(urlEntry(`/ru${r.path}`, '0.6', 'monthly', NOW));
    }
  }
  const mainCount = writeSitemap(distPath, 'sitemap-main.xml', mainEntries);
  console.log(`  sitemap-main.xml: ${mainCount} URLs`);

  // City pages
  const citySlugs = extractSlugs(path.join(srcDir, 'seo', 'cityDatabase.ts'));
  const cityEntries = [];
  for (const slug of citySlugs) {
    cityEntries.push(urlEntry(`/${slug}`, '0.5', 'monthly', NOW));
    for (const svc of services) {
      for (const langPfx of langs) {
        cityEntries.push(urlEntry(`${langPfx}/${svc}/${slug}`, langPfx ? '0.4' : '0.6', 'monthly', NOW));
      }
    }
  }

  const CHUNK = 10000;
  let cityFileIdx = 0;
  let totalCityUrls = 0;
  for (let i = 0; i < cityEntries.length; i += CHUNK) {
    const chunk = cityEntries.slice(i, i + CHUNK);
    const fn = `sitemap-cities-${cityFileIdx}.xml`;
    totalCityUrls += writeSitemap(distPath, fn, chunk);
    console.log(`  ${fn}: ${chunk.length} URLs`);
    cityFileIdx++;
  }

  // Topic pages
  const topicEntries = [];
  const topics = extractTopicSlugs(path.join(srcDir, 'seo', 'topicClusters.ts'));
  for (const t of topics) {
    topicEntries.push(urlEntry(`/thema/${t.slug}`, '0.6', 'monthly', NOW));
    topicEntries.push(urlEntry(`/en/topic/${t.slugEn}`, '0.5', 'monthly', NOW));
    topicEntries.push(urlEntry(`/ru/tema/${t.slugRu}`, '0.4', 'monthly', NOW));
  }
  const topicCount = writeSitemap(distPath, 'sitemap-topics.xml', topicEntries);
  console.log(`  sitemap-topics.xml: ${topicCount} URLs`);

  // Glossary pages
  const glossarySlugs = extractSlugs(path.join(srcDir, 'seo', 'glossaryData.ts'));
  const glossaryEntries = [];
  for (const slug of glossarySlugs) {
    glossaryEntries.push(urlEntry(`/glossar/${slug}`, '0.4', 'monthly', NOW));
    glossaryEntries.push(urlEntry(`/en/glossary/${slug}`, '0.3', 'monthly', NOW));
    glossaryEntries.push(urlEntry(`/ru/glossarij/${slug}`, '0.3', 'monthly', NOW));
  }
  const glossaryCount = writeSitemap(distPath, 'sitemap-glossary.xml', glossaryEntries);
  console.log(`  sitemap-glossary.xml: ${glossaryCount} URLs`);

  // FAQ pages
  const faqSlugs = extractSlugs(path.join(srcDir, 'seo', 'faqDatabase.ts'));
  const faqEntries = [];
  for (const slug of faqSlugs) {
    faqEntries.push(urlEntry(`/faq/${slug}`, '0.4', 'monthly', NOW));
    faqEntries.push(urlEntry(`/en/faq/${slug}`, '0.3', 'monthly', NOW));
  }
  const faqCount = writeSitemap(distPath, 'sitemap-faq.xml', faqEntries);
  console.log(`  sitemap-faq.xml: ${faqCount} URLs`);

  // Testimonial pages
  const testimonialSlugs = extractSlugs(path.join(srcDir, 'seo', 'testimonialData.ts'));
  const testimonialEntries = [];
  for (const slug of testimonialSlugs) {
    testimonialEntries.push(urlEntry(`/erfolgsgeschichte/${slug}`, '0.4', 'monthly', NOW));
  }
  const testimonialCount = writeSitemap(distPath, 'sitemap-testimonials.xml', testimonialEntries);
  console.log(`  sitemap-testimonials.xml: ${testimonialCount} URLs`);

  // Sitemap index
  const sitemapFiles = [
    'sitemap-main.xml',
    ...Array.from({ length: cityFileIdx }, (_, i) => `sitemap-cities-${i}.xml`),
    'sitemap-topics.xml',
    'sitemap-glossary.xml',
    'sitemap-faq.xml',
    'sitemap-testimonials.xml',
  ];

  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map(f => `  <sitemap>
    <loc>${BASE_URL}/${f}</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), indexXml, 'utf-8');

  const total = mainCount + totalCityUrls + topicCount + glossaryCount + faqCount + testimonialCount;
  console.log(`\n✅ Sitemap index: ${sitemapFiles.length} sub-sitemaps, ${total} total URLs\n`);
  return total;
}

// ---------------------------------------------------------------------------
// Vite Plugin
// ---------------------------------------------------------------------------

export default function prerenderPlugin() {
  return {
    name: 'vite-plugin-prerender-seo',
    closeBundle: async () => {
      const distPath = path.resolve(process.cwd(), 'dist');
      const srcDir = path.resolve(process.cwd(), 'src');
      const indexPath = path.join(distPath, 'index.html');

      if (!fs.existsSync(indexPath)) {
        console.log('index.html not found in dist, skipping prerender');
        return;
      }

      // 1. Pre-render static HTML
      console.log('\n🔧 SEO pre-rendering started...\n');
      const baseHtml = fs.readFileSync(indexPath, 'utf-8');
      const allRoutes = [...mainRoutes, ...enRoutes, ...ruRoutes];
      let count = 0;

      for (const route of allRoutes) {
        const routePath = route.path === '/' ? indexPath : path.join(distPath, route.path, 'index.html');
        if (route.path !== '/') {
          fs.mkdirSync(path.join(distPath, route.path), { recursive: true });
        }
        let html = baseHtml;
        const metaTags = generateMetaTags(route);
        html = html.replace(/<title>.*?<\/title>/s, metaTags);
        html = html.replace(/https:\/\/(www\.)?anatolymook\.de/g, BASE_URL).replace(/https:\/\/anatolymook\.com/g, BASE_URL);
        fs.writeFileSync(routePath, html, 'utf-8');
        count++;
      }
      console.log(`✅ Pre-rendered ${count} routes with full SEO meta tags`);

      // 2. Generate sitemaps
      generateSitemaps(distPath, srcDir);
    }
  };
}
