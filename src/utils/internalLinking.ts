export interface InternalLink {
  url: string;
  text: string;
  rel?: string;
  title?: string;
}

export interface LinkGroup {
  title: string;
  links: InternalLink[];
}

const routes = [
  { path: '/', name: 'Home', keywords: ['Startseite', 'Home', 'Hauptseite', 'Willkommen', 'Anatoly Mook', 'Bewusstsein', 'Klarheit', 'Meisterschaft'] },
  {
    path: '/die-arbeit',
    name: 'Orientierung',
    keywords: [
      'Orientierung',
      'Klarheit',
      'Führung',
      'Begleitung',
      'Verantwortung',
      'Über Anatoly',
      'Über mich',
      'Profil',
      'Biographie',
      'Zielgruppen',
      'Methodik',
      'Lebensbereiche',
      'Ressourcen',
      'Haltung',
      'Umsetzung'
    ]
  },
  { path: '/seminare', name: 'Seminare', keywords: ['Seminare', 'Workshops', 'Kurse', 'Trainings', 'Intensiv-Seminare', 'Bewusstseins-Seminare', 'Transformations-Seminare', 'Entwicklungs-Seminare'] },
  { path: '/coaching', name: 'Coaching', keywords: ['Coaching', 'Mentoring', '1:1 Coaching', 'Persönliches Coaching', 'Executive Coaching', 'Transformations-Coaching', 'Bewusstseins-Coaching', 'Führungskräfte-Coaching'] },
  { path: '/keynotes', name: 'Keynotes', keywords: ['Keynotes', 'Vorträge', 'Speaker', 'Präsentationen', 'Impulsvorträge', 'Rednerdienste', 'Inspirations-Vorträge', 'Motivations-Reden'] },
  { path: '/events', name: 'Events', keywords: ['Events', 'Termine', 'Veranstaltungen', 'Kalender', 'Aktuelle Events', 'Kommende Termine', 'Veranstaltungskalender', 'Event-Übersicht'] },
  { path: '/corporate', name: 'Corporate', keywords: ['Corporate', 'Geschäftskunden', 'Unternehmen', 'B2B', 'Firmen', 'Organisationen', 'Führungskräfte-Entwicklung', 'Team-Coaching'] },
  { path: '/bewusstsein', name: 'Neues Bewusstsein', keywords: ['Neues Bewusstsein', 'Bewusstsein', 'Selbstführung', 'Angsttransparenz', 'Meisterschaft', 'Paradigma', 'Bewusstsein ist kein Konzept'] },
  { path: '/blog', name: 'Blog', keywords: ['Blog', 'Artikel', 'Insights', 'Wissen', 'Beiträge', 'Perspektiven', 'Gedanken', 'Reflexionen'] },
  { path: '/produkte', name: 'Produkte', keywords: ['Produkte', 'Shop', 'Angebote', 'Leistungen', 'Digitale Produkte', 'Online-Kurse', 'E-Learning', 'Downloads'] },
  { path: '/faq', name: 'FAQ', keywords: ['FAQ', 'Fragen', 'Hilfe', 'Support', 'Häufige Fragen', 'Antworten', 'Unterstützung', 'Assistance'] },
  { path: '/kontakt', name: 'Kontakt', keywords: ['Kontakt', 'Anfrage', 'Erreichbarkeit', 'Nachricht', 'Kontaktformular', 'E-Mail', 'Kommunikation', 'Beratung'] },
  { path: '/booking', name: 'Termin buchen', keywords: ['Termin buchen', 'Booking', 'Terminvereinbarung', 'Buchen', 'Online-Buchung', 'Termin-Tool', 'Kalender-Buchung', 'Erstgespräch'] },
  { path: '/quiz', name: 'Bewusstseins-Quiz', keywords: ['Quiz', 'Test', 'Selbsteinschätzung', 'Assessment', 'Bewusstseins-Test', 'Evaluierung', 'Analyse', 'Standortbestimmung'] },
  { path: '/impressum', name: 'Impressum', keywords: ['Impressum', 'Rechtliches', 'Anbieterkennzeichnung', 'Legal', 'TMG', 'Angaben', 'Verantwortlich', 'Gesetzlich'] },
  { path: '/datenschutz', name: 'Datenschutz', keywords: ['Datenschutz', 'Privacy', 'DSGVO', 'Datenschutzerklärung', 'Datensicherheit', 'Privatsphäre', 'Datennutzung', 'Cookie-Policy'] }
];

export function generateMassiveInternalLinks(currentPath: string = '/'): InternalLink[] {
  const links: InternalLink[] = [];
  const baseUrl = 'https://www.anatoly-mook.de';

  routes.forEach(route => {
    if (route.path === currentPath) return;

    route.keywords.forEach((keyword, idx) => {
      links.push({
        url: `${baseUrl}${route.path}`,
        text: keyword,
        title: `${keyword} - Anatoly Mook`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `${keyword} entdecken`,
        title: `Jetzt ${keyword} entdecken`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `Mehr über ${keyword}`,
        title: `${keyword} erfahren`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `${keyword} erkunden`,
        title: `${keyword} erforschen`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `Zu ${keyword}`,
        title: `Weiter zu ${keyword}`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `${keyword} anzeigen`,
        title: `${keyword} öffnen`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `${keyword} Informationen`,
        title: `Infos zu ${keyword}`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `${keyword} Details`,
        title: `Details über ${keyword}`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `${keyword} Übersicht`,
        title: `Übersicht ${keyword}`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `Alles über ${keyword}`,
        title: `Umfassende Infos zu ${keyword}`
      });

      if (idx === 0) {
        links.push({
          url: `${baseUrl}${route.path}`,
          text: `Weiter zu ${route.name}`,
          title: `${route.name} besuchen`
        });

        links.push({
          url: `${baseUrl}${route.path}`,
          text: `${route.name} ansehen`,
          title: `${route.name} betrachten`
        });

        links.push({
          url: `${baseUrl}${route.path}`,
          text: `${route.name} durchstöbern`,
          title: `${route.name} durchsuchen`
        });

        links.push({
          url: `${baseUrl}${route.path}`,
          text: `${route.name} kennenlernen`,
          title: `${route.name} kennenlernen`
        });

        links.push({
          url: `${baseUrl}${route.path}`,
          text: `${route.name} verstehen`,
          title: `${route.name} begreifen`
        });
      }
    });
  });

  return links;
}

export function generateNavigationLinks(): LinkGroup {
  const baseUrl = 'https://www.anatoly-mook.de';
  const links: InternalLink[] = [];

  routes.forEach(route => {
    links.push({
      url: `${baseUrl}${route.path}`,
      text: route.name,
      title: `${route.name} - Anatoly Mook`
    });

    links.push({
      url: `${baseUrl}${route.path}`,
      text: `Navigation zu ${route.name}`,
      title: `Navigiere zu ${route.name}`
    });

    links.push({
      url: `${baseUrl}${route.path}`,
      text: `Menü ${route.name}`,
      title: `${route.name} im Menü`
    });
  });

  return {
    title: 'Hauptnavigation',
    links
  };
}

export function generateFooterLinks(): LinkGroup[] {
  const baseUrl = 'https://www.anatoly-mook.de';

  return [
    {
      title: 'Angebote',
      links: [
        { url: `${baseUrl}/seminare`, text: 'Seminare & Workshops', title: 'Seminare buchen' },
        { url: `${baseUrl}/coaching`, text: '1:1 Coaching', title: 'Coaching anfragen' },
        { url: `${baseUrl}/keynotes`, text: 'Keynote-Vorträge', title: 'Keynotes buchen' },
        { url: `${baseUrl}/corporate`, text: 'Corporate-Programme', title: 'Für Unternehmen' },
        { url: `${baseUrl}/produkte`, text: 'Digitale Produkte', title: 'Shop ansehen' },
        { url: `${baseUrl}/seminare`, text: 'Intensiv-Seminare', title: 'Seminare entdecken' },
        { url: `${baseUrl}/coaching`, text: 'Executive Coaching', title: 'Führungskräfte-Coaching' },
        { url: `${baseUrl}/keynotes`, text: 'Impulsvorträge', title: 'Vorträge anfragen' },
        { url: `${baseUrl}/corporate`, text: 'Team-Coaching', title: 'Team-Entwicklung' },
        { url: `${baseUrl}/seminare`, text: 'Bewusstseins-Seminare', title: 'Bewusstseinsentwicklung' },
        { url: `${baseUrl}/coaching`, text: 'Transformations-Coaching', title: 'Transformation begleiten' },
        { url: `${baseUrl}/produkte`, text: 'Online-Kurse', title: 'Kurse ansehen' },
        { url: `${baseUrl}/seminare`, text: 'Workshops', title: 'Workshop-Angebote' },
        { url: `${baseUrl}/corporate`, text: 'Führungskräfte-Entwicklung', title: 'Leadership-Programme' },
        { url: `${baseUrl}/coaching`, text: 'Mentoring', title: 'Persönliches Mentoring' },
        { url: `${baseUrl}/keynotes`, text: 'Speaker', title: 'Speaker buchen' },
        { url: `${baseUrl}/seminare`, text: 'Transformations-Seminare', title: 'Veränderung gestalten' },
        { url: `${baseUrl}/coaching`, text: 'Bewusstseins-Coaching', title: 'Bewusstsein entwickeln' },
        { url: `${baseUrl}/corporate`, text: 'Organisationsentwicklung', title: 'Organisation transformieren' },
        { url: `${baseUrl}/produkte`, text: 'E-Learning', title: 'Online lernen' }
      ]
    },
    {
      title: 'Inhalte',
      links: [
        { url: `${baseUrl}/blog`, text: 'Blog & Artikel', title: 'Blog lesen' },
        { url: `${baseUrl}/die-arbeit`, text: 'Ressourcen', title: 'Downloads' },
        { url: `${baseUrl}/faq`, text: 'Häufige Fragen', title: 'FAQ durchsuchen' },
        { url: `${baseUrl}/quiz`, text: 'Bewusstseins-Quiz', title: 'Quiz starten' },
        { url: `${baseUrl}/die-arbeit`, text: 'Transformations-Weg', title: 'Transformation verstehen' },
        { url: `${baseUrl}/events`, text: 'Aktuelle Events', title: 'Events ansehen' },
        { url: `${baseUrl}/blog`, text: 'Insights & Perspektiven', title: 'Artikel entdecken' },
        { url: `${baseUrl}/die-arbeit`, text: 'Tools & Materialien', title: 'Ressourcen herunterladen' },
        { url: `${baseUrl}/blog`, text: 'Beiträge', title: 'Beiträge lesen' },
        { url: `${baseUrl}/die-arbeit`, text: 'Transformations-Prozess', title: 'Prozess verstehen' },
        { url: `${baseUrl}/quiz`, text: 'Selbsteinschätzung', title: 'Selbst einschätzen' },
        { url: `${baseUrl}/events`, text: 'Veranstaltungen', title: 'Veranstaltungskalender' },
        { url: `${baseUrl}/blog`, text: 'Wissen', title: 'Wissensartikel' },
        { url: `${baseUrl}/die-arbeit`, text: 'Downloads', title: 'Dateien herunterladen' },
        { url: `${baseUrl}/faq`, text: 'Antworten', title: 'Antworten finden' },
        { url: `${baseUrl}/die-arbeit`, text: 'Entwicklung', title: 'Entwicklungsweg' },
        { url: `${baseUrl}/quiz`, text: 'Test', title: 'Test durchführen' },
        { url: `${baseUrl}/events`, text: 'Termine', title: 'Termine finden' },
        { url: `${baseUrl}/blog`, text: 'Reflexionen', title: 'Reflexionen lesen' },
        { url: `${baseUrl}/die-arbeit`, text: 'Guides', title: 'Anleitungen lesen' }
      ]
    },
    {
      title: 'Über Anatoly Mook',
      links: [
        { url: `${baseUrl}/die-arbeit`, text: 'Über mich', title: 'Mehr erfahren' },
        { url: `${baseUrl}/die-arbeit`, text: 'Mein Ansatz', title: 'Philosophie' },
        { url: `${baseUrl}/die-arbeit`, text: 'Hintergrund', title: 'Biographie' },
        { url: `${baseUrl}/kontakt`, text: 'Kontakt aufnehmen', title: 'Nachricht senden' },
        { url: `${baseUrl}/booking`, text: 'Termin vereinbaren', title: 'Jetzt buchen' },
        { url: `${baseUrl}/die-arbeit`, text: 'Meine Geschichte', title: 'Werdegang' },
        { url: `${baseUrl}/die-arbeit`, text: 'Expertise', title: 'Kompetenzen' },
        { url: `${baseUrl}/kontakt`, text: 'Anfrage stellen', title: 'Kontakt' },
        { url: `${baseUrl}/die-arbeit`, text: 'Profil', title: 'Persönliches Profil' },
        { url: `${baseUrl}/die-arbeit`, text: 'Philosophie', title: 'Meine Philosophie' },
        { url: `${baseUrl}/kontakt`, text: 'Beratung', title: 'Beratungsgespräch' },
        { url: `${baseUrl}/booking`, text: 'Erstgespräch', title: 'Kennenlern-Termin' },
        { url: `${baseUrl}/die-arbeit`, text: 'Werdegang', title: 'Beruflicher Weg' },
        { url: `${baseUrl}/die-arbeit`, text: 'Vision', title: 'Meine Vision' },
        { url: `${baseUrl}/kontakt`, text: 'Kontaktmöglichkeiten', title: 'Wege zum Kontakt' },
        { url: `${baseUrl}/booking`, text: 'Online-Buchung', title: 'Termin online buchen' },
        { url: `${baseUrl}/die-arbeit`, text: 'Werte', title: 'Meine Werte' },
        { url: `${baseUrl}/die-arbeit`, text: 'Mission', title: 'Meine Mission' },
        { url: `${baseUrl}/kontakt`, text: 'Erreichbarkeit', title: 'Wie Sie mich erreichen' },
        { url: `${baseUrl}/booking`, text: 'Kalenderbuchung', title: 'Im Kalender buchen' }
      ]
    },
    {
      title: 'Service',
      links: [
        { url: `${baseUrl}/kontakt`, text: 'Kontakt', title: 'Kontaktformular' },
        { url: `${baseUrl}/booking`, text: 'Termin buchen', title: 'Online-Buchung' },
        { url: `${baseUrl}/faq`, text: 'FAQ', title: 'Antworten finden' },
        { url: `${baseUrl}/impressum`, text: 'Impressum', title: 'Rechtliches' },
        { url: `${baseUrl}/datenschutz`, text: 'Datenschutz', title: 'DSGVO' },
        { url: `${baseUrl}/kontakt`, text: 'Beratung', title: 'Beratungsgespräch' },
        { url: `${baseUrl}/booking`, text: 'Erstgespräch', title: 'Kennenlern-Termin' },
        { url: `${baseUrl}/faq`, text: 'Hilfe & Support', title: 'Unterstützung' },
        { url: `${baseUrl}/kontakt`, text: 'Anfrage', title: 'Anfrage senden' },
        { url: `${baseUrl}/booking`, text: 'Terminvereinbarung', title: 'Termin vereinbaren' },
        { url: `${baseUrl}/faq`, text: 'Fragen & Antworten', title: 'Häufige Fragen' },
        { url: `${baseUrl}/impressum`, text: 'Legal', title: 'Rechtliche Hinweise' },
        { url: `${baseUrl}/datenschutz`, text: 'Privacy', title: 'Datenschutzhinweise' },
        { url: `${baseUrl}/kontakt`, text: 'E-Mail', title: 'Per E-Mail kontaktieren' },
        { url: `${baseUrl}/booking`, text: 'Buchungskalender', title: 'Kalender öffnen' },
        { url: `${baseUrl}/faq`, text: 'Unterstützung', title: 'Support erhalten' },
        { url: `${baseUrl}/impressum`, text: 'Anbieterkennzeichnung', title: 'Anbieter-Informationen' },
        { url: `${baseUrl}/datenschutz`, text: 'Datennutzung', title: 'Wie Daten genutzt werden' },
        { url: `${baseUrl}/kontakt`, text: 'Nachricht senden', title: 'Nachricht schreiben' },
        { url: `${baseUrl}/booking`, text: 'Termin-Tool', title: 'Buchungstool verwenden' }
      ]
    }
  ];
}

export function generateBreadcrumbs(currentPath: string): InternalLink[] {
  const baseUrl = 'https://www.anatoly-mook.de';
  const breadcrumbs: InternalLink[] = [
    { url: baseUrl, text: 'Home', title: 'Zur Startseite' },
    { url: baseUrl, text: 'Startseite', title: 'Zurück zur Hauptseite' },
    { url: baseUrl, text: 'Hauptseite', title: 'Zur Homepage' }
  ];

  const currentRoute = routes.find(r => r.path === currentPath);
  if (currentRoute && currentRoute.path !== '/') {
    breadcrumbs.push({
      url: `${baseUrl}${currentRoute.path}`,
      text: currentRoute.name,
      title: currentRoute.name
    });

    breadcrumbs.push({
      url: `${baseUrl}${currentRoute.path}`,
      text: `Aktuelle Seite: ${currentRoute.name}`,
      title: `Sie sind hier: ${currentRoute.name}`
    });
  }

  return breadcrumbs;
}

export function generateRelatedLinks(currentPath: string): LinkGroup {
  const baseUrl = 'https://www.anatoly-mook.de';
  const relatedMap: Record<string, string[]> = {
    '/': ['/die-arbeit', '/seminare', '/coaching', '/events', '/blog', '/produkte', '/keynotes', '/corporate'],
    '/die-arbeit': ['/', '/coaching', '/kontakt', '/booking', '/seminare', '/keynotes', '/blog', '/corporate', '/quiz'],
    '/seminare': ['/coaching', '/events', '/booking', '/die-arbeit', '/produkte', '/keynotes', '/corporate', '/blog'],
    '/coaching': ['/seminare', '/die-arbeit', '/booking', '/corporate', '/keynotes', '/events', '/produkte', '/blog'],
    '/keynotes': ['/events', '/corporate', '/booking', '/die-arbeit', '/seminare', '/coaching', '/blog', '/produkte'],
    '/events': ['/seminare', '/keynotes', '/booking', '/blog', '/', '/coaching', '/die-arbeit', '/corporate', '/produkte'],
    '/corporate': ['/coaching', '/keynotes', '/seminare', '/booking', '/die-arbeit', '/events', '/produkte', '/blog'],
    '/blog': ['/die-arbeit', '/seminare', '/coaching', '/events', '/produkte', '/quiz', '/keynotes', '/corporate'],
    '/produkte': ['/seminare', '/die-arbeit', '/booking', '/coaching', '/events', '/blog', '/keynotes', '/corporate'],
    '/faq': ['/kontakt', '/booking', '/die-arbeit', '/', '/seminare', '/coaching', '/blog', '/produkte'],
    '/kontakt': ['/booking', '/die-arbeit', '/faq', '/corporate', '/coaching', '/seminare', '/keynotes', '/events', '/'],
    '/booking': ['/kontakt', '/coaching', '/seminare', '/events', '/corporate', '/keynotes', '/die-arbeit', '/produkte', '/faq'],
    '/quiz': ['/die-arbeit', '/seminare', '/coaching', '/blog', '/events', '/produkte', '/booking', '/keynotes'],
    '/bewusstsein': ['/', '/die-arbeit', '/seminare', '/coaching', '/blog']
  };

  const relatedPaths = relatedMap[currentPath] || [];
  const links: InternalLink[] = [];

  relatedPaths.forEach(path => {
    const route = routes.find(r => r.path === path);
    if (route) {
      links.push({
        url: `${baseUrl}${route.path}`,
        text: route.name,
        title: `${route.name} ansehen`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `Verwandt: ${route.name}`,
        title: `Ähnlich: ${route.name}`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `Siehe auch ${route.name}`,
        title: `Ebenfalls interessant: ${route.name}`
      });

      links.push({
        url: `${baseUrl}${route.path}`,
        text: `Passend dazu: ${route.name}`,
        title: `Passt zu: ${route.name}`
      });
    }
  });

  return {
    title: 'Verwandte Seiten',
    links
  };
}

export function generateContextualLinks(): LinkGroup[] {
  const baseUrl = 'https://www.anatoly-mook.de';

  return [
    {
      title: 'Bewusstseinsentwicklung',
      links: [
        { url: `${baseUrl}/seminare`, text: 'Bewusstseins-Seminare', title: 'Seminare zur Bewusstseinsentwicklung' },
        { url: `${baseUrl}/coaching`, text: 'Bewusstseins-Coaching', title: 'Coaching für mehr Bewusstsein' },
        { url: `${baseUrl}/die-arbeit`, text: 'Bewusstseins-Transformation', title: 'Transformations-Prozess' },
        { url: `${baseUrl}/quiz`, text: 'Bewusstseins-Test', title: 'Bewusstseinsstand ermitteln' },
        { url: `${baseUrl}/blog`, text: 'Bewusstseins-Artikel', title: 'Artikel über Bewusstsein' },
        { url: `${baseUrl}/die-arbeit`, text: 'Bewusstseins-Ressourcen', title: 'Materialien zur Bewusstseinsentwicklung' },
        { url: `${baseUrl}/seminare`, text: 'Bewusstsein erweitern', title: 'Bewusstsein durch Seminare erweitern' },
        { url: `${baseUrl}/coaching`, text: 'Bewusstes Leben', title: 'Bewusst leben lernen' },
        { url: `${baseUrl}/die-arbeit`, text: 'Bewusstseins-Wachstum', title: 'Bewusstsein wachsen lassen' },
        { url: `${baseUrl}/quiz`, text: 'Bewusstseins-Analyse', title: 'Bewusstsein analysieren' }
      ]
    },
    {
      title: 'Persönliche Meisterschaft',
      links: [
        { url: `${baseUrl}/die-arbeit`, text: 'Weg zur Meisterschaft', title: 'Meisterschaft entwickeln' },
        { url: `${baseUrl}/coaching`, text: 'Meisterschafts-Coaching', title: 'Coaching für Meisterschaft' },
        { url: `${baseUrl}/seminare`, text: 'Meisterschafts-Seminare', title: 'Seminare für Meisterschaft' },
        { url: `${baseUrl}/die-arbeit`, text: 'Meisterschafts-Tools', title: 'Tools und Ressourcen' },
        { url: `${baseUrl}/blog`, text: 'Meisterschafts-Insights', title: 'Artikel über Meisterschaft' },
        { url: `${baseUrl}/produkte`, text: 'Meisterschafts-Programme', title: 'Programme zur Meisterschaft' },
        { url: `${baseUrl}/die-arbeit`, text: 'Persönliche Exzellenz', title: 'Exzellenz erreichen' },
        { url: `${baseUrl}/coaching`, text: 'Meisterschafts-Mentoring', title: 'Mentoring für Meisterschaft' },
        { url: `${baseUrl}/seminare`, text: 'Meisterschafts-Workshops', title: 'Workshops zur Meisterschaft' },
        { url: `${baseUrl}/die-arbeit`, text: 'Meisterschafts-Guides', title: 'Anleitungen zur Meisterschaft' }
      ]
    },
    {
      title: 'Führung & Leadership',
      links: [
        { url: `${baseUrl}/corporate`, text: 'Führungskräfte-Programme', title: 'Programme für Führungskräfte' },
        { url: `${baseUrl}/coaching`, text: 'Executive Coaching', title: 'Coaching für Führungskräfte' },
        { url: `${baseUrl}/keynotes`, text: 'Leadership-Keynotes', title: 'Vorträge über Führung' },
        { url: `${baseUrl}/seminare`, text: 'Führungs-Seminare', title: 'Seminare für Führungskräfte' },
        { url: `${baseUrl}/blog`, text: 'Leadership-Artikel', title: 'Artikel über Führung' },
        { url: `${baseUrl}/corporate`, text: 'Bewusste Führung', title: 'Bewusst führen lernen' },
        { url: `${baseUrl}/coaching`, text: 'Leadership-Coaching', title: 'Führungs-Coaching' },
        { url: `${baseUrl}/keynotes`, text: 'Führungs-Vorträge', title: 'Vorträge für Führungskräfte' },
        { url: `${baseUrl}/seminare`, text: 'Leadership-Trainings', title: 'Trainings für Führungskräfte' },
        { url: `${baseUrl}/blog`, text: 'Führungs-Insights', title: 'Insights über Führung' }
      ]
    },
    {
      title: 'Transformation & Veränderung',
      links: [
        { url: `${baseUrl}/die-arbeit`, text: 'Transformations-Prozess', title: 'Transformation verstehen' },
        { url: `${baseUrl}/coaching`, text: 'Transformations-Coaching', title: 'Coaching für Transformation' },
        { url: `${baseUrl}/seminare`, text: 'Transformations-Seminare', title: 'Seminare für Veränderung' },
        { url: `${baseUrl}/blog`, text: 'Transformations-Insights', title: 'Artikel über Transformation' },
        { url: `${baseUrl}/die-arbeit`, text: 'Transformations-Ressourcen', title: 'Tools für Veränderung' },
        { url: `${baseUrl}/die-arbeit`, text: 'Persönliche Transformation', title: 'Sich selbst transformieren' },
        { url: `${baseUrl}/coaching`, text: 'Transformations-Mentoring', title: 'Mentoring für Veränderung' },
        { url: `${baseUrl}/seminare`, text: 'Transformations-Workshops', title: 'Workshops für Wandel' },
        { url: `${baseUrl}/blog`, text: 'Transformations-Artikel', title: 'Artikel über Veränderung' },
        { url: `${baseUrl}/die-arbeit`, text: 'Transformations-Tools', title: 'Werkzeuge für Transformation' }
      ]
    },
    {
      title: 'Klarheit & Entscheidungsstärke',
      links: [
        { url: `${baseUrl}/coaching`, text: 'Klarheits-Coaching', title: 'Coaching für Klarheit' },
        { url: `${baseUrl}/seminare`, text: 'Klarheits-Seminare', title: 'Seminare für Klarheit' },
        { url: `${baseUrl}/die-arbeit`, text: 'Klarheits-Prozess', title: 'Klarheit finden' },
        { url: `${baseUrl}/blog`, text: 'Klarheits-Artikel', title: 'Artikel über Klarheit' },
        { url: `${baseUrl}/die-arbeit`, text: 'Klarheits-Tools', title: 'Tools für Klarheit' },
        { url: `${baseUrl}/coaching`, text: 'Entscheidungs-Coaching', title: 'Coaching für Entscheidungen' },
        { url: `${baseUrl}/seminare`, text: 'Entscheidungs-Seminare', title: 'Seminare für Entscheidungsstärke' },
        { url: `${baseUrl}/die-arbeit`, text: 'Entscheidungs-Kompetenz', title: 'Entscheidungen treffen lernen' },
        { url: `${baseUrl}/blog`, text: 'Entscheidungs-Insights', title: 'Insights über Entscheidungen' },
        { url: `${baseUrl}/die-arbeit`, text: 'Entscheidungs-Guides', title: 'Guides für Entscheidungen' }
      ]
    }
  ];
}

export function generateSitemapLinks(): LinkGroup {
  const baseUrl = 'https://www.anatoly-mook.de';
  const links: InternalLink[] = [];

  routes.forEach(route => {
    links.push({
      url: `${baseUrl}${route.path}`,
      text: route.name,
      title: `${route.name} - Anatoly Mook`
    });

    links.push({
      url: `${baseUrl}${route.path}`,
      text: `Sitemap: ${route.name}`,
      title: `${route.name} in Sitemap`
    });

    links.push({
      url: `${baseUrl}${route.path}`,
      text: `Übersicht ${route.name}`,
      title: `${route.name} Übersicht`
    });
  });

  return {
    title: 'Vollständige Sitemap',
    links
  };
}

export function generateAllInternalLinks(currentPath: string = '/'): {
  navigation: LinkGroup;
  footer: LinkGroup[];
  breadcrumbs: InternalLink[];
  related: LinkGroup;
  contextual: LinkGroup[];
  sitemap: LinkGroup;
  massive: InternalLink[];
  all: InternalLink[];
  total: number;
} {
  const navigation = generateNavigationLinks();
  const footer = generateFooterLinks();
  const breadcrumbs = generateBreadcrumbs(currentPath);
  const related = generateRelatedLinks(currentPath);
  const contextual = generateContextualLinks();
  const sitemap = generateSitemapLinks();
  const massive = generateMassiveInternalLinks(currentPath);

  const allLinks: InternalLink[] = [
    ...navigation.links,
    ...footer.flatMap(group => group.links),
    ...breadcrumbs,
    ...related.links,
    ...contextual.flatMap(group => group.links),
    ...sitemap.links,
    ...massive
  ];

  return {
    navigation,
    footer,
    breadcrumbs,
    related,
    contextual,
    sitemap,
    massive,
    all: allLinks,
    total: allLinks.length
  };
}
