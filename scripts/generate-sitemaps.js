/**
 * Pre-build sitemap generator for anatoly-mook.de
 * Generates XML sitemaps in public/ so Vite treats them as static files.
 * Run BEFORE vite build: node scripts/generate-sitemaps.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '..', 'public');
const SRC = path.resolve(__dirname, '..', 'src');
const BASE = 'https://www.anatoly-mook.de';
const NOW = new Date().toISOString().split('T')[0];

const SERVICES = ['seminare', 'coaching', 'keynotes', 'corporate', 'transformation', 'resources', 'booking'];
const LANGS = ['', '/en', '/ru'];

const MAIN_PAGES = [
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

function hreflang(pagePath) {
  const clean = pagePath.replace(/^\/(en|ru)/, '') || '/';
  const p = clean === '/' ? '' : clean;
  return [
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${p}" />`,
    `      <xhtml:link rel="alternate" hreflang="de" href="${BASE}${p}" />`,
    `      <xhtml:link rel="alternate" hreflang="en" href="${BASE}/en${p}" />`,
    `      <xhtml:link rel="alternate" hreflang="ru" href="${BASE}/ru${p}" />`,
  ].join('\n');
}

function urlEntry(loc, priority, freq) {
  return `  <url>
    <loc>${xmlEsc(BASE + loc)}</loc>
    <lastmod>${NOW}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
${hreflang(loc)}
  </url>`;
}

function writeSitemap(filename, entries) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(PUBLIC, filename), xml, 'utf-8');
  return entries.length;
}

// ── Main ─────────────────────────────────────────────────────────────────────

console.log('Generating sitemaps in public/ ...\n');

// Main pages
const mainEntries = [];
for (const page of MAIN_PAGES) {
  mainEntries.push(urlEntry(page.loc, page.priority, page.freq));
  if (!['/', '/impressum', '/datenschutz', '/quiz'].includes(page.loc)) {
    mainEntries.push(urlEntry(`/en${page.loc}`, '0.7', 'monthly'));
    mainEntries.push(urlEntry(`/ru${page.loc}`, '0.6', 'monthly'));
  }
}
const mainCount = writeSitemap('sitemap-main.xml', mainEntries);
console.log(`  sitemap-main.xml: ${mainCount} URLs`);

// City pages
const citySlugs = extractSlugs(path.join(SRC, 'seo', 'cityDatabase.ts'));
const cityEntries = [];
for (const slug of citySlugs) {
  cityEntries.push(urlEntry(`/${slug}`, '0.5', 'monthly'));
  for (const svc of SERVICES) {
    for (const lp of LANGS) {
      cityEntries.push(urlEntry(`${lp}/${svc}/${slug}`, lp ? '0.4' : '0.6', 'monthly'));
    }
  }
}

const CHUNK = 10000;
let cityFileIdx = 0;
let totalCityUrls = 0;
for (let i = 0; i < cityEntries.length; i += CHUNK) {
  const chunk = cityEntries.slice(i, i + CHUNK);
  const fn = `sitemap-cities-${cityFileIdx}.xml`;
  totalCityUrls += writeSitemap(fn, chunk);
  console.log(`  ${fn}: ${chunk.length} URLs`);
  cityFileIdx++;
}

// Topic pages
const topics = extractTopicSlugs(path.join(SRC, 'seo', 'topicClusters.ts'));
const topicEntries = [];
for (const t of topics) {
  topicEntries.push(urlEntry(`/thema/${t.slug}`, '0.6', 'monthly'));
  topicEntries.push(urlEntry(`/en/topic/${t.slugEn}`, '0.5', 'monthly'));
  topicEntries.push(urlEntry(`/ru/tema/${t.slugRu}`, '0.4', 'monthly'));
}
const topicCount = writeSitemap('sitemap-topics.xml', topicEntries);
console.log(`  sitemap-topics.xml: ${topicCount} URLs`);

// Glossary pages
const glossarySlugs = extractSlugs(path.join(SRC, 'seo', 'glossaryData.ts'));
const glossaryEntries = [];
for (const slug of glossarySlugs) {
  glossaryEntries.push(urlEntry(`/glossar/${slug}`, '0.4', 'monthly'));
  glossaryEntries.push(urlEntry(`/en/glossary/${slug}`, '0.3', 'monthly'));
  glossaryEntries.push(urlEntry(`/ru/glossarij/${slug}`, '0.3', 'monthly'));
}
const glossaryCount = writeSitemap('sitemap-glossary.xml', glossaryEntries);
console.log(`  sitemap-glossary.xml: ${glossaryCount} URLs`);

// FAQ pages
const faqSlugs = extractSlugs(path.join(SRC, 'seo', 'faqDatabase.ts'));
const faqEntries = [];
for (const slug of faqSlugs) {
  faqEntries.push(urlEntry(`/faq/${slug}`, '0.4', 'monthly'));
  faqEntries.push(urlEntry(`/en/faq/${slug}`, '0.3', 'monthly'));
}
const faqCount = writeSitemap('sitemap-faq.xml', faqEntries);
console.log(`  sitemap-faq.xml: ${faqCount} URLs`);

// Testimonial pages
const testimonialSlugs = extractSlugs(path.join(SRC, 'seo', 'testimonialData.ts'));
const testimonialEntries = [];
for (const slug of testimonialSlugs) {
  testimonialEntries.push(urlEntry(`/erfolgsgeschichte/${slug}`, '0.4', 'monthly'));
}
const testimonialCount = writeSitemap('sitemap-testimonials.xml', testimonialEntries);
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
    <loc>${BASE}/${f}</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), indexXml, 'utf-8');

const total = mainCount + totalCityUrls + topicCount + glossaryCount + faqCount + testimonialCount;
console.log(`\nSitemap index: ${sitemapFiles.length} sub-sitemaps, ${total} total URLs\n`);
