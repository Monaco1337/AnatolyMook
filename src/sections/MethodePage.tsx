import { Link } from 'react-router-dom';
import { Fragment } from 'react';

const METHODE_HERO = {
  src: '/images/home/methode-methodik-hero.png',
  width: 1024,
  height: 682,
  alt:
    'Seminar- und Arbeitssituation bei gedämpftem Licht: Vortrag mit Flipchart, Zuhörende unscharf im Vordergrund, Spotlight mit warmem Bronze-Ton'
} as const;

const FONT_DISPLAY =
  "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" as const;
const FONT_BODY =
  "'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" as const;

const BRONZE_LINE = 'rgba(214, 168, 94, 0.13)';
const BRONZE_SOFT = 'rgba(214, 188, 152, 0.62)';
const TEXT_MUTED = 'rgba(154, 150, 143, 0.9)';
const IVORY = 'rgba(248, 243, 234, 0.94)';

const CORE_ROWS: { title: string; line: string }[] = [
  { title: 'Wahrnehmung', line: 'Klar sehen, bevor gehandelt wird.' },
  { title: 'Ordnung', line: 'Innere Stabilität schafft äußere Präzision.' },
  { title: 'Umsetzung', line: 'Klare Entscheidungen ohne unnötige Reibung.' },
];

const DIFF_POINTS: string[] = [
  'Keine motivierenden Performances oder Show-Effekte.',
  'Kein schnelles Coaching an der Oberfläche.',
  'Präzise Analyse statt einfacher Slogans.',
  'Ruhige Begleitung statt Dynamik um der Dynamik willen.',
  'Stabilität, die auch nach intensiven Phasen bleibt.',
];

const AUDIENCE: string[] = [
  'Unternehmer',
  'Führungskräfte',
  'Menschen unter Druck',
  'Personen mit hoher Verantwortung',
];

function HairlineBronze({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-px ${className ?? ''}`}
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(230, 193, 138, 0.08) 18%, rgba(230, 193, 138, 0.28) 50%, rgba(230, 193, 138, 0.08) 82%, transparent 100%)'
      }}
    />
  );
}

export default function MethodePage() {
  return (
    <div className="min-h-screen bg-[#030303] text-[#F4F4F4] antialiased selection:bg-[rgba(185,130,63,0.22)] selection:text-[#FAF7F2]">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div
          className="absolute left-1/2 top-[8%] h-[420px] w-[min(88vw,720px)] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            opacity: 0.12,
            background:
              'radial-gradient(ellipse 58% 50% at 50% 50%, rgba(185, 130, 63, 0.09) 0%, transparent 70%)'
          }}
        />
      </div>

      <main className="relative z-[1]">
        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 pt-[7.25rem] pb-14 sm:px-8 md:px-10 md:pt-[7.75rem] md:pb-16 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
            <div className="order-2 max-w-xl lg:order-1">
              <p
                className="m-0 mb-4 uppercase"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.26em',
                  color: BRONZE_SOFT
                }}
              >
                Methode
              </p>
              <h1
                className="m-0 font-medium tracking-tight"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 'clamp(1.75rem, 1.2rem + 2.1vw, 2.75rem)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.036em',
                  color: IVORY,
                  textShadow: '0 16px 48px rgba(0,0,0,0.45)'
                }}
              >
                Klarheit entsteht nicht zufällig.
              </h1>
              <HairlineBronze className="my-8 max-w-[12rem]" />
              <p
                className="m-0"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(1rem, 0.94rem + 0.22vw, 1.125rem)',
                  lineHeight: 1.62,
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  color: TEXT_MUTED,
                  maxWidth: '38rem'
                }}
              >
                Anatoly verbindet Wahrnehmung, Selbstführung und präzise Umsetzung zu einer ruhigen, tragfähigen
                Arbeitsweise.
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <div
                className="relative overflow-hidden rounded-[3px]"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: BRONZE_LINE,
                  boxShadow:
                    '0 28px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255, 248, 238, 0.04)'
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[2]"
                  style={{
                    background:
                      'linear-gradient(105deg, rgba(3,3,3,0.38) 0%, transparent 42%, transparent 62%, rgba(3,3,3,0.22) 100%)'
                  }}
                />
                <div
                  className="aspect-[1024/682] w-full [&_img]:block"
                  style={{ background: '#0a0908' }}
                >
                  <img
                    src={METHODE_HERO.src}
                    width={METHODE_HERO.width}
                    height={METHODE_HERO.height}
                    alt={METHODE_HERO.alt}
                    className="h-full w-full object-cover object-[52%_44%] sm:object-[50%_42%]"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    style={{
                      filter: 'contrast(1.04) saturate(0.98) brightness(0.94)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Drei Kern-Elemente */}
        <section aria-labelledby="methode-kern-heading" className="border-t border-[rgba(255,255,255,0.04)]">
          <div className="mx-auto max-w-[1100px] px-6 sm:px-8 md:px-10 lg:px-12">
            <h2 id="methode-kern-heading" className="sr-only">
              Drei Kernelemente der Methode
            </h2>
            {CORE_ROWS.map((row) => (
              <div
                key={row.title}
                className="border-b border-[rgba(214,168,94,0.1)] py-10 sm:py-11 md:grid md:grid-cols-[10.5rem_minmax(0,1fr)] md:items-baseline md:gap-x-10 md:py-12"
              >
                <h3
                  className="m-0 font-medium tracking-tight"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 'clamp(1rem, 0.92rem + 0.35vw, 1.2rem)',
                    letterSpacing: '-0.026em',
                    lineHeight: 1.35,
                    color: 'rgba(237, 228, 210, 0.9)'
                  }}
                >
                  {row.title}
                </h3>
                <p
                  className="m-0 mt-3 max-w-[42rem] md:mt-0"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.9375rem, 0.9rem + 0.14vw, 1.0625rem)',
                    lineHeight: 1.58,
                    fontWeight: 400,
                    letterSpacing: '-0.006em',
                    color: TEXT_MUTED
                  }}
                >
                  {row.line}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Worin sich die Arbeit unterscheidet */}
        <section className="mx-auto max-w-[1100px] px-6 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-12">
          <p
            className="m-0 mb-3 uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.26em',
              color: BRONZE_SOFT
            }}
          >
            Unterscheidung
          </p>
          <h2
            className="m-0 max-w-[34rem] font-medium tracking-tight"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(1.35rem, 1.1rem + 0.9vw, 1.85rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.032em',
              color: IVORY
            }}
          >
            Worin sich die Arbeit unterscheidet
          </h2>
          <HairlineBronze className="my-7 max-w-[10rem]" />
          <ul
            className="m-0 list-none space-y-4 p-0"
            style={{ fontFamily: FONT_BODY, fontSize: 'clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)' }}
          >
            {DIFF_POINTS.map((item) => (
              <li
                key={item}
                className="relative pl-5 leading-[1.55]"
                style={{ color: TEXT_MUTED }}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.62em] h-px w-2"
                  style={{ background: 'rgba(214,168,94,0.35)' }}
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Für wen */}
        <section className="border-t border-[rgba(255,255,255,0.04)] bg-[rgba(5,5,5,0.35)]">
          <div className="mx-auto max-w-[1100px] px-6 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-12">
            <p
              className="m-0 mb-3 uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.26em',
                color: BRONZE_SOFT
              }}
            >
              Kontext
            </p>
            <h2
              className="m-0 font-medium tracking-tight"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(1.35rem, 1.1rem + 0.9vw, 1.85rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.032em',
                color: IVORY
              }}
            >
              Für wen das gedacht ist
            </h2>
            <HairlineBronze className="my-8 max-w-[10rem]" />
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center" style={{ fontFamily: FONT_BODY }}>
              {AUDIENCE.map((label, idx) => (
                <Fragment key={label}>
                  {idx > 0 ? (
                    <span aria-hidden className="hidden px-6 text-[0.9375rem] text-[rgba(214,168,94,0.28)] sm:inline sm:pb-px sm:leading-none">
                      ·
                    </span>
                  ) : null}
                  <span
                    className="text-[clamp(0.96875rem,0.925rem+0.15vw,1.0625rem)] font-normal tracking-[-0.01em]"
                    style={{ color: 'rgba(230,223,212,0.88)' }}
                  >
                    {label}
                  </span>
                </Fragment>
              ))}
            </div>

            <p
              className="m-0 mt-14 max-w-[36rem]"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.875rem, 0.845rem + 0.08vw, 0.9375rem)',
                lineHeight: 1.55,
                color: 'rgba(132,128,121,0.82)'
              }}
            >
              Wenn eine ruhige, fundierte erste Einordnung passt — ohne Druck auf schnelle Lösungen.
            </p>
            <Link
              to="/erstgespraech"
              className="mt-6 inline-flex text-[rgba(188,164,132,0.68)] underline decoration-[rgba(214,168,94,0.22)] underline-offset-[0.28em] transition-colors hover:text-[rgba(228,212,182,0.88)] hover:decoration-[rgba(214,168,94,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(185,130,63,0.35)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.84375rem',
                letterSpacing: '0.04em'
              }}
            >
              Strategisches Gespräch vereinbaren →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
