import { useState, useEffect, useMemo, useRef } from 'react';
import { Users, Clock, MapPin, Briefcase, TrendingUp, Sparkles, CheckCircle2, ChevronsRight, Target, Zap, Building2, Lightbulb, Award, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useMobileSliderIndex } from '../hooks/useMobileSliderIndex';
import MobileSliderDots from '../components/MobileSliderDots';

const FONT_DISPLAY =
  "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" as const;
/** Fließtext: angefragte Familie mit robusten Fallbacks (wie Premium-System mit Avenir) */
const FONT_BODY =
  "'Aviral Next LT Pro', 'Avenir Next LT Pro', 'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" as const;

const ENTRY_CARDS = [
  {
    id: 'kultur',
    title: 'Kulturprozess',
    body:
      'Für Unternehmen, die Reibung nicht nur organisieren, sondern an der inneren Ausrichtung ihrer Kultur klären wollen.',
    cta: 'Kultur vertiefen >>',
    category: 'transformation' as const
  },
  {
    id: 'selbst',
    title: 'Selbstständige',
    body:
      'Für Menschen mit Verantwortung, die nicht nur leisten, sondern aus Klarheit, Präsenz und stimmiger Richtung führen wollen.',
    cta: 'Ausrichtung klären >>',
    category: 'workshop' as const
  },
  {
    id: 'fuehrung',
    title: 'Führung',
    body:
      'Für Führungspersönlichkeiten, die Entscheidungen, Wirkung und innere Stabilität auf ein neues Niveau bringen wollen.',
    cta: 'Führung stärken >>',
    category: 'leadership' as const
  },
  {
    id: 'teams',
    title: 'Teams',
    body:
      'Für Teams, die weniger Reibung, mehr Bewusstheit und eine tragfähige gemeinsame Ausrichtung brauchen.',
    cta: 'Teamwirkung öffnen >>',
    category: 'team-retreat' as const
  }
];

interface CorporateOffer {
  id: string;
  category: 'workshop' | 'training-series' | 'team-retreat' | 'leadership' | 'transformation';
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  participants: string;
  format: string;
  availability: string;
  price: string;
  description: string;
  essence: string;
  includes: string[];
  benefits: { title: string; description: string }[];
  ideal_for: string[];
  program_outline: string[];
  gradient: string;
  image: string;
  highlight?: boolean;
  is_active: boolean;
  order_index: number;
}

export default function Corporate() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);
  const [offers, setOffers] = useState<CorporateOffer[]>([]);
  const [loading, setLoading] = useState(true);

  const staticOffers: CorporateOffer[] = useMemo(() => [
    {
      id: 'leadership-mastery',
      category: 'leadership',
      title: 'Leadership Mastery',
      subtitle: 'Führungskräfteentwicklung für nachhaltigen Unternehmenserfolg',
      tagline: 'Wer klar führt, braucht keinen Druck.',
      duration: '3–6 Monate',
      participants: '8–15 Führungskräfte',
      format: 'Präsenz & Hybrid',
      availability: 'Auf Anfrage',
      price: 'Auf Anfrage',
      description: 'Ein intensives Programm für Führungskräfte, die Klarheit, Präsenz und bewusste Entscheidungsstärke in ihren Führungsalltag integrieren wollen. Praxisnah, tiefgehend und direkt umsetzbar.',
      essence: 'Echte Führung beginnt mit Selbstführung.',
      includes: [
        'Individuelles Führungsprofil & Standortbestimmung',
        '6 Intensiv-Module à 2 Tage',
        '1:1 Executive Coaching (monatlich)',
        'Praxis-Transfer-Begleitung zwischen den Modulen',
        '360°-Feedback-Prozess',
        'Zugang zur Leadership-Community'
      ],
      benefits: [
        { title: 'Klare Entscheidungen unter Druck', description: 'Entwickeln Sie die Fähigkeit, auch in komplexen Situationen souverän und klar zu handeln.' },
        { title: 'Authentische Autorität', description: 'Führen Sie durch Präsenz und innere Stärke statt durch Position und Kontrolle.' },
        { title: 'Nachhaltige Team-Performance', description: 'Schaffen Sie ein Umfeld, in dem Teams eigenverantwortlich Höchstleistung erbringen.' }
      ],
      ideal_for: ['C-Level Executives & Geschäftsführung', 'Bereichs- und Abteilungsleitungen', 'High-Potential Führungsnachwuchs', 'Unternehmer & Gründer'],
      program_outline: ['Standortbestimmung & Führungsprofil', 'Bewusste Kommunikation & Präsenz', 'Entscheidungsstärke & innere Klarheit', 'Konfliktkompetenz & schwierige Gespräche', 'Teamdynamik & Organisationskultur', 'Integration & nachhaltige Verankerung'],
      gradient: 'from-cyan-500 to-blue-500',
      image: '/bildschirmfoto_2026-01-10_um_12.29.12.png',
      highlight: true,
      is_active: true,
      order_index: 1
    },
    {
      id: 'team-transformation',
      category: 'team-retreat',
      title: 'Team Transformation',
      subtitle: 'Tiefgreifende Teamführung für echte Veränderung',
      tagline: 'Ein starkes Team entsteht nicht durch Teambuilding, sondern durch gemeinsames Wachstum.',
      duration: '2–3 Tage Intensiv',
      participants: '10–30 Teilnehmer',
      format: 'Offsite / Retreat',
      availability: 'Termine auf Anfrage',
      price: 'Ab 8.900 €',
      description: 'Ein intensives Offsite-Format, das Teams aus der Routine holt und den Raum schafft für ehrliche Kommunikation, klare Ausrichtung und neues Zusammenwirken. Kein Entertainment, sondern echte Vertiefung in dem, was zählt.',
      essence: 'Wenn ein Team wirklich zusammenfindet, wird aus gemeinsamer Ausrichtung Wirksamkeit.',
      includes: [
        'Vorgespräch mit Teamleitung (Ziel & Kontext)',
        '2–3 Tage Intensiv-Programm',
        'Individuelle Team-Diagnose',
        'Moderierte Reflexions- und Praxiseinheiten',
        'Konkrete Maßnahmen & Transferplan',
        'Follow-up Call nach 4 Wochen'
      ],
      benefits: [
        { title: 'Echte Verbindung', description: 'Schaffen Sie die Basis für Vertrauen, Offenheit und konstruktives Zusammenwirken im Team.' },
        { title: 'Gemeinsame Ausrichtung', description: 'Entwickeln Sie ein klares, geteiltes Verständnis von Zielen, Rollen und Verantwortung.' },
        { title: 'Spürbare Veränderung', description: 'Erleben Sie den Unterschied zwischen einem netten Teamtag und echter Transformation.' }
      ],
      ideal_for: ['Management-Teams', 'Projektteams in Umbruchphasen', 'Abteilungen mit Reibungsverlusten', 'Neuzusammengesetzte Teams'],
      program_outline: ['Ankommen & Rahmen setzen', 'Standortbestimmung als Team', 'Kernthemen identifizieren & klären', 'Neue Vereinbarungen & Strukturen', 'Integration & Transferplan'],
      gradient: 'from-purple-500 to-violet-500',
      image: '/bildschirmfoto_2026-01-09_um_18.51.39.png',
      is_active: true,
      order_index: 2
    },
    {
      id: 'conscious-workshop',
      category: 'workshop',
      title: 'Bewusste Kommunikation',
      subtitle: 'Workshop für wirkungsvolle Gesprächsführung',
      tagline: 'Die Qualität Ihrer Gespräche bestimmt die Qualität Ihrer Ergebnisse.',
      duration: '1–2 Tage',
      participants: '12–20 Teilnehmer',
      format: 'Präsenz (Inhouse)',
      availability: 'Flexibel buchbar',
      price: 'Ab 4.500 €',
      description: 'Ein praxisintensiver Workshop, der die Gesprächskultur in Ihrem Unternehmen auf ein neues Level hebt. Von schwierigen Feedbackgesprächen bis zu inspirierenden Präsentationen – Klarheit in der Kommunikation verändert alles.',
      essence: 'Wer klar spricht, wird gehört. Wer zuhört, wird verstanden.',
      includes: [
        'Kompakter Impuls zu bewusster Kommunikation',
        'Live-Übungen mit echten Situationen der Teilnehmer',
        'Feedback-Training (Geben & Empfangen)',
        'Werkzeuge für schwierige Gespräche',
        'Handout mit Praxis-Tools',
        'Optional: Follow-up Coaching'
      ],
      benefits: [
        { title: 'Souveräne Gesprächsführung', description: 'Führen Sie jedes Gespräch – ob Entwicklungsgespräch oder Verhandlung – mit Klarheit und Wirkung.' },
        { title: 'Konstruktive Konfliktlösung', description: 'Verwandeln Sie Spannungen in produktive Dialoge und nachhaltige Lösungen.' },
        { title: 'Stärkere Unternehmenskultur', description: 'Schaffen Sie eine Kultur der Offenheit, in der Feedback als Geschenk verstanden wird.' }
      ],
      ideal_for: ['Führungskräfte aller Ebenen', 'HR & People-Teams', 'Vertriebs- & Kundenteams', 'Projektleitungen'],
      program_outline: ['Grundlagen bewusster Kommunikation', 'Die Kunst des aktiven Zuhörens', 'Feedback als Führungsinstrument', 'Schwierige Gespräche meistern', 'Transfer in den Führungsalltag'],
      gradient: 'from-amber-500 to-orange-500',
      image: '/bildschirmfoto_2025-12-19_um_01.49.07.png',
      is_active: true,
      order_index: 3
    },
    {
      id: 'training-series-resilience',
      category: 'training-series',
      title: 'Resilient Leadership',
      subtitle: '6-teilige Trainingsreihe für belastbare Führung',
      tagline: 'Resilienz ist keine Eigenschaft, sondern eine tägliche Praxis.',
      duration: '6 × 1 Tag (monatlich)',
      participants: '8–12 Führungskräfte',
      format: 'Präsenz & Online-Begleitung',
      availability: 'Nächster Start: Q2 2026',
      price: 'Ab 12.500 €',
      description: 'Eine strukturierte Trainingsreihe, die Führungskräfte befähigt, auch unter hohem Druck klar, wirksam und gesund zu bleiben. Sechs aufeinander aufbauende Module mit Praxistransfer zwischen den Einheiten.',
      essence: 'Wer sich selbst führen kann, führt andere mit Leichtigkeit.',
      includes: [
        '6 Ganztages-Module über 6 Monate',
        'Begleitendes Online-Lernportal',
        'Peer-Coaching-Gruppen (je 3 Teilnehmer)',
        'Stress- und Resilienz-Assessment',
        'Individuelle Transferaufgaben',
        'Abschluss-Zertifikat'
      ],
      benefits: [
        { title: 'Stressresistenz aufbauen', description: 'Entwickeln Sie mentale Stärke und emotionale Stabilität für anspruchsvolle Führungssituationen.' },
        { title: 'Energie nachhaltig managen', description: 'Lernen Sie, Ihre Energie bewusst einzusetzen und langfristig leistungsfähig zu bleiben.' },
        { title: 'Vorbild-Funktion leben', description: 'Zeigen Sie Ihrem Team durch eigenes Vorbild, dass Leistung und Wohlbefinden kein Widerspruch sind.' }
      ],
      ideal_for: ['Führungskräfte unter hoher Belastung', 'Manager in Transformationsphasen', 'Teamleiter mit großer Verantwortung', 'Unternehmer & Geschäftsführer'],
      program_outline: ['Standortbestimmung & persönliches Resilienz-Profil', 'Mentale Stärke & Fokus unter Druck', 'Emotionale Intelligenz in der Führung', 'Energiemanagement & nachhaltige Performance', 'Umgang mit Unsicherheit & Veränderung', 'Integration & persönlicher Führungskompass'],
      gradient: 'from-emerald-500 to-teal-500',
      image: '/bildschirmfoto_2025-12-13_um_20.01.21.png',
      highlight: true,
      is_active: true,
      order_index: 4
    },
    {
      id: 'org-transformation',
      category: 'transformation',
      title: 'Organisationstransformation',
      subtitle: 'Begleitung für Unternehmen im Wandel',
      tagline: 'Transformation gelingt nicht durch neue Prozesse, sondern durch neues Bewusstsein.',
      duration: '6–12 Monate',
      participants: 'Gesamte Organisation',
      format: 'Vor Ort & Hybrid',
      availability: 'Nach Vorgespräch',
      price: 'Individuell',
      description: 'Ein ganzheitlicher Transformationsprozess, der Ihre Organisation von innen heraus verändert. Von der Geschäftsführung bis zur operativen Ebene – wir begleiten den Wandel mit Tiefe, Struktur und Konsequenz.',
      essence: 'Wenn sich das Bewusstsein einer Organisation verändert, verändert sich alles.',
      includes: [
        'Umfassende Organisations-Diagnose',
        'Strategische Transformations-Roadmap',
        'Leadership-Alignment auf C-Level',
        'Kultur-Workshops für alle Ebenen',
        'Change-Agent-Ausbildung (intern)',
        'Kontinuierliche Prozessbegleitung',
        'Regelmäßige Review & Anpassung'
      ],
      benefits: [
        { title: 'Echte Kulturveränderung', description: 'Erleben Sie, wie sich Unternehmenskultur tatsächlich wandelt – nicht nur auf dem Papier.' },
        { title: 'Erhöhte Anpassungsfähigkeit', description: 'Machen Sie Ihre Organisation fit für kontinuierlichen Wandel und neue Herausforderungen.' },
        { title: 'Messbare Ergebnisse', description: 'Verfolgen Sie den Transformationsfortschritt anhand klar definierter KPIs und Meilensteine.' }
      ],
      ideal_for: ['Unternehmen in strategischen Umbruchphasen', 'Organisationen nach Fusionen oder Übernahmen', 'Wachsende Unternehmen mit Kulturherausforderungen', 'Traditionelle Unternehmen auf dem Weg zur Agilität'],
      program_outline: ['Diagnose & Zieldefinition', 'Leadership Alignment', 'Pilot-Phase mit ausgewählten Teams', 'Breite Rollout-Phase', 'Verankerung & Nachhaltigkeit'],
      gradient: 'from-orange-500 to-amber-500',
      image: '/bildschirmfoto_2026-01-19_um_18.37.19.png',
      is_active: true,
      order_index: 5
    }
  ], []);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const { data } = await supabase
          .from('corporate_offers')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (data && data.length > 0) {
          setOffers(data);
        } else {
          setOffers(staticOffers);
        }
      } catch {
        setOffers(staticOffers);
      }
      setLoading(false);
    };

    loadOffers();
  }, [staticOffers]);

  const categories = useMemo(() => [
    { id: 'all', label: t.corporate.categories.all, icon: Sparkles },
    { id: 'workshop', label: t.corporate.categories.workshops, icon: Lightbulb },
    { id: 'training-series', label: t.corporate.categories.trainingSeries, icon: Target },
    { id: 'team-retreat', label: t.corporate.categories.teamRetreats, icon: Building2 },
    { id: 'leadership', label: t.corporate.categories.leadership, icon: Award },
    { id: 'transformation', label: t.corporate.categories.transformation, icon: TrendingUp }
  ], [t]);

  const filteredOffers = selectedCategory === 'all'
    ? offers
    : offers.filter(offer => offer.category === selectedCategory);

  const mobileEntryRoomsRef = useRef<HTMLDivElement>(null);
  const mobileOffersRef = useRef<HTMLDivElement>(null);
  const activeEntryRoomsIndex = useMobileSliderIndex(mobileEntryRoomsRef, ENTRY_CARDS.length, 768);
  const activeOffersIndex = useMobileSliderIndex(mobileOffersRef, filteredOffers.length, 768);

  const scrollToOffers = (categoryId: typeof ENTRY_CARDS[number]['category']) => {
    setSelectedCategory(categoryId);
    window.requestAnimationFrame(() => {
      document.getElementById('corporate-offers')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  // Monochrome Premium-Palette — alle Kategorien tragen dieselbe ruhige Editorial-Sprache.
  // Bronze ausschließlich als statische Hairline. Keine bunten UI-Farben.
  const ACCENT_BRONZE = 'rgba(214, 168, 94, 0.85)';
  const ACCENT_HAIRLINE = 'rgba(214, 168, 94, 0.35)';
  const TEXT_PRIMARY = '#F4F4F4';
  const TEXT_WARM = '#EADDCB';
  const TEXT_GRANITE = 'rgba(140, 138, 135, 0.92)';
  const SURFACE_CARD = 'rgba(13, 12, 11, 0.72)';
  const SURFACE_INSET = 'rgba(18, 16, 14, 0.55)';
  const SURFACE_HAIRLINE = 'rgba(244, 239, 231, 0.06)';

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: '#0A0A0A', color: TEXT_PRIMARY }}
    >
      {/* HERO SECTION — Premium-Architektur-Background, edge-to-edge.
          Bild als integrierter Raum, kein Banner. Mehrere Atmosphäre-Layer
          + Mask-Fade nach unten → organischer Übergang in die Cards-Section. */}
      <section
        className="relative isolate flex flex-col overflow-hidden"
        style={{
          minHeight: 'clamp(620px, 92svh, 940px)',
          backgroundColor: '#050403'
        }}
        aria-labelledby="corporate-hero-heading"
      >
        {/* Foto-Layer — voll abdeckend */}
        <div className="absolute inset-0 z-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('/images/corporate/corporate-hero-architecture.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center 56%',
              backgroundRepeat: 'no-repeat'
            }}
          />
          {/* Tiefen-Vignette — bringt Bildränder weich in den Raum */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(155% 110% at 50% 50%, rgba(0,0,0,0) 36%, rgba(0,0,0,0.30) 72%, rgba(0,0,0,0.72) 100%)'
            }}
          />
          {/* Lese-Lasur — dezent, hält Headline glasklar ohne Bild zu schwärzen */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(95% 70% at 50% 45%, rgba(4,4,5,0.40) 0%, rgba(4,4,5,0.25) 45%, rgba(4,4,5,0.05) 85%)'
            }}
          />
          {/* Bronze-Ambient — folgt der natürlichen Horizont-Lichtkante im Bild */}
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{
              background:
                'radial-gradient(70% 22% at 62% 58%, rgba(214,168,94,0.10) 0%, rgba(185,130,63,0.04) 40%, rgba(0,0,0,0) 72%)'
            }}
          />
          {/* Top-Fade — sauber unter die Nav blendend */}
          <div
            className="absolute inset-x-0 top-0 h-32 sm:h-40"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.34) 45%, rgba(0,0,0,0.10) 78%, rgba(0,0,0,0) 100%)'
            }}
          />
          {/* Bottom-Mask-Fade — organischer Übergang zur Cards-Section,
              endet exakt im Obsidian-Ton der nächsten Section (#0A0A0A) */}
          <div
            className="absolute inset-x-0 bottom-0 h-48 sm:h-60"
            style={{
              background:
                'linear-gradient(0deg, #0A0A0A 0%, rgba(10,10,10,0.92) 18%, rgba(10,10,10,0.62) 42%, rgba(10,10,10,0.28) 70%, rgba(10,10,10,0) 100%)'
            }}
          />
        </div>

        <div className="relative z-[1] flex flex-1 items-center w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-[7.5rem]">
          <div className="text-center w-full">
            {/* Editorial Eyebrow — kein Pill, freistehend mit feiner Bronze-Hairline */}
            <div className="flex flex-col items-center gap-4 mb-9 sm:mb-10">
              <span
                className="uppercase"
                style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 500,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.42em',
                  color: 'rgba(234, 221, 203, 0.78)',
                  textShadow:
                    '0 1px 14px rgba(0,0,0,0.78), 0 0 22px rgba(0,0,0,0.5)'
                }}
              >
                {t.corporate.badge}
              </span>
              <span
                aria-hidden
                className="block h-px"
                style={{
                  width: '2.25rem',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(214, 168, 94, 0.55) 50%, transparent 100%)'
                }}
              />
            </div>

            <h1
              id="corporate-hero-heading"
              className="mb-8 mx-auto"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 200,
                fontSize: 'clamp(2.05rem, 3vw + 1.45rem, 3.55rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.036em',
                color: TEXT_PRIMARY,
                maxWidth: '20ch',
                textShadow:
                  '0 2px 22px rgba(0,0,0,0.78), 0 0 38px rgba(0,0,0,0.48)'
              }}
            >
              <span>{t.corporate.heroTitle}</span>
              <br />
              <span style={{ color: TEXT_WARM, fontWeight: 200 }}>
                {(() => {
                  const sub = t.corporate.heroSubtitle ?? '';
                  const accent = (t.corporate as { heroAccent?: string }).heroAccent;
                  if (!accent || !sub.includes(accent)) {
                    return <span>{sub}</span>;
                  }
                  const [before, after] = sub.split(accent);
                  return (
                    <>
                      <span>{before}</span>
                      <span
                        style={{
                          color: TEXT_WARM,
                          fontStyle: 'italic',
                          fontWeight: 200,
                          letterSpacing: '-0.006em'
                        }}
                      >
                        {accent}
                      </span>
                      <span>{after}</span>
                    </>
                  );
                })()}
              </span>
            </h1>

            <p
              className="mx-auto"
              style={{
                fontFamily: FONT_BODY,
                fontWeight: 400,
                fontSize: 'clamp(0.9375rem, 0.4vw + 0.85rem, 1.0625rem)',
                lineHeight: 1.75,
                color: 'rgba(234, 226, 215, 0.86)',
                maxWidth: '40rem',
                letterSpacing: '-0.005em',
                textShadow:
                  '0 2px 18px rgba(0,0,0,0.78), 0 0 28px rgba(0,0,0,0.42)'
              }}
            >
              {t.corporate.heroDescription}
            </p>

            <div
              className="mx-auto mt-14 h-px"
              aria-hidden
              style={{
                maxWidth: '6rem',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(214, 168, 94, 0.42) 50%, transparent 100%)'
              }}
            />
          </div>
        </div>
      </section>

      {/* CARDS + FILTER SECTION — Premium-Atmosphäre-Bild als Hintergrund.
          Bild deutlich subtiler als im Hero, dunkle Mitte bleibt für Card-Lesbarkeit erhalten.
          Übergang aus Hero (Bottom-Fade endet in #0A0A0A) ist organisch. */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: '#0A0A0A' }}
        aria-label="Vier Räume und Angebotskategorien"
      >
        {/* Foto-Layer — sehr gedämpft, nur als Tiefen-Atmosphäre */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('/images/corporate/corporate-cards-atmosphere.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center 70%',
              backgroundRepeat: 'no-repeat',
              opacity: 0.55
            }}
          />
          {/* Dunkle Mitten-Lasur — Karten bleiben visuell dominant,
              schwarze Tiefe in der Mitte bewusst erhalten */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(95% 70% at 50% 50%, rgba(8,8,9,0.82) 0%, rgba(8,8,9,0.62) 38%, rgba(8,8,9,0.32) 72%, rgba(8,8,9,0.08) 100%)'
            }}
          />
          {/* Top-Fade — sauber aus Hero-Bottom (#0A0A0A) blendend */}
          <div
            className="absolute inset-x-0 top-0 h-32 sm:h-44"
            style={{
              background:
                'linear-gradient(180deg, #0A0A0A 0%, rgba(10,10,10,0.78) 35%, rgba(10,10,10,0.32) 70%, rgba(10,10,10,0) 100%)'
            }}
          />
          {/* Bottom-Fade — weicher Atemzug in den Offers-Bereich */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 sm:h-44"
            style={{
              background:
                'linear-gradient(0deg, #0A0A0A 0%, rgba(10,10,10,0.78) 35%, rgba(10,10,10,0.32) 70%, rgba(10,10,10,0) 100%)'
            }}
          />
          {/* Bronze-Ambient — folgt der natürlichen Lichtkante im Bild
              (rechte Hälfte / unteres Drittel), sehr fein */}
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{
              background:
                'radial-gradient(60% 38% at 78% 72%, rgba(214,168,94,0.06) 0%, rgba(185,130,63,0.025) 40%, rgba(0,0,0,0) 72%)'
            }}
          />
        </div>

        <div className="relative z-[1] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-14 lg:pb-16">
          {/* Einstieg: vier Zielgruppen-Räume */}
          <div className="mb-12 sm:mb-14">
            <div className="text-center max-w-2xl mx-auto mb-9 sm:mb-11">
              <span
                aria-hidden
                className="inline-block mb-5"
                style={{
                  height: 1,
                  width: 40,
                  background:
                    'linear-gradient(90deg, rgba(214, 168, 94, 0.45) 0%, rgba(214, 168, 94, 0) 100%)'
                }}
              />
              <h2
                className="mb-4"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 300,
                  fontSize: 'clamp(1.5rem, 1.4vw + 1rem, 1.9rem)',
                  letterSpacing: '-0.03em',
                  color: TEXT_PRIMARY,
                  lineHeight: 1.18
                }}
              >
                Vier Räume für bewusste Wirkung.
              </h2>
              <p
                className="px-2"
                style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 400,
                  fontSize: 'clamp(0.875rem, 0.4vw + 0.8rem, 0.9375rem)',
                  lineHeight: 1.6,
                  color: TEXT_GRANITE,
                  letterSpacing: '-0.005em'
                }}
              >
                Kultur, Führung und Teamdynamik verändern sich nicht durch mehr Druck — sondern durch klare Ausrichtung.
              </p>
            </div>

            <div
              ref={mobileEntryRoomsRef}
              className="-mx-4 flex scrollbar-hide snap-x snap-mandatory overflow-x-auto scroll-px-4 px-4 pb-3 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 xl:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0 md:px-0 md:snap-none gap-3 sm:gap-4"
              style={{
                scrollPaddingInline: '1rem',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {ENTRY_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="relative flex min-h-0 shrink-0 basis-[86%] max-w-[22rem] snap-center rounded-[14px] transition-[border-color,background-color,box-shadow] duration-[700ms] md:max-w-none md:basis-auto md:shrink"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(15, 13, 11, 0.88) 0%, rgba(10, 10, 11, 0.92) 100%)',
                    border: '1px solid rgba(244, 239, 231, 0.06)',
                    boxShadow:
                      'inset 0 1px 0 rgba(255, 248, 238, 0.04), 0 18px 48px -28px rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(8px) saturate(1.06)',
                    WebkitBackdropFilter: 'blur(8px) saturate(1.06)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(214, 168, 94, 0.22)';
                    e.currentTarget.style.boxShadow =
                      'inset 0 1px 0 rgba(255, 248, 238, 0.06), 0 22px 56px -26px rgba(0, 0, 0, 0.92), 0 0 0 1px rgba(214, 168, 94, 0.06) inset';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(244, 239, 231, 0.06)';
                    e.currentTarget.style.boxShadow =
                      'inset 0 1px 0 rgba(255, 248, 238, 0.04), 0 18px 48px -28px rgba(0, 0, 0, 0.85)';
                  }}
                >
                  <div className="flex min-h-[220px] sm:min-h-[240px] flex-col px-5 py-6 sm:px-6 sm:py-7 w-full">
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 300,
                        fontSize: 'clamp(1rem, 0.4vw + 0.95rem, 1.0625rem)',
                        letterSpacing: '-0.02em',
                        color: TEXT_PRIMARY,
                        lineHeight: 1.25
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="flex-1 mb-5"
                      style={{
                        fontFamily: FONT_BODY,
                        fontWeight: 400,
                        fontSize: 'clamp(0.8125rem, 0.3vw + 0.78rem, 0.875rem)',
                        lineHeight: 1.6,
                        color: 'rgba(234, 221, 203, 0.78)',
                        letterSpacing: '-0.005em'
                      }}
                    >
                      {card.body}
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollToOffers(card.category)}
                      className="mt-auto inline-flex items-center gap-1.5 self-start border-0 bg-transparent p-0 cursor-pointer group/cta focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(214,168,94,0.32)] rounded-sm transition-[color] duration-[600ms]"
                      style={{
                        fontFamily: FONT_BODY,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        letterSpacing: '0.06em',
                        color: TEXT_WARM
                      }}
                    >
                      <span className="group-hover/cta:text-[#F4F4F4] transition-colors duration-[600ms]">
                        {card.cta}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <MobileSliderDots count={ENTRY_CARDS.length} active={activeEntryRoomsIndex} hideAt="md" />
          </div>

          {/* Category Filter — monochrome Editorial Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-6 sm:pt-7 mb-10 border-t border-[rgba(244,239,231,0.05)]">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full transition-[border-color,background-color,color] duration-[600ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(214,168,94,0.32)]"
                  style={{
                    fontFamily: FONT_BODY,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    letterSpacing: '0.04em',
                    border: `1px solid ${isActive ? 'rgba(214, 168, 94, 0.26)' : 'rgba(244, 239, 231, 0.08)'}`,
                    background: isActive
                      ? 'linear-gradient(180deg, rgba(22, 19, 16, 0.88) 0%, rgba(14, 13, 12, 0.92) 100%)'
                      : 'rgba(12, 12, 13, 0.7)',
                    color: isActive ? TEXT_PRIMARY : 'rgba(234, 221, 203, 0.7)',
                    boxShadow: isActive
                      ? 'inset 0 1px 0 rgba(255, 248, 238, 0.05), 0 8px 22px -14px rgba(0,0,0,0.7)'
                      : '0 4px 14px -10px rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)'
                  }}
                >
                  <Icon size={13} strokeWidth={1.6} style={{ opacity: isActive ? 0.9 : 0.55 }} />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <div
        id="corporate-offers"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pt-6 sm:pb-16 scroll-mt-[4.5rem]"
      >
        {loading ? (
          <div className="text-center py-24">
            <div
              className="w-10 h-10 rounded-full animate-spin mx-auto mb-5 border-[1.5px] border-solid border-t-transparent"
              style={{ borderColor: 'rgba(214, 168, 94, 0.55)', borderTopColor: 'transparent', animationDuration: '1.6s' }}
            />
            <p
              style={{ fontFamily: FONT_BODY, fontWeight: 400, color: TEXT_GRANITE, fontSize: '0.875rem', letterSpacing: '0.04em' }}
            >
              {t.corporate.loading}
            </p>
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="text-center py-24">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-7"
              style={{
                background: 'rgba(18, 16, 14, 0.55)',
                border: '1px solid rgba(214, 168, 94, 0.18)'
              }}
            >
              <Briefcase className="w-5 h-5" strokeWidth={1.4} style={{ color: ACCENT_BRONZE }} />
            </div>
            <h3
              className="mb-3"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 300, fontSize: 'clamp(1.25rem, 1vw + 1rem, 1.6rem)', color: TEXT_PRIMARY, letterSpacing: '-0.025em' }}
            >
              {t.corporate.noOffersFound}
            </h3>
            <p
              className="max-w-md mx-auto"
              style={{ fontFamily: FONT_BODY, fontWeight: 400, color: TEXT_GRANITE, fontSize: '0.9375rem', lineHeight: 1.6 }}
            >
              {t.corporate.noOffersDescription}
            </p>
          </div>
        ) : (
          <>
            <div
              ref={mobileOffersRef}
              className="-mx-4 flex scrollbar-hide snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 md:px-0 md:snap-none lg:gap-7"
              style={{ WebkitOverflowScrolling: 'touch', scrollPaddingInline: '1rem' }}
            >
              {filteredOffers.map((offer, offerIdx) => {
              const isExpanded = expandedOffer === offer.id;
              const categoryLabel = categories.find(c => c.id === offer.category)?.label;
              const orderNumber = String(offer.order_index ?? offerIdx + 1).padStart(2, '0');
              const detailsId = `offer-details-${offer.id}`;

              return (
                <div
                  key={offer.id}
                  className="relative w-full max-w-[26rem] shrink-0 basis-[88%] snap-center md:max-w-none md:basis-auto md:shrink md:snap-none"
                >
                  {/* Card — kompakt, aufklappbar, editorial */}
                  <div
                    className="relative overflow-hidden rounded-[18px] transition-[border-color,box-shadow] duration-[700ms]"
                    style={{
                      background: 'linear-gradient(180deg, rgba(13, 12, 11, 0.78) 0%, rgba(10, 10, 11, 0.82) 100%)',
                      border: `1px solid ${isExpanded ? 'rgba(214,168,94,0.18)' : SURFACE_HAIRLINE}`,
                      boxShadow:
                        '0 28px 70px -36px rgba(0, 0, 0, 0.72), inset 0 1px 0 rgba(255, 248, 238, 0.035)'
                    }}
                  >
                    {/* ── COMPACT HEAD — der ganze obere Bereich ist der Toggle ── */}
                    <button
                      type="button"
                      onClick={() => setExpandedOffer(isExpanded ? null : offer.id)}
                      aria-expanded={isExpanded}
                      aria-controls={detailsId}
                      className="block w-full text-left px-7 sm:px-9 lg:px-10 pt-8 sm:pt-9 pb-7 sm:pb-8 transition-colors duration-[500ms] hover:bg-[rgba(18,16,14,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[rgba(214,168,94,0.32)] cursor-pointer"
                    >
                      {/* Top Row — Kategorie + Highlight (links) | Order + Toggle (rechts) */}
                      <div className="flex items-start justify-between gap-5">
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 min-w-0">
                          <span
                            className="uppercase"
                            style={{
                              fontFamily: FONT_BODY,
                              fontWeight: 500,
                              fontSize: '0.6875rem',
                              letterSpacing: '0.24em',
                              color: 'rgba(234, 221, 203, 0.72)'
                            }}
                          >
                            {categoryLabel}
                          </span>

                          {offer.highlight && (
                            <>
                              <span
                                aria-hidden
                                className="block h-px w-4"
                                style={{
                                  background:
                                    'linear-gradient(90deg, rgba(214,168,94,0.4) 0%, rgba(214,168,94,0) 100%)'
                                }}
                              />
                              <span
                                className="uppercase"
                                style={{
                                  fontFamily: FONT_BODY,
                                  fontWeight: 500,
                                  fontSize: '0.625rem',
                                  letterSpacing: '0.26em',
                                  color: ACCENT_BRONZE
                                }}
                              >
                                {t.corporate.popular}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-4 flex-shrink-0">
                          <span
                            aria-hidden
                            style={{
                              fontFamily: FONT_DISPLAY,
                              fontWeight: 200,
                              fontSize: 'clamp(0.78rem, 0.9vw, 0.875rem)',
                              color: 'rgba(234, 221, 203, 0.4)',
                              letterSpacing: '0.18em',
                              fontFeatureSettings: '"tnum","lnum"'
                            }}
                          >
                            {orderNumber}
                          </span>

                          <span
                            aria-hidden
                            className="inline-flex items-center justify-center h-9 w-9 rounded-full transition-[border-color,background-color,transform] duration-[500ms]"
                            style={{
                              border: `1px solid ${isExpanded ? 'rgba(214,168,94,0.34)' : 'rgba(244,239,231,0.10)'}`,
                              background: isExpanded
                                ? 'rgba(214, 168, 94, 0.06)'
                                : 'rgba(18, 16, 14, 0.5)'
                            }}
                          >
                            <ChevronDown
                              size={14}
                              strokeWidth={1.5}
                              className={`transition-transform duration-[600ms] ease-out ${isExpanded ? 'rotate-180' : ''}`}
                              style={{ color: isExpanded ? ACCENT_BRONZE : 'rgba(234, 221, 203, 0.62)' }}
                            />
                          </span>
                        </div>
                      </div>

                      {/* Hairline */}
                      <div
                        className="mt-6 h-px w-full"
                        aria-hidden
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(214, 168, 94, 0.32) 0%, rgba(244, 239, 231, 0.04) 32%, rgba(244, 239, 231, 0) 100%)'
                        }}
                      />

                      {/* Title + Subtitle */}
                      <div className="mt-7">
                        <h3
                          className="mb-3"
                          style={{
                            fontFamily: FONT_DISPLAY,
                            fontWeight: 300,
                            fontSize: 'clamp(1.5rem, 1.1vw + 1rem, 1.875rem)',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.12,
                            color: TEXT_PRIMARY
                          }}
                        >
                          {offer.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: FONT_BODY,
                            fontWeight: 400,
                            fontSize: '0.875rem',
                            lineHeight: 1.55,
                            color: TEXT_GRANITE,
                            letterSpacing: '-0.005em'
                          }}
                        >
                          {offer.subtitle}
                        </p>
                      </div>
                    </button>

                    {/* ── EXPANDABLE BODY — sanftes Auf- und Zuklappen ── */}
                    <div
                      id={detailsId}
                      className="grid transition-[grid-template-rows] duration-[700ms] ease-out motion-reduce:transition-none"
                      style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
                      aria-hidden={!isExpanded}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="px-7 sm:px-9 lg:px-10 pb-2 transition-opacity duration-[500ms]"
                          style={{ opacity: isExpanded ? 1 : 0 }}
                        >
                          {/* Tagline Quote */}
                          <div className="mt-2 mb-8 pl-6 sm:pl-7 py-2 relative">
                            <span
                              aria-hidden
                              className="absolute left-0 top-1 bottom-1 w-px"
                              style={{
                                background:
                                  'linear-gradient(180deg, rgba(214,168,94,0.45) 0%, rgba(214,168,94,0.10) 100%)'
                              }}
                            />
                            <p
                              style={{
                                fontFamily: FONT_DISPLAY,
                                fontWeight: 300,
                                fontStyle: 'italic',
                                fontSize: 'clamp(0.9375rem, 0.6vw + 0.85rem, 1.05rem)',
                                lineHeight: 1.5,
                                color: TEXT_WARM,
                                letterSpacing: '-0.005em'
                              }}
                            >
                              {`„${offer.tagline}"`}
                            </p>
                          </div>

                          {/* Info Grid */}
                          <div
                            className="grid grid-cols-2 gap-x-5 gap-y-4 mb-8 pb-8"
                            style={{ borderBottom: `1px solid ${SURFACE_HAIRLINE}` }}
                          >
                            {[
                              { icon: Clock, label: t.corporate.duration, value: offer.duration },
                              { icon: Users, label: t.corporate.participants, value: offer.participants },
                              { icon: MapPin, label: t.corporate.format, value: offer.format },
                              { icon: Zap, label: t.seminare.availability, value: offer.availability }
                            ].map(({ icon: Icon, label, value }) => (
                              <div key={label} className="flex items-start gap-3">
                                <Icon
                                  size={14}
                                  strokeWidth={1.4}
                                  className="mt-0.5 flex-shrink-0"
                                  style={{ color: 'rgba(234, 221, 203, 0.55)' }}
                                />
                                <div className="min-w-0">
                                  <div
                                    className="uppercase mb-1"
                                    style={{
                                      fontFamily: FONT_BODY,
                                      fontWeight: 500,
                                      fontSize: '0.625rem',
                                      letterSpacing: '0.2em',
                                      color: 'rgba(140, 138, 135, 0.7)'
                                    }}
                                  >
                                    {label}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: FONT_BODY,
                                      fontWeight: 500,
                                      fontSize: '0.875rem',
                                      color: TEXT_PRIMARY,
                                      letterSpacing: '-0.005em',
                                      lineHeight: 1.4
                                    }}
                                  >
                                    {value}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Description */}
                          <p
                            className="mb-8"
                            style={{
                              fontFamily: FONT_BODY,
                              fontWeight: 400,
                              fontSize: '0.9375rem',
                              lineHeight: 1.7,
                              color: 'rgba(234, 221, 203, 0.78)',
                              letterSpacing: '-0.005em'
                            }}
                          >
                            {offer.description}
                          </p>

                          {/* Essence */}
                          <div
                            className="mb-9 px-6 py-5 rounded-[12px] text-center"
                            style={{
                              background: SURFACE_INSET,
                              border: `1px solid ${SURFACE_HAIRLINE}`
                            }}
                          >
                            <p
                              style={{
                                fontFamily: FONT_DISPLAY,
                                fontWeight: 300,
                                fontStyle: 'italic',
                                fontSize: 'clamp(0.875rem, 0.4vw + 0.85rem, 0.9375rem)',
                                lineHeight: 1.6,
                                color: TEXT_WARM,
                                letterSpacing: '-0.005em'
                              }}
                            >
                              {offer.essence}
                            </p>
                          </div>

                          {/* Includes / Benefits / Ideal-For / Outline */}
                          <div className="space-y-10">
                            {offer.includes.length > 0 && (
                              <div>
                                <h4
                                  className="uppercase mb-5 flex items-center gap-2.5"
                                  style={{
                                    fontFamily: FONT_BODY,
                                    fontWeight: 500,
                                    fontSize: '0.6875rem',
                                    letterSpacing: '0.24em',
                                    color: ACCENT_BRONZE
                                  }}
                                >
                                  <span
                                    aria-hidden
                                    className="block h-px w-8"
                                    style={{
                                      background:
                                        'linear-gradient(90deg, rgba(214,168,94,0.55) 0%, rgba(214,168,94,0) 100%)'
                                    }}
                                  />
                                  <span>{t.corporate.includedTitle}</span>
                                </h4>
                                <div className="space-y-3">
                                  {offer.includes.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-3"
                                      style={{
                                        fontFamily: FONT_BODY,
                                        fontWeight: 400,
                                        fontSize: '0.875rem',
                                        lineHeight: 1.6,
                                        color: 'rgba(234, 221, 203, 0.85)'
                                      }}
                                    >
                                      <CheckCircle2
                                        size={14}
                                        className="mt-1 flex-shrink-0"
                                        strokeWidth={1.4}
                                        style={{ color: 'rgba(234, 221, 203, 0.55)' }}
                                      />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {offer.benefits.length > 0 && (
                              <div>
                                <h4
                                  className="uppercase mb-5 flex items-center gap-2.5"
                                  style={{
                                    fontFamily: FONT_BODY,
                                    fontWeight: 500,
                                    fontSize: '0.6875rem',
                                    letterSpacing: '0.24em',
                                    color: ACCENT_BRONZE
                                  }}
                                >
                                  <span
                                    aria-hidden
                                    className="block h-px w-8"
                                    style={{
                                      background:
                                        'linear-gradient(90deg, rgba(214,168,94,0.55) 0%, rgba(214,168,94,0) 100%)'
                                    }}
                                  />
                                  <span>{t.corporate.benefitsTitle}</span>
                                </h4>
                                <div className="space-y-4">
                                  {offer.benefits.map((benefit, index) => (
                                    <div key={index} className="pl-5 py-2 relative">
                                      <span
                                        aria-hidden
                                        className="absolute left-0 top-1 bottom-1 w-px"
                                        style={{
                                          background:
                                            'linear-gradient(180deg, rgba(214,168,94,0.32) 0%, rgba(214,168,94,0.06) 100%)'
                                        }}
                                      />
                                      <div
                                        className="mb-1.5"
                                        style={{
                                          fontFamily: FONT_DISPLAY,
                                          fontWeight: 400,
                                          fontSize: '0.9375rem',
                                          letterSpacing: '-0.015em',
                                          color: TEXT_PRIMARY,
                                          lineHeight: 1.35
                                        }}
                                      >
                                        {benefit.title}
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: FONT_BODY,
                                          fontWeight: 400,
                                          fontSize: '0.8125rem',
                                          lineHeight: 1.6,
                                          color: 'rgba(234, 221, 203, 0.7)',
                                          letterSpacing: '-0.005em'
                                        }}
                                      >
                                        {benefit.description}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {offer.ideal_for.length > 0 && (
                              <div>
                                <h4
                                  className="uppercase mb-5 flex items-center gap-2.5"
                                  style={{
                                    fontFamily: FONT_BODY,
                                    fontWeight: 500,
                                    fontSize: '0.6875rem',
                                    letterSpacing: '0.24em',
                                    color: ACCENT_BRONZE
                                  }}
                                >
                                  <span
                                    aria-hidden
                                    className="block h-px w-8"
                                    style={{
                                      background:
                                        'linear-gradient(90deg, rgba(214,168,94,0.55) 0%, rgba(214,168,94,0) 100%)'
                                    }}
                                  />
                                  <span>{t.corporate.idealForTitle}</span>
                                </h4>
                                <div className="space-y-3">
                                  {offer.ideal_for.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-3"
                                      style={{
                                        fontFamily: FONT_BODY,
                                        fontWeight: 400,
                                        fontSize: '0.875rem',
                                        lineHeight: 1.6,
                                        color: 'rgba(234, 221, 203, 0.85)'
                                      }}
                                    >
                                      <ChevronsRight
                                        size={14}
                                        className="mt-1 flex-shrink-0"
                                        strokeWidth={1.6}
                                        style={{ color: 'rgba(214, 168, 94, 0.62)' }}
                                      />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {offer.program_outline.length > 0 && (
                              <div>
                                <h4
                                  className="uppercase mb-5 flex items-center gap-2.5"
                                  style={{
                                    fontFamily: FONT_BODY,
                                    fontWeight: 500,
                                    fontSize: '0.6875rem',
                                    letterSpacing: '0.24em',
                                    color: ACCENT_BRONZE
                                  }}
                                >
                                  <span
                                    aria-hidden
                                    className="block h-px w-8"
                                    style={{
                                      background:
                                        'linear-gradient(90deg, rgba(214,168,94,0.55) 0%, rgba(214,168,94,0) 100%)'
                                    }}
                                  />
                                  <span>{t.corporate.programOutline}</span>
                                </h4>
                                <div className="space-y-3.5">
                                  {offer.program_outline.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                      <span
                                        aria-hidden
                                        className="flex-shrink-0 mt-0.5"
                                        style={{
                                          fontFamily: FONT_DISPLAY,
                                          fontWeight: 300,
                                          fontSize: '0.75rem',
                                          letterSpacing: '0.1em',
                                          color: 'rgba(214, 168, 94, 0.6)',
                                          fontFeatureSettings: '"tnum","lnum"',
                                          minWidth: '1.5rem'
                                        }}
                                      >
                                        {String(index + 1).padStart(2, '0')}
                                      </span>
                                      <span
                                        style={{
                                          fontFamily: FONT_BODY,
                                          fontWeight: 400,
                                          fontSize: '0.875rem',
                                          lineHeight: 1.6,
                                          color: 'rgba(234, 221, 203, 0.85)',
                                          letterSpacing: '-0.005em'
                                        }}
                                      >
                                        {item}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── PRICE + CTA — immer sichtbar, der „direkte Einstieg" ── */}
                    <div
                      className="px-7 sm:px-9 lg:px-10 pt-6 pb-7 sm:pb-8"
                      style={{ borderTop: `1px solid ${SURFACE_HAIRLINE}` }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-6">
                        <div className="min-w-0">
                          <div
                            className="uppercase mb-1.5"
                            style={{
                              fontFamily: FONT_BODY,
                              fontWeight: 500,
                              fontSize: '0.625rem',
                              letterSpacing: '0.24em',
                              color: 'rgba(140, 138, 135, 0.7)'
                            }}
                          >
                            {t.corporate.price}
                          </div>
                          <div
                            style={{
                              fontFamily: FONT_DISPLAY,
                              fontWeight: 300,
                              fontSize: 'clamp(1.375rem, 1vw + 0.95rem, 1.6875rem)',
                              letterSpacing: '-0.03em',
                              color: TEXT_PRIMARY,
                              lineHeight: 1.1,
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {offer.price}
                          </div>
                        </div>

                        <a
                          href="#contact"
                          onClick={(e) => e.stopPropagation()}
                          className="group/cta inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[11px] transition-[transform,background-color,box-shadow] duration-[700ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(214,168,94,0.32)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(10,10,11,0.9)] flex-shrink-0"
                          style={{
                            fontFamily: FONT_BODY,
                            fontWeight: 500,
                            fontSize: '0.8125rem',
                            letterSpacing: '0.05em',
                            background: '#F4F4F4',
                            color: '#0A0A0A',
                            boxShadow:
                              '0 12px 30px -16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                          }}
                        >
                          <span>{t.corporate.requestOffer}</span>
                          <ChevronsRight
                            size={14}
                            strokeWidth={1.8}
                            className="transition-transform duration-[600ms] group-hover/cta:translate-x-0.5"
                            style={{ opacity: 0.8 }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
            <MobileSliderDots count={filteredOffers.length} active={activeOffersIndex} hideAt="md" />
          </>
        )}
      </div>

      {/* CTA — full-bleed, kinematisch: kein Card-Chassis, Wings/Horizon-Background + Lesbarkeit */}
      <section
        className="relative isolate overflow-hidden pb-[clamp(5.25rem,12vw,7.75rem)] pt-[clamp(4.75rem,11vw,7.25rem)] text-center"
        style={{ backgroundColor: '#070605' }}
        aria-labelledby="corporate-cta-heading"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black" aria-hidden>
          <div
            className="absolute inset-0 scale-[1.02]"
            style={{
              backgroundImage: "url('/images/portfolio/portfolio-intro-horizon-wings-bg.png')",
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center 42%',
              opacity: 0.86,
              filter: 'saturate(0.98) contrast(1.03)'
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(62% 72% at 50% 48%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.36) 45%, rgba(0,0,0,0.12) 72%, rgba(0,0,0,0) 100%)'
            }}
          />
          <div className="absolute inset-0 bg-[rgba(4,4,5,0.22)]" />
          <div
            className="absolute inset-x-0 top-0 h-36 sm:h-44"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.5) 48%, rgba(10,10,10,0) 100%)'
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-36 sm:h-44"
            style={{
              background:
                'linear-gradient(0deg, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.52) 45%, rgba(10,10,10,0) 100%)'
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.55]"
            style={{
              boxShadow: 'inset 0 0 min(72vw, 520px) rgba(0,0,0,0.52)'
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-32 mix-blend-screen sm:h-40"
            style={{
              background:
                'radial-gradient(62% 100% at 50% 100%, rgba(214,168,94,0.06) 0%, rgba(120,92,54,0.02) 42%, transparent 72%)'
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,168,94,0.16)] to-transparent" />
        </div>

        <div className="relative z-[1] mx-auto w-full max-w-xl px-6 sm:px-8 lg:max-w-[34rem] lg:px-10">
          <div
            className="mx-auto mb-[clamp(1.75rem,3.5vw,2.35rem)] h-px w-[min(52%,14rem)]"
            aria-hidden
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(214, 168, 94, 0.48) 50%, transparent 100%)'
            }}
          />

          <h2
            id="corporate-cta-heading"
            className="m-0 text-balance px-1 sm:px-0"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 100,
              fontSize: 'clamp(1.65rem, 1.1rem + 1.85vw, 2.375rem)',
              letterSpacing: '-0.036em',
              lineHeight: 1.08,
              color: TEXT_PRIMARY,
              textShadow:
                '0 2px 28px rgba(0,0,0,0.65), 0 1px 0 rgba(0,0,0,0.55), 0 0 1px rgba(0,0,0,0.8)'
            }}
          >
            {t.corporate.ctaTitle}
          </h2>

          <p
            className="mx-auto mb-[clamp(2rem,4vw,2.65rem)] mt-5 max-w-[28rem] text-pretty px-2 sm:px-0 sm:mt-6"
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 400,
              fontSize: 'clamp(0.90625rem, 0.35vw + 0.84rem, 1rem)',
              lineHeight: 1.68,
              color: `${TEXT_WARM}ee`,
              letterSpacing: '-0.006em',
              textShadow: '0 1px 18px rgba(0,0,0,0.55), 0 0 1px rgba(0,0,0,0.75)'
            }}
          >
            {t.corporate.ctaDescription}
          </p>

          <a
            href="#contact"
            className="group/cta-executive hover:-translate-y-px hover:shadow-[0_28px_64px_-30px_rgba(0,0,0,0.9)] active:translate-y-0 inline-flex min-h-[52px] items-center justify-center rounded-[11px] px-[clamp(1.65rem,3.5vw,2.125rem)] py-3 transition-[transform,box-shadow,border-color,background-color] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(214,168,94,0.4)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(6,6,7,0.95)]"
            style={{
              fontFamily: FONT_BODY,
              fontWeight: 500,
              fontSize: '0.8125rem',
              letterSpacing: '0.05em',
              background: '#F4F4F4',
              color: '#0A0A0A',
              border: '1px solid rgba(255, 252, 245, 0.38)',
              boxShadow:
                '0 22px 52px -26px rgba(0, 0, 0, 0.88), inset 0 1px 0 rgba(255, 255, 255, 0.72), inset 0 -1px 0 rgba(0, 0, 0, 0.05)'
            }}
          >
            <span>{t.corporate.ctaButton}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
