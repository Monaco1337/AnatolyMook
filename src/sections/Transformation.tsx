import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Circle, Sparkles, Heart, Brain, Zap, Shield, Eye, Compass, Flame, Wind, Check, X } from 'lucide-react';

export default function Transformation() {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#fbbf24', '#f59e0b', '#d97706', '#ea580c', '#dc2626'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx + mousePosition.x * 0.1;
        particle.y += particle.vy + mousePosition.y * 0.1;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(251, 191, 36, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePosition]);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const levels = [
    {
      id: 1,
      title: 'Körper',
      subtitle: 'Vitalität als Fundament',
      description: 'Energie wird wieder verfügbar. Dein Körper wird zum Verbündeten, nicht zum Gegner.',
      icon: Heart,
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      bgGradient: 'from-amber-950/40 via-orange-950/30 to-red-950/40',
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      glowColor: 'shadow-amber-500/50',
      particleColor: '#fbbf24'
    },
    {
      id: 2,
      title: 'Geist',
      subtitle: 'Klarheit im Geist',
      description: 'Gesunde Motive, klare Absichten, Fokus, sichere Entscheidungen, stimmige Konsequenz: weniger Reibung, mehr Wirksamkeit.',
      icon: Brain,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      bgGradient: 'from-blue-950/40 via-cyan-950/30 to-teal-950/40',
      accentColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      glowColor: 'shadow-cyan-500/50',
      particleColor: '#06b6d4'
    },
    {
      id: 3,
      title: 'Seele',
      subtitle: 'Essenz im Inneren',
      description: 'Friedvolle Harmonie, Verbundenheit, Wahrhaftigkeit: Handeln aus Fülle und echtem Enthusiasmus.',
      icon: Sparkles,
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      bgGradient: 'from-emerald-950/40 via-green-950/30 to-teal-950/40',
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      glowColor: 'shadow-emerald-500/50',
      particleColor: '#10b981'
    }
  ];

  const qualities = [
    {
      title: 'Mut & Urvertrauen',
      subtitle: 'statt Mangelsteuerung',
      icon: Shield,
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-400',
      delay: 0
    },
    {
      title: 'Wache Achtsamkeit',
      subtitle: 'statt Autopilot',
      icon: Eye,
      gradient: 'from-cyan-500/20 to-blue-500/20',
      iconColor: 'text-cyan-400',
      delay: 0.1
    },
    {
      title: 'Innere Stabilität',
      subtitle: 'statt Reiz-Reaktion',
      icon: Compass,
      gradient: 'from-emerald-500/20 to-green-500/20',
      iconColor: 'text-emerald-400',
      delay: 0.2
    },
    {
      title: 'Verbundenheit',
      subtitle: 'statt Kampf und Widerstand',
      icon: Heart,
      gradient: 'from-rose-500/20 to-pink-500/20',
      iconColor: 'text-rose-400',
      delay: 0.3
    },
    {
      title: 'Handeln aus Fülle',
      subtitle: 'statt aus Angst',
      icon: Flame,
      gradient: 'from-yellow-500/20 to-amber-500/20',
      iconColor: 'text-yellow-400',
      delay: 0.4
    }
  ];

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-transparent to-orange-600/20"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(${1 + scrollProgress * 0.2})`,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-tl from-cyan-600/10 via-transparent to-emerald-600/10"
          style={{
            transform: `translate(${-mousePosition.x * 30}px, ${-mousePosition.y * 30}px) scale(${1 + scrollProgress * 0.15})`,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_80%)]" />

      <div className="relative max-w-[1600px] mx-auto px-8 py-40">
        <div className="text-center mb-48">
          <div
            className="inline-block mb-12"
            style={{
              opacity: 0,
              animation: 'fadeInScale 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards'
            }}
          >
            <div className="relative px-8 py-3 rounded-full border border-amber-500/30 backdrop-blur-xl bg-gradient-to-r from-amber-950/50 to-orange-950/50">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-xl animate-pulse" />
              <span className="relative text-xs font-bold tracking-[0.4em] text-amber-300 uppercase">
                Transformation
              </span>
            </div>
          </div>

          <div
            style={{
              opacity: 0,
              animation: 'fadeInUp 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards'
            }}
          >
            <h1 className="text-7xl md:text-9xl font-extralight text-white mb-8 tracking-tighter leading-[0.9] relative">
              <span className="block mb-6">Deine innere</span>
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 blur-3xl opacity-50 animate-pulse" />
                <span className="relative bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 text-transparent bg-clip-text font-light">
                  Neuausrichtung
                </span>
              </span>
            </h1>
          </div>

          <div
            className="max-w-4xl mx-auto space-y-12 mt-20"
            style={{
              opacity: 0,
              animation: 'fadeInUp 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards'
            }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-3xl rounded-full" />
              <h2 className="relative text-4xl md:text-5xl font-extralight text-white/95 leading-tight">
                Der Anfang deiner Meisterschaft
              </h2>
            </div>

            <p className="text-2xl text-zinc-300 leading-relaxed font-light max-w-3xl mx-auto">
              Das neue Bewusstsein beginnt dort, wo du dich innerlich neu ausrichtest.
              Es ist der Anfang deiner Meisterschaft - nicht als großes Versprechen,
              sondern als spürbare Neuordnung:
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xl font-light">
              {['ruhig', 'klar', 'wach', 'tragfähig'].map((word, i) => (
                <div
                  key={word}
                  className="group relative"
                  style={{
                    opacity: 0,
                    animation: `fadeInScale 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.8 + i * 0.1}s forwards`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                  <span className="relative text-amber-300 group-hover:text-amber-200 transition-colors duration-500">
                    {word}
                  </span>
                  {i < 3 && (
                    <Circle className="inline-block w-2 h-2 ml-6 fill-amber-500/40 text-amber-500/40" />
                  )}
                </div>
              ))}
            </div>

            <div className="pt-12 max-w-3xl mx-auto">
              <p className="text-xl text-zinc-400 leading-loose font-light">
                Vielleicht kennst du das: Im Außen läuft vieles. Und doch bleibt innen etwas offen.
                Nicht dramatisch - nur unklar. Genau dort setzt dieser Weg an und führt zu mehr Präsenz,
                Klarheit, Wahrheit - und zu einem Leben, das sich wieder stimmig anfühlt.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-48">
          <div
            className="text-center mb-24"
            style={{
              opacity: 0,
              animation: 'fadeInUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards'
            }}
          >
            <span className="text-xs font-bold tracking-[0.4em] text-amber-400/70 uppercase mb-6 block">
              Transformation
            </span>
            <h2 className="text-6xl md:text-7xl font-extralight text-white tracking-tight">
              3 Ebenen der
              <span className="block mt-4 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 text-transparent bg-clip-text font-light">
                Transzendenz
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
            {levels.map((level, index) => {
              const Icon = level.icon;
              const isActive = activeLevel === level.id;

              return (
                <div
                  key={level.id}
                  className="group relative perspective-1000"
                  onMouseEnter={() => setActiveLevel(level.id)}
                  onMouseLeave={() => setActiveLevel(null)}
                  style={{
                    opacity: 0,
                    animation: `fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.15}s forwards`
                  }}
                >
                  <div
                    className={`
                      relative h-full p-12 rounded-3xl border backdrop-blur-2xl
                      transition-all duration-1000 ease-out
                      ${level.borderColor}
                      ${isActive ? `${level.glowColor} shadow-[0_0_80px_rgba(251,191,36,0.4)] scale-105 -translate-y-4` : 'shadow-2xl shadow-black/50'}
                    `}
                    style={{
                      background: `linear-gradient(135deg,
                        rgba(0, 0, 0, 0.95) 0%,
                        rgba(0, 0, 0, 0.85) 50%,
                        rgba(0, 0, 0, 0.95) 100%)`,
                      transform: isActive ? 'rotateY(5deg)' : 'rotateY(0deg)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${level.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${level.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-1000 blur-2xl`} />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-12">
                        <div
                          className={`
                            relative p-6 rounded-2xl border ${level.borderColor}
                            backdrop-blur-xl transition-all duration-700
                            ${isActive ? 'scale-125 rotate-6' : 'scale-100'}
                          `}
                          style={{
                            background: `linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%)`
                          }}
                        >
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${level.gradient} opacity-${isActive ? '30' : '0'} transition-opacity duration-700`} />
                          <Icon className={`relative w-10 h-10 ${level.accentColor} transition-all duration-700 ${isActive ? 'scale-110' : ''}`} />
                        </div>
                        <span className={`text-8xl font-thin ${level.accentColor} opacity-20 group-hover:opacity-40 transition-opacity duration-700`}>
                          {level.id}
                        </span>
                      </div>

                      <h3 className={`text-4xl font-extralight text-white mb-3 transition-all duration-700 group-hover:${level.accentColor}`}>
                        {level.title}
                      </h3>

                      <p className={`text-xl ${level.accentColor} mb-8 font-light`}>
                        {level.subtitle}
                      </p>

                      <p className="text-lg text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-700">
                        {level.description}
                      </p>

                      <div className={`
                        absolute bottom-0 left-0 right-0 h-1 rounded-full bg-gradient-to-r ${level.gradient}
                        transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left
                      `} />
                    </div>

                    <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000 pointer-events-none rounded-3xl" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="max-w-5xl mx-auto mb-48 relative group"
          style={{
            opacity: 0,
            animation: 'fadeInScale 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards'
          }}
        >
          <div className="absolute -inset-8 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-full" />

          <div className="relative p-16 rounded-[2rem] border border-amber-500/30 backdrop-blur-2xl overflow-hidden group-hover:border-amber-500/60 transition-all duration-1000 group-hover:shadow-[0_0_60px_rgba(251,191,36,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-orange-950/20 to-amber-950/30" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 text-[12rem] text-amber-400/10 font-serif leading-none group-hover:text-amber-400/20 transition-colors duration-1000">"</div>
                <div className="flex-1 pt-8">
                  <p className="text-2xl text-zinc-200 leading-loose mb-8 font-light group-hover:text-white transition-colors duration-700">
                    Mit Anatoly ist das kein Konzept. Es ist ein klarer Prozess: präzise Sprache,
                    verkörperte Führung, konkrete Schritte - so, dass du dich spürbar ordnest.
                    Dein Weg wird dabei nicht größer, sondern echter.
                  </p>
                  <p className="text-xl text-amber-300 font-light group-hover:text-amber-200 transition-colors duration-700">
                    Und genau daraus entsteht die Wirksamkeit, die dich nachhaltig transformiert.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-48">
          <div
            className="text-center mb-24"
            style={{
              opacity: 0,
              animation: 'fadeInUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards'
            }}
          >
            <span className="text-xs font-bold tracking-[0.4em] text-amber-400/70 uppercase mb-6 block">
              Verkörperte Führung
            </span>
            <h2 className="text-6xl md:text-7xl font-extralight text-white tracking-tight">
              5 Qualitäten,
              <span className="block mt-4 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 text-transparent bg-clip-text font-light">
                die in dir reifen werden
              </span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {qualities.map((quality, index) => {
              const Icon = quality.icon;

              return (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    opacity: 0,
                    animation: `fadeInLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + quality.delay}s forwards`
                  }}
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl" />

                  <div className="relative p-10 rounded-3xl border border-zinc-800/50 backdrop-blur-xl group-hover:border-amber-500/40 transition-all duration-1000 overflow-hidden group-hover:shadow-[0_0_40px_rgba(251,191,36,0.2)] group-hover:-translate-y-2">
                    <div className={`absolute inset-0 bg-gradient-to-r ${quality.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />

                    <div className="relative z-10 flex items-center gap-8">
                      <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl border border-zinc-700/50 group-hover:border-amber-500/60 transition-all duration-1000 group-hover:scale-125 group-hover:rotate-6 backdrop-blur-xl">
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${quality.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                        <Icon className={`relative w-9 h-9 text-zinc-500 ${quality.iconColor} transition-all duration-1000 group-hover:scale-110`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-3xl font-light text-white mb-2 group-hover:text-amber-300 transition-colors duration-700">
                              {quality.title}
                            </h3>
                            <p className="text-lg text-zinc-500 group-hover:text-zinc-400 transition-colors duration-700 font-light">
                              {quality.subtitle}
                            </p>
                          </div>
                          <span className="text-6xl font-thin text-zinc-900 group-hover:text-amber-900/30 transition-colors duration-700">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 delay-100" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="text-center"
          style={{
            opacity: 0,
            animation: 'fadeInScale 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards'
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <span className="text-xs font-bold tracking-[0.4em] text-amber-400/70 uppercase mb-6 block">
                Jetzt beginnen
              </span>
              <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
                Nächster Schritt:
                <span className="block mt-4 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 text-transparent bg-clip-text font-light">
                  Kostenloses Erstgespräch
                </span>
              </h2>
              <p className="text-2xl text-zinc-400 mb-16 font-light">
                Wenn du spürst: Ja, das ist jetzt dran - dann beginne hier.
              </p>
            </div>

            <div className="relative inline-block group mb-16">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />

              <button className="relative px-16 py-8 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl font-light text-xl hover:shadow-[0_0_80px_rgba(251,191,36,0.6)] transition-all duration-700 hover:scale-110 active:scale-95 group-hover:from-amber-400 group-hover:via-orange-400 group-hover:to-amber-500">
                <span className="flex items-center gap-4">
                  Kostenloses Erstgespräch buchen
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10 text-zinc-500 text-lg mb-20">
              {[
                { icon: Circle, text: '15-20 Minuten' },
                { icon: Shield, text: 'Vertraulich' },
                { icon: Sparkles, text: 'Unverbindlich' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-3 hover:text-amber-400 transition-colors duration-500"
                  style={{
                    opacity: 0,
                    animation: `fadeInScale 1s cubic-bezier(0.16, 1, 0.3, 1) ${1 + i * 0.1}s forwards`
                  }}
                >
                  <item.icon className="w-3 h-3 fill-current text-amber-500 group-hover:scale-125 transition-transform duration-500" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-20 border-t border-zinc-800/50">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="group relative px-10 py-5 border border-zinc-700 hover:border-amber-500/60 rounded-2xl text-zinc-300 hover:text-white transition-all duration-700 hover:shadow-[0_0_40px_rgba(251,191,36,0.2)] hover:scale-105 backdrop-blur-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="relative flex items-center gap-3 text-lg">
                    Kontakt aufnehmen
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </button>

                <button className="group relative px-10 py-5 border border-zinc-700 hover:border-amber-500/60 rounded-2xl text-zinc-300 hover:text-white transition-all duration-700 hover:shadow-[0_0_40px_rgba(251,191,36,0.2)] hover:scale-105 backdrop-blur-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="relative flex items-center gap-3 text-lg">
                    Seminare & Termine ansehen
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}