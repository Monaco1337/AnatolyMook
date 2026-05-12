import { useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, CheckCircle2, Brain, ArrowRight, Target } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { calculateTypology, type AnamnesisData, type TypologyResult } from '../utils/typologyCalculator';

const FONT_HEAD = "'Montserrat', system-ui, -apple-system, sans-serif";
const FONT_BODY =
  "'Avenir Next', 'Avenir', 'Nunito Sans', 'Inter', system-ui, -apple-system, sans-serif";
const BRONZE = 'rgba(201, 155, 98, 0.95)';
const BRONZE_MUTED = 'rgba(214, 168, 94, 0.72)';
const BRONZE_LINE = 'rgba(214, 168, 94, 0.18)';
const BRONZE_SOFT = 'rgba(214, 168, 94, 0.1)';

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
          opacity: 0.35,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 76% at 50% 20%, rgba(214,168,94,0.05) 0%, transparent 52%), radial-gradient(120% 85% at 50% 100%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 100%)',
        }}
      />
    </>
  );
}

/** Anamnese: gleiche Premium-Input-Logik wie Klarcheck — Lesbarkeit & Kontrast */
const INPUT_FIELD =
  'w-full rounded-[12px] border antialiased px-4 py-3.5 text-[16px] sm:text-[15px] font-normal tracking-[0.012em] leading-[1.45] outline-none transition-[border-color,box-shadow,background-color] duration-200 ' +
  'bg-[rgba(17,15,13,0.82)] shadow-[inset_0_1px_0_rgba(255,245,228,0.055)] ' +
  'border-[rgba(214,168,94,0.2)] text-[rgba(251,246,237,0.97)] caret-[rgba(201,155,98,0.92)] placeholder-[rgba(230,215,188,0.48)] ' +
  'focus:border-[rgba(214,168,94,0.48)] focus:shadow-[inset_0_1px_0_rgba(255,242,226,0.07),0_0_0_1px_rgba(214,168,94,0.12)] ' +
  'focus-visible:outline-none';

const CARD_GLASS =
  'rounded-[16px] border backdrop-blur-[10px] ' +
  'bg-[linear-gradient(180deg,rgba(18,16,14,0.76)_0%,rgba(8,7,6,0.88)_100%)] ' +
  'border-[rgba(214,168,94,0.14)] shadow-[0_18px_48px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.03)]';

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
    readiness_to_examine: 5,
  });

  const sections: QuestionSection[] = [
    {
      id: 'section1',
      title: 'Kontext — wo du gerade stehst',
      category: 'Orientierung',
      fields: [
        {
          id: 'inquiry_type',
          question: 'Wobei soll ich dich zuerst einordnen?',
          type: 'single_choice',
          options: [
            { value: 'coaching', label: 'Coaching' },
            { value: 'seminar', label: 'Seminar' },
            { value: 'business', label: 'Business' },
            { value: 'orientation', label: 'Orientierung' },
          ],
          required: true,
        },
        {
          id: 'life_situation',
          question: 'Was beschreibt deine Situation am ehesten? (Mehrfach möglich)',
          type: 'multi_select',
          options: [
            { value: 'career_transition', label: 'Berufliche Neuorientierung' },
            { value: 'leadership_challenge', label: 'Führungsherausforderung' },
            { value: 'life_crisis', label: 'Lebenskrise' },
            { value: 'relationship_issues', label: 'Beziehungsthemen' },
            { value: 'meaning_search', label: 'Sinnsuche' },
            { value: 'burnout_prevention', label: 'Burnout-Prävention' },
            { value: 'personal_growth', label: 'Persönliche Entwicklung' },
            { value: 'entrepreneurship', label: 'Selbstständigkeit' },
          ],
          required: true,
        },
        {
          id: 'primary_role',
          question: 'Deine Hauptrolle im Moment',
          type: 'single_choice',
          options: [
            { value: 'executive', label: 'Geschäftsführung / C-Level' },
            { value: 'manager', label: 'Führungskraft' },
            { value: 'self_employed', label: 'Selbstständig / Unternehmer' },
            { value: 'employee', label: 'Angestellt' },
            { value: 'private', label: 'Privatperson' },
            { value: 'in_transition', label: 'In Übergangsphase' },
          ],
          required: true,
        },
      ],
    },
    {
      id: 'section2',
      title: 'Inneres Bild — Klarheit & Energie',
      category: 'Präsenz',
      fields: [
        {
          id: 'inner_clarity',
          question: 'Wie klar nimmst du dich und deine Situation gerade wahr?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Nebel',
          maxLabel: 'Glasklar',
        },
        {
          id: 'inner_stability',
          question: 'Wie stabil fühlt sich dein innerer Boden an?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Wankend',
          maxLabel: 'Sehr tragfähig',
        },
        {
          id: 'decision_capability',
          question: 'Wie leicht fällt es dir gerade zu entscheiden?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Schwer',
          maxLabel: 'Leicht',
        },
        {
          id: 'energy_level',
          question: 'Wie zugänglich ist dir gerade Kraft und Lebendigkeit?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Leer',
          maxLabel: 'Vital',
        },
      ],
    },
    {
      id: 'section3',
      title: 'Druck — wie du reagierst',
      category: 'Stabilität',
      fields: [
        {
          id: 'stress_reaction',
          question: 'Wenn es eng wird und Druck aufkommt …',
          type: 'single_choice',
          options: [
            { value: 'withdraw', label: 'Ziehe mich zurück' },
            { value: 'attack', label: 'Werde kämpferisch' },
            { value: 'freeze', label: 'Erstarre / blockiere' },
            { value: 'function', label: 'Funktioniere einfach weiter' },
            { value: 'seek_control', label: 'Versuche alles zu kontrollieren' },
          ],
          required: true,
        },
        {
          id: 'conflict_experience',
          question: 'In Konflikt erlebe ich mich eher als …',
          type: 'single_choice',
          options: [
            { value: 'aggressive', label: 'Durchsetzend' },
            { value: 'avoidant', label: 'Vermeidend' },
            { value: 'diplomatic', label: 'Vermittelnd' },
            { value: 'defensive', label: 'Defensiv' },
            { value: 'overwhelmed', label: 'Überfordert' },
          ],
          required: true,
        },
        {
          id: 'daily_feelings',
          question: 'Was beschreibt deinen Alltag am häufigsten? (Mehrfach möglich)',
          type: 'multi_select',
          options: [
            { value: 'pressure', label: 'Druck' },
            { value: 'emptiness', label: 'Leere' },
            { value: 'overwhelm', label: 'Überforderung' },
            { value: 'restlessness', label: 'Unruhe' },
            { value: 'dissatisfaction', label: 'Unzufriedenheit' },
            { value: 'joy', label: 'Freude' },
            { value: 'peace', label: 'Frieden' },
            { value: 'uncertainty', label: 'Unsicherheit' },
          ],
          required: true,
        },
      ],
    },
    {
      id: 'section4',
      title: 'Entscheiden & Handlung',
      category: 'Klarheit',
      fields: [
        {
          id: 'decision_style',
          question: 'Wichtige Entscheidungen triffst du eher …',
          type: 'single_choice',
          options: [
            { value: 'rational', label: 'Rational / aus dem Kopf' },
            { value: 'intuitive', label: 'Intuitiv / aus dem Bauch' },
            { value: 'external', label: 'Angelehnt an andere Meinungen' },
            { value: 'delayed', label: 'Schiebe sie auf' },
            { value: 'impulsive', label: 'Schnell und impulsiv' },
          ],
          required: true,
        },
        {
          id: 'self_trust_level',
          question: 'Wie sehr vertraust du dir gerade?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Kaum',
          maxLabel: 'Vollständig',
        },
        {
          id: 'uncertainty_reaction',
          question: 'Wenn du nicht weißt, was richtig ist …',
          type: 'single_choice',
          options: [
            { value: 'research', label: 'Recherchiere / sammle Infos' },
            { value: 'ask_others', label: 'Frage andere' },
            { value: 'wait', label: 'Warte ab' },
            { value: 'panic', label: 'Gerate in Stress' },
            { value: 'trust_feeling', label: 'Vertraue dem Gefühl' },
          ],
          required: true,
        },
      ],
    },
    {
      id: 'section5',
      title: 'Nähe & Nach außen',
      category: 'Beziehung',
      fields: [
        {
          id: 'closeness_difficulty',
          question: 'Nähe zu Menschen empfinde ich oft als …',
          type: 'single_choice',
          options: [
            { value: 'easy', label: 'Leicht' },
            { value: 'difficult', label: 'Schwer' },
            { value: 'context_dependent', label: 'Situationsabhängig' },
            { value: 'scary', label: 'Eher angespannt' },
            { value: 'natural', label: 'Selbstverständlich' },
          ],
          required: true,
        },
        {
          id: 'external_appearance',
          question: 'Nach außen wirkst du für andere eher …',
          type: 'single_choice',
          options: [
            { value: 'strong', label: 'Stark / souverän' },
            { value: 'friendly', label: 'Freundlich / offen' },
            { value: 'reserved', label: 'Zurückhaltend / kühl' },
            { value: 'insecure', label: 'Unsicher' },
            { value: 'authentic', label: 'Authentisch' },
          ],
          required: true,
        },
        {
          id: 'feedback_from_others',
          question: 'So höre ich es von anderen häufiger … (Mehrfach möglich)',
          type: 'multi_select',
          options: [
            { value: 'strong', label: '"Du bist stark"' },
            { value: 'sensitive', label: '"Du bist sensibel"' },
            { value: 'closed', label: '"Du wirfst verschlossen"' },
            { value: 'intense', label: '"Du bist intensiv"' },
            { value: 'distant', label: '"Du bist distanziert"' },
            { value: 'warm', label: '"Du bist herzlich"' },
            { value: 'confusing', label: '"Ich verstehe dich nicht"' },
          ],
          required: true,
        },
      ],
    },
    {
      id: 'section6',
      title: 'Sinn — Ausrichtung & Tiefe',
      category: 'Wahrheit',
      fields: [
        {
          id: 'on_my_path',
          question: '"Ich bin auf meinem Weg." — wie trifft das zu?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Kaum',
          maxLabel: 'Vollständig',
        },
        {
          id: 'change_is_coming',
          question: 'Ich spüre, dass sich etwas verändern will.',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Kaum',
          maxLabel: 'Sehr stark',
        },
        {
          id: 'functioning_vs_living',
          question: '"Ich funktioniere mehr, als ich wirklich lebe."',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Trifft nicht zu',
          maxLabel: 'Trifft voll zu',
        },
        {
          id: 'seeking_clarity',
          question: 'Ich verlange gerade nach Klarheit über mein Leben.',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Nein',
          maxLabel: 'Ja, sehr',
        },
      ],
    },
    {
      id: 'section7',
      title: 'Bereitschaft — dein nächster Schritt',
      category: 'Offenheit',
      fields: [
        {
          id: 'what_should_change',
          question: 'Was darf sich — behutsam und ehrlich — verändern?',
          type: 'text',
          required: true,
        },
        {
          id: 'what_must_not_stay',
          question: 'Was darf nicht unverändert bleiben, wenn du ehrlich bist?',
          type: 'text',
          required: true,
        },
        {
          id: 'readiness_to_examine',
          question: 'Wie bereit bist du, dich dem anzuschauen, ohne dich zu beschämen?',
          type: 'scale',
          min: 1,
          max: 10,
          minLabel: 'Zögerlich',
          maxLabel: 'Sehr bereit',
        },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  };

  const handleAnswer = (fieldId: keyof AnamnesisFormData, value: any, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const toggleMultiSelect = (fieldId: keyof AnamnesisFormData, value: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const currentArray = formData[fieldId] as string[];
    if (currentArray.includes(value)) {
      handleAnswer(fieldId, currentArray.filter((v) => v !== value));
    } else {
      handleAnswer(fieldId, [...currentArray, value]);
    }
  };

  const handleStartAnamnesis = () => {
    if (!userInfo.first_name || !userInfo.last_name || !userInfo.email) {
      alert('Bitte trag Name und E-Mail ein — damit ich deine Auswertung zuordnen kann.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
    }));
    setShowWelcome(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSectionComplete = (section: QuestionSection): boolean =>
    section.fields.every((field) => {
      const value = formData[field.id];
      if (!field.required) return true;
      if (field.type === 'multi_select') return Array.isArray(value) && value.length > 0;
      if (field.type === 'text') return typeof value === 'string' && value.trim().length > 0;
      return value !== '' && value !== undefined;
    });

  const allSectionsComplete = sections.every((section) => isSectionComplete(section));
  const completedSectionsCount = sections.filter((section) => isSectionComplete(section)).length;
  const progressPercentage = (completedSectionsCount / sections.length) * 100;

  const handleSubmit = async () => {
    if (!allSectionsComplete) {
      alert('Bitte fülle noch alle Bereiche aus, die mit * gekennzeichnet sind.');
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
        typology_scores: typology.typology_scores,
      };

      const { error } = await supabase.from('anamnesis_submissions').insert([submissionData]);

      if (error) throw error;

      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting anamnesis:', error);
      alert('Das Senden ist fehlgeschlagen. Bitte versuch es noch einmal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResults && typologyResult) {
    return (
      <div className="relative min-h-screen overflow-hidden text-white" style={{ backgroundColor: '#050505' }}>
        <PremiumBackdrop />

        <div
          className="relative z-[1] mx-auto max-w-xl px-5 pb-14 pt-[4.5rem] sm:pt-24 md:max-w-2xl md:px-8"
          style={{ fontFamily: FONT_BODY }}
        >
          <div className="mb-7 text-center sm:mb-8">
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
              style={{ borderColor: BRONZE_LINE, background: 'rgba(12,11,10,0.55)' }}
            >
              <CheckCircle2 size={14} strokeWidth={1.65} style={{ color: BRONZE }} aria-hidden />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.22em]"
                style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
              >
                Fertig
              </span>
            </div>
            <h1
              className="m-0 mb-2 text-[1.5rem] font-light tracking-[-0.02em] sm:text-[1.7rem]"
              style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.96)' }}
            >
              Deine erste <Hl>Orientierung</Hl>
            </h1>
            <p className="m-0 text-[13.5px] font-light leading-[1.55]" style={{ color: 'rgba(244,239,230,0.54)' }}>
              Ich lese diese Einordnung bewusst — als Startpunkt, nicht als Etikett. Es geht um <Hl>Klarheit</Hl> vor
              Schnelligkeit.
            </p>
          </div>

          <div className={`${CARD_GLASS} mb-4 px-5 py-5 text-center sm:px-6`}>
            <div className="mb-3 flex justify-center">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-[11px] border"
                style={{ borderColor: BRONZE_LINE, background: BRONZE_SOFT, color: BRONZE }}
              >
                <Brain size={22} strokeWidth={1.65} aria-hidden />
              </span>
            </div>
            <p
              className="m-0 mb-1 text-[10px] font-medium uppercase tracking-[0.2em]"
              style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
            >
              Muster-Einordnung
            </p>
            <h2 className="m-0 mb-3 text-[1.25rem] font-normal leading-tight sm:text-[1.35rem]" style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.95)' }}>
              {typologyResult.primary_type_label}
            </h2>
            <p className="m-0 text-left text-[13.75px] font-light leading-[1.6]" style={{ color: 'rgba(244,239,230,0.62)' }}>
              {typologyResult.primary_type_description}
            </p>
          </div>

          {typologyResult.secondary_type && (
            <div className={`${CARD_GLASS} mb-4 px-5 py-4 sm:px-6`}>
              <p
                className="m-0 mb-2 text-[10px] font-medium uppercase tracking-[0.2em]"
                style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
              >
                Zweite Linie
              </p>
              <p className="m-0 text-[14px] font-normal" style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.86)' }}>
                {typologyResult.secondary_type_label}
              </p>
            </div>
          )}

          <div className={`${CARD_GLASS} mb-6 px-5 py-5 sm:px-6`}>
            <div className="mb-3 flex items-start gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border"
                style={{ borderColor: BRONZE_LINE, background: BRONZE_SOFT, color: BRONZE }}
              >
                <Target size={17} strokeWidth={1.65} aria-hidden />
              </span>
              <div>
                <h3 className="m-0 mb-1 text-[0.95rem] font-normal" style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.94)' }}>
                  Worauf ich für dich schaue
                </h3>
                <p className="m-0 text-[11.5px] font-light leading-relaxed" style={{ color: 'rgba(238,230,216,0.42)' }}>
                  Gemeinsamer Fokus – wenn du weitergehen willst.
                </p>
              </div>
            </div>
            <p className="m-0 text-[14px] font-light leading-[1.62]" style={{ color: 'rgba(244,239,230,0.68)' }}>
              {typologyResult.coaching_focus}
            </p>
          </div>

          <div className={`${CARD_GLASS} mb-8 px-5 py-5 text-center sm:text-left`}>
            <p className="m-0 mb-2 text-[14px] font-light" style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.9)' }}>
              Hallo {userInfo.first_name},
            </p>
            <p className="m-0 text-[13.25px] font-light leading-[1.58]" style={{ color: 'rgba(244,239,230,0.58)' }}>
              Ich habe deine Antworten gesichert — die Zusammenfassung nutze ich, um dich bewusst zu verorten. Für den{' '}
              <Hl>nächsten stabilen Schritt</Hl> reicht oft ein Gespräch: dort vertiefen wir, was dich wirklich bewegt.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-[13px] border px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{
                fontFamily: FONT_HEAD,
                borderColor: 'rgba(214,168,94,0.32)',
                color: 'rgba(12,8,6,0.9)',
                background: 'linear-gradient(180deg, rgba(214,168,94,0.92) 0%, rgba(150,104,56,0.88) 100%)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,228,196,0.18)',
              }}
            >
              <Brain size={15} strokeWidth={1.9} aria-hidden />
              Schreib mir
              <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </Link>
            <Link to="/booking" className="text-[12px] font-light underline-offset-4" style={{ color: BRONZE_MUTED }}>
              Oder einen Termin wählen →
            </Link>
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
          className="relative z-[1] mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-10 sm:max-w-[26rem] sm:py-14 md:max-w-[28rem]"
          style={{ fontFamily: FONT_BODY }}
        >
          <div className="mb-6 text-center sm:mb-7">
            <div className="mb-4 flex justify-center">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border sm:h-12 sm:w-12"
                style={{
                  borderColor: BRONZE_LINE,
                  background: BRONZE_SOFT,
                  color: BRONZE,
                  boxShadow: '0 14px 36px rgba(0,0,0,0.35)',
                }}
              >
                <Brain size={22} strokeWidth={1.65} aria-hidden />
              </span>
            </div>

            <p
              className="m-0 mb-2 text-[10px] font-medium uppercase tracking-[0.26em]"
              style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
            >
              Persönlicher Bogen
            </p>

            <h1
              className="m-0 mb-3 text-[1.575rem] font-light leading-snug tracking-[-0.02em] sm:text-[1.75rem]"
              style={{
                fontFamily: FONT_HEAD,
                color: 'rgba(248,243,232,0.96)',
                textShadow: '0 1px 0 rgba(20,12,6,0.45)',
              }}
            >
              Persönlicher Anamnesebogen
            </h1>

            <p className="m-0 text-[13.75px] font-light leading-[1.56] sm:text-[14px]" style={{ color: 'rgba(244,239,230,0.56)' }}>
              Ich möchte zuerst verstehen, was dich aktuell wirklich bewegt — ruhig, strukturiert, ohne Klinikton. Die
              Antworten helfen mir, deine Situation <Hl>bewusst</Hl> einzuordnen, damit schon vor einem Gespräch mehr{' '}
              <Hl>Klarheit</Hl> da ist — und du dich sicher kannst zurücklehnen.
            </p>
          </div>

          <div className={`${CARD_GLASS} px-5 py-6 sm:px-6 sm:py-6`}>
            <h2
              className="m-0 mb-4 text-center text-[1rem] font-normal sm:text-[1.05rem]"
              style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.94)' }}
            >
              Deine Kontaktdaten
            </h2>

            <div className="mb-5 space-y-3.5">
              <div>
                <label
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em]"
                  style={{ fontFamily: FONT_BODY, color: BRONZE_MUTED }}
                >
                  Vorname
                </label>
                <input
                  type="text"
                  value={userInfo.first_name}
                  onChange={(e) => setUserInfo((prev) => ({ ...prev, first_name: e.target.value }))}
                  className={INPUT_FIELD}
                  placeholder="Dein Vorname"
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em]"
                  style={{ fontFamily: FONT_BODY, color: BRONZE_MUTED }}
                >
                  Nachname
                </label>
                <input
                  type="text"
                  value={userInfo.last_name}
                  onChange={(e) => setUserInfo((prev) => ({ ...prev, last_name: e.target.value }))}
                  className={INPUT_FIELD}
                  placeholder="Dein Nachname"
                  autoComplete="family-name"
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
                  className={INPUT_FIELD}
                  placeholder="deine@adresse.de"
                  autoComplete="email"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartAnamnesis}
              disabled={!userInfo.first_name || !userInfo.last_name || !userInfo.email}
              className="flex w-full items-center justify-center gap-2 rounded-[13px] border px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-35"
              style={{
                fontFamily: FONT_HEAD,
                borderColor: 'rgba(214,168,94,0.32)',
                color: 'rgba(12,8,6,0.9)',
                background: 'linear-gradient(180deg, rgba(214,168,94,0.94) 0%, rgba(150,104,56,0.88) 100%)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,228,196,0.18)',
              }}
            >
              Weiter zum Bogen
              <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </button>

            <p className="m-0 mt-3.5 text-center text-[11px] font-light leading-[1.45]" style={{ color: 'rgba(238,230,216,0.4)' }}>
              Ca. 3–6 Minuten · vertraulich · keine medizinische Diagnose · du kannst in Ruhe formulieren
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white" style={{ backgroundColor: '#050505' }}>
      <PremiumBackdrop />

      <div
        className="relative z-[1] mx-auto max-w-xl px-5 pb-12 pt-[4rem] md:max-w-[40rem] md:px-8"
        style={{ fontFamily: FONT_BODY }}
      >
        <header className="mb-6 text-center sm:mb-7">
          <div className="mb-3 flex justify-center">
            <span
              className="rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em]"
              style={{ fontFamily: FONT_HEAD, borderColor: BRONZE_LINE, color: BRONZE_MUTED, background: 'rgba(12,11,10,0.5)' }}
            >
              Persönlicher Bogen
            </span>
          </div>

          <h1
            className="m-0 mb-2 text-[1.42rem] font-light leading-snug tracking-[-0.02em] sm:text-[1.55rem] md:text-[1.62rem]"
            style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.96)' }}
          >
            Ruhige Fragen für mehr <Hl>Orientierung</Hl>
          </h1>

          <p className="mx-auto m-0 max-w-lg text-[13.35px] font-light leading-[1.53] sm:text-[13.75px]" style={{ color: 'rgba(244,239,230,0.52)' }}>
            Arbeit die Bereiche in dem Tempo durch, das für dich passt. Ich halte diese Struktur bewusst klar —
            ohne Urteil, ohne Druck.
          </p>

          <div className="mx-auto mt-5 max-w-md">
            <div className="mb-1.5 flex items-center justify-between text-[11px]" style={{ color: 'rgba(238,230,216,0.44)' }}>
              <span>Fortschritt</span>
              <span className="font-medium uppercase tracking-[0.1em] tabular-nums" style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}>
                {completedSectionsCount} / {sections.length}
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
              <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%`, background: BRONZE }} />
            </div>
          </div>
        </header>

        <div className="mb-6 space-y-2.5 sm:mb-8 sm:space-y-3">
          {sections.map((section, sectionIndex) => {
            const isExpanded = expandedSections.has(section.id);
            const isComplete = isSectionComplete(section);

            return (
              <div key={section.id} style={{ animation: `anamFadeUp 0.45s ease-out ${sectionIndex * 0.04}s both` }}>
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full text-left touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div
                    className="overflow-hidden rounded-[14px] border backdrop-blur-[10px] transition-[border-color,background] duration-200"
                    style={{
                      borderColor: isExpanded ? 'rgba(214,168,94,0.28)' : BRONZE_LINE,
                      background: isExpanded ? 'rgba(18,16,14,0.62)' : 'rgba(12,11,10,0.4)',
                      boxShadow: isExpanded ? '0 12px 32px rgba(0,0,0,0.28)' : 'none',
                    }}
                  >
                    <div className="flex items-start gap-2.5 p-3.5 sm:gap-3 sm:p-4">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border text-[13px] font-medium sm:h-[2.6rem] sm:w-[2.6rem]"
                        style={{
                          fontFamily: FONT_HEAD,
                          borderColor: isComplete ? 'rgba(214,168,94,0.35)' : BRONZE_LINE,
                          background: isComplete ? BRONZE_SOFT : 'rgba(0,0,0,0.22)',
                          color: isComplete ? BRONZE : 'rgba(248,243,232,0.4)',
                        }}
                      >
                        {isComplete ? <CheckCircle2 className="h-5 w-5" strokeWidth={1.7} aria-hidden /> : sectionIndex + 1}
                      </span>

                      <div className="min-w-0 flex-1 pr-5">
                        <p
                          className="mb-1 text-[9.5px] font-medium uppercase tracking-[0.2em]"
                          style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
                        >
                          {section.category}
                        </p>
                        <p className="m-0 text-[14px] font-normal leading-snug sm:text-[14.75px]" style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.94)' }}>
                          {section.title}
                        </p>
                      </div>

                      <span
                        className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200"
                        style={{
                          borderColor: BRONZE_LINE,
                          background: 'rgba(0,0,0,0.2)',
                          color: BRONZE_MUTED,
                          transform: isExpanded ? 'rotate(180deg)' : 'none',
                        }}
                      >
                        {isExpanded ? <Minus className="h-4 w-4" strokeWidth={1.85} aria-hidden /> : <Plus className="h-4 w-4" strokeWidth={1.85} aria-hidden />}
                      </span>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-2">
                    <div
                      className="rounded-[14px] border px-4 py-4 backdrop-blur-[10px] sm:px-5 sm:py-[1.125rem]"
                      style={{
                        borderColor: BRONZE_LINE,
                        background: 'linear-gradient(180deg, rgba(14,13,11,0.9) 0%, rgba(8,7,6,0.92) 100%)',
                      }}
                    >
                      <div className="space-y-5 sm:space-y-5">
                        {section.fields.map((field) => {
                          const value = formData[field.id];

                          if (field.type === 'single_choice' && field.options) {
                            return (
                              <div key={field.id}>
                                <label
                                  className="mb-3 block text-[13.75px] font-normal leading-snug tracking-[0.01em] sm:text-[14px]"
                                  style={{ fontFamily: FONT_BODY, color: 'rgba(251,246,237,0.94)' }}
                                >
                                  {field.question}{' '}
                                  {field.required && (
                                    <span style={{ color: BRONZE_MUTED }} aria-hidden>
                                      *
                                    </span>
                                  )}
                                </label>
                                <div className="space-y-2">
                                  {field.options.map((option) => {
                                    const isSelected = value === option.value;
                                    return (
                                      <button
                                        key={option.value}
                                        type="button"
                                        onClick={(e) => handleAnswer(field.id, option.value, e)}
                                        className="w-full rounded-[11px] border px-3.5 py-2.75 text-left transition-[border-color,background] duration-200 touch-manipulation sm:py-3"
                                        style={{
                                          WebkitTapHighlightColor: 'transparent',
                                          borderColor: isSelected ? 'rgba(214,168,94,0.36)' : 'rgba(214,168,94,0.12)',
                                          background: isSelected ? 'rgba(214,168,94,0.07)' : 'rgba(10,9,8,0.55)',
                                        }}
                                      >
                                        <div className="flex items-start gap-2.5">
                                          <span
                                            className="mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border"
                                            style={{
                                              borderColor: isSelected ? BRONZE : 'rgba(255,255,255,0.18)',
                                              background: isSelected ? BRONZE_SOFT : 'transparent',
                                            }}
                                          >
                                            {isSelected ? <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRONZE }} /> : null}
                                          </span>
                                          <span
                                            className="text-[13.25px] font-light leading-[1.48]"
                                            style={{
                                              fontFamily: FONT_BODY,
                                              color: isSelected ? 'rgba(248,243,232,0.94)' : 'rgba(244,239,230,0.74)',
                                            }}
                                          >
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
                                <label
                                  className="mb-3 block text-[13.75px] font-normal leading-snug tracking-[0.01em] sm:text-[14px]"
                                  style={{ fontFamily: FONT_BODY, color: 'rgba(251,246,237,0.94)' }}
                                >
                                  {field.question}{' '}
                                  {field.required && <span style={{ color: BRONZE_MUTED }}>*</span>}
                                </label>
                                <div className="space-y-2">
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
                                        className="w-full rounded-[11px] border px-3.5 py-2.75 text-left transition-[border-color,background] duration-200 touch-manipulation sm:py-3"
                                        style={{
                                          WebkitTapHighlightColor: 'transparent',
                                          borderColor: isSelected ? 'rgba(214,168,94,0.36)' : 'rgba(214,168,94,0.12)',
                                          background: isSelected ? 'rgba(214,168,94,0.07)' : 'rgba(10,9,8,0.55)',
                                        }}
                                      >
                                        <div className="flex items-start gap-2.5">
                                          <span
                                            className="mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[5px] border"
                                            style={{
                                              borderColor: isSelected ? BRONZE : 'rgba(255,255,255,0.18)',
                                              background: isSelected ? BRONZE_SOFT : 'transparent',
                                            }}
                                          >
                                            {isSelected ? <CheckCircle2 className="h-3 w-3" strokeWidth={2.2} style={{ color: BRONZE }} aria-hidden /> : null}
                                          </span>
                                          <span
                                            className="text-[13.25px] font-light leading-[1.48]"
                                            style={{
                                              fontFamily: FONT_BODY,
                                              color: isSelected ? 'rgba(248,243,232,0.94)' : 'rgba(244,239,230,0.74)',
                                            }}
                                          >
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
                            const mn = field.min ?? 1;
                            const mx = field.max ?? 10;
                            const pct = ((numValue - mn) / (mx - mn)) * 100;
                            return (
                              <div key={field.id}>
                                <label
                                  className="mb-2.5 block text-[13.75px] font-normal leading-snug tracking-[0.01em] sm:text-[14px]"
                                  style={{ fontFamily: FONT_BODY, color: 'rgba(251,246,237,0.94)' }}
                                >
                                  {field.question}
                                </label>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-[11px] font-light" style={{ color: 'rgba(238,230,216,0.45)' }}>
                                    <span>{field.minLabel}</span>
                                    <span className="text-[17px] font-normal tabular-nums tracking-tight" style={{ fontFamily: FONT_BODY, color: BRONZE_MUTED }}>
                                      {numValue}
                                    </span>
                                    <span>{field.maxLabel}</span>
                                  </div>
                                  <input
                                    type="range"
                                    min={mn}
                                    max={mx}
                                    value={numValue}
                                    aria-label={field.question}
                                    onChange={(e) => handleAnswer(field.id, parseInt(e.target.value, 10))}
                                    className="anam-range w-full cursor-pointer rounded-full"
                                    style={
                                      {
                                        '--fill': `${pct}%`,
                                      } as CSSProperties & { '--fill': string }
                                    }
                                  />
                                </div>
                              </div>
                            );
                          }

                          if (field.type === 'text') {
                            return (
                              <div key={field.id}>
                                <label
                                  className="mb-2.5 block text-[13.75px] font-normal leading-snug tracking-[0.01em] sm:text-[14px]"
                                  style={{ fontFamily: FONT_BODY, color: 'rgba(251,246,237,0.94)' }}
                                >
                                  {field.question}{' '}
                                  {field.required && <span style={{ color: BRONZE_MUTED }}>*</span>}
                                </label>
                                <textarea
                                  value={(value as string) || ''}
                                  onChange={(e) => handleAnswer(field.id, e.target.value)}
                                  rows={3}
                                  placeholder="In Ruhe formulieren …"
                                  className={`${INPUT_FIELD} resize-none py-4 leading-[1.58]`}
                                />
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`${CARD_GLASS} px-5 py-5 text-center sm:px-6`}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allSectionsComplete || isSubmitting}
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
              'Wird gespeichert …'
            ) : (
              <>
                Auswertung ansehen
                <ArrowRight size={14} strokeWidth={2} aria-hidden />
              </>
            )}
          </button>
          <p className="m-0 mt-3.5 text-[11px] font-light leading-relaxed sm:max-w-none" style={{ color: 'rgba(238,230,216,0.42)' }}>
            {allSectionsComplete
              ? 'Alle Bereiche vollständig — ich erstelle aus deinen Antworten die Einordnung.'
              : `${sections.length - completedSectionsCount} Bereich${sections.length - completedSectionsCount === 1 ? '' : 'e'} noch offen`}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes anamFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="anamFadeUp"] { animation: none !important; }
        }
        .anam-range {
          height: 6px;
          -webkit-appearance: none;
          appearance: none;
          background: linear-gradient(to right,
            rgba(201, 155, 98, 0.85) var(--fill, 45%),
            rgba(255,255,255,0.07) var(--fill, 45%)
          );
        }
        .anam-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          border: 1px solid rgba(214, 168, 94, 0.45);
          background: radial-gradient(circle at 30% 30%, rgba(255,238,218,0.35), rgba(150,104,56,0.95));
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        }
        .anam-range::-moz-range-thumb {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          border: 1px solid rgba(214, 168, 94, 0.45);
          background: radial-gradient(circle at 30% 30%, rgba(255,238,218,0.35), rgba(150,104,56,0.95));
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        }
      `}</style>
    </div>
  );
}
