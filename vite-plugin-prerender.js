import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/seminare', name: 'Seminare' },
  { path: '/coaching', name: 'Coaching' },
  { path: '/keynotes', name: 'Keynotes' },
  { path: '/events', name: 'Events' },
  { path: '/corporate', name: 'Corporate' },
  { path: '/transformation', name: 'Transformation' },
  { path: '/blog', name: 'Blog' },
  { path: '/produkte', name: 'Produkte' },
  { path: '/resources', name: 'Resources' },
  { path: '/faq', name: 'FAQ' },
  { path: '/kontakt', name: 'Kontakt' },
  { path: '/booking', name: 'Booking' },
  { path: '/quiz', name: 'Quiz' },
  { path: '/impressum', name: 'Impressum' },
  { path: '/datenschutz', name: 'Datenschutz' }
];

let supabase = null;

async function getSEOMetaTags(pagePath) {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('seo_meta_tags')
      .select('*')
      .eq('page_path', pagePath)
      .eq('language', 'de')
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.warn(`No SEO data for ${pagePath}:`, error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.warn(`Error loading SEO data for ${pagePath}:`, err.message);
    return null;
  }
}

async function getSchemaMarkup(pagePath) {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('seo_schema_markup')
      .select('schema_json')
      .eq('page_path', pagePath)
      .eq('is_active', true);

    if (error || !data || data.length === 0) {
      return null;
    }

    return data;
  } catch (err) {
    console.warn(`Error loading schema for ${pagePath}:`, err.message);
    return null;
  }
}

function generateSEOMetaTags(seoData, route) {
  if (!seoData) return '';

  const baseUrl = 'https://www.anatolymook.de';
  const fullUrl = `${baseUrl}${route.path === '/' ? '' : route.path}`;
  const ogImage = seoData.og_image || `${baseUrl}/anatoly-mok-hero.png`;

  return `
    <!-- SEO Meta Tags (Database-Driven) -->
    <title>${seoData.title}</title>
    <meta name="title" content="${seoData.title}" />
    <meta name="description" content="${seoData.description}" />
    ${seoData.keywords && seoData.keywords.length > 0 ? `<meta name="keywords" content="${seoData.keywords.join(', ')}" />` : ''}

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:title" content="${seoData.og_title || seoData.title}" />
    <meta property="og:description" content="${seoData.og_description || seoData.description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:secure_url" content="${ogImage}" />
    <meta property="og:site_name" content="Anatoly Mook" />

    <!-- Twitter -->
    <meta name="twitter:card" content="${seoData.twitter_card || 'summary_large_image'}" />
    <meta name="twitter:url" content="${fullUrl}" />
    <meta name="twitter:title" content="${seoData.og_title || seoData.title}" />
    <meta name="twitter:description" content="${seoData.og_description || seoData.description}" />
    <meta name="twitter:image" content="${ogImage}" />

    <!-- Canonical -->
    <link rel="canonical" href="${seoData.canonical_url || fullUrl}" />
  `;
}

function generateSchemaMarkup(schemas) {
  if (!schemas || schemas.length === 0) return '';

  const schemaScripts = schemas.map(s => `
    <script type="application/ld+json">
    ${JSON.stringify(s.schema_json, null, 2)}
    </script>
  `).join('\n');

  return `
    <!-- Schema.org Structured Data (Database-Driven) -->
    ${schemaScripts}
  `;
}


export default function prerenderPlugin(env = {}) {
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized for SEO pre-rendering');
  } else {
    console.warn('⚠️  Supabase credentials missing - SEO data will not be loaded');
  }

  return {
    name: 'vite-plugin-prerender',

    closeBundle: async () => {
      const distPath = path.resolve(process.cwd(), 'dist');
      const indexPath = path.join(distPath, 'index.html');

      if (!fs.existsSync(indexPath)) {
        console.log('⚠️ index.html not found in dist, skipping prerender');
        return;
      }

      console.log('🔧 Starting High-End SEO pre-rendering with database integration...\n');

      const baseHtml = fs.readFileSync(indexPath, 'utf-8');

      for (const route of routes) {
        const routePath = route.path === '/' ? indexPath : path.join(distPath, route.path, 'index.html');

        if (route.path !== '/') {
          const routeDir = path.join(distPath, route.path);
          fs.mkdirSync(routeDir, { recursive: true });
        }

        let enhancedHtml = baseHtml;

        try {
          const seoData = await getSEOMetaTags(route.path);
          const schemaData = await getSchemaMarkup(route.path);

          if (seoData) {
            const seoMetaTags = generateSEOMetaTags(seoData, route);
            enhancedHtml = enhancedHtml.replace(
              /<title>.*?<\/title>/s,
              seoMetaTags
            );

            console.log(`✅ SEO: ${route.path} (${seoData.title})`);
          } else {
            console.log(`⚠️  No SEO data: ${route.path}`);
          }

          if (schemaData && schemaData.length > 0) {
            const schemaMarkup = generateSchemaMarkup(schemaData);
            enhancedHtml = enhancedHtml.replace('</head>', `${schemaMarkup}</head>`);
            console.log(`   📋 Schema: ${schemaData.length} type(s)`);
          }

        } catch (error) {
          console.error(`❌ Error processing ${route.path}:`, error.message);
        }

        enhancedHtml = enhancedHtml.replace(/https:\/\/anatolymook\.de/g, 'https://www.anatolymook.de');

        fs.writeFileSync(routePath, enhancedHtml, 'utf-8');
      }

      console.log(`\n🎉 High-End SEO pre-rendering complete!`);
      console.log(`📊 Generated ${routes.length} routes with database-driven SEO`);
      console.log(`🔗 All URLs updated to www.anatolymook.de\n`);
    }
  };
}
