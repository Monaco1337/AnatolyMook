import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronsRight } from 'lucide-react';

const FONT_DISPLAY =
  "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" as const;
const FONT_BODY =
  "'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" as const;

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

/** Cinematic Backgrounds — eine zusammenhängende Luxus-Architektur über alle Sections.
 *  Reihenfolge entspricht der Scroll-Reise: Hero → Phase → Angebot → Öffnung. */
const PORTFOLIO_BG_HERO = '/images/portfolio/portfolio-hero-bg.png';
const PORTFOLIO_BG_PHASES = '/images/portfolio/portfolio-phases-bg.png';
const PORTFOLIO_BG_OFFERS = '/images/portfolio/portfolio-offers-bg.png';
const PORTFOLIO_BG_CTA = '/images/portfolio/portfolio-cta-bg.png';

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
          'linear-gradient(90deg, transparent 0%, rgba(214,168,94,0.55) 50%, transparent 100%)'
      }}
    />
  );
}

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        color: '#EADDCB',
        fontStyle: 'italic',
        fontWeight: 200,
        letterSpacing: '-0.005em'
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
         HERO — monumentale Architektur, schwebende Typografie
         ────────────────────────────────────────────── */}
      <style>{`
        /* Responsive Komposition — Headline immer auf dunklerem Bereich, warmes Licht atmet darunter */
        .fp-hero-bg-img { background-position: 50% 62%; }
        @media (max-width: 639px) {
          .fp-hero-bg-img { background-position: 52% 68%; }
        }
        @media (min-width: 1024px) {
          .fp-hero-bg-img { background-position: 50% 58%; }
        }
        @media (min-width: 1536px) {
          .fp-hero-bg-img { background-position: 50% 54%; }
        }
        /* Ultra-langsamer cinematic drift — fast unmerklich */
        @keyframes fp-hero-drift {
          0%   { transform: scale(1.045) translate3d(0, 0, 0); }
          50%  { transform: scale(1.055) translate3d(0, -6px, 0); }
          100% { transform: scale(1.045) translate3d(0, 0, 0); }
        }
        .fp-hero-bg-img { animation: fp-hero-drift 28s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .fp-hero-bg-img { animation: none; transform: scale(1.04); }
        }
      `}</style>
      <section
        className="relative overflow-hidden pb-[clamp(4.5rem,9vw,7rem)] pt-[clamp(8.5rem,14vw,11.5rem)]"
        aria-labelledby="fp-hero-heading"
        style={{ backgroundColor: '#020202' }}
      >
        {/* Monumentale Architektur — Premium-Stack, ein einziger Atem */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden style={{ backgroundColor: '#020202' }}>
          {/* Layer 0 — Foto, hochwertig, leicht beruhigt, mit cinematic drift */}
          <div
            className="fp-hero-bg-img absolute inset-0"
            style={{
              backgroundImage: `url('${PORTFOLIO_BG_HERO}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              opacity: 0.82,
              filter: 'saturate(0.94) contrast(1.05)',
              willChange: 'transform'
            }}
          />
          {/* Layer 1 — sehr dunkler Overlay für maximale Textlesbarkeit (0.48) */}
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.48)' }} />
          {/* Mittenwash radial — Lese-Aura hinter der Headline, asymmetrisch nach oben */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(62% 56% at 50% 40%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 46%, rgba(0,0,0,0.08) 78%, rgba(0,0,0,0) 100%)'
            }}
          />
          {/* Matte Tiefen-Lasur — einheitlicher Schwarzwert mit restlicher Seite */}
          <div className="absolute inset-0" style={{ background: 'rgba(2,2,3,0.18)' }} />
          {/* Layer 2 — radialer warmer Bronze-Glow hinter Headline, extrem weich */}
          <div
            className="absolute inset-0 mix-blend-screen opacity-[0.55]"
            style={{
              background:
                'radial-gradient(46% 36% at 50% 40%, rgba(232,180,118,0.09) 0%, rgba(186,128,62,0.04) 44%, rgba(0,0,0,0) 78%)'
            }}
          />
          {/* Champagne-Hauch über die natürliche Lichtkurve unten Mitte (mix-blend-soft-light) */}
          <div
            className="absolute inset-x-0 bottom-0 h-[55%] mix-blend-soft-light opacity-[0.55]"
            style={{
              background:
                'radial-gradient(58% 70% at 50% 95%, rgba(255,224,178,0.08) 0%, transparent 70%)'
            }}
          />
          {/* Layer 3 — Vignette außen, dunkelt Ränder oben/unten besonders */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(130% 92% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.16) 58%, rgba(0,0,0,0.5) 92%, rgba(0,0,0,0.72) 100%)'
            }}
          />
          {/* Layer 4 — atmospheric haze, minimale volumetrische Ruhe */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              background:
                'radial-gradient(82% 50% at 50% 60%, rgba(40,28,18,0.18) 0%, rgba(0,0,0,0) 70%)'
            }}
          />
          {/* Top-Fade — Verschmelzung mit Navbar-Saum, kein harter Cut */}
          <div
            className="absolute inset-x-0 top-0 h-44 sm:h-56"
            style={{
              background:
                'linear-gradient(180deg, rgba(2,2,2,0.98) 0%, rgba(2,2,2,0.66) 36%, rgba(2,2,2,0.22) 72%, rgba(2,2,2,0) 100%)'
            }}
          />
          {/* Bottom-Fade — atmosphärisches Ausblenden in die Intro-Section, Black-to-Black */}
          <div
            className="absolute inset-x-0 bottom-0 h-52 sm:h-64"
            style={{
              background:
                'linear-gradient(0deg, #020202 0%, rgba(2,2,2,0.94) 24%, rgba(2,2,2,0.6) 52%, rgba(2,2,2,0.22) 80%, transparent 100%)'
            }}
          />
          {/* Atmosphärischer Hairline-Top — feiner Bronze-Saum als visueller Anker */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(230,193,138,0.16) 50%, transparent 100%)'
            }}
          />
        </div>

        <div className="relative z-[2] mx-auto w-full max-w-[860px] px-6 sm:px-10 md:px-14">
          {/* Vertikale Komposition: Eyebrow + Headline sitzen leicht über der Mitte —
              das warme Licht des Bildes atmet darunter, Headline schwebt in der dunklen Zone. */}
          <div className="flex flex-col items-center text-center" data-reveal>
            <span
              className="uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.6875rem',
                letterSpacing: '0.46em',
                color: 'rgba(230,202,168,0.66)',
                textShadow: '0 2px 16px rgba(0,0,0,0.7)'
              }}
            >
              Formate
            </span>
            <h1
              id="fp-hero-heading"
              className="m-0 mt-6 max-w-[22ch] text-pretty leading-[1.04] tracking-[-0.034em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 100,
                fontSize: 'clamp(1.95rem, 1rem + 3.4vw, 3.15rem)',
                color: 'rgba(250,247,240,0.98)',
                textShadow:
                  '0 16px 56px rgba(0,0,0,0.72), 0 2px 18px rgba(0,0,0,0.55), 0 0 1px rgba(0,0,0,0.55)'
              }}
            >
              Sechs Wege in <Accent>dieselbe Wirkung</Accent>.
            </h1>
            <HairLine className="mx-auto mt-9 max-w-[2.25rem]" opacity={0.7} />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
         INTRO — Cinematic Wings + goldener Horizont (ab „Nicht jedes Format…")
         ────────────────────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden min-h-[min(52svh,580px)] pb-[clamp(3rem,6.5vw,4.5rem)] pt-[clamp(2.5rem,5.5vw,3.5rem)]"
        aria-label="Einordnung"
        style={{ backgroundColor: '#020202' }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden style={{ backgroundColor: '#020202' }}>
          <div
            className="fp-phases-bg-img absolute inset-0 scale-[1.02]"
            style={{
              backgroundImage: `url('${PORTFOLIO_BG_PHASES}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              opacity: 0.78,
              filter: 'saturate(0.96) contrast(1.04)'
            }}
          />
          {/* Radial-Depth — Lesefläche zentriert, warmes Licht rechts darf atmen */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(70% 78% at 46% 46%, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.38) 42%, rgba(0,0,0,0.14) 76%, rgba(0,0,0,0) 100%)'
            }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(2,2,3,0.18)' }} />
          {/* Soft top — nahtlos aus Hero-Unterkante (gleiche Black-Curve wie Hero-Bottom) */}
          <div
            className="absolute inset-x-0 top-0 h-40 sm:h-52"
            style={{
              background:
                'linear-gradient(180deg, rgba(2,2,2,0.98) 0%, rgba(2,2,2,0.6) 38%, rgba(2,2,2,0.18) 76%, transparent 100%)'
            }}
          />
          {/* Soft bottom — fließt nahtlos in FORMATE-Section, kein harter Cut */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 sm:h-52"
            style={{
              background:
                'linear-gradient(0deg, rgba(2,2,2,0.97) 0%, rgba(2,2,2,0.58) 38%, rgba(2,2,2,0.16) 78%, transparent 100%)'
            }}
          />
          {/* Bronze-Atem rechts — pickt das warme Licht des Bildes auf, ohne zu dominieren */}
          <div
            className="absolute inset-0 mix-blend-screen opacity-[0.65]"
            style={{
              background:
                'radial-gradient(38% 60% at 86% 52%, rgba(214,168,94,0.08) 0%, rgba(140,96,52,0.03) 46%, transparent 72%)'
            }}
          />
          {/* Champagne-Hauch oben mittig — emotionale Tiefenebene */}
          <div
            className="absolute inset-x-0 top-0 h-[55%] mix-blend-soft-light opacity-75"
            style={{
              background:
                'radial-gradient(58% 48% at 50% 24%, rgba(230,193,138,0.045) 0%, transparent 60%)'
            }}
          />
          {/* Innere Vignette — luxuriöse Schattendiffusion */}
          <div
            className="absolute inset-0 opacity-[0.45]"
            style={{ boxShadow: 'inset 0 0 min(78vw, 560px) rgba(0,0,0,0.46)' }}
          />
        </div>
        <style>{`
          .fp-phases-bg-img { background-position: 58% 50%; }
          @media (max-width: 639px) {
            .fp-phases-bg-img { background-position: 64% 50%; }
          }
          @media (min-width: 1024px) {
            .fp-phases-bg-img { background-position: 56% 48%; }
          }
        `}</style>

        <div
          className="relative z-[1] mx-auto flex h-full w-full max-w-[640px] flex-col justify-center px-6 text-center sm:px-10 md:px-14"
          data-reveal
        >
          <p
            className="m-0 text-pretty leading-[1.7]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.92rem, 0.88rem + 0.12vw, 1rem)',
              color: 'rgba(245, 240, 232, 0.92)',
              textShadow:
                '0 2px 18px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.55), 0 0 32px rgba(0,0,0,0.35)'
            }}
          >
            Nicht jedes Format ist für jede Phase gedacht.
          </p>
          <div
            className="mx-auto mt-5 flex flex-col items-center gap-1.5"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.88rem, 0.85rem + 0.1vw, 0.95rem)',
              color: 'rgba(234, 226, 215, 0.78)',
              lineHeight: 1.55,
              textShadow:
                '0 2px 16px rgba(0,0,0,0.62), 0 1px 3px rgba(0,0,0,0.5), 0 0 24px rgba(0,0,0,0.32)'
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
         FORMATE — Editorial-Reihen (Bild 2: Säulen-Architektur)
         Background mit zwei warm beleuchteten Säulen rahmt die Liste,
         Mitte bleibt dunkel und ruhig — Typografie liegt im Raum.
         ────────────────────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden pb-[clamp(3rem,7vw,4.5rem)] pt-[clamp(1.25rem,2.5vw,2rem)]"
        aria-label="Sechs Formate"
        style={{ backgroundColor: '#020202' }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden style={{ backgroundColor: '#020202' }}>
          {/* Foto-Layer — Säulen-Atmosphäre, sehr ruhig, in den Hintergrund verlagert */}
          <div
            className="fp-offers-bg-img absolute inset-0 scale-[1.04]"
            style={{
              backgroundImage: `url('${PORTFOLIO_BG_OFFERS}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              opacity: 0.6,
              filter: 'saturate(0.95) contrast(1.03)'
            }}
          />
          {/* Zentrale Lesemaske — schützt die Editorial-Reihen */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(78% 88% at 50% 50%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 38%, rgba(0,0,0,0.2) 74%, rgba(0,0,0,0) 100%)'
            }}
          />
          {/* Matte Lasur — gleiche cinematic Schwarzwerte wie Intro */}
          <div className="absolute inset-0" style={{ background: 'rgba(2,2,3,0.22)' }} />
          {/* Soft top — nahtlos aus Intro-Bottom (gleicher Verlauf) */}
          <div
            className="absolute inset-x-0 top-0 h-44 sm:h-56"
            style={{
              background:
                'linear-gradient(180deg, rgba(2,2,2,0.99) 0%, rgba(2,2,2,0.74) 32%, rgba(2,2,2,0.34) 64%, rgba(2,2,2,0.1) 86%, transparent 100%)'
            }}
          />
          {/* Soft bottom — atmosphärische Brücke direkt in die vereinte Resolution-Sequenz */}
          <div
            className="absolute inset-x-0 bottom-0 h-48 sm:h-64"
            style={{
              background:
                'linear-gradient(0deg, rgba(2,2,2,0.98) 0%, rgba(2,2,2,0.7) 32%, rgba(2,2,2,0.32) 64%, rgba(2,2,2,0.1) 86%, transparent 100%)'
            }}
          />
          {/* Bronze-Säulenlicht links + rechts — als atmosphärische Tiefe, nicht als Effekt */}
          <div
            className="absolute inset-0 mix-blend-screen opacity-[0.55]"
            style={{
              background: `
                radial-gradient(32% 60% at 4% 56%, rgba(214,168,94,0.075) 0%, rgba(140,96,52,0.025) 48%, transparent 72%),
                radial-gradient(32% 60% at 96% 56%, rgba(214,168,94,0.07) 0%, rgba(140,96,52,0.02) 48%, transparent 72%)
              `
            }}
          />
          {/* Champagne-Bogen oben mittig — verbindet visuell mit dem Bogen aus Bild 2 */}
          <div
            className="absolute inset-x-0 top-0 h-[40%] mix-blend-soft-light opacity-65"
            style={{
              background:
                'radial-gradient(56% 42% at 50% 18%, rgba(230,193,138,0.05) 0%, transparent 64%)'
            }}
          />
          {/* Innere Vignette — gleiche Schattenkurve wie Intro */}
          <div
            className="absolute inset-0 opacity-[0.45]"
            style={{ boxShadow: 'inset 0 0 min(82vw, 600px) rgba(0,0,0,0.48)' }}
          />
        </div>
        <style>{`
          .fp-offers-bg-img { background-position: center 50%; }
          @media (max-width: 639px) {
            .fp-offers-bg-img { background-position: center 52%; }
          }
          @media (min-width: 1024px) {
            .fp-offers-bg-img { background-position: center 46%; }
          }
        `}</style>

        <div className="relative z-[1] mx-auto w-full max-w-[920px] px-6 sm:px-10 md:px-14">
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
              <ChevronsRight aria-hidden className="h-3 w-3 opacity-85" strokeWidth={2.5} style={{ color: 'rgba(229,200,156,0.75)' }} />
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
                          'linear-gradient(90deg, rgba(214,168,94,0.5) 0%, rgba(214,168,94,0) 100%)'
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
         CINEMATIC RESOLUTION — Verdichtung + CTA als EINE Sequenz
         Reflexion → Klärung → Einladung · ein durchgehender Lichtraum (Bild 3)
         ────────────────────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden pb-[clamp(5rem,11vw,7.5rem)] pt-[clamp(3rem,7vw,5rem)]"
        aria-labelledby="fp-cta-heading"
        style={{ backgroundColor: '#020202' }}
      >
        {/* Ein einziger atmosphärischer Stack — derselbe Lichtraum für beide Inhaltsblöcke */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden style={{ backgroundColor: '#020202' }}>
          {/* Foto-Layer — Lichtöffnung wandert visuell zum unteren Drittel,
              oben bleibt es introspektiv-dunkel, unten öffnet sich die Klärung */}
          <div
            className="fp-cta-bg-img absolute inset-0 scale-[1.05]"
            style={{
              backgroundImage: `url('${PORTFOLIO_BG_CTA}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              opacity: 0.82,
              filter: 'saturate(0.99) contrast(1.04)'
            }}
          />
          {/* Asymmetrische Lese-Lasur — oben mehr Stille (Reflexion), unten freier (Einladung) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(78% 86% at 50% 62%, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.32) 42%, rgba(0,0,0,0.12) 76%, rgba(0,0,0,0) 100%)'
            }}
          />
          {/* Sanfte vertikale Dramaturgie — von dunkler Reflexion oben zu warmem Licht unten */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(2,2,2,0.5) 0%, rgba(2,2,2,0.32) 24%, rgba(2,2,2,0.12) 52%, rgba(2,2,2,0) 70%, rgba(2,2,2,0) 100%)'
            }}
          />
          {/* Cinematic Lasur — gleicher Schwarzwert wie alle Sections */}
          <div className="absolute inset-0" style={{ background: 'rgba(2,2,3,0.18)' }} />
          {/* Soft top — nahtloser Eintritt aus den Formate-Reihen */}
          <div
            className="absolute inset-x-0 top-0 h-52 sm:h-64"
            style={{
              background:
                'linear-gradient(180deg, rgba(2,2,2,0.98) 0%, rgba(2,2,2,0.78) 28%, rgba(2,2,2,0.42) 56%, rgba(2,2,2,0.14) 82%, rgba(2,2,2,0) 100%)'
            }}
          />
          {/* Soft bottom — getragener architektonischer Abschluss zum Footer */}
          <div
            className="absolute inset-x-0 bottom-0 h-52 sm:h-72"
            style={{
              background:
                'linear-gradient(0deg, #020202 0%, rgba(2,2,2,0.92) 24%, rgba(2,2,2,0.62) 52%, rgba(2,2,2,0.22) 80%, transparent 100%)'
            }}
          />
          {/* Bronze-Atem — folgt der Lichtöffnung im unteren Drittel (emotionale Auflösung) */}
          <div
            className="absolute inset-0 mix-blend-screen opacity-[0.7]"
            style={{
              background:
                'radial-gradient(48% 50% at 50% 70%, rgba(214,168,94,0.085) 0%, rgba(160,108,58,0.035) 44%, transparent 72%)'
            }}
          />
          {/* Champagne-Höhepunkt unten Mitte — wärmt die CTA-Zone, kontrolliert */}
          <div
            className="absolute inset-x-0 bottom-0 h-[44%] mix-blend-soft-light opacity-80"
            style={{
              background:
                'radial-gradient(72% 58% at 50% 100%, rgba(230,193,138,0.095) 0%, rgba(90,60,32,0.035) 48%, transparent 76%)'
            }}
          />
          {/* Subtiler Champagne-Hauch oben — verbindet Reflexion mit demselben Lichtsystem */}
          <div
            className="absolute inset-x-0 top-0 h-[44%] mix-blend-soft-light opacity-60"
            style={{
              background:
                'radial-gradient(56% 42% at 50% 16%, rgba(230,193,138,0.038) 0%, transparent 64%)'
            }}
          />
          {/* Innere Vignette — gleiche Schattenkurve wie Intro & Formate */}
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{ boxShadow: 'inset 0 0 min(82vw, 600px) rgba(0,0,0,0.5)' }}
          />
          {/* Bronze-Hairline oben — visueller Anker, gleicher Saum wie Hero */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(230,193,138,0.18) 50%, transparent 100%)'
            }}
          />
        </div>
        <style>{`
          .fp-cta-bg-img { background-position: center 56%; }
          @media (max-width: 639px) {
            .fp-cta-bg-img { background-position: center 54%; }
          }
          @media (min-width: 1024px) {
            .fp-cta-bg-img { background-position: center 60%; }
          }
        `}</style>

        {/* Eine einzige typografische Sequenz — gemeinsamer Rhythmus, atmender Übergang */}
        <div className="relative z-[2] mx-auto w-full max-w-[640px] px-6 text-center sm:px-10 md:px-14">
          {/* 1. Reflexion */}
          <div data-reveal>
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
                color: 'rgba(229,226,219,0.62)'
              }}
            >
              Sondern: welcher Rahmen Ihrer aktuellen Situation gerecht wird.
            </p>
          </div>

          {/* Atmender Übergang — kein Trenner, nur eine kalibrierte Pause */}
          <div
            aria-hidden
            className="mx-auto mt-[clamp(2.5rem,6vw,4rem)] mb-[clamp(2rem,5vw,3rem)] h-px w-[min(2.25rem,18vw)] opacity-[0.55]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(214,168,94,0.45) 50%, transparent 100%)'
            }}
          />

          {/* 2. Klärung & Einladung — emotionale Auflösung desselben Moments */}
          <div data-reveal style={{ ['--rev-delay' as never]: '160ms' }}>
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
              className="metallic-bronze-button hero-cta mt-7 inline-flex items-center justify-center whitespace-nowrap"
              style={{
                padding: 'clamp(14px, 1.35vw, 18px) clamp(26px, 3.2vw, 36px)',
                minHeight: 'clamp(48px, 5.2vw, 56px)',
                fontFamily: FONT_BODY
              }}
            >
              <span
                className="leading-none whitespace-nowrap"
                style={{
                  fontSize: 'clamp(0.875rem, 0.8rem + 0.24vw, 1.02rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.006em'
                }}
              >
                Erstgespräch vereinbaren
              </span>
            </Link>
          </div>
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
