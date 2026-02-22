// Section 5: Beziehung & Außenwirkung

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  toggleArrayItem: (field: any, value: string) => void;
}

export default function Section5({ formData, setFormData, toggleArrayItem }: Props) {
  const closenessDifficulties = [
    { value: 'easy', label: 'Leicht', description: 'Nähe fällt mir leicht' },
    { value: 'situationally_difficult', label: 'Situativ schwer', description: 'Manchmal fällt es mir schwer' },
    { value: 'permanently_difficult', label: 'Dauerhaft schwer', description: 'Nähe fällt mir generell schwer' }
  ];

  const externalAppearances = [
    { value: 'sovereign', label: 'Souverän', description: 'Ich wirke selbstsicher und ruhig' },
    { value: 'adapted', label: 'Angepasst', description: 'Ich passe mich an' },
    { value: 'high_performing', label: 'Leistungsstark', description: 'Ich wirke erfolgreich und kompetent' },
    { value: 'exhausted', label: 'Erschöpft', description: 'Ich wirke müde oder ausgelaugt' }
  ];

  const feedbackOptions = [
    { value: 'too_perfect', label: 'Du bist zu perfekt' },
    { value: 'too_much', label: 'Du nimmst dir zu viel vor' },
    { value: 'too_little_joy', label: 'Du gönnst dir zu wenig' },
    { value: 'too_serious', label: 'Du nimmst alles zu ernst' },
    { value: 'too_detached', label: 'Du wirkst distanziert' },
    { value: 'very_present', label: 'Du bist sehr präsent' },
    { value: 'inspiring', label: 'Du inspirierst andere' },
    { value: 'calm', label: 'Du strahlst Ruhe aus' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-lg font-bold text-white mb-4">
          Nähe fällt mir
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {closenessDifficulties.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, closeness_difficulty: option.value })}
              className={`p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                formData.closeness_difficulty === option.value
                  ? 'bg-amber-400/20 text-white border-amber-400 shadow-[0_0_30px_rgba(251,146,60,0.3)]'
                  : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <div className="font-bold text-white mb-1">{option.label}</div>
              <div className="text-sm text-white/70">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-bold text-white mb-4">
          Ich wirke nach außen meist
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {externalAppearances.map((appearance) => (
            <button
              key={appearance.value}
              type="button"
              onClick={() => setFormData({ ...formData, external_appearance: appearance.value })}
              className={`p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                formData.external_appearance === appearance.value
                  ? 'bg-amber-400/20 text-white border-amber-400 shadow-[0_0_30px_rgba(251,146,60,0.3)]'
                  : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <div className="font-bold text-white mb-1">{appearance.label}</div>
              <div className="text-sm text-white/70">{appearance.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-bold text-white mb-4">
          Häufiges Feedback aus dem Umfeld <span className="text-white/60 text-sm font-normal">(Mehrfachauswahl)</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {feedbackOptions.map((feedback) => {
            const isSelected = formData.feedback_from_others.includes(feedback.value);
            const isPositive = ['very_present', 'inspiring', 'calm'].includes(feedback.value);
            return (
              <button
                key={feedback.value}
                type="button"
                onClick={() => toggleArrayItem('feedback_from_others', feedback.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                  isSelected
                    ? isPositive
                      ? 'border-green-500/60 bg-green-500/20 text-green-400'
                      : 'border-orange-500/60 bg-orange-500/20 text-orange-400'
                    : 'border-white/20 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected
                      ? isPositive
                        ? 'border-green-500 bg-green-500'
                        : 'border-orange-500 bg-orange-500'
                      : 'border-white/40'
                  }`}>
                    {isSelected && (
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-semibold">{feedback.label}</span>
                </div>
              </button>
            );
          })}
        </div>
        {formData.feedback_from_others.length === 0 && (
          <p className="text-sm text-amber-400 mt-3 font-medium">Bitte wählen Sie mindestens eine Option</p>
        )}
      </div>
    </div>
  );
}
