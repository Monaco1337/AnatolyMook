import { useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, CheckCircle2, Brain, ArrowRight } from 'lucide-react';
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

const FONT_HEAD = "'Montserrat', system-ui, -apple-system, sans-serif";
const FONT_BODY =
  "'Avenir Next', 'Avenir', 'Nunito Sans', 'Inter', system-ui, -apple-system, sans-serif";
const BRONZE = 'rgba(201, 155, 98, 0.95)';
const BRONZE_MUTED = 'rgba(214, 168, 94, 0.72)';
const BRONZE_LINE = 'rgba(214, 168, 94, 0.18)';
const BRONZE_SOFT = 'rgba(214, 168, 94, 0.1)';

/** Einzelbegriff subtil akzentuieren — kein Verlauf, kein Glow */
function Hl({ children }: { children: ReactNode }) {
  return <span style={{ color: BRONZE }}>{children}</span>;
}

function PremiumBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: 'url(/images/manifest/footer-stone-granite-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          opacity: 0.35,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 80% at 50% 22%, rgba(214,168,94,0.05) 0%, transparent 52%), radial-gradient(120% 85% at 50% 100%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 100%)',
        }}
      />
    </>
  );
}

/** Klarcheck: Lesetext warmes Ivory, Field leicht erhöhte Tiefe — weiterhin dunkel/premium */
const INPUT_CLASS =
  'w-full rounded-[12px] border antialiased px-4 py-3.5 text-[16px] sm:text-[15px] font-normal tracking-[0.012em] leading-[1.45] outline-none transition-[border-color,box-shadow,background-color] duration-200 ' +
  'bg-[rgba(17,15,13,0.82)] shadow-[inset_0_1px_0_rgba(255,245,228,0.055)] ' +
  'border-[rgba(214,168,94,0.2)] text-[rgba(251,246,237,0.97)] caret-[rgba(201,155,98,0.92)] placeholder-[rgba(230,215,188,0.48)] ' +
  'focus:border-[rgba(214,168,94,0.48)] focus:shadow-[inset_0_1px_0_rgba(255,242,226,0.07),0_0_0_1px_rgba(214,168,94,0.12)] ' +
  'focus-visible:outline-none';

const CARD_SHELL =
  'rounded-[16px] border backdrop-blur-[10px] ' +
  'bg-[linear-gradient(180deg,rgba(18,16,14,0.78)_0%,rgba(8,7,6,0.88)_100%)] ' +
  'border-[rgba(214,168,94,0.14)] shadow-[0_18px_48px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.03)]';

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
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const handleAnswer = (questionId: string, value: string | string[], e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleStartQuiz = () => {
    if (!userInfo.name || !userInfo.email) {
      alert('Bitte trage deinen Namen und deine E-Mail ein.');
      return;
    }
    setShowWelcome(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateResults = () => {
    let oldConsciousnessScore = 0;
    let newConsciousnessScore = 0;

    questions.forEach((question) => {
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

    const totalQuestions = questions.filter((q) => q.question_type === 'multiple_choice').length;
    const oldPercentage = Math.round((oldConsciousnessScore / (totalQuestions * 3)) * 100);
    const newPercentage = Math.round((newConsciousnessScore / (totalQuestions * 3)) * 100);

    let dominantType = 'transition';
    let resultText = '';

    if (newPercentage > oldPercentage + 20) {
      dominantType = 'new_consciousness';
      resultText =
        'Du lebst schon viel im neuen Bewusstsein: mit Selbstwahrnehmung, innerer Klarheit und der Bereitschaft, bewusster zu wählen statt automatisch zu reagieren. Mein Schwerpunkt für dich ist Vertiefung: dass diese Ausrichtung im Alltag stimmig wird und dich trägt.';
    } else if (oldPercentage > newPercentage + 20) {
      dominantType = 'old_consciousness';
      resultText =
        'Du bewegst dich überwiegend im gewohnten Bewusstsein — das ist kein Urteil, sondern ein ehrlicher Orientierungspunkt. Ich sehe Raum für mehr innere Freiheit und klare Orientierung; der nächste stabile Schritt entsteht, wenn du dich dem behutsam zuwendest.';
    } else {
      dominantType = 'transition';
      resultText =
        'Du stehst zwischen altem und neuem Bewusstsein: da ist schon Präsenz — und noch gewohnte Muster. Genau in dieser Phase beginnt oft echte Transformation; ich helfe dir, Klarheit darüber zu gewinnen, was jetzt den größten Hebel hat.';
    }

    return {
      oldConsciousnessScore,
      newConsciousnessScore,
      oldPercentage,
      newPercentage,
      dominantType,
      resultText,
    };
  };

  const handleSubmit = () => {
    const allAnswered = questions.every((q) => answers[q.id]);
    if (!allAnswered) {
      alert('Bitte beantworte alle Fragen.');
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
        result_text: calculatedResults.resultText,
      })
      .then(({ error }) => {
        if (error) {
          console.error('Error saving quiz to database:', error);
        }
      });
  };

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#050505' }}>
        <PremiumBackdrop />
        <div
          className="relative z-[1] flex min-h-screen items-center justify-center px-6"
          style={{ fontFamily: FONT_BODY, color: 'rgba(244,239,230,0.55)' }}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent border-[rgba(214,168,94,0.28)]" aria-hidden />
          <span className="sr-only">Lädt …</span>
        </div>
      </div>
    );
  }

  if (showResults && results) {
    const getTypeName = () => {
      if (results.dominantType === 'new_consciousness') return 'Klare Ausrichtung';
      if (results.dominantType === 'old_consciousness') return 'Gewohnter Boden';
      return 'Im Übergang';
    };

    const getTypeDescription = () => {
      if (results.dominantType === 'new_consciousness') {
        return (
          <>
            Ich sehe bei dir einen starken Zugang zu Ruhe und bewusster Gestaltung — mit Fokus auf{' '}
            <Hl>Tragfähigkeit</Hl> im Alltag.
          </>
        );
      }
      if (results.dominantType === 'old_consciousness') {
        return (
          <>
            Ich sehe bei dir den gewohnten Pol — und Potenzial für mehr <Hl>Klarheit</Hl> und{' '}
            <Hl>Stabilität</Hl>, Schritt für Schritt.
          </>
        );
      }
      return (
        <>
          Du bewegst dich zwischen Mustern und neuer <Hl>Präsenz</Hl> — hier ist viel Kraft für den{' '}
          <Hl>nächsten Schritt</Hl>.
        </>
      );
    };

    return (
      <div className="relative min-h-screen overflow-hidden text-white" style={{ backgroundColor: '#050505' }}>
        <PremiumBackdrop />
        <div
          className="relative z-[1] mx-auto max-w-2xl px-5 pb-16 pt-[4.5rem] sm:pt-24 md:max-w-3xl md:px-8"
          style={{ fontFamily: FONT_BODY }}
        >
          <div className="mb-8 text-center">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
              style={{ borderColor: BRONZE_LINE, background: 'rgba(12,11,10,0.55)' }}
            >
              <CheckCircle2 size={14} strokeWidth={1.65} style={{ color: BRONZE }} aria-hidden />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.22em]"
                style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
              >
                Auswertung
              </span>
            </div>
            <h1
              className="m-0 mb-2 text-[1.5rem] font-light leading-snug tracking-[-0.02em] sm:text-[1.75rem] md:text-[1.9rem]"
              style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.96)' }}
            >
              Dein Bewusstseins-Muster
            </h1>
            <p className="mx-auto m-0 max-w-md text-[13.5px] font-light leading-[1.55]" style={{ color: 'rgba(244,239,230,0.52)' }}>
              Kurz gefasst, ehrlich formuliert — als erste Orientierung, nicht als Etikett.
            </p>
          </div>

          <div className={`${CARD_SHELL} mb-5 px-5 py-6 text-center sm:px-6`}>
            <div className="mb-4 flex justify-center">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-[11px] border"
                style={{ borderColor: BRONZE_LINE, background: BRONZE_SOFT, color: BRONZE }}
              >
                <Brain size={22} strokeWidth={1.65} aria-hidden />
              </span>
            </div>
            <h2
              className="m-0 mb-2 text-[1.35rem] font-normal leading-tight sm:text-[1.45rem]"
              style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.95)' }}
            >
              {getTypeName()}
            </h2>
            <p className="m-0 text-[14px] font-light leading-[1.6]" style={{ color: 'rgba(244,239,230,0.62)' }}>
              {getTypeDescription()}
            </p>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3 sm:gap-4">
            <div className={`${CARD_SHELL} px-4 py-4 text-center sm:py-5`}>
              <p
                className="m-0 mb-3 text-[9.5px] font-medium uppercase tracking-[0.2em]"
                style={{ fontFamily: FONT_HEAD, color: 'rgba(238,230,216,0.45)' }}
              >
                Gewohnter Pol
              </p>
              <p
                className="m-0 text-[2rem] font-light tabular-nums leading-none sm:text-[2.25rem]"
                style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.35)' }}
              >
                {results.oldPercentage}
                <span className="text-[0.55em] font-light">%</span>
              </p>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${results.oldPercentage}%`, background: 'rgba(255,255,255,0.12)' }}
                />
              </div>
            </div>
            <div className={`${CARD_SHELL} px-4 py-4 text-center sm:py-5`}>
              <p
                className="m-0 mb-3 text-[9.5px] font-medium uppercase tracking-[0.2em]"
                style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
              >
                Neue Klarheit
              </p>
              <p
                className="m-0 text-[2rem] font-light tabular-nums leading-none sm:text-[2.25rem]"
                style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.92)' }}
              >
                {results.newPercentage}
                <span className="text-[0.55em] font-light" style={{ color: BRONZE_MUTED }}>
                  %
                </span>
              </p>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[rgba(214,168,94,0.12)]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${results.newPercentage}%`, background: BRONZE }}
                />
              </div>
            </div>
          </div>

          <div className={`${CARD_SHELL} mb-6 px-5 py-5 sm:px-6`}>
            <div className="mb-4 flex items-start gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border"
                style={{ borderColor: BRONZE_LINE, background: BRONZE_SOFT, color: BRONZE }}
              >
                <Brain size={17} strokeWidth={1.65} aria-hidden />
              </span>
              <div>
                <h3 className="m-0 mb-1 text-[0.95rem] font-normal" style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.94)' }}>
                  Meine Einordnung
                </h3>
                <p className="m-0 text-[11.5px] font-light leading-relaxed" style={{ color: 'rgba(238,230,216,0.42)' }}>
                  Aus deinen Antworten — ohne Anspruch auf Endgültigkeit.
                </p>
              </div>
            </div>
            <p className="m-0 text-[14px] font-light leading-[1.62]" style={{ color: 'rgba(244,239,230,0.68)' }}>
              {results.resultText}
            </p>
          </div>

          <div className={`${CARD_SHELL} mb-8 px-5 py-5 text-center sm:px-6`}>
            <p className="m-0 mb-2 text-[14px] font-light" style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.92)' }}>
              Hallo {userInfo.name},
            </p>
            <p className="m-0 text-[13.25px] font-light leading-[1.58]" style={{ color: 'rgba(244,239,230,0.58)' }}>
              Deine Antworten habe ich gespeichert. Wenn du diese <Hl>Orientierung</Hl> vertiefen willst, schreib mir
              gern — ich melde mich persönlich. Alternativ kannst du direkt ein Gespräch buchen.
            </p>
          </div>

          <div className="text-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-[13px] border px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-[background,border-color] duration-200"
              style={{
                fontFamily: FONT_HEAD,
                borderColor: 'rgba(214,168,94,0.32)',
                color: 'rgba(12,8,6,0.9)',
                background: 'linear-gradient(180deg, rgba(214,168,94,0.92) 0%, rgba(150,104,56,0.88) 100%)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,228,196,0.18)',
              }}
            >
              <Brain size={15} strokeWidth={1.9} aria-hidden />
              Gespräch mit mir anfragen
              <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </Link>
            <div className="mt-4">
              <Link
                to="/booking"
                className="text-[12px] font-light underline-offset-4 transition-opacity hover:opacity-90"
                style={{ color: BRONZE_MUTED }}
              >
                Oder Termin buchen →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="relative min-h-screen overflow-hidden text-white" style={{ backgroundColor: '#050505' }}>
        <PremiumBackdrop />
        <div
          className="relative z-[1] mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-12 sm:max-w-[26rem] sm:py-16 md:max-w-[28rem]"
          style={{ fontFamily: FONT_BODY }}
        >
          <div className="mb-7 text-center sm:mb-8">
            <div className="mb-5 flex justify-center">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] border sm:h-[3.35rem] sm:w-[3.35rem]"
                style={{
                  borderColor: BRONZE_LINE,
                  background: BRONZE_SOFT,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
                  color: BRONZE,
                }}
              >
                <Brain size={24} strokeWidth={1.65} aria-hidden />
              </span>
            </div>

            <p
              className="m-0 mb-3 text-[10px] font-medium uppercase tracking-[0.26em]"
              style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
            >
              Klarcheck
            </p>
            <h1
              className="m-0 mb-3 text-[1.625rem] font-light leading-snug tracking-[-0.02em] sm:text-[1.85rem]"
              style={{
                fontFamily: FONT_HEAD,
                color: 'rgba(248,243,232,0.96)',
                textShadow: '0 1px 0 rgba(20,12,6,0.45)',
              }}
            >
              Bewusstseins-Analyse
            </h1>
            <p className="m-0 text-[13.75px] font-light leading-[1.58] sm:text-[14px]" style={{ color: 'rgba(244,239,230,0.56)' }}>
              Ich habe diese Fragen bewusst klar gehalten — es geht um eine erste{' '}
              <Hl>Orientierung</Hl>, wo <Hl>Klarheit</Hl>, <Hl>Stabilität</Hl> und dein{' '}
              <Hl>nächster Schritt</Hl> zusammenkommen — nicht um eine Diagnose.
            </p>
          </div>

          <div className={`${CARD_SHELL} px-5 py-6 sm:px-6 sm:py-7`}>
            <h2
              className="m-0 mb-5 text-center text-[1rem] font-normal sm:text-[1.05rem]"
              style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.95)' }}
            >
              Deine Angaben
            </h2>

            <div className="mb-5 space-y-4">
              <div>
                <label
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em]"
                  style={{ fontFamily: FONT_BODY, color: BRONZE_MUTED }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo((prev) => ({ ...prev, name: e.target.value }))}
                  className={INPUT_CLASS}
                  placeholder="Vor- und Nachname"
                  autoComplete="name"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em]"
                  style={{ fontFamily: FONT_BODY, color: BRONZE_MUTED }}
                >
                  E-Mail
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
                  className={INPUT_CLASS}
                  placeholder="deine@adresse.de"
                  autoComplete="email"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartQuiz}
              disabled={!userInfo.name || !userInfo.email}
              className="flex w-full items-center justify-center gap-2 rounded-[13px] border px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-[opacity,box-shadow] duration-200 disabled:cursor-not-allowed disabled:opacity-35"
              style={{
                fontFamily: FONT_HEAD,
                borderColor: 'rgba(214,168,94,0.32)',
                color: 'rgba(12,8,6,0.9)',
                background: 'linear-gradient(180deg, rgba(214,168,94,0.94) 0%, rgba(150,104,56,0.88) 100%)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,228,196,0.18)',
              }}
            >
              Weiter zum Klarcheck
              <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </button>

            <p className="m-0 mt-4 text-center text-[11px] font-light leading-[1.45]" style={{ color: 'rgba(238,230,216,0.4)' }}>
              Deine Daten behandle ich vertraulich — nur für diese Auswertung.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progressPercentage = questions.length ? (answeredCount / questions.length) * 100 : 0;

  return (
    <div className="relative min-h-screen overflow-hidden text-white" style={{ backgroundColor: '#050505' }}>
      <PremiumBackdrop />

      <div
        className="relative z-[1] mx-auto max-w-2xl px-5 pb-14 pt-[4.25rem] sm:pt-20 md:max-w-3xl md:px-8"
        style={{ fontFamily: FONT_BODY }}
      >
        <div className="mb-6 text-center sm:mb-8">
          <div className="mb-3 flex justify-center">
            <span
              className="rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em]"
              style={{ fontFamily: FONT_HEAD, borderColor: BRONZE_LINE, color: BRONZE_MUTED, background: 'rgba(12,11,10,0.5)' }}
            >
              Klarcheck
            </span>
          </div>
          <h1
            className="m-0 mb-2 text-[1.45rem] font-light leading-snug tracking-[-0.02em] sm:text-[1.65rem] md:text-[1.75rem]"
            style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.96)' }}
          >
            Ein paar Fragen zu deinem <Hl>Bewusstsein</Hl>
          </h1>
          <p className="mx-auto m-0 max-w-lg text-[13.5px] font-light leading-[1.55]" style={{ color: 'rgba(244,239,230,0.54)' }}>
            Nimm dir die Zeit, die du brauchst. Ich werte aus, was sich aus deinen Antworten ergibt — ruhig und präzise.
          </p>

          <div className="mx-auto mt-5 max-w-md">
            <div className="mb-1.5 flex items-center justify-between text-[11px]" style={{ color: 'rgba(238,230,216,0.45)' }}>
              <span>Fortschritt</span>
              <span style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }} className="tabular-nums font-medium uppercase tracking-[0.08em]">
                {answeredCount} / {questions.length}
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
              <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%`, background: BRONZE }} />
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-3 sm:mb-10 sm:space-y-3.5">
          {questions.map((question, index) => {
            const isExpanded = expandedQuestions.has(question.id);
            const isAnswered = !!answers[question.id];

            return (
              <div key={question.id}>
                <button
                  type="button"
                  onClick={() => toggleQuestion(question.id)}
                  className="w-full text-left touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div
                    className={`overflow-hidden rounded-[14px] border transition-[border-color,background] duration-200 backdrop-blur-[10px] ${
                      isExpanded ? '' : ''
                    }`}
                    style={{
                      borderColor: isExpanded ? 'rgba(214,168,94,0.28)' : BRONZE_LINE,
                      background: isExpanded ? 'rgba(18,16,14,0.65)' : 'rgba(12,11,10,0.42)',
                      boxShadow: isExpanded ? '0 12px 32px rgba(0,0,0,0.28)' : 'none',
                    }}
                  >
                    <div className="flex items-start gap-2.5 p-3.5 sm:gap-3 sm:p-4">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border text-[13px] font-medium sm:h-[2.65rem] sm:w-[2.65rem]"
                        style={{
                          fontFamily: FONT_HEAD,
                          borderColor: isAnswered ? 'rgba(214,168,94,0.35)' : BRONZE_LINE,
                          background: isAnswered ? BRONZE_SOFT : 'rgba(0,0,0,0.2)',
                          color: isAnswered ? BRONZE : 'rgba(248,243,232,0.42)',
                        }}
                      >
                        {isAnswered ? <CheckCircle2 className="h-5 w-5" strokeWidth={1.7} aria-hidden /> : index + 1}
                      </span>
                      <div className="min-w-0 flex-1 pr-6">
                        <h3 className="m-0 text-[14px] font-normal leading-snug sm:text-[15px]" style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.94)' }}>
                          {question.question_text}
                        </h3>
                      </div>
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200"
                        style={{
                          borderColor: BRONZE_LINE,
                          background: 'rgba(0,0,0,0.2)',
                          transform: isExpanded ? 'rotate(180deg)' : 'none',
                          color: BRONZE_MUTED,
                        }}
                      >
                        {isExpanded ? <Minus className="h-4 w-4" strokeWidth={1.85} aria-hidden /> : <Plus className="h-4 w-4" strokeWidth={1.85} aria-hidden />}
                      </span>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-2 overflow-hidden rounded-[14px]">
                    {question.image_url && (
                      <div className="relative mb-3 h-36 overflow-hidden rounded-[12px] sm:h-44">
                        <img src={question.image_url} alt="" className="h-full w-full object-cover" loading="lazy" />
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.65) 0%, transparent 50%)' }}
                        />
                      </div>
                    )}

                    <div
                      className="rounded-[14px] border px-4 py-4 backdrop-blur-[10px] sm:px-5 sm:py-4"
                      style={{
                        borderColor: BRONZE_LINE,
                        background: 'linear-gradient(180deg, rgba(14,13,11,0.88) 0%, rgba(8,7,6,0.9) 100%)',
                      }}
                    >
                      <div className="mb-3">
                        <span
                          className="inline-block rounded-full border px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em]"
                          style={{ fontFamily: FONT_HEAD, borderColor: BRONZE_LINE, color: BRONZE_MUTED, background: 'rgba(10,9,8,0.6)' }}
                        >
                          {question.category}
                        </span>
                      </div>

                      {question.question_type === 'multiple_choice' ? (
                        <div className="space-y-2">
                          {question.options.map((option: any, idx: number) => {
                            const isSelected = answers[question.id] === option.value;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={(e) => handleAnswer(question.id, option.value, e)}
                                className="w-full rounded-[11px] border px-3.5 py-3 text-left transition-[border-color,background] duration-200 touch-manipulation sm:py-3"
                                style={{
                                  WebkitTapHighlightColor: 'transparent',
                                  borderColor: isSelected ? 'rgba(214,168,94,0.38)' : 'rgba(214,168,94,0.12)',
                                  background: isSelected ? 'rgba(214,168,94,0.08)' : 'rgba(10,9,8,0.55)',
                                }}
                              >
                                <div className="flex items-start gap-2.5">
                                  <span
                                    className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border"
                                    style={{
                                      borderColor: isSelected ? BRONZE : 'rgba(255,255,255,0.2)',
                                      background: isSelected ? BRONZE_SOFT : 'transparent',
                                    }}
                                  >
                                    {isSelected ? <span className="h-2 w-2 rounded-full" style={{ background: BRONZE }} /> : null}
                                  </span>
                                  <span
                                    className="text-[13.25px] font-light leading-[1.5] sm:text-[14px]"
                                    style={{
                                      fontFamily: FONT_BODY,
                                      color: isSelected ? 'rgba(248,243,232,0.95)' : 'rgba(244,239,230,0.74)',
                                    }}
                                  >
                                    {option.text}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {question.options.map((option: any, idx: number) => {
                            const currentAnswers = (answers[question.id] as string[]) || [];
                            const optLabel =
                              typeof option === 'string'
                                ? option
                                : String(option?.text ?? option?.label ?? option?.value ?? option);
                            const isSelected = currentAnswers.includes(optLabel);
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const newAnswers = isSelected
                                    ? currentAnswers.filter((o) => o !== optLabel)
                                    : [...currentAnswers, optLabel];
                                  handleAnswer(question.id, newAnswers, e);
                                }}
                                className="w-full rounded-[11px] border px-3.5 py-3 text-left transition-[border-color,background] duration-200 touch-manipulation sm:py-3"
                                style={{
                                  WebkitTapHighlightColor: 'transparent',
                                  borderColor: isSelected ? 'rgba(214,168,94,0.38)' : 'rgba(214,168,94,0.12)',
                                  background: isSelected ? 'rgba(214,168,94,0.08)' : 'rgba(10,9,8,0.55)',
                                }}
                              >
                                <div className="flex items-start gap-2.5">
                                  <span
                                    className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border"
                                    style={{
                                      borderColor: isSelected ? BRONZE : 'rgba(255,255,255,0.2)',
                                      background: isSelected ? BRONZE_SOFT : 'transparent',
                                    }}
                                  >
                                    {isSelected ? <CheckCircle2 className="h-3 w-3" style={{ color: BRONZE }} strokeWidth={2.5} aria-hidden /> : null}
                                  </span>
                                  <span
                                    className="text-[13.25px] font-light leading-[1.5] sm:text-[14px]"
                                    style={{
                                      fontFamily: FONT_BODY,
                                      color: isSelected ? 'rgba(248,243,232,0.95)' : 'rgba(244,239,230,0.74)',
                                    }}
                                  >
                                    {optLabel}
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

        <div className={`${CARD_SHELL} px-5 py-5 text-center sm:px-6`}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={answeredCount !== questions.length || isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-[13px] border px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-35 touch-manipulation"
            style={{
              WebkitTapHighlightColor: 'transparent',
              fontFamily: FONT_HEAD,
              borderColor: 'rgba(214,168,94,0.32)',
              color: 'rgba(12,8,6,0.9)',
              background: 'linear-gradient(180deg, rgba(214,168,94,0.94) 0%, rgba(150,104,56,0.88) 100%)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,228,196,0.18)',
            }}
          >
            {isSubmitting ? (
              'Wird vorbereitet …'
            ) : (
              <>
                Auswertung ansehen
                <ArrowRight size={14} strokeWidth={2} aria-hidden />
              </>
            )}
          </button>

          <p className="m-0 mt-4 text-[11px] font-light leading-relaxed" style={{ color: 'rgba(238,230,216,0.42)' }}>
            {answeredCount === questions.length
              ? 'Alle Fragen beantwortet — du kannst die Einordnung ansehen.'
              : `Noch ${questions.length - answeredCount} Frage${questions.length - answeredCount === 1 ? '' : 'n'}`}
          </p>
        </div>
      </div>

    </div>
  );
}
