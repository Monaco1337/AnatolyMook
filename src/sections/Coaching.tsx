import { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, Video, MapPin, Award, Users, Sparkles, CheckCircle2, ArrowRight, Star, Target, Zap, Heart, Brain, Shield, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface CoachingPackage {
  id: string;
  tier: 'einzelsession' | 'intensiv' | 'vip' | 'executive';
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  price: string;
  sessions: string;
  format: string;
  availability: string;
  description: string;
  essence: string;
  includes: string[];
  benefits: { title: string; description: string }[];
  perfect_for: string[];
  gradient: string;
  image: string;
  highlight?: boolean;
  is_active: boolean;
  order_index: number;
}

export default function Coaching() {
  const { t } = useLanguage();
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const [packages, setPackages] = useState<CoachingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    loadPackages();

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const packagesChannel = supabase
      .channel('coaching-packages-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'coaching_packages' }, () => {
        loadPackages();
      })
      .subscribe();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      supabase.removeChannel(packagesChannel);
    };
  }, []);

  const loadPackages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('coaching_packages')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (data) {
      setPackages(data);
    }
    setLoading(false);
  };

  const tiers = useMemo(() => [
    { id: 'all', label: t.coaching.tiers.all, icon: Sparkles },
    { id: 'einzelsession', label: t.coaching.tiers.einzelsession, icon: Target },
    { id: 'intensiv', label: t.coaching.tiers.intensiv, icon: Zap },
    { id: 'vip', label: t.coaching.tiers.vip, icon: Star },
    { id: 'executive', label: t.coaching.tiers.executive, icon: Award }
  ], [t]);

  const features = useMemo(() => [
    {
      icon: Heart,
      title: t.coaching.features.personalCare.title,
      description: t.coaching.features.personalCare.description
    },
    {
      icon: Brain,
      title: t.coaching.features.transformation.title,
      description: t.coaching.features.transformation.description
    },
    {
      icon: Shield,
      title: t.coaching.features.flexibility.title,
      description: t.coaching.features.flexibility.description
    }
  ], [t]);

  const filteredPackages = selectedTier === 'all'
    ? packages
    : packages.filter(pkg => pkg.tier === selectedTier);

  const tierColors: Record<string, { from: string; to: string; text: string }> = {
    einzelsession: { from: '#fef08a', to: '#fde047', text: 'text-yellow-300' },
    intensiv: { from: '#facc15', to: '#eab308', text: 'text-yellow-400' },
    vip: { from: '#eab308', to: '#ca8a04', text: 'text-yellow-500' },
    executive: { from: '#fbbf24', to: '#f59e0b', text: 'text-yellow-400' }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Ultra Cinematic */}
      <div className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Animated Background Layers */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-yellow-800/10 to-amber-900/20"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            willChange: 'transform'
          }}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(250,204,21,0.15),transparent_50%)]"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            willChange: 'transform'
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 w-full">
          <div className="text-center mb-16 sm:mb-20">
            {/* Badge with animation */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-8 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', opacity: 0 }}>
              <Sparkles size={16} className="text-yellow-400" strokeWidth={2.5} />
              <span className="text-sm font-bold text-yellow-400 uppercase tracking-widest">
                {t.coaching.title}
              </span>
            </div>

            {/* Epic Title */}
            <h1 className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards', opacity: 0 }}>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] mb-3">
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  {t.coaching.heroTitle}
                </span>
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] text-white">
                {t.coaching.heroTitleSecondLine}
              </span>
            </h1>

            {/* Subtitle with premium spacing */}
            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards', opacity: 0 }}>
              {t.coaching.heroSubtitle}
            </p>
          </div>

          {/* Features - Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards', opacity: 0 }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  {/* Outer glow on hover */}
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />

                  {/* Card */}
                  <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-yellow-400/30 group-hover:scale-[1.02]">
                    {/* Icon container */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon size={26} className="text-yellow-400" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                    <p className="text-base text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tier Filter - Premium Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards', opacity: 0 }}>
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const isActive = selectedTier === tier.id;

              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`relative px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-2xl shadow-yellow-400/40 scale-105'
                      : 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/70 hover:scale-105 border border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={18} strokeWidth={2.5} />
                    <span className="tracking-wide">{tier.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">{t.coaching.loadingPackages}</p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 mb-6">
              <Star className="w-10 h-10 text-yellow-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-300">{t.coaching.noPackagesFound}</h3>
            <p className="text-gray-500">
              {t.coaching.noPackagesDescription}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
            {filteredPackages.map((pkg) => {
              const isExpanded = expandedPackage === pkg.id;
              const colors = tierColors[pkg.tier];

              return (
                <div
                  key={pkg.id}
                  className="relative group"
                >
                  {/* Outer glow - Enhanced */}
                  <div
                    className="absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700"
                    style={{
                      background: `linear-gradient(135deg, ${colors.from}40, ${colors.to}40)`
                    }}
                  />

                  {/* Card - Premium styling */}
                  <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-yellow-400/20 group-hover:scale-[1.01]">
                    {/* Image Header */}
                    <div
                      className="relative h-48 sm:h-56 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${pkg.image})`
                      }}
                    >
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                      {/* Tier Badge - Ultra Premium */}
                      <div className="absolute top-6 left-6">
                        <div
                          className="px-5 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-2xl backdrop-blur-sm border transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                            color: 'black',
                            borderColor: 'rgba(0,0,0,0.2)'
                          }}
                        >
                          {tiers.find(t => t.id === pkg.tier)?.label}
                        </div>
                      </div>

                      {/* Highlight Badge - Shimmering */}
                      {pkg.highlight && (
                        <div className="absolute top-6 right-6">
                          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 shadow-2xl animate-pulse">
                            <span className="text-black text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                              <Star size={14} className="fill-current" strokeWidth={0} />
                              {t.coaching.popular}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                      {/* Title Section */}
                      <div className="mb-6">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                          {pkg.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {pkg.subtitle}
                        </p>
                      </div>

                      {/* Tagline Quote */}
                      <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-l-4 border-yellow-400">
                        <p className="text-gray-300 italic text-sm">
                          "{pkg.tagline}"
                        </p>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Clock size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <div>
                            <div className="text-xs text-gray-500 mb-1">{t.coaching.duration}</div>
                            <div className="text-sm font-semibold text-white">{pkg.duration}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Users size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <div>
                            <div className="text-xs text-gray-500 mb-1">{t.coaching.sessions}</div>
                            <div className="text-sm font-semibold text-white">{pkg.sessions}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Video size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <div>
                            <div className="text-xs text-gray-500 mb-1">{t.coaching.format}</div>
                            <div className="text-sm font-semibold text-white">{pkg.format}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Calendar size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <div>
                            <div className="text-xs text-gray-500 mb-1">{t.coaching.start}</div>
                            <div className="text-sm font-semibold text-white">{pkg.availability}</div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {pkg.description}
                      </p>

                      {/* Essence Quote */}
                      <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border border-yellow-400/20">
                        <p className="text-yellow-300 italic text-sm text-center">
                          {pkg.essence}
                        </p>
                      </div>

                      {/* Expandable Details */}
                      <div className="space-y-4">
                        <button
                          onClick={() => setExpandedPackage(isExpanded ? null : pkg.id)}
                          className="w-full px-6 py-3 bg-gray-800/50 hover:bg-gray-800 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors border border-gray-700"
                        >
                          <span>{t.coaching.learnMore}</span>
                          <ChevronDown
                            size={18}
                            strokeWidth={2.5}
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="space-y-6 animate-in fade-in duration-300">
                            {/* Includes */}
                            {pkg.includes.length > 0 && (
                              <div>
                                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                  <Check size={18} className="text-green-400" strokeWidth={2.5} />
                                  <span>{t.coaching.included}</span>
                                </h4>
                                <div className="space-y-2">
                                  {pkg.includes.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 text-sm text-gray-300">
                                      <CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Benefits */}
                            {pkg.benefits.length > 0 && (
                              <div>
                                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                  <Star size={18} className="text-yellow-400" strokeWidth={2.5} />
                                  <span>{t.coaching.yourBenefits}</span>
                                </h4>
                                <div className="space-y-3">
                                  {pkg.benefits.map((benefit, index) => (
                                    <div key={index} className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                                      <div className="font-semibold text-white mb-1 text-sm">
                                        {benefit.title}
                                      </div>
                                      <div className="text-xs text-gray-400">
                                        {benefit.description}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Perfect For */}
                            {pkg.perfect_for.length > 0 && (
                              <div>
                                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                  <Target size={18} className="text-yellow-400" strokeWidth={2.5} />
                                  <span>{t.coaching.perfectForYou}</span>
                                </h4>
                                <div className="space-y-2">
                                  {pkg.perfect_for.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 text-sm text-gray-300">
                                      <ArrowRight size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Price & CTA */}
                      <div className="mt-6 pt-6 border-t border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">{t.coaching.price}</div>
                            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                              {pkg.price}
                            </div>
                          </div>
                        </div>

                        <a
                          href="#booking"
                          className="group/btn block w-full py-4 rounded-2xl font-bold text-center transition-all duration-500 shadow-2xl hover:shadow-3xl hover:scale-105 relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                            color: 'black'
                          }}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {t.coaching.bookNow}
                            <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={3} />
                          </span>
                        </a>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-amber-500/20 rounded-3xl blur-3xl" />
          <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t.coaching.ctaTitle}
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              {t.coaching.ctaSubtitle}
            </p>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-xl font-bold text-lg transition-all shadow-lg shadow-yellow-400/30 hover:shadow-xl hover:scale-105"
            >
              <span>{t.coaching.ctaButton}</span>
              <ArrowRight size={20} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Premium CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
