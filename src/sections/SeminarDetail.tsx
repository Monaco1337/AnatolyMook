import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronsRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getSeminarById, type SeminarFormat } from '../data/seminars';

const FONT_DISPLAY =
  "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" as const;
const FONT_BODY =
  "'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" as const;

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

function AtmosphereGrain({ className, opacity = 0.035 }: { className?: string; opacity?: number }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
      style={{
        backgroundImage: GRAIN_SVG,
        backgroundRepeat: 'repeat',
        opacity,
        mixBlendMode: 'overlay'
      }}
    />
  );
}

function HairLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block h-px ${className ?? ''}`}
      style={{

      }}
    />
  );
}

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{

        color: 'transparent'
      }}
    >
      {children}
    </span>
  );
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, []);
  return ref;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="uppercase"
      style={{
        fontFamily: FONT_BODY,
        fontSize: '0.625rem',
        letterSpacing: '0.4em',
        color: 'rgba(214,188,152,0.55)'
      }}
    >
      {children}
    </span>
  );
}

export default function SeminarDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const rootRef = useReveal<HTMLDivElement>();
  const seminar = id ? getSeminarById(id) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

  if (!seminar) {
    return (
      <div className="min-h-screen bg-[#020202] text-[#F4F4F4]">
        <div className="mx-auto flex min-h-[60svh] w-full max-w-[720px] flex-col items-center justify-center px-6 text-center">
          <SectionLabel>Seminar nicht gefunden</SectionLabel>
          <p
            className="m-0 mt-6 max-w-[40ch]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.95rem',
              color: 'rgba(229,226,219,0.6)',
              lineHeight: 1.6
            }}
          >
            Dieses Angebot ist aktuell nicht verfügbar oder wurde umbenannt.
          </p>
          <Link
            to="/seminare"
            className="sd-cta mt-7 inline-flex items-center gap-3 rounded-full px-6 py-2.5"
            style={{

              border: '1px solid rgba(166, 124, 82, 0.55)'
            }}
          >
            <span
              className="uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.7rem',
                letterSpacing: '0.28em',
                color: 'rgba(229,200,156,0.85)'
              }}
            >
              Zur Übersicht
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const formatLabel = (f: SeminarFormat) =>
    f === 'praesenz'
      ? t.formats.praesenz
      : f === 'online-live'
        ? t.formats.onlineLive
        : f === 'webinar'
          ? t.formats.webinar
          : f === 'on-demand'
            ? t.formats.onDemand
            : t.formats.hybrid;

  return (
    <div
      ref={rootRef}
      className="sd-root bg-[#020202] text-[#F4F4F4] antialiased selection:bg-[rgba(185,130,63,0.22)] selection:text-[#FAF7F2]"
    >
      <AtmosphereGrain className="fixed z-[40]" opacity={0.035} />

      {/* HERO — kompakter Editorial-Einstieg */}
      <section
        className="relative overflow-hidden pb-[clamp(2rem,4.5vw,3rem)] pt-[clamp(6.5rem,11vw,8.5rem)]"
        aria-labelledby="sd-hero-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 42% at 50% 22%, rgba(214,168,94,0.06) 0%, transparent 60%)'
          }}
        />
        <div className="relative z-[2] mx-auto w-full max-w-[760px] px-6 sm:px-10 md:px-14">
          {/* Breadcrumb */}
          <div
            className="mb-7 flex items-center justify-center gap-3"
            data-reveal
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.625rem',
              letterSpacing: '0.32em',
              color: 'rgba(214,188,152,0.45)'
            }}
          >
            <Link
              to="/formate"
              className="uppercase transition-colors duration-300"
              style={{ color: 'rgba(214,188,152,0.55)' }}
            >
              Formate
            </Link>
            <span aria-hidden style={{ color: 'rgba(214,168,94,0.35)' }}>
              ·
            </span>
            <Link
              to="/seminare"
              className="uppercase transition-colors duration-300"
              style={{ color: 'rgba(214,188,152,0.55)' }}
            >
              Seminare
            </Link>
          </div>

          <div className="flex flex-col items-center text-center" data-reveal>
            <SectionLabel>{formatLabel(seminar.format)}</SectionLabel>
            <h1
              id="sd-hero-heading"
              className="m-0 mt-4 max-w-[24ch] text-pretty leading-[1.06] tracking-[-0.032em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 100,
                fontSize: 'clamp(1.85rem, 1rem + 3.1vw, 2.85rem)',
                color: 'rgba(250,247,240,0.96)'
              }}
            >
              {seminar.title}
            </h1>
            <p
              className="m-0 mt-4 max-w-[42ch] text-pretty leading-[1.55]"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.92rem, 0.88rem + 0.14vw, 1rem)',
                color: 'rgba(229,226,219,0.62)'
              }}
            >
              {seminar.subtitle}
            </p>
            <HairLine className="mx-auto mt-7 max-w-[2rem]" />
          </div>
        </div>
      </section>

      {/* ESSENCE — Bronze-Akzent-Zitat */}
      {seminar.tagline ? (
        <section className="relative pb-[clamp(1.75rem,4vw,2.75rem)] pt-[clamp(0.5rem,1.5vw,1rem)]">
          <div
            className="relative mx-auto w-full max-w-[720px] px-6 text-center sm:px-10 md:px-14"
            data-reveal
          >
            <p
              className="m-0 max-w-[34ch] mx-auto text-pretty leading-[1.32] tracking-[-0.018em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 200,
                fontSize: 'clamp(1.05rem, 0.92rem + 0.6vw, 1.32rem)',
                color: 'rgba(250,247,240,0.9)'
              }}
            >
              <Accent>{seminar.tagline}</Accent>
            </p>
            {seminar.essence ? (
              <p
                className="m-0 mt-4 max-w-[42ch] mx-auto text-pretty leading-[1.55]"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.85rem, 0.82rem + 0.1vw, 0.92rem)',
                  color: 'rgba(229,226,219,0.55)',
                  fontStyle: 'italic'
                }}
              >
                {seminar.essence}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* BESCHREIBUNG */}
      {seminar.description ? (
        <section className="relative pb-[clamp(2.5rem,5vw,3.5rem)] pt-[clamp(0.5rem,1.5vw,1rem)]">
          <div
            className="relative mx-auto w-full max-w-[640px] px-6 text-center sm:px-10 md:px-14"
            data-reveal
          >
            <p
              className="m-0 text-pretty leading-[1.7]"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.95rem, 0.9rem + 0.18vw, 1.05rem)',
                color: 'rgba(229,226,219,0.7)'
              }}
            >
              {seminar.description}
            </p>
          </div>
        </section>
      ) : null}

      {/* TERMINE */}
      {seminar.dates.length > 0 ? (
        <section
          className="relative pb-[clamp(2.5rem,5vw,3.5rem)] pt-[clamp(0.5rem,1.5vw,1rem)]"
          aria-label="Termine"
        >
          <div className="mx-auto w-full max-w-[760px] px-6 sm:px-10 md:px-14">
            <div className="mb-4 flex items-center justify-between" data-reveal>
              <SectionLabel>Termine</SectionLabel>
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.625rem',
                  letterSpacing: '0.28em',
                  color: 'rgba(214,188,152,0.4)'
                }}
                className="uppercase"
              >
                {seminar.duration}
              </span>
            </div>
            <ul
              className="list-none border-t border-[rgba(214,168,94,0.22)] divide-y divide-[rgba(214,168,94,0.12)]"
              style={{ padding: 0, margin: 0 }}
              data-reveal
            >
              {seminar.dates.map((d, idx) => (
                <li key={`d-${idx}`} className="grid grid-cols-1 items-baseline gap-x-6 gap-y-1.5 px-1 py-[clamp(0.85rem,1.8vw,1.1rem)] sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-y-0">
                  <span
                    className="tabular-nums"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 300,
                      fontSize: 'clamp(0.92rem, 0.88rem + 0.12vw, 1rem)',
                      letterSpacing: '0.02em',
                      color: 'rgba(244,228,196,0.9)'
                    }}
                  >
                    {d.days} {d.month}
                    {d.year ? ` ${d.year.slice(-2)}` : ''}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.85rem, 0.82rem + 0.1vw, 0.92rem)',
                      color: 'rgba(229,226,219,0.62)'
                    }}
                  >
                    {d.location}
                  </span>
                  <span
                    className="uppercase tabular-nums sm:justify-self-end"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '0.62rem',
                      letterSpacing: '0.24em',
                      color:
                        d.available <= 3
                          ? 'rgba(229,200,156,0.85)'
                          : 'rgba(214,188,152,0.5)'
                    }}
                  >
                    {d.available >= 999
                      ? 'Jederzeit verfügbar'
                      : d.available <= 0
                        ? 'Ausgebucht'
                        : `${d.available} Plätze frei`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* PROGRAMM */}
      {seminar.module.length > 0 ? (
        <section
          className="relative pb-[clamp(2.5rem,5vw,3.5rem)] pt-[clamp(0.5rem,1.5vw,1rem)]"
          aria-label="Programm"
        >
          <div className="mx-auto w-full max-w-[760px] px-6 sm:px-10 md:px-14">
            <div className="mb-4" data-reveal>
              <SectionLabel>Programm</SectionLabel>
            </div>
            <ol
              className="list-none border-t border-[rgba(214,168,94,0.22)] divide-y divide-[rgba(214,168,94,0.12)]"
              style={{ padding: 0, margin: 0 }}
              data-reveal
            >
              {seminar.module.map((m, idx) => (
                <li
                  key={`m-${idx}`}
                  className="grid grid-cols-1 gap-x-8 gap-y-2 px-1 py-[clamp(1rem,2.2vw,1.4rem)] sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:items-baseline"
                >
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 300,
                      fontSize: '0.7rem',
                      letterSpacing: '0.28em',
                      color: 'rgba(229,200,156,0.7)'
                    }}
                  >
                    {m.tag}
                  </span>
                  <div className="flex flex-col">
                    <span
                      className="leading-[1.2] tracking-[-0.018em]"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 300,
                        fontSize: 'clamp(1rem, 0.92rem + 0.3vw, 1.15rem)',
                        color: 'rgba(252,247,238,0.92)'
                      }}
                    >
                      {m.title}
                    </span>
                    <span
                      className="mt-1.5 max-w-[58ch] leading-[1.55]"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.85rem, 0.82rem + 0.1vw, 0.92rem)',
                        color: 'rgba(229,226,219,0.6)'
                      }}
                    >
                      {m.content}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* ENTHALTEN */}
      {seminar.includes.length > 0 ? (
        <section
          className="relative pb-[clamp(2.5rem,5vw,3.5rem)] pt-[clamp(0.5rem,1.5vw,1rem)]"
          aria-label="Im Seminar enthalten"
        >
          <div className="mx-auto w-full max-w-[760px] px-6 sm:px-10 md:px-14">
            <div className="mb-4" data-reveal>
              <SectionLabel>Enthalten</SectionLabel>
            </div>
            <ul
              className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2"
              style={{ padding: 0, margin: 0, listStyle: 'none' }}
              data-reveal
            >
              {seminar.includes.map((item, idx) => (
                <li
                  key={`inc-${idx}`}
                  className="flex items-baseline gap-3"
                >
                  <span
                    aria-hidden
                    className="mt-[0.45rem] block h-px w-3 shrink-0"
                    style={{

                    }}
                  />
                  <span
                    className="leading-[1.55]"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.86rem, 0.84rem + 0.08vw, 0.92rem)',
                      color: 'rgba(229,226,219,0.7)'
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* TRANSFORMATIONEN */}
      {seminar.transformationen.length > 0 ? (
        <section
          className="relative pb-[clamp(2.5rem,5vw,3.5rem)] pt-[clamp(0.5rem,1.5vw,1rem)]"
          aria-label="Transformationen"
        >
          <div className="mx-auto w-full max-w-[760px] px-6 sm:px-10 md:px-14">
            <div className="mb-4" data-reveal>
              <SectionLabel>Transformation</SectionLabel>
            </div>
            <ul
              className="grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:gap-x-8"
              style={{ padding: 0, margin: 0, listStyle: 'none' }}
              data-reveal
            >
              {seminar.transformationen.map((tr, idx) => (
                <li
                  key={`tr-${idx}`}
                  className="flex items-center justify-between gap-4 border-b border-[rgba(214,168,94,0.12)] py-2.5 sm:border-b-0 sm:py-0"
                >
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '0.85rem',
                      color: 'rgba(229,226,219,0.5)'
                    }}
                  >
                    {tr.von}
                  </span>
                  <span
                    aria-hidden
                    className="block h-px w-6 shrink-0"
                    style={{

                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 300,
                      fontSize: '0.92rem',
                      color: 'rgba(244,228,196,0.9)'
                    }}
                  >
                    {tr.zu}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* INVESTITION + CTA */}
      <section
        className="relative overflow-hidden pb-[clamp(5rem,11vw,8rem)] pt-[clamp(1.5rem,3.5vw,2.5rem)]"
        aria-labelledby="sd-cta-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 85%, rgba(214,168,94,0.08) 0%, transparent 60%)'
          }}
        />
        <div
          className="relative z-[2] mx-auto w-full max-w-[640px] px-6 text-center sm:px-10 md:px-14"
          data-reveal
        >
          <SectionLabel>Investition</SectionLabel>
          <p
            id="sd-cta-heading"
            className="m-0 mt-3 tabular-nums leading-[1.05] tracking-[-0.026em]"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 200,
              fontSize: 'clamp(1.7rem, 1rem + 2.4vw, 2.5rem)',
              color: 'rgba(250,247,240,0.96)'
            }}
          >
            {seminar.price}
          </p>
          <p
            className="m-0 mt-3"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.78rem',
              letterSpacing: '0.04em',
              color: 'rgba(214,188,152,0.5)'
            }}
          >
            {seminar.capacity}
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              to={`/booking?seminar=${encodeURIComponent(seminar.id)}`}
              className="sd-cta group/cta inline-flex items-center gap-3 rounded-full px-7 py-3"
              style={{

                border: '1px solid rgba(166, 124, 82, 0.55)',
                boxShadow:
                  'inset 0 1px 0 rgba(242, 226, 192, 0.22), inset 0 -1px 0 rgba(90, 56, 30, 0.55), 0 6px 18px -8px rgba(0, 0, 0, 0.65)'
              }}
            >
              <span
                className="uppercase"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.72rem',
                  letterSpacing: '0.3em',
                  color: 'rgba(229,200,156,0.95)'
                }}
              >
                Jetzt buchen
              </span>
              <span
                aria-hidden
                className="block h-px w-7 transition-[width] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:w-12"
                style={{

                }}
              />
            </Link>
            <Link
              to="/erstgespraech"
              className="sd-cta-secondary inline-flex items-center gap-2 px-3 py-2"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.7rem',
                letterSpacing: '0.28em',
                color: 'rgba(214,188,152,0.65)'
              }}
            >
              <span className="uppercase">Fragen klären</span>
              <ChevronsRight size={12} strokeWidth={2.35} aria-hidden className="opacity-80" />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .sd-root [data-reveal] {
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--rev-delay, 0ms);
          will-change: opacity, transform;
        }
        .sd-root [data-reveal].is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .sd-root a { color: inherit; text-decoration: none; }
        .sd-root a:hover { color: rgba(244,228,196,0.95); }
        .sd-cta:focus-visible {
          outline: none;
          box-shadow:
            inset 0 1px 0 rgba(242, 226, 192, 0.32),
            inset 0 0 0 1px rgba(214, 168, 94, 0.32),
            0 0 0 3px rgba(185, 130, 63, 0.18);
        }
        .sd-cta-secondary { transition: color 500ms ease; }
        .sd-cta-secondary:hover { color: rgba(244,228,196,0.92); }
        @media (prefers-reduced-motion: reduce) {
          .sd-root [data-reveal] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
