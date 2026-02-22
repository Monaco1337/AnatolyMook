import { useState, useEffect, useMemo } from 'react';
import { ArrowRight, ChevronDown, Sparkles, Award, Users, Star, TrendingUp, Check, Target, Brain, Heart, Shield, Play, Calendar, Zap, Book, Plus, X } from 'lucide-react';
import PremiumSlider from '../components/PremiumSlider';
import ConsciousnessComparison from '../components/ConsciousnessComparison';
import AwarenessModule from '../components/AwarenessModule';
import TransformationSlider from '../components/TransformationSlider';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [expandedPanels, setExpandedPanels] = useState<Record<number, boolean>>({});

  const togglePanel = (idx: number) => {
    setExpandedPanels(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const keynoteSlides = useMemo(() => [
    {
      id: 'business-mastery',
      type: 'video' as const,
      src: 'https://cdn.coverr.co/videos/coverr-business-meeting-in-a-modern-office-6654/1080p.mp4',
      poster: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'BUSINESS MASTERY',
      subtitle: 'Von der Vision zur unaufhaltsamen Umsetzung',
      category: 'KEYNOTE'
    },
    {
      id: 'leadership',
      type: 'video' as const,
      src: 'https://cdn.coverr.co/videos/coverr-a-group-of-people-sitting-around-a-table-6718/1080p.mp4',
      poster: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'LEADERSHIP',
      subtitle: 'Führen durch Präsenz und authentische Autorität',
      category: 'KEYNOTE'
    }
  ], []);

  return (
    <div className="bg-black">
      {/* 1️⃣ HERO — Der erste Eindruck */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black" data-section>
        <div className="relative w-full max-w-[1600px] mx-auto h-screen px-3 sm:px-5 md:px-8 lg:px-16 pt-24 sm:pt-20 md:pt-24 pb-4 sm:pb-6 md:pb-8">
          <div className="relative w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/anatoly_mook.png"
              alt="Anatoly Mook – Bewusstseinscoach und Mentor für innere Transformation und bewusstes Leben"
              className="w-full h-full object-cover object-[65%_center] sm:object-[center_20%] md:object-[center_15%] lg:object-[center_10%]"
              loading="eager"
              fetchPriority="high"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15" />
            <div className="absolute inset-x-0 bottom-0 h-[55vh] sm:h-[58vh] md:h-[62vh] lg:h-[68vh] bg-gradient-to-t from-yellow-400/80 via-yellow-400/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] bg-gradient-to-t from-yellow-500/50 via-yellow-500/20 to-transparent" />

            <div className="absolute inset-x-5 sm:inset-x-8 md:inset-x-12 lg:inset-x-16 xl:inset-x-20 bottom-10 sm:bottom-12 md:bottom-14 lg:bottom-16 z-10">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
                  <div className="flex-1">
                    <h1 className="text-[2rem] leading-[1.08] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem] xl:text-[3rem] text-white mb-3 sm:mb-3.5 md:mb-4"
                        style={{
                          fontFamily: "'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 800,
                          letterSpacing: '-0.04em',
                          textShadow: '0 2px 20px rgba(0,0,0,0.4), 0 0 60px rgba(255,215,0,0.15)'
                        }}>
                      Innere Ruhe.<br />
                      Klarheit im Denken.<br />
                      Ein Leben, das sich richtig anfühlt.
                    </h1>

                    <p className="text-[0.85rem] sm:text-[0.9rem] md:text-[0.95rem] lg:text-base text-white/85 mb-3 sm:mb-3.5 md:mb-4 font-light leading-relaxed"
                       style={{
                         fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                         letterSpacing: '0.01em',
                         textShadow: '0 1px 8px rgba(0,0,0,0.3)'
                       }}>
                      Wenn dein Leben nach außen funktioniert,<br />
                      sich innen aber unruhig, leer oder eng anfühlt –<br />
                      bist du hier richtig.
                    </p>

                    <p className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] text-white/70 mb-4 sm:mb-5 font-light leading-relaxed"
                       style={{
                         fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                         letterSpacing: '0.01em'
                       }}>
                      Hier geht es nicht um Motivation.<br />
                      Hier geht es um innere Ordnung.
                    </p>

                    <div className="inline-block group/quote mb-4">
                      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/30 rounded-2xl px-5 sm:px-6 py-3 sm:py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.25),_0_0_80px_rgba(255,215,0,0.1)] transition-all duration-500 hover:shadow-[0_12px_48px_rgba(0,0,0,0.3),_0_0_100px_rgba(255,215,0,0.15)] hover:border-white/40">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl" />
                        <p className="relative text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] text-white/95 font-medium italic"
                           style={{
                             fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                             letterSpacing: '0.01em'
                           }}>
                          „Ich bringe Klarheit. Du gehst den nächsten Schritt."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:flex-shrink-0">
                    <button
                      className="group relative inline-flex items-center justify-center gap-2.5
                      h-12 sm:h-[52px] md:h-14 lg:h-[60px] px-8 sm:px-9 md:px-10 lg:px-11
                      bg-white hover:bg-white
                      text-black
                      text-[0.9rem] sm:text-[0.95rem] md:text-base lg:text-[1.05rem] font-semibold
                      rounded-full
                      transition-all duration-500 ease-out
                      hover:scale-[1.03]
                      active:scale-[0.97]
                      shadow-[0_8px_32px_rgba(0,0,0,0.3),_0_0_80px_rgba(255,255,255,0.2)]
                      hover:shadow-[0_12px_48px_rgba(0,0,0,0.4),_0_0_120px_rgba(255,255,255,0.3)]
                      overflow-hidden"
                      style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                      onClick={() => {
                        const bookingSection = document.querySelector('[data-section-id="booking"]');
                        bookingSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/30 via-transparent to-yellow-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative font-semibold tracking-wide">Kostenlos Erstgespräch</span>
                      <ArrowRight
                        className="relative w-[18px] h-[18px] md:w-5 md:h-5 transition-transform duration-500 group-hover:translate-x-1.5"
                        strokeWidth={2.5}
                      />
                    </button>
                    <p className="text-[0.7rem] sm:text-[0.75rem] text-white/60 text-center mt-2 italic">
                      15 Minuten · vertraulich · unverbindlich
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
            <ChevronDown size={20} className="animate-bounce" strokeWidth={2.5} />
          </div>
        </button>
      </section>

      {/* 2️⃣ NEWS-BOXEN — Was gibts Neues? */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-black" data-section>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/98 to-black" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-16">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight"
                style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">Aktuell</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/60">
              Was bewegt dich gerade?
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/20 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-500">
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Events & Seminare
                </h3>
                <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                  Intensive Workshops für echte Transformation und nachhaltigen Wandel.
                </p>
                <button
                  onClick={() => {
                    const eventsSection = document.querySelector('[data-section-id="events"]');
                    eventsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-yellow-400 font-semibold hover:gap-3 transition-all"
                >
                  Mehr erfahren
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/20 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-500">
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  1:1 Coaching
                </h3>
                <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                  Individuelle Begleitung für deine persönliche Entwicklung.
                </p>
                <button
                  onClick={() => {
                    const coachingSection = document.querySelector('[data-section-id="coaching"]');
                    coachingSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-blue-400 font-semibold hover:gap-3 transition-all"
                >
                  Pakete ansehen
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/20 backdrop-blur-sm hover:border-green-400/40 transition-all duration-500">
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                    <Book className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Blog & Insights
                </h3>
                <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                  Gedanken, Impulse und Perspektiven zur inneren Entwicklung.
                </p>
                <button
                  onClick={() => {
                    const blogSection = document.querySelector('[data-section-id="blog"]');
                    blogSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-green-400 font-semibold hover:gap-3 transition-all"
                >
                  Weiterlesen
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ THEMEN — Worum geht es auf dieser Seite? */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-black overflow-hidden" data-section>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(250,204,21,0.08),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-br from-amber-500/15 via-yellow-500/8 to-amber-600/10 rounded-[40px] sm:rounded-[60px] blur-3xl sm:blur-[60px] opacity-60 group-hover:opacity-100 transition-all duration-1000" />

              <div className="relative">
                <div className="absolute -inset-[2px] bg-gradient-to-br from-yellow-400/40 via-amber-500/20 to-yellow-600/30 rounded-[28px] sm:rounded-[36px] blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700" />

                <div
                  className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden"
                  style={{
                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8), 0 25px 50px -20px rgba(251,191,36,0.2), inset 0 1px 0 0 rgba(255,255,255,0.1)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent z-20" />

                  <img
                    src="/bildschirmfoto_2026-01-10_um_12.29.12.png"
                    alt="Anatoly Mook – Bewusstseinslehrer und Coach fur innere Transformation"
                    className="w-full aspect-[4/5] object-cover object-top transform group-hover:scale-[1.02] transition-transform duration-1000"
                    loading="lazy"
                  />

                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-10" />

                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-5 py-4">
                      <p className="text-white/90 text-sm sm:text-base font-medium tracking-wide">
                        Anatoly Mook
                      </p>
                      <p className="text-white/60 text-xs sm:text-sm mt-1">
                        Bewusstseinslehrer & Coach
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-amber-500/25 to-yellow-500/15 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-amber-500/10 rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
              </div>
            </div>

            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-[1.75rem] leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-extrabold text-white mb-8 sm:mb-10 md:mb-12 tracking-tight"
                  style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
                Viele Menschen sind nicht falsch.<br />
                <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">Sie sind nur innerlich uberlastet.</span>
              </h2>

              <div className="space-y-5 sm:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed"
                   style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                <p>Du denkst viel.<br />
                Du tragst Verantwortung.<br />
                Du willst es richtig machen.</p>

                <p className="text-white/90 font-medium">Aber dein Kopf kommt nicht zur Ruhe.<br />
                Gedanken horen nicht auf.<br />
                Entscheidungen fuhlen sich schwer an.</p>

                <p>Du funktionierst.<br />
                Aber du bist nicht wirklich da.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 LEHRERBILD - Wer ist dieser Lehrer? Was macht er? */}
      <section className="relative py-16 sm:py-24 md:py-32 lg:py-40 xl:py-48 bg-black overflow-hidden" data-section>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-yellow-500/4 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-24 items-center">
            <div
              className="relative group order-2 lg:order-1"
              style={{
                opacity: 0,
                animation: 'fadeInLeft 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards'
              }}
            >
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-amber-600/15 rounded-[32px] sm:rounded-[48px] blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/30 via-yellow-500/20 to-amber-600/25 rounded-[24px] sm:rounded-[36px] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />

              <div
                className="relative rounded-2xl sm:rounded-[28px] md:rounded-[32px] overflow-hidden"
                style={{
                  boxShadow: '0 30px 60px -20px rgba(0,0,0,0.7), 0 20px 40px -30px rgba(251,191,36,0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent z-20" />

                <img
                  src="/bildschirmfoto_2025-12-19_um_01.49.07.png"
                  alt="Anatoly Mook – Portrait des Bewusstseinscoachs und Lehrers für innere Meisterschaft"
                  className="w-full aspect-[4/5] object-cover transform group-hover:scale-[1.03] transition-transform duration-1000"
                  loading="lazy"
                />

                <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/60 to-transparent z-10" />
              </div>

              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

          </div>
        </div>
      </section>

      {/* 6️⃣ LEISTUNGEN — Was wird angeboten? Wo ist der Unterschied? */}

      {/* LEISTUNG: Verständnis — Es gibt zwei Arten zu leben */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-black" data-section>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-5 md:px-6 lg:px-16 text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-[1.75rem] leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-5 md:mb-6 tracking-tight"
              style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
            Warum sich dein Leben<br />
            <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">gerade schwer anfühlt</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mt-4 sm:mt-5 md:mt-6">
            Die meisten Menschen wechseln nicht,<br />
            weil sie nicht wissen, wie sich der andere Zustand anfühlt.
          </p>
        </div>

        <ConsciousnessComparison />
      </section>

      {/* LEISTUNG: Transformation Slider */}
      <TransformationSlider />

      {/* LEISTUNG: So beschreiben Menschen den Unterschied */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-black" data-section>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-5 md:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
            <h2 className="text-[1.75rem] leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-5 md:mb-6 tracking-tight"
                style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
              So beschreiben Menschen<br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">den Unterschied</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: Shield,
                title: 'Ruhig bleiben',
                quote: '„Ich bleibe ruhig – auch wenn es schwierig wird."',
                gradient: 'from-blue-500/20 to-blue-600/20'
              },
              {
                icon: Target,
                title: 'Klar entscheiden',
                quote: '„Ich weiß wieder, was ich will – und was nicht."',
                gradient: 'from-yellow-500/20 to-yellow-600/20'
              },
              {
                icon: Sparkles,
                title: 'Präsent sein',
                quote: '„Ich bin da. Nicht im Kopf, sondern im Leben."',
                gradient: 'from-purple-500/20 to-purple-600/20'
              },
              {
                icon: Heart,
                title: 'Nichts mehr beweisen müssen',
                quote: '„Ich muss nichts mehr beweisen."',
                gradient: 'from-green-500/20 to-green-600/20'
              },
              {
                icon: Brain,
                title: 'Entscheidungen treffen',
                quote: '„Ich treffe Entscheidungen – ohne mich zu verlieren."',
                gradient: 'from-orange-500/20 to-orange-600/20'
              },
              {
                icon: Award,
                title: 'Eigene Kraft spüren',
                quote: '„Ich spüre wieder meine eigene Kraft."',
                gradient: 'from-pink-500/20 to-pink-600/20'
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className={`relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${item.gradient} border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500`}>
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-400" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-white/80 italic leading-relaxed">
                    {item.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEISTUNG: Der Weg — 3 Schritte */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-black" data-section>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-5 md:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-[1.75rem] leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-5 md:mb-6 tracking-tight"
                style={{ fontFamily: "'SF Pro Display', 'Inter', sans-serif", fontWeight: 900 }}>
              Veränderung braucht keinen <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">Druck</span><br className="hidden sm:inline" />
              <span className="block mt-1 sm:mt-2">– sondern einen klaren Rahmen</span>
            </h2>
          </div>

          <div className="space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-12">
            {[
              {
                step: '1',
                title: 'Klären',
                desc: 'Wir schauen gemeinsam, was dich innerlich blockiert. Direkt, ehrlich und ohne Umwege.',
                safety: 'Kein Zwang'
              },
              {
                step: '2',
                title: 'Erleben',
                desc: 'Du erfährst, wie sich Präsenz anfühlt. Nicht als Idee, sondern als spürbarer Zustand.',
                safety: 'Kein Push'
              },
              {
                step: '3',
                title: 'Integrieren',
                desc: 'Wir übertragen das Erlebte in deinen Alltag. Damit Veränderung bleibt und nicht wieder verschwindet.',
                safety: 'Kein Zielstress'
              }
            ].map((step, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10 rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8 p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/20 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-500">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(250,204,21,0.5)]">
                      <span className="text-2xl sm:text-[1.75rem] md:text-3xl lg:text-4xl font-black text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Schritt {step.step} – {step.title}
                      </h3>
                      <span className="inline-block self-start sm:self-auto px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-[0.7rem] sm:text-xs font-semibold whitespace-nowrap">
                        {step.safety}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEISTUNG: Keynotes & Videos */}
      <section className="relative min-h-screen flex items-center overflow-hidden py-12 sm:py-16 md:py-20 lg:py-0 bg-black" data-section>
        <div className="absolute inset-x-0 top-0 h-16 sm:h-20 md:h-24 lg:h-32 bg-gradient-to-b from-black via-black/60 to-transparent z-10 pointer-events-none" />

        <div className="relative z-10 w-full">
          <div className="md:hidden mb-5 sm:mb-6 md:mb-8 px-4 sm:px-5">
            <button
              className="group relative inline-flex items-center justify-center gap-2 w-full max-w-md mx-auto h-11 sm:h-12 px-6 sm:px-7 backdrop-blur-2xl bg-white/95 hover:bg-white text-black text-sm sm:text-[15px] font-semibold tracking-[-0.01em] rounded-full transition-all duration-300 ease-out shadow-[0_6px_24px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.6),0_4px_16px_rgba(0,0,0,0.2)] active:scale-[0.95] border border-white/40 overflow-hidden touch-manipulation"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
              onClick={() => {
                const bookingSection = document.querySelector('[data-section-id="booking"]');
                bookingSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10 font-semibold">Jetzt buchen</span>
              <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </button>
          </div>

          <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-4 sm:px-5 md:px-6 lg:px-16 max-w-[2000px] mx-auto">
            <PremiumSlider items={keynoteSlides} autoplayInterval={7000} showControls={true} />
          </div>
        </div>
      </section>

      {/* LEISTUNG: Awareness Module */}
      <AwarenessModule />

      {/* 7️⃣ MEISTERSCHAFT — ULTRA-KOMPAKT High-End */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-black overflow-hidden" data-section>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-yellow-500/[0.03] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[40%_60%] gap-6 lg:gap-8 items-start">
            {/* LEFT: Bild */}
            <div className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[360px] lg:h-[520px] group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
              <img
                src="/bildschirmfoto_2025-12-19_um_01.49.07.png"
                alt="Anatoly Mook – Transformationscoach für bewusste Lebensführung und innere Meisterschaft"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20">
                <div className="px-3 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/20">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">Transformation</p>
                  <p className="text-xs sm:text-sm font-semibold text-white/90">Deine innere Neuausrichtung</p>
                </div>
              </div>
            </div>

            {/* RIGHT: Content - MAXIMALE KOMPAKTHEIT */}
            <div className="space-y-3">
              {/* Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/25">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span className="text-[10px] font-bold tracking-[0.2em] text-yellow-400 uppercase">Deine Reise</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1]">
                  Der Anfang<br />
                  <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">deiner Meisterschaft</span>
                </h2>
              </div>

              {/* ULTRA-KOMPAKTE PANELS */}
              <div className="space-y-1.5">
                {/* Statement */}
                <div className="px-3 py-2.5 rounded-lg bg-black/50 border border-white/10">
                  <p className="text-sm leading-snug">
                    <span className="bg-yellow-400 text-black font-semibold px-1 py-0.5 rounded text-xs sm:text-sm">Das neue Bewusstsein beginnt mit innerer Neuausrichtung.</span>
                  </p>
                </div>

                {/* Panel 1: Qualitativer Wandel */}
                <div>
                  <button
                    onClick={() => togglePanel(1)}
                    className="w-full px-3 py-2.5 rounded-lg bg-black/50 hover:bg-black/60 border border-white/10 hover:border-yellow-400/20 transition-all duration-200 text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm leading-snug flex-1">
                        <span className="bg-yellow-400 text-black font-semibold px-1 py-0.5 rounded text-xs sm:text-sm">Wenn im Außen vieles gelingt, aber innen etwas offenbleibt - braucht es einen qualitativen Wandel:</span>
                      </p>
                      <div className={`flex-shrink-0 w-6 h-6 rounded bg-white/5 flex items-center justify-center transition-all duration-200 ${expandedPanels[1] ? 'bg-yellow-400 rotate-45' : ''}`}>
                        <Plus size={14} strokeWidth={2.5} className={expandedPanels[1] ? 'text-black' : 'text-yellow-400'} />
                      </div>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${expandedPanels[1] ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-3 pt-1.5 space-y-1">
                      <p className="text-xs sm:text-sm"><span className="bg-yellow-400 text-black px-1 py-0.5 rounded">von innerer Unschärfe zu Klarheit,</span></p>
                      <p className="text-xs sm:text-sm"><span className="bg-yellow-400 text-black px-1 py-0.5 rounded">von Druck zu stimmiger Selbstführung.</span></p>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Drei Ebenen */}
                <div>
                  <button
                    onClick={() => togglePanel(2)}
                    className="w-full px-3 py-2.5 rounded-lg bg-black/50 hover:bg-black/60 border border-white/10 hover:border-yellow-400/20 transition-all duration-200 text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm leading-snug flex-1">
                        <span className="bg-yellow-400 text-black font-semibold px-1 py-0.5 rounded text-xs sm:text-sm">Anatoly initiiert einen Raum, in dem sich drei Ebenen verbinden:</span>
                      </p>
                      <div className={`flex-shrink-0 w-6 h-6 rounded bg-white/5 flex items-center justify-center transition-all duration-200 ${expandedPanels[2] ? 'bg-yellow-400 rotate-45' : ''}`}>
                        <Plus size={14} strokeWidth={2.5} className={expandedPanels[2] ? 'text-black' : 'text-yellow-400'} />
                      </div>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${expandedPanels[2] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-3 pt-1.5 space-y-1">
                      <p className="text-xs sm:text-sm"><span className="bg-yellow-400 text-black px-1 py-0.5 rounded">Achtsamkeitslehre vertieft souveräne Präsenz.</span></p>
                      <p className="text-xs sm:text-sm"><span className="bg-yellow-400 text-black px-1 py-0.5 rounded">Bewusstseinstraining schafft innere Ordnung und klare Orientierung.</span></p>
                      <p className="text-xs sm:text-sm"><span className="bg-yellow-400 text-black px-1 py-0.5 rounded">Erfolgscoaching übersetzt Potenziale in nachhaltige Wirksamkeit.</span></p>
                    </div>
                  </div>
                </div>

                {/* Panel 3: Klarer Prozess */}
                <div>
                  <button
                    onClick={() => togglePanel(3)}
                    className="w-full px-3 py-2.5 rounded-lg bg-black/50 hover:bg-black/60 border border-white/10 hover:border-yellow-400/20 transition-all duration-200 text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs sm:text-sm leading-snug flex-1 text-white/80">Es ist ein klarer Prozess: präzise Sprache, verkörperte Führung, konkrete Schritte.</p>
                      <div className={`flex-shrink-0 w-6 h-6 rounded bg-white/5 flex items-center justify-center transition-all duration-200 ${expandedPanels[3] ? 'bg-yellow-400 rotate-45' : ''}`}>
                        <Plus size={14} strokeWidth={2.5} className={expandedPanels[3] ? 'text-black' : 'text-yellow-400'} />
                      </div>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${expandedPanels[3] ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-3 pt-1.5">
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                        Dein Weg wird authentisch – deiner wahren Natur entsprechend. Daraus entsteht eine Wirksamkeit, die dich von innen her <span className="text-yellow-400 font-semibold">transzendiert</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  const bookingSection = document.querySelector('[data-section-id="booking"]');
                  bookingSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group w-full inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black text-sm font-bold rounded-lg transition-all duration-300 shadow-[0_4px_20px_rgba(250,204,21,0.3)] hover:shadow-[0_6px_30px_rgba(250,204,21,0.5)]"
              >
                <span>Erstgespräch buchen</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KLARHEIT Statement */}
      <section className="relative py-12 sm:py-16 bg-black" data-section>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white/80 leading-snug">
            <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent font-bold">Klarheit</span> beginnt oft mit einem Gespräch.
          </p>
        </div>
      </section>
    </div>
  );
}
