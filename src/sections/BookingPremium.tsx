import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronsRight,
  Loader2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  MapPin,
  Users,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

/**
 * /booking — Executive Aufnahme-Flow mit Live-Anbindung
 *
 * Behält das Premium-Design (Stein, Bronze, Champagne-Typo), reintegriert aber
 * die komplette Live-Datenanbindung:
 *
 *  • Live-Daten aus seminars / coaching_packages / corporate_offers
 *  • Live-Kalender (blocked_time_slots + bestehende bookings + Seminartermine)
 *  • Realtime-Subscription — Änderungen im Admin erscheinen sofort
 *  • Echte bookings-INSERTs mit allen Pflichtfeldern (Admin-Calendar sichtbar)
 */

const FONT_HEAD = "'Montserrat', system-ui, -apple-system, sans-serif";
const FONT_BODY =
  "'Avenir Next', 'Avenir', 'Nunito Sans', 'Inter', system-ui, -apple-system, sans-serif";

const HL_STYLE: React.CSSProperties = {
  color: '#C99B62',
  fontWeight: 500,
  letterSpacing: '0.005em',
};

function Hl({ children }: { children: React.ReactNode }) {
  return <span style={HL_STYLE}>{children}</span>;
}

/* -------------------- Types -------------------- */

type Category = 'seminars' | 'coaching' | 'corporate' | 'other';

interface SeminarRow {
  id: string;
  format: string;
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  price: string;
  capacity: string;
  dates: Array<{ month?: string; days?: string; year?: string | number; location?: string; available?: boolean }>;
  image: string;
  is_active: boolean;
  order_index: number;
}

interface CoachingRow {
  id: string;
  tier: string;
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  price: string;
  sessions: string;
  format: string;
  availability: string;
  highlight: boolean;
  is_active: boolean;
  order_index: number;
}

interface CorporateRow {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  participants: string;
  format: string;
  availability: string;
  price: string;
  highlight: boolean;
  is_active: boolean;
  order_index: number;
}

type ServiceData =
  | { kind: 'seminar'; row: SeminarRow }
  | { kind: 'coaching'; row: CoachingRow }
  | { kind: 'corporate'; row: CorporateRow }
  | { kind: 'other'; row: { id: string; title: string; subtitle?: string; price?: string } };

interface FormState {
  fullName: string;
  role: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}

const INITIAL_FORM: FormState = {
  fullName: '',
  role: '',
  organization: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
};

type StepId = 'category' | 'service' | 'date' | 'identity' | 'review';
const STEPS: StepId[] = ['category', 'service', 'date', 'identity', 'review'];
const stepTitles: Record<StepId, string> = {
  category: 'Bereich',
  service: 'Format',
  date: 'Termin',
  identity: 'Du',
  review: 'Aufnahme',
};

const OTHER_TRACKS: { id: string; title: string; subtitle: string }[] = [
  { id: 'keynote', title: 'Keynote-Vortrag', subtitle: 'Auftritt für Kontexte mit Anspruch.' },
  { id: 'other', title: 'Etwas anderes', subtitle: 'Schreib es ruhig — ich höre zu, bevor ich antworte.' },
];

/* -------------------- Kalender-Helpers -------------------- */

const MONTHS_DE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];
const MONTH_INDEX_DE: Record<string, number> = {
  januar: 0, februar: 1, märz: 2, marz: 2, april: 3, mai: 4, juni: 5,
  juli: 6, august: 7, september: 8, oktober: 9, november: 10, dezember: 11,
};
const DAYS_DE_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

interface BlockedSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  reason?: string;
}

interface BookingLite {
  id: string;
  event_date: string;
  event_time?: string | null;
  status: string;
}

/** Parst seminars.dates → liefert YYYY-MM-DD Strings aller Termine. */
function parseSeminarDates(seminars: SeminarRow[]): string[] {
  const out: string[] = [];
  for (const sem of seminars) {
    if (!Array.isArray(sem.dates)) continue;
    for (const d of sem.dates) {
      if (!d) continue;
      const month = typeof d.month === 'string' ? MONTH_INDEX_DE[d.month.trim().toLowerCase()] : undefined;
      const year = typeof d.year === 'number' ? d.year : parseInt(String(d.year ?? ''), 10);
      const daysRaw = d.days ?? '';
      if (month === undefined || !year || !daysRaw) continue;
      // "12-14" oder "5, 6, 7" oder einzelner Tag "10"
      const dayTokens = String(daysRaw).split(/[,;]/).flatMap((tok) => {
        const range = tok.trim().match(/^(\d{1,2})\s*[-–]\s*(\d{1,2})$/);
        if (range) {
          const a = parseInt(range[1], 10);
          const b = parseInt(range[2], 10);
          const list: number[] = [];
          for (let i = Math.min(a, b); i <= Math.max(a, b); i++) list.push(i);
          return list;
        }
        const single = tok.trim().match(/^(\d{1,2})$/);
        return single ? [parseInt(single[1], 10)] : [];
      });
      for (const day of dayTokens) {
        const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        out.push(iso);
      }
    }
  }
  return out;
}

/* -------------------- Main Component -------------------- */

export default function BookingPremium() {
  const [step, setStep] = useState<StepId>('category');

  const [category, setCategory] = useState<Category | null>(null);
  const [seminars, setSeminars] = useState<SeminarRow[]>([]);
  const [coaching, setCoaching] = useState<CoachingRow[]>([]);
  const [corporate, setCorporate] = useState<CorporateRow[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:00');

  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Live-Daten laden + Realtime-Subscription
  const loadServices = useCallback(async () => {
    setLoadingServices(true);
    try {
      const [semRes, coachRes, corpRes] = await Promise.all([
        supabase.from('seminars').select('*').eq('is_active', true).order('order_index'),
        supabase.from('coaching_packages').select('*').eq('is_active', true).order('order_index'),
        supabase.from('corporate_offers').select('*').eq('is_active', true).order('order_index'),
      ]);
      if (semRes.data) setSeminars(semRes.data as SeminarRow[]);
      if (coachRes.data) setCoaching(coachRes.data as CoachingRow[]);
      if (corpRes.data) setCorporate(corpRes.data as CorporateRow[]);
    } catch (e) {
      console.error('Failed to load services:', e);
    } finally {
      setLoadingServices(false);
    }
  }, []);

  useEffect(() => {
    loadServices();

    // Realtime — sobald Admin im Panel etwas ändert (Seminare/Coaching/Corporate),
    // sieht der User die Änderung sofort beim Buchen.
    const ch = supabase
      .channel('booking-services-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'seminars' }, loadServices)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'coaching_packages' }, loadServices)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'corporate_offers' }, loadServices)
      .subscribe();

    return () => {
      supabase.removeChannel(ch);
    };
  }, [loadServices]);

  // UX — sanftes Scrollen bei Step-Wechsel
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canContinue = useMemo(() => {
    if (step === 'category') return !!category;
    if (step === 'service') return !!serviceData;
    if (step === 'date') return !!selectedDate && !!selectedTime;
    if (step === 'identity') {
      return (
        form.fullName.trim().length >= 2 &&
        /^\S+@\S+\.\S+$/.test(form.email.trim()) &&
        form.phone.trim().length >= 3
      );
    }
    return form.consent;
  }, [step, category, serviceData, selectedDate, selectedTime, form]);

  const goNext = () => {
    const i = STEPS.indexOf(step);
    if (i < STEPS.length - 1) setStep(STEPS[i + 1]);
  };
  const goBack = () => {
    const i = STEPS.indexOf(step);
    if (i > 0) setStep(STEPS[i - 1]);
  };

  const handleSubmit = async () => {
    if (!canContinue || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const serviceTypeName = (() => {
        if (!serviceData) return 'Aufnahme';
        if (serviceData.kind === 'seminar') return `Seminar: ${serviceData.row.title}`;
        if (serviceData.kind === 'coaching') return `Coaching: ${serviceData.row.title}`;
        if (serviceData.kind === 'corporate') return `Corporate: ${serviceData.row.title}`;
        return `Anfrage: ${serviceData.row.title}`;
      })();

      const priceField = (() => {
        if (!serviceData) return null;
        if (serviceData.kind === 'other') return serviceData.row.price ?? null;
        return (serviceData.row as { price?: string }).price ?? null;
      })();

      const formatField = (() => {
        if (!serviceData) return null;
        if (serviceData.kind === 'seminar') return serviceData.row.format ?? null;
        if (serviceData.kind === 'coaching') return serviceData.row.format ?? null;
        if (serviceData.kind === 'corporate') return serviceData.row.format ?? null;
        return null;
      })();

      const messageBody = [
        formatField && `Format: ${formatField}`,
        priceField && `Investment-Rahmen: ${priceField}`,
        form.message?.trim() && `Kontext: ${form.message.trim()}`,
      ]
        .filter(Boolean)
        .join('\n');

      const insertPayload = {
        service_type: serviceTypeName,
        customer_name: form.fullName.trim(),
        customer_email: form.email.trim(),
        customer_phone: form.phone.trim(),       // NOT NULL → required
        company: form.organization.trim() || '', // NOT NULL → leerer String
        role: form.role.trim() || '',            // NOT NULL → leerer String
        event_date: selectedDate || null,
        event_time: selectedTime || '10:00',
        duration_hours: 2,
        location: formatField || '',
        audience_size: serviceData?.kind === 'corporate' ? (serviceData.row.participants ?? '') : '',
        budget: priceField || '',
        objective: serviceTypeName,
        message: messageBody,
        status: 'pending',
        priority: 'high',
      };

      const { error: insertError } = await supabase.from('bookings').insert(insertPayload);
      if (insertError) throw insertError;

      setSubmittedEmail(form.email.trim());
      setSubmitted(true);
    } catch (e) {
      console.error('Booking submit error:', e);
      setError(
        'Übermittlung nicht möglich. Bitte schreib uns kurz an mail@anatoly-mook.de — wir antworten innerhalb von 24 h.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#050505', fontFamily: FONT_BODY }}
    >
      {/* Stein-Hintergrund + Vignette + sanfter Bronze-Schein */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: 'url(/images/manifest/footer-stone-granite-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 80% at 50% 28%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.82) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(50% 40% at 50% 16%, rgba(214,168,94,0.07) 0%, rgba(0,0,0,0) 65%)',
        }}
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1180px] px-6 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-24 pb-24">
        {/* Top-Bar */}
        <div className="flex items-center justify-between gap-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[11.5px] font-medium tracking-[0.28em] uppercase text-[rgba(214,168,94,0.55)] hover:text-[rgba(244,239,230,0.92)] transition-colors duration-300"
          >
            <ArrowLeft size={13} strokeWidth={1.75} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>Zurück</span>
          </Link>

          {!submitted && (
            <div className="flex items-center gap-4 select-none">
              <span
                className="text-[11.5px] font-medium uppercase tracking-[0.28em]"
                style={{ color: 'rgba(214,168,94,0.7)' }}
              >
                Aufnahme&nbsp;
                <span style={{ color: 'rgba(244,239,230,0.9)' }}>
                  {String(stepIndex + 1).padStart(2, '0')}
                </span>
                <span style={{ color: 'rgba(214,168,94,0.45)' }}> / 0{STEPS.length}</span>
              </span>
              <div
                className="relative h-px w-32 sm:w-44"
                style={{ background: 'rgba(214,168,94,0.12)' }}
                aria-hidden
              >
                <div
                  className="absolute left-0 top-0 h-px transition-[width] duration-700"
                  style={{
                    width: `${progress}%`,
                    background:
                      'linear-gradient(90deg, rgba(214,168,94,0.85) 0%, rgba(231,192,138,1) 100%)',
                    boxShadow: '0 0 8px rgba(214,168,94,0.45)',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Hero/Header */}
        <header className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-2.5">
              <span
                aria-hidden
                className="block h-px w-12"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.55) 100%)',
                }}
              />
              <span
                className="text-[10.5px] font-medium tracking-[0.32em] uppercase"
                style={{ color: 'rgba(214,168,94,0.72)', fontFamily: FONT_BODY }}
              >
                Vertrauliche Aufnahme
              </span>
            </div>
            <h1
              className="m-0 mb-6 text-[clamp(2.2rem,5.5vw,3.85rem)] font-extralight leading-[1.06] tracking-[-0.01em]"
              style={{
                fontFamily: FONT_HEAD,
                color: 'rgba(248,243,232,0.96)',
                textShadow: '0 1px 0 rgba(20,12,6,0.55)',
              }}
            >
              Bevor wir sprechen, nehme ich mir <Hl>bewusst</Hl> einen Moment für deine Situation.
            </h1>
            <p
              className="m-0 max-w-[480px] text-[clamp(1rem,1.05vw,1.125rem)] font-light leading-[1.66]"
              style={{ color: 'rgba(244,239,230,0.72)', fontFamily: FONT_BODY }}
            >
              Wähle deinen Bereich, das passende Format und einen <Hl>verfügbaren Termin</Hl>.
              Ich melde mich innerhalb von 24 Stunden persönlich.
            </p>

            <ul className="mt-10 space-y-3.5 max-w-[460px]" style={{ fontFamily: FONT_BODY }}>
              {[
                <>Live-Verfügbarkeit — der Kalender zeigt nur freie Termine.</>,
                <>Ich melde mich innerhalb von <Hl>24 Stunden</Hl>.</>,
                <>Alles bleibt <Hl>vertraulich</Hl> — das ist die Grundregel.</>,
              ].map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[13.5px] leading-[1.6]"
                  style={{ color: 'rgba(238,230,216,0.65)' }}
                >
                  <span
                    aria-hidden
                    className="mt-1 inline-block h-[6px] w-[6px] shrink-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #E0B27A 0%, #8E5C3E 100%)',
                      boxShadow: '0 0 6px rgba(214,168,94,0.55)',
                    }}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Intake-Karte */}
          <div className="lg:col-span-7">
            {submitted ? (
              <SuccessCard email={submittedEmail} />
            ) : (
              <article
                className="rounded-[22px] p-7 sm:p-9"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(20,17,14,0.72) 0%, rgba(8,7,6,0.82) 100%)',
                  border: '1px solid rgba(214,168,94,0.16)',
                  boxShadow:
                    '0 28px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.035)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <header className="mb-7 flex items-baseline justify-between gap-4">
                  <h2
                    className="m-0 text-[clamp(1.1rem,1.6vw,1.35rem)] font-light tracking-[-0.005em]"
                    style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.96)' }}
                  >
                    {stepTitles[step]}
                  </h2>
                  <span
                    className="text-[10.5px] font-medium tracking-[0.3em] uppercase"
                    style={{ color: 'rgba(214,168,94,0.55)' }}
                  >
                    Schritt {stepIndex + 1} · {STEPS.length}
                  </span>
                </header>

                {step === 'category' && (
                  <StepCategory
                    category={category}
                    onChange={(c) => {
                      setCategory(c);
                      // Wenn Kategorie wechselt, zuvor gewähltes Service zurücksetzen
                      setServiceData(null);
                    }}
                    counts={{
                      seminars: seminars.length,
                      coaching: coaching.length,
                      corporate: corporate.length,
                    }}
                  />
                )}

                {step === 'service' && (
                  <StepService
                    category={category}
                    loading={loadingServices}
                    seminars={seminars}
                    coaching={coaching}
                    corporate={corporate}
                    selected={serviceData}
                    onSelect={setServiceData}
                  />
                )}

                {step === 'date' && (
                  <StepDate
                    seminars={seminars}
                    serviceData={serviceData}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                  />
                )}

                {step === 'identity' && (
                  <StepIdentity form={form} update={update} />
                )}

                {step === 'review' && (
                  <StepReview
                    serviceData={serviceData}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    form={form}
                    update={update}
                  />
                )}

                {error && (
                  <p
                    className="mt-6 text-[13px] font-medium leading-[1.6]"
                    style={{ color: 'rgba(248,180,168,0.95)' }}
                  >
                    {error}
                  </p>
                )}

                {/* Footer der Karte */}
                <footer className="mt-8 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={stepIndex === 0 || submitting}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-30"
                    style={{
                      color: 'rgba(214,168,94,0.6)',
                    }}
                  >
                    <ArrowLeft size={13} strokeWidth={1.75} />
                    Zurück
                  </button>

                  {step !== 'review' ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!canContinue}
                      className="group inline-flex items-center gap-2.5 rounded-[12px] px-5 py-3 text-[12.5px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(214,168,94,0.95) 0%, rgba(166,116,60,0.92) 50%, rgba(120,78,40,0.95) 100%)',
                        color: 'rgba(12,8,6,0.92)',
                        border: '1px solid rgba(255,230,200,0.22)',
                        boxShadow:
                          '0 6px 22px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.16)',
                      }}
                    >
                      Weiter
                      <ChevronsRight size={14} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canContinue || submitting}
                      className="group inline-flex items-center gap-2.5 rounded-[12px] px-5 py-3 text-[12.5px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(214,168,94,0.95) 0%, rgba(166,116,60,0.92) 50%, rgba(120,78,40,0.95) 100%)',
                        color: 'rgba(12,8,6,0.92)',
                        border: '1px solid rgba(255,230,200,0.22)',
                        boxShadow:
                          '0 6px 22px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.16)',
                      }}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Übermittlung
                        </>
                      ) : (
                        <>
                          Aufnahme einreichen
                          <ChevronsRight size={14} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  )}
                </footer>
              </article>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}

/* -------------------- Step: Kategorie -------------------- */

function StepCategory({
  category,
  onChange,
  counts,
}: {
  category: Category | null;
  onChange: (c: Category) => void;
  counts: { seminars: number; coaching: number; corporate: number };
}) {
  const items: { id: Category; title: string; sub: string; count?: number }[] = [
    { id: 'seminars', title: 'Seminare', sub: 'Präsenz, Online-Live, Hybrid.', count: counts.seminars },
    { id: 'coaching', title: 'Coaching', sub: 'Persönliche 1:1 Begleitung.', count: counts.coaching },
    { id: 'corporate', title: 'Corporate', sub: 'Programme für Teams und Organisationen.', count: counts.corporate },
    { id: 'other', title: 'Keynote · Anderes', sub: 'Auftritt oder individuelle Anfrage.' },
  ];

  return (
    <ul className="m-0 list-none space-y-2.5 p-0">
      {items.map((it) => {
        const active = category === it.id;
        return (
          <li key={it.id}>
            <button
              type="button"
              onClick={() => onChange(it.id)}
              className="group flex w-full items-start gap-4 rounded-[14px] px-4 py-3.5 text-left transition-all duration-300"
              style={{
                background: active
                  ? 'linear-gradient(180deg, rgba(214,168,94,0.16) 0%, rgba(166,116,60,0.10) 100%)'
                  : 'rgba(12,10,8,0.5)',
                border: active
                  ? '1px solid rgba(214,168,94,0.5)'
                  : '1px solid rgba(214,168,94,0.12)',
              }}
            >
              <span
                aria-hidden
                className="mt-1 inline-block h-[8px] w-[8px] shrink-0 rounded-full transition-all duration-300"
                style={{
                  background: active
                    ? 'radial-gradient(circle, #E0B27A 0%, #8E5C3E 100%)'
                    : 'rgba(214,168,94,0.22)',
                  boxShadow: active ? '0 0 10px rgba(214,168,94,0.6)' : 'none',
                }}
              />
              <span className="flex-1">
                <span className="flex items-baseline justify-between gap-4">
                  <span
                    className="block text-[14.5px] font-medium tracking-[0.005em]"
                    style={{ color: 'rgba(248,243,232,0.94)' }}
                  >
                    {it.title}
                  </span>
                  {typeof it.count === 'number' && (
                    <span
                      className="text-[10.5px] font-medium uppercase tracking-[0.24em]"
                      style={{ color: 'rgba(214,168,94,0.55)' }}
                    >
                      {it.count} {it.count === 1 ? 'Format' : 'Formate'}
                    </span>
                  )}
                </span>
                <span
                  className="mt-0.5 block text-[12.5px] leading-[1.55]"
                  style={{ color: 'rgba(238,230,216,0.55)' }}
                >
                  {it.sub}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* -------------------- Step: Format / Service -------------------- */

function StepService({
  category,
  loading,
  seminars,
  coaching,
  corporate,
  selected,
  onSelect,
}: {
  category: Category | null;
  loading: boolean;
  seminars: SeminarRow[];
  coaching: CoachingRow[];
  corporate: CorporateRow[];
  selected: ServiceData | null;
  onSelect: (s: ServiceData) => void;
}) {
  if (!category) {
    return (
      <p className="text-[13px]" style={{ color: 'rgba(238,230,216,0.55)' }}>
        Bitte wähle zuerst einen Bereich.
      </p>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center gap-3 py-6" style={{ color: 'rgba(214,168,94,0.62)' }}>
        <Loader2 size={16} className="animate-spin" />
        <span className="text-[12.5px] uppercase tracking-[0.22em]">Lade Formate …</span>
      </div>
    );
  }

  if (category === 'seminars') {
    return (
      <ServiceList
        empty="Aktuell keine aktiven Seminare. Bitte wähle einen anderen Bereich."
        items={seminars.map((row) => ({
          key: row.id,
          title: row.title,
          sub: row.subtitle || row.tagline,
          meta: [row.format, row.duration, row.price].filter(Boolean).join(' · '),
          active: selected?.kind === 'seminar' && selected.row.id === row.id,
          onClick: () => onSelect({ kind: 'seminar', row }),
        }))}
      />
    );
  }
  if (category === 'coaching') {
    return (
      <ServiceList
        empty="Aktuell keine aktiven Coaching-Pakete."
        items={coaching.map((row) => ({
          key: row.id,
          title: row.title,
          sub: row.subtitle || row.tagline,
          meta: [row.format, row.duration, row.sessions, row.price].filter(Boolean).join(' · '),
          active: selected?.kind === 'coaching' && selected.row.id === row.id,
          onClick: () => onSelect({ kind: 'coaching', row }),
          highlight: row.highlight,
        }))}
      />
    );
  }
  if (category === 'corporate') {
    return (
      <ServiceList
        empty="Aktuell keine aktiven Corporate-Angebote."
        items={corporate.map((row) => ({
          key: row.id,
          title: row.title,
          sub: row.subtitle || row.tagline,
          meta: [row.format, row.duration, row.participants, row.price].filter(Boolean).join(' · '),
          active: selected?.kind === 'corporate' && selected.row.id === row.id,
          onClick: () => onSelect({ kind: 'corporate', row }),
          highlight: row.highlight,
        }))}
      />
    );
  }
  // category === 'other'
  return (
    <ServiceList
      empty=""
      items={OTHER_TRACKS.map((row) => ({
        key: row.id,
        title: row.title,
        sub: row.subtitle,
        meta: '',
        active: selected?.kind === 'other' && selected.row.id === row.id,
        onClick: () => onSelect({ kind: 'other', row: { id: row.id, title: row.title, subtitle: row.subtitle } }),
      }))}
    />
  );
}

function ServiceList({
  items,
  empty,
}: {
  empty: string;
  items: Array<{ key: string; title: string; sub: string; meta: string; active: boolean; onClick: () => void; highlight?: boolean }>;
}) {
  if (items.length === 0) {
    return (
      <p className="text-[13px]" style={{ color: 'rgba(238,230,216,0.55)' }}>
        {empty}
      </p>
    );
  }
  return (
    <ul className="m-0 list-none space-y-2.5 p-0">
      {items.map((it) => (
        <li key={it.key}>
          <button
            type="button"
            onClick={it.onClick}
            className="group flex w-full items-start gap-4 rounded-[14px] px-4 py-3.5 text-left transition-all duration-300"
            style={{
              background: it.active
                ? 'linear-gradient(180deg, rgba(214,168,94,0.16) 0%, rgba(166,116,60,0.10) 100%)'
                : 'rgba(12,10,8,0.5)',
              border: it.active
                ? '1px solid rgba(214,168,94,0.5)'
                : '1px solid rgba(214,168,94,0.12)',
            }}
          >
            <span
              aria-hidden
              className="mt-1 inline-block h-[8px] w-[8px] shrink-0 rounded-full transition-all duration-300"
              style={{
                background: it.active
                  ? 'radial-gradient(circle, #E0B27A 0%, #8E5C3E 100%)'
                  : 'rgba(214,168,94,0.22)',
                boxShadow: it.active ? '0 0 10px rgba(214,168,94,0.6)' : 'none',
              }}
            />
            <span className="flex-1 min-w-0">
              <span className="flex items-baseline justify-between gap-4">
                <span
                  className="block text-[14.5px] font-medium tracking-[0.005em] truncate"
                  style={{ color: 'rgba(248,243,232,0.94)' }}
                >
                  {it.title}
                </span>
                {it.highlight && (
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.22em]"
                    style={{ color: '#D6A85E' }}
                  >
                    Empfehlung
                  </span>
                )}
              </span>
              {it.sub && (
                <span
                  className="mt-0.5 block text-[12.5px] leading-[1.55]"
                  style={{ color: 'rgba(238,230,216,0.6)' }}
                >
                  {it.sub}
                </span>
              )}
              {it.meta && (
                <span
                  className="mt-1.5 block text-[11px] font-medium uppercase tracking-[0.16em]"
                  style={{ color: 'rgba(214,168,94,0.55)' }}
                >
                  {it.meta}
                </span>
              )}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

/* -------------------- Step: Termin -------------------- */

function StepDate({
  seminars,
  serviceData,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
}: {
  seminars: SeminarRow[];
  serviceData: ServiceData | null;
  selectedDate: string;
  onSelectDate: (d: string) => void;
  selectedTime: string;
  onSelectTime: (t: string) => void;
}) {
  // Optionale Seminar-Stand-Termine (nur wenn aktuell ein Seminar gewählt ist)
  const seminarStandDates = useMemo(() => {
    if (serviceData?.kind !== 'seminar') return [];
    return parseSeminarDates([serviceData.row]).filter((iso) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(iso) >= today;
    });
  }, [serviceData]);

  // Alle Seminartermine (für Kalender-Markierung "Seminar belegt")
  const allSeminarDates = useMemo(() => new Set(parseSeminarDates(seminars)), [seminars]);

  return (
    <div className="space-y-6">
      {seminarStandDates.length > 0 && (
        <fieldset>
          <Legend>Feste Seminartermine</Legend>
          <p
            className="-mt-1 mb-3 text-[11.5px] leading-[1.55]"
            style={{ color: 'rgba(238,230,216,0.5)', fontFamily: FONT_BODY }}
          >
            Tippe einen Termin an — er wird übernommen.
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {seminarStandDates.map((iso) => {
              const active = selectedDate === iso;
              const dt = new Date(iso);
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => onSelectDate(iso)}
                  className="rounded-[12px] px-3.5 py-3 text-[12.5px] font-medium tracking-[0.05em] transition-all duration-300 text-left"
                  style={{
                    background: active
                      ? 'linear-gradient(180deg, rgba(214,168,94,0.22) 0%, rgba(166,116,60,0.16) 100%)'
                      : 'rgba(12,10,8,0.5)',
                    border: active
                      ? '1px solid rgba(214,168,94,0.5)'
                      : '1px solid rgba(214,168,94,0.14)',
                    color: active ? 'rgba(248,243,232,0.95)' : 'rgba(238,230,216,0.7)',
                  }}
                >
                  <span className="block">
                    {dt.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <PremiumCalendar
        selectedDate={selectedDate}
        onSelect={onSelectDate}
        seminarDates={allSeminarDates}
      />

      <fieldset>
        <Legend>Bevorzugte Uhrzeit</Legend>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
          {TIME_SLOTS.map((t) => {
            const active = selectedTime === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => onSelectTime(t)}
                className="rounded-[10px] py-2 text-[12px] font-medium tracking-[0.06em] transition-all duration-300"
                style={{
                  background: active
                    ? 'linear-gradient(180deg, rgba(214,168,94,0.22) 0%, rgba(166,116,60,0.16) 100%)'
                    : 'rgba(12,10,8,0.5)',
                  border: active
                    ? '1px solid rgba(214,168,94,0.5)'
                    : '1px solid rgba(214,168,94,0.14)',
                  color: active ? 'rgba(248,243,232,0.95)' : 'rgba(238,230,216,0.6)',
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
        <p
          className="mt-2 text-[11.5px] leading-[1.55]"
          style={{ color: 'rgba(238,230,216,0.5)', fontFamily: FONT_BODY }}
        >
          Die endgültige Uhrzeit stimmen wir vertraulich ab.
        </p>
      </fieldset>
    </div>
  );
}

/* -------------------- Premium Live-Kalender -------------------- */

function PremiumCalendar({
  selectedDate,
  onSelect,
  seminarDates,
}: {
  selectedDate: string;
  onSelect: (iso: string) => void;
  seminarDates: Set<string>;
}) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const [blocked, setBlocked] = useState<BlockedSlot[]>([]);
  const [bookings, setBookings] = useState<BookingLite[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const start = `${year}-01-01`;
      const end = `${year}-12-31`;
      const [blockedRes, bookingsRes] = await Promise.all([
        supabase.from('blocked_time_slots').select('*').gte('date', start).lte('date', end),
        supabase
          .from('bookings')
          .select('id, event_date, event_time, status')
          .gte('event_date', start)
          .lte('event_date', end)
          .in('status', ['confirmed', 'pending']),
      ]);
      if (blockedRes.data) setBlocked(blockedRes.data as BlockedSlot[]);
      if (bookingsRes.data) setBookings(bookingsRes.data as BookingLite[]);
    } catch (e) {
      console.error('Calendar load error:', e);
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    loadData();
    const ch = supabase
      .channel('booking-calendar-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blocked_time_slots' }, loadData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, loadData)
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [loadData]);

  const blockedMap = useMemo(() => {
    const map = new Map<string, BlockedSlot[]>();
    blocked.forEach((b) => {
      const arr = map.get(b.date) ?? [];
      arr.push(b);
      map.set(b.date, arr);
    });
    return map;
  }, [blocked]);

  const bookedSet = useMemo(() => {
    const s = new Set<string>();
    bookings.forEach((b) => {
      if (b.event_date) s.add(b.event_date);
    });
    return s;
  }, [bookings]);

  const getStatus = (iso: string): 'past' | 'blocked' | 'partial' | 'seminar' | 'busy' | 'available' => {
    const d = new Date(iso);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    if (d < t) return 'past';
    const slots = blockedMap.get(iso) ?? [];
    if (slots.length > 0) {
      const total = slots.reduce((sum, s) => sum + (parseInt(s.end_time) - parseInt(s.start_time)), 0);
      return total >= 8 ? 'blocked' : 'partial';
    }
    if (seminarDates.has(iso)) return 'seminar';
    if (bookedSet.has(iso)) return 'busy';
    return 'available';
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (() => {
    const d = new Date(year, month, 1).getDay();
    return d === 0 ? 6 : d - 1;
  })();

  const goPrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const goNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const cells: Array<{ iso: string; day: number; status: string } | null> = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    cells.push({ iso, day, status: getStatus(iso) });
  }

  return (
    <div>
      <Legend>
        <span className="inline-flex items-center gap-2">
          <CalendarDays size={11} aria-hidden />
          Verfügbarkeit
        </span>
      </Legend>

      <div
        className="mt-3 rounded-[16px] p-4 sm:p-5"
        style={{
          background: 'rgba(8,7,6,0.55)',
          border: '1px solid rgba(214,168,94,0.14)',
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] transition-colors"
            style={{
              background: 'rgba(214,168,94,0.06)',
              border: '1px solid rgba(214,168,94,0.14)',
              color: 'rgba(238,230,216,0.78)',
            }}
            aria-label="Vorheriger Monat"
          >
            <ChevronLeft size={16} strokeWidth={1.6} />
          </button>
          <div className="text-center">
            <p
              className="m-0 text-[14px] font-medium tracking-[0.02em]"
              style={{ color: 'rgba(248,243,232,0.94)', fontFamily: FONT_HEAD }}
            >
              {MONTHS_DE[month]}
            </p>
            <p
              className="m-0 text-[11px] uppercase tracking-[0.24em]"
              style={{ color: 'rgba(214,168,94,0.55)' }}
            >
              {year}
            </p>
          </div>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] transition-colors"
            style={{
              background: 'rgba(214,168,94,0.06)',
              border: '1px solid rgba(214,168,94,0.14)',
              color: 'rgba(238,230,216,0.78)',
            }}
            aria-label="Nächster Monat"
          >
            <ChevronRight size={16} strokeWidth={1.6} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1.5 mb-1.5">
          {DAYS_DE_SHORT.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-medium uppercase tracking-[0.18em]"
              style={{ color: 'rgba(214,168,94,0.5)' }}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-7 gap-1.5">
          {cells.map((cell, i) => {
            if (!cell) return <div key={i} className="aspect-square" />;
            const { iso, day, status } = cell;
            const isSelected = selectedDate === iso;
            const disabled = status === 'past' || status === 'blocked';

            const palette = (() => {
              switch (status) {
                case 'past':
                  return { bg: 'transparent', text: 'rgba(238,230,216,0.22)', dot: '' };
                case 'blocked':
                  return { bg: 'rgba(180,80,70,0.10)', text: 'rgba(220,150,140,0.55)', dot: 'rgba(220,90,80,0.7)' };
                case 'partial':
                  return { bg: 'rgba(214,168,94,0.05)', text: 'rgba(244,239,230,0.85)', dot: 'rgba(231,170,80,0.85)' };
                case 'seminar':
                  return { bg: 'rgba(120,90,200,0.06)', text: 'rgba(244,239,230,0.86)', dot: 'rgba(180,150,220,0.85)' };
                case 'busy':
                  return { bg: 'rgba(120,160,200,0.04)', text: 'rgba(238,230,216,0.78)', dot: 'rgba(120,170,210,0.75)' };
                default:
                  return { bg: 'rgba(214,168,94,0.04)', text: 'rgba(248,243,232,0.95)', dot: 'rgba(120,200,150,0.85)' };
              }
            })();

            return (
              <button
                key={iso}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && onSelect(iso)}
                className="relative aspect-square rounded-[10px] transition-all duration-300 disabled:cursor-not-allowed"
                style={{
                  background: isSelected
                    ? 'linear-gradient(180deg, rgba(214,168,94,0.32) 0%, rgba(166,116,60,0.22) 100%)'
                    : palette.bg,
                  border: isSelected
                    ? '1px solid rgba(214,168,94,0.65)'
                    : '1px solid rgba(214,168,94,0.08)',
                  boxShadow: isSelected ? '0 0 0 1px rgba(214,168,94,0.18)' : 'none',
                  color: isSelected ? 'rgba(250,247,240,1)' : palette.text,
                }}
              >
                <span className="text-[12px] font-medium">{day}</span>
                {palette.dot && !isSelected && (
                  <span
                    aria-hidden
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full"
                    style={{ background: palette.dot }}
                  />
                )}
              </button>
            );
          })}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-[10px]">
              <Loader2 size={16} className="animate-spin text-[rgba(214,168,94,0.7)]" />
            </div>
          )}
        </div>

        {/* Legende */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10.5px]" style={{ color: 'rgba(238,230,216,0.5)' }}>
          <LegendDot color="rgba(120,200,150,0.85)" label="Verfügbar" />
          <LegendDot color="rgba(120,170,210,0.75)" label="Anfragen vorhanden" />
          <LegendDot color="rgba(180,150,220,0.85)" label="Seminartermin" />
          <LegendDot color="rgba(231,170,80,0.85)" label="Teilweise belegt" />
          <LegendDot color="rgba(220,90,80,0.7)" label="Nicht verfügbar" />
        </div>
      </div>

      {selectedDate && (
        <div
          className="mt-4 flex items-center gap-3 rounded-[14px] px-4 py-3"
          style={{
            background: 'linear-gradient(180deg, rgba(214,168,94,0.10) 0%, rgba(166,116,60,0.06) 100%)',
            border: '1px solid rgba(214,168,94,0.28)',
          }}
        >
          <CheckCircle2 size={16} className="text-[#D6A85E]" />
          <span className="text-[12.5px]" style={{ color: 'rgba(248,243,232,0.92)' }}>
            {new Date(selectedDate).toLocaleDateString('de-DE', {
              weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
            })}
          </span>
        </div>
      )}
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden />
      <span>{label}</span>
    </span>
  );
}

/* -------------------- Step: Identität -------------------- */

function StepIdentity({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <TextField
        label="Vor- und Nachname"
        required
        autoComplete="name"
        value={form.fullName}
        onChange={(v) => update('fullName', v)}
      />
      <TextField
        label="Rolle / Position"
        autoComplete="organization-title"
        value={form.role}
        onChange={(v) => update('role', v)}
      />
      <TextField
        label="Unternehmen / Kontext"
        autoComplete="organization"
        value={form.organization}
        onChange={(v) => update('organization', v)}
        wide
      />
      <TextField
        label="E-Mail"
        required
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={(v) => update('email', v)}
      />
      <TextField
        label="Telefon"
        required
        type="tel"
        autoComplete="tel"
        value={form.phone}
        onChange={(v) => update('phone', v)}
      />
      <TextAreaField
        label="Kontext (optional)"
        value={form.message}
        onChange={(v) => update('message', v)}
        placeholder="Ein, zwei Sätze, was dich gerade wirklich beschäftigt."
      />
    </div>
  );
}

/* -------------------- Step: Review -------------------- */

function StepReview({
  serviceData,
  selectedDate,
  selectedTime,
  form,
  update,
}: {
  serviceData: ServiceData | null;
  selectedDate: string;
  selectedTime: string;
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const serviceTitle = serviceData
    ? serviceData.kind === 'other'
      ? serviceData.row.title
      : serviceData.row.title
    : '—';

  const formatLine = (() => {
    if (!serviceData || serviceData.kind === 'other') return '—';
    return (serviceData.row as { format?: string }).format || '—';
  })();

  const priceLine = (() => {
    if (!serviceData) return '—';
    if (serviceData.kind === 'other') return serviceData.row.price ?? '—';
    return (serviceData.row as { price?: string }).price || '—';
  })();

  const rows: { label: string; value: string }[] = [
    { label: 'Format', value: serviceTitle },
    { label: 'Rahmen', value: formatLine },
    { label: 'Investment', value: priceLine },
    {
      label: 'Termin',
      value: selectedDate
        ? `${new Date(selectedDate).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })} · ${selectedTime}`
        : '—',
    },
    { label: 'Name', value: form.fullName || '—' },
    { label: 'E-Mail', value: form.email || '—' },
    { label: 'Telefon', value: form.phone || '—' },
    { label: 'Organisation', value: form.organization || '—' },
  ];

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <p
        className="m-0 mb-6 text-[13px] leading-[1.7]"
        style={{ color: 'rgba(238,230,216,0.62)' }}
      >
        Diese Informationen helfen mir, deine Situation besser zu verstehen und unser Gespräch{' '}
        <Hl>bewusst vorzubereiten</Hl>. Alles bleibt <Hl>vertraulich</Hl> und dient ausschließlich
        dazu, schneller zu erkennen, was <Hl>wirklich relevant</Hl> ist.
      </p>

      <dl className="m-0">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-baseline justify-between gap-6 py-3"
            style={{ borderTop: '1px solid rgba(214,168,94,0.10)' }}
          >
            <dt
              className="text-[10.5px] font-medium uppercase tracking-[0.28em]"
              style={{ color: 'rgba(214,168,94,0.6)' }}
            >
              {r.label}
            </dt>
            <dd
              className="text-right text-[13.5px] font-light"
              style={{ color: 'rgba(244,239,230,0.85)' }}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>

      {form.message && (
        <div className="mt-5">
          <Legend optional>Kontext</Legend>
          <p
            className="mt-2 whitespace-pre-line rounded-[12px] border border-[rgba(214,168,94,0.10)] bg-[rgba(10,9,8,0.55)] px-4 py-3 text-[13.5px] leading-[1.6]"
            style={{ color: 'rgba(238,230,216,0.78)' }}
          >
            {form.message}
          </p>
        </div>
      )}

      <label className="mt-6 flex items-start gap-3 select-none cursor-pointer">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update('consent', e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#C99B62]"
        />
        <span
          className="text-[12px] leading-[1.6]"
          style={{ color: 'rgba(238,230,216,0.6)' }}
        >
          Ich bin damit einverstanden, dass Anatoli meine Angaben <Hl>vertraulich</Hl> liest und
          ausschließlich zur Vorbereitung des Gesprächs nutzt. Details in der{' '}
          <Link to="/datenschutz" className="text-[#C99B62] underline-offset-4 hover:underline">
            Datenschutzerklärung
          </Link>
          .
        </span>
      </label>
    </div>
  );
}

/* -------------------- Atoms -------------------- */

function Legend({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <legend
      className="m-0 mb-1 inline-flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.28em]"
      style={{ color: 'rgba(214,168,94,0.7)' }}
    >
      {children}
      {optional && (
        <span
          className="text-[9.5px] tracking-[0.28em]"
          style={{ color: 'rgba(214,168,94,0.4)' }}
        >
          Opt.
        </span>
      )}
    </legend>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
  type = 'text',
  autoComplete,
  wide,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  wide?: boolean;
}) {
  return (
    <label className={`block ${wide ? 'sm:col-span-2' : ''}`}>
      <span
        className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.28em]"
        style={{ color: 'rgba(214,168,94,0.7)' }}
      >
        {label}
        {required && (
          <span style={{ color: 'rgba(214,168,94,0.85)' }} aria-hidden>
            *
          </span>
        )}
      </span>
      <input
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[12px] border border-[rgba(214,168,94,0.14)] bg-[rgba(10,9,8,0.6)] px-4 py-3 text-[14px] outline-none transition-all duration-300 focus:border-[rgba(214,168,94,0.45)] focus:shadow-[0_0_0_1px_rgba(214,168,94,0.12)]"
        style={{ color: 'rgba(244,239,230,0.92)' }}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block sm:col-span-2">
      <span
        className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.28em]"
        style={{ color: 'rgba(214,168,94,0.7)' }}
      >
        {label}
      </span>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-none rounded-[12px] border border-[rgba(214,168,94,0.14)] bg-[rgba(10,9,8,0.6)] px-4 py-3 text-[14px] leading-[1.55] outline-none transition-all duration-300 focus:border-[rgba(214,168,94,0.45)] focus:shadow-[0_0_0_1px_rgba(214,168,94,0.12)]"
        style={{ color: 'rgba(244,239,230,0.92)' }}
      />
    </label>
  );
}

function SuccessCard({ email }: { email: string }) {
  return (
    <article
      className="rounded-[22px] p-8 sm:p-10"
      style={{
        background: 'linear-gradient(180deg, rgba(20,17,14,0.78) 0%, rgba(8,7,6,0.85) 100%)',
        border: '1px solid rgba(214,168,94,0.2)',
        boxShadow: '0 28px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      <div className="mb-5 flex items-center gap-3">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(214,168,94,0.22) 0%, rgba(214,168,94,0) 70%)',
            border: '1px solid rgba(214,168,94,0.4)',
          }}
        >
          <CheckCircle2 size={20} strokeWidth={1.5} className="text-[#D6A85E]" aria-hidden />
        </span>
        <h2
          className="m-0 text-[clamp(1.3rem,2.2vw,1.7rem)] font-light tracking-[-0.005em]"
          style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.96)' }}
        >
          Deine Aufnahme ist bei mir.
        </h2>
      </div>
      <p
        className="m-0 mb-2 text-[14.5px] leading-[1.7]"
        style={{ color: 'rgba(244,239,230,0.78)', fontFamily: FONT_BODY }}
      >
        Ich lese jede Antwort persönlich und nehme mir <span style={HL_STYLE}>bewusst Zeit</span>,
        bevor ich antworte. Du bekommst innerhalb von 24 Stunden eine{' '}
        <span style={HL_STYLE}>vertrauliche</span> Rückmeldung an{' '}
        <span className="text-[#D6A85E]">{email}</span>.
      </p>
      <p
        className="m-0 text-[12.5px] leading-[1.7]"
        style={{ color: 'rgba(238,230,216,0.5)', fontFamily: FONT_BODY }}
      >
        Sollte etwas dringend sein:{' '}
        <a
          href="mailto:mail@anatoly-mook.de"
          className="text-[#C99B62] underline-offset-4 hover:underline"
        >
          mail@anatoly-mook.de
        </a>
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-[12px] px-5 py-3 text-[11.5px] font-medium uppercase tracking-[0.22em] transition-colors duration-300"
          style={{
            background: 'rgba(214,168,94,0.08)',
            border: '1px solid rgba(214,168,94,0.22)',
            color: 'rgba(244,239,230,0.9)',
          }}
        >
          <ArrowLeft size={13} strokeWidth={1.75} />
          Zurück zur Startseite
        </Link>
      </div>
    </article>
  );
}
