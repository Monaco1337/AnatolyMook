import { useState, useEffect } from 'react';
import { Brain, Mail, User, Calendar, TrendingUp, TrendingDown, Sparkles, Search, Download, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface QuizSubmission {
  id: string;
  user_name: string;
  user_email: string;
  answers: any;
  score_old_consciousness: number;
  score_new_consciousness: number;
  dominant_type: string;
  result_text: string;
  created_at: string;
  read: boolean;
}

export default function QuizSubmissionsManager() {
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('consciousness_quiz_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeName = (type: string) => {
    if (type === 'new_consciousness') return 'Der Bewusste';
    if (type === 'old_consciousness') return 'Der Suchende';
    return 'Der Transformierende';
  };

  const getTypeColor = (type: string) => {
    if (type === 'new_consciousness') return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (type === 'old_consciousness') return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
  };

  const getTypeIcon = (type: string) => {
    if (type === 'new_consciousness') return <TrendingUp className="w-4 h-4" />;
    if (type === 'old_consciousness') return <TrendingDown className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  const calculatePercentages = (submission: QuizSubmission) => {
    const totalQuestions = 7;
    const oldPercentage = Math.round((submission.score_old_consciousness / (totalQuestions * 3)) * 100);
    const newPercentage = Math.round((submission.score_new_consciousness / (totalQuestions * 3)) * 100);
    return { oldPercentage, newPercentage };
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sub.user_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || sub.dominant_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const markAsRead = async (id: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from('consciousness_quiz_submissions')
        .update({ read: isRead })
        .eq('id', id);

      if (error) throw error;

      setSubmissions(prev => prev.map(sub =>
        sub.id === id ? { ...sub, read: isRead } : sub
      ));
    } catch (error) {
      console.error('Error updating read status:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'E-Mail', 'Typ', 'Alt %', 'Neu %', 'Datum'];
    const rows = filteredSubmissions.map(sub => {
      const { oldPercentage, newPercentage } = calculatePercentages(sub);
      return [
        sub.user_name,
        sub.user_email,
        getTypeName(sub.dominant_type),
        oldPercentage,
        newPercentage,
        new Date(sub.created_at).toLocaleDateString('de-DE')
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `quiz-auswertungen-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/50">Lädt Quiz-Auswertungen...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-black" strokeWidth={2.5} />
            </div>
            Quiz-Auswertungen
          </h1>
          <p className="text-white/60">Übersicht aller Bewusstseins-Analysen</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
          >
            <Download className="w-4 h-4" />
            CSV Export
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-white/50 text-sm font-semibold mb-2">Gesamt</div>
          <div className="text-3xl font-bold text-white">{submissions.length}</div>
        </div>
        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
          <div className="text-green-400 text-sm font-semibold mb-2">Der Bewusste</div>
          <div className="text-3xl font-bold text-green-400">
            {submissions.filter(s => s.dominant_type === 'new_consciousness').length}
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
          <div className="text-yellow-400 text-sm font-semibold mb-2">Der Transformierende</div>
          <div className="text-3xl font-bold text-yellow-400">
            {submissions.filter(s => s.dominant_type === 'transition').length}
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
          <div className="text-blue-400 text-sm font-semibold mb-2">Der Suchende</div>
          <div className="text-3xl font-bold text-blue-400">
            {submissions.filter(s => s.dominant_type === 'old_consciousness').length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            placeholder="Name oder E-Mail suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-yellow-400/50 focus:bg-white/10 transition-all outline-none"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-yellow-400/50 focus:bg-white/10 transition-all outline-none"
        >
          <option value="all">Alle Typen</option>
          <option value="new_consciousness">Der Bewusste</option>
          <option value="transition">Der Transformierende</option>
          <option value="old_consciousness">Der Suchende</option>
        </select>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <Brain className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">Keine Auswertungen gefunden</p>
          </div>
        ) : (
          filteredSubmissions.map((submission) => {
            const { oldPercentage, newPercentage } = calculatePercentages(submission);

            return (
              <div
                key={submission.id}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-400/30 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* User Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-yellow-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">{submission.user_name}</h3>
                            <div className="flex items-center gap-2 text-white/50 text-sm">
                              <Mail className="w-3.5 h-3.5" />
                              {submission.user_email}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-white/40 text-sm">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(submission.created_at).toLocaleDateString('de-DE', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>

                      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${getTypeColor(submission.dominant_type)} font-semibold text-sm whitespace-nowrap`}>
                        {getTypeIcon(submission.dominant_type)}
                        {getTypeName(submission.dominant_type)}
                      </div>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-white/40 text-xs font-semibold uppercase mb-2">Alt</div>
                      <div className="text-3xl font-bold text-white/60">{oldPercentage}%</div>
                    </div>

                    <div className="w-px h-16 bg-white/10" />

                    <div className="text-center">
                      <div className="text-yellow-400 text-xs font-semibold uppercase mb-2">Neu</div>
                      <div className="text-3xl font-bold text-yellow-400">{newPercentage}%</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => markAsRead(submission.id, !submission.read)}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        submission.read
                          ? 'bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20'
                          : 'bg-white/5 border border-white/10 text-white/40 hover:bg-white/10'
                      }`}
                      title={submission.read ? 'Als ungelesen markieren' : 'Als gelesen markieren'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {submission.read ? 'Gelesen' : 'Ungelesen'}
                    </button>
                    <a
                      href={`mailto:${submission.user_email}?subject=Ihre Bewusstseins-Analyse&body=Hallo ${submission.user_name},%0D%0A%0D%0A`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-semibold transition-all hover:scale-105"
                    >
                      <Mail className="w-4 h-4" />
                      Kontakt
                    </a>
                  </div>
                </div>

                {/* Result Text */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm leading-relaxed">{submission.result_text}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
