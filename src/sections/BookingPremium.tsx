import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

/**
 * /booking — Executive Aufnahme-Flow
 *
 * Bewusst kein "Wizard-Look": keine bunten Karten, keine Boxen-Stepper, keine
 * Dashboard-Optik. Ein einziger, ruhiger Aufnahme-Dialog im Premium-Design
 * (Stein, Bronze, Champagne-Typo).
 */

const FONT_HEAD = "'Montserrat', system-ui, -apple-system, sans-serif";
const FONT_BODY =
  "'Avenir Next', 'Avenir', 'Nunito Sans', 'Inter', system-ui, -apple-system, sans-serif";

/**
 * Subtile Bronze-Hervorhebung einzelner Schlüsselbegriffe.
 * Reines Bronze, kein Verlauf, kein Glow — ruhiger metallischer Akzent.
 */
const HL_STYLE: React.CSSProperties = {
  color: '#C99B62',
  fontWeight: 500,
  letterSpacing: '0.005em',
};

function Hl({ children }: { children: React.ReactNode }) {
  return <span style={HL_STYLE}>{children}</span>;
}

type Track =
  | 'private_coaching'
  | 'leadership'
  | 'seminar'
  | 'speaking'
  | 'other';

type Horizon = '4w' | '8w' | '12w' | 'open';

type Investment = 'open' | '5_15' | '15_40' | '40_plus';

interface FormState {
  track: Track | null;
  horizon: Horizon | null;
  investment: Investment | null;
  context: string;
  fullName: string;
  role: string;
  organization: string;
  email: string;
  phone: string;
  consent: boolean;
}

const INITIAL: FormState = {
  track: null,
  horizon: null,
  investment: null,
  context: '',
  fullName: '',
  role: '',
  organization: '',
  email: '',
  phone: '',
  consent: false,
};

type TrackLabel = { title: string; sub: React.ReactNode };
const trackLabel: Record<Track, TrackLabel> = {
  private_coaching: {
    title: 'Private Begleitung',
    sub: <>Persönlich, 1:1, vertraulich.</>,
  },
  leadership: {
    title: 'Executive Programm',
    sub: <>Führung, Team, Klarheit auf strategischer Ebene.</>,
  },
  seminar: {
    title: 'Seminar',
    sub: <>Vertieft, kuratiert, in Präsenz.</>,
  },
  speaking: {
    title: 'Keynote',
    sub: <>Ein Auftritt für Kontexte mit Anspruch.</>,
  },
  other: {
    title: 'Etwas anderes',
    sub: <>Schreib es ruhig — ich höre zu, bevor ich antworte.</>,
  },
};

const horizonLabel: Record<Horizon, string> = {
  '4w': 'Innerhalb von 4 Wochen',
  '8w': 'In 1–2 Monaten',
  '12w': 'In 2–3 Monaten',
  'open': 'Zeitlich offen',
};

const investmentLabel: Record<Investment, string> = {
  open: 'Bewusst offen',
  '5_15': '5 – 15k €',
  '15_40': '15 – 40k €',
  '40_plus': '40k € +',
};

type StepId = 'track' | 'context' | 'identity' | 'review';
const STEPS: StepId[] = ['track', 'context', 'identity', 'review'];
const stepTitles: Record<StepId, string> = {
  track: 'Anliegen',
  context: 'Rahmen',
  identity: 'Du',
  review: 'Aufnahme',
};

export default function BookingPremium() {
  const [step, setStep] = useState<StepId>('track');
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const canContinue = useMemo(() => {
    if (step === 'track') return !!form.track;
    if (step === 'context') return !!form.horizon && !!form.investment;
    if (step === 'identity') {
      return (
        form.fullName.trim().length >= 2 &&
        /^\S+@\S+\.\S+$/.test(form.email.trim())
      );
    }
    return form.consent;
  }, [step, form]);

  const next = () => {
    const i = STEPS.indexOf(step);
    if (i < STEPS.length - 1) setStep(STEPS[i + 1]);
  };
  const back = () => {
    const i = STEPS.indexOf(step);
    if (i > 0) setStep(STEPS[i - 1]);
  };

  const handleSubmit = async () => {
    if (!canContinue || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const eventDate = null; // Termin wird im Gespräch vereinbart
      const messageBody = [
        form.track && `Anliegen: ${trackLabel[form.track].title}`,
        form.horizon && `Zeitrahmen: ${horizonLabel[form.horizon]}`,
        form.investment && `Investment-Rahmen: ${investmentLabel[form.investment]}`,
        form.context && `Kontext: ${form.context}`,
      ]
        .filter(Boolean)
        .join('\n');

      const { error: insertError } = await supabase.from('bookings').insert({
        service_type: form.track ? `Aufnahme: ${trackLabel[form.track].title}` : 'Aufnahme',
        customer_name: form.fullName.trim(),
        customer_email: form.email.trim(),
        customer_phone: form.phone.trim() || null,
        company: form.organization.trim() || null,
        role: form.role.trim() || null,
        event_date: eventDate,
        location: null,
        audience_size: null,
        budget: form.investment ? investmentLabel[form.investment] : null,
        objective: form.track ? trackLabel[form.track].title : null,
        message: messageBody,
        status: 'pending',
        priority: 'high',
      });

      if (insertError) throw insertError;
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
          <div className="lg:col-span-6">
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
              Diese Aufnahme ersetzt kein Gespräch. Sie ist ein <Hl>ruhiger Rahmen</Hl> — kurz,
              präzise, <Hl>vertraulich</Hl>. Ich lese jede Antwort persönlich und melde mich
              innerhalb von 24 Stunden.
            </p>

            <ul className="mt-10 space-y-3.5 max-w-[460px]" style={{ fontFamily: FONT_BODY }}>
              {[
                <>Ich lese persönlich — nichts wird automatisiert verarbeitet.</>,
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
          <div className="lg:col-span-6">
            {submitted ? (
              <SuccessCard email={form.email} />
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

                {step === 'track' && (
                  <StepTrack form={form} update={update} />
                )}
                {step === 'context' && (
                  <StepContext form={form} update={update} />
                )}
                {step === 'identity' && (
                  <StepIdentity form={form} update={update} />
                )}
                {step === 'review' && (
                  <StepReview form={form} update={update} />
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
                    onClick={back}
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
                      onClick={next}
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
                      <ArrowRight size={14} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
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
                          <ArrowRight size={14} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
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

/* -------------------- Steps -------------------- */

function StepTrack({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const tracks: Track[] = ['private_coaching', 'leadership', 'seminar', 'speaking', 'other'];
  return (
    <ul className="m-0 list-none space-y-2.5 p-0">
      {tracks.map((t) => {
        const active = form.track === t;
        return (
          <li key={t}>
            <button
              type="button"
              onClick={() => update('track', t)}
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
                <span
                  className="block text-[14.5px] font-medium tracking-[0.005em]"
                  style={{ color: 'rgba(248,243,232,0.94)' }}
                >
                  {trackLabel[t].title}
                </span>
                <span
                  className="mt-0.5 block text-[12.5px] leading-[1.55]"
                  style={{ color: 'rgba(238,230,216,0.55)' }}
                >
                  {trackLabel[t].sub}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function StepContext({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const horizons: Horizon[] = ['4w', '8w', '12w', 'open'];
  const investments: Investment[] = ['open', '5_15', '15_40', '40_plus'];
  return (
    <div className="space-y-7">
      <fieldset>
        <Legend>Wann darf es beginnen?</Legend>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {horizons.map((h) => (
            <PillButton
              key={h}
              active={form.horizon === h}
              onClick={() => update('horizon', h)}
            >
              {horizonLabel[h]}
            </PillButton>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <Legend>Investment-Rahmen</Legend>
        <p
          className="-mt-1 mb-3 text-[11.5px] leading-[1.55]"
          style={{ color: 'rgba(238,230,216,0.5)', fontFamily: FONT_BODY }}
        >
          Nur als <Hl>Orientierung</Hl>. Das Detail klären wir im Gespräch — ohne Druck.
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {investments.map((i) => (
            <PillButton
              key={i}
              active={form.investment === i}
              onClick={() => update('investment', i)}
            >
              {investmentLabel[i]}
            </PillButton>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <Legend optional>Kontext (optional)</Legend>
        <textarea
          rows={3}
          value={form.context}
          onChange={(e) => update('context', e.target.value)}
          placeholder="Ein, zwei Sätze, was dich gerade wirklich beschäftigt."
          className="mt-2 w-full resize-none rounded-[12px] border border-[rgba(214,168,94,0.14)] bg-[rgba(10,9,8,0.6)] px-4 py-3 text-[14px] leading-[1.55] outline-none transition-all duration-300 focus:border-[rgba(214,168,94,0.45)] focus:shadow-[0_0_0_1px_rgba(214,168,94,0.12)]"
          style={{ color: 'rgba(244,239,230,0.92)' }}
        />
      </fieldset>
    </div>
  );
}

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
        type="tel"
        autoComplete="tel"
        value={form.phone}
        onChange={(v) => update('phone', v)}
      />
    </div>
  );
}

function StepReview({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const rows: { label: string; value: string }[] = [
    { label: 'Anliegen', value: form.track ? trackLabel[form.track].title : '—' },
    { label: 'Zeitrahmen', value: form.horizon ? horizonLabel[form.horizon] : '—' },
    { label: 'Investment', value: form.investment ? investmentLabel[form.investment] : '—' },
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

      <dl
        className="m-0 divide-y"
        style={{
          // dezenter Hairline-Separator
          // @ts-expect-error custom CSS var via inline style
          '--row-border': '1px solid rgba(214,168,94,0.10)',
        }}
      >
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

      {form.context && (
        <div className="mt-5">
          <Legend optional>Kontext</Legend>
          <p
            className="mt-2 whitespace-pre-line rounded-[12px] border border-[rgba(214,168,94,0.10)] bg-[rgba(10,9,8,0.55)] px-4 py-3 text-[13.5px] leading-[1.6]"
            style={{ color: 'rgba(238,230,216,0.78)' }}
          >
            {form.context}
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

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[12px] px-3.5 py-3 text-[12.5px] font-medium uppercase tracking-[0.16em] transition-all duration-300"
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
      {children}
    </button>
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
        Ich lese jede Antwort persönlich und nehme mir <Hl>bewusst Zeit</Hl>, bevor ich antworte.
        Du bekommst innerhalb von 24 Stunden eine <Hl>vertrauliche</Hl> Rückmeldung an{' '}
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
