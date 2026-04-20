import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { ArrowRight, Sparkles, Infinity, Circle, Eye, Brain, Heart, Calendar, MapPin, Users, Clock, Check, Star, Video, Wifi, Monitor, PlayCircle, Download, Globe, Zap, Award, BookOpen, Headphones, MessageCircle, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

type FormatFilter = 'all' | 'praesenz' | 'online-live' | 'webinar' | 'on-demand' | 'hybrid';
type SeminarFormat = 'praesenz' | 'online-live' | 'webinar' | 'on-demand' | 'hybrid';

interface Seminar {
  id: string;
  format: SeminarFormat;
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  price: string;
  capacity: string;
  dates: Array<{ month: string; days: string; year: string; location: string; available: number }>;
  description: string;
  essence: string;
  includes: string[];
  transformationen: Array<{ von: string; zu: string }>;
  module: Array<{ tag: string; title: string; content: string }>;
  gradient: string;
  image: string;
}

const SeminarCard = memo(({
  seminar,
  isActive,
  onMouseEnter,
  onMouseLeave,
  t
}: {
  seminar: Seminar;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  t: any;
}) => {
  const formatConfig = useMemo(() => {
    const configs = {
      praesenz: { label: t.formats.praesenz, colorFrom: 'rgb(251, 191, 36)', colorTo: 'rgb(245, 158, 11)', icon: Users },
      'online-live': { label: t.formats.onlineLive, colorFrom: 'rgb(251, 146, 60)', colorTo: 'rgb(249, 115, 22)', icon: Video },
      webinar: { label: t.formats.webinar, colorFrom: 'rgb(234, 179, 8)', colorTo: 'rgb(202, 138, 4)', icon: Monitor },
      'on-demand': { label: t.formats.onDemand, colorFrom: 'rgb(234, 88, 12)', colorTo: 'rgb(194, 65, 12)', icon: PlayCircle },
      hybrid: { label: t.formats.hybrid, colorFrom: 'rgb(245, 158, 11)', colorTo: 'rgb(217, 119, 6)', icon: Wifi }
    };
    return configs[seminar.format];
  }, [seminar.format, t]);

  const FormatIcon = formatConfig.icon;

  return (
    <div
      className="group relative overflow-hidden rounded-[28px] sm:rounded-[32px] transition-all duration-500"
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.4)',
        willChange: isActive ? 'transform' : 'auto'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0">
        <img
          src={seminar.image}
          alt={seminar.title}
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95" />
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-br ${seminar.gradient} transition-opacity duration-700`}
        style={{ opacity: isActive ? 0.4 : 0 }}
      />

      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-14">
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 flex-wrap">
                <div
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[10px] sm:rounded-[12px]"
                  style={{
                    background: `linear-gradient(135deg, ${formatConfig.colorFrom}, ${formatConfig.colorTo})`,
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <FormatIcon size={13} className="text-white sm:w-[14px] sm:h-[14px]" strokeWidth={2} />
                  <span className="text-white text-[10px] sm:text-[11px] font-[620] tracking-[0.1em] uppercase">
                    {formatConfig.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[10px] sm:rounded-[12px] bg-amber-500/10 border border-amber-500/25">
                  <Sparkles size={13} className="text-amber-400 sm:w-[14px] sm:h-[14px]" strokeWidth={2} />
                  <span className="text-amber-400/90 text-[10px] sm:text-[11px] font-[620] tracking-[0.1em] uppercase">
                    {seminar.subtitle}
                  </span>
                </div>
              </div>

              <h3 className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[52px] font-[740] text-white mb-4 tracking-[-0.04em] leading-[1.05]">
                {seminar.title}
              </h3>

              <p className="text-[14px] sm:text-[15px] md:text-[16px] text-white/65 font-[440] leading-[1.8] mb-6">
                {seminar.description}
              </p>

              <div className="p-5 sm:p-6 rounded-[18px] sm:rounded-[20px] bg-amber-500/5 border border-amber-500/20 mb-6 sm:mb-8">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles size={18} className="text-amber-400/80 mt-0.5 sm:w-5 sm:h-5 flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-[15px] sm:text-[16px] md:text-[17px] font-[600] text-amber-400/95 leading-[1.6] tracking-[-0.01em]">
                    {seminar.tagline}
                  </p>
                </div>
                <p className="text-white/40 text-[12px] sm:text-[13px] font-[440] italic leading-[1.7] pl-7 sm:pl-8">
                  {seminar.essence}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-white/70 text-[11px] sm:text-[12px] font-[640] tracking-[0.12em] mb-4 sm:mb-5 uppercase">
                {t.seminare.includes}
              </h4>
              <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
                {seminar.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={15} className="text-amber-400 flex-shrink-0 mt-0.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                    <span className="text-white/60 text-[12px] sm:text-[13px] font-[460] leading-[1.6]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white/70 text-[11px] sm:text-[12px] font-[640] tracking-[0.12em] mb-4 sm:mb-5 uppercase">
                {t.seminare.program}
              </h4>
              <div className="space-y-3">
                {seminar.module.map((modul, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-[14px] sm:rounded-[16px] bg-white/5 border border-white/10"
                  >
                    <div className="flex-shrink-0 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[8px] bg-amber-500/15 border border-amber-500/25">
                      <span className="text-amber-400 text-[10px] sm:text-[11px] font-[640] tracking-[0.05em]">
                        {modul.tag}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white text-[14px] sm:text-[15px] font-[600] mb-2 tracking-[-0.01em]">
                        {modul.title}
                      </h5>
                      <p className="text-white/50 text-[12px] sm:text-[13px] font-[440] leading-[1.7]">
                        {modul.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white/70 text-[11px] sm:text-[12px] font-[640] tracking-[0.12em] mb-4 sm:mb-5 uppercase">
                {t.seminare.transformation}
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {seminar.transformationen.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-[12px] sm:rounded-[14px] bg-white/5 border border-white/10"
                  >
                    <span className="text-white/35 text-[12px] sm:text-[13px] font-[460] flex-1 text-right">
                      {t.von}
                    </span>
                    <ArrowRight size={13} className="text-amber-400/50 flex-shrink-0 sm:w-[14px] sm:h-[14px]" strokeWidth={2} />
                    <span className="text-white/75 text-[12px] sm:text-[13px] font-[580] flex-1">
                      {t.zu}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-[20px] sm:rounded-[24px] lg:sticky lg:top-24 bg-white/10 border border-white/20">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white/10 border border-white/15">
                    <Clock size={13} className="text-white/70 sm:w-[14px] sm:h-[14px]" strokeWidth={2} />
                    <span className="text-white/70 text-[11px] sm:text-[12px] font-[560]">{seminar.duration}</span>
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-white/50 text-[11px] sm:text-[12px] font-[520] tracking-[0.05em] uppercase">{t.seminare.price}</span>
                </div>
                <div className="text-[40px] sm:text-[48px] font-[760] text-white tracking-[-0.03em] leading-[1] mb-6 sm:mb-8">
                  {seminar.price}
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <h5 className="text-white/70 text-[11px] sm:text-[12px] font-[640] tracking-[0.1em] mb-4 uppercase">
                  {seminar.format === 'on-demand' ? t.seminare.availability : t.seminare.dates}
                </h5>
                <div className="space-y-3">
                  {seminar.dates.map((date, i) => (
                    <div
                      key={i}
                      className="p-3.5 sm:p-4 rounded-[12px] sm:rounded-[14px] bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-[14px] sm:text-[15px] font-[600]">
                          {date.days} {date.month}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={11} className="text-white/50 sm:w-3 sm:h-3" strokeWidth={2} />
                          <span className="text-white/60 text-[11px] sm:text-[12px] font-[500]">{date.location}</span>
                        </div>
                      </div>
                      {date.available < 999 && (
                        <div className="flex items-center gap-2">
                          <Users size={11} className="text-white/40 sm:w-3 sm:h-3" strokeWidth={2} />
                          <span className="text-white/40 text-[10px] sm:text-[11px] font-[480]">
                            {date.available} {t.seminare.available}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="w-full group h-[52px] sm:h-[56px] px-6 rounded-[14px] sm:rounded-[16px] transition-all duration-300 active:scale-[0.97] mb-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:shadow-lg"
              >
                <span className="flex items-center justify-center gap-2 text-black text-[13px] sm:text-[14px] font-[620]">
                  {t.buttons.bookNow}
                  <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1 sm:w-4 sm:h-4" strokeWidth={2.5} />
                </span>
              </button>

              <div className="text-center">
                <span className="text-white/40 text-[10px] sm:text-[11px] font-[440]">
                  {seminar.capacity !== t.seminare.unlimited && `${t.seminare.max} ${seminar.capacity} • `}
                  {t.seminare.securePayment}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SeminarCard.displayName = 'SeminarCard';

export default function Seminare() {
  const { t } = useLanguage();
  const [activeSeminar, setActiveSeminar] = useState<number | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<FormatFilter>('all');
  const [seminare, setSeminare] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const staticSeminars: Seminar[] = useMemo(() => [
    {
      id: 'klarheit-intensiv',
      format: 'praesenz',
      title: 'Klarheit Intensiv',
      subtitle: '3-Tage Transformations-Seminar',
      tagline: 'Vom Denken ins Sein – der direkte Weg zur inneren Klarheit.',
      duration: '3 Tage (Fr–So)',
      price: 'Ab 1.490 €',
      capacity: 'Max. 25 Teilnehmer',
      dates: [
        { month: 'Mai', days: '16–18', year: '2026', location: 'München', available: 8 },
        { month: 'Juli', days: '10–12', year: '2026', location: 'Berlin', available: 12 },
        { month: 'Sep', days: '18–20', year: '2026', location: 'Zürich', available: 20 }
      ],
      description: 'Drei Tage intensive Bewusstseinsarbeit. Du lernst, den Verstand zu beruhigen, Klarheit zu finden und aus innerer Stille heraus zu handeln. Keine Theorie – reine Praxis, präzise geführt.',
      essence: 'Klarheit ist kein Zustand, den man erreicht. Es ist das, was bleibt, wenn man aufhört zu suchen.',
      includes: [
        'Geführte Bewusstseinsübungen & Meditationen',
        'Individuelle Standortbestimmung',
        'Praxis-Tools für den Alltag',
        'Persönliches Integrations-Gespräch',
        'Verpflegung & Getränke inklusive',
        'Zugang zur Teilnehmer-Community'
      ],
      transformationen: [
        { von: 'Grübeln', zu: 'Klarheit' },
        { von: 'Reaktivität', zu: 'Bewusste Antwort' },
        { von: 'Unruhe', zu: 'Innere Stille' }
      ],
      module: [
        { tag: 'Tag 1', title: 'Ankommen & Ausrichtung', content: 'Den Verstand erkennen. Stille finden. Präsenz als Fundament etablieren.' },
        { tag: 'Tag 2', title: 'Vertiefung & Durchbruch', content: 'Kernmuster auflösen. Bewusste Wahrnehmung schulen. Integration beginnen.' },
        { tag: 'Tag 3', title: 'Integration & Transfer', content: 'Das Erfahrene verankern. Konkrete Alltagsstrategien. Persönlicher Weg nach vorn.' }
      ],
      gradient: 'from-amber-400 to-orange-500',
      image: '/bildschirmfoto_2025-12-19_um_01.49.07.png'
    },
    {
      id: 'fuehrung-masterclass',
      format: 'praesenz',
      title: 'Führung aus Bewusstsein',
      subtitle: '5-Tage Masterclass für Führungskräfte',
      tagline: 'Wer sich selbst führen kann, führt andere mit natürlicher Autorität.',
      duration: '5 Tage (Mo–Fr)',
      price: 'Ab 3.900 €',
      capacity: 'Max. 15 Teilnehmer',
      dates: [
        { month: 'Jun', days: '8–12', year: '2026', location: 'Kitzbühel', available: 5 },
        { month: 'Okt', days: '5–9', year: '2026', location: 'Hamburg', available: 15 }
      ],
      description: 'Die intensive Masterclass für Führungskräfte, die ihre Wirksamkeit auf ein neues Level bringen wollen. Fünf Tage Tiefenarbeit an Präsenz, Entscheidungsstärke und authentischer Führung.',
      essence: 'Echte Führung braucht keinen Druck. Sie entsteht aus Klarheit und Präsenz.',
      includes: [
        '5 intensive Tagesmodule',
        'Persönliches Führungs-Assessment',
        '1:1 Coaching-Session mit Anatoly',
        'Führungs-Toolkit & Praxishandbuch',
        'Exklusive Retreat-Location inkl. Verpflegung',
        '3 Monate Follow-up Begleitung'
      ],
      transformationen: [
        { von: 'Kontrolle', zu: 'Vertrauen' },
        { von: 'Druck', zu: 'Inspiration' },
        { von: 'Management', zu: 'Wahre Führung' }
      ],
      module: [
        { tag: 'Tag 1', title: 'Selbstführung', content: 'Die Basis: Innere Ordnung, Präsenz und klare Selbstwahrnehmung als Führungsfundament.' },
        { tag: 'Tag 2', title: 'Bewusste Kommunikation', content: 'Zuhören, Sprechen, Schweigen – die drei Dimensionen wirkungsvoller Führungskommunikation.' },
        { tag: 'Tag 3', title: 'Entscheidungsintelligenz', content: 'Jenseits von Pro-Contra-Listen: Zugang zur intuitiven Klarheit für stimmige Entscheidungen.' },
        { tag: 'Tag 4', title: 'Team & Kultur', content: 'Wie du ein Umfeld erschaffst, in dem Menschen natürlich wachsen und leisten.' },
        { tag: 'Tag 5', title: 'Integration & Vision', content: 'Dein persönlicher Führungskompass. Konkrete nächste Schritte und Langzeitstrategie.' }
      ],
      gradient: 'from-cyan-400 to-blue-500',
      image: '/bildschirmfoto_2026-01-10_um_12.29.12.png'
    },
    {
      id: 'online-bewusstsein',
      format: 'online-live',
      title: 'Bewusstsein Online',
      subtitle: 'Live-Seminar via Zoom',
      tagline: 'Tiefe braucht keinen Ort – nur Offenheit.',
      duration: '4 Abende (je 2,5h)',
      price: '490 €',
      capacity: 'Max. 40 Teilnehmer',
      dates: [
        { month: 'Mai', days: '6, 13, 20, 27', year: '2026', location: 'Online (Zoom)', available: 25 },
        { month: 'Aug', days: '4, 11, 18, 25', year: '2026', location: 'Online (Zoom)', available: 40 }
      ],
      description: 'Vier intensive Abende, die dein Bewusstsein nachhaltig erweitern. Live geführte Praxis, klare Impulse und direkter Austausch – alles von zu Hause aus.',
      essence: 'Der wichtigste Raum ist nicht der äußere, sondern der innere.',
      includes: [
        '4 Live-Sessions à 2,5 Stunden',
        'Aufzeichnungen aller Sessions',
        'Geführte Meditationen zum Download',
        'Wöchentliche Praxis-Aufgaben',
        'Community-Zugang',
        'Q&A mit Anatoly'
      ],
      transformationen: [
        { von: 'Ablenkung', zu: 'Fokus' },
        { von: 'Stress', zu: 'Gelassenheit' },
        { von: 'Zweifel', zu: 'Vertrauen' }
      ],
      module: [
        { tag: 'Abend 1', title: 'Grundlagen der Präsenz', content: 'Den Geist beruhigen. Ankommen im Hier und Jetzt.' },
        { tag: 'Abend 2', title: 'Muster erkennen', content: 'Automatische Reaktionen sichtbar machen und loslassen.' },
        { tag: 'Abend 3', title: 'Stille & Kraft', content: 'Die Kraft der inneren Stille entdecken und nutzen.' },
        { tag: 'Abend 4', title: 'Integration', content: 'Das Erlernte verankern und in den Alltag tragen.' }
      ],
      gradient: 'from-orange-400 to-amber-500',
      image: '/bildschirmfoto_2025-12-13_um_20.01.21.png'
    },
    {
      id: 'on-demand-grundlagen',
      format: 'on-demand',
      title: 'Grundlagen der Achtsamkeit',
      subtitle: 'Selbstlernkurs – Jederzeit starten',
      tagline: 'Dein Tempo. Dein Weg. Deine Tiefe.',
      duration: '8 Module (je 60 Min.)',
      price: '290 €',
      capacity: 'Unbegrenzt',
      dates: [
        { month: 'Jederzeit', days: 'verfügbar', year: '', location: 'Online (On-Demand)', available: 999 }
      ],
      description: 'Ein strukturierter Selbstlernkurs, der dich Schritt für Schritt in die Praxis der Achtsamkeit einführt. 8 aufeinander aufbauende Module mit Video-Lektionen, geführten Meditationen und Reflexionsaufgaben.',
      essence: 'Der erste Schritt ist nicht der schwierigste – er ist der wichtigste.',
      includes: [
        '8 Video-Module (je 45–60 Min.)',
        '16 geführte Meditationen',
        'Begleitendes Workbook (PDF)',
        'Lebenslanger Zugang',
        'Community-Forum',
        'Zertifikat bei Abschluss'
      ],
      transformationen: [
        { von: 'Autopilot', zu: 'Bewusstheit' },
        { von: 'Hektik', zu: 'Ruhe' },
        { von: 'Oberfläche', zu: 'Tiefe' }
      ],
      module: [
        { tag: 'Modul 1–2', title: 'Fundament', content: 'Was Achtsamkeit wirklich ist und wie du sie in deinen Alltag integrierst.' },
        { tag: 'Modul 3–4', title: 'Vertiefung', content: 'Körperwahrnehmung, Atempraxis und geführte Meditation.' },
        { tag: 'Modul 5–6', title: 'Anwendung', content: 'Achtsame Kommunikation, Stressmanagement und bewusste Entscheidungen.' },
        { tag: 'Modul 7–8', title: 'Integration', content: 'Langfristige Praxis etablieren und persönlichen Weg definieren.' }
      ],
      gradient: 'from-rose-400 to-pink-500',
      image: '/bildschirmfoto_2026-01-19_um_18.47.55.png'
    },
    {
      id: 'hybrid-retreat',
      format: 'hybrid',
      title: 'Wochenend-Retreat Hybrid',
      subtitle: 'Vor Ort oder Live-Stream',
      tagline: 'Verbunden sein – egal wo du bist.',
      duration: '2 Tage (Sa–So)',
      price: 'Ab 690 €',
      capacity: 'Max. 30 Präsenz + 50 Online',
      dates: [
        { month: 'Jun', days: '28–29', year: '2026', location: 'Frankfurt + Online', available: 18 },
        { month: 'Nov', days: '14–15', year: '2026', location: 'Wien + Online', available: 30 }
      ],
      description: 'Ein intensives Wochenende, das du wahlweise vor Ort oder im Live-Stream erlebst. Beide Formate sind vollwertig integriert – du bist mittendrin, nicht nur dabei.',
      essence: 'Transformation kennt keine Entfernung.',
      includes: [
        '2 volle Tage Live-Programm',
        'Interaktive Breakout-Sessions',
        'Geführte Praxis & Reflexion',
        'Vollverpflegung (Präsenz)',
        'Aufzeichnung für 30 Tage',
        'Praxis-Guide zum Mitnehmen'
      ],
      transformationen: [
        { von: 'Isolation', zu: 'Verbundenheit' },
        { von: 'Theorie', zu: 'Erfahrung' },
        { von: 'Alltag', zu: 'Tiefe' }
      ],
      module: [
        { tag: 'Samstag', title: 'Öffnung & Tiefe', content: 'Ankommen, Ausrichtung finden und in die Tiefe der Bewusstseinsarbeit eintauchen.' },
        { tag: 'Sonntag', title: 'Integration & Kraft', content: 'Das Erfahrene verankern, persönliche Erkenntnisse und den Transfer in den Alltag gestalten.' }
      ],
      gradient: 'from-emerald-400 to-teal-500',
      image: '/bildschirmfoto_2026-01-02_um_22.35.10.png'
    }
  ], []);

  useEffect(() => {
    const loadSeminars = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: fetchError } = await supabase
          .from('seminars')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (fetchError || !data || data.length === 0) {
          setSeminare(staticSeminars);
        } else {
          setSeminare(data);
        }
      } catch {
        setSeminare(staticSeminars);
      } finally {
        setLoading(false);
      }
    };

    loadSeminars();
  }, [staticSeminars]);

  const formats = useMemo(() => [
    { id: 'all' as FormatFilter, label: t.seminare.filter.all, icon: Globe },
    { id: 'praesenz' as FormatFilter, label: t.formats.praesenz, icon: Users },
    { id: 'online-live' as FormatFilter, label: t.formats.onlineLive, icon: Video },
    { id: 'webinar' as FormatFilter, label: t.formats.webinar, icon: Monitor },
    { id: 'on-demand' as FormatFilter, label: t.formats.onDemand, icon: PlayCircle },
    { id: 'hybrid' as FormatFilter, label: t.formats.hybrid, icon: Wifi }
  ], [t]);

  const essenceElements = useMemo(() => [
    { icon: Eye, title: t.seminare.essenceElements.presence.title, description: t.seminare.essenceElements.presence.description },
    { icon: Brain, title: t.seminare.essenceElements.awareness.title, description: t.seminare.essenceElements.awareness.description },
    { icon: Heart, title: t.seminare.essenceElements.devotion.title, description: t.seminare.essenceElements.devotion.description }
  ], [t]);

  const stats = useMemo(() => [
    { number: '50.000+', label: t.home.stats.transformed, icon: Users },
    { number: '500+', label: t.home.stats.seminars, icon: Calendar },
    { number: '20+', label: t.home.stats.experience, icon: Award },
    { number: '98%', label: t.home.stats.satisfaction, icon: Star }
  ], [t]);

  const features = useMemo(() => [
    {
      icon: Video,
      title: t.seminare.features.streaming.title,
      description: t.seminare.features.streaming.description
    },
    {
      icon: Download,
      title: t.seminare.features.recordings.title,
      description: t.seminare.features.recordings.description
    },
    {
      icon: MessageCircle,
      title: t.seminare.features.interactive.title,
      description: t.seminare.features.interactive.description
    },
    {
      icon: Headphones,
      title: t.seminare.features.support.title,
      description: t.seminare.features.support.description
    },
    {
      icon: BookOpen,
      title: t.seminare.features.materials.title,
      description: t.seminare.features.materials.description
    },
    {
      icon: Globe,
      title: t.seminare.features.global.title,
      description: t.seminare.features.global.description
    }
  ], [t]);

  const testimonials = useMemo(() => [
    {
      quote: t.seminare.testimonials.testimonial1.quote,
      name: t.seminare.testimonials.testimonial1.name,
      role: t.seminare.testimonials.testimonial1.role,
      seminar: t.seminare.testimonials.testimonial1.seminar,
      format: t.seminare.testimonials.testimonial1.format,
      rating: 5
    },
    {
      quote: t.seminare.testimonials.testimonial2.quote,
      name: t.seminare.testimonials.testimonial2.name,
      role: t.seminare.testimonials.testimonial2.role,
      seminar: t.seminare.testimonials.testimonial2.seminar,
      format: t.seminare.testimonials.testimonial2.format,
      rating: 5
    },
    {
      quote: t.seminare.testimonials.testimonial3.quote,
      name: t.seminare.testimonials.testimonial3.name,
      role: t.seminare.testimonials.testimonial3.role,
      seminar: t.seminare.testimonials.testimonial3.seminar,
      format: t.seminare.testimonials.testimonial3.format,
      rating: 5
    },
    {
      quote: t.seminare.testimonials.testimonial4.quote,
      name: t.seminare.testimonials.testimonial4.name,
      role: t.seminare.testimonials.testimonial4.role,
      seminar: t.seminare.testimonials.testimonial4.seminar,
      format: t.seminare.testimonials.testimonial4.format,
      rating: 5
    }
  ], [t]);

  const filteredSeminare = useMemo(() =>
    selectedFormat === 'all' ? seminare : seminare.filter(s => s.format === selectedFormat),
    [selectedFormat, seminare]
  );

  const handleSeminarHover = useCallback((idx: number) => {
    setActiveSeminar(idx);
  }, []);

  const handleSeminarLeave = useCallback(() => {
    setActiveSeminar(null);
  }, []);

  const handleFormatChange = useCallback((format: FormatFilter) => {
    setSelectedFormat(format);
  }, []);

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-red-400/80 mb-4 text-6xl">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">Fehler beim Laden</h2>
          <p className="text-white/50 mb-6">{error}</p>
          <button
            onClick={() => loadSeminars()}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-lg transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  if (loading && seminare.length === 0) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin mb-4"></div>
          <p className="text-white/50 text-sm">{t.common.loading || 'Laden...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* HERO SECTION WITH IMAGE */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Conference and Speaking"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-black" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[800px] rounded-full opacity-[0.15] blur-[200px]"
            style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)' }}
          />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center relative z-10 py-32 sm:py-40">
          <Infinity size={48} className="mx-auto text-amber-400/20 mb-10 sm:mb-12 sm:w-16 sm:h-16" strokeWidth={0.8} />

          <h1 className="text-[56px] sm:text-[72px] md:text-[84px] lg:text-[96px] font-[750] mb-8 sm:mb-10 tracking-[-0.055em] leading-[0.9] bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent" dangerouslySetInnerHTML={{ __html: t.seminare.heroTitle.replace(/\n/g, '<br />') }} />

          <p className="text-white/40 text-[15px] sm:text-[17px] md:text-[18px] font-[480] leading-[1.85] tracking-[0.01em] max-w-[800px] mx-auto mb-6 sm:mb-8 px-4">
            {t.seminare.heroSubtitle}
          </p>

          <p className="text-amber-400/60 text-[14px] sm:text-[15px] font-[540] leading-[1.8] tracking-[0.015em] max-w-[680px] mx-auto italic mb-12 sm:mb-16 px-4">
            {t.seminare.heroDescription}
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-16 sm:mb-20 px-4">
            {essenceElements.map((element, idx) => (
              <div
                key={idx}
                className="group px-4 sm:px-6 py-2.5 sm:py-3 rounded-[14px] sm:rounded-[16px] transition-all duration-500 hover:scale-105 bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <element.icon size={16} className="text-amber-400/70 group-hover:text-amber-400 transition-colors sm:w-[18px] sm:h-[18px]" strokeWidth={1.8} />
                  <span className="text-white/60 text-[12px] sm:text-[13px] font-[520] group-hover:text-white/80 transition-colors">{element.description}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="group rounded-[16px] sm:rounded-[18px] px-10 sm:px-14 py-5 sm:py-6 transition-all duration-500 bg-gradient-to-r from-amber-400 to-orange-500 hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto">
            <span className="flex items-center justify-center gap-2.5 sm:gap-3 text-black text-[14px] sm:text-[15px] font-[640] tracking-[0.02em]">
              {t.common.allOffers}
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-2 sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-[20px] sm:rounded-[24px] text-center bg-white/5 border border-white/10">
                <stat.icon size={28} className="mx-auto text-amber-400/40 mb-5 sm:mb-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                <div className="text-[32px] sm:text-[38px] md:text-[42px] font-[740] text-white mb-2 tracking-[-0.03em]">{stat.number}</div>
                <div className="text-white/50 text-[11px] sm:text-[12px] md:text-[13px] font-[480]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="py-12 sm:py-16 relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-12">
            <Filter size={18} className="mx-auto text-white/30 mb-3 sm:mb-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
            <h3 className="text-white/70 text-[12px] sm:text-[13px] font-[640] tracking-[0.12em] uppercase mb-6 sm:mb-8">
              {t.seminare.filter.all}
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {formats.map((format) => {
              const FormatIcon = format.icon;
              const isActive = selectedFormat === format.id;

              return (
                <button
                  key={format.id}
                  onClick={() => handleFormatChange(format.id)}
                  className="px-5 sm:px-8 py-3 sm:py-4 rounded-[14px] sm:rounded-[16px] transition-all duration-300 border"
                  style={{
                    background: isActive ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                    borderColor: isActive ? 'rgba(251, 191, 36, 0.4)' : 'rgba(255, 255, 255, 0.12)',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FormatIcon
                      size={16}
                      className={`${isActive ? 'text-amber-400' : 'text-white/60'} transition-colors sm:w-[18px] sm:h-[18px]`}
                      strokeWidth={1.8}
                    />
                    <span className={`${isActive ? 'text-amber-400' : 'text-white/60'} text-[13px] sm:text-[14px] font-[560] transition-colors`}>
                      {format.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEMINARS SECTION */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {filteredSeminare.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">{t.seminare.noSeminars || 'Keine Seminare verfügbar'}</p>
            </div>
          ) : (
            <div className="space-y-10 sm:space-y-12">
              {filteredSeminare.map((seminar, idx) => (
                <SeminarCard
                  key={seminar.id}
                  seminar={seminar}
                  isActive={activeSeminar === idx}
                  onMouseEnter={() => handleSeminarHover(idx)}
                  onMouseLeave={handleSeminarLeave}
                  t={t}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ONLINE FEATURES SECTION */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Technology"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <Zap size={20} className="mx-auto text-cyan-400/40 mb-8 sm:mb-10 sm:w-6 sm:h-6" strokeWidth={1.5} />
            <h2 className="text-[36px] sm:text-[42px] md:text-[48px] lg:text-[56px] font-[720] text-white mb-6 sm:mb-8 tracking-[-0.045em]">
              {t.seminare.onlineExperience}
            </h2>
            <p className="text-white/35 text-[14px] sm:text-[15px] font-[460] max-w-[640px] mx-auto leading-[1.85] px-4">
              {t.seminare.onlineExperienceDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-[20px] sm:rounded-[24px] bg-white/5 border border-white/10">
                <feature.icon size={26} className="text-cyan-400/60 mb-5 sm:mb-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
                <h3 className="text-white text-[16px] sm:text-[17px] md:text-[18px] font-[620] mb-3 tracking-[-0.01em]">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-[13px] sm:text-[14px] font-[440] leading-[1.7]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <Circle size={4} className="mx-auto text-amber-400/40 fill-current mb-8 sm:mb-10" />
            <h2 className="text-[36px] sm:text-[42px] md:text-[48px] lg:text-[56px] font-[720] text-white mb-6 sm:mb-8 tracking-[-0.045em]">
              {t.home.testimonials.title}
            </h2>
            <p className="text-white/35 text-[14px] sm:text-[15px] font-[460] max-w-[640px] mx-auto leading-[1.85] px-4">
              {t.seminare.experienceTransformation}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-[20px] sm:rounded-[24px] bg-white/5 border border-white/10">
                <div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-current sm:w-[14px] sm:h-[14px]" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-white/70 text-[13px] sm:text-[14px] font-[440] leading-[1.75] mb-5 sm:mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="pt-4 sm:pt-5 border-t border-white/10">
                  <p className="text-white text-[12px] sm:text-[13px] font-[580] mb-1">{testimonial.name}</p>
                  <p className="text-white/50 text-[11px] sm:text-[12px] font-[440] mb-3">{testimonial.role}</p>
                  <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-[8px] bg-amber-500/10 border border-amber-500/20">
                    <span className="text-amber-400/80 text-[9px] sm:text-[10px] font-[560]">{testimonial.format}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-32 sm:py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Begin your journey"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] h-[900px] rounded-full opacity-[0.08] blur-[180px]"
            style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, transparent 70%)' }}
          />
        </div>

        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="p-12 sm:p-16 md:p-20 rounded-[28px] sm:rounded-[36px] bg-white/5 border border-white/10">
            <Infinity size={44} className="mx-auto text-amber-400/15 mb-10 sm:mb-12 sm:w-14 sm:h-14" strokeWidth={0.9} />

            <h2 className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-[740] text-white mb-6 sm:mb-8 tracking-[-0.045em] leading-[1.1]" dangerouslySetInnerHTML={{ __html: t.seminare.findYourFormat.replace(/\n/g, '<br />') }} />

            <p className="text-white/50 text-[15px] sm:text-[16px] md:text-[17px] font-[460] leading-[1.8] max-w-[700px] mx-auto mb-10 sm:mb-12 px-4">
              {t.seminare.findFormatDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center px-4">
              <button className="group h-[56px] sm:h-[64px] px-10 sm:px-12 rounded-[16px] sm:rounded-[18px] transition-all duration-300 active:scale-[0.97] bg-gradient-to-r from-amber-400 to-orange-500 hover:shadow-xl w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2.5 sm:gap-3 text-black text-[14px] sm:text-[15px] font-[640]">
                  {t.buttons.bookNow}
                  <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1 sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
                </span>
              </button>

              <button className="group h-[56px] sm:h-[64px] px-10 sm:px-12 rounded-[16px] sm:rounded-[18px] transition-all duration-300 active:scale-[0.97] bg-white/10 border border-white/20 hover:bg-white/15 w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2.5 sm:gap-3 text-white text-[14px] sm:text-[15px] font-[540]">
                  <Calendar size={16} strokeWidth={2} className="sm:w-[18px] sm:h-[18px]" />
                  {t.seminare.viewAllDates}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
