import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Large Image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Large Image */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/40 via-orange-500/30 to-yellow-500/40 rounded-[3rem] blur-3xl opacity-60" />
              <div className="relative">
                <div className="absolute -inset-[2px] bg-gradient-to-br from-amber-400/60 to-orange-500/60 rounded-[2.5rem] animate-pulse"
                     style={{ animationDuration: '3s' }} />
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl shadow-amber-500/40">
                  <img
                    src="/bildschirmfoto_2026-01-19_um_18.47.55.png"
                    alt="Anatoly Mook – Transzendenz in ein neues Bewusstsein"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.5rem]" />
                </div>
              </div>
            </div>

            {/* Headline & Subline */}
            <div className="space-y-8 order-1 lg:order-2">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                  <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-fade-in">
                    Transzendenz in ein
                  </span>
                  <br />
                  <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-fade-in"
                        style={{ animationDelay: '0.2s' }}>
                    neues Bewusstsein
                  </span>
                </h1>
              </div>

              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
                  Hier verbinden sich die drei Wirkebenen der Transformation zu einer kraftvollen Synthese:
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Pillars Section */}
      <div className="relative py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Achtsamkeitslehre */}
            <div
              className={`relative group transition-all duration-1000 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 sm:p-10 hover:border-amber-500/30 transition-all duration-500">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Achtsamkeitslehre:
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Wir vertiefen deine Präsenz und schärfen die Wahrnehmung, damit du aus innerer Stimmigkeit agierst.
                  <span className="relative inline-block ml-2">
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-lg animate-pulse"
                          style={{ animationDuration: '2s' }} />
                    <span className="relative text-amber-400 font-semibold">
                      Das Ergebnis ist souveräne Konsequenz: weniger Reibung, mehr Wirksamkeit.
                    </span>
                  </span>
                </p>
              </div>
            </div>

            {/* Bewusstseinstraining */}
            <div
              className={`relative group transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 sm:p-10 hover:border-orange-500/30 transition-all duration-500">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Bewusstseinstraining:
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Wir verankern eine bewusste Selbstführung, die Identität klärt und echte Stabilität schafft.
                  <span className="relative inline-block ml-2">
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 blur-lg animate-pulse"
                          style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
                    <span className="relative text-orange-400 font-semibold">
                      Du handelst nicht mehr reaktiv, sondern entscheidest klar und ruhig – aus deiner inneren Wahrheit heraus.
                    </span>
                  </span>
                </p>
              </div>
            </div>

            {/* Erfolgscoaching */}
            <div
              className={`relative group transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 sm:p-10 hover:border-yellow-500/30 transition-all duration-500">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Erfolgscoaching:
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Wir setzen neue Ressourcen frei und übersetzen Potenziale in reine Wirkkraft.
                  <span className="relative inline-block ml-2">
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 blur-lg animate-pulse"
                          style={{ animationDuration: '2s', animationDelay: '0.6s' }} />
                    <span className="relative text-yellow-400 font-semibold">
                      Dein Handeln entspringt der Fülle und echtem Enthusiasmus. Erfolg fühlt sich nicht mehr nach Kampf an, sondern ist der natürliche Ausdruck deiner inneren Ordnung.
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Synthesis Statement */}
          <div className="mt-16 sm:mt-20">
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-500/40 via-orange-500/40 to-yellow-500/40 rounded-3xl blur-2xl animate-pulse"
                   style={{ animationDuration: '4s' }} />
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border-2 border-amber-500/30 rounded-3xl p-10 sm:p-16 text-center">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-relaxed">
                  <span className="text-gray-300">Diese Synergie erzeugt einen </span>
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 blur-xl opacity-50" />
                    <span className="relative bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                      qualitativen Bewusstseinswandel
                    </span>
                  </span>
                  <span className="text-gray-300">, der weit über bloße Transformation hinausreicht:</span>
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-8">
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 blur-2xl opacity-70 animate-pulse"
                          style={{ animationDuration: '3s' }} />
                    <span className="relative bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                      Der Sprung in ein wahrhaftiges, stabiles und handlungsfähiges Leben.
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEGA CTA Section */}
      <div className="relative py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.15),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 blur-2xl opacity-50" />
                <span className="relative bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Entdecke die AM-Akademie
                </span>
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Button 1: Methode */}
            <a
              href="#about"
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative px-8 py-12 text-center">
                <span className="text-2xl font-bold text-white block mb-2">Methode</span>
                <ArrowRight className="w-6 h-6 text-white mx-auto group-hover:translate-x-2 transition-transform" strokeWidth={2.5} />
              </div>
            </a>

            {/* Button 2: Dein Kontext */}
            <a
              href="#transformation"
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative px-8 py-12 text-center">
                <span className="text-2xl font-bold text-white block mb-2">Dein Kontext</span>
                <ArrowRight className="w-6 h-6 text-white mx-auto group-hover:translate-x-2 transition-transform" strokeWidth={2.5} />
              </div>
            </a>

            {/* Button 3: Lebensbereiche */}
            <a
              href="#resources"
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative px-8 py-12 text-center">
                <span className="text-2xl font-bold text-white block mb-2">Lebensbereiche</span>
                <ArrowRight className="w-6 h-6 text-white mx-auto group-hover:translate-x-2 transition-transform" strokeWidth={2.5} />
              </div>
            </a>
          </div>
        </div>
      </div>

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
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
