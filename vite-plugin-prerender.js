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

export default function prerenderPlugin() {
  return {
    name: 'vite-plugin-prerender-seo',
    closeBundle: async () => {
      const distPath = path.resolve(process.cwd(), 'dist');
      const indexPath = path.join(distPath, 'index.html');

      if (!fs.existsSync(indexPath)) {
        console.log('index.html not found in dist, skipping prerender');
        return;
      }

      console.log('\n🔧 SEO pre-rendering started...\n');

      // Load link fragment generated by pre-build script
      const fragmentPath = path.join(distPath, '_seo-links-fragment.html');
      let linkFragment = '';
      if (fs.existsSync(fragmentPath)) {
        linkFragment = fs.readFileSync(fragmentPath, 'utf-8');
        fs.unlinkSync(fragmentPath);
        console.log('  Loaded internal link fragment for injection');
      }

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

        if (linkFragment) {
          html = html.replace('</body>', `${linkFragment}\n</body>`);
        }

        fs.writeFileSync(routePath, html, 'utf-8');
        count++;
      }
      console.log(`✅ Pre-rendered ${count} routes with SEO meta + internal links\n`);
    }
  };
}
