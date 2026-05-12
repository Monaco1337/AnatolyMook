import { Link } from 'react-router-dom';
import { Mail, Linkedin, Instagram, Youtube, ArrowUp, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { europeanCities } from '../utils/localSEO';
import { topicClusters } from '../seo/topicClusters';
import { glossaryEntries } from '../seo/glossaryData';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

const getSectionUrl = (section: string): string => {
  const urlMap: { [key: string]: string } = {
    home: '/',
    'die-arbeit': '/die-arbeit',
    about: '/die-arbeit',
    transformation: '/die-arbeit',
    resources: '/die-arbeit',
    seminare: '/seminare',
    coaching: '/coaching',
    keynotes: '/keynotes',
    corporate: '/corporate',
    produkte: '/produkte',
    kontakt: '/kontakt',
    quiz: '/quiz',
    anamnesis: '/anamnesis',
    blog: '/blog',
    faq: '/faq',
    booking: '/booking',
    geschaeftskunden: '/corporate',
    impressum: '/impressum',
    datenschutz: '/datenschutz'
  };
  return urlMap[section] || `/${section}`;
};

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    if (onNavigate && section) {
      e.preventDefault();
      onNavigate(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /** Spalten-Definition — ruhig, editorial, identische Hierarchie */
  const columns: { label: string; items: { label: string; section?: string; href?: string }[] }[] = [
    {
      label: t('footer.sections.offer'),
      items: [
        { label: t('footer.links.seminars'), section: 'seminare' },
        { label: t('footer.links.coaching'), section: 'coaching' },
        { label: t('footer.links.corporate'), section: 'geschaeftskunden' },
        { label: t('footer.links.products'), section: 'produkte' }
      ]
    },
    {
      label: t('footer.sections.discover'),
      items: [
        { label: t('footer.links.dieArbeit'), section: 'die-arbeit' },
        { label: t('footer.links.blog'), section: 'blog' },
        { label: t('footer.links.faq'), section: 'faq' }
      ]
    },
    {
      label: t('footer.sections.contact'),
      items: [
        { label: t('footer.links.contact'), section: 'kontakt' },
        { label: 'Termin buchen', section: 'booking' },
        { label: t('footer.links.email'), href: 'mailto:mail@anatoly-mook.de' }
      ]
    },
    {
      label: t('footer.sections.legal'),
      items: [
        { label: t('footer.links.imprint'), section: 'impressum' },
        { label: t('footer.links.privacy'), section: 'datenschutz' }
      ]
    }
  ];

  const socials: { Icon: typeof Mail; href: string; label: string }[] = [
    { Icon: Mail, href: 'mailto:mail@anatoly-mook.de', label: 'Email' },
    { Icon: Phone, href: 'tel:+4923033340628', label: 'Phone' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/anatolymook', label: 'LinkedIn' },
    { Icon: Instagram, href: 'https://www.instagram.com/anatolymux', label: 'Instagram' },
    { Icon: Youtube, href: 'https://www.youtube.com/@anatolymux', label: 'YouTube' }
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
      data-section
      data-section-id="footer"
    >
      <style>{`
        .ft-link {
          transition: color 500ms ease, transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ft-link:hover { color: rgba(244,239,230,0.92); }
        .ft-link .ft-link-mark {
          transition: width 500ms cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 500ms ease;
        }
        .ft-link:hover .ft-link-mark { width: 0.625rem; opacity: 1; }
        .ft-social {
          transition: border-color 500ms ease, color 500ms ease, transform 500ms cubic-bezier(0.22, 1, 0.36, 1), background 500ms ease, box-shadow 500ms ease;
        }
        .ft-social:hover {
          transform: translateY(-2px);
          border-color: rgba(214,168,94,0.36) !important;
          color: rgba(244,239,230,0.95) !important;
          background: rgba(214,168,94,0.04) !important;
        }
        .ft-back-to-top {
          transition: border-color 500ms ease, background 500ms ease, transform 500ms cubic-bezier(0.22, 1, 0.36, 1), color 500ms ease;
        }
        .ft-back-to-top:hover {
          transform: translateY(-2px);
          border-color: rgba(214,168,94,0.36);
          background: rgba(214,168,94,0.04);
          color: rgba(244,239,230,0.95);
        }

      `}</style>

      {/* Stein-Hintergrund — vollflächig, ein Layer, ohne sichtbare Blöcke */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: 'url(/images/manifest/footer-stone-granite-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Tiefe Vignette ringsum — cineastisch, nahtlos */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(130% 90% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.55) 90%, rgba(0,0,0,0.78) 100%)'
        }}
      />

      {/* Sehr feiner, ruhiger Lichtkegel hoch oben hinter dem Logo */}
      <div
        className="pointer-events-none absolute z-0"
        aria-hidden
        style={{
          top: '-6%',
          left: '50%',
          width: 'min(820px, 86%)',
          height: '520px',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(50% 60% at 50% 50%, rgba(214,168,94,0.10) 0%, rgba(166,116,60,0.05) 40%, rgba(0,0,0,0) 78%)',
          mixBlendMode: 'screen',
          opacity: 0.85
        }}
      />

      {/* Hauchfeine Separator-Linie oben — knapp sichtbar, kein Block */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px"
        aria-hidden
        style={{
          background:
            'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.10) 22%, rgba(231,192,138,0.32) 50%, rgba(214,168,94,0.10) 78%, rgba(214,168,94,0) 100%)'
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1320px] px-6 sm:px-8 md:px-12 lg:px-16 pt-10 sm:pt-12 md:pt-14 lg:pt-16 pb-10">

        {/* SIGNATUR-BLOCK — Logo frei im Raum, integriert in die Stein-Textur */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 sm:gap-y-20 md:gap-y-0 md:gap-x-12 lg:gap-x-16 mb-24 sm:mb-28 md:mb-32">
          <div className="md:col-span-5 flex flex-col items-start">
            {/* Logo (frei stehend, ohne Container — Stein-Textur verschmilzt mit Footer-BG) */}
            <a
              href="/"
              onClick={(e) => onNavigate && handleLinkClick(e, 'home')}
              className="group/ftlogo inline-block outline-none focus-visible:outline-none"
              aria-label={t('footer.logoHomeAria')}
              style={{ marginTop: 'clamp(-176px, -10vw, -124px)', marginLeft: 'clamp(-72px, -5vw, -32px)' }}
            >
              <div
                className="relative isolate w-[clamp(360px,46vw,560px)] aspect-square"
              >
                <img
                  src="/images/brand/anatoly-mook-logo-hero.png"
                  width={1024}
                  height={1024}
                  alt=""
                  draggable={false}
                  decoding="async"
                  loading="lazy"
                  className="relative z-[1] block h-full w-full select-none"
                  style={{ imageRendering: 'auto' }}
                />

                {/* Wortmarke ANATOLY MOOK — Montserrat Ultra Light, exakt Bronze der Strahlen */}
                <span
                  className="pointer-events-none absolute z-[2] select-none whitespace-nowrap"
                  style={{
                    left: 'calc(50% + 7px)',
                    top: '54.5%',
                    transform: 'translate(-50%, 0)',
                    fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
                    fontWeight: 200,
                    fontSynthesis: 'none',
                    letterSpacing: '0.22em',
                    wordSpacing: '-0.12em',
                    textTransform: 'uppercase',
                    fontSize: 'clamp(1.4rem, 3.6vw, 2.25rem)',
                    lineHeight: 1,
                    color: '#B98452',
                    textShadow:
                      '0 1px 0 rgba(20,12,6,0.55), 0 0 1px rgba(201,150,86,0.35)',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'geometricPrecision'
                  }}
                  aria-hidden
                >
                  ANATOLY MOOK
                </span>
              </div>
            </a>

            <p
              className="relative z-[2] m-0 -mt-[5.25rem] sm:-mt-[6rem] md:-mt-[6.75rem] max-w-[28rem]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.9rem, 0.84rem + 0.2vw, 1rem)',
                fontWeight: 400,
                lineHeight: 1.62,
                letterSpacing: '-0.002em',
                color: 'rgba(248,243,232,0.92)',
                textShadow: '0 1px 8px rgba(0,0,0,0.55)'
              }}
            >
              {t('footer.tagline')}
            </p>

            <p
              className="relative z-[2] m-0 mt-3 max-w-[28rem]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8438rem',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(238,230,216,0.78)',
                textShadow: '0 1px 6px rgba(0,0,0,0.45)'
              }}
            >
              {t('footer.description')}
            </p>

            {/* Social — sehr subtil */}
            <div className="mt-9 flex flex-wrap items-center gap-2.5">
              {socials.map(({ Icon, href, label }, idx) => (
                <a
                  key={`ft-soc-${idx}`}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="ft-social inline-flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(214,168,94,0.18)',
                    color: 'rgba(238,230,216,0.55)'
                  }}
                >
                  <Icon size={15} strokeWidth={1.6} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* LINK-SPALTEN */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-12">
            {columns.map((col, ci) => (
              <div key={`ft-col-${ci}`}>
                <h4
                  className="m-0 mb-5"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    background:
                      'linear-gradient(135deg, #F2E2C0 0%, #D6A85E 50%, #B9823F 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.45))'
                  }}
                >
                  {col.label}
                </h4>
                <ul className="m-0 list-none space-y-3">
                  {col.items.map((item, ii) => {
                    const href = item.section ? getSectionUrl(item.section) : item.href || '#';
                    return (
                      <li key={`ft-item-${ci}-${ii}`}>
                        <a
                          href={href}
                          onClick={(e) => item.section && handleLinkClick(e, item.section)}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="ft-link inline-flex items-center gap-2"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.84rem',
                            fontWeight: 400,
                            letterSpacing: '-0.002em',
                            color: 'rgba(238,230,216,0.55)'
                          }}
                        >
                          <span
                            aria-hidden
                            className="ft-link-mark block h-px w-0 opacity-0"
                            style={{
                              background:
                                'linear-gradient(90deg, rgba(214,168,94,0.9) 0%, rgba(214,168,94,0) 100%)'
                            }}
                          />
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Mega-Sitemap — eingeklappt, sehr ruhig */}
        <div className="mb-12 sm:mb-14">
          <div
            className="h-px w-full mb-10"
            aria-hidden
            style={{
              background:
                'linear-gradient(90deg, rgba(214,168,94,0.20) 0%, rgba(214,168,94,0.06) 38%, rgba(255,255,255,0.03) 70%, rgba(255,255,255,0) 100%)'
            }}
          />

          <details className="group">
            <summary
              className="cursor-pointer list-none inline-flex items-center gap-2.5 select-none"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(214,188,152,0.5)'
              }}
            >
              <span
                aria-hidden
                className="block h-px w-6"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(214,168,94,0.8) 0%, rgba(214,168,94,0) 100%)'
                }}
              />
              Standorte &amp; Themen
              <span style={{ color: 'rgba(238,230,216,0.25)', letterSpacing: '0.04em' }}>
                ({europeanCities.length} Städte · {topicClusters.length + glossaryEntries.length} Themen)
              </span>
            </summary>

            <div className="mt-7 space-y-9">
              {[
                { title: 'Coaching · Städte', items: europeanCities.slice(0, 60).map(c => ({ label: c.city, to: `/coaching/${c.slug}` })) },
                { title: 'Seminare · Städte', items: europeanCities.slice(0, 40).map(c => ({ label: c.city, to: `/seminare/${c.slug}` })) },
                { title: 'Keynotes · Städte', items: europeanCities.slice(0, 30).map(c => ({ label: c.city, to: `/keynotes/${c.slug}` })) },
                { title: 'Corporate · Städte', items: europeanCities.slice(0, 30).map(c => ({ label: c.city, to: `/corporate/${c.slug}` })) },
                { title: 'Themen', items: topicClusters.map(tc => ({ label: tc.title.de, to: `/thema/${tc.slug}` })) },
                { title: 'Glossar', items: glossaryEntries.map(g => ({ label: g.term.de, to: `/glossar/${g.slug}` })) }
              ].map((block, bi) => (
                <div key={`ft-sitemap-${bi}`}>
                  <p
                    className="m-0 mb-3"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(214,188,152,0.45)'
                    }}
                  >
                    {block.title}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {block.items.map((it, ii) => (
                      <Link
                        key={`ft-it-${bi}-${ii}`}
                        to={it.to}
                        className="transition-colors duration-300"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.72rem',
                          fontWeight: 400,
                          color: 'rgba(238,230,216,0.32)'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(244,239,230,0.78)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(238,230,216,0.32)')}
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* BOTTOM — Copyright + Back-to-top */}
        <div
          className="pt-8 mt-2 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div
            className="pointer-events-none absolute inset-x-6 sm:inset-x-8 md:inset-x-12 lg:inset-x-16 h-px"
            aria-hidden
            style={{
              background:
                'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.12) 50%, rgba(214,168,94,0) 100%)',
              marginTop: '-1px'
            }}
          />
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <p
              className="m-0"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 400,
                letterSpacing: '0.02em',
                color: 'rgba(238,230,216,0.4)'
              }}
            >
              {t('footer.copyright')}
            </p>
            <p
              className="m-0"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.65rem',
                fontWeight: 400,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(214,188,152,0.32)'
              }}
            >
              Editorial · Bewusstseinsarbeit · seit 2016
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="ft-back-to-top inline-flex items-center gap-2.5 rounded-full"
            style={{
              padding: '0.7rem 1.15rem',
              background: 'transparent',
              border: '1px solid rgba(214,168,94,0.22)',
              color: 'rgba(238,230,216,0.62)'
            }}
            aria-label={t('footer.backToTop')}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase'
              }}
            >
              {t('footer.backToTop')}
            </span>
            <ArrowUp size={13} strokeWidth={1.8} aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
