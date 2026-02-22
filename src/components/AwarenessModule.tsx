import { useState } from 'react';
import { Plus, Minus, Brain, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AwarenessModule() {
  const { t } = useLanguage();
  const [mainOpen, setMainOpen] = useState(false);
  const [leftCardOpen, setLeftCardOpen] = useState(false);
  const [rightCardOpen, setRightCardOpen] = useState(false);
  const [paradigmaVisible, setParadigmaVisible] = useState(false);
  const [paradigmaOpen, setParadigmaOpen] = useState(false);
  const [openParadigmaItems, setOpenParadigmaItems] = useState<Set<number>>(new Set());

  const handleMainClick = () => {
    setMainOpen(true);
    setTimeout(() => setParadigmaVisible(true), 1200);
  };

  const toggleParadigmaItem = (index: number) => {
    const newSet = new Set(openParadigmaItems);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setOpenParadigmaItems(newSet);
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-black overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse-slower" />
      </div>

      <div className="relative max-w-[1800px] mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">

        {/* STATE 0 - CLOSED */}
        {!mainOpen && (
          <div className="text-center space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-12 py-8 sm:py-10 md:py-12 lg:py-16">
            {/* Section Header */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
              <div className="h-[1px] w-6 sm:w-8 md:w-10 lg:w-12 bg-gradient-to-r from-transparent via-yellow-400/50 to-yellow-400/80" />
              <div className="w-1 h-1 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
              <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-black tracking-[0.25em] sm:tracking-[0.3em] bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
                {t.awarenessModule.badge}
              </span>
              <div className="w-1 h-1 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
              <div className="h-[1px] w-6 sm:w-8 md:w-10 lg:w-12 bg-gradient-to-l from-transparent via-yellow-400/50 to-yellow-400/80" />
            </div>

            <h2
              className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.03em' }}
            >
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                {t.awarenessModule.heading}
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 font-light tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
              {t.awarenessModule.subheading}
            </p>

            <button
              onClick={handleMainClick}
              className="group inline-flex flex-col items-center gap-3 sm:gap-3.5 md:gap-4 transition-all duration-700 hover:scale-105"
            >
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-xl border border-yellow-400/30 flex items-center justify-center transition-all duration-700 group-hover:border-yellow-400/60 group-hover:shadow-[0_0_60px_rgba(250,204,21,0.4)]">
                  <Plus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-yellow-400 group-hover:text-yellow-300 transition-all duration-700 group-hover:rotate-90" strokeWidth={2} />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm text-yellow-400/60 group-hover:text-yellow-400 tracking-[0.25em] sm:tracking-[0.3em] uppercase font-medium transition-colors duration-700" style={{ fontFamily: "'Inter', sans-serif" }}>
                {t.awarenessModule.openButton}
              </span>
            </button>
          </div>
        )}

        {/* STATE 1 - MAIN OPENED */}
        {mainOpen && (
          <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 xl:space-y-20 animate-fade-in">

            {/* Title */}
            <div className="text-center mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12">
              <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-xl bg-yellow-400/10 border border-yellow-400/30 mb-4 sm:mb-5 md:mb-6">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400" strokeWidth={2.5} />
                <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold text-yellow-400 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {t.awarenessModule.transformationBadge}
                </span>
              </div>
              <h3
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-[1.1]"
                style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.03em' }}
              >
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                  {t.awarenessModule.transformationTitle1}
                </span>
                <span className="block mt-1 sm:mt-1.5 md:mt-2">{t.awarenessModule.transformationTitle2}</span>
              </h3>
            </div>

            {/* Cards Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 max-w-7xl mx-auto">

              {/* LEFT CARD - Unbewusst */}
              <div
                className={`relative rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden transition-all duration-1000 ${
                  leftCardOpen ? 'lg:scale-[1.02]' : ''
                }`}
              >
                {/* Multi-Layer Glass Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02]" />
                <div className="absolute inset-0 backdrop-blur-3xl backdrop-saturate-150" />

                {/* Red/Dark Gradient for Unconscious */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-red-600/10 to-gray-900/30" />

                {/* Premium Border System */}
                <div className="absolute inset-0 rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] border border-white/[0.15]" />
                <div className="absolute inset-0 rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] ring-1 ring-inset ring-white/[0.08]" />

                {/* Ultra Luxury Shadow */}
                <div className="absolute inset-0 rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] shadow-[0_20px_80px_-15px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)]" />

                {/* Background Image - Stress, Chaos, Dunkelheit */}
                <div className="absolute inset-0 opacity-25">
                  <img
                    src="https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt={t.awarenessModule.unconscious.imageAlt}
                    className="w-full h-full object-cover scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-gray-900/30" />
                </div>

                <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                  {/* Icon Badge */}
                  <div className="inline-flex w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl backdrop-blur-2xl bg-red-500/20 border border-red-400/30 items-center justify-center shadow-[0_4px_16px_-4px_rgba(239,68,68,0.4)]">
                    <Brain className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-red-400" strokeWidth={1.5} />
                  </div>

                  <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight" style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
                    {t.awarenessModule.unconscious.title.split(' ').map((word, i, arr) => (
                      <span key={i}>{word}{i < arr.length - 1 && <br />}</span>
                    ))}
                  </h4>

                  <div className="h-0.5 w-10 sm:w-12 md:w-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full" />

                  {!leftCardOpen && (
                    <div className="space-y-2 sm:space-y-2.5 md:space-y-3 text-white/70 text-base sm:text-lg md:text-xl lg:text-2xl font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {t.awarenessModule.unconscious.preview.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {leftCardOpen && (
                    <div className="space-y-2 sm:space-y-2.5 animate-fade-in">
                      {t.awarenessModule.unconscious.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 sm:gap-2.5 md:gap-3 group">
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 sm:mt-1 text-red-400/60 group-hover:text-red-400 transition-colors flex-shrink-0" strokeWidth={2} />
                          <p className="text-xs sm:text-sm md:text-base text-white/70 group-hover:text-white/90 font-light leading-relaxed transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setLeftCardOpen(!leftCardOpen)}
                    className="group/btn relative w-full rounded-lg sm:rounded-xl backdrop-blur-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.12] hover:border-red-400/40 p-2.5 sm:p-3 md:p-3.5 lg:p-4 transition-all duration-500 active:scale-95 mt-4 sm:mt-5 md:mt-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white/80 group-hover/btn:text-white uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {leftCardOpen ? t.awarenessModule.lessDetails : t.awarenessModule.moreDetails}
                      </span>
                      <div className={`w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center transition-transform duration-500 ${leftCardOpen ? 'rotate-45' : 'rotate-0'}`}>
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Glass Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.1] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* RIGHT CARD - Bewusst */}
              <div
                className={`relative rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden transition-all duration-1000 ${
                  rightCardOpen ? 'lg:scale-[1.02]' : ''
                }`}
              >
                {/* Multi-Layer Glass Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03]" />
                <div className="absolute inset-0 backdrop-blur-3xl backdrop-saturate-150" />

                {/* Yellow/Orange Gradient for Conscious */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-500/15 to-yellow-600/10" />

                {/* Premium Border System */}
                <div className="absolute inset-0 rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] border border-yellow-400/[0.3]" />
                <div className="absolute inset-0 rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] ring-1 ring-inset ring-yellow-400/[0.15]" />

                {/* Ultra Luxury Shadow with Glow */}
                <div className="absolute inset-0 rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] lg:rounded-[2rem] shadow-[0_20px_80px_-15px_rgba(250,204,21,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]" />

                {/* Background Image - Meditation, Ruhe, Klarheit */}
                <div className="absolute inset-0 opacity-30">
                  <img
                    src="https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt={t.awarenessModule.conscious.imageAlt}
                    className="w-full h-full object-cover scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/75" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/15 via-orange-500/10 to-yellow-600/5" />
                </div>

                <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                  {/* Icon Badge */}
                  <div className="inline-flex w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl backdrop-blur-2xl bg-yellow-400/20 border border-yellow-400/40 items-center justify-center shadow-[0_4px_16px_-4px_rgba(250,204,21,0.6)]">
                    <Heart className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-400" strokeWidth={1.5} />
                  </div>

                  <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight" style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
                    {t.awarenessModule.conscious.title.split(' ').map((word, i, arr) => (
                      <span key={i}>{word}{i < arr.length - 1 && <br />}</span>
                    ))}
                  </h4>

                  <div className="h-0.5 w-10 sm:w-12 md:w-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />

                  {!rightCardOpen && (
                    <div className="space-y-2 sm:space-y-2.5 md:space-y-3 text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {t.awarenessModule.conscious.preview.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {rightCardOpen && (
                    <div className="space-y-2 sm:space-y-2.5 animate-fade-in">
                      {t.awarenessModule.conscious.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 sm:gap-2.5 md:gap-3 group">
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 sm:mt-1 text-yellow-400/70 group-hover:text-yellow-400 transition-colors flex-shrink-0" strokeWidth={2} />
                          <p className="text-xs sm:text-sm md:text-base text-white/80 group-hover:text-white font-light leading-relaxed transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setRightCardOpen(!rightCardOpen)}
                    className="group/btn relative w-full rounded-lg sm:rounded-xl backdrop-blur-xl bg-white/[0.05] hover:bg-white/[0.08] border border-yellow-400/[0.2] hover:border-yellow-400/50 p-2.5 sm:p-3 md:p-3.5 lg:p-4 transition-all duration-500 active:scale-95 mt-4 sm:mt-5 md:mt-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white/80 group-hover/btn:text-white uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {rightCardOpen ? t.awarenessModule.lessDetails : t.awarenessModule.moreDetails}
                      </span>
                      <div className={`w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center transition-transform duration-500 ${rightCardOpen ? 'rotate-45' : 'rotate-0'}`}>
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" strokeWidth={3} />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Glass Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.15] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </div>

            {/* STATE 3 - PARADIGMA TRIGGER */}
            {paradigmaVisible && (
              <div className="text-center space-y-6 pt-8 sm:pt-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl bg-white/[0.05] border border-white/[0.1]">
                  <div className="w-1 h-1 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-xs sm:text-sm text-white/60 tracking-[0.2em] uppercase font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {t.awarenessModule.paradigmaLabel}
                  </span>
                </div>

                <button
                  onClick={() => setParadigmaOpen(!paradigmaOpen)}
                  className="group inline-flex flex-col items-center gap-4 transition-all duration-700 hover:scale-105"
                >
                  <div className="relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-xl border border-yellow-400/30 flex items-center justify-center transition-all duration-700 group-hover:border-yellow-400/60 group-hover:shadow-[0_0_50px_rgba(250,204,21,0.3)]">
                      {paradigmaOpen ? (
                        <Minus className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 transition-all duration-700" strokeWidth={2} />
                      ) : (
                        <Plus className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 group-hover:text-yellow-300 transition-all duration-700 group-hover:rotate-90" strokeWidth={2} />
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700" />
                  </div>
                </button>
              </div>
            )}

            {/* STATE 4 - PARADIGMA CONTENT */}
            {paradigmaOpen && (
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 animate-fade-in pt-6">
                {t.awarenessModule.paradigmaItems.map((item, idx) => {
                  const isOpen = openParadigmaItems.has(idx);
                  return (
                    <div
                      key={idx}
                      className={`relative rounded-2xl overflow-hidden backdrop-blur-2xl transition-all duration-700 ${
                        isOpen
                          ? 'bg-white/[0.08] border-yellow-400/30 shadow-[0_8px_32px_-8px_rgba(250,204,21,0.3)]'
                          : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]'
                      } border`}
                    >
                      <button
                        onClick={() => toggleParadigmaItem(idx)}
                        className="w-full p-6 sm:p-7 md:p-8 flex items-center justify-between gap-4 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                            isOpen
                              ? 'bg-gradient-to-br from-yellow-400/30 to-orange-500/30 border border-yellow-400/40'
                              : 'bg-white/[0.05] border border-white/[0.1]'
                          }`}>
                            <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-500 ${
                              isOpen ? 'text-yellow-400' : 'text-white/40'
                            }`} strokeWidth={2} />
                          </div>
                          <h5 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-500 ${
                            isOpen ? 'text-white' : 'text-white/80'
                          }`} style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif" }}>
                            {item.title}
                          </h5>
                        </div>
                        <div className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isOpen
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 rotate-45'
                            : 'bg-white/[0.05] border border-white/[0.1]'
                        }`}>
                          <Plus className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors duration-500 ${
                            isOpen ? 'text-black' : 'text-white/60'
                          }`} strokeWidth={2.5} />
                        </div>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-700 ${
                          isOpen
                            ? 'max-h-40 opacity-100'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 sm:px-7 md:px-8 pb-6 sm:pb-7 md:pb-8 pt-0">
                          <div className="pl-12 sm:pl-14 border-l-2 border-yellow-400/30">
                            <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.6' }}>
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* FINAL MESSAGE */}
            {paradigmaOpen && (
              <div className="text-center pt-16 sm:pt-20 md:pt-24 animate-fade-in">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-10 blur-3xl" />
                  <p className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto px-6" style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", letterSpacing: '-0.01em' }}>
                    <span className="text-yellow-400">{t.awarenessModule.finalMessage1}</span> {t.awarenessModule.finalMessage2}
                    <br />
                    <span className="text-white/90">{t.awarenessModule.finalMessage3}</span> <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold">{t.awarenessModule.finalMessage4}</span><span className="text-white/90">{t.awarenessModule.finalMessage5}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.08);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
