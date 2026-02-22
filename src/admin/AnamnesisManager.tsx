import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Brain, Eye, EyeOff, ChevronDown, ChevronUp, Calendar, User, Mail, Phone, CheckCircle2 } from 'lucide-react';

interface AnamnesisSubmission {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  inquiry_type: string;
  primary_type: string;
  primary_role: string;
  coaching_focus: string;
  status: string;
  priority: string;
  inner_clarity: number;
  inner_stability: number;
  decision_capability: number;
  energy_level: number;
  inner_peace_vs_pressure: number;
  stress_reaction: string;
  decision_style: string;
  self_trust_level: number;
  what_should_change: string;
  what_must_not_stay: string;
  readiness_to_examine: number;
  admin_notes: string;
  is_read: boolean;
}

const TYPES_CONFIG = {
  structure_seeker: { label: 'Struktursucher', color: '#3B82F6' },
  performance_driven: { label: 'Leistungsgetriebener', color: '#F59E0B' },
  meaning_seeker: { label: 'Sinn- & Beziehungstyp', color: '#10B981' },
  exhausted_functioner: { label: 'Erschöpfter Funktionierer', color: '#8B5CF6' }
};

export default function AnamnesisManager() {
  const [submissions, setSubmissions] = useState<AnamnesisSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('anamnesis_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching anamnesis submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSubmission = async (id: string, updates: Partial<AnamnesisSubmission>) => {
    try {
      const { error } = await supabase
        .from('anamnesis_submissions')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      fetchSubmissions();
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  };

  const saveNotes = async (id: string) => {
    await updateSubmission(id, { admin_notes: editingNotes[id] || '' });
    setEditingNotes({ ...editingNotes, [id]: '' });
  };

  const markAsRead = async (id: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from('anamnesis_submissions')
        .update({ is_read: isRead })
        .eq('id', id);

      if (error) throw error;

      setSubmissions(prev => prev.map(sub =>
        sub.id === id ? { ...sub, is_read: isRead } : sub
      ));
    } catch (error) {
      console.error('Error updating read status:', error);
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    const submission = submissions.find(s => s.id === id);
    if (submission && !submission.is_read && expandedId !== id) {
      markAsRead(id, true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Brain size={28} className="text-purple-600" />
            Anamnesebogen Submissions
          </h2>
          <p className="text-gray-600 mt-1">{submissions.length} Gesamteinreichungen</p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Brain size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Noch keine Anamnesebogen eingereicht</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => {
            const isExpanded = expandedId === submission.id;
            const typeConfig = TYPES_CONFIG[submission.primary_type as keyof typeof TYPES_CONFIG] || { label: submission.primary_type, color: '#6B7280' };

            return (
              <div
                key={submission.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: typeConfig.color }}
                        />
                        <h3 className="text-lg font-bold text-gray-900">
                          {submission.first_name} {submission.last_name}
                        </h3>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: `${typeConfig.color}20`,
                            color: typeConfig.color
                          }}
                        >
                          {typeConfig.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Mail size={16} />
                          {submission.email}
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={16} />
                            {submission.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(submission.created_at).toLocaleDateString('de-DE')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={submission.status}
                          onChange={(e) => updateSubmission(submission.id, { status: e.target.value })}
                          className="px-3 py-1 rounded-lg border border-gray-300 text-sm"
                        >
                          <option value="new">Neu</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="contacted">Kontaktiert</option>
                          <option value="converted">Converted</option>
                          <option value="archived">Archiviert</option>
                        </select>

                        <select
                          value={submission.priority}
                          onChange={(e) => updateSubmission(submission.id, { priority: e.target.value })}
                          className="px-3 py-1 rounded-lg border border-gray-300 text-sm"
                        >
                          <option value="low">Niedrig</option>
                          <option value="medium">Mittel</option>
                          <option value="high">Hoch</option>
                          <option value="urgent">Dringend</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(submission.id, !submission.is_read);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        submission.is_read
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                      title={submission.is_read ? 'Als ungelesen markieren' : 'Als gelesen markieren'}
                    >
                      <CheckCircle2 size={20} />
                    </button>
                    <button
                      onClick={() => toggleExpanded(submission.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp size={24} className="text-gray-600" />
                      ) : (
                        <ChevronDown size={24} className="text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Coaching Focus Preview */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Coaching-Fokus:</p>
                    <p className="text-sm text-gray-900">{submission.coaching_focus}</p>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-6">
                    {/* Baseline Scores */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{submission.inner_clarity}</div>
                        <div className="text-xs text-gray-600 mt-1">Klarheit</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{submission.inner_stability}</div>
                        <div className="text-xs text-gray-600 mt-1">Stabilität</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{submission.decision_capability}</div>
                        <div className="text-xs text-gray-600 mt-1">Entscheidung</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{submission.energy_level}</div>
                        <div className="text-xs text-gray-600 mt-1">Energie</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{submission.readiness_to_examine}</div>
                        <div className="text-xs text-gray-600 mt-1">Bereitschaft</div>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Was soll sich ändern:</p>
                        <p className="text-sm text-gray-900">{submission.what_should_change}</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Was darf nicht bleiben:</p>
                        <p className="text-sm text-gray-900">{submission.what_must_not_stay}</p>
                      </div>
                    </div>

                    {/* Coach Briefing */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-bold text-blue-900 mb-3">🎯 Coach-Briefing</p>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-blue-900">Hauptrolle:</span>{' '}
                          <span className="text-blue-800">{submission.primary_role}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-900">Entscheidungsstil:</span>{' '}
                          <span className="text-blue-800">{submission.decision_style}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-900">Stressreaktion:</span>{' '}
                          <span className="text-blue-800">{submission.stress_reaction}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-900">Druck vs. Ruhe:</span>{' '}
                          <span className="text-blue-800">{submission.inner_peace_vs_pressure}% Druck</span>
                        </div>
                      </div>
                    </div>

                    {/* Admin Notes */}
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Admin Notizen:</p>
                      <textarea
                        value={editingNotes[submission.id] ?? submission.admin_notes ?? ''}
                        onChange={(e) => setEditingNotes({ ...editingNotes, [submission.id]: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Notizen hinzufügen..."
                      />
                      <button
                        onClick={() => saveNotes(submission.id)}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        Notizen speichern
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
