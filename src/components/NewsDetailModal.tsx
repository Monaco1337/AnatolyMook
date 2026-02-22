import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Eye, Calendar, User, MessageCircle, Send, Check, Clock, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  author: string;
  image_url: string;
  category: string;
  views_count: number;
  published_at: string;
}

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
  approved: boolean;
}

interface NewsDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export default function NewsDetailModal({ article, onClose }: NewsDetailModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!article) return;

    loadComments();
    incrementViews();

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const scrollY = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;

      requestAnimationFrame(() => {
        if (typeof scrollY === 'number' && scrollY >= 0) {
          try {
            window.scrollTo({
              top: scrollY,
              left: 0,
              behavior: 'instant' as ScrollBehavior
            });
          } catch (e) {
            window.scrollTo(0, scrollY);
          }
        }
      });
    };
  }, [article?.id]);

  const loadComments = async () => {
    if (!article) return;

    const { data, error } = await supabase
      .from('news_comments')
      .select('*')
      .eq('article_id', article.id)
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (data && !error) {
      setComments(data);
    }
  };

  const incrementViews = async () => {
    if (!article) return;

    await supabase.rpc('increment_news_views', { article_id: article.id });
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article || !newComment.name || !newComment.email || !newComment.content) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('news_comments')
      .insert({
        article_id: article.id,
        author_name: newComment.name,
        author_email: newComment.email,
        content: newComment.content,
        approved: false
      });

    if (!error) {
      setNewComment({ name: '', email: '', content: '' });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    }

    setIsSubmitting(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPercentage = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    setScrollProgress(scrollPercentage);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  const handleCloseClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  };

  if (!article) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem',
        overflow: 'hidden'
      }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.98), rgba(0, 0, 0, 0.98))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
          maxWidth: '500px',
          maxHeight: 'calc(75vh - 1rem)',
          height: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-50">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <button
          onClick={handleCloseClick}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl
            backdrop-blur-2xl transition-all duration-500
            hover:scale-110 active:scale-95 group"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
          }}
          aria-label="Schließen"
        >
          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-yellow-400/0 to-orange-400/0 group-hover:from-yellow-400/20 group-hover:to-orange-400/20 transition-all duration-500" />
          <X className="w-4 h-4 text-white/70 group-hover:text-white transition-colors m-auto relative z-10" strokeWidth={2.5} />
        </button>

        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
          }}
        >
          {article.image_url && (
            <div className="relative h-[18vh] sm:h-[20vh] overflow-hidden">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {article.category && (
                    <div className="px-2 py-0.5 rounded-full backdrop-blur-xl"
                      style={{
                        background: 'rgba(251, 191, 36, 0.15)',
                        border: '1px solid rgba(251, 191, 36, 0.3)'
                      }}
                    >
                      <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-zinc-400 text-xs">
                    <Eye className="w-3 h-3" />
                    <span>{article.views_count}</span>
                  </div>
                </div>
                <h1 className="text-base sm:text-lg font-light text-white mb-1.5 leading-tight">
                  {article.title}
                </h1>
                {article.subtitle && (
                  <p className="text-xs sm:text-sm text-zinc-300 font-light">
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pb-2 sm:pb-3 mb-3 sm:mb-4 border-b border-white/10">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <User className="w-3 h-3" />
                <span className="text-xs font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Calendar className="w-3 h-3" />
                <span className="text-xs">{formatDate(article.published_at)}</span>
              </div>
            </div>

            <div className="prose prose-invert prose-sm max-w-none mb-4 sm:mb-5">
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-2 sm:mb-3">
                {article.excerpt}
              </div>
              <div className="text-xs text-zinc-400 font-light leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 sm:pt-4">
              <div className="flex items-center gap-1.5 mb-3 sm:mb-4">
                <MessageCircle className="w-4 h-4 text-yellow-400" />
                <h3 className="text-sm sm:text-base font-light text-white">
                  Kommentare{' '}
                  <span className="text-zinc-500">({comments.length})</span>
                </h3>
              </div>

              <form onSubmit={handleSubmitComment} className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                      required
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs
                        bg-white/5 border border-white/10
                        text-white placeholder-zinc-500
                        focus:bg-white/10 focus:border-yellow-400/50
                        transition-all duration-300 outline-none"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      value={newComment.email}
                      onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                      required
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs
                        bg-white/5 border border-white/10
                        text-white placeholder-zinc-500
                        focus:bg-white/10 focus:border-yellow-400/50
                        transition-all duration-300 outline-none"
                      placeholder="ihre@email.de"
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Kommentar *
                  </label>
                  <textarea
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    required
                    rows={2}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs
                      bg-white/5 border border-white/10
                      text-white placeholder-zinc-500
                      focus:bg-white/10 focus:border-yellow-400/50
                      transition-all duration-300 outline-none resize-none"
                    placeholder="Teilen Sie Ihre Gedanken..."
                  />
                </div>

                {submitSuccess && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 mb-2">
                    <Check className="w-3 h-3 text-green-400" />
                    <p className="text-xs text-green-400">
                      Kommentar eingereicht! Wird geprüft.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-3 py-1.5 rounded-lg text-xs
                    bg-gradient-to-r from-yellow-400 to-orange-400
                    text-black font-medium
                    hover:shadow-lg hover:shadow-yellow-400/50
                    transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:scale-105 active:scale-95
                    flex items-center gap-1.5"
                >
                  <span>{isSubmitting ? 'Wird gesendet...' : 'Absenden'}</span>
                  <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>

              <div className="space-y-2">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-2.5 rounded-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/5"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center flex-shrink-0">
                          <span className="text-black font-semibold text-xs">
                            {comment.author_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium text-xs">{comment.author_name}</p>
                          <p className="text-xs text-zinc-500">{formatDate(comment.created_at)}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-zinc-300 leading-relaxed font-light text-xs">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>

              {comments.length === 0 && (
                <div className="text-center py-4">
                  <MessageCircle className="w-6 h-6 text-zinc-600 mx-auto mb-2" />
                  <p className="text-zinc-500 font-light text-xs">
                    Noch keine Kommentare.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
