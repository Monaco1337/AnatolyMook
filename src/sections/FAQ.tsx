import { useState } from 'react';
import { ChevronDown, Sparkles, MessageCircle, Users, ShoppingCart, BookOpen, Mail, Calendar, CreditCard, Shield, HelpCircle, Search, Zap, ArrowRight, Briefcase, Home, Clock, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MAIN_FAQ_HUB_ITEMS } from '../seo/mainFaqHubData';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: typeof Sparkles;
  color: string;
  gradient: string;
}

export default function FAQ() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories: FAQCategory[] = [
    { id: 'all', label: 'Alle Themen', icon: HelpCircle, color: 'text-amber-400', gradient: 'from-amber-500 to-orange-500' },
    { id: 'eignung', label: 'Eignung & Einstieg', icon: Users, color: 'text-orange-400', gradient: 'from-orange-500 to-amber-500' },
    { id: 'business', label: 'Business & Führung', icon: Briefcase, color: 'text-yellow-400', gradient: 'from-yellow-500 to-orange-500' },
    { id: 'seminare', label: 'Seminare & Events', icon: Calendar, color: 'text-amber-400', gradient: 'from-amber-500 to-yellow-500' },
    { id: 'organisation', label: 'Organisation', icon: Clock, color: 'text-orange-400', gradient: 'from-orange-500 to-red-500' },
    { id: 'storno', label: 'Storno & Umbuchung', icon: FileText, color: 'text-yellow-400', gradient: 'from-yellow-500 to-amber-500' },
    { id: 'corporate', label: 'Corporate & Inhouse', icon: Briefcase, color: 'text-amber-400', gradient: 'from-amber-500 to-orange-500' },
    { id: 'kurse', label: 'Online-Kurse', icon: BookOpen, color: 'text-orange-400', gradient: 'from-orange-500 to-amber-500' }
  ];

  const faqItems: FAQItem[] = MAIN_FAQ_HUB_ITEMS;

  const filteredFAQs = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-black to-orange-900/10" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.06) 0%, transparent 50%)',
            animation: 'pulse 8s ease-in-out infinite'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,146,60,0.1),transparent_70%)]" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10 relative group"
              style={{
                background: 'rgba(251, 146, 60, 0.05)',
                border: '1px solid rgba(251, 146, 60, 0.2)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(251, 146, 60, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 animate-pulse" />
              <HelpCircle className="w-5 h-5 text-amber-400 relative z-10" strokeWidth={2.5} />
              <span className="text-sm font-semibold text-amber-400 tracking-wide relative z-10">FAQ</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
              <span
                className="block text-white"
                style={{
                  textShadow: '0 0 80px rgba(251, 146, 60, 0.3)'
                }}
              >
                Häufig gestellte Fragen
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 mb-14 leading-relaxed max-w-3xl mx-auto font-light">
              Hier findest du Antworten auf alle wichtigen Fragen rund um Seminare, Coaching und unsere Angebote.
            </p>

            {/* Premium Search Bar */}
            <div className="max-w-2xl mx-auto mb-16">
              <div
                className={`relative group transition-all duration-500 ${
                  isSearchFocused ? 'scale-105' : 'scale-100'
                }`}
              >
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"
                  style={{
                    animation: isSearchFocused ? 'pulse 2s ease-in-out infinite' : 'none'
                  }}
                />
                <div
                  className="relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: isSearchFocused
                      ? '1px solid rgba(251, 146, 60, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    boxShadow: isSearchFocused
                      ? '0 20px 60px rgba(251, 146, 60, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Search
                    className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                      isSearchFocused ? 'text-amber-400' : 'text-gray-400'
                    }`}
                    strokeWidth={2.5}
                  />
                  <input
                    type="text"
                    placeholder="Durchsuche alle Fragen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full pl-14 pr-6 py-5 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg font-light"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ChevronDown className="w-5 h-5 rotate-45" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group relative overflow-hidden"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${idx * 0.05}s both`
                }}
              >
                <div
                  className={`relative px-6 py-3.5 rounded-2xl font-semibold transition-all duration-500 ${
                    isActive ? 'scale-105' : 'scale-100 hover:scale-105'
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`
                      : 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: isActive
                      ? '1px solid rgba(251, 146, 60, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: isActive
                      ? '0 8px 32px rgba(251, 146, 60, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      : '0 4px 16px rgba(0, 0, 0, 0.1)',
                    ...isActive && {
                      '--tw-gradient-from': category.gradient.includes('amber') ? '#f59e0b' : '#fb923c',
                      '--tw-gradient-to': category.gradient.includes('red') ? '#dc2626' : '#f97316'
                    } as any
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute inset-0 opacity-50"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                        animation: 'shimmer 2s infinite'
                      }}
                    />
                  )}
                  <div className="flex items-center gap-2.5 relative z-10">
                    <Icon
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? 'text-white' : category.color
                      }`}
                      strokeWidth={2.5}
                    />
                    <span className={isActive ? 'text-white' : 'text-gray-300'}>
                      {category.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {filteredFAQs.length === 0 ? (
          <div
            className="text-center py-24"
            style={{ animation: 'fadeIn 0.5s ease-out' }}
          >
            <div
              className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center relative"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Search className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">Keine Ergebnisse gefunden</h3>
            <p className="text-lg text-gray-400">Versuche es mit anderen Suchbegriffen oder wähle eine andere Kategorie.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => {
              const isExpanded = expandedId === `${item.category}-${index}`;
              const categoryInfo = categories.find(c => c.id === item.category);

              return (
                <div
                  key={`${item.category}-${index}`}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
                  }}
                >
                  <div
                    className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${
                      isExpanded ? 'scale-[1.02]' : 'scale-100'
                    }`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(20px)',
                      border: isExpanded
                        ? '1px solid rgba(251, 146, 60, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      boxShadow: isExpanded
                        ? '0 20px 60px rgba(251, 146, 60, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        : '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
                    }}
                  >
                    {isExpanded && (
                      <div
                        className="absolute inset-0 opacity-5"
                        style={{
                          background: `linear-gradient(135deg, ${categoryInfo?.gradient.includes('amber') ? '#f59e0b' : '#fb923c'}, ${categoryInfo?.gradient.includes('red') ? '#dc2626' : '#f97316'})`,
                          pointerEvents: 'none'
                        }}
                      />
                    )}

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : `${item.category}-${index}`)}
                      className="w-full px-7 py-6 text-left flex items-start gap-5 group/button"
                    >
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${categoryInfo?.gradient} flex items-center justify-center transition-all duration-500 ${
                          isExpanded ? 'scale-110 rotate-3' : 'scale-100 rotate-0 group-hover/button:scale-105'
                        }`}
                        style={{
                          boxShadow: isExpanded
                            ? '0 8px 24px rgba(251, 146, 60, 0.4)'
                            : '0 4px 16px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {categoryInfo && <categoryInfo.icon className="w-6 h-6 text-white" strokeWidth={2.5} />}
                      </div>

                      <div className="flex-1 min-w-0 pt-0.5">
                        <h3 className="text-xl font-bold text-white mb-0 pr-12 leading-tight group-hover/button:text-amber-400 transition-colors duration-300">
                          {item.question}
                        </h3>
                      </div>

                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isExpanded ? 'rotate-180 bg-amber-500/20' : 'rotate-0 bg-white/5 group-hover/button:bg-white/10'
                        }`}
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isExpanded ? 'text-amber-400' : 'text-gray-400 group-hover/button:text-white'
                          }`}
                          strokeWidth={2.5}
                        />
                      </div>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: isExpanded ? '1000px' : '0px',
                        opacity: isExpanded ? 1 : 0
                      }}
                    >
                      <div className="px-7 pb-7 pl-24">
                        <div
                          className="pt-5 border-t"
                          style={{
                            borderColor: 'rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <p className="text-gray-300 leading-relaxed text-lg font-light">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pb-32">
        <div
          className="relative overflow-hidden rounded-[32px] group"
          style={{
            background: 'rgba(251, 146, 60, 0.03)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(251, 146, 60, 0.2)',
            boxShadow: '0 20px 80px rgba(251, 146, 60, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)',
              animation: 'pulse 4s ease-in-out infinite'
            }}
          />

          <div className="relative px-8 py-16 sm:px-12 sm:py-20 text-center">
            <div
              className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"
              style={{
                boxShadow: '0 12px 40px rgba(251, 146, 60, 0.4)',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              <Zap className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Noch Fragen?
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Wir sind für dich da und beantworten gerne alle deine Fragen persönlich.
            </p>

            <a
              href="#kontakt"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg group/cta relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #fb923c)',
                boxShadow: '0 12px 40px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(251, 146, 60, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shimmer 2s infinite'
                }}
              />
              <Mail className="w-6 h-6 text-white relative z-10" strokeWidth={2.5} />
              <span className="text-white relative z-10">Jetzt Kontakt aufnehmen</span>
              <ArrowRight className="w-5 h-5 text-white relative z-10 group-hover/cta:translate-x-1 transition-transform" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
