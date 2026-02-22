import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Sparkles, Brain, X, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { calculateTypology, type AnamnesisData, type TypologyResult } from '../utils/typologyCalculator';
import Section1 from './anamnesis/Section1';
import Section2 from './anamnesis/Section2';
import Section3 from './anamnesis/Section3';
import Section4 from './anamnesis/Section4';
import Section5 from './anamnesis/Section5';
import Section6 from './anamnesis/Section6';
import Section7 from './anamnesis/Section7';

interface WizardProps {
  onClose: () => void;
}

export default function AnamnesisWizard({ onClose }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [typologyResult, setTypologyResult] = useState<TypologyResult | null>(null);

  const [formData, setFormData] = useState({
    // Contact
    email: '',
    first_name: '',
    last_name: '',
    phone: '',

    // Section 1: Context & Orientation
    inquiry_type: 'coaching',
    life_situation: [] as string[],
    primary_role: '',

    // Section 2: Inner State
    inner_clarity: 5,
    inner_stability: 5,
    decision_capability: 5,
    energy_level: 5,
    inner_peace_vs_pressure: 50,

    // Section 3: Stress & Reaction
    stress_reaction: '',
    conflict_experience: '',
    daily_feelings: [] as string[],

    // Section 4: Decision & Action
    decision_style: '',
    self_trust_level: 5,
    uncertainty_reaction: '',

    // Section 5: Relationship & External
    closeness_difficulty: '',
    external_appearance: '',
    feedback_from_others: [] as string[],

    // Section 6: Meaning, Truth, Direction
    on_my_path: 5,
    change_is_coming: 5,
    functioning_vs_living: 5,
    seeking_clarity: 5,

    // Section 7: Readiness & Goal
    what_should_change: '',
    what_must_not_stay: '',
    readiness_to_examine: 5
  });

  const sections = [
    { title: 'Kontext & Orientierung', subtitle: 'Einordnung, nicht Bewertung' },
    { title: 'Innerer Zustand', subtitle: 'Baseline-Matrix' },
    { title: 'Stress- & Reaktionsmuster', subtitle: 'Situative Mustererkennung' },
    { title: 'Entscheidungs- & Handlungslogik', subtitle: 'Zentral für Typisierung' },
    { title: 'Beziehung & Außenwirkung', subtitle: 'Soziale Dynamik' },
    { title: 'Sinn, Wahrheit, Ausrichtung', subtitle: 'Tiefe Ebene' },
    { title: 'Bereitschaft & Ziel', subtitle: 'Abschluss & Öffnung' }
  ];

  const toggleArrayItem = (field: keyof typeof formData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      setFormData({ ...formData, [field]: currentArray.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...currentArray, value] });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.inquiry_type && formData.life_situation.length > 0 && formData.primary_role;
      case 1:
        return true; // All have defaults
      case 2:
        return formData.stress_reaction && formData.conflict_experience && formData.daily_feelings.length > 0;
      case 3:
        return formData.decision_style && formData.uncertainty_reaction;
      case 4:
        return formData.closeness_difficulty && formData.external_appearance && formData.feedback_from_others.length > 0;
      case 5:
        return true; // All have defaults
      case 6:
        return formData.what_should_change && formData.what_must_not_stay;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;

    setIsSubmitting(true);

    try {
      // Calculate typology
      const typology = calculateTypology(formData as AnamnesisData);
      setTypologyResult(typology);

      // Prepare data for database
      const submissionData = {
        ...formData,
        life_situation: formData.life_situation,
        daily_feelings: formData.daily_feelings,
        feedback_from_others: formData.feedback_from_others,
        primary_type: typology.primary_type,
        secondary_type: typology.secondary_type,
        tension_profile: typology.tension_profile,
        coaching_focus: typology.coaching_focus,
        typology_scores: typology.typology_scores
      };

      const { error } = await supabase
        .from('anamnesis_submissions')
        .insert([submissionData]);

      if (error) throw error;

      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting anamnesis:', error);
      alert('Fehler beim Senden. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ContactForm = () => (
    <div className="space-y-6">
      <p className="text-base text-white/70 leading-relaxed">
        Bitte geben Sie Ihre Kontaktdaten an, damit wir Ihnen Ihr persönliches Profil zusenden können.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-white/90 mb-2 uppercase tracking-wide">Vorname *</label>
          <input
            type="text"
            required
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            className="w-full h-14 px-5 rounded-xl bg-black/30 border-2 border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:bg-black/50 transition-all outline-none"
            placeholder="Ihr Vorname"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-white/90 mb-2 uppercase tracking-wide">Nachname *</label>
          <input
            type="text"
            required
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            className="w-full h-14 px-5 rounded-xl bg-black/30 border-2 border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:bg-black/50 transition-all outline-none"
            placeholder="Ihr Nachname"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-white/90 mb-2 uppercase tracking-wide">E-Mail *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full h-14 px-5 rounded-xl bg-black/30 border-2 border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:bg-black/50 transition-all outline-none"
          placeholder="ihre.email@beispiel.com"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-white/90 mb-2 uppercase tracking-wide">Telefon (optional)</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full h-14 px-5 rounded-xl bg-black/30 border-2 border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:bg-black/50 transition-all outline-none"
          placeholder="+49 123 456789"
        />
      </div>
    </div>
  );

  if (showResults && typologyResult) {
    return (
      <div className="fixed inset-0 z-[9999] min-h-screen bg-black overflow-y-auto">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-400/10" />
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <button
          onClick={onClose}
          className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-xl group"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
        </button>

        <div className="relative z-10 py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase backdrop-blur-sm mb-8">
                <Check size={16} />
                Analyse abgeschlossen
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                Ihr persönliches Profil
              </h1>

              <div className="relative max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="absolute inset-0 rounded-3xl blur-2xl" style={{ background: `linear-gradient(135deg, ${typologyResult.primary_type_color}20, ${typologyResult.primary_type_color}10)` }} />
                <div className="relative backdrop-blur-xl rounded-3xl border-2 p-10" style={{
                  background: `linear-gradient(135deg, ${typologyResult.primary_type_color}10, ${typologyResult.primary_type_color}05)`,
                  borderColor: `${typologyResult.primary_type_color}40`
                }}>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl" style={{
                      background: `linear-gradient(135deg, ${typologyResult.primary_type_color}, ${typologyResult.primary_type_color}CC)`
                    }}>
                      <Brain className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Inter', sans-serif", color: typologyResult.primary_type_color }}>
                    {typologyResult.primary_type_label}
                  </h2>

                  <p className="text-xl text-white/80 leading-relaxed font-medium">
                    {typologyResult.primary_type_description}
                  </p>
                </div>
              </div>
            </div>

            {typologyResult.secondary_type && (
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/5 rounded-3xl blur-xl" />
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-3">Sekundärer Einfluss</h3>
                    <p className="text-2xl font-semibold text-white/70">{typologyResult.secondary_type_label}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl blur-2xl" style={{ background: `linear-gradient(135deg, ${typologyResult.primary_type_color}10, transparent)` }} />
                <div className="relative p-10 rounded-3xl border backdrop-blur-sm" style={{
                  background: `linear-gradient(135deg, ${typologyResult.primary_type_color}06, transparent)`,
                  borderColor: `${typologyResult.primary_type_color}20`
                }}>
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{
                      background: `${typologyResult.primary_type_color}20`,
                      border: `2px solid ${typologyResult.primary_type_color}40`
                    }}>
                      <Sparkles className="w-8 h-8" style={{ color: typologyResult.primary_type_color }} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Coaching-Fokus
                      </h3>
                      <p className="text-white/50 text-sm">Empfohlener Transformationsweg</p>
                    </div>
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {typologyResult.coaching_focus}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="relative max-w-2xl mx-auto mb-8">
                <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-400/5 via-orange-500/10 to-amber-400/5 border border-amber-400/20 backdrop-blur-sm">
                  <p className="text-white/70 leading-relaxed mb-2">
                    Ihr vollständiges Profil wurde gespeichert.
                  </p>
                  <p className="text-amber-400 font-semibold">
                    Wir melden uns in Kürze bei Ihnen.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '#booking'}
                  className="group relative inline-flex items-center justify-center gap-3 h-16 px-10 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${typologyResult.primary_type_color}, ${typologyResult.primary_type_color}CC)`,
                    boxShadow: `0 10px 40px ${typologyResult.primary_type_color}40`
                  }}
                >
                  <Brain className="w-6 h-6" strokeWidth={2.5} />
                  <span className="text-lg">Gespräch buchen</span>
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>

                <button
                  onClick={onClose}
                  className="h-16 px-10 rounded-2xl font-bold text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  Zurück zur Startseite
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] min-h-screen bg-black overflow-y-auto">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-400/10" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <button
        onClick={onClose}
        className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-xl group"
      >
        <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
      </button>

      <div className="relative z-10 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold tracking-widest uppercase backdrop-blur-sm mb-6">
              <Brain size={16} />
              PREMIUM PROFILING
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
              Persönlicher <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">Anamnesebogen</span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              Vertraulich · Strukturiert · 3-6 Minuten
            </p>

            <div className="mt-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-between text-xs sm:text-sm text-white/60 mb-3">
                <span>Fortschritt</span>
                <span className="font-bold text-amber-400">
                  Abschnitt {currentStep + 1} von {sections.length} · {Math.round(((currentStep + 1) / sections.length) * 100)}%
                </span>
              </div>
              <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 ease-out rounded-full shadow-[0_0_20px_rgba(251,146,60,0.5)]"
                  style={{ width: `${((currentStep + 1) / sections.length) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-2 mt-3">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      index <= currentStep ? 'bg-amber-400' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-amber-400/10 rounded-3xl blur-2xl" />
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/20 rounded-3xl p-6 sm:p-8 md:p-12">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 mb-4 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {sections[currentStep].subtitle}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {sections[currentStep].title}
                </h2>
              </div>

          {/* Section Content - TO BE CONTINUED IN NEXT MESSAGE DUE TO LENGTH */}
          <div className="space-y-8">
            {/* SECTION 0: Context & Orientation */}
            {currentStep === 0 && (
              <Section1
                formData={formData}
                setFormData={setFormData}
                toggleArrayItem={toggleArrayItem}
              />
            )}

            {/* SECTION 1: Inner State */}
            {currentStep === 1 && (
              <Section2
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* SECTION 2: Stress & Reaction */}
            {currentStep === 2 && (
              <Section3
                formData={formData}
                setFormData={setFormData}
                toggleArrayItem={toggleArrayItem}
              />
            )}

            {/* SECTION 3: Decision & Action */}
            {currentStep === 3 && (
              <Section4
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* SECTION 4: Relationship & External */}
            {currentStep === 4 && (
              <Section5
                formData={formData}
                setFormData={setFormData}
                toggleArrayItem={toggleArrayItem}
              />
            )}

            {/* SECTION 5: Meaning, Truth, Direction */}
            {currentStep === 5 && (
              <Section6
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* SECTION 6: Readiness & Goal + Contact */}
            {currentStep === 6 && (
              <>
                <Section7
                  formData={formData}
                  setFormData={setFormData}
                />
                <div className="pt-8 border-t border-white/10 mt-8">
                  <h3 className="text-xl font-bold text-white mb-6">Kontaktdaten</h3>
                  <ContactForm />
                </div>
              </>
            )}
          </div>

              <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 0
                      ? 'text-white/30 cursor-not-allowed'
                      : 'text-white bg-white/10 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  <ChevronLeft size={20} />
                  Zurück
                </button>

                {currentStep < sections.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`group flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                      canProceed()
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black hover:scale-105 shadow-[0_8px_32px_rgba(251,146,60,0.3)] hover:shadow-[0_12px_48px_rgba(251,146,60,0.5)]'
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    Weiter
                    <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceed() || !formData.email || !formData.first_name || !formData.last_name || isSubmitting}
                    className={`group flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                      canProceed() && formData.email && formData.first_name && formData.last_name && !isSubmitting
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black hover:scale-105 shadow-[0_8px_32px_rgba(251,146,60,0.3)] hover:shadow-[0_12px_48px_rgba(251,146,60,0.5)]'
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Wird analysiert...
                      </>
                    ) : (
                      <>
                        <Check size={20} />
                        Absenden
                        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-white/50">
              Vertraulich behandelt · Keine medizinische Diagnose
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
