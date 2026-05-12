// Section 3: Stress- & Reaktionsmuster

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  toggleArrayItem: (field: any, value: string) => void;
}

export default function Section3({ formData, setFormData, toggleArrayItem }: Props) {
  const stressReactions = [
    { value: 'activism', label: 'Aktionismus', description: 'Ich werde hektisch und handle sofort' },
    { value: 'withdrawal', label: 'Rückzug', description: 'Ich ziehe mich zurück' },
    { value: 'control', label: 'Kontrolle', description: 'Ich versuche alles zu kontrollieren' },
    { value: 'adaptation', label: 'Anpassung', description: 'Ich passe mich an und füge mich' }
  ];

  const conflictExperiences = [
    { value: 'burdensome', label: 'Belastend', description: 'Konflikte belasten mich stark' },
    { value: 'clarifying', label: 'Klärend', description: 'Konflikte helfen mir, Klarheit zu gewinnen' },
    { value: 'avoidant', label: 'Vermeidend', description: 'Ich vermeide Konflikte, wo ich kann' },
    { value: 'paralyzing', label: 'Lähmend', description: 'Konflikte lähmen mich' }
  ];

  const dailyFeelings = [
    { value: 'stress', label: 'Stress' },
    { value: 'pressure', label: 'Druck' },
    { value: 'exhaustion', label: 'Erschöpfung' },
    { value: 'restlessness', label: 'Unruhe' },
    { value: 'anxiety', label: 'Angst' },
    { value: 'clarity', label: 'Klarheit' },
    { value: 'calm', label: 'Ruhe' },
    { value: 'joy', label: 'Freude' },
    { value: 'purpose', label: 'Sinn' },
    { value: 'connection', label: 'Verbundenheit' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-lg font-bold text-white mb-4">
          Unter Druck neige ich zu
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stressReactions.map((reaction) => (
            <button
              key={reaction.value}
              type="button"
              onClick={() => setFormData({ ...formData, stress_reaction: reaction.value })}
              className={`p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                formData.stress_reaction === reaction.value
                  ? 'bg-amber-400/20 text-white border-amber-400 shadow-[0_0_30px_rgba(251,146,60,0.3)]'
                  : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <div className="font-bold text-white mb-1">{reaction.label}</div>
              <div className="text-sm text-white/70">{reaction.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-bold text-white mb-4">
          Konflikte erlebe ich meist als
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conflictExperiences.map((experience) => (
            <button
              key={experience.value}
              type="button"
              onClick={() => setFormData({ ...formData, conflict_experience: experience.value })}
              className={`p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                formData.conflict_experience === experience.value
                  ? 'bg-amber-400/20 text-white border-amber-400 shadow-[0_0_30px_rgba(251,146,60,0.3)]'
                  : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <div className="font-bold text-white mb-1">{experience.label}</div>
              <div className="text-sm text-white/70">{experience.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-bold text-white mb-4">
          Häufigstes inneres Gefühl im Alltag <span className="text-white/60 text-sm font-normal">(Mehrfachauswahl)</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {dailyFeelings.map((feeling) => {
            const isSelected = formData.daily_feelings.includes(feeling.value);
            const isNegative = ['stress', 'pressure', 'exhaustion', 'restlessness', 'anxiety'].includes(feeling.value);
            return (
              <button
                key={feeling.value}
                type="button"
                onClick={() => toggleArrayItem('daily_feelings', feeling.value)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                  isSelected
                    ? isNegative
                      ? 'border-red-500/60 bg-red-500/20 text-red-400'
                      : 'border-green-500/60 bg-green-500/20 text-green-400'
                    : 'border-white/20 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? isNegative
                        ? 'border-red-500 bg-red-500'
                        : 'border-green-500 bg-green-500'
                      : 'border-white/40'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs font-semibold">{feeling.label}</span>
                </div>
              </button>
            );
          })}
        </div>
        {formData.daily_feelings.length === 0 && (
          <p className="text-sm text-amber-400 mt-3 font-medium">Bitte wählen Sie mindestens ein Gefühl</p>
        )}
      </div>
    </div>
  );
}
