import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, Clock, Tag, ArrowRight, Search, Sparkles, BookOpen, TrendingUp, Heart, Zap, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  display_order: number;
}

interface BlogPost {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  author_image: string;
  reading_time: number;
  tags: string[];
  is_published: boolean;
  is_featured: boolean;
  published_at: string;
  views_count: number;
}

export default function Blog() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
    loadPosts();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('display_order');
      if (error) throw error;
      if (data) setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      if (error) throw error;
      if (data) {
        setPosts(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category_id === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.is_featured);
  const regularPosts = filteredPosts.filter(post => !post.is_featured);

  const getCategoryById = (id: string) => categories.find(cat => cat.id === id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .luxury-gradient {
          background: linear-gradient(135deg,
            #FDFAF5 0%,
            #F8F3EB 25%,
            #FFF9F0 50%,
            #F5EFE7 75%,
            #FAF6F1 100%
          );
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.1);
        }
        .gold-accent {
          background: linear-gradient(135deg, #D4AF37 0%, #F5E6D3 100%);
        }
        .shimmer-text {
          background: linear-gradient(90deg,
            #8B7355 0%,
            #D4AF37 25%,
            #F5E6D3 50%,
            #D4AF37 75%,
            #8B7355 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .blog-card {
          transform: translateZ(0);
        }
        .category-badge {
          transition: all 0.3s ease;
        }
        .category-badge:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div className="luxury-gradient min-h-screen">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-32 pb-32">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Sparkles className="text-amber-600" size={18} />
              <span className="text-sm font-medium text-stone-700">{t.blog.insightsInspiration}</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-tight">
              <span className="shimmer-text">{t.blog.title}</span>
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
              {t.blog.subtitle}
            </p>
          </div>

          <div className="mb-16">
            <div className="relative w-full max-w-3xl mx-auto mb-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-amber-500/30 to-amber-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center">
                  <Search className="absolute left-6 text-amber-600/60 group-hover:text-amber-600 transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder={t.blog.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-16 pl-16 pr-6 glass-card rounded-2xl text-base text-stone-800 placeholder-stone-400/80 border-0 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all duration-300 font-light"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg'
                    : 'glass-card text-stone-700 hover:shadow-md'
                }`}
              >
                {t.blog.categories.all}
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`category-badge px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg'
                      : 'glass-card text-stone-700 hover:shadow-md'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {featuredPosts.length > 0 && (
                <div className="mb-20">
                  <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="text-amber-600" size={24} />
                    <h2 className="text-3xl font-light text-stone-900">{t.blog.featured}</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {featuredPosts.map((post, idx) => (
                      <FeaturedPostCard
                        key={post.id}
                        post={post}
                        category={getCategoryById(post.category_id)}
                        onClick={() => setSelectedPost(post)}
                        delay={idx * 100}
                        t={t}
                      />
                    ))}
                  </div>
                </div>
              )}

              {regularPosts.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <BookOpen className="text-amber-600" size={24} />
                    <h2 className="text-3xl font-light text-stone-900">{t.blog.allArticles}</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post, idx) => (
                      <BlogPostCard
                        key={post.id}
                        post={post}
                        category={getCategoryById(post.category_id)}
                        onClick={() => setSelectedPost(post)}
                        delay={idx * 50}
                        t={t}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-card mb-6">
                    <Search size={32} className="text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-light text-stone-800 mb-3">{t.blog.noArticlesFound}</h3>
                  <p className="text-stone-600">{t.blog.adjustFilters}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {selectedPost && (
        <BlogPostModal
          post={selectedPost}
          category={getCategoryById(selectedPost.category_id)}
          onClose={() => setSelectedPost(null)}
          formatDate={formatDate}
          t={t}
        />
      )}
    </div>
  );
}

function FeaturedPostCard({ post, category, onClick, delay, t }: {
  post: BlogPost;
  category?: BlogCategory;
  onClick: () => void;
  delay: number;
  t: any;
}) {
  return (
    <div
      onClick={onClick}
      className="blog-card glass-card rounded-3xl overflow-hidden cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute top-6 left-6">
          {category && (
            <span
              className="px-4 py-2 rounded-full text-white text-xs font-semibold shadow-lg"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
          )}
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-2xl font-semibold text-white mb-3 leading-tight">
            {post.title}
          </h3>
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>{post.reading_time} {t.blog.minutes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>{new Date(post.published_at).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <p className="text-stone-600 leading-relaxed mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center text-white font-semibold">
              {post.author_name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-stone-700">{post.author_name}</span>
          </div>
          <div className="flex items-center gap-2 text-amber-600 font-medium">
            <span className="text-sm">{t.blog.readMore}</span>
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogPostCard({ post, category, onClick, delay, t }: {
  post: BlogPost;
  category?: BlogCategory;
  onClick: () => void;
  delay: number;
  t: any;
}) {
  return (
    <div
      onClick={onClick}
      className="blog-card glass-card rounded-2xl overflow-hidden cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {category && (
          <div className="absolute top-4 left-4">
            <span
              className="px-3 py-1.5 rounded-full text-white text-xs font-semibold shadow-lg"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-stone-500 text-xs mb-3">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.reading_time} {t.blog.minutes}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(post.published_at).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-stone-900 mb-3 leading-tight line-clamp-2">
          {post.title}
        </h3>
        <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-stone-700">{post.author_name}</span>
          <div className="flex items-center gap-1.5 text-amber-600 font-medium text-sm">
            <span>{t.blog.read}</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogPostModal({ post, category, onClose, formatDate, t }: {
  post: BlogPost;
  category?: BlogCategory;
  onClose: () => void;
  formatDate: (date: string) => string;
  t: any;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-xl font-semibold text-stone-900 mb-3 mt-6 first:mt-0">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-lg font-semibold text-stone-900 mb-2 mt-5">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-base font-semibold text-stone-900 mb-2 mt-4">{line.slice(4)}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={idx} className="text-sm font-semibold text-stone-800 my-3 italic">{line.slice(2, -2)}</p>;
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-sm text-stone-700 leading-relaxed mb-2">{line}</p>;
    });
  };

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingBottom: '1.5rem',
      overflow: 'auto'
    }}>
      <div className="bg-white rounded-[24px] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" style={{ margin: 'auto' }}>
        <div className="px-6 md:px-8 py-5 md:py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-stone-500 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{post.reading_time} {t.blog.readingTime}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6">
          <div className="relative h-64 md:h-80 overflow-hidden rounded-2xl mb-6">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            {category && (
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1.5 rounded-full text-white text-xs font-semibold shadow-lg"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </span>
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-light text-stone-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center text-white font-semibold">
              {post.author_name.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-stone-900">{post.author_name}</div>
              <div className="text-sm text-stone-500">{t.blog.authorCoach}</div>
            </div>
          </div>

          <div className="prose prose-base max-w-none mb-8">
            {renderContent(post.content)}
          </div>

          {post.tags.length > 0 && (
            <div className="pt-6 border-t border-stone-200">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={16} className="text-amber-600" />
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-stone-100 text-sm font-medium text-stone-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
