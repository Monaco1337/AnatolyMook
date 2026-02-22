import { useState, useEffect, useMemo } from 'react';
import { Users, Clock, MapPin, Briefcase, TrendingUp, Sparkles, CheckCircle2, ArrowRight, Star, Target, Zap, Building2, Lightbulb, Award, ChevronDown, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface CorporateOffer {
  id: string;
  category: 'workshop' | 'training-series' | 'team-retreat' | 'leadership' | 'transformation';
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  participants: string;
  format: string;
  availability: string;
  price: string;
  description: string;
  essence: string;
  includes: string[];
  benefits: { title: string; description: string }[];
  ideal_for: string[];
  program_outline: string[];
  gradient: string;
  image: string;
  highlight?: boolean;
  is_active: boolean;
  order_index: number;
}

export default function Corporate() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);
  const [offers, setOffers] = useState<CorporateOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();

    const offersChannel = supabase
      .channel('corporate-offers-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'corporate_offers' }, () => {
        loadOffers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(offersChannel);
    };
  }, []);

  const loadOffers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('corporate_offers')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (data) {
      setOffers(data);
    }
    setLoading(false);
  };

  const categories = useMemo(() => [
    { id: 'all', label: t.corporate.categories.all, icon: Sparkles },
    { id: 'workshop', label: t.corporate.categories.workshops, icon: Lightbulb },
    { id: 'training-series', label: t.corporate.categories.trainingSeries, icon: Target },
    { id: 'team-retreat', label: t.corporate.categories.teamRetreats, icon: Building2 },
    { id: 'leadership', label: t.corporate.categories.leadership, icon: Award },
    { id: 'transformation', label: t.corporate.categories.transformation, icon: TrendingUp }
  ], [t]);

  const features = useMemo(() => [
    {
      icon: Briefcase,
      title: t.corporate.features.tailored.title,
      description: t.corporate.features.tailored.description
    },
    {
      icon: Users,
      title: t.corporate.features.teamFocus.title,
      description: t.corporate.features.teamFocus.description
    },
    {
      icon: TrendingUp,
      title: t.corporate.features.measurable.title,
      description: t.corporate.features.measurable.description
    }
  ], [t]);

  const filteredOffers = selectedCategory === 'all'
    ? offers
    : offers.filter(offer => offer.category === selectedCategory);

  const categoryColors: Record<string, { from: string; to: string }> = {
    workshop: { from: '#f59e0b', to: '#f97316' },
    'training-series': { from: '#10b981', to: '#14b8a6' },
    'team-retreat': { from: '#8b5cf6', to: '#a78bfa' },
    leadership: { from: '#06b6d4', to: '#0ea5e9' },
    transformation: { from: '#f97316', to: '#fb923c' }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/10 to-teal-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.15),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Briefcase size={16} className="text-cyan-400" strokeWidth={2} />
              <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                {t.corporate.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">
                {t.corporate.heroTitle}
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                {t.corporate.heroSubtitle}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t.corporate.heroDescription}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                      <Icon size={24} className="text-cyan-400" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-105'
                      : 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50 border border-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} strokeWidth={2.5} />
                    <span>{category.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">{t.corporate.loading}</p>
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-6">
              <Briefcase className="w-10 h-10 text-cyan-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-300">{t.corporate.noOffersFound}</h3>
            <p className="text-gray-500">
              {t.corporate.noOffersDescription}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
            {filteredOffers.map((offer) => {
              const isExpanded = expandedOffer === offer.id;
              const colors = categoryColors[offer.category];

              return (
                <div
                  key={offer.id}
                  className="relative group"
                >
                  {/* Outer glow */}
                  <div
                    className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${colors.from}30, ${colors.to}30)`
                    }}
                  />

                  {/* Card */}
                  <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl overflow-hidden">
                    {/* Image Header */}
                    <div
                      className="relative h-48 sm:h-56 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${offer.image})`
                      }}
                    >
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <div
                          className="px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                            color: 'white'
                          }}
                        >
                          {categories.find(c => c.id === offer.category)?.label}
                        </div>
                      </div>

                      {/* Highlight Badge */}
                      {offer.highlight && (
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">
                              {t.corporate.popular}
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
                          {offer.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {offer.subtitle}
                        </p>
                      </div>

                      {/* Tagline Quote */}
                      <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-l-4 border-cyan-500">
                        <p className="text-gray-300 italic text-sm">
                          "{offer.tagline}"
                        </p>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Clock size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <div>
                            <div className="text-xs text-gray-500 mb-1">{t.corporate.duration}</div>
                            <div className="text-sm font-semibold text-white">{offer.duration}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Users size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <div>
                            <div className="text-xs text-gray-500 mb-1">{t.corporate.participants}</div>
                            <div className="text-sm font-semibold text-white">{offer.participants}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <div>
                            <div className="text-xs text-gray-500 mb-1">{t.corporate.format}</div>
                            <div className="text-sm font-semibold text-white">{offer.format}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Zap size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <div>
                            <div className="text-xs text-gray-500 mb-1">{t.seminare.availability}</div>
                            <div className="text-sm font-semibold text-white">{offer.availability}</div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {offer.description}
                      </p>

                      {/* Essence Quote */}
                      <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20">
                        <p className="text-cyan-300 italic text-sm text-center">
                          {offer.essence}
                        </p>
                      </div>

                      {/* Expandable Details */}
                      <div className="space-y-4">
                        <button
                          onClick={() => setExpandedOffer(isExpanded ? null : offer.id)}
                          className="w-full px-6 py-3 bg-gray-800/50 hover:bg-gray-800 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors border border-gray-700"
                        >
                          <span>{t.corporate.learnMore}</span>
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
                            {offer.includes.length > 0 && (
                              <div>
                                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                  <Check size={18} className="text-green-400" strokeWidth={2.5} />
                                  <span>{t.corporate.includedTitle}</span>
                                </h4>
                                <div className="space-y-2">
                                  {offer.includes.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 text-sm text-gray-300">
                                      <CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Benefits */}
                            {offer.benefits.length > 0 && (
                              <div>
                                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                  <Star size={18} className="text-cyan-400" strokeWidth={2.5} />
                                  <span>{t.corporate.benefitsTitle}</span>
                                </h4>
                                <div className="space-y-3">
                                  {offer.benefits.map((benefit, index) => (
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

                            {/* Ideal For */}
                            {offer.ideal_for.length > 0 && (
                              <div>
                                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                  <Target size={18} className="text-cyan-400" strokeWidth={2.5} />
                                  <span>{t.corporate.idealForTitle}</span>
                                </h4>
                                <div className="space-y-2">
                                  {offer.ideal_for.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 text-sm text-gray-300">
                                      <ArrowRight size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Program Outline */}
                            {offer.program_outline.length > 0 && (
                              <div>
                                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                  <Award size={18} className="text-cyan-400" strokeWidth={2.5} />
                                  <span>{t.corporate.programOutline}</span>
                                </h4>
                                <div className="space-y-2">
                                  {offer.program_outline.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 text-sm text-gray-300">
                                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-cyan-400">{index + 1}</span>
                                      </div>
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
                            <div className="text-xs text-gray-500 mb-1">{t.corporate.price}</div>
                            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                              {offer.price}
                            </div>
                          </div>
                        </div>

                        <a
                          href="#contact"
                          className="block w-full py-4 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                            color: 'white'
                          }}
                        >
                          {t.corporate.requestOffer}
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
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-teal-500/20 rounded-3xl blur-3xl" />
          <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t.corporate.ctaTitle}
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              {t.corporate.ctaDescription}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:scale-105"
            >
              <span>{t.corporate.ctaButton}</span>
              <ArrowRight size={20} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
