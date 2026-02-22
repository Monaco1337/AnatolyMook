// Section 4: Entscheidungs- & Handlungslogik

interface Props {
  formData: any;
  setFormData: (data: any) => void;
}

export default function Section4({ formData, setFormData }: Props) {
  const decisionStyles = [
    { value: 'intuitive', label: 'Intuitiv', description: 'Ich folge meinem Bauchgefühl' },
    { value: 'rational', label: 'Rational', description: 'Ich analysiere und wäge ab' },
    { value: 'duty_driven', label: 'Pflichtgetrieben', description: 'Ich tue, was getan werden muss' },
    { value: 'fear_driven', label: 'Aus Angst vor Konsequenzen', description: 'Ich vermeide negative Folgen' }
  ];

  const uncertaintyReactions = [
    { value: 'thinking', label: 'Nachdenken', description: 'Ich durchdenke die Situation' },
    { value: 'acting', label: 'Handeln', description: 'Ich handle trotz Unsicherheit' },
    { value: 'waiting', label: 'Abwarten', description: 'Ich warte ab, bis sich etwas klärt' },
    { value: 'distraction', label: 'Ablenkung', description: 'Ich lenke mich ab' }
  ];

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-amber-400/10 border border-amber-400/30 backdrop-blur-sm">
        <p className="text-sm text-white/80 leading-relaxed">
          Diese Fragen sind <strong className="text-white">zentral für die Typisierung</strong>. Antworten Sie so ehrlich wie möglich, wie Sie <strong className="text-white">tatsächlich</strong> handeln, nicht wie Sie gerne handeln würden.
        </p>
      </div>

      <div>
        <label className="block text-lg font-bold text-white mb-4">
          Entscheidungen treffe ich überwiegend
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {decisionStyles.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => setFormData({ ...formData, decision_style: style.value })}
              className={`p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                formData.decision_style === style.value
                  ? 'bg-amber-400/20 text-white border-amber-400 shadow-[0_0_30px_rgba(251,146,60,0.3)]'
                  : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <div className="font-bold text-white mb-1">{style.label}</div>
              <div className="text-sm text-white/70">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-base font-bold text-white">
          Ich vertraue mir selbst bei Entscheidungen
        </label>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/60 min-w-[100px]">Sehr wenig</span>
          <div className="flex-1">
            <input
              type="range"
              min="1"
              max="10"
              value={formData.self_trust_level}
              onChange={(e) => setFormData({ ...formData, self_trust_level: parseInt(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #fb923c 0%, #fb923c ${((formData.self_trust_level - 1) / 9) * 100}%, rgba(255,255,255,0.1) ${((formData.self_trust_level - 1) / 9) * 100}%, rgba(255,255,255,0.1) 100%)`
              }}
            />
          </div>
          <span className="text-xs text-white/60 min-w-[100px] text-right">Sehr stark</span>
        </div>
        <div className="text-center">
          <span className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold text-lg shadow-lg">
            {formData.self_trust_level}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-lg font-bold text-white mb-4">
          Wenn Unsicherheit bleibt, reagiere ich mit
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uncertaintyReactions.map((reaction) => (
            <button
              key={reaction.value}
              type="button"
              onClick={() => setFormData({ ...formData, uncertainty_reaction: reaction.value })}
              className={`p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                formData.uncertainty_reaction === reaction.value
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

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbbf24, #f97316);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(251, 146, 60, 0.5);
          transition: all 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 20px rgba(251, 146, 60, 0.7);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbbf24, #f97316);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(251, 146, 60, 0.5);
          transition: all 0.2s;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 20px rgba(251, 146, 60, 0.7);
        }
      `}</style>
    </div>
  );
}
