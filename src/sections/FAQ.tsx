import { useState } from 'react';
import {
  ChevronDown,
  Users,
  Calendar,
  BookOpen,
  Mail,
  HelpCircle,
  Search,
  ChevronsRight,
  Briefcase,
  Clock,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MAIN_FAQ_HUB_ITEMS } from '../seo/mainFaqHubData';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: typeof HelpCircle;
}

const FONT_HEAD = "'Montserrat', system-ui, -apple-system, sans-serif";
const FONT_BODY =
  "'Avenir Next', 'Avenir', 'Nunito Sans', 'Inter', system-ui, -apple-system, sans-serif";
const BRONZE = 'rgba(201, 155, 98, 0.95)';
const BRONZE_MUTED = 'rgba(214, 168, 94, 0.72)';
const BRONZE_LINE = 'rgba(214, 168, 94, 0.18)';
const BRONZE_SOFT = 'rgba(214, 168, 94, 0.1)';

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories: FAQCategory[] = [
    { id: 'all', label: 'Alle Themen', icon: HelpCircle },
    { id: 'eignung', label: 'Eignung & Einstieg', icon: Users },
    { id: 'business', label: 'Business & Führung', icon: Briefcase },
    { id: 'seminare', label: 'Seminare & Events', icon: Calendar },
    { id: 'organisation', label: 'Organisation', icon: Clock },
    { id: 'storno', label: 'Storno & Umbuchung', icon: FileText },
    { id: 'corporate', label: 'Corporate & Inhouse', icon: Briefcase },
    { id: 'kurse', label: 'Online-Kurse', icon: BookOpen },
  ];

  const faqItems: FAQItem[] = MAIN_FAQ_HUB_ITEMS;

  const filteredFAQs = faqItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: '#050505', fontFamily: FONT_BODY }}
    >
      {/* Ruhiger Hintergrund */}
      <div className="pointer-events-none fixed inset-0">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/manifest/footer-stone-granite-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            opacity: 0.35,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 22%, rgba(214,168,94,0.05) 0%, transparent 52%), radial-gradient(120% 85% at 50% 100%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 100%)',
          }}
        />
      </div>

      <div className="relative">
        {/* Hero — kompakt */}
        <div className="relative mx-auto max-w-3xl px-5 pt-[5.25rem] pb-7 sm:pt-28 sm:pb-9 md:px-8 lg:max-w-[42rem]">
          <header className="text-center fade-in-up">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
              style={{
                borderColor: BRONZE_LINE,
                background: 'rgba(12,11,10,0.55)',
              }}
            >
              <HelpCircle className="h-4 w-4" strokeWidth={1.65} style={{ color: BRONZE }} aria-hidden />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.26em]"
                style={{ color: BRONZE_MUTED }}
              >
                FAQ
              </span>
            </div>

            <h1
              className="mb-4 text-[1.625rem] font-light leading-snug tracking-[-0.02em] sm:text-[2rem] md:text-[2.125rem]"
              style={{
                fontFamily: FONT_HEAD,
                color: 'rgba(248,243,232,0.96)',
                textShadow: '0 1px 0 rgba(20,12,6,0.45)',
              }}
            >
              Häufig gestellte Fragen
            </h1>

            <p className="mx-auto mb-7 max-w-[32rem] text-[14px] font-light leading-[1.6] sm:text-[15px]" style={{ color: 'rgba(244,239,230,0.58)' }}>
              Hier findest du Antworten auf alle wichtigen Fragen rund um Seminare, Coaching und unsere Angebote.
            </p>

            <div className="relative mx-auto max-w-xl">
              <div
                className="relative rounded-[13px] border transition-[border-color,box-shadow] duration-200 ease-out"
                style={{
                  borderColor: isSearchFocused ? 'rgba(214,168,94,0.35)' : BRONZE_LINE,
                  background: 'rgba(10,9,8,0.72)',
                  boxShadow: isSearchFocused ? '0 0 22px rgba(214,168,94,0.06)' : 'none',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 opacity-[0.72]"
                  size={17}
                  strokeWidth={1.6}
                  style={{ color: BRONZE }}
                  aria-hidden
                />
                <input
                  type="search"
                  enterKeyHint="search"
                  placeholder="Durchsuche alle Fragen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full rounded-[13px] border-0 bg-transparent py-2.5 pl-11 pr-10 text-[14px] font-light outline-none placeholder:text-[rgba(238,230,216,0.35)] focus:ring-0"
                  style={{ color: 'rgba(248,243,232,0.92)' }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Suche löschen"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[rgba(238,230,216,0.45)] transition-colors hover:text-[rgba(248,243,232,0.75)]"
                  >
                    <ChevronDown className="h-4 w-4 rotate-45" strokeWidth={1.75} />
                  </button>
                )}
              </div>
            </div>
          </header>
        </div>

        {/* Kategorien — kompakter */}
        <div className="relative mx-auto max-w-5xl px-5 pb-5 pt-2 md:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
            {categories.map((category, idx) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className="fade-in-up"
                  style={{
                    animationDelay: `${Math.min(idx, 12) * 0.022}s`,
                  }}
                >
                  <span
                    className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-left text-[11px] font-medium uppercase tracking-[0.13em] transition-colors duration-200 md:px-4 md:text-[11.5px]"
                    style={{
                      borderColor: isActive ? 'rgba(214,168,94,0.42)' : BRONZE_LINE,
                      background: isActive
                        ? 'linear-gradient(180deg, rgba(214,168,94,0.22) 0%, rgba(100,72,42,0.18) 100%)'
                        : 'rgba(10,9,8,0.45)',
                      color: isActive ? 'rgba(248,243,232,0.95)' : 'rgba(238,230,216,0.62)',
                      boxShadow: isActive ? 'inset 0 1px 0 rgba(255,245,228,0.06)' : 'none',
                    }}
                  >
                    <Icon size={14} strokeWidth={1.7} style={{ color: isActive ? BRONZE : 'rgba(201,155,98,0.55)' }} aria-hidden />
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Liste */}
        <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-3 md:px-8 lg:max-w-[46rem]">
          {filteredFAQs.length === 0 ? (
            <div className="fade-in py-14 text-center">
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border"
                style={{ borderColor: BRONZE_LINE, background: 'rgba(10,9,8,0.5)' }}
              >
                <Search className="h-7 w-7 text-[rgba(238,230,216,0.35)]" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="mb-2 text-[1.2rem] font-light" style={{ fontFamily: FONT_HEAD }}>
                Keine Ergebnisse
              </h3>
              <p className="text-[14px] font-light leading-relaxed" style={{ color: 'rgba(238,230,216,0.5)' }}>
                Andere Suchbegriffe oder Kategorie wählen.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {filteredFAQs.map((item, index) => {
                const id = `${item.category}-${index}`;
                const isExpanded = expandedId === id;
                const categoryInfo = categories.find((c) => c.id === item.category);

                return (
                  <div
                    key={id}
                    className="fade-in-up rounded-[14px] border transition-[border-color,background] duration-200 ease-out"
                    style={{
                      animationDelay: `${Math.min(index, 24) * 0.025}s`,
                      borderColor: isExpanded ? 'rgba(214,168,94,0.28)' : BRONZE_LINE,
                      background: isExpanded ? 'rgba(18,16,14,0.65)' : 'rgba(12,11,10,0.42)',
                      boxShadow: isExpanded ? '0 14px 40px rgba(0,0,0,0.28)' : 'none',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => setExpandedId(isExpanded ? null : id)}
                      className="flex w-full items-start gap-3 px-4 py-3.5 text-left sm:gap-3.5 sm:px-[1.125rem] sm:py-[0.95rem]"
                    >
                      <div
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border"
                        style={{
                          borderColor: BRONZE_LINE,
                          background: BRONZE_SOFT,
                        }}
                        aria-hidden
                      >
                        {categoryInfo ? (
                          <categoryInfo.icon className="h-4 w-4" strokeWidth={1.65} style={{ color: BRONZE }} />
                        ) : (
                          <HelpCircle className="h-4 w-4" strokeWidth={1.65} style={{ color: BRONZE }} />
                        )}
                      </div>

                      <span
                        className="min-w-0 flex-1 text-[14.5px] font-normal leading-snug sm:text-[15px]"
                        style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.94)' }}
                      >
                        {item.question}
                      </span>

                      <span
                        className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200 ease-out"
                        style={{
                          borderColor: BRONZE_LINE,
                          background: 'rgba(0,0,0,0.2)',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      >
                        <ChevronDown
                          size={17}
                          strokeWidth={1.75}
                          className="opacity-65"
                          style={{ color: BRONZE }}
                          aria-hidden
                        />
                      </span>
                    </button>

                    <div
                      className="grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"
                      style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
                    >
                      <div className="min-h-0">
                        <div
                          className="border-t px-4 pb-4 pt-[0.7rem]"
                          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                        >
                          <p
                            className="faq-answer pl-[calc(2.25rem+0.75rem)] text-[13.75px] font-light leading-[1.65] sm:pl-[calc(2.25rem+0.75rem)] sm:text-[14.25px]"
                            style={{
                              fontFamily: FONT_BODY,
                              color: 'rgba(244,239,230,0.68)',
                            }}
                          >
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CTA — schlanker */}
        <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-2 md:px-8">
          <div
            className="rounded-[18px] border px-6 py-8 text-center sm:px-8 sm:py-9"
            style={{
              borderColor: BRONZE_LINE,
              background: 'linear-gradient(180deg, rgba(18,16,14,0.55) 0%, rgba(8,7,6,0.72) 100%)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Mail className="mx-auto mb-4 h-5 w-5" strokeWidth={1.6} style={{ color: BRONZE }} aria-hidden />
            <h2 className="mb-2 text-[1.35rem] font-light sm:text-[1.45rem]" style={{ fontFamily: FONT_HEAD }}>
              Noch Fragen?
            </h2>
            <p className="mx-auto mb-6 max-w-md text-[13.5px] font-light leading-[1.6]" style={{ color: 'rgba(238,230,216,0.55)' }}>
              Wir sind für dich da und beantworten gerne alle deine Fragen persönlich.
            </p>

            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 rounded-[12px] border px-5 py-3 text-[11.5px] font-semibold uppercase tracking-[0.18em] transition-[background,border-color] duration-200"
              style={{
                borderColor: 'rgba(214,168,94,0.35)',
                color: 'rgba(12,8,6,0.9)',
                background:
                  'linear-gradient(180deg, rgba(214,168,94,0.92) 0%, rgba(150,104,56,0.88) 100%)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,228,196,0.2)',
              }}
            >
              <Mail size={14} strokeWidth={2} aria-hidden />
              Jetzt Kontakt aufnehmen
              <ChevronsRight size={14} strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .faq-answer { white-space: pre-wrap; word-break: break-word; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in { animation: fadeIn 0.35s ease-out both; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.38s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .fade-in-up, .fade-in { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
