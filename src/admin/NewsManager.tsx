import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, MessageCircle, Check, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ImageUpload from './ImageUpload';

interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  author: string;
  image_url: string;
  category: string;
  published: boolean;
  featured: boolean;
  order_index: number;
  views_count: number;
  created_at: string;
  published_at: string;
}

interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  author_email: string;
  content: string;
  approved: boolean;
  created_at: string;
}

export default function NewsManager() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingArticle, setEditingArticle] = useState<Partial<NewsArticle> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setArticles(data);
    }
    setLoading(false);
  };

  const loadComments = async (articleId: string) => {
    const { data, error } = await supabase
      .from('news_comments')
      .select('*')
      .eq('article_id', articleId)
      .order('created_at', { ascending: false });

    if (data && !error) {
      setComments(data);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    const articleData = {
      ...editingArticle,
      updated_at: new Date().toISOString(),
      published_at: editingArticle.published && !editingArticle.id
        ? new Date().toISOString()
        : editingArticle.published_at
    };

    if (editingArticle.id) {
      await supabase
        .from('news_articles')
        .update(articleData)
        .eq('id', editingArticle.id);
    } else {
      await supabase
        .from('news_articles')
        .insert(articleData);
    }

    setShowForm(false);
    setEditingArticle(null);
    loadArticles();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Artikel wirklich löschen?')) {
      await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);
      loadArticles();
    }
  };

  const handleTogglePublish = async (article: NewsArticle) => {
    await supabase
      .from('news_articles')
      .update({
        published: !article.published,
        published_at: !article.published ? new Date().toISOString() : article.published_at
      })
      .eq('id', article.id);
    loadArticles();
  };

  const handleToggleFeatured = async (article: NewsArticle) => {
    await supabase
      .from('news_articles')
      .update({ featured: !article.featured })
      .eq('id', article.id);
    loadArticles();
  };

  const handleApproveComment = async (commentId: string, approved: boolean) => {
    await supabase
      .from('news_comments')
      .update({ approved })
      .eq('id', commentId);
    if (selectedArticleId) {
      loadComments(selectedArticleId);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (confirm('Kommentar wirklich löschen?')) {
      await supabase
        .from('news_comments')
        .delete()
        .eq('id', commentId);
      if (selectedArticleId) {
        loadComments(selectedArticleId);
      }
    }
  };

  const openComments = (articleId: string) => {
    setSelectedArticleId(articleId);
    loadComments(articleId);
    setShowComments(true);
  };

  if (loading) {
    return <div className="text-white p-8">Lade Artikel...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">News Artikel</h2>
        <button
          onClick={() => {
            setEditingArticle({
              title: '',
              subtitle: '',
              excerpt: '',
              content: '',
              author: 'ANATOLY MOOK',
              image_url: '',
              category: '',
              published: false,
              featured: false,
              order_index: 0
            });
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Neuer Artikel
        </button>
      </div>

      {showForm && editingArticle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 rounded-2xl p-8 max-w-4xl w-full my-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              {editingArticle.id ? 'Artikel bearbeiten' : 'Neuer Artikel'}
            </h3>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Titel *
                  </label>
                  <input
                    type="text"
                    value={editingArticle.title || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Untertitel
                  </label>
                  <input
                    type="text"
                    value={editingArticle.subtitle || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, subtitle: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Kurztext
                  </label>
                  <textarea
                    value={editingArticle.excerpt || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none resize-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Haupttext *
                  </label>
                  <textarea
                    value={editingArticle.content || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                    required
                    rows={10}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Autor
                  </label>
                  <input
                    type="text"
                    value={editingArticle.author || 'ANATOLY MOOK'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Kategorie
                  </label>
                  <input
                    type="text"
                    value={editingArticle.category || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none"
                    placeholder="z.B. Transformation, Coaching"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Bild
                  </label>
                  <ImageUpload
                    bucket="news-images"
                    currentImage={editingArticle.image_url || ''}
                    onImageChange={(url) => setEditingArticle({ ...editingArticle, image_url: url })}
                  />
                </div>

                <div className="col-span-2 flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingArticle.published || false}
                      onChange={(e) => setEditingArticle({ ...editingArticle, published: e.target.checked })}
                      className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-yellow-400 focus:ring-yellow-400/20"
                    />
                    <span className="text-zinc-300">Veröffentlicht</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingArticle.featured || false}
                      onChange={(e) => setEditingArticle({ ...editingArticle, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-yellow-400 focus:ring-yellow-400/20"
                    />
                    <span className="text-zinc-300">Featured (auf Homepage)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingArticle(null);
                  }}
                  className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-lg hover:shadow-lg transition-all"
                >
                  Speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showComments && selectedArticleId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 rounded-2xl p-8 max-w-4xl w-full my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Kommentare</h3>
              <button
                onClick={() => setShowComments(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {comments.length === 0 ? (
                <p className="text-zinc-500 text-center py-8">Keine Kommentare vorhanden</p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-4 rounded-lg border ${
                      comment.approved
                        ? 'bg-zinc-800 border-zinc-700'
                        : 'bg-orange-900/20 border-orange-500/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-white font-medium">{comment.author_name}</p>
                        <p className="text-xs text-zinc-500">{comment.author_email}</p>
                        <p className="text-xs text-zinc-500 mt-1">
                          {new Date(comment.created_at).toLocaleString('de-DE')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveComment(comment.id, !comment.approved)}
                          className={`p-2 rounded-lg transition-colors ${
                            comment.approved
                              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                              : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
                          }`}
                          title={comment.approved ? 'Freigabe entziehen' : 'Freigeben'}
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          title="Löschen"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <div className="flex gap-6">
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{article.title}</h3>
                    {article.subtitle && (
                      <p className="text-zinc-400 text-sm">{article.subtitle}</p>
                    )}
                    {article.category && (
                      <span className="inline-block mt-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-xs text-yellow-300">
                        {article.category}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleFeatured(article)}
                      className={`p-2 rounded-lg transition-colors ${
                        article.featured
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                      }`}
                      title="Featured"
                    >
                      <Star size={18} />
                    </button>
                    <button
                      onClick={() => handleTogglePublish(article)}
                      className={`p-2 rounded-lg transition-colors ${
                        article.published
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                      }`}
                      title={article.published ? 'Veröffentlicht' : 'Entwurf'}
                    >
                      {article.published ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button
                      onClick={() => openComments(article.id)}
                      className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-700 transition-colors"
                      title="Kommentare"
                    >
                      <MessageCircle size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingArticle(article);
                        setShowForm(true);
                      }}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{article.excerpt}</p>

                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.views_count} Aufrufe</span>
                  <span>•</span>
                  <span>
                    {article.published_at
                      ? new Date(article.published_at).toLocaleDateString('de-DE')
                      : 'Nicht veröffentlicht'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
