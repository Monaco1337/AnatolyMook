import { useState, useEffect } from 'react';
import { Plus, Minus, CheckCircle2, Sparkles, Brain, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface QuizQuestion {
  id: string;
  order_number: number;
  question_text: string;
  question_type: 'multiple_choice' | 'multi_select';
  options: any[];
  category: string;
  image_url?: string;
}

interface QuizAnswers {
  [questionId: string]: string | string[];
}

export default function ConsciousnessQuiz() {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [showWelcome, setShowWelcome] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('consciousness_quiz_questions')
        .select('*')
        .order('order_number');

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const handleAnswer = (questionId: string, value: string | string[], e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleStartQuiz = () => {
    if (!userInfo.name || !userInfo.email) {
      alert('Bitte geben Sie Ihren Namen und E-Mail ein.');
      return;
    }
    setShowWelcome(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateResults = () => {
    let oldConsciousnessScore = 0;
    let newConsciousnessScore = 0;

    questions.forEach(question => {
      const answer = answers[question.id];
      if (!answer || question.question_type === 'multi_select') return;

      const selectedOption = question.options.find((opt: any) => opt.value === answer);
      if (selectedOption) {
        if (selectedOption.value === 'old') {
          oldConsciousnessScore += selectedOption.score || 0;
        } else if (selectedOption.value === 'new') {
          newConsciousnessScore += selectedOption.score || 0;
        }
      }
    });

    const totalQuestions = questions.filter(q => q.question_type === 'multiple_choice').length;
    const oldPercentage = Math.round((oldConsciousnessScore / (totalQuestions * 3)) * 100);
    const newPercentage = Math.round((newConsciousnessScore / (totalQuestions * 3)) * 100);

    let dominantType = 'transition';
    let resultText = '';

    if (newPercentage > oldPercentage + 20) {
      dominantType = 'new_consciousness';
      resultText = 'Sie leben bereits stark im neuen Bewusstsein. Sie zeigen eine hohe Selbstwahrnehmung, innere Klarheit und die Fähigkeit, bewusst zu wählen statt reaktiv zu handeln. Ihre nächste Ebene liegt in der Vertiefung und Verkörperung dieser Weisheit im Alltag.';
    } else if (oldPercentage > newPercentage + 20) {
      dominantType = 'old_consciousness';
      resultText = 'Sie befinden sich primär im alten Bewusstsein – das ist keine Kritik, sondern eine Einladung. Sie haben enormes Potenzial für Transformation. Der Weg zu mehr innerer Freiheit, Klarheit und Erfüllung steht Ihnen offen.';
    } else {
      dominantType = 'transition';
      resultText = 'Sie befinden sich in der Übergangsphase zwischen altem und neuem Bewusstsein. Sie haben bereits Bewusstheit entwickelt und gleichzeitig gibt es noch automatische Muster. Das ist der spannendste Moment – die echte Transformation beginnt.';
    }

    return {
      oldConsciousnessScore,
      newConsciousnessScore,
      oldPercentage,
      newPercentage,
      dominantType,
      resultText
    };
  };

  const handleSubmit = () => {
    const allAnswered = questions.every(q => answers[q.id]);
    if (!allAnswered) {
      alert('Bitte beantworten Sie alle Fragen.');
      return;
    }

    setIsSubmitting(true);

    const calculatedResults = calculateResults();

    setResults(calculatedResults);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSubmitting(false);

    supabase
      .from('consciousness_quiz_submissions')
      .insert({
        user_name: userInfo.name,
        user_email: userInfo.email,
        answers: answers,
        score_old_consciousness: calculatedResults.oldConsciousnessScore,
        score_new_consciousness: calculatedResults.newConsciousnessScore,
        dominant_type: calculatedResults.dominantType,
        result_text: calculatedResults.resultText
      })
      .then(({ error }) => {
        if (error) {
          console.error('Error saving quiz to database:', error);
        }
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Lädt...</div>
      </div>
    );
  }

  if (showResults && results) {
    const getTypeName = () => {
      if (results.dominantType === 'new_consciousness') return 'Der Bewusste';
      if (results.dominantType === 'old_consciousness') return 'Der Suchende';
      return 'Der Transformierende';
    };

    const getTypeDescription = () => {
      if (results.dominantType === 'new_consciousness') {
        return 'Sie haben bereits einen tiefen Zugang zu innerem Frieden und bewusster Gestaltung Ihres Lebens.';
      }
      if (results.dominantType === 'old_consciousness') {
        return 'Sie stehen am Anfang einer kraftvollen Reise zu mehr Klarheit und innerer Freiheit.';
      }
      return 'Sie befinden sich in einer spannenden Transformationsphase voller Potenzial.';
    };

    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-400/10" />
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-300/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase backdrop-blur-sm mb-6 sm:mb-8 animate-fade-in">
                <CheckCircle2 size={16} />
                Analyse abgeschlossen
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 sm:mb-8 leading-tight animate-fade-in px-4" style={{ fontFamily: "'Inter', sans-serif", animationDelay: '0.1s' }}>
                Ihr Bewusstseins-Typ
              </h1>

              <div className="relative max-w-3xl mx-auto mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-300/20 to-yellow-400/20 rounded-2xl sm:rounded-3xl blur-2xl" />
                <div className="relative bg-gradient-to-br from-yellow-400/10 via-yellow-500/5 to-yellow-400/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-yellow-400/30 p-6 sm:p-8 md:p-10 lg:p-12">
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-[0_8px_32px_rgba(250,204,21,0.4)]">
                      <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-black" strokeWidth={2.5} />
                    </div>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text mb-3 sm:mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {getTypeName()}
                  </h2>

                  <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed font-medium px-2">
                    {getTypeDescription()}
                  </p>

                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-yellow-400/0 via-yellow-400/50 to-yellow-400/0 opacity-50" style={{
                    maskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)'
                  }} />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500">
                  <div className="text-center">
                    <p className="text-white/40 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">Altes Bewusstsein</p>
                    <div className="relative inline-block mb-4 sm:mb-6">
                      <div className="text-6xl sm:text-7xl md:text-8xl font-black text-white/20" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {results.oldPercentage}
                      </div>
                      <span className="absolute -right-4 sm:-right-6 top-3 sm:top-4 text-2xl sm:text-3xl text-white/20 font-bold">%</span>
                    </div>
                    <div className="relative w-full h-2.5 sm:h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/40 transition-all duration-[2000ms] ease-out rounded-full"
                        style={{ width: `${results.oldPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-400/[0.12] to-yellow-400/[0.04] border-2 border-yellow-400/30 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-500 hover:scale-[1.02]">
                  <div className="text-center">
                    <p className="text-yellow-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">Neues Bewusstsein</p>
                    <div className="relative inline-block mb-4 sm:mb-6">
                      <div className="text-6xl sm:text-7xl md:text-8xl font-black text-yellow-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {results.newPercentage}
                      </div>
                      <span className="absolute -right-4 sm:-right-6 top-3 sm:top-4 text-2xl sm:text-3xl text-yellow-400 font-bold">%</span>
                    </div>
                    <div className="relative w-full h-2.5 sm:h-3 bg-yellow-400/20 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-[2000ms] ease-out rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)]"
                        style={{ width: `${results.newPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-yellow-400/10 to-yellow-400/5 rounded-2xl sm:rounded-3xl blur-2xl" />
              <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-400/[0.06] to-transparent border border-yellow-400/20 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-400/10 border border-yellow-400/30 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Ihre persönliche Analyse
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm">Individuelle Auswertung basierend auf Ihren Antworten</p>
                  </div>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
                  {results.resultText}
                </p>
              </div>
            </div>

            <div className="relative mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-yellow-400/5 via-yellow-500/10 to-yellow-400/5 border border-yellow-400/20 backdrop-blur-sm">
                <div className="text-center">
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">Hallo {userInfo.name},</h4>
                  <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                    Ihre ausführliche Analyse mit personalisierten Empfehlungen wird an <span className="text-yellow-400 font-semibold">{userInfo.email}</span> gesendet
                  </p>
                </div>
              </div>
            </div>

            <div className="relative text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent rounded-2xl sm:rounded-3xl blur-2xl" />
              <div className="relative p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" strokeWidth={2} />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Bereit für Ihre Transformation?
                </h3>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
                  Erfahren Sie in einem persönlichen Gespräch, wie Sie Ihr volles Potenzial entfalten und die nächste Bewusstseins-Stufe erreichen können.
                </p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 h-14 sm:h-16 px-8 sm:px-10 rounded-xl sm:rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(250,204,21,0.3)] hover:shadow-[0_12px_48px_rgba(250,204,21,0.5)]"
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
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-400/10" />
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-300/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-4xl w-full">
            <div className="relative">
              <div className="text-center mb-10 sm:mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-500 mb-8 sm:mb-10 shadow-[0_20px_60px_rgba(250,204,21,0.4)] animate-pulse">
                  <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-black" strokeWidth={2.5} />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text mb-4 sm:mb-6 leading-tight px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Bewusstseins-Analyse
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-16 px-4">
                  Entdecken Sie Ihren aktuellen Bewusstseins-Zustand und erhalten Sie eine persönliche Auswertung mit tiefgreifenden Erkenntnissen
                </p>
              </div>

              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-300/20 to-yellow-400/20 rounded-2xl sm:rounded-3xl blur-2xl" />
                <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/20 backdrop-blur-xl">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Ihre Daten
                  </h2>

                  <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-10">
                    <div>
                      <label className="block text-white/90 text-xs sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wide">Ihr Name</label>
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full h-14 sm:h-16 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-black/30 border-2 border-white/10 text-white text-base sm:text-lg placeholder-white/30 focus:border-yellow-400/50 focus:bg-black/50 transition-all outline-none"
                        placeholder="Max Mustermann"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 text-xs sm:text-sm font-bold mb-2 sm:mb-3 uppercase tracking-wide">Ihre E-Mail</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full h-14 sm:h-16 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-black/30 border-2 border-white/10 text-white text-base sm:text-lg placeholder-white/30 focus:border-yellow-400/50 focus:bg-black/50 transition-all outline-none"
                        placeholder="mail@beispiel.de"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleStartQuiz}
                    disabled={!userInfo.name || !userInfo.email}
                    className="group relative w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold text-lg sm:text-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 shadow-[0_8px_32px_rgba(250,204,21,0.3)] hover:shadow-[0_12px_48px_rgba(250,204,21,0.5)] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      Quiz starten
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>

                  <p className="text-white/50 text-xs sm:text-sm text-center mt-5 sm:mt-6 leading-relaxed px-2">
                    Ihre Daten werden vertraulich behandelt und nur für die Analyse verwendet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/bildschirmfoto_2025-12-18_um_21.42.41.png"
          alt="Anatoly Mook – Bewusstseinsquiz zur Selbstreflexion und persönlichen Entwicklung"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                Bewusstseins-Quiz
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Entdecken Sie Ihren <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">Bewusstseins-Level</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
              Beantworten Sie die folgenden Fragen, um Ihre persönliche Analyse zu erhalten
            </p>

            <div className="mt-6 sm:mt-8 max-w-xl mx-auto px-4">
              <div className="flex items-center justify-between text-xs sm:text-sm text-white/60 mb-2 sm:mb-3">
                <span>Fortschritt</span>
                <span className="font-bold text-yellow-400">{answeredCount} von {questions.length} beantwortet</span>
              </div>
              <div className="relative w-full h-2.5 sm:h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500 ease-out rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)]"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-12">
            {questions.map((question, index) => {
              const isExpanded = expandedQuestions.has(question.id);
              const isAnswered = !!answers[question.id];

              return (
                <div
                  key={question.id}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                  }}
                >
                  <button
                    onClick={() => toggleQuestion(question.id)}
                    className="w-full text-left touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <div className={`relative backdrop-blur-xl bg-white/5 border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] ${
                      isExpanded
                        ? 'border-yellow-400/40 shadow-2xl'
                        : 'border-white/10 hover:border-white/20'
                    }`}>
                      <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6">
                        <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold shadow-lg transition-all duration-300 ${
                          isAnswered
                            ? 'bg-gradient-to-br from-green-400 to-green-500 text-black'
                            : 'bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 text-yellow-400'
                        }`}>
                          {isAnswered ? <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} /> : (index + 1)}
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug">
                            {question.question_text}
                          </h3>
                        </div>

                        <div className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 ${
                          isExpanded ? 'rotate-180 bg-yellow-400/20 border-yellow-400/40' : 'group-hover:bg-white/15'
                        }`}>
                          {isExpanded ? (
                            <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" strokeWidth={2.5} />
                          ) : (
                            <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" strokeWidth={2.5} />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 sm:mt-4 relative overflow-hidden rounded-xl sm:rounded-2xl">
                      {question.image_url && (
                        <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden mb-4 sm:mb-5 rounded-xl sm:rounded-2xl">
                          <img
                            src={question.image_url}
                            alt={question.question_text}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        </div>
                      )}

                      <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-5 md:p-6">
                        <div className="mb-4 sm:mb-5">
                          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-xl bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 text-xs font-bold tracking-wide uppercase">
                            {question.category}
                          </span>
                        </div>

                        {question.question_type === 'multiple_choice' ? (
                          <div className="space-y-3 sm:space-y-4">
                            {question.options.map((option: any, idx: number) => {
                              const isSelected = answers[question.id] === option.value;
                              return (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleAnswer(question.id, option.value, e);
                                  }}
                                  className={`w-full group/option relative p-4 sm:p-5 rounded-xl text-left transition-all duration-300 touch-manipulation active:scale-[0.98] ${
                                    isSelected
                                      ? 'bg-yellow-400/20 border-2 border-yellow-400/60 scale-[1.01]'
                                      : 'bg-black/40 border-2 border-white/20 hover:bg-black/60 hover:border-white/30 backdrop-blur-xl'
                                  }`}
                                  style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                  <div className="flex items-start gap-3 sm:gap-4">
                                    <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
                                      isSelected ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'
                                    }`}>
                                      {isSelected && <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-400" />}
                                    </div>
                                    <span className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                                      isSelected ? 'text-white font-semibold' : 'text-white/90'
                                    }`}>
                                      {option.text}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="space-y-3 sm:space-y-4">
                            {question.options.map((option: any, idx: number) => {
                              const currentAnswers = (answers[question.id] as string[]) || [];
                              const isSelected = currentAnswers.includes(option);
                              return (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const newAnswers = isSelected
                                      ? currentAnswers.filter(o => o !== option)
                                      : [...currentAnswers, option];
                                    handleAnswer(question.id, newAnswers, e);
                                  }}
                                  className={`w-full group/option relative p-4 sm:p-5 rounded-xl text-left transition-all duration-300 touch-manipulation active:scale-[0.98] ${
                                    isSelected
                                      ? 'bg-yellow-400/20 border-2 border-yellow-400/60 scale-[1.01]'
                                      : 'bg-black/40 border-2 border-white/20 hover:bg-black/60 hover:border-white/30 backdrop-blur-xl'
                                  }`}
                                  style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                  <div className="flex items-start gap-3 sm:gap-4">
                                    <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 flex items-center justify-center mt-0.5 transition-all ${
                                      isSelected ? 'bg-yellow-400 border-yellow-400' : 'border-white/40'
                                    }`}>
                                      {isSelected && <CheckCircle2 size={16} className="text-black" strokeWidth={3} />}
                                    </div>
                                    <span className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                                      isSelected ? 'text-white font-semibold' : 'text-white/90'
                                    }`}>
                                      {option}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-300/20 to-yellow-400/20 rounded-2xl sm:rounded-3xl blur-2xl" />
            <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-400/10 to-transparent border-2 border-yellow-400/30 backdrop-blur-xl text-center">
              <button
                onClick={handleSubmit}
                disabled={answeredCount !== questions.length || isSubmitting}
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 h-14 sm:h-16 px-8 sm:px-10 rounded-xl sm:rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(250,204,21,0.3)] hover:shadow-[0_12px_48px_rgba(250,204,21,0.5)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                <span>{isSubmitting ? 'Wird ausgewertet...' : 'Auswertung anzeigen'}</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />

                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              <p className="text-white/60 text-xs sm:text-sm mt-5 sm:mt-6 px-4">
                {answeredCount === questions.length
                  ? 'Alle Fragen beantwortet - bereit für Ihre Analyse'
                  : `Bitte beantworten Sie alle ${questions.length} Fragen`
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
      `}</style>
    </div>
  );
}
