import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Focus, Crown, ShieldHalf, AudioLines } from 'lucide-react';

const DIE_ARBEIT_HERO = '/images/home/die-arbeit-hero.png' as const;

const FONT_DISPLAY =
  "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" as const;
const FONT_BODY =
  "'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" as const;

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

const WORK_LINES: {
  Icon: typeof Focus;
  number: string;
  title: string;
  line: string;
  image: string;
  imagePos: string;
}[] = [
  {
    Icon: AudioLines,
    number: '01',
    title: 'Präsenz',
    line: 'Den nächsten Schritt ohne Druck gewichten.',
    image: '/images/home/praesenz-meditation.png',
    imagePos: '50% 40%'
  },
  {
    Icon: Focus,
    number: '02',
    title: 'Klarheit',
    line: 'Innere Ordnung sehen — bevor entschieden wird.',
    image: '/images/home/klarheit-lake.png',
    imagePos: '50% 45%'
  },
  {
    Icon: Crown,
    number: '03',
    title: 'Führung',
    line: 'Halt nach außen mit Ruhe nach innen verbinden.',
    image: '/images/home/fuehrung-boardroom.png',
    imagePos: '48% 42%'
  },
  {
    Icon: ShieldHalf,
    number: '04',
    title: 'Stabilität',
    line: 'Belastbarkeit ohne Härte — getragen aus Tiefe.',
    image: '/images/home/stabilitaet-berg.png',
    imagePos: '52% 38%'
  },
  {
    Icon: Compass,
    number: '05',
    title: 'Wirkung',
    line: 'Tun und Sein wieder in derselben Linie.',
    image: '/images/home/wirkung-pier.png',
    imagePos: '50% 42%'
  }
];

type Situation = {
  kicker: string;
  headline: string;
  copy: string;
};

const SITUATIONS: Situation[] = [
  {
    kicker: 'Verantwortung',
    headline: 'Wenn die Last laut wird, bevor sie sichtbar wird.',
    copy: 'Hohe Verantwortung bekommt selten den Raum, den sie verdient — sie wird getragen, nicht gezeigt.'
  },
  {
    kicker: 'Entscheidung',
    headline: 'Entscheiden, wenn Klarheit fehlt.',
    copy: 'Nicht jede Entscheidung ist eine Frage der Information. Manche entstehen erst, wenn etwas im Innen sortiert wurde.'
  },
  {
    kicker: 'Rolle',
    headline: 'Funktionieren statt führen.',
    copy: 'Wer funktioniert, verliert leise die Position, aus der heraus geführt wird. Es geht nicht um Disziplin — es geht um Rückkehr.'
  }
];

type Field = {
  title: string;
  line: string;
  image: string;
  imageAlt: string;
  pos: string;
};

const CLARITY_FIELDS: Field[] = [
  {
    title: 'Führung',
    line: 'Halt unter Druck — ohne laut zu werden.',
    image: '/images/home/fuehrung-boardroom.png',
    imageAlt: 'Präsentation in ruhigem Licht, Führung im Raum',
    pos: '48% 42%'
  },
  {
    title: 'Beziehungen',
    line: 'Nähe und Abstand wieder lesbar machen.',
    image: '/images/home/beziehungen-dialog.png',
    imageAlt:
      'Ein Mann und eine Frau in einem tiefen, fokussierten Gespräch in einer luxuriösen Lounge-Umgebung, das Klarheit und Verbindung in Beziehungen symbolisiert.',
    pos: '50% 42%'
  },
  {
    title: 'Gesundheit',
    line: 'Körper und Rhythmus als Teil der Orientierung.',
    image: '/images/home/gesundheit-meditation-see.png',
    imageAlt:
      'Mann in Meditationshaltung auf einem Holzdeck am See bei warmem Abendlicht, Berge und stilles Wasser im Hintergrund — Ruhe, Körper und Rhythmus.',
    pos: '50% 45%'
  },
  {
    title: 'Berufung',
    line: 'Beruf wieder spürbar — ohne Lautstärke.',
    image: '/images/home/berufung-city-vision.png',
    imageAlt:
      'Mann von hinten vor einem großen Fenster mit Stadtpanorama und dramatischem Sonnenuntergang — ruhige Bildhaftigkeit für Berufung, Ausrichtung und inneren Auftrag.',
    pos: '50% 42%'
  },
  {
    title: 'Erfolg',
    line: 'Wenn Ergebnisse nicht mehr alles verdecken sollen.',
    image: '/images/home/erfolg-city-sunset.png',
    imageAlt:
      'Mann im dunklen Anzug auf einer Terrasse mit Blick über die Stadt beim goldenen Sonnenuntergang — Sportwagen und klare Architektur, zurückhaltender Luxus.',
    pos: '50% 42%'
  },
  {
    title: 'Stabilität',
    line: 'Ruhe, auf die man zurückgreifen kann — auch unter Last.',
    image: '/images/home/stabilitaet-berg.png',
    imageAlt: 'Gipfel bei Abendlicht, ruhige Weite',
    pos: '52% 38%'
  }
];

type Voice = {
  quote: string;
  emphasis: string[];
  meta: string;
};

const VOICES: Voice[] = [
  {
    quote: 'Entscheidungen fühlen sich wieder klar an.',
    emphasis: ['klar'],
    meta: 'Geschäftsführer · Industrie'
  },
  {
    quote: 'Ruhe — ohne nachzugeben.',
    emphasis: ['Ruhe'],
    meta: 'Unternehmerin · Beratung'
  },
  {
    quote: 'Führung gewinnt Gewicht zurück.',
    emphasis: ['Gewicht'],
    meta: 'Vorstand · Finance'
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

function HairLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block h-px ${className ?? ''}`}
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(214,168,94,0.55) 50%, transparent 100%)'
      }}
    />
  );
}

/** Highlight für einzelne Wörter — warmer Ivory-Akzent, kein Verlauf. */
function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        color: '#EADDCB',
        fontStyle: 'italic',
        letterSpacing: '-0.005em'
      }}
    >
      {children}
    </span>
  );
}

/** Premium-Panel für den finalen Einstieg — Glas/Bronze, ruhige Animation. */
function EntryPanel({
  to,
  index,
  kicker,
  label,
  caption
}: {
  to: string;
  index: string;
  kicker: string;
  label: string;
  caption: string;
}) {
  return (
    <Link
      to={to}
      className="da-entry group relative block overflow-hidden"
      style={{

        boxShadow:
          'inset 0 1px 0 rgba(236,218,182,0.06), inset 0 0 0 1px rgba(166,124,82,0.16)',
        backdropFilter: 'blur(28px)'
      }}
    >
      {/* Bronze-Top-Hairline */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(214,168,94,0.55) 50%, transparent 100%)'
        }}
      />
      {/* hover glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-out group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 80% 90% at 50% 110%, rgba(214,168,94,0.10) 0%, transparent 60%)'
        }}
      />
      {/* inner halo */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[1px] opacity-0 transition-opacity duration-[900ms] ease-out group-hover:opacity-100"
        style={{
          boxShadow:
            'inset 0 0 80px rgba(214,168,94,0.05), inset 0 0 0 1px rgba(214,168,94,0.16)'
        }}
      />

      <div className="relative flex h-full flex-col items-center px-8 py-10 text-center sm:px-10 sm:py-12 md:px-11 md:py-14">
        <div className="flex items-center justify-center gap-4">
          <span
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.625rem',
              letterSpacing: '0.34em',
              color: 'rgba(214,188,152,0.55)'
            }}
          >
            {kicker}
          </span>
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: '0.7rem',
              letterSpacing: '0.28em',
              color: 'rgba(214,188,152,0.4)'
            }}
          >
            {index}
          </span>
        </div>

        <div
          className="mt-10 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
          style={{ fontFamily: FONT_DISPLAY }}
        >
          <p
            className="m-0 text-pretty font-light leading-[1.15] tracking-[-0.022em] text-[rgba(244,239,231,0.92)]"
            style={{ fontSize: 'clamp(1.2rem, 0.96rem + 0.7vw, 1.4875rem)' }}
          >
            {label}
          </p>
        </div>

        <p
          className="m-0 mt-5 max-w-[26ch] text-pretty leading-[1.65]"
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.85rem, 0.82rem + 0.1vw, 0.9rem)',
            color: 'rgba(229,226,219,0.5)'
          }}
        >
          {caption}
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <span
            aria-hidden
            className="block h-px w-7 transition-[width] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12"
            style={{
              background:
                'linear-gradient(90deg, rgba(214,168,94,0.6) 0%, rgba(214,168,94,0.18) 100%)'
            }}
          />
          <span
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.625rem',
              letterSpacing: '0.3em',
              color: 'rgba(229,200,156,0.7)'
            }}
          >
            Weiter
          </span>
        </div>
      </div>
    </Link>
  );
}

/** IntersectionObserver-basiertes Fade-In für mehrere Elemente einer Section. */
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

export default function DieArbeit() {
  const rootRef = useReveal<HTMLDivElement>();
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  return (
    <div
      ref={rootRef}
      className="da-root min-h-screen bg-[#020202] text-[#F4F4F4] antialiased selection:bg-[rgba(185,130,63,0.22)] selection:text-[#FAF7F2]"
    >
      <AtmosphereGrain className="fixed z-[40]" opacity={0.04} />

      {/* ────────────────────────────────────────────── */}
      {/*  SECTION 1 — HERO (Bild bleibt erhalten)        */}
      {/* ────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: 'min(100svh, 980px)' }}
        aria-labelledby="da-hero-heading"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src={DIE_ARBEIT_HERO}
            alt=""
            role="presentation"
            className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-[52%_42%] sm:object-[48%_40%] lg:object-[44%_38%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{ filter: 'contrast(1.05) saturate(0.92) brightness(0.95)' }}
          />

          {/* warmer Bronze-Fokus rechts oben — Atmosphäre, kein Abdunkeln */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 95% 65% at 78% 18%, rgba(214,168,94,0.08) 0%, transparent 55%)'
            }}
          />
          {/* sehr weicher Vertikal-Verlauf — nur unten für die Lesbarkeit */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0) 38%, rgba(0,0,0,0.42) 72%, rgba(0,0,0,0.78) 100%)'
            }}
          />
          {/* dezenter Lese-Schatten unten links unter Headline/Body */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 70% at 18% 100%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 38%, rgba(0,0,0,0) 70%)'
            }}
          />
          {/* dezenter Innen-Rim */}
          <div
            className="absolute inset-0"
            style={{
              boxShadow:
                'inset 0 0 140px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,248,238,0.05), inset 0 -2px 0 rgba(214,168,94,0.08)'
            }}
          />
          <AtmosphereGrain opacity={0.035} />
        </div>

        <div className="relative z-[2] mx-auto flex min-h-[min(100svh,980px)] w-full max-w-[1380px] flex-col justify-end px-6 pb-[clamp(4rem,9vw,7rem)] pt-28 sm:px-10 md:px-16 lg:px-20">
          <div
            className="max-w-[640px]"
            data-reveal
            style={{ ['--rev-delay' as never]: '60ms' }}
          >
            {/* Editorial-Marker — feine Bronze-Linie */}
            <span
              aria-hidden
              className="block h-px w-12"
              style={{
                background:
                  'linear-gradient(90deg, rgba(214,168,94,0.62) 0%, rgba(214,168,94,0) 100%)'
              }}
            />

            {/* Headline — Montserrat Thin */}
            <h1
              id="da-hero-heading"
              className="m-0 mt-9 max-w-[16ch] text-pretty leading-[1.06] tracking-[-0.038em] md:mt-10"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 100,
                fontSize: 'clamp(1.95rem, 0.85rem + 4.6vw, 3.85rem)',
                color: 'rgba(248,244,236,0.98)',
                textShadow:
                  '0 1px 24px rgba(0,0,0,0.55), 0 0 60px rgba(0,0,0,0.35)'
              }}
            >
              Klarheit entsteht nicht durch mehr <Accent>Druck.</Accent>
            </h1>

            {/* Body direkt unter der Headline — ein zusammenhängender Block */}
            <p
              className="m-0 mt-7 max-w-[42ch] text-pretty leading-[1.7] md:mt-8"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.94rem, 0.88rem + 0.26vw, 1.06rem)',
                fontWeight: 400,
                color: 'rgba(244,242,236,0.7)'
              }}
            >
              Eine ruhige Begleitung für Menschen mit Verantwortung — präzise, diskret, ohne laute Versprechen.
            </p>

            {/* CTA-Linie */}
            <div className="mt-10 md:mt-12">
              <Link
                to="/erstgespraech"
                className="da-cta group/cta inline-flex items-center gap-3"
                style={{ fontFamily: FONT_BODY }}
              >
                <span
                  className="uppercase"
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.34em',
                    color: 'rgba(242,226,192,0.92)'
                  }}
                >
                  Strategisches Gespräch
                </span>
                <span
                  aria-hidden
                  className="block h-px w-9 transition-[width] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:w-16"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(242,226,192,0.85) 0%, rgba(214,168,94,0.18) 100%)'
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/*  SECTION 2 — Fünf Linien. Eine Haltung.         */}
      {/* ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#020202]"
        aria-labelledby="da-method-heading"
      >
        {/* Hintergrund-Atmosphäre */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 78% 32%, rgba(214,168,94,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 100%, rgba(214,168,94,0.04) 0%, transparent 60%)'
          }}
        />

        <div className="relative mx-auto w-full max-w-[1380px] px-6 pt-[clamp(6rem,14vw,10rem)] sm:px-10 md:px-16 lg:px-20">
          <div className="flex flex-col items-center text-center" data-reveal>
            <span
              className="uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.625rem',
                letterSpacing: '0.42em',
                color: 'rgba(214,188,152,0.55)'
              }}
            >
              Haltung & Umsetzung
            </span>
            <h2
              id="da-method-heading"
              className="m-0 mt-6 max-w-[18ch] text-pretty leading-[1.08] tracking-[-0.034em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 100,
                fontSize: 'clamp(1.85rem, 0.95rem + 3.1vw, 3rem)',
                color: 'rgba(250,247,240,0.96)'
              }}
            >
              Fünf Linien.<br />
              Eine <Accent>Haltung</Accent>.
            </h2>
            <HairLine className="mx-auto mt-8 max-w-[2.25rem]" />
            <div
              className="mx-auto mt-8 max-w-[32ch]"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.92rem, 0.88rem + 0.14vw, 1rem)',
                color: 'rgba(229,226,219,0.58)',
                lineHeight: 1.65
              }}
            >
              <p className="m-0">Keine Methode mit Versprechen —</p>
              <p className="m-0 mt-3">eine Haltung,</p>
              <p className="m-0 mt-3">die an fünf wiederkehrenden Linien sichtbar wird.</p>
            </div>
          </div>
        </div>

        {/* Editorial-Karten — eine Reihe, mit feiner Bild-Stimmung */}
        <div className="relative mx-auto mt-[clamp(3rem,7vw,5rem)] w-full max-w-[1380px] px-6 pb-2 sm:px-10 md:px-16 lg:px-20">
          <ul
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5"
            style={{ listStyle: 'none' }}
          >
            {WORK_LINES.map((row, i) => {
              const isActive = hoveredLine === i;
              return (
                <li
                  key={row.title}
                  data-reveal
                  style={{ ['--rev-delay' as never]: `${i * 80}ms` }}
                  className="da-method-tile group relative flex h-full min-h-[clamp(15rem,28vw,21rem)] flex-col overflow-hidden"
                  onMouseEnter={() => setHoveredLine(i)}
                  onMouseLeave={() => setHoveredLine(null)}
                  onFocus={() => setHoveredLine(i)}
                  onBlur={() => setHoveredLine(null)}
                >
                  {/* Keyvisual — sehr dezent, nur Atmosphäre */}
                  <span
                    aria-hidden
                    className="absolute inset-0 block transition-transform duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    style={{
                      backgroundImage: `url('${row.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: row.imagePos,
                      filter: 'contrast(1.05) saturate(0.6) brightness(0.48) grayscale(0.3)'
                    }}
                  />
                  {/* dunkler Lese-Verlauf von unten */}
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(2,2,2,0.55) 0%, rgba(2,2,2,0.4) 30%, rgba(2,2,2,0.72) 70%, rgba(2,2,2,0.92) 100%)'
                    }}
                  />
                  {/* Bronze-Halo bei Hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-[1100ms] ease-out group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(ellipse 75% 60% at 50% 100%, rgba(214,168,94,0.16) 0%, transparent 65%)'
                    }}
                  />
                  {/* Innen-Rim */}
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      boxShadow:
                        'inset 0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(236,218,182,0.06), inset 0 -1px 0 rgba(214,168,94,0.08)'
                    }}
                  />
                  <AtmosphereGrain opacity={0.05} />

                  {/* Inhalt — feste Kopfzeile, dann Text von oben; Linie unten im Tile */}
                  <div className="relative z-[2] flex min-h-0 flex-1 flex-col items-center px-6 pb-7 pt-6 text-center sm:px-7 sm:pb-8 sm:pt-7">
                    <div className="flex h-11 w-full shrink-0 items-center justify-center gap-5">
                      <span
                        className="uppercase"
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: '0.625rem',
                          letterSpacing: '0.36em',
                          color: isActive ? 'rgba(229,200,156,0.85)' : 'rgba(214,188,152,0.55)',
                          transition: 'color 700ms ease'
                        }}
                      >
                        {row.number}
                      </span>
                      <row.Icon
                        className="size-[18px] shrink-0"
                        strokeWidth={1.05}
                        aria-hidden
                        style={{
                          color: isActive ? 'rgba(229,200,156,0.8)' : 'rgba(214,176,138,0.4)',
                          transition: 'color 700ms ease'
                        }}
                      />
                    </div>

                    <div className="mt-8 flex min-h-0 w-full flex-1 flex-col items-center">
                      <h3
                        className="m-0 max-w-[14ch] shrink-0 text-pretty leading-[1.06] tracking-[-0.022em]"
                        style={{
                          fontFamily: FONT_DISPLAY,
                          fontWeight: 200,
                          fontSize: 'clamp(1.65rem, 0.9rem + 1.9vw, 2.15rem)',
                          color: 'rgba(252,247,238,0.96)'
                        }}
                      >
                        {row.title}
                      </h3>
                      <p
                        className="m-0 mt-4 max-w-[28ch] shrink-0 text-pretty leading-[1.6]"
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: 'clamp(0.88rem, 0.85rem + 0.1vw, 0.96rem)',
                          color: 'rgba(229,226,219,0.66)'
                        }}
                      >
                        {row.line}
                      </p>
                      <div className="min-h-4 flex-1" aria-hidden />
                      <span
                        aria-hidden
                        className="mx-auto mt-6 block h-px shrink-0 transition-[width] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                          width: isActive ? '3rem' : '1.25rem',
                          background:
                            'linear-gradient(90deg, transparent 0%, rgba(214,168,94,0.65) 50%, transparent 100%)'
                        }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/*  SECTION 3 — Was wir sehen (kompakt, editorial) */}
      {/* ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#020202] pb-[clamp(5rem,11vw,8rem)] pt-[clamp(5rem,10vw,7.5rem)]"
        aria-labelledby="da-situ-heading"
      >
        {/* Foto-Hintergrund — unverändert, ohne Filter/Schärfe-Abmilderung */}
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <img
            src="/images/home/wir-sehen-tal-daemmerung.png"
            alt=""
            role="presentation"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: '52% 48%' }}
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* Leseschicht — getrennt vom Foto */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(2,2,2,0.55) 0%, rgba(2,2,2,0.78) 60%, rgba(2,2,2,0.9) 100%), linear-gradient(180deg, rgba(2,2,2,0.55) 0%, rgba(2,2,2,0.2) 35%, rgba(2,2,2,0.2) 65%, rgba(2,2,2,0.85) 100%)'
          }}
        />

        <div className="relative z-[2] mx-auto w-full max-w-[980px] px-6 sm:px-10 md:px-14">
          <div className="flex flex-col items-center text-center" data-reveal>
            <span
              className="uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.625rem',
                letterSpacing: '0.42em',
                color: 'rgba(214,188,152,0.55)'
              }}
            >
              Was wir sehen
            </span>
            <h2
              id="da-situ-heading"
              className="m-0 mt-5 max-w-[26ch] text-pretty leading-[1.1] tracking-[-0.028em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 100,
                fontSize: 'clamp(1.55rem, 0.9rem + 2.1vw, 2.25rem)',
                color: 'rgba(250,247,240,0.96)'
              }}
            >
              Drei Bilder, die immer wieder <Accent>auftauchen</Accent>.
            </h2>
          </div>

          {/* Ruhige editorial Reihen mit feinen Trennlinien */}
          <ol
            className="mt-[clamp(2.5rem,5vw,3.5rem)] grid grid-cols-1 list-none divide-y divide-[rgba(214,168,94,0.1)] border-t border-[rgba(214,168,94,0.1)]"
            style={{ padding: 0 }}
          >
            {SITUATIONS.map((s, idx) => (
              <li
                key={s.kicker}
                data-reveal
                style={{ ['--rev-delay' as never]: `${idx * 90}ms` }}
                className="flex flex-col items-center py-[clamp(1.75rem,3.6vw,2.5rem)] text-center"
              >
                <span
                  className="mb-4 uppercase"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '0.625rem',
                    letterSpacing: '0.36em',
                    color: 'rgba(214,188,152,0.55)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 200,
                      letterSpacing: '0.22em',
                      color: 'rgba(229,200,156,0.75)'
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>{' '}
                  — {s.kicker}
                </span>
                <h3
                  className="m-0 max-w-[36ch] text-pretty leading-[1.18] tracking-[-0.022em]"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 200,
                    fontSize: 'clamp(1.15rem, 0.9rem + 0.95vw, 1.5rem)',
                    color: 'rgba(250,247,240,0.96)'
                  }}
                >
                  {s.headline}
                </h3>
                <p
                  className="m-0 mt-4 max-w-[38ch] text-pretty leading-[1.65]"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.88rem, 0.85rem + 0.1vw, 0.95rem)',
                    color: 'rgba(229,226,219,0.6)'
                  }}
                >
                  {s.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/*  SECTION 4 — Wo Klarheit wirkt (Magazin-Grid)   */}
      {/* ────────────────────────────────────────────── */}
      <section
        className="relative bg-[#020202] pt-[clamp(6rem,12vw,9rem)]"
        aria-labelledby="da-fields-heading"
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10 md:px-14 lg:px-16">
          <div className="flex flex-col items-center text-center" data-reveal>
            <span
              className="uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.625rem',
                letterSpacing: '0.42em',
                color: 'rgba(214,188,152,0.55)'
              }}
            >
              Wo Klarheit wirkt
            </span>
            <h2
              id="da-fields-heading"
              className="m-0 mt-5 max-w-[30ch] text-pretty leading-[1.14] tracking-[-0.026em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 100,
                fontSize: 'clamp(1.5rem, 0.9rem + 2vw, 2.2rem)',
                color: 'rgba(250,247,240,0.96)'
              }}
            >
              Sechs Bereiche, in denen Klarheit wieder <Accent>Wirkung</Accent> bekommt.
            </h2>
            <p
              className="m-0 mt-5 max-w-[34ch] text-pretty leading-[1.65]"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.88rem, 0.85rem + 0.1vw, 0.95rem)',
                color: 'rgba(229,226,219,0.6)'
              }}
            >
              Selten treten sie isoliert auf — deshalb betrachten wir sie zusammen.
            </p>
          </div>
        </div>

        {/* Editorial-Grid — kompakter, ruhiger */}
        <div className="mx-auto mt-[clamp(2.25rem,5vw,3.5rem)] w-full max-w-[1200px] px-6 sm:px-10 md:px-14 lg:px-16">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-6 md:gap-4">
            {/* I — Führung */}
            <FieldTile field={CLARITY_FIELDS[0]} className="md:col-span-4 aspect-[16/11] md:aspect-[16/10]" size="lg" />
            {/* II — Beziehungen */}
            <FieldTile field={CLARITY_FIELDS[1]} className="md:col-span-2 aspect-[4/4.2] md:aspect-[4/5]" size="sm" />
            {/* III — Gesundheit */}
            <FieldTile field={CLARITY_FIELDS[2]} className="md:col-span-2 aspect-[4/4.2] md:aspect-[4/5]" size="sm" />
            {/* IV — Berufung */}
            <FieldTile field={CLARITY_FIELDS[3]} className="md:col-span-4 aspect-[16/11] md:aspect-[16/10]" size="lg" />
            {/* V — Erfolg */}
            <FieldTile field={CLARITY_FIELDS[4]} className="md:col-span-3 aspect-[4/3] md:aspect-[3/2]" size="md" />
            {/* VI — Stabilität */}
            <FieldTile field={CLARITY_FIELDS[5]} className="md:col-span-3 aspect-[4/3] md:aspect-[3/2]" size="md" />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/*  SECTION 5 — Rückmeldungen (Editorial-Kampagne) */}
      {/* ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#020202] pb-[clamp(5rem,11vw,8.5rem)] pt-[clamp(5.5rem,11vw,8.5rem)]"
        aria-labelledby="da-voices-heading"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <img
            src="/images/home/rueckmeldungen-berge.png"
            alt=""
            role="presentation"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: '54% 44%' }}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(2,2,2,0.6) 0%, rgba(2,2,2,0.82) 65%, rgba(2,2,2,0.92) 100%), linear-gradient(180deg, rgba(2,2,2,0.55) 0%, rgba(2,2,2,0.25) 35%, rgba(2,2,2,0.25) 65%, rgba(2,2,2,0.85) 100%)'
          }}
        />

        <div className="relative z-[2] mx-auto w-full max-w-[720px] px-6 sm:px-10 md:px-14">
          <div className="flex flex-col items-center text-center" data-reveal>
            <span
              className="uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.625rem',
                letterSpacing: '0.42em',
                color: 'rgba(214,188,152,0.55)'
              }}
            >
              Rückmeldungen
            </span>
            <h2
              id="da-voices-heading"
              className="m-0 mt-5 max-w-[22ch] text-pretty leading-[1.12] tracking-[-0.028em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 100,
                fontSize: 'clamp(1.85rem, 1.35rem + 1.45vw, 2.45rem)',
                color: 'rgba(250,247,240,0.94)'
              }}
            >
              Sätze, die <Accent>bleiben</Accent>.
            </h2>
            <HairLine className="mx-auto mt-7 max-w-[2rem]" />
          </div>

          <div className="mx-auto mt-[clamp(2.25rem,5vw,3.25rem)] flex max-w-[38rem] flex-col">
            {VOICES.map((v, idx) => (
              <div key={v.quote}>
                <figure
                  data-reveal
                  style={{ ['--rev-delay' as never]: `${idx * 90}ms` }}
                  className="m-0 flex flex-col items-center text-center"
                >
                  <blockquote className="m-0">
                    <p
                      className="m-0 max-w-[36ch] text-pretty leading-[1.45] tracking-[-0.018em]"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 200,
                        fontSize: 'clamp(1.14rem, 1.03rem + 0.42vw, 1.4rem)',
                        color: 'rgba(248,245,238,0.9)'
                      }}
                    >
                      {renderQuote(v.quote, v.emphasis)}
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-center justify-center gap-3">
                    <span
                      aria-hidden
                      className="hidden min-[380px]:block h-px w-5 shrink-0 sm:w-6"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(214,168,94,0.55) 0%, rgba(214,168,94,0) 100%)'
                      }}
                    />
                    <span
                      className="max-w-[34ch] uppercase leading-snug"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '0.6rem',
                        letterSpacing: '0.22em',
                        color: 'rgba(214,188,152,0.48)'
                      }}
                    >
                      {v.meta}
                    </span>
                  </figcaption>
                </figure>
                {idx < VOICES.length - 1 ? (
                  <HairLine className="mx-auto my-[clamp(2rem,4.5vw,2.75rem)] max-w-[min(100%,7rem)] opacity-[0.38]" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/*  SECTION 6 — Einstieg (Premium-Glaspanels)      */}
      {/* ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pb-[clamp(7rem,16vw,12rem)] pt-[clamp(7rem,14vw,11rem)]"
        aria-labelledby="da-entry-heading"
      >
        <AtmosphereGrain className="absolute inset-0" opacity={0.05} />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(2,2,2,0.85) 0%, rgba(10,10,10,1) 25%, rgba(10,10,10,1) 75%, rgba(2,2,2,0.92) 100%)'
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(214,168,94,0.08) 0%, transparent 60%)'
          }}
        />

        <div className="relative z-[2] mx-auto w-full max-w-[1380px] px-6 sm:px-10 md:px-16 lg:px-20">
          <div className="flex flex-col items-center text-center" data-reveal>
            <h2
              id="da-entry-heading"
              className="m-0 max-w-[14ch] text-pretty font-extralight leading-[1.06] tracking-[-0.034em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(1.85rem, 1rem + 3.4vw, 3.05rem)',
                color: 'rgba(251,246,238,0.94)'
              }}
            >
              Der nächste Schritt ist <Accent>leise</Accent>.
            </h2>
            <HairLine className="mx-auto mt-9 max-w-[2.25rem]" />
          </div>

          <div
            className="mx-auto mt-[clamp(3rem,7vw,5rem)] grid max-w-[1100px] grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-4"
            data-reveal
            style={{ ['--rev-delay' as never]: '180ms' }}
          >
            <EntryPanel
              to="/erstgespraech"
              index="I"
              kicker="Gespräch"
              label="Strategisches Gespräch"
              caption="Ein erster Termin — diskret, präzise, ohne Verkaufsdruck."
            />
            <EntryPanel
              to="/quiz"
              index="II"
              kicker="Orientierung"
              label="Klarcheck"
              caption="Eine ruhige Standortbestimmung in wenigen Minuten."
            />
            <EntryPanel
              to="/anamnesis"
              index="III"
              kicker="Tiefe"
              label="Persönlicher Anamnesebogen"
              caption="Für Klient:innen, die in die Tiefe vorbereitet einsteigen."
            />
          </div>
        </div>
      </section>

      {/* ─────────── Styles & Animationen ─────────── */}
      <style>{`
        .da-root [data-reveal] {
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--rev-delay, 0ms);
          will-change: opacity, transform;
        }
        .da-root [data-reveal].is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .da-entry,
        .da-method-tile {
          transition:
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 900ms ease;
        }
        .da-entry:hover,
        .da-method-tile:hover {
          transform: translateY(-2px);
        }
        .da-cta:focus-visible,
        .da-entry:focus-visible {
          outline: none;
          box-shadow:
            inset 0 1px 0 rgba(236,218,182,0.08),
            inset 0 0 0 1px rgba(214,168,94,0.32),
            0 0 0 3px rgba(185,130,63,0.18);
        }
        @media (prefers-reduced-motion: reduce) {
          .da-root [data-reveal] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/** Renderer für Quotes mit Bronze-Highlight einzelner Wörter. */
function renderQuote(text: string, emphasis: string[]) {
  if (!emphasis.length) return text;
  const re = new RegExp(`(${emphasis.map(escapeRe).join('|')})`, 'gi');
  const parts = text.split(re);
  return parts.map((part, i) =>
    emphasis.some(e => e.toLowerCase() === part.toLowerCase()) ? (
      <Accent key={i}>{part}</Accent>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Magazin-Tile mit Bild, Bronze-Glow und Editorial-Caption. */
function FieldTile({
  field,
  className,
  size
}: {
  field: Field;
  className?: string;
  size: 'sm' | 'md' | 'lg';
}) {
  const titleSize =
    size === 'lg'
      ? 'clamp(1.25rem, 0.9rem + 1.1vw, 1.65rem)'
      : size === 'md'
        ? 'clamp(1.1rem, 0.88rem + 0.7vw, 1.35rem)'
        : 'clamp(1.05rem, 0.88rem + 0.55vw, 1.2rem)';
  const bodySize =
    size === 'lg'
      ? 'clamp(0.88rem, 0.85rem + 0.12vw, 0.95rem)'
      : 'clamp(0.82rem, 0.8rem + 0.08vw, 0.88rem)';

  return (
    <article
      data-reveal
      className={`da-tile group relative overflow-hidden ${className ?? ''}`}
      style={{ background: '#040406' }}
    >
      <img
        src={field.image}
        alt={field.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        style={{
          objectPosition: field.pos,
          filter: 'contrast(1.05) saturate(0.65) brightness(0.6) grayscale(0.22)'
        }}
      />
      {/* Bottom-Verlauf für Text */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(2,2,2,0.18) 0%, rgba(2,2,2,0.12) 45%, rgba(2,2,2,0.72) 78%, rgba(2,2,2,0.95) 100%)'
        }}
      />
      {/* Bronze-Glow bei Hover */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-out group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 90%, rgba(214,168,94,0.16) 0%, transparent 65%)'
        }}
      />
      {/* Innen-Rim */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          boxShadow:
            'inset 0 0 70px rgba(0,0,0,0.45), inset 0 1px 0 rgba(236,218,182,0.05), inset 0 -1px 0 rgba(214,168,94,0.08)'
        }}
      />
      <AtmosphereGrain opacity={0.04} />

      {/* Caption unten — Titel + dünne Linie + Body */}
      <div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col items-center px-5 pb-6 text-center sm:px-6 sm:pb-7">
        <h3
          className="m-0 leading-[1.1] tracking-[-0.022em]"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 200,
            fontSize: titleSize,
            color: 'rgba(252,247,238,0.96)'
          }}
        >
          {field.title}
        </h3>
        <span
          aria-hidden
          className="my-3 mx-auto block h-px w-7 transition-[width] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(214,168,94,0.62) 50%, transparent 100%)'
          }}
        />
        <p
          className="m-0 max-w-[32ch] text-pretty leading-[1.55]"
          style={{
            fontFamily: FONT_BODY,
            fontSize: bodySize,
            color: 'rgba(229,226,219,0.62)'
          }}
        >
          {field.line}
        </p>
      </div>
    </article>
  );
}
