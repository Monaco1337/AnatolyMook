import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import DropdownPortal from './DropdownPortal';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  cartItemCount?: number;
  onCartClick?: () => void;
}

const getSectionUrl = (section: string): string => {
  const urlMap: { [key: string]: string } = {
    'home': '/',
    'about': '/about',
    'transformation': '/transformation',
    'resources': '/resources',
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
  const { theme, toggleTheme, colors } = useTheme();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndicatorStyle, setActiveIndicatorStyle] = useState<{left: number; width: number} | null>(null);
  const navRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const dropdownButtonRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownOpen = (menuId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(menuId);
  };

  const handleDropdownClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const menuStructure = [
    {
      id: 'akademie',
      label: 'AKADEMIE',
      hasDropdown: true,
      items: [
        { id: 'about', label: 'Methode' },
        { id: 'transformation', label: 'Zielgruppen' },
        { id: 'resources', label: 'Lebensbereiche' }
      ]
    },
    {
      id: 'formate',
      label: 'FORMATE',
      hasDropdown: true,
      items: [
        { id: 'seminare', label: 'Seminare' },
        { id: 'coaching', label: 'Coaching' },
        { id: 'keynotes', label: 'Keynotes' }
      ]
    },
    {
      id: 'corporate',
      label: 'BUSINESS',
      hasDropdown: false,
      targetId: 'corporate'
    },
    {
      id: 'produkte',
      label: 'SHOP',
      hasDropdown: false,
      targetId: 'produkte'
    },
    {
      id: 'kontakt',
      label: 'KONTAKT',
      hasDropdown: true,
      items: [
        { id: 'kontakt', label: 'Kontakt' },
        { id: 'quiz', label: 'Klarcheck' },
        { id: 'anamnesis', label: 'Anamnese' },
        { id: 'blog', label: 'Blog' },
        { id: 'faq', label: 'FAQ' }
      ]
    }
  ];

  const sections = [
    { id: 'seminare', label: t.nav.seminare },
    { id: 'coaching', label: t.nav.coaching },
    { id: 'geschaeftskunden', label: t.nav.business },
    { id: 'produkte', label: t.nav.shop },
    { id: 'blog', label: t.nav.blog },
    { id: 'faq', label: t.nav.faq },
    { id: 'kontakt', label: t.nav.kontakt }
  ];

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

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

  const updateIndicator = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      const activeRef = navRefs.current[currentSection];
      const container = navContainerRef.current;
      if (activeRef && container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeRef.getBoundingClientRect();
        const newLeft = buttonRect.left - containerRect.left;
        const newWidth = buttonRect.width;
        setActiveIndicatorStyle(prev => {
          if (prev && Math.abs(prev.left - newLeft) < 0.5 && Math.abs(prev.width - newWidth) < 0.5) {
            return prev;
          }
          return { left: newLeft, width: newWidth };
        });
      }
    });
  }, [currentSection]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateIndicator]);

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

  const textPrimary = theme === 'dark' ? 'text-white/95' : 'text-stone-800';
  const textSecondary = theme === 'dark' ? 'text-white/65' : 'text-stone-600';
  const textActive = theme === 'dark' ? 'text-white' : 'text-stone-900';
  const hoverBg = theme === 'dark' ? 'hover:bg-white/[0.08]' : 'hover:bg-black/[0.04]';

  const indicatorBg = theme === 'dark'
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(0, 0, 0, 0.06)';

  const pillBg = theme === 'dark'
    ? 'rgba(0, 0, 0, 0.3)'
    : 'rgba(0, 0, 0, 0.04)';

  return (
    <>
      <style>{`
        .nav-booking-cta { transform: translate3d(0, 0, 0); will-change: transform, box-shadow; }
        .nav-booking-cta:hover { transform: translate3d(0, -1px, 0); }
        .nav-booking-cta:active { transform: translate3d(0, 0, 0) scale(0.97); }
        .nav-booking-cta:focus-visible {
          outline: none;
          box-shadow:
            inset 0 1px 0 rgba(255, 240, 200, 0.5),
            inset 0 0 0 1px rgba(255, 230, 175, 0.1),
            0 0 0 3px rgba(214, 168, 62, 0.35),
            0 0 26px rgba(230, 190, 90, 0.32),
            0 0 70px rgba(214, 168, 62, 0.20),
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

                <div className="flex items-center justify-between h-[60px] px-4 relative">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('home');
                    }}
                    className={`relative group -ml-1 px-4 py-2.5 rounded-[12px] transition-all duration-400`}
                  >
                    <div
                      className={`absolute inset-0 rounded-[12px] ${theme === 'dark' ? 'bg-white/[0.08]' : 'bg-black/[0.04]'} opacity-0 group-hover:opacity-100 transition-all duration-400`}
                    />
                    <span className={`relative text-[16px] font-[590] tracking-[0.01em] ${textPrimary} transition-all duration-400 group-hover:${textActive}`}>
                      {t.nav.logo}
                    </span>
                  </a>

                  <div className="hidden lg:flex items-center gap-1">
                    {menuStructure.map((menu) => {
                      if (!menu.hasDropdown && menu.targetId) {
                        return (
                          <a
                            key={menu.id}
                            href={getSectionUrl(menu.targetId)}
                            onClick={(e) => {
                              e.preventDefault();
                              onNavigate(menu.targetId);
                            }}
                            className={`h-9 px-4 rounded-[9px] inline-flex items-center transition-all duration-300 ${hoverBg}`}
                          >
                            <span className={`text-[13px] font-[550] tracking-[0.01em] leading-none ${textSecondary} hover:${textActive} transition-colors`}>
                              {menu.label}
                            </span>
                          </a>
                        );
                      }

                      return (
                        <div
                          key={menu.id}
                          className="relative"
                          onMouseEnter={() => handleDropdownOpen(menu.id)}
                          onMouseLeave={handleDropdownClose}
                        >
                          <button
                            ref={(el) => (dropdownButtonRefs.current[menu.id] = el)}
                            className={`h-9 px-4 rounded-[9px] transition-all duration-300 inline-flex items-center gap-1.5 ${hoverBg}`}
                          >
                            <span className={`text-[13px] font-[550] tracking-[0.01em] leading-none ${textSecondary} hover:${textActive} transition-colors`}>
                              {menu.label}
                            </span>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              className={`transition-transform duration-300 ${openDropdown === menu.id ? 'rotate-180' : ''}`}
                            >
                              <path
                                d="M3 4.5L6 7.5L9 4.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={textSecondary}
                              />
                            </svg>
                          </button>

                          {menu.items && (
                            <DropdownPortal
                              isOpen={openDropdown === menu.id}
                              buttonRef={{ current: dropdownButtonRefs.current[menu.id] }}
                              onClose={() => setOpenDropdown(null)}
                              onMouseEnter={handleDropdownEnter}
                              onMouseLeave={handleDropdownClose}
                              navBg={navBg}
                              navBorder={navBorder}
                              navShadow={navShadow}
                            >
                              {menu.items.map((item) => (
                                <a
                                  key={item.id}
                                  href={getSectionUrl(item.id)}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate(item.id);
                                    setOpenDropdown(null);
                                  }}
                                  className={`block w-full text-left px-4 py-2.5 transition-all duration-300 ${hoverBg}`}
                                >
                                  <span className={`text-[13px] font-[510] tracking-[0.01em] ${textSecondary} hover:${textActive} transition-colors`}>
                                    {item.label}
                                  </span>
                                </a>
                              ))}
                            </DropdownPortal>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="hidden lg:flex items-center gap-2.5">
                    <a
                      href="/booking"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('booking');
                      }}
                      className="nav-booking-cta relative inline-flex items-center justify-center px-5 py-2.5 rounded-[11px]"
                      style={{
                        background: theme === 'dark'
                          ? 'linear-gradient(180deg, rgba(255, 238, 195, 0.14) 0%, rgba(255, 220, 160, 0.07) 55%, rgba(255, 215, 150, 0.04) 100%)'
                          : 'linear-gradient(180deg, rgba(255, 250, 232, 0.92) 0%, rgba(255, 240, 205, 0.62) 100%)',
                        border: theme === 'dark'
                          ? '1px solid rgba(255, 222, 165, 0.28)'
                          : '1px solid rgba(214, 168, 62, 0.4)',
                        boxShadow: theme === 'dark'
                          ? `inset 0 1px 0 rgba(255, 240, 200, 0.35),
                             inset 0 0 0 1px rgba(255, 230, 175, 0.05),
                             0 0 18px rgba(230, 190, 90, 0.18),
                             0 0 48px rgba(214, 168, 62, 0.10),
                             0 4px 14px rgba(0, 0, 0, 0.3)`
                          : `inset 0 1px 0 rgba(255, 255, 255, 0.9),
                             inset 0 0 0 1px rgba(255, 230, 175, 0.4),
                             0 0 16px rgba(214, 168, 62, 0.18),
                             0 0 40px rgba(214, 168, 62, 0.08),
                             0 4px 12px rgba(0, 0, 0, 0.06)`,
                        transition: 'transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 350ms cubic-bezier(0.2, 0.8, 0.2, 1), background 350ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                        isolation: 'isolate'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = theme === 'dark'
                          ? `inset 0 1px 0 rgba(255, 240, 200, 0.5),
                             inset 0 0 0 1px rgba(255, 230, 175, 0.1),
                             0 0 26px rgba(230, 190, 90, 0.32),
                             0 0 70px rgba(214, 168, 62, 0.20),
                             0 8px 22px rgba(0, 0, 0, 0.35)`
                          : `inset 0 1px 0 rgba(255, 255, 255, 1),
                             inset 0 0 0 1px rgba(255, 220, 160, 0.55),
                             0 0 26px rgba(214, 168, 62, 0.32),
                             0 0 60px rgba(214, 168, 62, 0.16),
                             0 8px 20px rgba(0, 0, 0, 0.08)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = theme === 'dark'
                          ? `inset 0 1px 0 rgba(255, 240, 200, 0.35),
                             inset 0 0 0 1px rgba(255, 230, 175, 0.05),
                             0 0 18px rgba(230, 190, 90, 0.18),
                             0 0 48px rgba(214, 168, 62, 0.10),
                             0 4px 14px rgba(0, 0, 0, 0.3)`
                          : `inset 0 1px 0 rgba(255, 255, 255, 0.9),
                             inset 0 0 0 1px rgba(255, 230, 175, 0.4),
                             0 0 16px rgba(214, 168, 62, 0.18),
                             0 0 40px rgba(214, 168, 62, 0.08),
                             0 4px 12px rgba(0, 0, 0, 0.06)`;
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-[11px] overflow-hidden"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,250,232,0.18) 0%, rgba(255,250,232,0) 45%)'
                        }}
                      />
                      <span className={`relative text-[13px] font-[600] tracking-[0.01em] leading-none ${textActive} transition-colors duration-400`}>
                        Termin buchen
                      </span>
                    </a>

                    <button
                      onClick={toggleTheme}
                      className="relative w-[40px] h-[40px] -mr-0.5 flex items-center justify-center rounded-full transition-all duration-300 ease-out active:scale-95"
                      style={{
                        background: theme === 'dark'
                          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)'
                          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.05) 100%)',
                        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
                        boxShadow: theme === 'dark'
                          ? 'inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 2px 8px rgba(0, 0, 0, 0.2)'
                          : 'inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 2px 6px rgba(0, 0, 0, 0.08)'
                      }}
                      aria-label={theme === 'dark' ? t.nav.theme.light : t.nav.theme.dark}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme === 'dark'
                          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.14) 100%)'
                          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.07) 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = theme === 'dark'
                          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)'
                          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.05) 100%)';
                      }}
                    >
                      <span className="relative w-[16px] h-[16px] block">
                        <Sun
                          size={16}
                          strokeWidth={1.75}
                          className={`absolute inset-0 ${textActive} transition-all duration-300 ease-out`}
                          style={{
                            opacity: theme === 'light' ? 1 : 0,
                            transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.6)'
                          }}
                        />
                        <Moon
                          size={16}
                          strokeWidth={1.75}
                          className={`absolute inset-0 ${textActive} transition-all duration-300 ease-out`}
                          style={{
                            opacity: theme === 'dark' ? 1 : 0,
                            transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.6)'
                          }}
                        />
                      </span>
                    </button>
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
              {menuStructure.map((menu, idx) => {
                if (!menu.hasDropdown && menu.targetId) {
                  return (
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
                      <span className={`text-[13px] font-[550] tracking-[0.01em] ${textSecondary}`}>
                        {menu.label}
                      </span>
                    </a>
                  );
                }

                return (
                  <div key={menu.id} className="mb-1">
                    <div className="px-4 py-2 mb-1">
                      <span className={`text-[11px] font-[600] uppercase tracking-[0.1em] ${textSecondary} opacity-60`}>
                        {menu.label}
                      </span>
                    </div>
                    {menu.items && menu.items.map((item) => (
                      <a
                        key={item.id}
                        href={getSectionUrl(item.id)}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block relative w-full text-left px-6 py-2 rounded-[10px] mb-0.5 transition-all duration-300"
                        style={{
                          background: 'transparent'
                        }}
                      >
                        <span className={`text-[13px] font-[500] tracking-[0.01em] ${textSecondary}`}>
                          {item.label}
                        </span>
                      </a>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className={`h-[0.5px] ${theme === 'dark' ? 'bg-white/[0.15]' : 'bg-black/[0.1]'} mx-4 my-2`} />

            <div className="p-4 pt-2 pb-4 space-y-2">
              <a
                href="/booking"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('booking');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full h-[44px] rounded-[11px] text-[14px] font-[600] tracking-[0.01em] transition-all duration-300 active:scale-[0.97] flex items-center justify-center"
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.05) 100%)',
                  color: theme === 'dark' ? 'white' : '#1c1917',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: theme === 'dark'
                    ? `inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 2px 8px rgba(0, 0, 0, 0.2)`
                    : `inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 2px 6px rgba(0, 0, 0, 0.08)`
                }}
              >
                <span>Termin buchen</span>
              </a>

              <button
                onClick={toggleTheme}
                className="relative w-full h-[44px] rounded-[11px] transition-all duration-300 ease-out active:scale-[0.97] flex items-center justify-between px-4"
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.05) 100%)',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: theme === 'dark'
                    ? 'inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 2px 8px rgba(0, 0, 0, 0.2)'
                    : 'inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 2px 6px rgba(0, 0, 0, 0.08)'
                }}
                aria-label={theme === 'dark' ? t.nav.theme.light : t.nav.theme.dark}
              >
                <span
                  className={`text-[13px] font-[550] tracking-[0.01em] ${textSecondary}`}
                >
                  {theme === 'dark' ? t.nav.theme.lightMode : t.nav.theme.darkMode}
                </span>

                <span className="relative w-[16px] h-[16px] block">
                  <Sun
                    size={16}
                    strokeWidth={1.75}
                    className={`absolute inset-0 ${textActive} transition-all duration-300 ease-out`}
                    style={{
                      opacity: theme === 'light' ? 1 : 0,
                      transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.6)'
                    }}
                  />
                  <Moon
                    size={16}
                    strokeWidth={1.75}
                    className={`absolute inset-0 ${textActive} transition-all duration-300 ease-out`}
                    style={{
                      opacity: theme === 'dark' ? 1 : 0,
                      transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.6)'
                    }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
