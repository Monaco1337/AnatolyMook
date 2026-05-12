import { Link } from 'react-router-dom';
import { HERO_PORTRAIT } from '../constants/brandAssets';

const FONT_DISPLAY =
  "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" as const;
const FONT_BODY =
  "'Avenir Next', 'Avenir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" as const;

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

const POSITION_CHIPS: string[] = [
  'hohe Verantwortung',
  'anhaltender Druck',
  'innere Spannung',
  'Führungslast',
  'mentale Überlastung',
  'äußerer Erfolg bei innerer Instabilität'
];

/** Thematische Bilder — dunkel, editorial (Pexels, komprimiert). */
const PROFILE_BLOCKS: {
  title: string;
  line: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  align: 'imageLeft' | 'imageRight';
}[] = [
  {
    title: 'Unternehmer & Führungskräfte',
    line: 'Wenn das Tempo hoch bleibt — und trotzdem Klarheit über die nächsten Schritte fehlt.',
    image: '/images/home/methode-beratung-hintergrund.png',
    imageAlt: 'Diskrete Beratungssituation in zurückhaltendem Licht',
    imagePosition: 'object-[52%_42%]',
    align: 'imageLeft'
  },
  {
    title: 'Menschen unter mentalem Druck',
    line: 'Wenn konstante Erreichbarkeit mit kaum erholsamer Ruhe zusammentrifft.',
    image:
      'https://images.pexels.com/photos/3807688/pexels-photo-3807688.jpeg?auto=compress&cs=tinysrgb&w=1400',
    imageAlt: 'Arbeitsumgebung bei Dämmerung, Fokus und Belastung',
    imagePosition: 'object-[45%_38%]',
    align: 'imageRight'
  },
  {
    title: 'Menschen in Übergangsphasen',
    line: 'Rollenwechsel, Neuausrichtung — und der Wunsch nach einer stabilen inneren Linie.',
    image:
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1400',
    imageAlt: 'Architektur und Weg, symbolisch für Übergang',
    imagePosition: 'object-[60%_50%]',
    align: 'imageLeft'
  },
  {
    title: 'Menschen mit äußerem Erfolg und innerer Leere',
    line: 'Leistung nach außen, Leere oder Unruhe nach innen — ohne Drama, aber mit spürbarer Last.',
    image:
      'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1400',
    imageAlt: 'Stille, nächtliche Stadt — Abstand und Reflexion',
    imagePosition: 'object-[48%_45%]',
    align: 'imageRight'
  }
];

const FEEDBACK_TAGS = ['Klarheit', 'Stabilität', 'Fokus', 'Ruhe', 'Führung', 'Präzision'] as const;

const TESTIMONIALS: { quote: string; context: string }[] = [
  {
    quote:
      '„Endlich wieder Klarheit vor den Entscheidungen, die wirklich zählen — ohne das Gefühl, dauernd hinterherzulaufen.“',
    context: 'Führungskraft · internationaler Konzern'
  },
  {
    quote: '„Die Arbeit fühlt sich nicht nach Motivation an. Sie fühlt sich nach Ordnung an — und die bleibt.“',
    context: 'Unternehmerin · Dienstleistung'
  },
  {
    quote: '„Weniger Rauschen im Kopf. Mehr Präsenz in Gesprächen und im Kalender.“',
    context: 'Executive · Finance'
  }
];

function AtmosphereLayer({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
      style={{
        backgroundImage: GRAIN_SVG,
        backgroundRepeat: 'repeat',
        opacity: 0.045,
        mixBlendMode: 'overlay'
      }}
    />
  );
}

function SectionBreather() {
  return (
    <div className="relative h-px w-full overflow-hidden" aria-hidden>
      <div
        className="absolute inset-x-[12%] top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(214, 168, 94, 0.18) 22%, rgba(230, 200, 160, 0.12) 50%, rgba(214, 168, 94, 0.18) 78%, transparent)'
        }}
      />
    </div>
  );
}

export default function ZielgruppenPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-[#F4F4F4] antialiased selection:bg-[rgba(185,130,63,0.2)] selection:text-[#FAF7F2]">
      <AtmosphereLayer className="fixed z-[50]" />

      {/* —— Hero: cinematic full-bleed —— */}
      <section
        className="relative min-h-[min(92svh,920px)] w-full overflow-hidden"
        aria-labelledby="zg-hero-heading"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <picture className="absolute inset-0 block h-full w-full">
            <source
              type="image/avif"
              srcSet={`${HERO_PORTRAIT.pathBase}-640.avif 640w, ${HERO_PORTRAIT.pathBase}.avif 1024w`}
            />
            <source
              type="image/webp"
              srcSet={`${HERO_PORTRAIT.pathBase}-640.webp 640w, ${HERO_PORTRAIT.pathBase}.webp 1024w`}
            />
            <img
              src={`${HERO_PORTRAIT.pathBase}.png`}
              alt=""
              className="h-full w-full scale-[1.08] object-cover object-[58%_32%] sm:object-[56%_30%] lg:object-[54%_28%]"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{
                filter: 'contrast(1.08) saturate(0.88) brightness(0.78)'
              }}
            />
          </picture>

          {/* Nebel / Tiefe */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 90% 65% at 70% 20%, rgba(214, 168, 94, 0.07) 0%, transparent 52%), radial-gradient(ellipse 70% 50% at 20% 80%, rgba(255, 250, 242, 0.04) 0%, transparent 45%)'
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(2,2,3,0.5) 0%, rgba(2,2,3,0.15) 28%, rgba(2,2,3,0.55) 62%, rgba(1,1,2,0.92) 100%)'
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 38%, transparent 58%)'
            }}
          />
          {/* Bronze-Kante / Rim */}
          <div
            className="absolute inset-0"
            style={{
              boxShadow:
                'inset 0 0 120px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255, 248, 238, 0.06), inset 0 -1px 0 rgba(214, 168, 94, 0.08)'
            }}
          />
          <AtmosphereLayer />
        </div>

        <div className="relative z-[2] flex min-h-[min(92svh,920px)] flex-col justify-end px-6 pb-14 pt-28 sm:px-10 sm:pb-16 sm:pt-32 md:px-14 md:pb-20 lg:px-20 lg:pb-24">
          <div className="mx-auto w-full max-w-[min(100%,1200px)]">
            <p
              className="m-0 mb-6 uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.625rem, 0.58rem + 0.12vw, 0.6875rem)',
                fontWeight: 500,
                letterSpacing: '0.32em',
                color: 'rgba(214, 188, 152, 0.62)'
              }}
            >
              Zielgruppen
            </p>

            <h1
              id="zg-hero-heading"
              className="m-0 max-w-[18ch] font-light tracking-[-0.038em] text-balance"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2.125rem, 1.15rem + 4.2vw, 3.85rem)',
                lineHeight: 1.08,
                fontWeight: 300,
                color: 'rgba(252, 247, 238, 0.98)',
                textShadow:
                  '0 2px 1px rgba(0,0,0,0.9), 0 32px 80px rgba(0,0,0,0.65), 0 0 1px rgba(0,0,0,0.8)'
              }}
            >
              Wenn äußere Leistung
              <br />
              innere Stabilität nicht ersetzt.
            </h1>

            <p
              className="m-0 mt-10 max-w-[36rem] font-extralight leading-[1.65] tracking-[-0.02em]"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(1.03125rem, 0.94rem + 0.35vw, 1.25rem)',
                fontWeight: 200,
                color: 'rgba(220, 210, 195, 0.82)',
                textShadow: '0 12px 40px rgba(0,0,0,0.5)'
              }}
            >
              Diese Arbeit richtet sich an Menschen mit Verantwortung, mentaler Belastung und dem Wunsch nach klarer
              Führung — ruhig, präzise, ohne dramatische Versprechen.
            </p>
          </div>
        </div>
      </section>

      {/* Einordnung — Chips statt Bullet-Liste */}
      <section className="relative border-t border-[rgba(255,255,255,0.04)] bg-[#040404]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(185, 130, 63, 0.06) 0%, transparent 55%)'
          }}
        />
        <AtmosphereLayer />
        <div className="relative z-[1] mx-auto max-w-[1100px] px-6 py-20 sm:px-10 sm:py-24 md:px-14 md:py-28 lg:px-16">
          <p
            className="m-0 mb-4 uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.625rem',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: 'rgba(188, 168, 138, 0.5)'
            }}
          >
            Einordnung
          </p>
          <p
            className="m-0 max-w-[48rem] font-light leading-[1.55] tracking-[-0.015em]"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)',
              fontWeight: 300,
              color: 'rgba(232, 224, 210, 0.88)'
            }}
          >
            Typische Ausgangslagen — ohne Bewertung, mit Ernsthaftigkeit.
          </p>
          <div className="mt-12 flex flex-wrap gap-3 sm:gap-3.5" style={{ fontFamily: FONT_BODY }}>
            {POSITION_CHIPS.map((label) => (
              <span
                key={label}
                className="border border-[rgba(214,168,94,0.14)] bg-[rgba(8,8,9,0.65)] px-4 py-2.5 text-[13px] font-extralight tracking-[0.02em] sm:text-[13.5px]"
                style={{ color: 'rgba(198, 188, 172, 0.88)' }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SectionBreather />

      {/* Profile — abwechselnd Bild / Text */}
      <div className="bg-[#030303]">
        <h2 className="sr-only">Für wen diese Arbeit gedacht ist</h2>
        {PROFILE_BLOCKS.map((block, index) => {
          const imageCol = (
            <div className="relative min-h-[min(52vh,480px)] w-full overflow-hidden md:min-h-[420px]">
              <img
                src={block.image}
                alt={block.imageAlt}
                className={`absolute inset-0 h-full w-full object-cover ${block.imagePosition}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={{ filter: 'contrast(1.05) saturate(0.9) brightness(0.82)' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(2,2,3,0.25) 0%, transparent 40%, rgba(2,2,3,0.65) 100%)'
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  boxShadow:
                    'inset 0 0 0 1px rgba(214, 168, 94, 0.12), inset 0 0 80px rgba(0,0,0,0.45)'
                }}
              />
              <AtmosphereLayer />
            </div>
          );

          const textCol = (
            <div
              className="flex flex-col justify-center border-[rgba(255,255,255,0.04)] bg-[#050505] px-8 py-14 sm:px-12 sm:py-16 md:px-14 md:py-20 lg:px-16"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,248,238,0.03)'
              }}
            >
              <span
                className="mb-5 font-medium uppercase tracking-[0.28em]"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.625rem',
                  color: 'rgba(176, 158, 130, 0.45)'
                }}
              >
                {String(index + 1).padStart(2, '0')} — Profil
              </span>
              <h3
                className="m-0 max-w-[20ch] font-light tracking-[-0.03em]"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 'clamp(1.5rem, 1.2rem + 1.1vw, 2.125rem)',
                  fontWeight: 300,
                  lineHeight: 1.18,
                  color: 'rgba(248, 242, 230, 0.95)'
                }}
              >
                {block.title}
              </h3>
              <div
                className="my-8 h-px w-12"
                style={{
                  background: 'linear-gradient(90deg, rgba(214,168,94,0.45), rgba(214,168,94,0.05))'
                }}
                aria-hidden
              />
              <p
                className="m-0 max-w-[36rem] font-extralight leading-[1.68] tracking-[-0.012em]"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(1rem, 0.92rem + 0.2vw, 1.125rem)',
                  fontWeight: 200,
                  color: 'rgba(168, 162, 152, 0.92)'
                }}
              >
                {block.line}
              </p>
            </div>
          );

          return (
            <div key={block.title}>
              <div className="grid md:grid-cols-2 md:items-stretch">
                {block.align === 'imageLeft' ? (
                  <>
                    {imageCol}
                    {textCol}
                  </>
                ) : (
                  <>
                    <div className="md:order-2">{imageCol}</div>
                    <div className="md:order-1">{textCol}</div>
                  </>
                )}
              </div>
              {index < PROFILE_BLOCKS.length - 1 ? <SectionBreather /> : null}
            </div>
          );
        })}
      </div>

      {/* Rückmeldungen — große horizontale Panels */}
      <section className="relative border-t border-[rgba(255,255,255,0.05)] bg-[#020202]">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(185, 130, 63, 0.07) 0%, transparent 55%)'
          }}
        />
        <AtmosphereLayer />

        <div className="relative z-[1] mx-auto max-w-[1200px] px-6 py-20 sm:px-10 sm:py-24 md:px-14 md:py-28 lg:px-16">
          <p
            className="m-0 mb-4 uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.625rem',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: 'rgba(214, 188, 152, 0.55)'
            }}
          >
            Rückmeldungen aus der Arbeit
          </p>
          <h2
            className="m-0 max-w-[22ch] font-light tracking-[-0.032em] text-balance"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(1.75rem, 1.35rem + 1.2vw, 2.5rem)',
              fontWeight: 300,
              lineHeight: 1.15,
              color: 'rgba(250, 244, 234, 0.96)'
            }}
          >
            Was sich verändert hat.
          </h2>

          <div className="mt-10 flex flex-wrap gap-2.5" style={{ fontFamily: FONT_BODY }}>
            {FEEDBACK_TAGS.map((tag) => (
              <span
                key={tag}
                className="border border-[rgba(214,168,94,0.12)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em]"
                style={{ color: 'rgba(196, 176, 148, 0.55)', background: 'rgba(6,6,7,0.5)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-16 space-y-0">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                className="m-0 border-t border-[rgba(214,168,94,0.12)] py-12 first:border-t-0 first:pt-0 sm:py-14 md:py-16"
              >
                <blockquote
                  className="m-0 max-w-[52rem] font-light leading-[1.42] tracking-[-0.02em]"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 'clamp(1.35rem, 1.05rem + 1.1vw, 2.125rem)',
                    fontWeight: 300,
                    color: 'rgba(238, 230, 214, 0.94)'
                  }}
                >
                  {t.quote}
                </blockquote>
                <figcaption
                  className="mt-8 font-extralight uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '0.6875rem',
                    fontWeight: 200,
                    color: 'rgba(148, 140, 128, 0.75)'
                  }}
                >
                  {t.context}
                </figcaption>
              </figure>
            ))}
          </div>

          <p
            className="m-0 mt-16 max-w-[40rem] font-light leading-relaxed"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.8125rem',
              fontWeight: 300,
              letterSpacing: '0.02em',
              color: 'rgba(118, 112, 104, 0.82)'
            }}
          >
            Zusammenfassend beschriebene Muster — keine Garantien, keine Vereinfachung komplexer Realitäten.
          </p>

          <Link
            to="/erstgespraech"
            className="mt-8 inline-flex font-light uppercase tracking-[0.14em] text-[rgba(196,174,138,0.72)] underline decoration-[rgba(214,168,94,0.22)] underline-offset-[0.3em] transition-colors hover:text-[rgba(230,212,182,0.9)] hover:decoration-[rgba(214,168,94,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(185,130,63,0.28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#020202]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.75rem',
              fontWeight: 300
            }}
          >
            Strategisches Gespräch vereinbaren →
          </Link>
        </div>
      </section>
    </div>
  );
}
