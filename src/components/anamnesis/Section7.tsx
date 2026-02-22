// Section 7: Bereitschaft & Ziel

interface Props {
  formData: any;
  setFormData: (data: any) => void;
}

export default function Section7({ formData, setFormData }: Props) {
  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-amber-400/10 border border-amber-400/30 backdrop-blur-sm">
        <p className="text-sm text-white/80 leading-relaxed">
          Abschluss & Öffnung – Diese letzten Fragen helfen uns, Ihren individuellen Weg zu gestalten.
        </p>
      </div>

      <div>
        <label className="block text-lg font-bold text-white mb-3">
          Was soll sich wirklich verändern?
        </label>
        <p className="text-sm text-white/60 mb-3">
          Beschreiben Sie in eigenen Worten, was anders werden soll.
        </p>
        <textarea
          value={formData.what_should_change}
          onChange={(e) => setFormData({ ...formData, what_should_change: e.target.value })}
          rows={5}
          className="w-full px-5 py-4 rounded-xl bg-black/30 border-2 border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:bg-black/50 transition-all outline-none resize-none leading-relaxed"
          placeholder="Z.B. Ich möchte wieder spüren, dass ich nicht nur funktioniere..."
        />
        {formData.what_should_change.length < 20 && formData.what_should_change.length > 0 && (
          <p className="text-sm text-orange-400 mt-2 font-medium">Bitte mindestens 20 Zeichen</p>
        )}
      </div>

      <div>
        <label className="block text-lg font-bold text-white mb-3">
          Was darf auf keinen Fall so bleiben?
        </label>
        <p className="text-sm text-white/60 mb-3">
          Was ist unerträglich geworden? Was muss aufhören?
        </p>
        <textarea
          value={formData.what_must_not_stay}
          onChange={(e) => setFormData({ ...formData, what_must_not_stay: e.target.value })}
          rows={5}
          className="w-full px-5 py-4 rounded-xl bg-black/30 border-2 border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:bg-black/50 transition-all outline-none resize-none leading-relaxed"
          placeholder="Z.B. Der ständige Druck, die Erschöpfung, das Gefühl nie genug zu sein..."
        />
        {formData.what_must_not_stay.length < 20 && formData.what_must_not_stay.length > 0 && (
          <p className="text-sm text-orange-400 mt-2 font-medium">Bitte mindestens 20 Zeichen</p>
        )}
      </div>

      <div className="space-y-3 pt-4">
        <label className="block text-lg font-bold text-white">
          Wie bereit bist du, dich ehrlich zu betrachten?
        </label>
        <p className="text-sm text-white/60">
          Transformation braucht Mut zur Wahrheit.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/60 min-w-[100px]">Wenig bereit</span>
          <div className="flex-1">
            <input
              type="range"
              min="1"
              max="10"
              value={formData.readiness_to_examine}
              onChange={(e) => setFormData({ ...formData, readiness_to_examine: parseInt(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #fb923c 0%, #fb923c ${((formData.readiness_to_examine - 1) / 9) * 100}%, rgba(255,255,255,0.1) ${((formData.readiness_to_examine - 1) / 9) * 100}%, rgba(255,255,255,0.1) 100%)`
              }}
            />
          </div>
          <span className="text-xs text-white/60 min-w-[100px] text-right">Vollkommen bereit</span>
        </div>
        <div className="text-center">
          <span className={`inline-block px-5 py-2.5 rounded-xl font-bold text-lg shadow-lg ${
            formData.readiness_to_examine >= 7 ? 'bg-green-500/20 text-green-400 border-2 border-green-500/40' :
            formData.readiness_to_examine <= 4 ? 'bg-red-500/20 text-red-400 border-2 border-red-500/40' :
            'bg-amber-400/20 text-amber-400 border-2 border-amber-400/40'
          }`}>
            {formData.readiness_to_examine}
            {formData.readiness_to_examine >= 7 && ' – Ausgezeichnet'}
            {formData.readiness_to_examine <= 4 && ' – Vielleicht noch nicht der richtige Zeitpunkt'}
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
