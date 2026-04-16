/**
 * Pre-build generator for anatoly-mook.de
 * 1. XML sitemaps in public/
 * 2. HTML sitemap page in public/html-sitemap/index.html (crawlable, no JS)
 * 3. Link fragment for injection into pre-rendered HTML
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
const SERVICE_LABELS = {
  seminare: 'Seminare & Workshops',
  coaching: 'Coaching & Mentoring',
  keynotes: 'Keynote-Vorträge',
  corporate: 'Corporate-Programme',
  transformation: 'Transformation',
  resources: 'Ressourcen',
  booking: 'Termin buchen',
};
const LANGS = ['', '/en', '/ru'];

const MAIN_PAGES = [
  { loc: '/', priority: '1.0', freq: 'daily', label: 'Startseite' },
  { loc: '/about', priority: '0.9', freq: 'monthly', label: 'Über Anatoly Mook' },
  { loc: '/seminare', priority: '0.9', freq: 'weekly', label: 'Seminare & Workshops' },
  { loc: '/coaching', priority: '0.9', freq: 'weekly', label: 'Coaching & Mentoring' },
  { loc: '/keynotes', priority: '0.8', freq: 'monthly', label: 'Keynote-Vorträge' },
  { loc: '/events', priority: '0.8', freq: 'weekly', label: 'Events & Veranstaltungen' },
  { loc: '/corporate', priority: '0.8', freq: 'monthly', label: 'Corporate-Programme' },
  { loc: '/transformation', priority: '0.8', freq: 'monthly', label: 'Transformation' },
  { loc: '/blog', priority: '0.7', freq: 'weekly', label: 'Blog & Insights' },
  { loc: '/produkte', priority: '0.7', freq: 'weekly', label: 'Shop & Produkte' },
  { loc: '/resources', priority: '0.6', freq: 'monthly', label: 'Ressourcen & Downloads' },
  { loc: '/faq', priority: '0.6', freq: 'monthly', label: 'Häufige Fragen' },
  { loc: '/kontakt', priority: '0.6', freq: 'monthly', label: 'Kontakt' },
  { loc: '/booking', priority: '0.7', freq: 'monthly', label: 'Termin buchen' },
  { loc: '/quiz', priority: '0.5', freq: 'monthly', label: 'Bewusstseins-Quiz' },
  { loc: '/impressum', priority: '0.3', freq: 'yearly', label: 'Impressum' },
  { loc: '/datenschutz', priority: '0.3', freq: 'yearly', label: 'Datenschutz' },
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

function extractCityData(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const cities = [];
    const re = /slug:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?country:\s*['"]([^'"]+)['"]/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      cities.push({ slug: m[1], name: m[2], country: m[3] });
    }
    const seen = new Set();
    return cities.filter(c => { if (seen.has(c.slug)) return false; seen.add(c.slug); return true; });
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
      const titleDe = block.match(/title:\s*\{[^}]*de:\s*['"]([^'"]+)['"]/)?.[1];
      if (slug) entries.push({ slug, slugEn: slugEn || slug, slugRu: slugRu || slug, title: titleDe || slug });
    }
    return entries;
  } catch { return []; }
}

function extractGlossaryData(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const entries = [];
    const blocks = content.split(/\{\s*slug:/);
    for (const block of blocks.slice(1)) {
      const slug = block.match(/^\s*['"]([^'"]+)['"]/)?.[1];
      const termDe = block.match(/term:\s*\{[^}]*de:\s*['"]([^'"]+)['"]/)?.[1];
      if (slug) entries.push({ slug, term: termDe || slug });
    }
    return [...new Map(entries.map(e => [e.slug, e])).values()];
  } catch { return []; }
}

function extractFaqData(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const entries = [];
    const blocks = content.split(/\{\s*slug:/);
    for (const block of blocks.slice(1)) {
      const slug = block.match(/^\s*['"]([^'"]+)['"]/)?.[1];
      const qDe = block.match(/question:\s*\{[^}]*de:\s*['"]([^'"]+)['"]/)?.[1];
      if (slug) entries.push({ slug, question: qDe || slug });
    }
    return [...new Map(entries.map(e => [e.slug, e])).values()];
  } catch { return []; }
}

function extractTestimonialData(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const entries = [];
    const blocks = content.split(/\{\s*slug:/);
    for (const block of blocks.slice(1)) {
      const slug = block.match(/^\s*['"]([^'"]+)['"]/)?.[1];
      const name = block.match(/name:\s*['"]([^'"]+)['"]/)?.[1];
      if (slug) entries.push({ slug, name: name || slug });
    }
    return [...new Map(entries.map(e => [e.slug, e])).values()];
  } catch { return []; }
}

// ── XML helpers ──────────────────────────────────────────────────────────────

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

function he(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Extract all data ─────────────────────────────────────────────────────────

const cities = extractCityData(path.join(SRC, 'seo', 'cityDatabase.ts'));
const citySlugs = cities.map(c => c.slug);
const topics = extractTopicSlugs(path.join(SRC, 'seo', 'topicClusters.ts'));
const glossary = extractGlossaryData(path.join(SRC, 'seo', 'glossaryData.ts'));
const faqs = extractFaqData(path.join(SRC, 'seo', 'faqDatabase.ts'));
const testimonials = extractTestimonialData(path.join(SRC, 'seo', 'testimonialData.ts'));

console.log('Generating sitemaps + HTML sitemap in public/ ...\n');
console.log(`  Data: ${cities.length} cities, ${topics.length} topics, ${glossary.length} glossary, ${faqs.length} FAQs, ${testimonials.length} testimonials`);

// ── 1. XML SITEMAPS ──────────────────────────────────────────────────────────

const mainEntries = [];
for (const page of MAIN_PAGES) {
  mainEntries.push(urlEntry(page.loc, page.priority, page.freq));
  if (!['/', '/impressum', '/datenschutz', '/quiz'].includes(page.loc)) {
    mainEntries.push(urlEntry(`/en${page.loc}`, '0.7', 'monthly'));
    mainEntries.push(urlEntry(`/ru${page.loc}`, '0.6', 'monthly'));
  }
}
mainEntries.push(urlEntry('/html-sitemap', '0.5', 'weekly'));
const mainCount = writeSitemap('sitemap-main.xml', mainEntries);
console.log(`  sitemap-main.xml: ${mainCount} URLs`);

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

const topicEntries = [];
for (const t of topics) {
  topicEntries.push(urlEntry(`/thema/${t.slug}`, '0.6', 'monthly'));
  topicEntries.push(urlEntry(`/en/topic/${t.slugEn}`, '0.5', 'monthly'));
  topicEntries.push(urlEntry(`/ru/tema/${t.slugRu}`, '0.4', 'monthly'));
}
const topicCount = writeSitemap('sitemap-topics.xml', topicEntries);
console.log(`  sitemap-topics.xml: ${topicCount} URLs`);

const glossaryEntries = [];
for (const g of glossary) {
  glossaryEntries.push(urlEntry(`/glossar/${g.slug}`, '0.4', 'monthly'));
  glossaryEntries.push(urlEntry(`/en/glossary/${g.slug}`, '0.3', 'monthly'));
  glossaryEntries.push(urlEntry(`/ru/glossarij/${g.slug}`, '0.3', 'monthly'));
}
const glossaryCount = writeSitemap('sitemap-glossary.xml', glossaryEntries);
console.log(`  sitemap-glossary.xml: ${glossaryCount} URLs`);

const faqEntries = [];
for (const f of faqs) {
  faqEntries.push(urlEntry(`/faq/${f.slug}`, '0.4', 'monthly'));
  faqEntries.push(urlEntry(`/en/faq/${f.slug}`, '0.3', 'monthly'));
}
const faqCount = writeSitemap('sitemap-faq.xml', faqEntries);
console.log(`  sitemap-faq.xml: ${faqCount} URLs`);

const testimonialEntries = [];
for (const t of testimonials) {
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
fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), indexXml, 'utf-8');

const total = mainCount + totalCityUrls + topicCount + glossaryCount + faqCount + testimonialCount;
console.log(`\n  XML Sitemap index: ${sitemapFiles.length} sub-sitemaps, ${total} total URLs`);

// ── 2. HTML SITEMAP ──────────────────────────────────────────────────────────

function linkBlock(href, text) {
  return `<a href="${he(href)}">${he(text)}</a>`;
}

const htmlParts = [];
htmlParts.push(`<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Komplette Sitemap – Alle Seiten von Anatoly Mook</title>
  <meta name="description" content="Vollständige Übersicht aller Seiten auf anatoly-mook.de: ${cities.length}+ Standorte, ${topics.length} Themen, ${glossary.length} Glossar-Einträge, ${faqs.length} FAQs und mehr.">
  <link rel="canonical" href="${BASE}/html-sitemap">
  <link rel="alternate" hreflang="de" href="${BASE}/html-sitemap">
  <link rel="alternate" hreflang="x-default" href="${BASE}/html-sitemap">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0a;color:#e0e0e0;line-height:1.5;padding:2rem}
    h1{font-size:2rem;margin-bottom:1rem;color:#f5a623}
    h2{font-size:1.4rem;margin:2rem 0 .8rem;color:#f5a623;border-bottom:1px solid #333;padding-bottom:.4rem}
    h3{font-size:1.1rem;margin:1.2rem 0 .5rem;color:#ddd}
    p{margin-bottom:1rem;color:#999}
    a{color:#6db3f2;text-decoration:none}
    a:hover{text-decoration:underline;color:#f5a623}
    .grid{display:flex;flex-wrap:wrap;gap:.4rem}
    .grid a{padding:.3rem .6rem;border:1px solid #333;border-radius:4px;font-size:.85rem}
    .grid a:hover{border-color:#f5a623}
    .faq-list a{display:block;padding:.3rem 0;border-bottom:1px solid #1a1a1a}
    nav{max-width:1200px;margin:0 auto}
    .count{color:#666;font-size:.85rem}
    .back{display:inline-block;margin-bottom:1.5rem;color:#f5a623;font-weight:600}
  </style>
</head>
<body>
<nav>
<a class="back" href="/">← Zurück zur Startseite</a>
<h1>Sitemap – Alle Seiten von Anatoly Mook</h1>
<p>Vollständige Übersicht aller ${total.toLocaleString('de-DE')}+ Seiten auf anatoly-mook.de</p>
`);

// Main pages
htmlParts.push(`<h2>Hauptseiten</h2><div class="grid">`);
for (const p of MAIN_PAGES) {
  htmlParts.push(linkBlock(p.loc, p.label));
}
htmlParts.push(linkBlock('/html-sitemap', 'Sitemap'));
htmlParts.push(`</div>`);

// EN/RU main pages
htmlParts.push(`<h2>English Pages</h2><div class="grid">`);
for (const p of MAIN_PAGES.filter(p => !['/', '/impressum', '/datenschutz', '/quiz'].includes(p.loc))) {
  htmlParts.push(linkBlock(`/en${p.loc}`, `${p.label} (EN)`));
}
htmlParts.push(`</div>`);
htmlParts.push(`<h2>Русские страницы</h2><div class="grid">`);
for (const p of MAIN_PAGES.filter(p => !['/', '/impressum', '/datenschutz', '/quiz'].includes(p.loc))) {
  htmlParts.push(linkBlock(`/ru${p.loc}`, `${p.label} (RU)`));
}
htmlParts.push(`</div>`);

// Cities overview
htmlParts.push(`<h2>Standorte <span class="count">(${cities.length} Städte)</span></h2>`);
htmlParts.push(`<h3>Stadtübersichten</h3><div class="grid">`);
for (const c of cities) {
  htmlParts.push(linkBlock(`/${c.slug}`, c.name));
}
htmlParts.push(`</div>`);

// City × Service combos
for (const svc of SERVICES) {
  htmlParts.push(`<h3>${SERVICE_LABELS[svc]} in allen Städten <span class="count">(${cities.length})</span></h3><div class="grid">`);
  for (const c of cities) {
    htmlParts.push(linkBlock(`/${svc}/${c.slug}`, `${c.name}`));
  }
  htmlParts.push(`</div>`);

  htmlParts.push(`<h3>${SERVICE_LABELS[svc]} – English <span class="count">(${cities.length})</span></h3><div class="grid">`);
  for (const c of cities) {
    htmlParts.push(linkBlock(`/en/${svc}/${c.slug}`, `${c.name}`));
  }
  htmlParts.push(`</div>`);

  htmlParts.push(`<h3>${SERVICE_LABELS[svc]} – Русский <span class="count">(${cities.length})</span></h3><div class="grid">`);
  for (const c of cities) {
    htmlParts.push(linkBlock(`/ru/${svc}/${c.slug}`, `${c.name}`));
  }
  htmlParts.push(`</div>`);
}

// Topics
htmlParts.push(`<h2>Themen <span class="count">(${topics.length})</span></h2><div class="grid">`);
for (const t of topics) {
  htmlParts.push(linkBlock(`/thema/${t.slug}`, t.title));
  htmlParts.push(linkBlock(`/en/topic/${t.slugEn}`, `${t.title} (EN)`));
  htmlParts.push(linkBlock(`/ru/tema/${t.slugRu}`, `${t.title} (RU)`));
}
htmlParts.push(`</div>`);

// Glossary
htmlParts.push(`<h2>Glossar <span class="count">(${glossary.length})</span></h2><div class="grid">`);
for (const g of glossary) {
  htmlParts.push(linkBlock(`/glossar/${g.slug}`, g.term));
  htmlParts.push(linkBlock(`/en/glossary/${g.slug}`, `${g.term} (EN)`));
  htmlParts.push(linkBlock(`/ru/glossarij/${g.slug}`, `${g.term} (RU)`));
}
htmlParts.push(`</div>`);

// FAQs
htmlParts.push(`<h2>Häufige Fragen <span class="count">(${faqs.length})</span></h2><div class="faq-list">`);
for (const f of faqs) {
  htmlParts.push(linkBlock(`/faq/${f.slug}`, f.question));
  htmlParts.push(linkBlock(`/en/faq/${f.slug}`, `${f.question} (EN)`));
}
htmlParts.push(`</div>`);

// Testimonials
htmlParts.push(`<h2>Erfolgsgeschichten <span class="count">(${testimonials.length})</span></h2><div class="grid">`);
for (const t of testimonials) {
  htmlParts.push(linkBlock(`/erfolgsgeschichte/${t.slug}`, t.name));
}
htmlParts.push(`</div>`);

htmlParts.push(`
<p style="margin-top:3rem;color:#555">Letzte Aktualisierung: ${NOW} · ${total.toLocaleString('de-DE')}+ Seiten</p>
</nav>
</body>
</html>`);

const htmlSitemapDir = path.join(PUBLIC, 'html-sitemap');
fs.mkdirSync(htmlSitemapDir, { recursive: true });
fs.writeFileSync(path.join(htmlSitemapDir, 'index.html'), htmlParts.join('\n'), 'utf-8');

let htmlLinkCount = 0;
const linkRe = /<a /g;
const htmlContent = htmlParts.join('\n');
while (linkRe.exec(htmlContent)) htmlLinkCount++;
console.log(`\n  HTML sitemap: ${htmlLinkCount} internal links\n`);

// ── 3. LINK FRAGMENT for pre-render injection ────────────────────────────────

const fragParts = [];
fragParts.push(`<nav id="seo-internal-links" aria-label="Interne Verlinkung" style="padding:1rem 2rem;font-size:.75rem;line-height:1.8;color:#555">`);

fragParts.push(`<p><strong>Unsere Angebote:</strong> `);
for (const p of MAIN_PAGES.filter(p => p.loc !== '/')) {
  fragParts.push(`<a href="${p.loc}">${he(p.label)}</a> · `);
}
fragParts.push(`<a href="/html-sitemap">Komplette Sitemap</a></p>`);

const topCities = cities.slice(0, 80);
for (const svc of SERVICES.slice(0, 5)) {
  fragParts.push(`<p><strong>${SERVICE_LABELS[svc]}:</strong> `);
  for (const c of topCities) {
    fragParts.push(`<a href="/${svc}/${c.slug}">${he(c.name)}</a> · `);
  }
  fragParts.push(`</p>`);
}

fragParts.push(`<p><strong>Standorte:</strong> `);
for (const c of cities) {
  fragParts.push(`<a href="/${c.slug}">${he(c.name)}</a> · `);
}
fragParts.push(`</p>`);

fragParts.push(`<p><strong>Themen:</strong> `);
for (const t of topics) {
  fragParts.push(`<a href="/thema/${t.slug}">${he(t.title)}</a> · `);
}
fragParts.push(`</p>`);

fragParts.push(`<p><strong>Glossar:</strong> `);
for (const g of glossary) {
  fragParts.push(`<a href="/glossar/${g.slug}">${he(g.term)}</a> · `);
}
fragParts.push(`</p>`);

fragParts.push(`<p><strong>FAQ:</strong> `);
for (const f of faqs) {
  fragParts.push(`<a href="/faq/${f.slug}">${he(f.question)}</a> · `);
}
fragParts.push(`</p>`);

fragParts.push(`<p><strong>Erfolgsgeschichten:</strong> `);
for (const t of testimonials) {
  fragParts.push(`<a href="/erfolgsgeschichte/${t.slug}">${he(t.name)}</a> · `);
}
fragParts.push(`</p>`);

fragParts.push(`</nav>`);

const fragment = fragParts.join('');
fs.writeFileSync(path.join(PUBLIC, '_seo-links-fragment.html'), fragment, 'utf-8');

let fragLinkCount = 0;
const fragLinkRe = /<a /g;
while (fragLinkRe.exec(fragment)) fragLinkCount++;
console.log(`  Link fragment: ${fragLinkCount} links (injected into each pre-rendered page)\n`);
