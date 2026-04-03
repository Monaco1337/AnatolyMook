/**
 * Sitemap Index Generator for anatoly-mook.de
 * Generates sitemap-index.xml + sub-sitemaps for 5000+ pages.
 * Run after build: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const BASE = 'https://www.anatoly-mook.de';
const NOW = new Date().toISOString().split('T')[0];

const mainPages = [
  { loc: '/', priority: '1.0', freq: 'daily' },
  { loc: '/about', priority: '0.9', freq: 'monthly' },
  { loc: '/seminare', priority: '0.9', freq: 'weekly' },
  { loc: '/coaching', priority: '0.9', freq: 'weekly' },
  { loc: '/keynotes', priority: '0.8', freq: 'monthly' },
  { loc: '/events', priority: '0.8', freq: 'weekly' },
  { loc: '/corporate', priority: '0.8', freq: 'monthly' },
  { loc: '/transformation', priority: '0.8', freq: 'monthly' },
  { loc: '/blog', priority: '0.7', freq: 'weekly' },
  { loc: '/produkte', priority: '0.7', freq: 'weekly' },
  { loc: '/resources', priority: '0.6', freq: 'monthly' },
  { loc: '/faq', priority: '0.6', freq: 'monthly' },
  { loc: '/kontakt', priority: '0.6', freq: 'monthly' },
  { loc: '/booking', priority: '0.7', freq: 'monthly' },
  { loc: '/quiz', priority: '0.5', freq: 'monthly' },
  { loc: '/impressum', priority: '0.3', freq: 'yearly' },
  { loc: '/datenschutz', priority: '0.3', freq: 'yearly' },
];

const services = ['seminare', 'coaching', 'keynotes', 'corporate', 'transformation', 'resources', 'booking'];
const langs = ['', '/en', '/ru'];

function xmlEscape(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function hreflangBlock(pagePath) {
  const clean = pagePath.replace(/^\/(en|ru)/, '') || '/';
  const p = clean === '/' ? '' : clean;
  const links = [
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${p}" />`,
    `      <xhtml:link rel="alternate" hreflang="de" href="${BASE}${p}" />`,
    `      <xhtml:link rel="alternate" hreflang="en" href="${BASE}/en${p}" />`,
    `      <xhtml:link rel="alternate" hreflang="ru" href="${BASE}/ru${p}" />`,
  ];
  return links.join('\n');
}

function urlEntry(loc, priority, freq) {
  return `  <url>
    <loc>${xmlEscape(BASE + loc)}</loc>
    <lastmod>${NOW}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
${hreflangBlock(loc)}
  </url>`;
}

function writeSitemap(filename, entries) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(DIST, filename), xml, 'utf-8');
  return entries.length;
}

async function loadData() {
  let cities = [];
  let topics = [];
  let glossary = [];
  let faqs = [];
  let testimonials = [];

  try {
    const cityMod = await import(path.resolve(__dirname, '..', 'src', 'seo', 'cityDatabase.ts'));
    cities = cityMod.allCities || [];
  } catch { /* will use localSEO fallback */ }

  try {
    const topicMod = await import(path.resolve(__dirname, '..', 'src', 'seo', 'topicClusters.ts'));
    topics = topicMod.topicClusters || [];
  } catch { /* empty */ }

  try {
    const glossaryMod = await import(path.resolve(__dirname, '..', 'src', 'seo', 'glossaryData.ts'));
    glossary = glossaryMod.glossaryEntries || [];
  } catch { /* empty */ }

  try {
    const faqMod = await import(path.resolve(__dirname, '..', 'src', 'seo', 'faqDatabase.ts'));
    faqs = faqMod.faqEntries || [];
  } catch { /* empty */ }

  try {
    const testMod = await import(path.resolve(__dirname, '..', 'src', 'seo', 'testimonialData.ts'));
    testimonials = testMod.testimonials || [];
  } catch { /* empty */ }

  return { cities, topics, glossary, faqs, testimonials };
}

async function main() {
  if (!fs.existsSync(DIST)) {
    console.log('dist/ not found, creating...');
    fs.mkdirSync(DIST, { recursive: true });
  }

  console.log('Generating sitemap index for anatoly-mook.de...\n');

  const mainEntries = [];
  for (const page of mainPages) {
    mainEntries.push(urlEntry(page.loc, page.priority, page.freq));
    if (!['/', '/impressum', '/datenschutz', '/quiz'].includes(page.loc)) {
      mainEntries.push(urlEntry(`/en${page.loc}`, String((parseFloat(page.priority) * 0.9).toFixed(1)), 'monthly'));
      mainEntries.push(urlEntry(`/ru${page.loc}`, String((parseFloat(page.priority) * 0.8).toFixed(1)), 'monthly'));
    }
  }
  const mainCount = writeSitemap('sitemap-main.xml', mainEntries);
  console.log(`  sitemap-main.xml: ${mainCount} URLs`);

  let data;
  try {
    data = await loadData();
  } catch {
    data = { cities: [], topics: [], glossary: [], faqs: [], testimonials: [] };
  }

  const cityEntries = [];
  const cityList = data.cities.length > 0
    ? data.cities.map(c => ({ slug: c.slug, name: c.name || c.nameLocal }))
    : [];

  if (cityList.length === 0) {
    const localSEO = await import(path.resolve(__dirname, '..', 'src', 'utils', 'localSEO.ts')).catch(() => null);
    if (localSEO?.europeanCities) {
      cityList.push(...localSEO.europeanCities.map(c => ({ slug: c.slug, name: c.city })));
    }
  }

  for (const city of cityList) {
    cityEntries.push(urlEntry(`/${city.slug}`, '0.5', 'monthly'));
    for (const svc of services) {
      for (const langPrefix of langs) {
        cityEntries.push(urlEntry(`${langPrefix}/${svc}/${city.slug}`, langPrefix ? '0.4' : '0.6', 'monthly'));
      }
    }
  }

  const CHUNK = 10000;
  let cityFileIdx = 0;
  let totalCityUrls = 0;
  for (let i = 0; i < cityEntries.length; i += CHUNK) {
    const chunk = cityEntries.slice(i, i + CHUNK);
    const filename = `sitemap-cities-${cityFileIdx}.xml`;
    const count = writeSitemap(filename, chunk);
    totalCityUrls += count;
    console.log(`  ${filename}: ${count} URLs`);
    cityFileIdx++;
  }

  const topicEntries = [];
  for (const topic of data.topics) {
    topicEntries.push(urlEntry(`/thema/${topic.slug}`, '0.6', 'monthly'));
    if (topic.slugEn) topicEntries.push(urlEntry(`/en/topic/${topic.slugEn}`, '0.5', 'monthly'));
    if (topic.slugRu) topicEntries.push(urlEntry(`/ru/tema/${topic.slugRu}`, '0.4', 'monthly'));
  }
  const topicCount = writeSitemap('sitemap-topics.xml', topicEntries);
  console.log(`  sitemap-topics.xml: ${topicCount} URLs`);

  const glossaryEntries = [];
  for (const entry of data.glossary) {
    glossaryEntries.push(urlEntry(`/glossar/${entry.slug}`, '0.4', 'monthly'));
    glossaryEntries.push(urlEntry(`/en/glossary/${entry.slug}`, '0.3', 'monthly'));
    glossaryEntries.push(urlEntry(`/ru/glossarij/${entry.slug}`, '0.3', 'monthly'));
  }
  const glossaryCount = writeSitemap('sitemap-glossary.xml', glossaryEntries);
  console.log(`  sitemap-glossary.xml: ${glossaryCount} URLs`);

  const faqEntries = [];
  for (const faq of data.faqs) {
    faqEntries.push(urlEntry(`/faq/${faq.slug}`, '0.4', 'monthly'));
    faqEntries.push(urlEntry(`/en/faq/${faq.slug}`, '0.3', 'monthly'));
  }
  const faqCount = writeSitemap('sitemap-faq.xml', faqEntries);
  console.log(`  sitemap-faq.xml: ${faqCount} URLs`);

  const testimonialEntries = [];
  for (const t of data.testimonials) {
    testimonialEntries.push(urlEntry(`/erfolgsgeschichte/${t.slug}`, '0.4', 'monthly'));
  }
  const testimonialCount = writeSitemap('sitemap-testimonials.xml', testimonialEntries);
  console.log(`  sitemap-testimonials.xml: ${testimonialCount} URLs`);

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
    <loc>${BASE}/${f}</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), indexXml, 'utf-8');

  const total = mainCount + totalCityUrls + topicCount + glossaryCount + faqCount + testimonialCount;
  console.log(`\nSitemap index generated: ${sitemapFiles.length} sub-sitemaps, ${total} total URLs`);
}

main().catch(console.error);
