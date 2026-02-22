import { ArrowRight, Sparkles, Infinity, Circle, Eye, Brain, Heart, Zap, Users, Compass, Sun, Moon, Wind, Waves } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Keynotes() {
  const [activeMantra, setActiveMantra] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeTransformation, setActiveTransformation] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const keynotes = [
    {
      id: 'new-consciousness',
      title: 'Neues Denken. Neues Bewusstsein. Neues Leben.',
      subtitle: 'Transformation des Bewusstseins',
      description: 'Vom Denken zur Wahrnehmung, vom Ego zum Sein. Eine Reise jenseits der Gedankenmuster in die reine Gegenwärtigkeit. Die tiefe Erkenntnis der wahren Natur – Bewusstheit als Zugang zur universellen Intelligenz. Erkenntnisse der tiefen Dimension, deiner wahren Natur, der göttlichen Essenz in dir.',
      mantra: 'Vom Denken zur Wahrheit.',
      essence: 'Die Wahrheit kann nicht gedacht werden. Sie kann nur spürbar erlebt werden.',
      details: [
        'Befreiung von Identifikation mit Gedanken',
        'Zugang zum Raum für das Leben – das Bewusstseinsfeld',
        'Erkenntnis: Du bist nicht der denkende Geist, sondern das Bewusstsein',
        'Von der Illusion der psychologischen Zeit zur Gegenwart',
        'Wahrnehmung ohne Interpretation – achtsame Präsenz'
      ],
      transformations: [
        { from: 'Denken', to: 'Fühlen' },
        { from: 'Konditionierung', to: 'Bewusstheit' },
        { from: 'Ansichten', to: 'Wahrheit' }
      ]
    },
    {
      id: 'clarity-performance',
      title: 'Höchstleistung durch innere Klarheit',
      subtitle: 'Die tiefe Dimension menschlicher Präsenz',
      description: 'Fokus, Stabilität und Spitzenentscheidungen aus dem Raum der Stille. Die Kraft der Gegenwart für höchste Leistungsfähigkeit und rechtes Handeln im Einklang mit dem Leben. Du bist die Lebensenergie der Ursprungsquelle – kreativ schöpferische Kraft des Universums.',
      mantra: 'Ich bin die Antwort.',
      essence: 'Wenn ich sage ich – meine ich uns alle. Das einzig wahre ICHBIN – das sind wir alle.',
      details: [
        'Höchste Leistungsfähigkeit aus der Stille',
        'Rechtes Handeln: Dient dem großen Ganzen, geschieht durch dich',
        'Im Verbund mit der universellen Intelligenz',
        'Innerer Körper: Dein Energiefeld – 30 Meter Radius Magnetfeld',
        'Zugang zur Quelle: Wahre Lebensenergie, grenzenlose Kreativität'
      ],
      transformations: [
        { from: 'Widerstand', to: 'Hingabe' },
        { from: 'Kontrolle', to: 'Vertrauen' },
        { from: 'Zeit', to: 'Achtsamkeit' }
      ]
    },
    {
      id: 'human-2-0',
      title: 'Der Mensch 2.0',
      subtitle: 'Der Weg zur höchstmöglichen Version',
      description: 'Zeit, Angst und Ego verlieren ihre Macht. Was bleibt ist das reine Potenzial des wahren Selbst. Von der Raupe zum Schmetterling – Transzendenz auf das nächsthöhere Level des einen ewigen Seins. Entwicklung zu Mensch 2.0: Spirituelles Erwachen, seelische Erleuchtung, Seinsbewusstsein.',
      mantra: 'Heute ist der erste Tag deines neuen Lebens.',
      essence: 'Du bist nun reif. Du bist jetzt bereit. Das neue höchstbewusste Ich erscheint – jetzt.',
      details: [
        'Ausstrahlung: Einklänglicher reiner Frieden, Freude des Beisammenseins',
        'Wahre Liebe: Einbeziehend, einvernehmlich, einfühlend',
        'Du bist das Bewusstsein – über die Form hinaus',
        'Eine kreativ schöpferische Kraft des Universums',
        'Das Licht der Welt – Ausstrahlung der Schöpfung'
      ],
      transformations: [
        { from: 'Getrenntheit', to: 'Einheit' },
        { from: 'Begrenzung', to: 'Freiheit' },
        { from: 'Existieren', to: 'Sein' }
      ]
    },
    {
      id: 'spiritual-intelligence',
      title: 'Spirituelle Intelligenz im Management',
      subtitle: 'Achtsamkeit und intuitive Präzision für Führung',
      description: 'Bewusstheit als Kompass, Intuition als Werkzeug, Präsenz als Kraftquelle. Führung aus der tiefen Dimension – im Verbund mit der universellen Intelligenz, eins mit dem Leben. Die universelle Intelligenz ist reine Weisheit, grenzenlose Kreativität und unermessliche schöpferische Kraft.',
      mantra: 'Lasse los, was du nicht bist – damit erscheint, wer du bist.',
      essence: 'Rechtes Handeln geschieht durch dich, wenn du dem großen Ganzen dienst.',
      details: [
        'Verleugne dich selbst: Löse Konditionierungen und Denkmuster auf',
        'Spirituelle Kraft und spirituelles Vertrauen',
        'Wie Vergrößerungsglas Sonnenlicht zum Feuer führt: Aufmerksamkeit aktiviert',
        'Meine Hände sind Hände der Ursprungsquelle allen Seins',
        'Im Einklang mit dem Leben, eins mit dem Leben'
      ],
      transformations: [
        { from: 'Ego-Denken', to: 'Bewusstheit' },
        { from: 'Arbeiten', to: 'Beitragen' },
        { from: 'Selbstbezogenheit', to: 'Einbeziehung' }
      ]
    },
    {
      id: 'transformation-company',
      title: 'Transformation im Unternehmen',
      subtitle: 'Vom Widerstand zur Hingabe',
      description: 'Wie Teams Blockaden lösen und in harmonischen Flow eintreten. Die Kraft der Hingabe: Akzeptieren, Zulassen, Erlauben. Transparenz und Durchlässigkeit als Weg zur Befreiung von Negativität. Das wahre Wunder des Lebens ist der alchemistische Wandlungsprozess der Hingabe.',
      mantra: 'Lebe jetzt dein Dann – dann löst sich das Wenn.',
      essence: 'Hingabe ist der alchemistische Wandlungsprozess, der Wunder geschehen lässt.',
      details: [
        'Hingabe: Zulassen, erlauben, beselen – transparent werden',
        'Befreiung von Urteilen, Ärger und Widerstand',
        'Friedlichen Raum erschaffen, in dem Verwandlung geschieht',
        'Leben spielt dir zu – Wunder geschehen',
        'Erschaffen neuer Wege, Maßstäbe, Formen, Ressourcen'
      ],
      transformations: [
        { from: 'Urteilen', to: 'Akzeptanz' },
        { from: 'Verlangen', to: 'Geben' },
        { from: 'Angst', to: 'Liebe' }
      ]
    }
  ];

  const essenceKeys = [
    {
      icon: Eye,
      title: 'Gegenwärtigkeit',
      subtitle: 'Achtsame Präsenz',
      description: 'Aufmerksamkeit auf den einzig wahren Ort: HIER. Auf den einzig wahren Zeitpunkt: JETZT.',
      detail: 'Volle, gesammelte, konzentrierte Aufmerksamkeit. Wahrnehmen ohne Interpretieren. Der gegenwärtige Moment ist das einzige, was existiert.',
      benefits: [
        'Klarheit, Stabilität, Sicherheit',
        'Harmonie und Frieden',
        'Befreiung von psychologischer Zeit'
      ]
    },
    {
      icon: Brain,
      title: 'Bewusstheit',
      subtitle: 'Erkenntnis der Wahrheit',
      description: 'Umfangreiches Sehen und Fühlen. Bewusste Wahrnehmung führt zu Erkenntnissen.',
      detail: 'Schönheit, Heiligkeit, Herrlichkeit der Natur und des Lebens. Gewissheit über Wahrheit und Weisheit. Tiefe Dimension des wahren ICH.',
      benefits: [
        'Erkenntnis der Einheit aller Wesen',
        'Verbund mit universeller Intelligenz',
        'Zugang zur Quelle der Lebensenergie'
      ]
    },
    {
      icon: Heart,
      title: 'Hingabe',
      subtitle: 'Der alchemistische Wandel',
      description: 'Be-JA-hen. Annahme. Akzeptieren, Zulassen, Erlauben.',
      detail: 'Die Kraft der Hingabe ist Zulassen, Erlauben und Beselen. Transparent und durchlässig werden für das Leben.',
      benefits: [
        'Befreiung von Widerstand und Negativität',
        'Wunder geschehen, Leben spielt dir zu',
        'Inspiration für andere Menschen'
      ]
    }
  ];

  const dimensions = [
    {
      icon: Eye,
      title: 'Gegenwärtigkeit',
      description: 'Fokus statt Gedankenknoten',
      detail: 'Der einzig wahre Zeitpunkt: Jetzt. Achtsame Präsenz. Wahrnehmen ohne Interpretieren.'
    },
    {
      icon: Brain,
      title: 'Bewusstheit',
      description: 'Erkennen statt Interpretieren',
      detail: 'Seinsfühlung über die Form hinaus. Erkenntnisse der tiefen Dimension, deiner wahren Natur.'
    },
    {
      icon: Heart,
      title: 'Hingabe',
      description: 'Der Weg aus Widerstand',
      detail: 'Akzeptieren was ist. Zulassen wie ist. Erlauben – transparent und durchlässig werden.'
    },
    {
      icon: Users,
      title: 'Einheit',
      description: 'Teamgeist auf höherer Ebene',
      detail: 'Erkenntnis der Einheit aller Wesen. Einbeziehend, einvernehmlich, einhellig.'
    },
    {
      icon: Compass,
      title: 'Rechtes Handeln',
      description: 'Entscheidungen für das Ganze',
      detail: 'Im Einklang mit dem Leben. Im Verbund mit der universellen Intelligenz. Dient dem großen Ganzen.'
    },
    {
      icon: Zap,
      title: 'Energie-Feld',
      description: 'Vitalität & Leistungsfähigkeit',
      detail: 'Die Lebensenergie der Ursprungsquelle. Höchste Ausstrahlung der Liebe. 30 Meter Magnetfeld.'
    }
  ];

  const transformations = [
    { from: 'Denken', to: 'Fühlen', icon: Brain },
    { from: 'Konditionierung', to: 'Bewusstheit', icon: Eye },
    { from: 'Wissen', to: 'Weisheit', icon: Sparkles },
    { from: 'Zeit', to: 'Achtsamkeit', icon: Sun },
    { from: 'Widerstand', to: 'Hingabe', icon: Heart },
    { from: 'Getrenntheit', to: 'Einheit', icon: Users },
    { from: 'Illusion', to: 'Wahrheit', icon: Eye },
    { from: 'Begrenzung', to: 'Freiheit', icon: Wind },
    { from: 'Kontrolle', to: 'Vertrauen', icon: Heart },
    { from: 'Angst', to: 'Liebe', icon: Heart },
    { from: 'Haben', to: 'Sein', icon: Infinity },
    { from: 'Suchen', to: 'Finden', icon: Compass },
    { from: 'Existieren', to: 'Leben feiern', icon: Sparkles },
    { from: 'Sich beklagen', to: 'Staunen können', icon: Eye },
    { from: 'Vernunft', to: 'Leidenschaft', icon: Heart },
    { from: 'Arbeiten', to: 'Beitragen', icon: Users },
    { from: 'Selbstbezogenheit', to: 'Einbeziehung', icon: Users },
    { from: 'Verlangen', to: 'Seeligem Geben', icon: Heart },
    { from: 'Ego-Trips', to: 'Lebensreise', icon: Compass },
    { from: 'Ego-Gier', to: 'Wohl aller', icon: Users }
  ];

  const mantras = [
    'Ich bin die Antwort!',
    'Das einzig wahre ICHBIN – das sind wir alle.',
    'Erkenne es als das was es ist!',
    'Du hast es serienmäßig onboard!',
    'Heute ist der erste Tag deines neuen Lebens!',
    'Vom Denken zur Wahrheit.',
    'Lebe jetzt dein Dann – dann löst sich das Wenn.',
    'Lasse los, was du nicht bist – damit erscheint, wer du bist.',
    'In diesem Moment der Stille ist mehr Weisheit als in allen Worten.',
    'Die Wahrheit kann nicht gedacht werden – nur spürbar erlebt.',
    'Leben bedeutet: Von Kontrolle loslassen, sich in den Fluss begeben.',
    'Befreie dich von der Illusion der Zeit – tritt jetzt in die Gegenwart ein.',
    'Sei jetzt eine Bereicherung für die ganze Welt.',
    'Lebe nicht nach Plan, sondern im Einklang mit dem Leben.',
    'Der Finger, der zum Mond zeigt – ist nicht der Mond.',
    'Suche nicht nach Wahrheit – lasse die Ansichten deines Verstands los.'
  ];

  const impacts = [
    'Sofortige innere Klarheit und Stabilität',
    'Wahrnehmungsschärfung über Gedanken hinaus',
    'Zugang zur universellen Intelligenz',
    'Befreiung von Widerstand und Negativität',
    'Höchste Leistungsfähigkeit aus der Stille',
    'Rechtes Handeln im Einklang mit dem Leben',
    'Erkenntnisse der tiefen Dimension',
    'Transformation auf nächsthöheres Level',
    'Verbund mit der Ursprungsquelle aller Seins',
    'Kreativ schöpferische Prozesse aktivieren',
    'Ausstrahlung von Liebe und Frieden',
    'Befreiung von Ego-Mustern und Konditionierung'
  ];

  const lifeAreas = [
    {
      title: 'Gesundheit & Vitalität',
      description: 'Über Gesund-Sein hinaus zur höchsten Vitalität',
      detail: 'Heiliges Heil-Sein. Göttliche Kraft. Wunderbares Wohlbefinden.'
    },
    {
      title: 'Persönlichkeit & Einstellung',
      description: 'Wahre Selbst-Verwirklichung',
      detail: 'Höchste Potenzial-Entfaltung. Persönliche Transformation. Spirituelle Harmonie.'
    },
    {
      title: 'Beziehungen & Familie',
      description: 'Wahre Liebe und einheitliche Beziehung',
      detail: 'Unermessliche Liebe. Wunderschöne Sympathie. Wohlwollende Nächstenliebe.'
    },
    {
      title: 'Berufung & Fortschritt',
      description: 'Neue berufliche Perspektiven und klare Wege zur Bestimmung',
      detail: 'Vom Beruf zur Berufung. Kreatives Erschaffen, Meistern, Vollbringen.'
    },
    {
      title: 'Erfolg & Wohlstand',
      description: 'Wahrer Erfolg und wirklicher Wohlstand',
      detail: 'Ressourcengewinnen durch Energie- und Leistungssteigerung.'
    },
    {
      title: 'Erfüllung & Glückseligkeit',
      description: 'Tiefgreifende Erfüllung und höchste Glückseligkeit',
      detail: 'Harmonischer Frieden. Lebensfreude. Entwicklungsfreiheit. Segen und Licht.'
    }
  ];

  const teachings = [
    {
      title: 'Sat-Chit-Ananda',
      subtitle: 'Die Beschreibung des Brahman',
      description: 'Sat (Sein) – Zustand der Existenz an sich, Wahrheit. Chit (Bewusstsein) – Reines unpersönliches Bewusstsein, Verstand, Wissen. Ananda (Glückseligkeit) – Vollkommene und höchste Glückseligkeit, unbeeinträchtigte Freude des Seins.'
    },
    {
      title: 'Agápē',
      subtitle: 'Selbstlose Liebe',
      description: 'Die selbstlose Liebe Gottes. Tiefste Gewissheit über die Einheit. Wohlwollende Nächstenliebe. Liebe deinen Nächsten wie dich selbst – Erkenne deinen Nächsten als Ich Bin, das Einzige.'
    },
    {
      title: 'Śūnyatā',
      subtitle: 'Die Leere',
      description: 'Das formlose räumliche Bewusstsein. Alles ist leer und frei von Dauerhaftigkeit. "Leerheit" ist eine Umschreibung für das Fehlen eines konstanten Seins im steten Wandel der Existenz.'
    }
  ];

  return (
    <div className="bg-black min-h-screen">
      <section className="py-48 relative pt-64">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-36">
            <Circle size={4} className="mx-auto text-yellow-400/35 fill-current mb-10" />
            <h2 className="text-[32px] font-[680] text-white/95 mb-8 tracking-[-0.035em]">
              Warum Anatoly?
            </h2>
            <p className="text-white/28 text-[13px] font-[440] max-w-[600px] mx-auto leading-[1.85]">
              Transformation durch universelle Weisheit und spirituelle Wahrheit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="mb-10 transition-transform duration-700 group-hover:scale-105">
                <div
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-700"
                  style={{
                    background: 'rgba(250, 204, 21, 0.04)',
                    border: '0.5px solid rgba(250, 204, 21, 0.12)'
                  }}
                >
                  <Sparkles size={28} className="text-yellow-400/60 transition-all duration-700 group-hover:text-yellow-400/80" strokeWidth={1.4} />
                </div>
              </div>
              <h3 className="text-white text-[18px] font-[640] mb-5 tracking-[-0.025em]">
                Bewusstseins-Transzendenz
              </h3>
              <p className="text-white/32 text-[13px] font-[440] leading-[1.85] tracking-[0.008em] mb-4">
                Aus Gewohnheitsmustern in neue Dimensionen klaren Denkens. Vom Denken zum Sein.
              </p>
              <p className="text-yellow-400/40 text-[11px] font-[500] leading-[1.7] tracking-[0.015em] italic">
                Die Grenzen überschreiten, in einen neuen Bereich hinübergehen
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-10 transition-transform duration-700 group-hover:scale-105">
                <div
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-700"
                  style={{
                    background: 'rgba(250, 204, 21, 0.04)',
                    border: '0.5px solid rgba(250, 204, 21, 0.12)'
                  }}
                >
                  <Circle size={28} className="text-yellow-400/60 transition-all duration-700 group-hover:text-yellow-400/80" strokeWidth={1.4} />
                </div>
              </div>
              <h3 className="text-white text-[18px] font-[640] mb-5 tracking-[-0.025em]">
                Universelle Intelligenz
              </h3>
              <p className="text-white/32 text-[13px] font-[440] leading-[1.85] tracking-[0.008em] mb-4">
                Neurowissenschaftliche Präzision trifft spirituelles Urwissen. Grenzenlose Kreativität.
              </p>
              <p className="text-yellow-400/40 text-[11px] font-[500] leading-[1.7] tracking-[0.015em] italic">
                Reine Weisheit, unermessliche schöpferische Kraft
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-10 transition-transform duration-700 group-hover:scale-105">
                <div
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-700"
                  style={{
                    background: 'rgba(250, 204, 21, 0.04)',
                    border: '0.5px solid rgba(250, 204, 21, 0.12)'
                  }}
                >
                  <Infinity size={28} className="text-yellow-400/60 transition-all duration-700 group-hover:text-yellow-400/80" strokeWidth={1.4} />
                </div>
              </div>
              <h3 className="text-white text-[18px] font-[640] mb-5 tracking-[-0.025em]">
                Performance-Transformation
              </h3>
              <p className="text-white/32 text-[13px] font-[440] leading-[1.85] tracking-[0.008em] mb-4">
                Momentum, Handlungskraft, neues inneres Betriebssystem. Höchste Leistungsfähigkeit.
              </p>
              <p className="text-yellow-400/40 text-[11px] font-[500] leading-[1.7] tracking-[0.015em] italic">
                Rechtes Handeln, zweckfreies Tun, im Einklang mit dem Leben
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-48 relative">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-36">
            <Circle size={4} className="mx-auto text-yellow-400/35 fill-current mb-10" />
            <h2 className="text-[36px] font-[680] text-white/95 mb-8 tracking-[-0.035em]">
              Die Signatur-Vorträge
            </h2>
            <p className="text-white/28 text-[13px] font-[440] max-w-[600px] mx-auto leading-[1.85]">
              Erkenntnisse, die Denken überschreiten und Leben verwandeln
            </p>
          </div>

          <div className="space-y-12">
            {keynotes.map((keynote, idx) => (
              <div
                key={keynote.id}
                className="group relative overflow-hidden rounded-[32px] transition-all duration-900"
                style={{
                  background: 'rgba(255, 255, 255, 0.012)',
                  border: '0.5px solid rgba(255, 255, 255, 0.05)'
                }}
                onMouseEnter={() => setActiveMantra(idx)}
                onMouseLeave={() => setActiveMantra(null)}
              >
                <div className="p-14 lg:p-20">
                  <div className="mb-10">
                    <h3 className="text-white text-[28px] lg:text-[36px] font-[720] mb-5 tracking-[-0.04em] leading-[1.12]">
                      {keynote.title}
                    </h3>
                    <p className="text-yellow-400/65 text-[13px] font-[520] tracking-[0.025em] uppercase">
                      {keynote.subtitle}
                    </p>
                  </div>

                  <p className="text-white/32 text-[14px] font-[440] leading-[1.9] tracking-[0.008em] mb-12 max-w-[820px]">
                    {keynote.description}
                  </p>

                  <div className="space-y-8 mb-12">
                    <div>
                      <h4 className="text-white/50 text-[11px] font-[600] tracking-[0.12em] mb-6 uppercase">
                        Kerninhalte
                      </h4>
                      <div className="space-y-4">
                        {keynote.details.map((detail, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 p-5 rounded-[16px] transition-all duration-500 hover:bg-white/[0.015]"
                            style={{
                              background: 'rgba(255, 255, 255, 0.008)',
                              border: '0.5px solid rgba(255, 255, 255, 0.03)'
                            }}
                          >
                            <Circle size={5} className="text-yellow-400/40 flex-shrink-0 fill-current mt-1" />
                            <span className="text-white/40 text-[13px] font-[440] tracking-[0.005em] leading-[1.75]">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white/50 text-[11px] font-[600] tracking-[0.12em] mb-6 uppercase">
                        Transformations-Achsen
                      </h4>
                      <div className="grid md:grid-cols-3 gap-3">
                        {keynote.transformations.map((t, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-3 p-4 rounded-[14px]"
                            style={{
                              background: 'rgba(255, 255, 255, 0.008)',
                              border: '0.5px solid rgba(255, 255, 255, 0.03)'
                            }}
                          >
                            <span className="text-white/25 text-[12px] font-[440] tracking-[0.005em]">
                              {t.from}
                            </span>
                            <ArrowRight size={12} className="text-yellow-400/35 flex-shrink-0" strokeWidth={2} />
                            <span className="text-white/55 text-[12px] font-[560] tracking-[0.005em]">
                              {t.to}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className="relative overflow-hidden rounded-[24px] p-10 transition-all duration-900"
                    style={{
                      background: activeMantra === idx
                        ? 'rgba(250, 204, 21, 0.055)'
                        : 'rgba(250, 204, 21, 0.025)',
                      border: activeMantra === idx
                        ? '0.5px solid rgba(250, 204, 21, 0.22)'
                        : '0.5px solid rgba(250, 204, 21, 0.1)'
                    }}
                  >
                    <div className="flex items-start gap-5 mb-8">
                      <Sparkles
                        size={22}
                        className={`mt-1 transition-all duration-900 ${
                          activeMantra === idx ? 'text-yellow-400/75' : 'text-yellow-400/45'
                        }`}
                        strokeWidth={1.4}
                      />
                      <p
                        className="text-[18px] font-[600] tracking-[0.005em] leading-[1.55] transition-all duration-900"
                        style={{
                          background: activeMantra === idx
                            ? 'linear-gradient(135deg, rgba(250, 204, 21, 1) 0%, rgba(250, 204, 21, 0.85) 100%)'
                            : 'linear-gradient(135deg, rgba(250, 204, 21, 0.9) 0%, rgba(250, 204, 21, 0.6) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {keynote.mantra}
                      </p>
                    </div>

                    <p className="text-white/28 text-[12px] font-[440] leading-[1.75] tracking-[0.012em] italic pl-9">
                      {keynote.essence}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.025] blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(250, 204, 21, 0.35) 0%, transparent 70%)'
          }}
        />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-36">
            <Circle size={4} className="mx-auto text-yellow-400/35 fill-current mb-10" />
            <h2 className="text-[32px] font-[680] text-white/95 mb-8 tracking-[-0.035em]">
              Die drei Essenz-Schlüssel
            </h2>
            <p className="text-white/28 text-[13px] font-[440] max-w-[640px] mx-auto leading-[1.85]">
              Säulen für neues Bewusstsein – führen zu neuem Denken, neuem Handeln, neuem Leben
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {essenceKeys.map((key, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-[28px] p-12 transition-all duration-700 hover:scale-[1.02]"
                style={{
                  background: 'rgba(255, 255, 255, 0.012)',
                  border: '0.5px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <key.icon size={32} className="text-yellow-400/55 mb-8 transition-all duration-700 group-hover:text-yellow-400/75" strokeWidth={1.3} />

                <h3 className="text-white text-[20px] font-[660] mb-3 tracking-[-0.025em]">
                  {key.title}
                </h3>
                <p className="text-yellow-400/55 text-[12px] font-[520] mb-6 tracking-[0.015em]">
                  {key.subtitle}
                </p>

                <p className="text-white/35 text-[13px] font-[440] leading-[1.8] tracking-[0.008em] mb-6">
                  {key.description}
                </p>

                <p className="text-white/28 text-[12px] font-[440] leading-[1.75] tracking-[0.008em] mb-8 italic">
                  {key.detail}
                </p>

                <div className="space-y-3">
                  <h4 className="text-white/45 text-[10px] font-[600] tracking-[0.12em] mb-4 uppercase">
                    Führt zu:
                  </h4>
                  {key.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Circle size={4} className="text-yellow-400/35 flex-shrink-0 fill-current mt-1.5" />
                      <span className="text-white/32 text-[12px] font-[440] leading-[1.7] tracking-[0.005em]">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="text-center mb-36">
            <Circle size={4} className="mx-auto text-yellow-400/35 fill-current mb-10" />
            <h2 className="text-[32px] font-[680] text-white/95 mb-8 tracking-[-0.035em]">
              Die Transzendenz-Dimensionen
            </h2>
            <p className="text-white/28 text-[13px] font-[440] max-w-[640px] mx-auto leading-[1.85]">
              Sechs Schlüssel zur höchsten Bewusstheit und Präsenz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dimensions.map((dimension, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-[24px] p-11 transition-all duration-700 hover:scale-[1.015]"
                style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '0.5px solid rgba(255, 255, 255, 0.04)'
                }}
              >
                <dimension.icon size={26} className="text-yellow-400/50 mb-7" strokeWidth={1.3} />
                <h3 className="text-white text-[17px] font-[640] mb-4 tracking-[-0.02em]">
                  {dimension.title}
                </h3>
                <p className="text-yellow-400/50 text-[12px] font-[500] mb-5 tracking-[0.012em]">
                  {dimension.description}
                </p>
                <p className="text-white/24 text-[12px] font-[440] leading-[1.8] tracking-[0.008em]">
                  {dimension.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 relative">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-32">
            <Circle size={4} className="mx-auto text-yellow-400/35 fill-current mb-10" />
            <h2 className="text-[32px] font-[680] text-white/95 mb-8 tracking-[-0.035em]">
              Von → Zu
            </h2>
            <p className="text-white/28 text-[13px] font-[440] max-w-[560px] mx-auto leading-[1.85] mb-4">
              Transzendenz: Die Grenzen überschreiten, in einen neuen Bereich hinübergehen
            </p>
            <p className="text-yellow-400/40 text-[12px] font-[500] max-w-[520px] mx-auto leading-[1.75] italic">
              Steigerung des Bewusstseins auf höchsten Level
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {transformations.map((t, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-4 p-6 rounded-[18px] transition-all duration-500 cursor-pointer"
                style={{
                  background: activeTransformation === idx ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.01)',
                  border: activeTransformation === idx ? '0.5px solid rgba(255, 255, 255, 0.08)' : '0.5px solid rgba(255, 255, 255, 0.03)'
                }}
                onMouseEnter={() => setActiveTransformation(idx)}
                onMouseLeave={() => setActiveTransformation(null)}
              >
                <t.icon size={16} className="text-yellow-400/30 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-white/28 text-[13px] font-[440] tracking-[0.008em] flex-1 text-right">
                  {t.from}
                </span>
                <ArrowRight
                  size={14}
                  className={`flex-shrink-0 transition-all duration-500 ${
                    activeTransformation === idx ? 'text-yellow-400/55 translate-x-1' : 'text-yellow-400/35'
                  }`}
                  strokeWidth={2}
                />
                <span className="text-white/55 text-[13px] font-[580] tracking-[0.008em] flex-1">
                  {t.to}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.02] blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(250, 204, 21, 0.35) 0%, transparent 70%)'
          }}
        />

        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
            <Circle size={4} className="mx-auto text-yellow-400/35 fill-current mb-10" />
            <h2 className="text-[32px] font-[680] text-white/95 mb-8 tracking-[-0.035em]">
              Original-Mantras
            </h2>
            <p className="text-white/28 text-[13px] font-[440] max-w-[600px] mx-auto leading-[1.85]">
              Heilige Worte und kurze einprägsame Lehrsätze aus den Vorträgen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {mantras.map((mantra, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-[20px] p-8 transition-all duration-600 hover:scale-[1.01]"
                style={{
                  background: 'rgba(250, 204, 21, 0.018)',
                  border: '0.5px solid rgba(250, 204, 21, 0.08)'
                }}
              >
                <div className="flex items-start gap-4">
                  <Sparkles size={18} className="text-yellow-400/40 flex-shrink-0 mt-1 transition-all duration-600 group-hover:text-yellow-400/60" strokeWidth={1.4} />
                  <p
                    className="text-[14px] font-[540] tracking-[0.005em] leading-[1.65] transition-all duration-600"
                    style={{
                      background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.85) 0%, rgba(250, 204, 21, 0.55) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {mantra}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 relative">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-36">
            <Circle size={4} className="mx-auto text-yellow-400/35 fill-current mb-10" />
            <h2 className="text-[32px] font-[680] text-white/95 mb-8 tracking-[-0.035em]">
              Spirituelle Lehren
            </h2>
            <p className="text-white/28 text-[13px] font-[440] max-w-[600px] mx-auto leading-[1.85]">
              Universelle Weisheit aus verschiedenen Traditionen
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {teachings.map((teaching, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-[28px] p-12 transition-all duration-700"
                style={{
                  background: 'rgba(255, 255, 255, 0.012)',
                  border: '0.5px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div className="mb-8">
                  <Circle size={8} className="text-yellow-400/40 fill-current mb-6" />
                  <h3 className="text-white text-[19px] font-[660] mb-3 tracking-[-0.025em]">
                    {teaching.title}
                  </h3>
                  <p className="text-yellow-400/50 text-[11px] font-[520] tracking-[0.02em] uppercase">
                    {teaching.subtitle}
                  </p>
                </div>

                <p className="text-white/30 text-[13px] font-[440] leading-[1.85] tracking-[0.008em]">
                  {teaching.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 relative">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-32">
            <Circle size={4} className="mx-auto text-yellow-400/35 fill-current mb-10" />
            <h2 className="text-[32px] font-[680] text-white/95 mb-8 tracking-[-0.035em]">
              Lebens-Ebenen
            </h2>
            <p className="text-white/28 text-[13px] font-[440] max-w-[600px] mx-auto leading-[1.85]">
              Transformation in allen Bereichen des Lebens
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lifeAreas.map((area, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-[24px] p-10 transition-all duration-600 hover:scale-[1.015]"
                style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '0.5px solid rgba(255, 255, 255, 0.04)'
                }}
              >
                <h3 className="text-white text-[17px] font-[640] mb-4 tracking-[-0.02em]">
                  {area.title}
                </h3>
                <p className="text-yellow-400/50 text-[12px] font-[500] mb-5 tracking-[0.01em] leading-[1.7]">
                  {area.description}
                </p>
                <p className="text-white/28 text-[11px] font-[440] leading-[1.75] tracking-[0.008em] italic">
                  {area.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 relative">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-28">
            <Circle size={4} className="mx-auto text-yellow-400/35 fill-current mb-10" />
            <h2 className="text-[32px] font-[680] text-white/95 mb-8 tracking-[-0.035em]">
              Impact
            </h2>
            <p className="text-white/28 text-[13px] font-[440] max-w-[560px] mx-auto leading-[1.85]">
              Was bei Teilnehmern geschieht – Transformation auf allen Ebenen
            </p>
          </div>

          <div className="space-y-4">
            {impacts.map((impact, idx) => (
              <div
                key={idx}
                className="flex items-center gap-6 p-7 rounded-[20px] transition-all duration-500 hover:bg-white/[0.018]"
                style={{
                  background: 'rgba(255, 255, 255, 0.008)',
                  border: '0.5px solid rgba(255, 255, 255, 0.03)'
                }}
              >
                <Circle size={6} className="text-yellow-400/40 flex-shrink-0 fill-current" />
                <span className="text-white/42 text-[13px] font-[440] tracking-[0.008em] leading-[1.75]">
                  {impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-56 relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] blur-[160px]"
          style={{
            background: 'radial-gradient(circle, rgba(250, 204, 21, 0.35) 0%, transparent 70%)'
          }}
        />

        <div className="max-w-[880px] mx-auto px-6 text-center relative z-10">
          <div
            className="relative overflow-hidden rounded-[36px] p-24"
            style={{
              background: 'rgba(255, 255, 255, 0.015)',
              border: '0.5px solid rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(80px)',
              WebkitBackdropFilter: 'blur(80px)'
            }}
          >
            <Infinity size={48} className="mx-auto text-yellow-400/12 mb-12" strokeWidth={0.9} />

            <h2 className="text-[40px] lg:text-[52px] font-[720] text-white mb-10 tracking-[-0.045em] leading-[1.1]">
              Buchen Sie einen Vortrag,<br />der Bewusstsein öffnet<br />und Leben verändert.
            </h2>

            <p className="text-white/35 text-[14px] font-[460] leading-[1.8] max-w-[600px] mx-auto mb-12">
              Transzendenz in ein neues Bewusstsein – für Ihre Organisation, Ihr Team, Ihre Führungskräfte.
            </p>

            <button
              className="group relative overflow-hidden rounded-full px-14 py-6 transition-all duration-700 mx-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(250, 204, 21, 1) 0%, rgba(245, 158, 11, 1) 100%)',
                boxShadow: '0 16px 56px rgba(250, 204, 21, 0.22)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 24px 72px rgba(250, 204, 21, 0.38)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 16px 56px rgba(250, 204, 21, 0.22)';
              }}
            >
              <span className="flex items-center gap-3 text-black text-[13px] font-[640] tracking-[0.03em]">
                Vortrag anfragen
                <ArrowRight size={16} className="transition-transform duration-700 group-hover:translate-x-2" strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
