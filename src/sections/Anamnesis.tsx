import { useState, useEffect } from 'react';
import { Plus, Minus, CheckCircle2, Sparkles, Brain, ArrowRight, User, Heart, Target, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { calculateTypology, type AnamnesisData, type TypologyResult } from '../utils/typologyCalculator';

interface AnamnesisFormData {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  inquiry_type: string;
  life_situation: string[];
  primary_role: string;
  inner_clarity: number;
  inner_stability: number;
  decision_capability: number;
  energy_level: number;
  inner_peace_vs_pressure: number;
  stress_reaction: string;
  conflict_experience: string;
  daily_feelings: string[];
  decision_style: string;
  self_trust_level: number;
  uncertainty_reaction: string;
  closeness_difficulty: string;
  external_appearance: string;
  feedback_from_others: string[];
  on_my_path: number;
  change_is_coming: number;
  functioning_vs_living: number;
  seeking_clarity: number;
  what_should_change: string;
  what_must_not_stay: string;
  readiness_to_examine: number;
}

interface QuestionSection {
  id: string;
  title: string;
  category: string;
  fields: QuestionField[];
}

interface QuestionField {
  id: keyof AnamnesisFormData;
  question: string;
  type: 'single_choice' | 'multi_select' | 'scale' | 'text';
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  required?: boolean;
}

export default function Anamnesis() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [userInfo, setUserInfo] = useState({ first_name: '', last_name: '', email: '' });
  const [showWelcome, setShowWelcome] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [typologyResult, setTypologyResult] = useState<TypologyResult | null>(null);

  const [formData, setFormData] = useState<AnamnesisFormData>({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    inquiry_type: 'coaching',
    life_situation: [],
    primary_role: '',
    inner_clarity: 5,
    inner_stability: 5,
    decision_capability: 5,
    energy_level: 5,
    inner_peace_vs_pressure: 50,
    stress_reaction: '',
    conflict_experience: '',
    daily_feelings: [],
    decision_style: '',
    self_trust_level: 5,
    uncertainty_reaction: '',
    closeness_difficulty: '',
    external_appearance: '',
    feedback_from_others: [],
    on_my_path: 5,
    change_is_coming: 5,
    functioning_vs_living: 5,
    seeking_clarity: 5,
    what_should_change: '',
    what_must_not_stay: '',
    readiness_to_examine: 5
  });

  const sections: QuestionSection[] = [
    {
      id: 'section1',
      title: 'Kontext & Orientierung',
      category: 'Einordnung',
      fields: [
        {
          id: 'inquiry_type',
          question: 'Art der Anfrage',
          type: 'single_choice',
          options: [
            { value: 'coaching', label: 'Coaching' },
            { value: 'seminar', label: 'Seminar' },
            { value: 'business', label: 'Business' },
            { value: 'orientation', label: 'Orientierung' }
          ],
          required: true
        },
        {
          id: 'life_situation',
          question: 'Aktuelle Lebenssituation (Mehrfachauswahl)',
          type: 'multi_select',
          options: [
            { value: 'career_transition', label: 'Berufliche Neuorientierung' },
            { value: 'leadership_challenge', label: 'Führungsherausforderung' },
            { value: 'life_crisis', label: 'Lebenskrise' },
            { value: 'relationship_issues', label: 'Beziehungsthemen' },
            { value: 'meaning_search', label: 'Sinnsuche' },
            { value: 'burnout_prevention', label: 'Burnout-Prävention' },
            { value: 'personal_growth', label: 'Persönliche Entwicklung' },
            { value: 'entrepreneurship', label: 'Selbstständigkeit' }
          ],
          required: true
        },
        {
          id: 'primary_role',
          question: 'Aktuelle Hauptrolle',
          type: 'single_choice',
          options: [
            { value: 'executive', label: 'Geschäftsführung / C-Level' },
            { value: 'manager', label: 'Führungskraft' },
            { value: 'self_employed', label: 'Selbstständig / Unternehmer' },
            { value: 'employee', label: 'Angestellter' },
            { value: 'private', label: 'Privatperson' },
            { value: 'in_transition', label: 'In Übergangsphase' }
          ],
          required: true
        }
      ]
    },
    {
      id: 'section2',
      title: 'Innerer Zustand',
      category: 'Baseline-Matrix',
      fields: [
        {
          id: 'inner_clarity',
          question: 'Wie klar sehe ich gerade?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Nebel',
          maxLabel: 'Glasklar'
        },
        {
          id: 'inner_stability',
          question: 'Wie stabil fühle ich mich?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Wackelig',
          maxLabel: 'Sehr stabil'
        },
        {
          id: 'decision_capability',
          question: 'Wie gut kann ich Entscheidungen treffen?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Schwer',
          maxLabel: 'Leicht'
        },
        {
          id: 'energy_level',
          question: 'Wie ist mein Energielevel?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Erschöpft',
          maxLabel: 'Voller Energie'
        }
      ]
    },
    {
      id: 'section3',
      title: 'Stress- & Reaktionsmuster',
      category: 'Mustererkennung',
      fields: [
        {
          id: 'stress_reaction',
          question: 'Wenn ich unter Druck bin, dann...',
          type: 'single_choice',
          options: [
            { value: 'withdraw', label: 'Ich ziehe mich zurück' },
            { value: 'attack', label: 'Ich werde kämpferisch' },
            { value: 'freeze', label: 'Ich erstarre / blockiere' },
            { value: 'function', label: 'Ich funktioniere einfach weiter' },
            { value: 'seek_control', label: 'Ich versuche alles zu kontrollieren' }
          ],
          required: true
        },
        {
          id: 'conflict_experience',
          question: 'In Konflikten erlebe ich mich als...',
          type: 'single_choice',
          options: [
            { value: 'aggressive', label: 'Aggressiv' },
            { value: 'avoidant', label: 'Vermeidend' },
            { value: 'diplomatic', label: 'Diplomatisch' },
            { value: 'defensive', label: 'Defensiv' },
            { value: 'overwhelmed', label: 'Überwältigt' }
          ],
          required: true
        },
        {
          id: 'daily_feelings',
          question: 'Was fühle ich im Alltag am häufigsten? (Mehrfachauswahl)',
          type: 'multi_select',
          options: [
            { value: 'pressure', label: 'Druck' },
            { value: 'emptiness', label: 'Leere' },
            { value: 'overwhelm', label: 'Überforderung' },
            { value: 'restlessness', label: 'Unruhe' },
            { value: 'dissatisfaction', label: 'Unzufriedenheit' },
            { value: 'joy', label: 'Freude' },
            { value: 'peace', label: 'Frieden' },
            { value: 'uncertainty', label: 'Unsicherheit' }
          ],
          required: true
        }
      ]
    },
    {
      id: 'section4',
      title: 'Entscheidungs- & Handlungslogik',
      category: 'Zentral für Typisierung',
      fields: [
        {
          id: 'decision_style',
          question: 'Wie treffe ich wichtige Entscheidungen?',
          type: 'single_choice',
          options: [
            { value: 'rational', label: 'Rational / aus dem Kopf' },
            { value: 'intuitive', label: 'Intuitiv / aus dem Bauch' },
            { value: 'external', label: 'Basierend auf Meinungen anderer' },
            { value: 'delayed', label: 'Ich schiebe sie auf' },
            { value: 'impulsive', label: 'Schnell und impulsiv' }
          ],
          required: true
        },
        {
          id: 'self_trust_level',
          question: 'Wie sehr vertraue ich mir selbst?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Kaum',
          maxLabel: 'Voll und ganz'
        },
        {
          id: 'uncertainty_reaction',
          question: 'Wenn ich nicht weiß, was richtig ist...',
          type: 'single_choice',
          options: [
            { value: 'research', label: 'Ich recherchiere / sammle Infos' },
            { value: 'ask_others', label: 'Ich frage andere' },
            { value: 'wait', label: 'Ich warte ab' },
            { value: 'panic', label: 'Ich gerate in Panik' },
            { value: 'trust_feeling', label: 'Ich vertraue meinem Gefühl' }
          ],
          required: true
        }
      ]
    },
    {
      id: 'section5',
      title: 'Beziehung & Außenwirkung',
      category: 'Soziale Dynamik',
      fields: [
        {
          id: 'closeness_difficulty',
          question: 'Nähe zu anderen fällt mir...',
          type: 'single_choice',
          options: [
            { value: 'easy', label: 'Leicht' },
            { value: 'difficult', label: 'Schwer' },
            { value: 'context_dependent', label: 'Situationsabhängig' },
            { value: 'scary', label: 'Macht mir Angst' },
            { value: 'natural', label: 'Sehr natürlich' }
          ],
          required: true
        },
        {
          id: 'external_appearance',
          question: 'Nach außen wirke ich...',
          type: 'single_choice',
          options: [
            { value: 'strong', label: 'Stark / souverän' },
            { value: 'friendly', label: 'Freundlich / offen' },
            { value: 'reserved', label: 'Zurückhaltend / kühl' },
            { value: 'insecure', label: 'Unsicher' },
            { value: 'authentic', label: 'Authentisch' }
          ],
          required: true
        },
        {
          id: 'feedback_from_others',
          question: 'Menschen sagen über mich... (Mehrfachauswahl)',
          type: 'multi_select',
          options: [
            { value: 'strong', label: 'Du bist stark' },
            { value: 'sensitive', label: 'Du bist sensibel' },
            { value: 'closed', label: 'Du bist verschlossen' },
            { value: 'intense', label: 'Du bist intensiv' },
            { value: 'distant', label: 'Du bist distanziert' },
            { value: 'warm', label: 'Du bist herzlich' },
            { value: 'confusing', label: 'Ich verstehe dich nicht' }
          ],
          required: true
        }
      ]
    },
    {
      id: 'section6',
      title: 'Sinn, Wahrheit, Ausrichtung',
      category: 'Tiefe Ebene',
      fields: [
        {
          id: 'on_my_path',
          question: 'Ich bin auf meinem Weg',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Nein',
          maxLabel: 'Voll und ganz'
        },
        {
          id: 'change_is_coming',
          question: 'Ich spüre, dass eine Veränderung kommt',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Nein',
          maxLabel: 'Sehr stark'
        },
        {
          id: 'functioning_vs_living',
          question: 'Ich funktioniere mehr, als dass ich lebe',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Trifft nicht zu',
          maxLabel: 'Trifft voll zu'
        },
        {
          id: 'seeking_clarity',
          question: 'Ich suche nach Klarheit über mein Leben',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Nein',
          maxLabel: 'Ja, dringend'
        }
      ]
    },
    {
      id: 'section7',
      title: 'Bereitschaft & Ziel',
      category: 'Abschluss',
      fields: [
        {
          id: 'what_should_change',
          question: 'Was soll sich verändern?',
          type: 'text',
          required: true
        },
        {
          id: 'what_must_not_stay',
          question: 'Was darf nicht mehr so bleiben?',
          type: 'text',
          required: true
        },
        {
          id: 'readiness_to_examine',
          question: 'Wie bereit bin ich, mich wirklich zu betrachten?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Unsicher',
          maxLabel: 'Voll bereit'
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleAnswer = (fieldId: keyof AnamnesisFormData, value: any, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const toggleMultiSelect = (fieldId: keyof AnamnesisFormData, value: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const currentArray = formData[fieldId] as string[];
    if (currentArray.includes(value)) {
      handleAnswer(fieldId, currentArray.filter(v => v !== value));
    } else {
      handleAnswer(fieldId, [...currentArray, value]);
    }
  };

  const handleStartAnamnesis = () => {
    if (!userInfo.first_name || !userInfo.last_name || !userInfo.email) {
      alert('Bitte geben Sie Ihre Daten ein.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email
    }));
    setShowWelcome(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSectionComplete = (section: QuestionSection): boolean => {
    return section.fields.every(field => {
      const value = formData[field.id];
      if (!field.required) return true;
      if (field.type === 'multi_select') {
        return Array.isArray(value) && value.length > 0;
      }
      if (field.type === 'text') {
        return typeof value === 'string' && value.trim().length > 0;
      }
      return value !== '' && value !== undefined;
    });
  };

  const allSectionsComplete = sections.every(section => isSectionComplete(section));
  const completedSectionsCount = sections.filter(section => isSectionComplete(section)).length;
  const progressPercentage = (completedSectionsCount / sections.length) * 100;

  const handleSubmit = async () => {
    if (!allSectionsComplete) {
      alert('Bitte beantworten Sie alle erforderlichen Fragen.');
      return;
    }

    setIsSubmitting(true);

    try {
      const typology = calculateTypology(formData as AnamnesisData);
      setTypologyResult(typology);

      const submissionData = {
        ...formData,
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

  if (showResults && typologyResult) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-400/10" />
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-300/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase backdrop-blur-sm mb-6 sm:mb-8 animate-fade-in">
                <CheckCircle2 size={16} />
                Profiling abgeschlossen
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 sm:mb-8 leading-tight animate-fade-in px-4" style={{ fontFamily: "'Inter', sans-serif", animationDelay: '0.1s' }}>
                Ihr persönliches Profil
              </h1>

              <div className="relative max-w-3xl mx-auto mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl blur-2xl" style={{ background: `linear-gradient(to right, ${typologyResult.primary_type_color}20, ${typologyResult.primary_type_color}20)` }} />
                <div className="relative backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 p-6 sm:p-8 md:p-10 lg:p-12" style={{
                  background: `linear-gradient(to bottom right, ${typologyResult.primary_type_color}10, ${typologyResult.primary_type_color}05)`,
                  borderColor: `${typologyResult.primary_type_color}30`
                }}>
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl" style={{
                      background: `linear-gradient(to bottom right, ${typologyResult.primary_type_color}, ${typologyResult.primary_type_color}CC)`
                    }}>
                      <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4" style={{ fontFamily: "'Inter', sans-serif", color: typologyResult.primary_type_color }}>
                    {typologyResult.primary_type_label}
                  </h2>

                  <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed font-medium px-2">
                    {typologyResult.primary_type_description}
                  </p>

                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-50" style={{
                    background: `linear-gradient(to right, ${typologyResult.primary_type_color}00, ${typologyResult.primary_type_color}50, ${typologyResult.primary_type_color}00)`,
                    maskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)'
                  }} />
                </div>
              </div>
            </div>

            {typologyResult.secondary_type && (
              <div className="mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/5 rounded-2xl sm:rounded-3xl blur-xl" />
                  <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-sm">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Sekundärer Einfluss</h3>
                    <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/70">{typologyResult.secondary_type_label}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="relative mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl blur-2xl" style={{ background: `linear-gradient(135deg, ${typologyResult.primary_type_color}10, transparent)` }} />
              <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border backdrop-blur-sm" style={{
                background: `linear-gradient(135deg, ${typologyResult.primary_type_color}06, transparent)`,
                borderColor: `${typologyResult.primary_type_color}20`
              }}>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0" style={{
                    background: `${typologyResult.primary_type_color}20`,
                    border: `2px solid ${typologyResult.primary_type_color}40`
                  }}>
                    <Target className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: typologyResult.primary_type_color }} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Ihr Coaching-Fokus
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm">Empfohlener Transformationsweg</p>
                  </div>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
                  {typologyResult.coaching_focus}
                </p>
              </div>
            </div>

            <div className="relative mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border backdrop-blur-sm" style={{
                background: `linear-gradient(to right, ${typologyResult.primary_type_color}05, ${typologyResult.primary_type_color}10, ${typologyResult.primary_type_color}05)`,
                borderColor: `${typologyResult.primary_type_color}20`
              }}>
                <div className="text-center">
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">Hallo {userInfo.first_name},</h4>
                  <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                    Ihre vollständige Analyse wurde gespeichert und wird an <span className="font-semibold" style={{ color: typologyResult.primary_type_color }}>{userInfo.email}</span> gesendet.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl blur-2xl" style={{ background: `linear-gradient(to right, transparent, ${typologyResult.primary_type_color}05, transparent)` }} />
              <div className="relative p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8" style={{
                  background: `${typologyResult.primary_type_color}20`,
                  border: `2px solid ${typologyResult.primary_type_color}40`
                }}>
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: typologyResult.primary_type_color }} strokeWidth={2} />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Bereit für Ihre Transformation?
                </h3>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
                  Erfahren Sie in einem persönlichen Gespräch, wie Sie Ihr volles Potenzial entfalten können.
                </p>
                <button
                  onClick={() => window.location.href = '/#booking'}
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 h-14 sm:h-16 px-8 sm:px-10 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 text-white"
                  style={{
                    background: `linear-gradient(to right, ${typologyResult.primary_type_color}, ${typologyResult.primary_type_color}CC)`,
                    boxShadow: `0 8px 32px ${typologyResult.primary_type_color}40`
                  }}
                >
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                  <span>Persönliches Coaching anfragen</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />

                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-400/10" />
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-300/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-4xl w-full">
            <div className="relative">
              <div className="text-center mb-10 sm:mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 mb-8 sm:mb-10 shadow-[0_20px_60px_rgba(251,146,60,0.4)] animate-pulse">
                  <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-black" strokeWidth={2.5} />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text mb-4 sm:mb-6 leading-tight px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Persönlicher Anamnesebogen
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-16 px-4">
                  Ein strukturiertes Profiling für Menschen, die wirklich verstanden werden wollen. Grundlage für ein klares, passendes Coaching.
                </p>
              </div>

              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-300/20 to-amber-400/20 rounded-2xl sm:rounded-3xl blur-2xl" />
                <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/20 backdrop-blur-xl">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Ihre Daten
                  </h2>

                  <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-10">
                    <div>
                      <label className="block text-white/90 text-xs sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wide">Vorname</label>
                      <input
                        type="text"
                        value={userInfo.first_name}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, first_name: e.target.value }))}
                        className="w-full h-14 sm:h-16 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-black/30 border-2 border-white/10 text-white text-base sm:text-lg placeholder-white/30 focus:border-amber-400/50 focus:bg-black/50 transition-all outline-none"
                        placeholder="Ihr Vorname"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 text-xs sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wide">Nachname</label>
                      <input
                        type="text"
                        value={userInfo.last_name}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, last_name: e.target.value }))}
                        className="w-full h-14 sm:h-16 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-black/30 border-2 border-white/10 text-white text-base sm:text-lg placeholder-white/30 focus:border-amber-400/50 focus:bg-black/50 transition-all outline-none"
                        placeholder="Ihr Nachname"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 text-xs sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wide">E-Mail</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full h-14 sm:h-16 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-black/30 border-2 border-white/10 text-white text-base sm:text-lg placeholder-white/30 focus:border-amber-400/50 focus:bg-black/50 transition-all outline-none"
                        placeholder="ihre.email@beispiel.de"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleStartAnamnesis}
                    disabled={!userInfo.first_name || !userInfo.last_name || !userInfo.email}
                    className="group relative w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-bold text-lg sm:text-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 shadow-[0_8px_32px_rgba(251,146,60,0.3)] hover:shadow-[0_12px_48px_rgba(251,146,60,0.5)] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      Profiling starten
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>

                  <p className="text-white/50 text-xs sm:text-sm text-center mt-5 sm:mt-6 leading-relaxed px-2">
                    3–6 Minuten · Vertraulich · Strukturiert · Keine medizinische Diagnose
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/bildschirmfoto_2026-01-02_um_22.35.10.png"
          alt="Anatoly Mook – Persönliches Profiling"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                Premium Profiling
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Persönlicher <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">Anamnesebogen</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
              Beantworten Sie die folgenden Fragen, um Ihr persönliches Profil zu erhalten
            </p>

            <div className="mt-6 sm:mt-8 max-w-xl mx-auto px-4">
              <div className="flex items-center justify-between text-xs sm:text-sm text-white/60 mb-2 sm:mb-3">
                <span>Fortschritt</span>
                <span className="font-bold text-amber-400">{completedSectionsCount} von {sections.length} Bereiche</span>
              </div>
              <div className="relative w-full h-2.5 sm:h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 ease-out rounded-full shadow-[0_0_20px_rgba(251,146,60,0.5)]"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-12">
            {sections.map((section, sectionIndex) => {
              const isExpanded = expandedSections.has(section.id);
              const isComplete = isSectionComplete(section);

              return (
                <div
                  key={section.id}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${sectionIndex * 0.05}s both`
                  }}
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full text-left touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <div className={`relative backdrop-blur-xl bg-white/5 border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] ${
                      isExpanded
                        ? 'border-amber-400/40 shadow-2xl'
                        : 'border-white/10 hover:border-white/20'
                    }`}>
                      <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6">
                        <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold shadow-lg transition-all duration-300 ${
                          isComplete
                            ? 'bg-gradient-to-br from-green-400 to-green-500 text-black'
                            : 'bg-gradient-to-br from-amber-400/20 to-orange-500/10 text-amber-400'
                        }`}>
                          {isComplete ? <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} /> : (sectionIndex + 1)}
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                              {section.category}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug">
                            {section.title}
                          </h3>
                        </div>

                        <div className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 ${
                          isExpanded ? 'rotate-180 bg-amber-400/20 border-amber-400/40' : 'group-hover:bg-white/15'
                        }`}>
                          {isExpanded ? (
                            <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" strokeWidth={2.5} />
                          ) : (
                            <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" strokeWidth={2.5} />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 sm:mt-4">
                      <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-5 md:p-6 space-y-6 sm:space-y-8">
                        {section.fields.map((field) => {
                          const value = formData[field.id];

                          if (field.type === 'single_choice' && field.options) {
                            return (
                              <div key={field.id}>
                                <label className="block text-base sm:text-lg font-bold text-white mb-4">
                                  {field.question} {field.required && <span className="text-amber-400">*</span>}
                                </label>
                                <div className="space-y-3">
                                  {field.options.map((option) => {
                                    const isSelected = value === option.value;
                                    return (
                                      <button
                                        key={option.value}
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleAnswer(field.id, option.value, e);
                                        }}
                                        className={`w-full p-4 sm:p-5 rounded-xl text-left transition-all duration-300 touch-manipulation active:scale-[0.98] ${
                                          isSelected
                                            ? 'bg-amber-400/20 border-2 border-amber-400/60 scale-[1.01]'
                                            : 'bg-black/40 border-2 border-white/20 hover:bg-black/60 hover:border-white/30 backdrop-blur-xl'
                                        }`}
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                      >
                                        <div className="flex items-start gap-3 sm:gap-4">
                                          <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
                                            isSelected ? 'border-amber-400 bg-amber-400/20' : 'border-white/40'
                                          }`}>
                                            {isSelected && <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-400" />}
                                          </div>
                                          <span className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                                            isSelected ? 'text-white font-semibold' : 'text-white/90'
                                          }`}>
                                            {option.label}
                                          </span>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }

                          if (field.type === 'multi_select' && field.options) {
                            return (
                              <div key={field.id}>
                                <label className="block text-base sm:text-lg font-bold text-white mb-4">
                                  {field.question} {field.required && <span className="text-amber-400">*</span>}
                                </label>
                                <div className="space-y-3">
                                  {field.options.map((option) => {
                                    const currentAnswers = (value as string[]) || [];
                                    const isSelected = currentAnswers.includes(option.value);
                                    return (
                                      <button
                                        key={option.value}
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          toggleMultiSelect(field.id, option.value, e);
                                        }}
                                        className={`w-full p-4 sm:p-5 rounded-xl text-left transition-all duration-300 touch-manipulation active:scale-[0.98] ${
                                          isSelected
                                            ? 'bg-amber-400/20 border-2 border-amber-400/60 scale-[1.01]'
                                            : 'bg-black/40 border-2 border-white/20 hover:bg-black/60 hover:border-white/30 backdrop-blur-xl'
                                        }`}
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                      >
                                        <div className="flex items-start gap-3 sm:gap-4">
                                          <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 flex items-center justify-center mt-0.5 transition-all ${
                                            isSelected ? 'bg-amber-400 border-amber-400' : 'border-white/40'
                                          }`}>
                                            {isSelected && <CheckCircle2 size={16} className="text-black" strokeWidth={3} />}
                                          </div>
                                          <span className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                                            isSelected ? 'text-white font-semibold' : 'text-white/90'
                                          }`}>
                                            {option.label}
                                          </span>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }

                          if (field.type === 'scale') {
                            const numValue = typeof value === 'number' ? value : 5;
                            return (
                              <div key={field.id}>
                                <label className="block text-base sm:text-lg font-bold text-white mb-4">
                                  {field.question}
                                </label>
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between text-sm text-white/60">
                                    <span>{field.minLabel}</span>
                                    <span className="text-2xl font-bold text-amber-400">{numValue}</span>
                                    <span>{field.maxLabel}</span>
                                  </div>
                                  <input
                                    type="range"
                                    min={field.min || 1}
                                    max={field.max || 10}
                                    value={numValue}
                                    onChange={(e) => handleAnswer(field.id, parseInt(e.target.value))}
                                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                                    style={{
                                      background: `linear-gradient(to right, rgb(251, 146, 60) 0%, rgb(251, 146, 60) ${((numValue - (field.min || 1)) / ((field.max || 10) - (field.min || 1))) * 100}%, rgba(255,255,255,0.1) ${((numValue - (field.min || 1)) / ((field.max || 10) - (field.min || 1))) * 100}%, rgba(255,255,255,0.1) 100%)`
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }

                          if (field.type === 'text') {
                            return (
                              <div key={field.id}>
                                <label className="block text-base sm:text-lg font-bold text-white mb-4">
                                  {field.question} {field.required && <span className="text-amber-400">*</span>}
                                </label>
                                <textarea
                                  value={value as string || ''}
                                  onChange={(e) => handleAnswer(field.id, e.target.value)}
                                  rows={4}
                                  className="w-full px-5 py-4 rounded-xl bg-black/40 border-2 border-white/20 text-white text-base placeholder-white/30 focus:border-amber-400/50 focus:bg-black/60 transition-all outline-none resize-none"
                                  placeholder="Ihre Antwort..."
                                />
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-300/20 to-amber-400/20 rounded-2xl sm:rounded-3xl blur-2xl" />
            <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-400/10 to-transparent border-2 border-amber-400/30 backdrop-blur-xl text-center">
              <button
                onClick={handleSubmit}
                disabled={!allSectionsComplete || isSubmitting}
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 h-14 sm:h-16 px-8 sm:px-10 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(251,146,60,0.3)] hover:shadow-[0_12px_48px_rgba(251,146,60,0.5)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                <span>{isSubmitting ? 'Wird analysiert...' : 'Auswertung anzeigen'}</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />

                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              <p className="text-white/60 text-xs sm:text-sm mt-5 sm:mt-6 px-4">
                {allSectionsComplete
                  ? 'Alle Bereiche ausgefüllt - bereit für Ihre Analyse'
                  : `Bitte beantworten Sie alle ${sections.length} Bereiche`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, rgb(251, 146, 60), rgb(249, 115, 22));
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(251, 146, 60, 0.5);
        }

        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, rgb(251, 146, 60), rgb(249, 115, 22));
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(251, 146, 60, 0.5);
        }
      `}</style>
    </div>
  );
}
