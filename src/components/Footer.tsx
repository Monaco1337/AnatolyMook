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
    about: '/about',
    transformation: '/transformation',
    resources: '/resources',
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
        { label: t('footer.links.about'), section: 'about' },
        { label: t('footer.links.blog'), section: 'blog' },
        { label: t('footer.links.faq'), section: 'faq' },
        { label: 'Transformation', section: 'transformation' }
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

      {/* Stein-Hintergrund — gestochen scharf, kein Blur */}
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

      {/* Subtile warme Bronze-/Gold-Reflexionen ÜBER dem Stein (Lesbarkeit + Atmosphäre) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(60% 42% at 26% 18%, rgba(166, 116, 60, 0.10) 0%, rgba(120, 78, 36, 0.04) 38%, rgba(0,0,0,0) 72%), radial-gradient(45% 38% at 86% 90%, rgba(214, 168, 94, 0.06) 0%, rgba(0,0,0,0) 70%), radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.32) 70%, rgba(0,0,0,0.55) 100%)'
        }}
      />

      {/* Dünne goldene Separator-Line oberhalb des Footers */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px"
        aria-hidden
        style={{
          background:
            'linear-gradient(90deg, rgba(214,168,94,0) 0%, rgba(214,168,94,0.18) 18%, rgba(231,192,138,0.55) 50%, rgba(214,168,94,0.18) 82%, rgba(214,168,94,0) 100%)'
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1320px] px-6 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-10">

        {/* SIGNATUR-BLOCK — ruhig, editorial, Logo als visuelles Zentrum */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 sm:gap-y-24 md:gap-y-0 md:gap-x-12 lg:gap-x-16 mb-24 sm:mb-28 md:mb-32">
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            {/* Logo (Bronze, ohne eingebetteten Stein-Kasten — echtes Alpha über Footer-Hintergrund) */}
            <a
              href="/"
              onClick={(e) => onNavigate && handleLinkClick(e, 'home')}
              className="group/ftlogo inline-block outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#070707] focus-visible:ring-[rgba(214,168,94,0.45)]"
              aria-label={t('footer.logoHomeAria')}
            >
              <div className="relative isolate w-[clamp(300px,46vw,440px)]">
                <img
                  src="/images/brand/anatoly-mook-logo.png"
                  width={1024}
                  height={435}
                  alt=""
                  draggable={false}
                  decoding="async"
                  loading="lazy"
                  className="relative z-[1] block h-auto w-full select-none"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            </a>

            <p
              className="m-0 mt-7 max-w-[26rem]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.875rem, 0.82rem + 0.18vw, 0.95rem)',
                fontWeight: 300,
                lineHeight: 1.62,
                letterSpacing: '-0.002em',
                color: 'rgba(244,239,230,0.72)'
              }}
            >
              {t('footer.tagline')}
            </p>

            <p
              className="m-0 mt-3 max-w-[26rem]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(238,230,216,0.5)'
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
