import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronsRight,
  Mail,
  Phone,
  User,
  Building2,
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const FONT_HEAD = "'Montserrat', system-ui, -apple-system, sans-serif";
const FONT_BODY =
  "'Avenir Next', 'Avenir', 'Nunito Sans', 'Inter', system-ui, -apple-system, sans-serif";

/**
 * Subtile Bronze-Hervorhebung einzelner Schlüsselbegriffe.
 * Reines Bronze (kein Gradient, kein Glow), feines Letter-Spacing,
 * minimales Gewicht — wirkt wie metallischer Akzent im Fließtext.
 */
const HL_STYLE: React.CSSProperties = {
  color: '#C99B62',
  fontWeight: 500,
  letterSpacing: '0.005em',
};

function Hl({ children }: { children: React.ReactNode }) {
  return <span style={HL_STYLE}>{children}</span>;
}

type Channel = 'video' | 'phone' | 'in_person';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  topic: string;
  channel: Channel;
  preferredDate: string;
  preferredTime: string;
  message: string;
  consent: boolean;
}

const INITIAL: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  topic: '',
  channel: 'video',
  preferredDate: '',
  preferredTime: '',
  message: '',
  consent: false,
};

const channelLabel: Record<Channel, string> = {
  video: 'Video',
  phone: 'Telefon',
  in_person: 'Vor Ort',
};

export default function Erstgespraech() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const isValid =
    form.fullName.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(form.email.trim()) &&
    form.consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const eventDate =
        form.preferredDate && form.preferredTime
          ? new Date(`${form.preferredDate}T${form.preferredTime}`).toISOString()
          : form.preferredDate
            ? new Date(`${form.preferredDate}T10:00:00`).toISOString()
            : null;

      const message = [
        form.topic && `Thema: ${form.topic}`,
        form.channel && `Kanal: ${channelLabel[form.channel]}`,
        form.preferredTime && `Wunschzeit: ${form.preferredTime}`,
        form.message && `Nachricht: ${form.message}`,
      ]
        .filter(Boolean)
        .join('\n');

      const { error: insertError } = await supabase.from('bookings').insert({
        service_type: 'Erstgespräch',
        customer_name: form.fullName.trim(),
        customer_email: form.email.trim(),
        customer_phone: form.phone.trim() || null,
        company: form.company.trim() || null,
        role: null,
        event_date: eventDate,
        location: channelLabel[form.channel],
        audience_size: null,
        budget: null,
        objective: form.topic.trim() || null,
        message,
        status: 'pending',
        priority: 'high',
      });

      if (insertError) throw insertError;
      setSubmitted(true);
    } catch (err: any) {
      console.error('Erstgespräch submit error:', err);
      setError(
        'Senden fehlgeschlagen. Bitte schreib uns alternativ kurz an mail@anatoly-mook.de — wir melden uns innerhalb von 24 h.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-[14px] px-4 py-3.5 text-[15px] outline-none transition-all duration-300 ' +
    'bg-[rgba(12,10,8,0.55)] border border-[rgba(214,168,94,0.16)] ' +
    'text-[rgba(248,243,232,0.92)] placeholder-[rgba(238,230,216,0.4)] ' +
    'focus:border-[rgba(214,168,94,0.5)] focus:shadow-[0_0_0_1px_rgba(214,168,94,0.14)]';

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Stein-Hintergrund */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: 'url(/images/manifest/footer-stone-granite-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 80% at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.78) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(46% 38% at 50% 18%, rgba(214,168,94,0.08) 0%, rgba(0,0,0,0) 65%)',
        }}
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1180px] px-6 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-24 md:pt-28 pb-24">
        {/* Zurück-Link */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.22em] uppercase text-[rgba(214,168,94,0.55)] hover:text-[rgba(244,239,230,0.9)] transition-colors duration-300"
          style={{ fontFamily: FONT_BODY }}
        >
          <ArrowLeft size={14} strokeWidth={1.75} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span>Zurück</span>
        </Link>

        {/* Header */}
        <header className="mt-12 mb-14 sm:mb-16 max-w-[820px]">
          <div className="mb-6 flex items-center gap-2.5">
            <span
              aria-hidden
              className="block h-px w-10"
              style={{
                background:
                  'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.55) 100%)',
              }}
            />
            <span
              className="text-[11px] font-medium tracking-[0.28em] uppercase"
              style={{
                fontFamily: FONT_BODY,
                color: 'rgba(214,168,94,0.7)',
              }}
            >
              Erstgespräch
            </span>
          </div>
          <h1
            className="m-0 mb-5 text-[clamp(2.2rem,5.5vw,3.6rem)] font-extralight leading-[1.08] tracking-[-0.01em]"
            style={{
              fontFamily: FONT_HEAD,
              color: 'rgba(248,243,232,0.96)',
              textShadow: '0 1px 0 rgba(20,12,6,0.55)',
            }}
          >
            Ein ruhiger Raum für <Hl>Klarheit</Hl>, bevor der nächste <Hl>bewusste Schritt</Hl> entsteht.
          </h1>
          <p
            className="m-0 max-w-[640px] text-[clamp(1rem,1.05vw,1.125rem)] font-light leading-[1.62]"
            style={{
              fontFamily: FONT_BODY,
              color: 'rgba(244,239,230,0.7)',
            }}
          >
            15 Minuten. Vertraulich. Zur <Hl>Orientierung</Hl> — ich höre zu, ordne ein, und finde mit
            dir heraus, was für dich oder dein Team <Hl>wirklich Sinn ergibt</Hl>.
          </p>

          <ul
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[640px]"
            style={{ fontFamily: FONT_BODY }}
          >
            {[
              { icon: Clock, label: '15 Minuten' },
              { icon: ShieldCheck, label: 'Vertraulich' },
              { icon: Sparkles, label: 'Klarheit & Orientierung' },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2.5 rounded-[12px] px-3.5 py-2.5"
                style={{
                  background: 'rgba(18,16,14,0.5)',
                  border: '1px solid rgba(214,168,94,0.12)',
                }}
              >
                <Icon size={15} strokeWidth={1.5} className="text-[#C99B62]" aria-hidden />
                <span className="text-[12px] uppercase tracking-[0.18em] text-[rgba(238,230,216,0.68)]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </header>

        {/* Body */}
        {submitted ? (
          <div
            className="rounded-[22px] p-8 sm:p-12 max-w-[760px]"
            style={{
              background: 'linear-gradient(180deg, rgba(18,16,14,0.74) 0%, rgba(8,7,6,0.82) 100%)',
              border: '1px solid rgba(214,168,94,0.16)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(214,168,94,0.18) 0%, rgba(214,168,94,0) 70%)',
                  border: '1px solid rgba(214,168,94,0.32)',
                }}
              >
                <CheckCircle size={22} strokeWidth={1.5} className="text-[#D6A85E]" aria-hidden />
              </span>
              <h2
                className="m-0 text-[clamp(1.4rem,2.6vw,1.85rem)] font-light tracking-[-0.005em]"
                style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.96)' }}
              >
                Danke — deine Anfrage ist bei mir.
              </h2>
            </div>
            <p
              className="m-0 mb-2 text-[15px] leading-[1.7]"
              style={{ fontFamily: FONT_BODY, color: 'rgba(244,239,230,0.78)' }}
            >
              Ich melde mich innerhalb von 24 Stunden persönlich — in der Regel deutlich schneller.
              Eine Bestätigung erhältst du an <span className="text-[#D6A85E]">{form.email}</span>.
            </p>
            <p
              className="m-0 text-[13px] leading-[1.7]"
              style={{ fontFamily: FONT_BODY, color: 'rgba(238,230,216,0.5)' }}
            >
              Falls dringend: <a href="mailto:mail@anatoly-mook.de" className="text-[#C99B62] underline-offset-4 hover:underline">mail@anatoly-mook.de</a>
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-[12px] px-5 py-3 text-[13px] font-medium tracking-[0.18em] uppercase transition-colors duration-300"
                style={{
                  fontFamily: FONT_BODY,
                  background: 'rgba(214,168,94,0.08)',
                  border: '1px solid rgba(214,168,94,0.22)',
                  color: 'rgba(244,239,230,0.92)',
                }}
              >
                <ArrowLeft size={14} strokeWidth={1.75} />
                Zur Startseite
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14"
          >
            {/* Linke Spalte: Felder */}
            <div
              className="rounded-[22px] p-7 sm:p-9"
              style={{
                background: 'linear-gradient(180deg, rgba(18,16,14,0.72) 0%, rgba(8,7,6,0.8) 100%)',
                border: '1px solid rgba(214,168,94,0.14)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={User} label="Vor- und Nachname" required>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="z. B. Anna Müller"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field icon={Mail} label="E-Mail" required>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="name@firma.de"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field icon={Phone} label="Telefon">
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="optional"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field icon={Building2} label="Unternehmen / Kontext">
                  <input
                    type="text"
                    autoComplete="organization"
                    placeholder="optional"
                    value={form.company}
                    onChange={(e) => update('company', e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Worum geht es kurz?" required={false}>
                  <input
                    type="text"
                    placeholder="z. B. Klarheit in einer Entscheidung, Teamsituation, Persönlichkeit"
                    value={form.topic}
                    onChange={(e) => update('topic', e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Label>Wie möchtest du sprechen?</Label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['video', 'phone', 'in_person'] as Channel[]).map((c) => {
                    const active = form.channel === c;
                    return (
                      <button
                        type="button"
                        key={c}
                        onClick={() => update('channel', c)}
                        className="rounded-[12px] px-3 py-3 text-[12px] font-medium uppercase tracking-[0.16em] transition-all duration-300"
                        style={{
                          fontFamily: FONT_BODY,
                          background: active
                            ? 'linear-gradient(180deg, rgba(214,168,94,0.22) 0%, rgba(166,116,60,0.18) 100%)'
                            : 'rgba(12,10,8,0.5)',
                          border: active
                            ? '1px solid rgba(214,168,94,0.55)'
                            : '1px solid rgba(214,168,94,0.14)',
                          color: active
                            ? 'rgba(248,243,232,0.95)'
                            : 'rgba(238,230,216,0.62)',
                        }}
                      >
                        {channelLabel[c]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={CalendarIcon} label="Wunschdatum">
                  <input
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => update('preferredDate', e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field icon={Clock} label="Wunschzeit">
                  <input
                    type="time"
                    value={form.preferredTime}
                    onChange={(e) => update('preferredTime', e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Nachricht (optional)">
                  <textarea
                    rows={4}
                    placeholder="Wenn du magst, ein, zwei Sätze zum Kontext."
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className={inputClass + ' resize-none'}
                  />
                </Field>
              </div>

              <label
                className="mt-6 flex items-start gap-3 cursor-pointer select-none"
                style={{ fontFamily: FONT_BODY }}
              >
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update('consent', e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#C99B62]"
                />
                <span className="text-[12.5px] leading-[1.6] text-[rgba(238,230,216,0.62)]">
                  Ich bin damit einverstanden, dass meine Angaben zur Klärung meiner Anfrage gespeichert
                  werden. Details in der{' '}
                  <Link to="/datenschutz" className="text-[#C99B62] underline-offset-4 hover:underline">
                    Datenschutzerklärung
                  </Link>
                  .
                </span>
              </label>

              {error && (
                <p
                  className="mt-5 text-[13px] font-medium leading-[1.55]"
                  style={{
                    fontFamily: FONT_BODY,
                    color: 'rgba(248,180,168,0.95)',
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!isValid || submitting}
                className="group mt-7 inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-[14px] px-7 py-4 text-[15px] font-semibold tracking-wide transition-all duration-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45"
                style={{
                  fontFamily: FONT_BODY,
                  background:
                    'linear-gradient(180deg, rgba(214,168,94,0.96) 0%, rgba(166,116,60,0.92) 50%, rgba(120,78,40,0.95) 100%)',
                  color: 'rgba(12,8,6,0.92)',
                  border: '1px solid rgba(255,230,200,0.22)',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)',
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Senden…
                  </>
                ) : (
                  <>
                    Anfrage senden
                    <ChevronsRight size={18} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>

            {/* Rechte Spalte: Vertrauens-/Erwartungs-Inhalt */}
            <aside
              className="rounded-[22px] p-7 sm:p-9 self-start"
              style={{
                background:
                  'linear-gradient(180deg, rgba(16,14,12,0.6) 0%, rgba(10,9,8,0.7) 100%)',
                border: '1px solid rgba(214,168,94,0.12)',
              }}
            >
              <h2
                className="m-0 mb-5 text-[clamp(1.15rem,1.6vw,1.4rem)] font-light tracking-[-0.005em]"
                style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.95)' }}
              >
                Was dich erwartet
              </h2>
              <ol className="m-0 list-none space-y-5 p-0">
                {[
                  {
                    title: <>Ich höre <Hl>wirklich</Hl> zu.</>,
                    body: (
                      <>
                        Nicht, um schnell zu antworten. Sondern um zu verstehen, was hinter dem Druck,
                        der Unruhe oder der aktuellen Situation <Hl>tatsächlich</Hl> liegt.
                      </>
                    ),
                  },
                  {
                    title: <>Ich ordne mit dir ein.</>,
                    body: (
                      <>
                        Oft geht es nicht darum, mehr zu tun — sondern <Hl>klarer zu sehen</Hl>. Wo
                        stehst du, was würde wirklich helfen, was nicht. Präzise, ohne Umweg.
                      </>
                    ),
                  },
                  {
                    title: <>Du entscheidest in <Hl>Ruhe</Hl>.</>,
                    body: (
                      <>
                        Du bekommst eine ehrliche Empfehlung — und Zeit. Ich setze nicht auf
                        Standardlösungen und nicht auf Druck.
                      </>
                    ),
                  },
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-medium"
                      style={{
                        fontFamily: FONT_BODY,
                        color: '#1A130A',
                        background: 'linear-gradient(180deg, #E0B27A 0%, #B98452 100%)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                      }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p
                        className="m-0 mb-1 text-[14px] font-medium tracking-[0.005em]"
                        style={{ fontFamily: FONT_BODY, color: 'rgba(244,239,230,0.92)' }}
                      >
                        {step.title}
                      </p>
                      <p
                        className="m-0 text-[13.5px] leading-[1.62]"
                        style={{ fontFamily: FONT_BODY, color: 'rgba(238,230,216,0.6)' }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <p
                className="m-0 mt-7 text-[13.5px] leading-[1.66] italic"
                style={{
                  fontFamily: FONT_BODY,
                  color: 'rgba(238,230,216,0.55)',
                }}
              >
                Im Gespräch entsteht ein <Hl>präziser Blick</Hl> darauf, was wirklich relevant ist —
                und welcher nächste Schritt langfristig <Hl>Sinn ergibt</Hl>.
              </p>

              <div
                className="my-8 h-px w-full"
                aria-hidden
                style={{
                  background:
                    'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.32) 50%, rgba(214,168,94,0) 100%)',
                }}
              />

              <div className="grid grid-cols-1 gap-3" style={{ fontFamily: FONT_BODY }}>
                <a
                  href="mailto:mail@anatoly-mook.de"
                  className="group inline-flex items-center gap-3 rounded-[12px] px-4 py-3 transition-colors duration-300"
                  style={{
                    background: 'rgba(12,10,8,0.5)',
                    border: '1px solid rgba(214,168,94,0.12)',
                  }}
                >
                  <Mail size={15} strokeWidth={1.5} className="text-[#C99B62]" aria-hidden />
                  <span className="text-[13.5px] text-[rgba(244,239,230,0.86)] group-hover:text-white">
                    mail@anatoly-mook.de
                  </span>
                </a>
                <a
                  href="tel:+4923033340628"
                  className="group inline-flex items-center gap-3 rounded-[12px] px-4 py-3 transition-colors duration-300"
                  style={{
                    background: 'rgba(12,10,8,0.5)',
                    border: '1px solid rgba(214,168,94,0.12)',
                  }}
                >
                  <Phone size={15} strokeWidth={1.5} className="text-[#C99B62]" aria-hidden />
                  <span className="text-[13.5px] text-[rgba(244,239,230,0.86)] group-hover:text-white">
                    +49 230 333 40628
                  </span>
                </a>
              </div>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em]"
      style={{
        fontFamily: FONT_BODY,
        color: 'rgba(214,168,94,0.65)',
      }}
    >
      {children}
    </span>
  );
}

function Field({
  icon: Icon,
  label,
  required,
  children,
}: {
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string; 'aria-hidden'?: boolean }>;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em]"
        style={{
          fontFamily: FONT_BODY,
          color: 'rgba(214,168,94,0.65)',
        }}
      >
        {Icon ? <Icon size={13} strokeWidth={1.6} aria-hidden /> : null}
        {label}
        {required ? <span className="text-[rgba(214,168,94,0.85)]">*</span> : null}
      </span>
      {children}
    </label>
  );
}
