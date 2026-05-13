import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import BrandWordmark from './BrandWordmark';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  cartItemCount?: number;
  onCartClick?: () => void;
}

const getSectionUrl = (section: string): string => {
  const urlMap: { [key: string]: string } = {
    'home': '/',
    'die-arbeit': '/die-arbeit',
    'about': '/die-arbeit',
    'transformation': '/die-arbeit',
    'resources': '/die-arbeit',
    'formate': '/formate',
    'seminare': '/seminare',
    'coaching': '/coaching',
    'keynotes': '/keynotes',
    'corporate': '/corporate',
    'produkte': '/produkte',
    'kontakt': '/kontakt',
    'quiz': '/quiz',
    'anamnesis': '/anamnesis',
    'blog': '/blog',
    'faq': '/faq',
    'booking': '/booking',
    'geschaeftskunden': '/corporate'
  };
  return urlMap[section] || `/${section}`;
};

export default function Navigation({ currentSection, onNavigate }: NavigationProps) {
  const theme: 'dark' = 'dark';
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  type MenuItem = { id: string; label: string; targetId: string };
  const menuStructure: MenuItem[] = [
    { id: 'die-arbeit', label: 'Bewusstseinsarchitektur', targetId: 'die-arbeit' },
    { id: 'formate', label: 'Portfolio', targetId: 'formate' },
    { id: 'corporate', label: 'Business', targetId: 'corporate' },
    { id: 'kontakt', label: 'Kontakt', targetId: 'kontakt' }
  ];

  const secondaryLinks: MenuItem[] = [
    { id: 'quiz', label: 'Klarcheck', targetId: 'quiz' },
    { id: 'anamnesis', label: 'Anamnese', targetId: 'anamnesis' },
    { id: 'blog', label: 'Blog', targetId: 'blog' },
    { id: 'faq', label: 'FAQ', targetId: 'faq' },
    { id: 'produkte', label: 'Shop', targetId: 'produkte' }
  ];

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(lastScrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);


  const navBg = theme === 'dark'
    ? 'rgba(29, 29, 31, 0.72)'
    : 'rgba(255, 255, 255, 0.72)';

  const navBorder = theme === 'dark'
    ? '0.5px solid rgba(255, 255, 255, 0.18)'
    : '0.5px solid rgba(0, 0, 0, 0.08)';

  const navShadow = theme === 'dark'
    ? `inset 0 0.5px 0 0 rgba(255, 255, 255, 0.2),
       inset 0 0 0 0.5px rgba(255, 255, 255, 0.04),
       0 20px 40px -8px rgba(0, 0, 0, 0.4),
       0 4px 12px rgba(0, 0, 0, 0.25)`
    : `inset 0 0.5px 0 0 rgba(255, 255, 255, 0.8),
       0 4px 16px rgba(0, 0, 0, 0.08),
       0 2px 8px rgba(0, 0, 0, 0.04)`;

  const gradientOverlay = theme === 'dark'
    ? 'from-white/[0.08]'
    : 'from-white/[0.5]';

  const textSecondary = theme === 'dark' ? 'text-white/65' : 'text-stone-600';
  const textActive = theme === 'dark' ? 'text-white' : 'text-stone-900';
  const hoverBg = theme === 'dark' ? 'hover:bg-white/[0.08]' : 'hover:bg-black/[0.04]';

  return (
    <>
      <style>{`
        .nav-booking-cta { transform: translate3d(0, 0, 0); will-change: transform, box-shadow; }
        .nav-booking-cta:hover { transform: translate3d(0, -1px, 0); }
        .nav-booking-cta:active { transform: translate3d(0, 0, 0) scale(0.97); }
        .nav-booking-cta:focus-visible {
          outline: none;
          box-shadow:
            inset 0 1px 0 rgba(244, 239, 231, 0.5),
            inset 0 0 0 1px rgba(230, 193, 138, 0.1),
            0 0 0 3px rgba(185, 130, 63, 0.35),
            0 0 26px rgba(214, 168, 94, 0.32),
            0 0 70px rgba(185, 130, 63, 0.20),
            0 8px 22px rgba(0, 0, 0, 0.35);
        }
      `}</style>
      <nav
        className="fixed top-0 left-0 right-0 z-[999999] pointer-events-none"
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="relative">
          <div className={`transition-all duration-700 ease-out ${isScrolled ? 'h-2' : 'h-4'}`} />

          <div
            className="max-w-[1600px] mx-auto px-3 sm:px-5 md:px-8 lg:px-16 pointer-events-auto"
            style={{
              position: 'relative',
              zIndex: 50
            }}
          >
            <div className="relative">
              <div
                className="relative rounded-[20px]"
                style={{
                  background: isScrolled ? navBg : 'transparent',
                  backdropFilter: isScrolled ? 'blur(60px) saturate(180%)' : 'none',
                  WebkitBackdropFilter: isScrolled ? 'blur(60px) saturate(180%)' : 'none',
                  border: isScrolled ? navBorder : '0.5px solid transparent',
                  boxShadow: isScrolled ? navShadow : 'none',
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  perspective: '1000px',
                  WebkitPerspective: '1000px',
                  overflow: 'visible',
                  transition: 'background 250ms ease, border-color 250ms ease, box-shadow 250ms ease, backdrop-filter 250ms ease, -webkit-backdrop-filter 250ms ease'
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${gradientOverlay} via-transparent to-transparent pointer-events-none`}
                  style={{
                    opacity: isScrolled ? 1 : 0,
                    transition: 'opacity 250ms ease'
                  }}
                />

                <div className="flex items-center justify-between h-[56px] px-3 sm:px-4 relative">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('home');
                    }}
                    aria-label={t('footer.logoHomeAria')}
                    className="group/logo relative -ml-1 rounded-[12px] px-4 py-2.5 outline-none transition-[transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-[rgba(214,168,94,0.38)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    {/* Transparente Leiste: mikroskopisches Lesefeld + Hairline — Wortmarke bleibt geschärft */}
                    {!isScrolled && theme === 'dark' && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[12px]"
                      >
                        <span
                          className="absolute left-1/2 top-[44%] h-[230%] min-h-[3.35rem] w-[min(142%,12rem)] -translate-x-1/2 -translate-y-1/2"
                          style={{
                            background:
                              'radial-gradient(ellipse 52% 46% at 50% 50%, rgba(3,3,5,0.62) 0%, rgba(8,7,10,0.28) 44%, rgba(14,11,14,0.06) 70%, transparent 100%)'
                          }}
                        />
                        <span className="absolute inset-x-4 top-[2px] h-px bg-gradient-to-r from-transparent via-[rgba(214,168,94,0.14)] to-transparent opacity-75" />
                      </span>
                    )}
                    <div
                      className={`absolute inset-0 z-[1] rounded-[12px] ${theme === 'dark' ? 'bg-white/[0.07]' : 'bg-black/[0.04]'} opacity-0 transition-opacity duration-500 group-hover/logo:opacity-100`}
                      style={{
                        boxShadow:
                          'inset 0 1px 0 rgba(255,248,238,0.06), inset 0 0 0 1px rgba(214,168,94,0.06)'
                      }}
                    />
                    <span className="relative z-[2] block origin-left transition-[transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/logo:scale-[1.012] motion-reduce:transform-none">
                      <BrandWordmark variant="nav" theme={theme} />
                    </span>
                  </a>

                  <div className="hidden lg:flex items-center gap-0.5">
                    {menuStructure.map((menu) => {
                      const isActive = currentSection === menu.targetId;
                      return (
                        <a
                          key={menu.id}
                          href={getSectionUrl(menu.targetId)}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(menu.targetId);
                          }}
                          className={`h-8 px-3.5 rounded-[8px] inline-flex items-center transition-all duration-300 ${hoverBg}`}
                        >
                          <span
                            className={`text-[12.5px] leading-none transition-colors ${isActive ? textActive : textSecondary} hover:${textActive}`}
                            style={{
                              fontWeight: 450,
                              letterSpacing: '0.04em'
                            }}
                          >
                            {menu.label}
                          </span>
                        </a>
                      );
                    })}
                  </div>

                  <div className="hidden lg:flex items-center">
                    <a
                      href="/booking"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('booking');
                      }}
                      className="nav-booking-cta group/cta relative inline-flex items-center justify-center px-4 py-2 rounded-[10px] overflow-hidden"
                      style={{

                        border: '1px solid rgba(166, 124, 82, 0.55)',
                        boxShadow: `
                          inset 0 1px 0 rgba(242, 226, 192, 0.22),
                          inset 0 -1px 0 rgba(90, 56, 30, 0.55),
                          inset 0 0 0 1px rgba(166, 124, 82, 0.08),
                          0 1px 0 rgba(255, 255, 255, 0.03),
                          0 6px 18px -8px rgba(0, 0, 0, 0.65),
                          0 10px 30px -16px rgba(0, 0, 0, 0.7)
                        `,
                        transition:
                          'transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 350ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 350ms ease',
                        isolation: 'isolate'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `
                          inset 0 1px 0 rgba(248, 232, 200, 0.32),
                          inset 0 -1px 0 rgba(110, 70, 38, 0.7),
                          inset 0 0 0 1px rgba(184, 138, 94, 0.18),
                          0 0 0 1px rgba(184, 138, 94, 0.08),
                          0 8px 22px -10px rgba(0, 0, 0, 0.7),
                          0 14px 36px -18px rgba(82, 54, 30, 0.45)
                        `;
                        e.currentTarget.style.borderColor = 'rgba(196, 154, 106, 0.7)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `
                          inset 0 1px 0 rgba(242, 226, 192, 0.22),
                          inset 0 -1px 0 rgba(90, 56, 30, 0.55),
                          inset 0 0 0 1px rgba(166, 124, 82, 0.08),
                          0 1px 0 rgba(255, 255, 255, 0.03),
                          0 6px 18px -8px rgba(0, 0, 0, 0.65),
                          0 10px 30px -16px rgba(0, 0, 0, 0.7)
                        `;
                        e.currentTarget.style.borderColor = 'rgba(166, 124, 82, 0.55)';
                      }}
                    >
                      {/* Edler Top-Glanz */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[11px]"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(255,255,255,0.085) 0%, rgba(255,255,255,0) 58%)'
                        }}
                      />
                      {/* Bronze-Hairline innen */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-2 top-px h-px"
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(166,124,82,0) 0%, rgba(214,176,128,0.55) 50%, rgba(166,124,82,0) 100%)'
                        }}
                      />
                      <span
                        className="relative text-[12.5px] leading-none transition-colors duration-400"
                        style={{
                          fontWeight: 500,
                          letterSpacing: '0.05em',
                          color: 'rgba(244,244,244,0.95)'
                        }}
                      >
                        Termin buchen
                      </span>
                    </a>
                  </div>

                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`lg:hidden relative w-[36px] h-[36px] -mr-0.5 flex items-center justify-center rounded-[9px] transition-all duration-400`}
                    style={{
                      background: isMobileMenuOpen
                        ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)')
                        : 'transparent'
                    }}
                    aria-label={isMobileMenuOpen ? t.nav.menu.close : t.nav.menu.open}
                  >
                    <div className="relative w-[20px] h-[20px]">
                      <div className={`
                        absolute inset-0 transition-all duration-400 ease-out
                        ${isMobileMenuOpen ? 'opacity-0 scale-75 rotate-45' : 'opacity-100 scale-100 rotate-0'}
                      `}>
                        <Menu size={20} className={textSecondary} strokeWidth={2} />
                      </div>

                      <div className={`
                        absolute inset-0 transition-all duration-400 ease-out
                        ${isMobileMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45'}
                      `}>
                        <X size={20} className={textSecondary} strokeWidth={2} />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`
          lg:hidden fixed inset-0 z-[999998]
          transition-all duration-400 ease-out
          ${isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          }
        `}
        style={{
          isolation: 'isolate'
        }}
      >
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`
            absolute inset-0
            ${theme === 'dark' ? 'bg-black/[0.5]' : 'bg-black/[0.3]'}
            backdrop-blur-[20px] saturate-[180%]
            transition-opacity duration-400
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}
          `}
        />

        <div
          className={`
            absolute left-3 right-3 sm:left-5 sm:right-5 md:left-8 md:right-8 lg:left-16 lg:right-16 top-[72px] max-h-[calc(100vh-84px)]
            rounded-[16px]
            overflow-hidden
            transition-all duration-400 ease-out
            ${isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2'
            }
          `}
          style={{
            background: theme === 'dark' ? 'rgba(29, 29, 31, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(60px) saturate(180%)',
            WebkitBackdropFilter: 'blur(60px) saturate(180%)',
            border: theme === 'dark' ? '0.5px solid rgba(255, 255, 255, 0.18)' : '0.5px solid rgba(0, 0, 0, 0.08)',
            boxShadow: theme === 'dark'
              ? `inset 0 0.5px 0 0 rgba(255, 255, 255, 0.2),
                 0 20px 40px rgba(0, 0, 0, 0.4),
                 0 4px 12px rgba(0, 0, 0, 0.25)`
              : `inset 0 0.5px 0 0 rgba(255, 255, 255, 0.8),
                 0 8px 24px rgba(0, 0, 0, 0.1),
                 0 4px 12px rgba(0, 0, 0, 0.06)`
          }}
        >
          <div className="overflow-y-auto max-h-[calc(100vh-84px)]">
            <div className="py-3 px-2">
              {menuStructure.map((menu, idx) => (
                <a
                  key={menu.id}
                  href={getSectionUrl(menu.targetId)}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(menu.targetId);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block relative w-full text-left px-4 py-2.5 rounded-[10px] mb-1 transition-all duration-300"
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${idx * 20}ms` : '0ms'
                  }}
                >
                  <span className={`text-[13px] font-[550] tracking-[0.01em] ${currentSection === menu.targetId ? textActive : textSecondary}`}>
                    {menu.label}
                  </span>
                </a>
              ))}
            </div>

            <div
              className="mx-4 my-2 h-px"
              aria-hidden
              style={{

              }}
            />

            <div className="py-2 px-2">
              {secondaryLinks.map((link) => (
                <a
                  key={link.id}
                  href={getSectionUrl(link.targetId)}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.targetId);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block relative w-full text-left px-4 py-2 rounded-[10px] mb-0.5 transition-all duration-300"
                >
                  <span className={`text-[12px] font-[500] tracking-[0.02em] ${textSecondary} opacity-80`}>
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            <div
              className="mx-4 my-2 h-px"
              aria-hidden
              style={{

              }}
            />

            <div className="p-4 pt-2 pb-4">
              <a
                href="/booking"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('booking');
                  setIsMobileMenuOpen(false);
                }}
                className="relative block w-full h-[44px] rounded-[11px] text-[14px] font-[500] tracking-[0.02em] transition-all duration-300 active:scale-[0.97] flex items-center justify-center overflow-hidden"
                style={{

                  border: '1px solid rgba(166, 124, 82, 0.55)',
                  boxShadow: `
                    inset 0 1px 0 rgba(242, 226, 192, 0.22),
                    inset 0 -1px 0 rgba(90, 56, 30, 0.55),
                    inset 0 0 0 1px rgba(166, 124, 82, 0.08),
                    0 6px 18px -8px rgba(0, 0, 0, 0.65),
                    0 10px 30px -16px rgba(0, 0, 0, 0.7)
                  `
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[11px]"
                  style={{

                  }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 top-px h-px"
                  style={{

                  }}
                />
                <span
                  className="relative"
                  style={{

                    filter:
                      'drop-shadow(0 1px 0 rgba(0,0,0,0.55)) drop-shadow(0 0 14px rgba(166,124,82,0.18))'
                  }}
                >
                  Termin buchen
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
