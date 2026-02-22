export interface SectionSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  schemaType: 'WebPage' | 'Article' | 'Course' | 'Event' | 'FAQPage' | 'Product' | 'Service';
}

export const sectionSEOConfig: Record<string, SectionSEO> = {
  home: {
    title: 'Anatoly Mook – Klarheit, bewusste Führung & persönliche Meisterschaft',
    description: 'Anatoly Mook steht für Klarheit statt Suche. Bewusstseinsarbeit, Coaching und Formate für Menschen, die Verantwortung übernehmen und ihr Leben konsequent gestalten wollen – klar, präzise, wirksam.',
    keywords: ['Anatoly Mook', 'Bewusstsein', 'Klarheit', 'bewusste Führung', 'persönliche Meisterschaft', 'Transformation', 'Coaching', 'Seminare', 'Mentoring'],
    ogImage: 'https://anatolymook.de/bildschirmfoto_2025-12-10_um_20.44.33.png',
    schemaType: 'WebPage'
  },
  about: {
    title: 'Über Anatoly Mook – Mentor für Bewusstsein & persönliche Meisterschaft',
    description: 'Erfahren Sie mehr über Anatoly Mook, seinen Ansatz für Bewusstseinsarbeit und wie er Menschen auf ihrem Weg zu Klarheit, Entscheidungsstärke und persönlicher Meisterschaft begleitet.',
    keywords: ['Anatoly Mook', 'Über mich', 'Mentor', 'Bewusstsein', 'Persönlichkeitsentwicklung', 'Lebensgeschichte'],
    schemaType: 'WebPage'
  },
  seminare: {
    title: 'Seminare & Workshops – Bewusstseinsentwicklung mit Anatoly Mook',
    description: 'Intensive Seminare und Workshops für Bewusstseinsentwicklung, persönliche Transformation und bewusste Lebensführung. Kompakte Formate für nachhaltige Veränderung.',
    keywords: ['Seminare', 'Workshops', 'Bewusstseinsentwicklung', 'Transformation', 'Persönlichkeitsentwicklung', 'Intensiv-Seminare'],
    schemaType: 'Course'
  },
  coaching: {
    title: '1:1 Coaching & Mentoring – Individuelle Begleitung von Anatoly Mook',
    description: 'Individuelles 1:1 Coaching und Mentoring für Führungskräfte, Unternehmer und Menschen, die ihre persönliche Meisterschaft entwickeln und bewusste Entscheidungen treffen wollen.',
    keywords: ['Coaching', 'Mentoring', '1:1 Coaching', 'Executive Coaching', 'Führungskräfte-Coaching', 'Persönliches Coaching'],
    schemaType: 'Service'
  },
  keynotes: {
    title: 'Keynotes & Vorträge – Inspirierende Impulse von Anatoly Mook',
    description: 'Keynote-Vorträge und inspirierende Impulse für Unternehmen, Konferenzen und Events. Themen: Bewusstsein, Führung, Transformation und persönliche Meisterschaft.',
    keywords: ['Keynote', 'Vorträge', 'Speaker', 'Redner', 'Impulsvortrag', 'Firmenevents'],
    schemaType: 'Event'
  },
  events: {
    title: 'Events & Termine – Aktuelle Veranstaltungen mit Anatoly Mook',
    description: 'Aktuelle Events, Termine und Veranstaltungen mit Anatoly Mook. Seminare, Workshops, Keynotes und besondere Formate für persönliche Transformation.',
    keywords: ['Events', 'Termine', 'Veranstaltungen', 'Seminare', 'Workshops', 'Kalender'],
    schemaType: 'Event'
  },
  corporate: {
    title: 'Corporate Coaching – Bewusste Führung für Unternehmen',
    description: 'Maßgeschneiderte Corporate-Programme für Unternehmen: Führungskräfte-Entwicklung, Team-Coaching, Organisationsentwicklung und bewusste Unternehmenskultur.',
    keywords: ['Corporate', 'Geschäftskunden', 'Führungskräfte-Entwicklung', 'Team-Coaching', 'Organisationsentwicklung', 'Unternehmensberatung'],
    schemaType: 'Service'
  },
  transformation: {
    title: 'Transformation – Der Weg zur persönlichen Meisterschaft',
    description: 'Verstehen Sie den Transformationsprozess und wie Sie Ihre persönliche Meisterschaft entwickeln. Von Klarheit über Bewusstsein zur konsequenten Lebensgestaltung.',
    keywords: ['Transformation', 'Persönliche Meisterschaft', 'Bewusstseinsentwicklung', 'Veränderung', 'Wachstum'],
    schemaType: 'WebPage'
  },
  blog: {
    title: 'Blog – Artikel zu Bewusstsein, Klarheit & persönlicher Meisterschaft',
    description: 'Aktuelle Artikel, Insights und Perspektiven zu Bewusstseinsarbeit, Klarheit, bewusster Führung und persönlicher Meisterschaft von Anatoly Mook.',
    keywords: ['Blog', 'Artikel', 'Insights', 'Bewusstsein', 'Klarheit', 'Persönliche Meisterschaft'],
    schemaType: 'Article'
  },
  produkte: {
    title: 'Produkte & Angebote – Tools für Ihre Bewusstseinsentwicklung',
    description: 'Digitale Produkte, Online-Kurse und Tools für Ihre persönliche Bewusstseinsentwicklung. Hochwertige Ressourcen für selbstbestimmtes Wachstum.',
    keywords: ['Produkte', 'Shop', 'Online-Kurse', 'Digitale Produkte', 'Tools', 'Ressourcen'],
    schemaType: 'Product'
  },
  faq: {
    title: 'FAQ – Häufig gestellte Fragen zu Coaching & Seminaren',
    description: 'Antworten auf häufig gestellte Fragen zu Coaching, Seminaren, Methoden und der Zusammenarbeit mit Anatoly Mook.',
    keywords: ['FAQ', 'Fragen', 'Antworten', 'Häufig gestellte Fragen', 'Coaching FAQ'],
    schemaType: 'FAQPage'
  },
  kontakt: {
    title: 'Kontakt – Anatoly Mook für Coaching & Seminare erreichen',
    description: 'Kontaktieren Sie Anatoly Mook für Coaching, Seminare, Keynotes oder individuelle Anfragen. Persönlicher Kontakt für eine nachhaltige Zusammenarbeit.',
    keywords: ['Kontakt', 'Anfrage', 'Beratung', 'Termin vereinbaren', 'Kontaktformular'],
    schemaType: 'WebPage'
  },
  booking: {
    title: 'Termin buchen – Coaching-Session mit Anatoly Mook vereinbaren',
    description: 'Buchen Sie Ihren persönlichen Coaching-Termin oder ein Erstgespräch mit Anatoly Mook. Einfache Online-Terminbuchung für individuelle Sessions.',
    keywords: ['Termin buchen', 'Booking', 'Terminvereinbarung', 'Coaching-Session', 'Erstgespräch'],
    schemaType: 'WebPage'
  },
  quiz: {
    title: 'Bewusstseins-Quiz – Erkennen Sie Ihren aktuellen Bewusstseinsstand',
    description: 'Interaktives Quiz zur Selbsteinschätzung Ihres Bewusstseinsstands. Erhalten Sie wertvolle Insights und Empfehlungen für Ihren persönlichen Entwicklungsweg.',
    keywords: ['Quiz', 'Bewusstseins-Quiz', 'Selbsteinschätzung', 'Test', 'Bewusstseinsstand'],
    schemaType: 'WebPage'
  },
  resources: {
    title: 'Ressourcen – Wertvolle Materialien für Ihre Entwicklung',
    description: 'Kostenlose Ressourcen, Tools und Materialien für Ihre persönliche Bewusstseinsentwicklung. Downloads, Guides und weiterführende Informationen.',
    keywords: ['Ressourcen', 'Downloads', 'Tools', 'Materialien', 'Guides', 'Kostenlos'],
    schemaType: 'WebPage'
  },
  impressum: {
    title: 'Impressum – Rechtliche Informationen von Anatoly Mook',
    description: 'Impressum und rechtliche Informationen zur Website anatolymook.de gemäß TMG.',
    keywords: ['Impressum', 'Rechtliches', 'Anbieterkennzeichnung', 'TMG'],
    schemaType: 'WebPage'
  },
  datenschutz: {
    title: 'Datenschutzerklärung – Datenschutz bei Anatoly Mook',
    description: 'Datenschutzerklärung und Informationen zum Umgang mit personenbezogenen Daten auf anatolymook.de gemäß DSGVO.',
    keywords: ['Datenschutz', 'DSGVO', 'Privacy Policy', 'Datenschutzerklärung'],
    schemaType: 'WebPage'
  },
  anamnesis: {
    title: 'Anamnese – Persönliche Erstanalyse für Ihr Coaching',
    description: 'Umfassende Anamnese zur Vorbereitung Ihres individuellen Coachings. Strukturierte Erfassung Ihrer aktuellen Situation, Ziele und Herausforderungen.',
    keywords: ['Anamnese', 'Erstanalyse', 'Coaching-Vorbereitung', 'Fragebogen', 'Analyse'],
    schemaType: 'WebPage'
  }
};

export function getSectionSEO(section: string): SectionSEO {
  return sectionSEOConfig[section] || sectionSEOConfig.home;
}
