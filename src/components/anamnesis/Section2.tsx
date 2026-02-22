// Section 2: Innerer Zustand (Baseline)

interface Props {
  formData: any;
  setFormData: (data: any) => void;
}

export default function Section2({ formData, setFormData }: Props) {
  const ScaleInput = ({
    label,
    field,
    leftLabel = '1 = Sehr gering',
    rightLabel = '10 = Sehr hoch'
  }: {
    label: string;
    field: string;
    leftLabel?: string;
    rightLabel?: string;
  }) => (
    <div className="space-y-3">
      <label className="block text-base font-bold text-white">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <span className="text-xs text-white/60 min-w-[100px]">{leftLabel}</span>
        <div className="flex-1">
          <input
            type="range"
            min="1"
            max="10"
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: parseInt(e.target.value) })}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #fb923c 0%, #fb923c ${((formData[field] - 1) / 9) * 100}%, rgba(255,255,255,0.1) ${((formData[field] - 1) / 9) * 100}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
        </div>
        <span className="text-xs text-white/60 min-w-[100px] text-right">{rightLabel}</span>
      </div>
      <div className="text-center">
        <span className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold text-lg shadow-lg">
          {formData[field]}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-amber-400/10 border border-amber-400/30 backdrop-blur-sm">
        <p className="text-sm text-white/80 leading-relaxed">
          Diese Werte bilden Ihre Baseline-Matrix. Bewerten Sie Ihren <strong className="text-white">aktuellen</strong> Zustand so ehrlich wie möglich.
        </p>
      </div>

      <ScaleInput
        label="Innere Klarheit"
        field="inner_clarity"
      />

      <ScaleInput
        label="Innere Stabilität"
        field="inner_stability"
      />

      <ScaleInput
        label="Entscheidungsfähigkeit"
        field="decision_capability"
      />

      <ScaleInput
        label="Energielevel"
        field="energy_level"
      />

      <div className="space-y-3 pt-4">
        <label className="block text-base font-bold text-white">
          Innere Ruhe vs. Innerer Druck
        </label>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/60 min-w-[80px]">Innere Ruhe</span>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={formData.inner_peace_vs_pressure}
              onChange={(e) => setFormData({ ...formData, inner_peace_vs_pressure: parseInt(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${100 - formData.inner_peace_vs_pressure}%, #ef4444 ${100 - formData.inner_peace_vs_pressure}%, #ef4444 100%)`
              }}
            />
          </div>
          <span className="text-xs text-white/60 min-w-[80px] text-right">Innerer Druck</span>
        </div>
        <div className="text-center">
          <span className={`inline-block px-5 py-2.5 rounded-xl font-bold text-lg shadow-lg ${
            formData.inner_peace_vs_pressure < 40 ? 'bg-green-500/20 text-green-400 border-2 border-green-500/40' :
            formData.inner_peace_vs_pressure > 60 ? 'bg-red-500/20 text-red-400 border-2 border-red-500/40' :
            'bg-white/10 text-white border-2 border-white/20'
          }`}>
            {formData.inner_peace_vs_pressure < 40 ? 'Mehr Ruhe' :
             formData.inner_peace_vs_pressure > 60 ? 'Mehr Druck' :
             'Ausgewogen'}
          </span>
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
