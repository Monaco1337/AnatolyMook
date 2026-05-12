/**
 * Zentrale Datenquelle für Seminare.
 * Wird sowohl von /seminare als auch /seminare/:id verwendet.
 */

export type SeminarFormat = 'praesenz' | 'online-live' | 'webinar' | 'on-demand' | 'hybrid';

export interface SeminarDate {
  month: string;
  days: string;
  year: string;
  location: string;
  available: number;
}

export interface SeminarModule {
  tag: string;
  title: string;
  content: string;
}

export interface SeminarTransform {
  von: string;
  zu: string;
}

export interface Seminar {
  id: string;
  format: SeminarFormat;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  essence: string;
  duration: string;
  price: string;
  capacity: string;
  includes: string[];
  module: SeminarModule[];
  transformationen: SeminarTransform[];
  dates: SeminarDate[];
}

export const STATIC_SEMINARS: Seminar[] = [
  {
    id: 'klarheit-intensiv',
    format: 'praesenz',
    title: 'Klarheit Intensiv',
    subtitle: 'Drei Tage in Stille, Struktur und Klarheit.',
    tagline: 'Vom Denken ins Sein — der direkte Weg zur inneren Klarheit.',
    description:
      'Drei Tage intensive Bewusstseinsarbeit. Sie lernen, den Verstand zu beruhigen, Klarheit zu finden und aus innerer Stille heraus zu handeln. Keine Theorie — reine Praxis, präzise geführt.',
    essence:
      'Klarheit ist kein Zustand, den man erreicht. Es ist das, was bleibt, wenn man aufhört zu suchen.',
    duration: '3 Tage',
    price: 'Ab 1.490 €',
    capacity: 'Max. 25 Teilnehmer',
    includes: [
      'Geführte Bewusstseinsübungen & Meditationen',
      'Individuelle Standortbestimmung',
      'Praxis-Tools für den Alltag',
      'Persönliches Integrations-Gespräch',
      'Verpflegung & Getränke inklusive',
      'Zugang zur Teilnehmer-Community'
    ],
    module: [
      {
        tag: 'Tag 1',
        title: 'Ankommen & Ausrichtung',
        content:
          'Den Verstand erkennen. Stille finden. Präsenz als Fundament etablieren.'
      },
      {
        tag: 'Tag 2',
        title: 'Vertiefung & Durchbruch',
        content:
          'Kernmuster auflösen. Bewusste Wahrnehmung schulen. Integration beginnen.'
      },
      {
        tag: 'Tag 3',
        title: 'Integration & Transfer',
        content:
          'Das Erfahrene verankern. Konkrete Alltagsstrategien. Persönlicher Weg nach vorn.'
      }
    ],
    transformationen: [
      { von: 'Grübeln', zu: 'Klarheit' },
      { von: 'Reaktivität', zu: 'Bewusste Antwort' },
      { von: 'Unruhe', zu: 'Innere Stille' }
    ],
    dates: [
      { month: 'Mai', days: '16–18', year: '2026', location: 'München', available: 8 },
      { month: 'Jul', days: '10–12', year: '2026', location: 'Berlin', available: 12 },
      { month: 'Sep', days: '18–20', year: '2026', location: 'Zürich', available: 20 }
    ]
  },
  {
    id: 'fuehrung-masterclass',
    format: 'praesenz',
    title: 'Führung aus Bewusstsein',
    subtitle: 'Fünf Tage Masterclass für Verantwortliche.',
    tagline: 'Wer sich selbst führen kann, führt andere mit natürlicher Autorität.',
    description:
      'Die intensive Masterclass für Führungskräfte, die ihre Wirksamkeit auf ein neues Level bringen. Fünf Tage Tiefenarbeit an Präsenz, Entscheidungsstärke und authentischer Führung.',
    essence: 'Echte Führung braucht keinen Druck. Sie entsteht aus Klarheit und Präsenz.',
    duration: '5 Tage',
    price: 'Ab 3.900 €',
    capacity: 'Max. 15 Teilnehmer',
    includes: [
      'Fünf intensive Tagesmodule',
      'Persönliches Führungs-Assessment',
      '1:1 Coaching-Session mit Anatoly',
      'Führungs-Toolkit & Praxishandbuch',
      'Exklusive Retreat-Location inkl. Verpflegung',
      'Drei Monate Follow-up Begleitung'
    ],
    module: [
      {
        tag: 'Tag 1',
        title: 'Selbstführung',
        content:
          'Die Basis: innere Ordnung, Präsenz und klare Selbstwahrnehmung als Führungsfundament.'
      },
      {
        tag: 'Tag 2',
        title: 'Bewusste Kommunikation',
        content:
          'Zuhören, Sprechen, Schweigen — die drei Dimensionen wirkungsvoller Führungskommunikation.'
      },
      {
        tag: 'Tag 3',
        title: 'Entscheidungsintelligenz',
        content:
          'Jenseits von Pro-Contra-Listen: Zugang zur intuitiven Klarheit für stimmige Entscheidungen.'
      },
      {
        tag: 'Tag 4',
        title: 'Team & Kultur',
        content:
          'Wie Sie ein Umfeld erschaffen, in dem Menschen natürlich wachsen und leisten.'
      },
      {
        tag: 'Tag 5',
        title: 'Integration & Vision',
        content:
          'Ihr persönlicher Führungskompass. Konkrete nächste Schritte und Langzeitstrategie.'
      }
    ],
    transformationen: [
      { von: 'Kontrolle', zu: 'Vertrauen' },
      { von: 'Druck', zu: 'Inspiration' },
      { von: 'Management', zu: 'Wahre Führung' }
    ],
    dates: [
      { month: 'Jun', days: '8–12', year: '2026', location: 'Kitzbühel', available: 5 },
      { month: 'Okt', days: '5–9', year: '2026', location: 'Hamburg', available: 15 }
    ]
  },
  {
    id: 'online-bewusstsein',
    format: 'online-live',
    title: 'Bewusstsein Online',
    subtitle: 'Vier Abende, live geführt — von überall.',
    tagline: 'Tiefe braucht keinen Ort — nur Offenheit.',
    description:
      'Vier intensive Abende, die Ihr Bewusstsein nachhaltig erweitern. Live geführte Praxis, klare Impulse und direkter Austausch — alles von zu Hause aus.',
    essence: 'Der wichtigste Raum ist nicht der äußere, sondern der innere.',
    duration: '4 × 2,5 h',
    price: '490 €',
    capacity: 'Max. 40 Teilnehmer',
    includes: [
      'Vier Live-Sessions à 2,5 Stunden',
      'Aufzeichnungen aller Sessions',
      'Geführte Meditationen zum Download',
      'Wöchentliche Praxis-Aufgaben',
      'Community-Zugang',
      'Q&A mit Anatoly'
    ],
    module: [
      {
        tag: 'Abend 1',
        title: 'Grundlagen der Präsenz',
        content: 'Den Geist beruhigen. Ankommen im Hier und Jetzt.'
      },
      {
        tag: 'Abend 2',
        title: 'Muster erkennen',
        content: 'Automatische Reaktionen sichtbar machen und loslassen.'
      },
      {
        tag: 'Abend 3',
        title: 'Stille & Kraft',
        content: 'Die Kraft der inneren Stille entdecken und nutzen.'
      },
      {
        tag: 'Abend 4',
        title: 'Integration',
        content: 'Das Erlernte verankern und in den Alltag tragen.'
      }
    ],
    transformationen: [
      { von: 'Ablenkung', zu: 'Fokus' },
      { von: 'Stress', zu: 'Gelassenheit' },
      { von: 'Zweifel', zu: 'Vertrauen' }
    ],
    dates: [
      { month: 'Mai', days: '6, 13, 20, 27', year: '2026', location: 'Online · Zoom', available: 25 },
      { month: 'Aug', days: '4, 11, 18, 25', year: '2026', location: 'Online · Zoom', available: 40 }
    ]
  },
  {
    id: 'on-demand-grundlagen',
    format: 'on-demand',
    title: 'Grundlagen der Achtsamkeit',
    subtitle: 'Selbstlernkurs, jederzeit zugänglich.',
    tagline: 'Ihr Tempo. Ihr Weg. Ihre Tiefe.',
    description:
      'Ein strukturierter Selbstlernkurs, der Sie Schritt für Schritt in die Praxis der Achtsamkeit einführt. Acht aufeinander aufbauende Module mit Video-Lektionen, geführten Meditationen und Reflexionsaufgaben.',
    essence: 'Der erste Schritt ist nicht der schwierigste — er ist der wichtigste.',
    duration: '8 Module · je 60 Min.',
    price: '290 €',
    capacity: 'Unbegrenzt',
    includes: [
      '8 Video-Module (je 45–60 Min.)',
      '16 geführte Meditationen',
      'Begleitendes Workbook (PDF)',
      'Lebenslanger Zugang',
      'Community-Forum',
      'Zertifikat bei Abschluss'
    ],
    module: [
      {
        tag: 'Modul 1–2',
        title: 'Fundament',
        content:
          'Was Achtsamkeit wirklich ist und wie Sie sie in Ihren Alltag integrieren.'
      },
      {
        tag: 'Modul 3–4',
        title: 'Vertiefung',
        content: 'Körperwahrnehmung, Atempraxis und geführte Meditation.'
      },
      {
        tag: 'Modul 5–6',
        title: 'Anwendung',
        content:
          'Achtsame Kommunikation, Stressmanagement und bewusste Entscheidungen.'
      },
      {
        tag: 'Modul 7–8',
        title: 'Integration',
        content: 'Langfristige Praxis etablieren und persönlichen Weg definieren.'
      }
    ],
    transformationen: [
      { von: 'Autopilot', zu: 'Bewusstheit' },
      { von: 'Hektik', zu: 'Ruhe' },
      { von: 'Oberfläche', zu: 'Tiefe' }
    ],
    dates: [
      { month: 'Jederzeit', days: 'verfügbar', year: '', location: 'Online · On-Demand', available: 999 }
    ]
  },
  {
    id: 'hybrid-retreat',
    format: 'hybrid',
    title: 'Wochenend-Retreat',
    subtitle: 'Vor Ort oder im Live-Stream — vollständig integriert.',
    tagline: 'Verbunden sein — egal wo Sie sind.',
    description:
      'Ein intensives Wochenende, das Sie wahlweise vor Ort oder im Live-Stream erleben. Beide Formate sind vollwertig integriert — Sie sind mittendrin, nicht nur dabei.',
    essence: 'Transformation kennt keine Entfernung.',
    duration: '2 Tage',
    price: 'Ab 690 €',
    capacity: 'Max. 30 Präsenz + 50 Online',
    includes: [
      'Zwei volle Tage Live-Programm',
      'Interaktive Breakout-Sessions',
      'Geführte Praxis & Reflexion',
      'Vollverpflegung (Präsenz)',
      'Aufzeichnung für 30 Tage',
      'Praxis-Guide zum Mitnehmen'
    ],
    module: [
      {
        tag: 'Samstag',
        title: 'Öffnung & Tiefe',
        content:
          'Ankommen, Ausrichtung finden und in die Tiefe der Bewusstseinsarbeit eintauchen.'
      },
      {
        tag: 'Sonntag',
        title: 'Integration & Kraft',
        content:
          'Das Erfahrene verankern, persönliche Erkenntnisse und den Transfer in den Alltag gestalten.'
      }
    ],
    transformationen: [
      { von: 'Isolation', zu: 'Verbundenheit' },
      { von: 'Theorie', zu: 'Erfahrung' },
      { von: 'Alltag', zu: 'Tiefe' }
    ],
    dates: [
      { month: 'Jun', days: '28–29', year: '2026', location: 'Frankfurt + Online', available: 18 },
      { month: 'Nov', days: '14–15', year: '2026', location: 'Wien + Online', available: 30 }
    ]
  }
];

export function getSeminarById(id: string): Seminar | undefined {
  return STATIC_SEMINARS.find(s => s.id === id);
}
