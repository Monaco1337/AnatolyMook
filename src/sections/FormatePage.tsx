import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const FONT_DISPLAY =
  "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" as const;
const FONT_BODY =
  "'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" as const;

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

type Format = {
  index: string;
  title: string;
  /** Eine knappe, editorial-typografische Zeile — kein Marketingsatz. */
  line: string;
  to: string;
};

const FORMATE: Format[] = [
  {
    index: 'I',
    title: 'Seminare',
    line: 'Räume für Tiefe, Präsenz und kollektive Klarheit.',
    to: '/seminare'
  },
  {
    index: 'II',
    title: 'Coaching',
    line: 'Persönliche Begleitung für Entscheidungen und Führung.',
    to: '/coaching'
  },
  {
    index: 'III',
    title: 'Keynotes',
    line: 'Gedanken, die Orientierung schaffen.',
    to: '/keynotes'
  },
  {
    index: 'IV',
    title: 'Intensiv',
    line: 'Konzentrierte Klausur, wenn eine Phase entschieden werden will.',
    to: '/erstgespraech'
  },
  {
    index: 'V',
    title: 'Retreats',
    line: 'Außerhalb des Alltags — Stille als Werkzeug, nicht als Pause.',
    to: '/erstgespraech'
  },
  {
    index: 'VI',
    title: 'Online',
    line: 'Diskrete, ortsunabhängige Begleitung — derselbe Rahmen.',
    to: '/erstgespraech'
  }
];

function AtmosphereGrain({ className, opacity = 0.045 }: { className?: string; opacity?: number }) {
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

function HairLine({ className, opacity = 1 }: { className?: string; opacity?: number }) {
  return (
    <span
      aria-hidden
      className={`block h-px ${className ?? ''}`}
      style={{
        opacity,
        background:
          'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.55) 50%, rgba(214,168,94,0) 100%)'
      }}
    />
  );
}

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        backgroundImage:
          'linear-gradient(180deg, #F4E4C4 0%, #E2BE85 38%, #C99552 62%, #A6724A 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
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

export default function FormatePage() {
  const rootRef = useReveal<HTMLDivElement>();

  return (
    <div
      ref={rootRef}
      className="fp-root bg-[#020202] text-[#F4F4F4] antialiased selection:bg-[rgba(185,130,63,0.22)] selection:text-[#FAF7F2]"
    >
      <AtmosphereGrain className="fixed z-[40]" opacity={0.035} />

      {/* ──────────────────────────────────────────────
         HERO — kompakt, typografisch
         ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pb-[clamp(2rem,4.5vw,3rem)] pt-[clamp(6.5rem,11vw,8.5rem)]"
        aria-labelledby="fp-hero-heading"
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
              Formate
            </span>
            <h1
              id="fp-hero-heading"
              className="m-0 mt-4 max-w-[22ch] text-pretty leading-[1.05] tracking-[-0.034em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 100,
                fontSize: 'clamp(1.9rem, 1rem + 3.2vw, 2.95rem)',
                color: 'rgba(250,247,240,0.96)'
              }}
            >
              Sechs Wege in <Accent>dieselbe Arbeit</Accent>.
            </h1>
            <HairLine className="mx-auto mt-6 max-w-[2rem]" />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
         INTRO — rein typografisch, kein Container
         ────────────────────────────────────────────── */}
      <section
        className="relative pb-[clamp(2.25rem,5vw,3.25rem)] pt-[clamp(1.5rem,3.5vw,2.25rem)]"
        aria-label="Einordnung"
      >
        <div
          className="relative mx-auto w-full max-w-[640px] px-6 text-center sm:px-10 md:px-14"
          data-reveal
        >
          <p
            className="m-0 text-pretty leading-[1.7]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.92rem, 0.88rem + 0.12vw, 1rem)',
              color: 'rgba(229,226,219,0.7)'
            }}
          >
            Nicht jedes Format ist für jede Phase gedacht.
          </p>
          <div
            className="mx-auto mt-5 flex flex-col items-center gap-1.5"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.88rem, 0.85rem + 0.1vw, 0.95rem)',
              color: 'rgba(229,226,219,0.55)',
              lineHeight: 1.55
            }}
          >
            <p className="m-0">Manche Menschen brauchen Stille.</p>
            <p className="m-0">Andere Konfrontation.</p>
            <p className="m-0">Andere Struktur.</p>
            <p className="m-0">Andere einen Raum außerhalb ihres Alltags.</p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
         FORMATE — Editorial-Reihen (klar klickbar)
         ────────────────────────────────────────────── */}
      <section
        className="relative pb-[clamp(3rem,7vw,4.5rem)] pt-[clamp(0.75rem,2vw,1.5rem)]"
        aria-label="Sechs Formate"
      >
        <div className="mx-auto w-full max-w-[920px] px-6 sm:px-10 md:px-14">
          {/* Kleiner Hinweis als Affordance-Signal */}
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
              Auswahl
            </span>
            <span
              className="inline-flex items-center gap-2 uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.625rem',
                letterSpacing: '0.32em',
                color: 'rgba(214,188,152,0.55)'
              }}
            >
              Zum jeweiligen Angebot
              <span aria-hidden style={{ color: 'rgba(229,200,156,0.75)' }}>
                →
              </span>
            </span>
          </div>

          <ol
            className="list-none border-t border-[rgba(214,168,94,0.22)] divide-y divide-[rgba(214,168,94,0.12)]"
            style={{ padding: 0, margin: 0 }}
          >
            {FORMATE.map((f, i) => (
              <li
                key={`fp-row-${f.index}`}
                data-reveal
                style={{ ['--rev-delay' as never]: `${i * 65}ms` }}
                className="fp-row group"
              >
                <Link
                  to={f.to}
                  aria-label={`${f.title} – ${f.line}`}
                  className="relative grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-5 px-3 py-[clamp(1.1rem,2.4vw,1.5rem)] sm:grid-cols-[2.5rem_minmax(0,11rem)_minmax(0,1fr)_auto] sm:gap-x-8 sm:px-5 md:grid-cols-[2.75rem_minmax(0,12rem)_minmax(0,1fr)_auto] md:gap-x-10 md:px-6"
                >
                  {/* Numeral */}
                  <span
                    className="fp-num self-center"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 200,
                      fontSize: 'clamp(0.72rem, 0.7rem + 0.1vw, 0.8rem)',
                      letterSpacing: '0.28em',
                      color: 'rgba(229,200,156,0.55)'
                    }}
                  >
                    {f.index}
                  </span>

                  {/* Titel */}
                  <span
                    className="fp-title m-0 self-center leading-[1.1] tracking-[-0.018em]"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 200,
                      fontSize: 'clamp(1.18rem, 0.96rem + 0.65vw, 1.45rem)',
                      color: 'rgba(252,247,238,0.94)'
                    }}
                  >
                    {f.title}
                  </span>

                  {/* Zeile — auf Mobile in neue Zeile umgebrochen */}
                  <p
                    className="m-0 col-span-3 mt-2.5 max-w-[44ch] self-center text-pretty leading-[1.55] sm:col-span-1 sm:mt-0 sm:max-w-none"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.85rem, 0.82rem + 0.1vw, 0.94rem)',
                      color: 'rgba(229,226,219,0.6)'
                    }}
                  >
                    {f.line}
                  </p>

                  {/* CTA-Affordance: kleine Pille mit Linie + Pfeil */}
                  <span
                    aria-hidden
                    className="fp-cta-mini row-start-1 col-start-3 inline-flex items-center gap-2.5 self-center justify-self-end sm:col-start-4"
                  >
                    <span
                      className="fp-cta-line block h-px w-6 transition-[width,background] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(214,168,94,0.55) 0%, rgba(214,168,94,0) 100%)'
                      }}
                    />
                    <span
                      className="fp-cta-label hidden sm:inline uppercase"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '0.6rem',
                        letterSpacing: '0.3em',
                        color: 'rgba(229,200,156,0.6)'
                      }}
                    >
                      Ansehen
                    </span>
                    <svg
                      className="fp-cta-arrow"
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
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
         VERDICHTUNG — emotionale Zwischenebene vor CTA
         ────────────────────────────────────────────── */}
      <section
        className="relative pb-[clamp(2rem,5vw,3rem)] pt-[clamp(2rem,5vw,3rem)]"
        aria-label="Verdichtung"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(214,168,94,0.05) 0%, transparent 60%)'
          }}
        />
        <div
          className="relative z-[2] mx-auto w-full max-w-[640px] px-6 text-center sm:px-10 md:px-14"
          data-reveal
        >
          <HairLine className="mx-auto max-w-[1.75rem]" opacity={0.55} />
          <p
            className="m-0 mt-7 max-w-[28ch] mx-auto text-pretty leading-[1.32] tracking-[-0.022em]"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 200,
              fontSize: 'clamp(1.1rem, 0.92rem + 0.85vw, 1.5rem)',
              color: 'rgba(250,247,240,0.9)'
            }}
          >
            Die Frage ist nicht, welches Format <Accent>besser</Accent> ist.
          </p>
          <p
            className="m-0 mt-4 max-w-[34ch] mx-auto text-pretty leading-[1.55]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.88rem, 0.85rem + 0.1vw, 0.95rem)',
              color: 'rgba(229,226,219,0.6)'
            }}
          >
            Sondern: welcher Rahmen Ihrer aktuellen Situation gerecht wird.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
         CTA — kompakt, integriert
         ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pb-[clamp(4.5rem,10vw,7rem)] pt-[clamp(1rem,2.5vw,1.75rem)]"
        aria-labelledby="fp-cta-heading"
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
            id="fp-cta-heading"
            className="m-0 max-w-[20ch] mx-auto text-pretty leading-[1.12] tracking-[-0.026em]"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 100,
              fontSize: 'clamp(1.3rem, 0.94rem + 1.3vw, 1.75rem)',
              color: 'rgba(250,247,240,0.94)'
            }}
          >
            Ein Gespräch klärt <Accent>mehr</Accent> als ein Katalog.
          </h2>
          <Link
            to="/erstgespraech"
            className="fp-cta group/cta mt-7 inline-flex items-center gap-3 rounded-full px-6 py-2.5"
            style={{
              background:
                'linear-gradient(180deg, rgba(28,18,10,0.92) 0%, rgba(20,12,6,0.95) 100%)',
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
                background:
                  'linear-gradient(90deg, rgba(214,168,94,0.75) 0%, rgba(214,168,94,0) 100%)'
              }}
            />
          </Link>
        </div>
      </section>

      <style>{`
        .fp-root [data-reveal] {
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--rev-delay, 0ms);
          will-change: opacity, transform;
        }
        .fp-root [data-reveal].is-in {
          opacity: 1;
          transform: translateY(0);
        }
        /* ─── Editorial-Reihen: klare Klick-Affordance ─── */
        .fp-row a {
          position: relative;
          color: inherit;
          text-decoration: none;
          cursor: pointer;
          isolation: isolate;
          transition:
            background 700ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        /* feiner linker Bronze-Marker — wird im Hover sichtbar */
        .fp-row a::before {
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
        .fp-row .fp-title,
        .fp-row .fp-num {
          transition: color 600ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .fp-row .fp-cta-line {
          width: 1.5rem;
        }
        .fp-row .fp-cta-arrow {
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1), color 600ms ease;
        }
        .fp-row .fp-cta-label {
          opacity: 0.7;
          transition: opacity 600ms ease, color 600ms ease;
        }
        /* Hover: Bronze-Sweep, Marker links, Titel heller, Pfeil + Linie wachsen */
        .fp-row:hover a,
        .fp-row a:focus-visible {
          background:
            linear-gradient(90deg, rgba(214,168,94,0.02) 0%, rgba(214,168,94,0.07) 50%, rgba(214,168,94,0.02) 100%);
        }
        .fp-row:hover a::before,
        .fp-row a:focus-visible::before {
          opacity: 1;
          transform: scaleY(1);
        }
        .fp-row:hover .fp-title,
        .fp-row a:focus-visible .fp-title {
          color: rgba(252,247,238,1);
          transform: translateX(2px);
        }
        .fp-row:hover .fp-num,
        .fp-row a:focus-visible .fp-num {
          color: rgba(229,200,156,0.95);
        }
        .fp-row:hover .fp-cta-line,
        .fp-row a:focus-visible .fp-cta-line {
          width: 3rem;
          background: linear-gradient(90deg, rgba(214,168,94,0.8) 0%, rgba(214,168,94,0) 100%);
        }
        .fp-row:hover .fp-cta-label,
        .fp-row a:focus-visible .fp-cta-label {
          opacity: 1;
          color: rgba(244,228,196,0.9);
        }
        .fp-row:hover .fp-cta-arrow,
        .fp-row a:focus-visible .fp-cta-arrow {
          transform: translateX(3px);
          color: rgba(244,228,196,1);
        }
        .fp-row a:focus-visible {
          outline: none;
          box-shadow:
            inset 0 0 0 1px rgba(214,168,94,0.22),
            0 0 0 3px rgba(185,130,63,0.14);
          border-radius: 6px;
        }
        @media (hover: none) {
          /* Mobile/Touch: Affordance dauerhaft sichtbar, ohne Hover */
          .fp-row a::before {
            opacity: 0.55;
            transform: scaleY(1);
          }
          .fp-row .fp-cta-line {
            width: 2.25rem;
            background: linear-gradient(90deg, rgba(214,168,94,0.75) 0%, rgba(214,168,94,0) 100%);
          }
          .fp-row .fp-cta-arrow {
            color: rgba(244,228,196,0.9);
          }
        }
        .fp-cta:focus-visible {
          outline: none;
          box-shadow:
            inset 0 1px 0 rgba(242, 226, 192, 0.32),
            inset 0 0 0 1px rgba(214, 168, 94, 0.32),
            0 0 0 3px rgba(185, 130, 63, 0.18);
        }
        @media (prefers-reduced-motion: reduce) {
          .fp-root [data-reveal] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
