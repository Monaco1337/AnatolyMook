import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { STATIC_SEMINARS, type Seminar, type SeminarFormat } from '../data/seminars';

const FONT_DISPLAY =
  "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" as const;
const FONT_BODY =
  "'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" as const;

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

type FormatFilter = 'all' | SeminarFormat;

function AtmosphereGrain({ className, opacity = 0.04 }: { className?: string; opacity?: number }) {
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

export default function Seminare() {
  const { t } = useLanguage();
  const rootRef = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<FormatFilter>('all');
  const [seminars, setSeminars] = useState<Seminar[]>(STATIC_SEMINARS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error: err } = await supabase
          .from('seminars')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });
        if (cancelled) return;
        if (err || !data || data.length === 0) return;
        const mapped: Seminar[] = data.map((row: any) => ({
          id: row.id,
          format: (row.format ?? 'praesenz') as SeminarFormat,
          title: row.title ?? '',
          subtitle: row.subtitle ?? row.tagline ?? '',
          tagline: row.tagline ?? row.subtitle ?? '',
          description: row.description ?? '',
          essence: row.essence ?? '',
          duration: row.duration ?? '',
          price: row.price ?? '',
          capacity: row.capacity ?? '',
          includes: Array.isArray(row.includes) ? row.includes : [],
          module: Array.isArray(row.module) ? row.module : [],
          transformationen: Array.isArray(row.transformationen) ? row.transformationen : [],
          dates: Array.isArray(row.dates) ? row.dates : []
        }));
        setSeminars(mapped);
      } catch {
        /* Fallback bleibt STATIC_SEMINARS */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filters: { id: FormatFilter; label: string }[] = useMemo(
    () => [
      { id: 'all', label: t.seminare.filter.all },
      { id: 'praesenz', label: t.formats.praesenz },
      { id: 'online-live', label: t.formats.onlineLive },
      { id: 'webinar', label: t.formats.webinar },
      { id: 'on-demand', label: t.formats.onDemand },
      { id: 'hybrid', label: t.formats.hybrid }
    ],
    [t]
  );

  const visible = useMemo(
    () => (selected === 'all' ? seminars : seminars.filter(s => s.format === selected)),
    [seminars, selected]
  );

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
      className="sm-root bg-[#020202] text-[#F4F4F4] antialiased selection:bg-[rgba(185,130,63,0.22)] selection:text-[#FAF7F2]"
    >
      <AtmosphereGrain className="fixed z-[40]" opacity={0.035} />

      {/* HERO — kompakt, editorial */}
      <section
        className="relative overflow-hidden pb-[clamp(1.75rem,4vw,2.75rem)] pt-[clamp(6.5rem,11vw,8.5rem)]"
        aria-labelledby="sm-hero-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 42% at 50% 22%, rgba(214,168,94,0.06) 0%, transparent 60%)'
          }}
        />
        <div className="relative z-[2] mx-auto w-full max-w-[860px] px-6 sm:px-10 md:px-14">
          <div className="flex flex-col items-center text-center" data-reveal>
            <span
              className="uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.625rem',
                letterSpacing: '0.44em',
                color: 'rgba(214,188,152,0.55)'
              }}
            >
              Seminare
            </span>
            <h1
              id="sm-hero-heading"
              className="m-0 mt-4 max-w-[22ch] text-pretty leading-[1.06] tracking-[-0.032em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 100,
                fontSize: 'clamp(1.85rem, 1rem + 3.1vw, 2.85rem)',
                color: 'rgba(250,247,240,0.96)'
              }}
            >
              Räume für <Accent>Klarheit</Accent>, Tiefe und Präsenz.
            </h1>
            <HairLine className="mx-auto mt-6 max-w-[2rem]" />
          </div>
        </div>
      </section>

      {/* FILTER — ruhige Pills */}
      <section
        className="relative pb-[clamp(1.5rem,3.5vw,2.5rem)] pt-[clamp(0.75rem,2vw,1.5rem)]"
        aria-label="Format-Filter"
      >
        <div className="mx-auto w-full max-w-[920px] px-6 sm:px-10 md:px-14">
          <div
            className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2"
            role="tablist"
            aria-label="Format-Filter"
            data-reveal
          >
            {filters.map(f => {
              const active = f.id === selected;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelected(f.id)}
                  className="sm-pill"
                  data-active={active ? 'true' : 'false'}
                >
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '0.625rem',
                      letterSpacing: '0.3em'
                    }}
                  >
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* LISTE — direkt die Angebote */}
      <section
        className="relative pb-[clamp(3rem,7vw,4.5rem)]"
        aria-label="Aktuelle Seminare"
      >
        <div className="mx-auto w-full max-w-[920px] px-6 sm:px-10 md:px-14">
          <div
            className="mb-[clamp(0.75rem,1.5vw,1.25rem)] flex items-center justify-between gap-4"
            data-reveal
          >
            <span
              className="uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.625rem',
                letterSpacing: '0.38em',
                color: 'rgba(214,188,152,0.5)'
              }}
            >
              {selected === 'all' ? 'Alle Formate' : formatLabel(selected as SeminarFormat)}
            </span>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.625rem',
                letterSpacing: '0.32em',
                color: 'rgba(214,188,152,0.45)'
              }}
              className="uppercase"
            >
              {visible.length} {visible.length === 1 ? 'Angebot' : 'Angebote'}
            </span>
          </div>

          {visible.length === 0 ? (
            <div
              className="border-t border-[rgba(214,168,94,0.22)] py-12 text-center"
              data-reveal
            >
              <p
                className="m-0"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.88rem, 0.85rem + 0.1vw, 0.95rem)',
                  color: 'rgba(229,226,219,0.5)'
                }}
              >
                In dieser Auswahl ist aktuell kein Termin offen.
              </p>
            </div>
          ) : (
            <ol
              className="list-none border-t border-[rgba(214,168,94,0.22)] divide-y divide-[rgba(214,168,94,0.12)]"
              style={{ padding: 0, margin: 0 }}
            >
              {visible.map((s, i) => (
                <li
                  key={s.id}
                  data-reveal
                  style={{ ['--rev-delay' as never]: `${i * 55}ms` }}
                  className="sm-row group"
                >
                  <Link
                    to={`/seminare/${encodeURIComponent(s.id)}`}
                    aria-label={`${s.title} – ${s.subtitle}`}
                    className="relative grid grid-cols-1 gap-x-6 gap-y-2 px-3 py-[clamp(1.1rem,2.4vw,1.5rem)] sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_auto] sm:items-center sm:gap-x-8 sm:px-5 md:px-6"
                  >
                    {/* Linke Spalte: Titel + Subtitle + Format-Marker */}
                    <div className="flex flex-col">
                      <span
                        className="sm-row-eyebrow uppercase"
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: '0.6rem',
                          letterSpacing: '0.3em',
                          color: 'rgba(214,188,152,0.55)'
                        }}
                      >
                        {formatLabel(s.format)}
                      </span>
                      <span
                        className="sm-row-title mt-1.5 leading-[1.12] tracking-[-0.02em]"
                        style={{
                          fontFamily: FONT_DISPLAY,
                          fontWeight: 200,
                          fontSize: 'clamp(1.18rem, 0.96rem + 0.65vw, 1.4rem)',
                          color: 'rgba(252,247,238,0.94)'
                        }}
                      >
                        {s.title}
                      </span>
                      <span
                        className="mt-1 leading-[1.45]"
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: 'clamp(0.82rem, 0.8rem + 0.08vw, 0.88rem)',
                          color: 'rgba(229,226,219,0.55)'
                        }}
                      >
                        {s.subtitle}
                      </span>
                    </div>

                    {/* Mittlere Spalte: Termine */}
                    <div className="flex flex-col gap-1">
                      {s.dates.slice(0, 3).map((d, idx) => (
                        <div
                          key={`${s.id}-d-${idx}`}
                          className="flex items-baseline gap-3"
                        >
                          <span
                            className="shrink-0 tabular-nums"
                            style={{
                              fontFamily: FONT_DISPLAY,
                              fontWeight: 300,
                              fontSize: 'clamp(0.78rem, 0.76rem + 0.08vw, 0.86rem)',
                              letterSpacing: '0.04em',
                              color: 'rgba(229,200,156,0.7)',
                              minWidth: '3.5rem'
                            }}
                          >
                            {d.month}
                            {d.year ? ` ${d.year.slice(-2)}` : ''}
                          </span>
                          <span
                            className="shrink-0 tabular-nums"
                            style={{
                              fontFamily: FONT_BODY,
                              fontSize: 'clamp(0.78rem, 0.76rem + 0.08vw, 0.86rem)',
                              color: 'rgba(229,226,219,0.7)'
                            }}
                          >
                            {d.days}
                          </span>
                          <span
                            className="truncate"
                            style={{
                              fontFamily: FONT_BODY,
                              fontSize: 'clamp(0.78rem, 0.76rem + 0.08vw, 0.86rem)',
                              color: 'rgba(229,226,219,0.5)'
                            }}
                          >
                            {d.location}
                          </span>
                        </div>
                      ))}
                      <div
                        className="mt-1 flex items-center gap-3"
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: '0.625rem',
                          letterSpacing: '0.18em',
                          color: 'rgba(214,188,152,0.45)'
                        }}
                      >
                        <span className="uppercase">{s.duration}</span>
                        <span aria-hidden style={{ color: 'rgba(214,168,94,0.35)' }}>·</span>
                        <span className="uppercase">{s.capacity}</span>
                      </div>
                    </div>

                    {/* Rechte Spalte: Preis + Affordance */}
                    <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end sm:gap-4">
                      <span
                        className="tabular-nums"
                        style={{
                          fontFamily: FONT_DISPLAY,
                          fontWeight: 300,
                          fontSize: 'clamp(0.95rem, 0.88rem + 0.3vw, 1.08rem)',
                          letterSpacing: '0.02em',
                          color: 'rgba(244,228,196,0.92)'
                        }}
                      >
                        {s.price}
                      </span>
                      <span
                        aria-hidden
                        className="sm-cta-mini inline-flex items-center gap-2"
                      >
                        <span
                          className="sm-cta-label hidden sm:inline uppercase"
                          style={{
                            fontFamily: FONT_BODY,
                            fontSize: '0.6rem',
                            letterSpacing: '0.3em',
                            color: 'rgba(229,200,156,0.65)'
                          }}
                        >
                          Ansehen
                        </span>
                        <svg
                          className="sm-cta-arrow"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          style={{ color: 'rgba(229,200,156,0.75)' }}
                        >
                          <path
                            d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* CTA — leise */}
      <section
        className="relative overflow-hidden pb-[clamp(4rem,9vw,6.5rem)] pt-[clamp(1rem,2.5vw,1.75rem)]"
        aria-labelledby="sm-cta-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 85%, rgba(214,168,94,0.07) 0%, transparent 60%)'
          }}
        />
        <div
          className="relative z-[2] mx-auto w-full max-w-[640px] px-6 text-center sm:px-10 md:px-14"
          data-reveal
        >
          <h2
            id="sm-cta-heading"
            className="m-0 max-w-[22ch] mx-auto text-pretty leading-[1.12] tracking-[-0.026em]"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 100,
              fontSize: 'clamp(1.25rem, 0.94rem + 1.25vw, 1.7rem)',
              color: 'rgba(250,247,240,0.94)'
            }}
          >
            Nicht sicher, welches <Accent>passt</Accent>?
          </h2>
          <p
            className="m-0 mt-4 max-w-[40ch] mx-auto text-pretty leading-[1.55]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.88rem, 0.85rem + 0.1vw, 0.94rem)',
              color: 'rgba(229,226,219,0.55)'
            }}
          >
            Ein kurzes Gespräch — und der richtige Rahmen wird klar.
          </p>
          <Link
            to="/erstgespraech"
            className="sm-cta group/cta mt-6 inline-flex items-center gap-3 rounded-full px-6 py-2.5"
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
                fontSize: '0.7rem',
                letterSpacing: '0.28em',
                color: 'rgba(229,200,156,0.85)'
              }}
            >
              Erstgespräch anfragen
            </span>
            <span
              aria-hidden
              className="block h-px w-7 transition-[width] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:w-12"
              style={{

              }}
            />
          </Link>
        </div>
      </section>

      <style>{`
        .sm-root [data-reveal] {
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--rev-delay, 0ms);
          will-change: opacity, transform;
        }
        .sm-root [data-reveal].is-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Filter-Pills */
        .sm-pill {
          appearance: none;
          background: rgba(214,168,94,0);
          border: 1px solid rgba(214,168,94,0.18);
          color: rgba(214,188,152,0.65);
          padding: 0.5rem 0.85rem;
          border-radius: 9999px;
          transition:
            background 500ms ease,
            border-color 500ms ease,
            color 500ms ease,
            box-shadow 500ms ease;
          cursor: pointer;
        }
        .sm-pill:hover {
          color: rgba(244,228,196,0.85);
          border-color: rgba(214,168,94,0.32);
        }
        .sm-pill[data-active="true"] {
          color: rgba(244,228,196,0.95);
          border-color: rgba(214,168,94,0.55);
          background:
            linear-gradient(180deg, rgba(28,18,10,0.6) 0%, rgba(20,12,6,0.7) 100%);
          box-shadow:
            inset 0 1px 0 rgba(242, 226, 192, 0.16),
            inset 0 -1px 0 rgba(90, 56, 30, 0.42);
        }
        .sm-pill:focus-visible {
          outline: none;
          box-shadow:
            inset 0 0 0 1px rgba(214,168,94,0.32),
            0 0 0 3px rgba(185,130,63,0.18);
        }

        /* Editorial-Reihen — klare Klick-Affordance */
        .sm-row a {
          position: relative;
          color: inherit;
          text-decoration: none;
          cursor: pointer;
          isolation: isolate;
          transition:
            background 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sm-row a::before {
          content: '';
          position: absolute;
          left: 0;
          top: 14%;
          bottom: 14%;
          width: 2px;
          border-radius: 1px;
          background: linear-gradient(180deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.75) 50%, rgba(214,168,94,0) 100%);
          opacity: 0;
          transform: scaleY(0.4);
          transition: opacity 700ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sm-row .sm-row-title {
          transition: color 600ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sm-row .sm-cta-arrow {
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1), color 600ms ease;
        }
        .sm-row .sm-cta-label {
          opacity: 0.75;
          transition: opacity 600ms ease, color 600ms ease;
        }
        .sm-row:hover a,
        .sm-row a:focus-visible {
          background:
            linear-gradient(90deg, rgba(214,168,94,0.02) 0%, rgba(214,168,94,0.07) 50%, rgba(214,168,94,0.02) 100%);
        }
        .sm-row:hover a::before,
        .sm-row a:focus-visible::before {
          opacity: 1;
          transform: scaleY(1);
        }
        .sm-row:hover .sm-row-title,
        .sm-row a:focus-visible .sm-row-title {
          color: rgba(252,247,238,1);
          transform: translateX(2px);
        }
        .sm-row:hover .sm-cta-label,
        .sm-row a:focus-visible .sm-cta-label {
          opacity: 1;
          color: rgba(244,228,196,0.9);
        }
        .sm-row:hover .sm-cta-arrow,
        .sm-row a:focus-visible .sm-cta-arrow {
          transform: translateX(3px);
          color: rgba(244,228,196,1);
        }
        .sm-row a:focus-visible {
          outline: none;
          box-shadow:
            inset 0 0 0 1px rgba(214,168,94,0.22),
            0 0 0 3px rgba(185,130,63,0.14);
          border-radius: 6px;
        }
        @media (hover: none) {
          .sm-row a::before {
            opacity: 0.55;
            transform: scaleY(1);
          }
          .sm-row .sm-cta-arrow {
            color: rgba(244,228,196,0.9);
          }
        }

        .sm-cta:focus-visible {
          outline: none;
          box-shadow:
            inset 0 1px 0 rgba(242, 226, 192, 0.32),
            inset 0 0 0 1px rgba(214, 168, 94, 0.32),
            0 0 0 3px rgba(185, 130, 63, 0.18);
        }
        @media (prefers-reduced-motion: reduce) {
          .sm-root [data-reveal] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
