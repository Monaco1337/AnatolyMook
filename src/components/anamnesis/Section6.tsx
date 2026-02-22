// Section 6: Sinn, Wahrheit, Ausrichtung

interface Props {
  formData: any;
  setFormData: (data: any) => void;
}

export default function Section6({ formData, setFormData }: Props) {
  const ScaleInput = ({
    label,
    field,
    leftLabel = 'Stimmt gar nicht',
    rightLabel = 'Stimmt völlig'
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
          Diese Fragen berühren die <strong className="text-white">tiefe Ebene</strong> – ohne Esoterik. Antworten Sie aus Ihrem Gefühl heraus.
        </p>
      </div>

      <ScaleInput
        label="Ich habe aktuell das Gefühl, 'auf meinem Weg' zu sein"
        field="on_my_path"
      />

      <ScaleInput
        label="Etwas in mir weiß, dass Veränderung ansteht"
        field="change_is_coming"
      />

      <ScaleInput
        label="Ich funktioniere mehr, als dass ich lebe"
        field="functioning_vs_living"
        leftLabel="Lebe vollkommen"
        rightLabel="Funktioniere nur"
      />

      <ScaleInput
        label="Ich sehne mich nach Klarheit, nicht nach Motivation"
        field="seeking_clarity"
      />

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
