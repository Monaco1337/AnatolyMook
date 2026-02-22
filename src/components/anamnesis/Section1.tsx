// Section 1: Kontext & Orientierung

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  toggleArrayItem: (field: any, value: string) => void;
}

export default function Section1({ formData, setFormData, toggleArrayItem }: Props) {
  const inquiryTypes = [
    { value: 'coaching', label: 'Coaching' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'business', label: 'Business' },
    { value: 'orientation', label: 'Orientierung' }
  ];

  const lifeSituations = [
    { value: 'career_transition', label: 'Berufliche Neuorientierung' },
    { value: 'leadership_challenge', label: 'Führungsherausforderung' },
    { value: 'life_crisis', label: 'Lebenskrise' },
    { value: 'relationship_issues', label: 'Beziehungsthemen' },
    { value: 'meaning_search', label: 'Sinnsuche' },
    { value: 'burnout_prevention', label: 'Burnout-Prävention' },
    { value: 'personal_growth', label: 'Persönliche Entwicklung' },
    { value: 'entrepreneurship', label: 'Selbstständigkeit' }
  ];

  const roles = [
    { value: 'executive', label: 'Geschäftsführung / C-Level' },
    { value: 'manager', label: 'Führungskraft' },
    { value: 'self_employed', label: 'Selbstständig / Unternehmer' },
    { value: 'employee', label: 'Angestellter' },
    { value: 'private', label: 'Privatperson' },
    { value: 'in_transition', label: 'In Übergangsphase' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-lg font-bold text-white mb-4">
          Art der Anfrage
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {inquiryTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFormData({ ...formData, inquiry_type: type.value })}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                formData.inquiry_type === type.value
                  ? 'bg-amber-400/20 text-white border-amber-400 scale-105 shadow-[0_0_30px_rgba(251,146,60,0.3)]'
                  : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <span className="font-semibold">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-bold text-white mb-4">
          Aktuelle Lebenssituation <span className="text-white/60 text-sm font-normal">(Mehrfachauswahl möglich)</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {lifeSituations.map((situation) => {
            const isSelected = formData.life_situation.includes(situation.value);
            return (
              <button
                key={situation.value}
                type="button"
                onClick={() => toggleArrayItem('life_situation', situation.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? 'bg-amber-400/20 text-white border-amber-400'
                    : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-amber-400 bg-amber-400' : 'border-white/40'
                  }`}>
                    {isSelected && (
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-semibold">{situation.label}</span>
                </div>
              </button>
            );
          })}
        </div>
        {formData.life_situation.length === 0 && (
          <p className="text-sm text-amber-400 mt-3 font-medium">Bitte wählen Sie mindestens eine Option</p>
        )}
      </div>

      <div>
        <label className="block text-lg font-bold text-white mb-4">
          Aktuelle Hauptrolle
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {roles.map((role) => (
            <button
              key={role.value}
              type="button"
              onClick={() => setFormData({ ...formData, primary_role: role.value })}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                formData.primary_role === role.value
                  ? 'bg-amber-400/20 text-white border-amber-400 scale-[1.02] shadow-[0_0_30px_rgba(251,146,60,0.3)]'
                  : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  formData.primary_role === role.value ? 'border-amber-400' : 'border-white/40'
                }`}>
                  {formData.primary_role === role.value && <div className="w-3 h-3 rounded-full bg-amber-400" />}
                </div>
                <span className="font-semibold">{role.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
