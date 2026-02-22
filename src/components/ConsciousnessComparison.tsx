import { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, Calendar, Plus, X, Heart, Zap, Target, Diamond, Stars, Activity } from 'lucide-react';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { useLanguage } from '../contexts/LanguageContext';

interface LifeArea {
  id: string;
  title: string;
  icon: any;
  gradient: string;
  bgGradient: string;
  accentColor: string;
  points: string[];
  image: string;
}

export default function ConsciousnessComparison() {
  const { text } = useThemeStyles();
  const { t } = useLanguage();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const lifeAreas: LifeArea[] = useMemo(() => [
    {
      id: 'health',
      title: t.consciousness.healthVitality.title,
      icon: Activity,
      gradient: t.consciousness.healthVitality.gradient,
      bgGradient: 'from-green-500/10 via-emerald-500/5 to-transparent',
      accentColor: 'green',
      points: t.consciousness.healthVitality.points,
      image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      id: 'relationship',
      title: t.consciousness.relationshipLove.title,
      icon: Heart,
      gradient: t.consciousness.relationshipLove.gradient,
      bgGradient: 'from-pink-500/10 via-rose-500/5 to-transparent',
      accentColor: 'pink',
      points: t.consciousness.relationshipLove.points,
      image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      id: 'vocation',
      title: t.consciousness.vocationCalling.title,
      icon: Target,
      gradient: t.consciousness.vocationCalling.gradient,
      bgGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      accentColor: 'blue',
      points: t.consciousness.vocationCalling.points,
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      id: 'money',
      title: t.consciousness.moneySuccess.title,
      icon: Diamond,
      gradient: t.consciousness.moneySuccess.gradient,
      bgGradient: 'from-yellow-500/10 via-amber-500/5 to-transparent',
      accentColor: 'yellow',
      points: t.consciousness.moneySuccess.points,
      image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    {
      id: 'fulfillment',
      title: t.consciousness.fulfillmentBliss.title,
      icon: Stars,
      gradient: t.consciousness.fulfillmentBliss.gradient,
      bgGradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
      accentColor: 'purple',
      points: t.consciousness.fulfillmentBliss.points,
      image: 'https://images.pexels.com/photos/3771118/pexels-photo-3771118.jpeg?auto=compress&cs=tinysrgb&w=1920'
    }
  ], [t]);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="w-full py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border border-yellow-400/30 backdrop-blur-xl mb-8 shadow-[0_8px_32px_rgba(251,191,36,0.15)]">
            <Sparkles className="w-5 h-5 text-yellow-400" strokeWidth={2.5} />
            <span className="text-yellow-400 font-semibold text-sm sm:text-base tracking-wide uppercase">
              {t.consciousness.badge}
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold ${text.primary} mb-6 sm:mb-8 tracking-tight leading-[1.1]`}
            style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}
          >
            {t.consciousness.heading}
          </h2>

          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl ${text.secondary} max-w-5xl mx-auto leading-relaxed`}>
            {t.consciousness.subheading}
          </p>
        </div>

        {/* Life Areas - Expandable Cards */}
        <div className="space-y-6 sm:space-y-8 mb-16 sm:mb-20 md:mb-24">
          {lifeAreas.map((area, index) => {
            const isExpanded = expandedCard === area.id;
            const Icon = area.icon;

            return (
              <div
                key={area.id}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Glow Effect on Hover */}
                <div className={`absolute -inset-4 bg-gradient-to-br ${area.gradient} rounded-3xl blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />

                {/* Card Container */}
                <div className={`relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] border rounded-3xl overflow-hidden transition-all duration-700 ${
                  isExpanded
                    ? `border-${area.accentColor}-400/40 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)]`
                    : 'border-white/10 hover:border-white/20 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)]'
                }`}>

                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.bgGradient} opacity-50`} />

                  {/* Clickable Header */}
                  <button
                    onClick={() => toggleCard(area.id)}
                    className="relative w-full text-left p-6 sm:p-8 md:p-10 transition-all duration-500 group/btn"
                  >
                    <div className="flex items-center justify-between gap-6">
                      {/* Left: Icon + Title */}
                      <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                        {/* Icon Container */}
                        <div className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${area.gradient} flex items-center justify-center shadow-2xl transition-all duration-500 ${
                          isExpanded ? 'scale-110' : 'group-hover/btn:scale-105'
                        }`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl sm:rounded-3xl" />
                          <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white relative z-10" strokeWidth={2} />
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${text.primary} leading-tight mb-2`}>
                            {area.title}
                          </h3>
                          {!isExpanded && (
                            <p className={`text-sm sm:text-base ${text.tertiary} line-clamp-1`}>
                              {area.points[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Expand/Collapse Button */}
                      <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-500 ${
                        isExpanded
                          ? `bg-gradient-to-br ${area.gradient} border-transparent rotate-180 scale-110`
                          : 'group-hover/btn:bg-white/15 group-hover/btn:scale-105'
                      }`}>
                        {isExpanded ? (
                          <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                        ) : (
                          <Plus className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <div className={`relative overflow-hidden transition-all duration-700 ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 md:pb-10">

                      {/* Image with Overlay */}
                      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-10 group/img">
                        <div className="aspect-[21/9] relative">
                          <img
                            src={area.image}
                            alt={area.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                            loading="lazy"
                          />
                          {/* Gradient Overlays */}
                          <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70`} />
                          <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} mix-blend-overlay opacity-30`} />

                          {/* Icon Badge on Image */}
                          <div className="absolute bottom-6 left-6">
                            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${area.gradient} flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20`}>
                              <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Points with Arrow Symbol */}
                      <div className="space-y-6 sm:space-y-8">
                        {area.points.map((point, idx) => (
                          <div
                            key={idx}
                            className="group/point relative"
                            style={{
                              animation: isExpanded ? `fadeInLeft 0.5s ease-out ${idx * 0.15}s both` : 'none'
                            }}
                          >
                            <div className="flex gap-4 sm:gap-6">
                              {/* Arrow Symbol */}
                              <div className="flex-shrink-0 mt-1">
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${area.gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover/point:scale-110`}>
                                  <span className="text-white text-xl sm:text-2xl font-bold leading-none">⯌</span>
                                </div>
                              </div>

                              {/* Point Text */}
                              <div className="flex-1">
                                <p className={`text-base sm:text-lg md:text-xl ${text.secondary} leading-relaxed group-hover/point:text-white/95 transition-colors duration-300`}>
                                  {point}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-amber-500/10 to-yellow-400/10 rounded-[32px] blur-3xl" />
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/5 via-amber-500/5 to-yellow-500/5 rounded-[40px] blur-[60px]" />

          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] border border-yellow-400/30 rounded-[32px] p-8 sm:p-10 md:p-12 lg:p-16 shadow-[0_20px_80px_-20px_rgba(251,191,36,0.3)]">

            {/* CTA Header */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h3
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${text.primary} mb-4 tracking-tight leading-tight`}
                style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}
              >
                {t.consciousness.cta.heading}
              </h3>
            </div>

            {/* CTA Buttons */}
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">

              {/* Button 1: Formate entdecken */}
              <button
                onClick={() => {
                  const coachingSection = document.querySelector('[data-section-id="coaching"]');
                  coachingSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group/cta relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Background Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.1),transparent_50%)]" />

                <div className="relative border border-white/20 group-hover/cta:border-yellow-400/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500">

                  {/* Icon + Arrow */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover/cta:scale-110`}>
                      <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-black" strokeWidth={2.5} />
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center group-hover/cta:bg-white/20 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white transform group-hover/cta:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Text */}
                  <h4 className={`text-xl sm:text-2xl md:text-3xl font-bold ${text.primary} mb-3 text-left`}>
                    {t.consciousness.cta.button1.text}
                  </h4>
                  <p className={`text-sm sm:text-base ${text.tertiary} text-left leading-relaxed`}>
                    {t.consciousness.cta.button1.subtitle}
                  </p>
                </div>
              </button>

              {/* Button 2: Termin buchen (Primary) */}
              <button
                onClick={() => {
                  const bookingSection = document.querySelector('[data-section-id="booking"]');
                  bookingSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group/cta relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_60px_-15px_rgba(251,191,36,0.5)]"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-amber-400 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_50%)]" />

                <div className="relative p-6 sm:p-8 md:p-10">

                  {/* Icon + Arrow */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-black/20 backdrop-blur-xl flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover/cta:scale-110 border border-black/10`}>
                      <Calendar className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-black" strokeWidth={2.5} />
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center group-hover/cta:bg-black/30 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-black transform group-hover/cta:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Text */}
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 text-left">
                    {t.consciousness.cta.button2.text}
                  </h4>
                  <p className="text-sm sm:text-base text-black/70 text-left leading-relaxed font-medium">
                    {t.consciousness.cta.button2.subtitle}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
