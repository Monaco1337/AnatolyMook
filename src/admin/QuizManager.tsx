import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Brain, Mail, User, Calendar, TrendingUp, Eye, Trash2, Download } from 'lucide-react';

interface QuizSubmission {
  id: string;
  user_name: string;
  user_email: string;
  answers: any;
  score_old_consciousness: number;
  score_new_consciousness: number;
  dominant_type: string;
  result_text: string;
  submitted_at: string;
  read: boolean;
}

export default function QuizManager() {
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'new_consciousness' | 'old_consciousness' | 'transition'>('all');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('consciousness_quiz_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('consciousness_quiz_submissions')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
      loadSubmissions();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Möchten Sie diese Einreichung wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('consciousness_quiz_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSelectedSubmission(null);
      loadSubmissions();
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Datum', 'Typ', 'Alt %', 'Neu %'];
    const rows = filteredSubmissions.map(sub => {
      const totalQuestions = 6;
      const oldPercentage = Math.round((sub.score_old_consciousness / (totalQuestions * 3)) * 100);
      const newPercentage = Math.round((sub.score_new_consciousness / (totalQuestions * 3)) * 100);

      return [
        sub.user_name,
        sub.user_email,
        new Date(sub.submitted_at).toLocaleDateString('de-DE'),
        sub.dominant_type,
        oldPercentage,
        newPercentage
      ];
    });

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !sub.read;
    return sub.dominant_type === filter;
  });

  const stats = {
    total: submissions.length,
    unread: submissions.filter(s => !s.read).length,
    newConsciousness: submissions.filter(s => s.dominant_type === 'new_consciousness').length,
    oldConsciousness: submissions.filter(s => s.dominant_type === 'old_consciousness').length,
    transition: submissions.filter(s => s.dominant_type === 'transition').length
  };

  if (loading) {
    return <div className="p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Bewusstseins-Quiz Auswertungen</h2>
          <p className="text-white/60">Verwalten und analysieren Sie Quiz-Einreichungen</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <Download size={18} />
          <span>Exportieren</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="text-white/60 text-sm mb-1">Gesamt</div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="bg-yellow-400/10 p-4 rounded-xl border border-yellow-400/20">
          <div className="text-yellow-400/80 text-sm mb-1">Ungelesen</div>
          <div className="text-3xl font-bold text-yellow-400">{stats.unread}</div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="text-white/60 text-sm mb-1">Neu</div>
          <div className="text-3xl font-bold text-white">{stats.newConsciousness}</div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="text-white/60 text-sm mb-1">Alt</div>
          <div className="text-3xl font-bold text-white">{stats.oldConsciousness}</div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="text-white/60 text-sm mb-1">Transition</div>
          <div className="text-3xl font-bold text-white">{stats.transition}</div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'unread', 'new_consciousness', 'old_consciousness', 'transition'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === f
                ? 'bg-yellow-400 text-black font-semibold'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {f === 'all' && 'Alle'}
            {f === 'unread' && 'Ungelesen'}
            {f === 'new_consciousness' && 'Neues Bewusstsein'}
            {f === 'old_consciousness' && 'Altes Bewusstsein'}
            {f === 'transition' && 'Transition'}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
          {filteredSubmissions.map(submission => {
            const totalQuestions = 6;
            const oldPercentage = Math.round((submission.score_old_consciousness / (totalQuestions * 3)) * 100);
            const newPercentage = Math.round((submission.score_new_consciousness / (totalQuestions * 3)) * 100);

            return (
              <div
                key={submission.id}
                onClick={() => {
                  setSelectedSubmission(submission);
                  if (!submission.read) markAsRead(submission.id);
                }}
                className={`p-5 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedSubmission?.id === submission.id
                    ? 'bg-yellow-400/10 border-yellow-400/30'
                    : submission.read
                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                    : 'bg-yellow-400/5 border-yellow-400/20 hover:bg-yellow-400/10'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                      <Brain size={20} className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white flex items-center gap-2">
                        {submission.user_name}
                        {!submission.read && (
                          <span className="px-2 py-0.5 bg-yellow-400 text-black text-xs font-bold rounded">NEU</span>
                        )}
                      </div>
                      <div className="text-white/50 text-sm">{submission.user_email}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-white/40 mb-1">Alt</div>
                    <div className="text-white font-semibold">{oldPercentage}%</div>
                  </div>
                  <div>
                    <div className="text-white/40 mb-1">Neu</div>
                    <div className="text-yellow-400 font-semibold">{newPercentage}%</div>
                  </div>
                </div>

                <div className="text-white/40 text-xs mt-3">
                  {new Date(submission.submitted_at).toLocaleString('de-DE')}
                </div>
              </div>
            );
          })}

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12 text-white/40">
              Keine Einreichungen gefunden
            </div>
          )}
        </div>

        {selectedSubmission && (
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 sticky top-6">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Details</h3>
              <button
                onClick={() => deleteSubmission(selectedSubmission.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <User size={18} className="text-white/40" />
                <div>
                  <div className="text-white/40 text-xs">Name</div>
                  <div className="text-white font-semibold">{selectedSubmission.user_name}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-white/40" />
                <div>
                  <div className="text-white/40 text-xs">E-Mail</div>
                  <div className="text-white">{selectedSubmission.user_email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-white/40" />
                <div>
                  <div className="text-white/40 text-xs">Datum</div>
                  <div className="text-white">
                    {new Date(selectedSubmission.submitted_at).toLocaleString('de-DE')}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-5 rounded-xl mb-6">
              <div className="text-white/60 text-sm font-semibold mb-4">Bewertung</div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 text-sm">Altes Bewusstsein</span>
                    <span className="text-white font-semibold">
                      {Math.round((selectedSubmission.score_old_consciousness / 18) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/30 transition-all duration-500"
                      style={{ width: `${Math.round((selectedSubmission.score_old_consciousness / 18) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-400/80 text-sm">Neues Bewusstsein</span>
                    <span className="text-yellow-400 font-semibold">
                      {Math.round((selectedSubmission.score_new_consciousness / 18) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-yellow-400/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all duration-500"
                      style={{ width: `${Math.round((selectedSubmission.score_new_consciousness / 18) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-400/5 p-5 rounded-xl border border-yellow-400/20">
              <div className="text-yellow-400/80 text-sm font-semibold mb-3">Auswertung</div>
              <p className="text-white/80 leading-relaxed text-sm">{selectedSubmission.result_text}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-white/40 text-xs mb-2">Ausgewählte Fokusbereiche</div>
              {selectedSubmission.answers && Object.keys(selectedSubmission.answers).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const focusAreasAnswer = Object.values(selectedSubmission.answers)[0];
                    if (Array.isArray(focusAreasAnswer)) {
                      return focusAreasAnswer.map((area: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-xs">
                          {area}
                        </span>
                      ));
                    }
                    return <span className="text-white/40 text-sm">Keine Bereiche ausgewählt</span>;
                  })()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
