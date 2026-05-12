import { useState, useEffect } from 'react';
import { Shield, Cookie, Settings, X, Check, ChevronDown, ChevronUp, BarChart3, Target, Lock, Zap, Info, ExternalLink } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
}

interface CookieCategory {
  id: keyof Omit<CookiePreferences, 'timestamp' | 'version'>;
  name: string;
  icon: any;
  description: string;
  examples: string[];
  required: boolean;
  defaultEnabled: boolean;
}

const COOKIE_VERSION = '1.0.0';
const PREFERENCES_KEY = 'anatoly_mook_cookie_preferences';
const BANNER_DISMISSED_KEY = 'anatoly_mook_banner_dismissed';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
    version: COOKIE_VERSION,
  });

  const categories: CookieCategory[] = [
    {
      id: 'essential',
      name: 'Technisch notwendig',
      icon: Lock,
      description: 'Diese Cookies sind für den Betrieb der Website unerlässlich. Sie ermöglichen grundlegende Funktionen wie Seitennavigation, Zugriff auf sichere Bereiche und Buchungsfunktionen. Die Website kann ohne diese Cookies nicht ordnungsgemäß funktionieren.',
      examples: [
        'Session-Cookies für sichere Verbindungen',
        'Buchungssystem-Cookies',
        'Sicherheits- und Authentifizierungs-Cookies',
        'Load-Balancing und Performance-Cookies',
      ],
      required: true,
      defaultEnabled: true,
    },
    {
      id: 'functional',
      name: 'Funktional',
      icon: Settings,
      description: 'Diese Cookies ermöglichen erweiterte Funktionalität und Personalisierung, wie z.B. das Speichern Ihrer Präferenzen und Spracheinstellungen. Sie verbessern Ihr Nutzererlebnis, sind aber nicht zwingend erforderlich.',
      examples: [
        'Spracheinstellungen',
        'Formular-Autofill-Daten',
        'Bevorzugte Darstellungsoptionen',
        'Zuletzt angesehene Inhalte',
      ],
      required: false,
      defaultEnabled: false,
    },
    {
      id: 'analytics',
      name: 'Analyse & Performance',
      icon: BarChart3,
      description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren. Wir verwenden Google Analytics 4, um anonymisierte Statistiken über Seitenaufrufe, Verweildauer und Nutzerverhalten zu sammeln. Diese Informationen helfen uns, die Website kontinuierlich zu verbessern.',
      examples: [
        'Google Analytics 4 (_ga, _gid, _ga_*)',
        'Seitenaufrufe und Besuchsdauer',
        'Geografische Herkunft (anonymisiert)',
        'Gerät- und Browser-Informationen',
        'Nutzerinteraktionen und Scrolltiefe',
      ],
      required: false,
      defaultEnabled: false,
    },
    {
      id: 'marketing',
      name: 'Marketing & Werbung',
      icon: Target,
      description: 'Diese Cookies werden verwendet, um Ihnen relevante Werbung anzuzeigen. Wir nutzen Google Ads, Remarketing und Conversion-Tracking, um die Wirksamkeit unserer Kampagnen zu messen und Ihnen auf anderen Websites personalisierte Anzeigen zu präsentieren.',
      examples: [
        'Google Ads Conversion-Tracking',
        'Google Remarketing Tags',
        'Werbe-IDs und Cookie-IDs',
        'Personalisierte Anzeigen',
        'Cross-Site-Tracking für Remarketing',
      ],
      required: false,
      defaultEnabled: false,
    },
  ];

  useEffect(() => {
    const savedPreferences = localStorage.getItem(PREFERENCES_KEY);
    const bannerDismissed = localStorage.getItem(BANNER_DISMISSED_KEY);

    if (savedPreferences) {
      const parsed: CookiePreferences = JSON.parse(savedPreferences);

      if (parsed.version !== COOKIE_VERSION) {
        setShowBanner(true);
      } else {
        setPreferences(parsed);
        applyPreferences(parsed);
      }
    } else if (!bannerDismissed) {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const applyPreferences = (prefs: CookiePreferences) => {
    if (prefs.analytics) {
      console.log('Analytics cookies enabled');
    }

    if (prefs.marketing) {
      console.log('Marketing cookies enabled');
    }

    if (prefs.functional) {
      console.log('Functional cookies enabled');
    }
  };

  const savePreferences = (prefs: CookiePreferences) => {
    const prefsToSave = {
      ...prefs,
      timestamp: Date.now(),
      version: COOKIE_VERSION,
    };

    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefsToSave));
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
    setPreferences(prefsToSave);
    applyPreferences(prefsToSave);
    setShowBanner(false);
    setShowDetails(false);
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
      version: COOKIE_VERSION,
    });
  };

  const rejectAll = () => {
    savePreferences({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
      version: COOKIE_VERSION,
    });
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  const toggleCategory = (categoryId: keyof Omit<CookiePreferences, 'timestamp' | 'version'>) => {
    if (categoryId === 'essential') return;

    setPreferences(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  if (!showBanner && !showSettings) {
    return (
      <button
        onClick={openSettings}
        className="fixed bottom-6 left-6 z-[9998] group"
        aria-label="Cookie-Einstellungen öffnen"
      >
        <div className="relative w-11 h-11 rounded-full overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:scale-105 shadow-lg">
          <Cookie
            className="absolute inset-0 m-auto w-5 h-5 text-white/90 transition-all duration-300"
            strokeWidth={2}
          />
        </div>
      </button>
    );
  }

  return (
    <>
      {/* iOS-style backdrop */}
      <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md animate-in fade-in duration-300" />

      <div className="fixed inset-x-0 bottom-0 z-[10000] px-4 pb-4 sm:px-6 sm:pb-6 animate-in slide-in-from-bottom duration-500" style={{ animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="max-w-[680px] mx-auto">
          {/* iOS glassmorphism card */}
          <div className="relative backdrop-blur-3xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            {/* Subtle top highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {!showDetails ? (
                <div className="p-6 sm:p-7">
                  <div className="flex items-start gap-4 mb-5">
                    {/* Compact iOS-style icon */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-lg">
                      <Cookie className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h2 className="text-white text-[19px] font-[600] tracking-[-0.02em] mb-1.5 leading-tight">
                        Ihre Privatsphäre ist wichtig
                      </h2>
                      <p className="text-white/60 text-[13px] font-[450] leading-relaxed">
                        Wir respektieren Ihre Privatsphäre und halten uns an die DSGVO und das TTDSG
                      </p>
                    </div>
                  </div>

                  <p className="text-white/60 text-[13px] font-[450] leading-relaxed mb-5">
                    Wir verwenden Cookies um die Funktionalität zu gewährleisten, Ihre Erfahrung zu personalisieren
                    und unsere Dienste zu verbessern.
                  </p>

                  {/* Compact iOS badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/15 rounded-full backdrop-blur-xl">
                      <Lock className="w-3 h-3 text-white/80" strokeWidth={2} />
                      <span className="text-white/80 text-[11px] font-[500]">DSGVO</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/15 rounded-full backdrop-blur-xl">
                      <Shield className="w-3 h-3 text-white/80" strokeWidth={2} />
                      <span className="text-white/80 text-[11px] font-[500]">TTDSG 2025</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/15 rounded-full backdrop-blur-xl">
                      <Zap className="w-3 h-3 text-white/80" strokeWidth={2} />
                      <span className="text-white/80 text-[11px] font-[500]">Widerrufbar</span>
                    </div>
                  </div>

                  {/* iOS-style buttons */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={acceptAll}
                      className="flex-1 min-w-[140px] px-5 py-3 bg-white hover:bg-white/95 rounded-2xl font-[600] text-[14px] text-black transition-all duration-300 active:scale-[0.97] shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" strokeWidth={2.5} />
                        Alle akzeptieren
                      </span>
                    </button>

                    <button
                      onClick={rejectAll}
                      className="px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-2xl font-[500] text-[14px] text-white transition-all duration-300 active:scale-[0.97]"
                    >
                      Ablehnen
                    </button>

                    <button
                      onClick={() => setShowDetails(true)}
                      className="px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-2xl font-[500] text-[14px] text-white transition-all duration-300 active:scale-[0.97]"
                    >
                      <Settings className="w-4 h-4 inline-block" strokeWidth={2} />
                    </button>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/50 text-[11px] font-[450] leading-relaxed">
                      Weitere Informationen in unserer{' '}
                      <a
                        href="#datenschutz"
                        className="text-white/80 hover:text-white underline underline-offset-2 transition-colors"
                      >
                        Datenschutzerklärung
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="max-h-[80vh] overflow-y-auto">
                  <div className="sticky top-0 z-10 backdrop-blur-3xl bg-white/10 border-b border-white/10 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center">
                          <Settings className="w-5 h-5 text-white" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-white text-[17px] font-[600] tracking-[-0.01em]">
                            Cookie-Einstellungen
                          </h3>
                          <p className="text-white/50 text-[12px] font-[450]">
                            Wählen Sie Ihre Präferenzen
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowDetails(false)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                        aria-label="Zurück"
                      >
                        <X className="w-5 h-5 text-white/70" strokeWidth={2} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      const isExpanded = expandedCategory === category.id;
                      const isEnabled = preferences[category.id];

                      return (
                        <div
                          key={category.id}
                          className={`rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                            isEnabled
                              ? 'bg-white/15 border-white/25'
                              : 'bg-white/5 border-white/15 hover:bg-white/8'
                          }`}
                        >
                          <div className="p-5">
                            <div className="flex items-start gap-4">
                              {/* Compact iOS icon */}
                              <div className={`flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                                isEnabled
                                  ? 'bg-white/20 border-white/30'
                                  : 'bg-white/10 border-white/15'
                              }`}>
                                <IconComponent
                                  className={isEnabled ? 'text-white' : 'text-white/70'}
                                  size={20}
                                  strokeWidth={2}
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4 mb-2">
                                  <h4 className="text-white text-[15px] font-[600] tracking-[-0.01em]">
                                    {category.name}
                                  </h4>

                                  {category.required ? (
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 border border-white/20 rounded-lg">
                                      <Lock className="w-3 h-3 text-white/80" strokeWidth={2} />
                                      <span className="text-white/80 text-[11px] font-[600]">
                                        Erforderlich
                                      </span>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => toggleCategory(category.id)}
                                      className="relative"
                                      aria-label={`${category.name} ${isEnabled ? 'deaktivieren' : 'aktivieren'}`}
                                    >
                                      <div className={`w-12 h-7 rounded-full transition-all duration-300 ${
                                        isEnabled
                                          ? 'bg-white'
                                          : 'bg-white/20'
                                      }`}>
                                        <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                                          isEnabled ? 'left-5 bg-white' : 'left-0.5 bg-white/90'
                                        }`} />
                                      </div>
                                    </button>
                                  )}
                                </div>

                                <p className="text-white/60 text-[13px] font-[450] leading-relaxed mb-3">
                                  {category.description}
                                </p>

                                <button
                                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                                  className="flex items-center gap-1.5 text-white/70 hover:text-white text-[12px] font-[500] transition-colors"
                                >
                                  <Info className="w-3.5 h-3.5" strokeWidth={2} />
                                  <span>Details</span>
                                  {isExpanded ? (
                                    <ChevronUp className="w-3.5 h-3.5" strokeWidth={2} />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
                                  )}
                                </button>

                                {isExpanded && (
                                  <div className="mt-4 pt-4 border-t border-white/10 animate-in slide-in-from-top duration-300">
                                    <h5 className="text-white/70 text-[12px] font-[600] mb-2.5">
                                      Verwendete Cookies:
                                    </h5>
                                    <ul className="space-y-2">
                                      {category.examples.map((example, idx) => (
                                        <li
                                          key={idx}
                                          className="flex items-start gap-2 text-white/50 text-[11px] font-[450] leading-relaxed"
                                        >
                                          <span className="flex-shrink-0 w-1 h-1 rounded-full bg-white/40 mt-1.5" />
                                          <span className="flex-1">{example}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="sticky bottom-0 backdrop-blur-3xl bg-white/10 border-t border-white/10 px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={saveCustomPreferences}
                        className="flex-1 min-w-[160px] px-5 py-3 bg-white hover:bg-white/95 rounded-2xl font-[600] text-[14px] text-black transition-all duration-300 active:scale-[0.97] shadow-lg"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Check className="w-4 h-4" strokeWidth={2.5} />
                          Bestätigen
                        </span>
                      </button>

                      <button
                        onClick={acceptAll}
                        className="px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-2xl font-[500] text-[14px] text-white transition-all duration-300 active:scale-[0.97]"
                      >
                        Alle
                      </button>

                      <button
                        onClick={rejectAll}
                        className="px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-2xl font-[500] text-[14px] text-white transition-all duration-300 active:scale-[0.97]"
                      >
                        Keine
                      </button>
                    </div>

                    <div className="mt-3 text-center">
                      <a
                        href="#datenschutz"
                        className="text-white/50 hover:text-white/70 text-[11px] font-[450] underline underline-offset-2 transition-colors"
                      >
                        Datenschutzerklärung
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </>
  );
}
