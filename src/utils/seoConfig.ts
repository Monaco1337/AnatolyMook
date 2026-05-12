import { HERO_PORTRAIT } from '../constants/brandAssets';

export interface SectionSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  /** OG / Twitter / JSON-LD Bildmaße (echte Pixel, wenn abweichend von 1200×630) */
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageType?: string;
  schemaType: 'WebPage' | 'Article' | 'Course' | 'Event' | 'FAQPage' | 'Product' | 'Service';
}

export const sectionSEOConfig: Record<string, SectionSEO> = {
  home: {
    title: 'Anatoly Mook – Klarheit, bewusste Führung & persönliche Meisterschaft',
    description: 'Anatoly Mook steht für Klarheit statt Suche. Bewusstseinsarbeit, Coaching und Formate für Menschen, die Verantwortung übernehmen und ihr Leben konsequent gestalten wollen – klar, präzise, wirksam.',
    keywords: ['Anatoly Mook', 'Bewusstsein', 'Klarheit', 'bewusste Führung', 'persönliche Meisterschaft', 'Transformation', 'Coaching', 'Seminare', 'Mentoring'],
    ogImage: HERO_PORTRAIT.absPng,
    ogImageWidth: HERO_PORTRAIT.width,
    ogImageHeight: HERO_PORTRAIT.height,
    ogImageType: 'image/png',
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
    title: 'Transformation – Bewusstsein im Alltag vertiefen',
    description: 'Zwei Arten zu leben: unbewusst und bewusst – plus Transformations-Karten und vertiefende Einblicke in den Wandel.',
    keywords: ['Transformation', 'bewusst leben', 'Bewusstsein', 'Persönlichkeitsentwicklung', 'Unbewusst vs. bewusst'],
    schemaType: 'WebPage'
  },
  bewusstsein: {
    title: 'Neues Bewusstsein – Klarheit, Selbstführung & Paradigmen',
    description: 'Was neues Bewusstsein bedeutet: Lebensbereiche, Meisterschaft und Paradigmen wie Angsttransparenz und echtes Erleben statt Konzept.',
    keywords: ['Neues Bewusstsein', 'Selbstführung', 'Meisterschaft', 'Angsttransparenz', 'Bewusstsein ist kein Konzept'],
    schemaType: 'WebPage'
  },
  methodik: {
    title: 'Methodik – Drei Ebenen, Achtsamkeit & Bewusstseinstraining',
    description: 'Die Arbeit in drei Dimensionen: Achtsamkeitslehre, Bewusstseinstraining und Transformation – Prozess, Journey und konkrete Entwicklungsebenen.',
    keywords: ['Methodik', 'Achtsamkeitslehre', 'Bewusstseinstraining', 'drei Ebenen', 'Entwicklungsebenen', 'Prozess'],
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
  'faq-detail': {
    title: 'FAQ – Einzelfrage | Anatoly Mook',
    description: 'Antwort auf eine häufig gestellte Frage zu Coaching, Seminaren und Angeboten von Anatoly Mook.',
    keywords: ['FAQ', 'Fragen', 'Antworten', 'Coaching', 'Seminare'],
    schemaType: 'WebPage'
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
    description: 'Impressum und rechtliche Informationen zur Website www.anatoly-mook.de gemäß TMG.',
    keywords: ['Impressum', 'Rechtliches', 'Anbieterkennzeichnung', 'TMG'],
    schemaType: 'WebPage'
  },
  datenschutz: {
    title: 'Datenschutzerklärung – Datenschutz bei Anatoly Mook',
    description: 'Datenschutzerklärung und Informationen zum Umgang mit personenbezogenen Daten auf www.anatoly-mook.de gemäß DSGVO.',
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
