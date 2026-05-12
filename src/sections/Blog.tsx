import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, Clock, Tag, ArrowRight, Search, BookOpen, X } from 'lucide-react';
import type deTranslations from '../i18n/de';
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

const FONT_HEAD = "'Montserrat', system-ui, -apple-system, sans-serif";
const FONT_BODY =
  "'Avenir Next', 'Avenir', 'Nunito Sans', 'Inter', system-ui, -apple-system, sans-serif";
const BRONZE = 'rgba(201, 155, 98, 0.95)';
const BRONZE_MUTED = 'rgba(214, 168, 94, 0.72)';
const BRONZE_LINE = 'rgba(214, 168, 94, 0.18)';
const BRONZE_SOFT = 'rgba(214, 168, 94, 0.1)';

function localeForLang(lang: string) {
  if (lang === 'ru') return 'ru-RU';
  if (lang === 'en') return 'en-GB';
  return 'de-DE';
}

export default function Blog() {
  const { t, language } = useLanguage();
  const locale = localeForLang(language);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

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

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category_id === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter((post) => post.is_featured);
  const regularPosts = filteredPosts.filter((post) => !post.is_featured);

  const getCategoryById = (id: string) => categories.find((cat) => cat.id === id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const formatDateShort = (dateString: string) =>
    new Date(dateString).toLocaleDateString(locale, { day: 'numeric', month: 'short' });

  return (
    <div
      className="min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: '#050505', fontFamily: FONT_BODY }}
    >
      <div className="pointer-events-none fixed inset-0">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/manifest/footer-stone-granite-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            opacity: 0.35,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 70% at 50% 18%, rgba(214,168,94,0.05) 0%, transparent 52%), radial-gradient(120% 85% at 50% 100%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 100%)',
          }}
        />
      </div>

      <div className="relative">
        {/* Hero — kompakt, Startseiten-Ton */}
        <header className="mx-auto max-w-3xl px-5 pt-[5.25rem] pb-7 text-center sm:pt-28 sm:pb-8 md:px-8 lg:max-w-[42rem]">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 fade-in-up"
            style={{
              borderColor: BRONZE_LINE,
              background: 'rgba(12,11,10,0.55)',
            }}
          >
            <BookOpen className="h-4 w-4" strokeWidth={1.65} style={{ color: BRONZE }} aria-hidden />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.26em]"
              style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
            >
              {t.blog.insightsInspiration}
            </span>
          </div>
          <h1
            className="fade-in-up mb-3 text-[1.625rem] font-light leading-snug tracking-[-0.02em] sm:text-[2rem] md:text-[2.125rem]"
            style={{
              fontFamily: FONT_HEAD,
              color: 'rgba(248,243,232,0.96)',
              textShadow: '0 1px 0 rgba(20,12,6,0.45)',
              animationDelay: '0.04s',
            }}
          >
            {t.blog.title}
          </h1>
          <p
            className="mx-auto mb-6 max-w-[32rem] text-[14px] font-light leading-[1.58] sm:text-[15px]"
            style={{ color: 'rgba(244,239,230,0.58)' }}
          >
            {t.blog.subtitle}
          </p>

          <div className="relative mx-auto max-w-xl">
            <div
              className="relative rounded-[13px] border transition-[border-color,box-shadow] duration-200 ease-out"
              style={{
                borderColor: searchFocused ? 'rgba(214,168,94,0.32)' : BRONZE_LINE,
                background: 'rgba(10,9,8,0.72)',
                boxShadow: searchFocused ? '0 0 22px rgba(214,168,94,0.05)' : 'none',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 opacity-[0.72]"
                size={17}
                strokeWidth={1.6}
                style={{ color: BRONZE }}
                aria-hidden
              />
              <input
                type="search"
                enterKeyHint="search"
                placeholder={t.blog.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full rounded-[13px] border-0 bg-transparent py-2.5 pl-11 pr-4 text-[14px] font-light outline-none placeholder:text-[rgba(238,230,216,0.35)] focus:ring-0"
                style={{ fontFamily: FONT_BODY, color: 'rgba(248,243,232,0.92)' }}
              />
            </div>
          </div>
        </header>

        {/* Filter — ruhige Pills */}
        <div className="relative mx-auto max-w-5xl px-5 pb-5 pt-1 md:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center rounded-full border px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.13em] transition-colors duration-200 md:px-4 md:text-[11.5px]"
              style={{
                fontFamily: FONT_HEAD,
                borderColor: selectedCategory === 'all' ? 'rgba(214,168,94,0.42)' : BRONZE_LINE,
                background:
                  selectedCategory === 'all'
                    ? 'linear-gradient(180deg, rgba(214,168,94,0.2) 0%, rgba(100,72,42,0.16) 100%)'
                    : 'rgba(10,9,8,0.45)',
                color: selectedCategory === 'all' ? 'rgba(248,243,232,0.95)' : 'rgba(238,230,216,0.62)',
              }}
            >
              {t.blog.categories.all}
            </button>
            {categories.map((category) => {
              const active = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className="inline-flex items-center rounded-full border px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.13em] transition-colors duration-200 md:px-4 md:text-[11.5px]"
                  style={{
                    fontFamily: FONT_HEAD,
                    borderColor: active ? 'rgba(214,168,94,0.42)' : BRONZE_LINE,
                    background: active
                      ? 'linear-gradient(180deg, rgba(214,168,94,0.2) 0%, rgba(100,72,42,0.16) 100%)'
                      : 'rgba(10,9,8,0.45)',
                    color: active ? 'rgba(248,243,232,0.95)' : 'rgba(238,230,216,0.62)',
                  }}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-16 md:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16" role="status">
              <span className="sr-only">
                {language === 'en' ? 'Loading…' : language === 'ru' ? 'Загрузка…' : 'Lädt …'}
              </span>
              <div
                className="h-9 w-9 animate-spin rounded-full border-2 border-t-transparent border-[rgba(214,168,94,0.28)]"
                aria-hidden
              />
            </div>
          ) : (
            <>
              {featuredPosts.length > 0 && (
                <section className="mb-10 sm:mb-12">
                  <h2
                    className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] sm:mb-5 sm:text-left"
                    style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
                  >
                    {t.blog.featured}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    {featuredPosts.map((post, idx) => (
                      <FeaturedPostCard
                        key={post.id}
                        post={post}
                        category={getCategoryById(post.category_id)}
                        onClick={() => setSelectedPost(post)}
                        delayMs={idx * 40}
                        t={t}
                        formatDateShort={formatDateShort}
                      />
                    ))}
                  </div>
                </section>
              )}

              {regularPosts.length > 0 && (
                <section>
                  <h2
                    className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] sm:mb-5 sm:text-left"
                    style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
                  >
                    {t.blog.allArticles}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {regularPosts.map((post, idx) => (
                      <BlogPostCard
                        key={post.id}
                        post={post}
                        category={getCategoryById(post.category_id)}
                        onClick={() => setSelectedPost(post)}
                        delayMs={idx * 35}
                        t={t}
                        formatDateShort={formatDateShort}
                      />
                    ))}
                  </div>
                </section>
              )}

              {filteredPosts.length === 0 && (
                <div className="fade-in py-12 text-center sm:py-14">
                  <div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border"
                    style={{ borderColor: BRONZE_LINE, background: 'rgba(10,9,8,0.5)' }}
                  >
                    <Search className="h-6 w-6 text-[rgba(238,230,216,0.38)]" strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3
                    className="mb-2 text-[1.15rem] font-light sm:text-[1.2rem]"
                    style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.92)' }}
                  >
                    {t.blog.noArticlesFound}
                  </h3>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: 'rgba(238,230,216,0.5)' }}>
                    {t.blog.adjustFilters}
                  </p>
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

      <style>{`
        @keyframes blogFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in { animation: blogFadeIn 0.35s ease-out both; }
        @keyframes blogFadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: blogFadeInUp 0.38s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .fade-in-up, .fade-in { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function CategoryPill({ name }: { name: string }) {
  return (
    <span
      className="inline-block max-w-full truncate rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em]"
      style={{
        fontFamily: FONT_HEAD,
        borderColor: BRONZE_LINE,
        background: 'rgba(8,7,6,0.65)',
        color: BRONZE_MUTED,
      }}
    >
      {name}
    </span>
  );
}

function FeaturedPostCard({
  post,
  category,
  onClick,
  delayMs,
  t,
  formatDateShort,
}: {
  post: BlogPost;
  category?: BlogCategory;
  onClick: () => void;
  delayMs: number;
  t: typeof deTranslations;
  formatDateShort: (d: string) => string;
}) {
  const img = post.featured_image?.trim();

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="fade-in-up group cursor-pointer rounded-[14px] border transition-[border-color,background] duration-200 ease-out"
      style={{
        animationDelay: `${delayMs}ms`,
        borderColor: BRONZE_LINE,
        background: 'rgba(12,11,10,0.42)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <div className="relative h-40 shrink-0 overflow-hidden sm:h-auto sm:w-[42%] sm:min-h-[168px]">
          {img ? (
            <img
              src={img}
              alt=""
              className="h-full w-full object-cover transition-[filter] duration-200 group-hover:brightness-[1.035]"
              loading="lazy"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background:
                  'linear-gradient(145deg, rgba(24,22,20,0.95) 0%, rgba(14,12,10,0.98) 48%, rgba(32,26,18,0.9) 100%)',
              }}
            />
          )}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, rgba(5,5,5,0.5) 0%, transparent 55%)',
            }}
          />
          <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)]">
            {category && <CategoryPill name={category.name} />}
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 sm:px-5 sm:py-4">
          <h3
            className="mb-2 line-clamp-2 text-[1.05rem] font-normal leading-snug sm:text-[1.125rem]"
            style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.94)' }}
          >
            {post.title}
          </h3>
          <p
            className="mb-3 line-clamp-2 text-[13px] font-light leading-relaxed sm:line-clamp-3"
            style={{ fontFamily: FONT_BODY, color: 'rgba(244,239,230,0.52)' }}
          >
            {post.excerpt}
          </p>
          <div
            className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] font-light tabular-nums"
            style={{ color: 'rgba(238,230,216,0.45)' }}
          >
            <span className="inline-flex items-center gap-1">
              <Clock size={13} strokeWidth={1.6} style={{ color: BRONZE }} aria-hidden />
              {post.reading_time} {t.blog.minutes}
            </span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={13} strokeWidth={1.6} style={{ color: BRONZE }} aria-hidden />
              {formatDateShort(post.published_at)}
            </span>
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="truncate text-[12px] font-light" style={{ color: 'rgba(238,230,216,0.55)' }}>
              {post.author_name}
            </span>
            <span
              className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 group-hover:text-[rgba(248,243,232,0.88)]"
              style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
            >
              {t.blog.readMore}
              <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function BlogPostCard({
  post,
  category,
  onClick,
  delayMs,
  t,
  formatDateShort,
}: {
  post: BlogPost;
  category?: BlogCategory;
  onClick: () => void;
  delayMs: number;
  t: typeof deTranslations;
  formatDateShort: (d: string) => string;
}) {
  const img = post.featured_image?.trim();

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="fade-in-up group cursor-pointer overflow-hidden rounded-[13px] border transition-[border-color,background] duration-200 ease-out"
      style={{
        animationDelay: `${delayMs}ms`,
        borderColor: BRONZE_LINE,
        background: 'rgba(12,11,10,0.42)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div className="relative h-36 overflow-hidden sm:h-[9.25rem]">
        {img ? (
          <img
            src={img}
            alt=""
            className="h-full w-full object-cover transition-[filter] duration-200 group-hover:brightness-[1.035]"
            loading="lazy"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                'linear-gradient(160deg, rgba(22,20,18,0.98) 0%, rgba(10,9,8,1) 100%)',
            }}
          />
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.65) 0%, transparent 50%)' }}
        />
        {category && (
          <div className="absolute left-2.5 top-2.5 max-w-[calc(100%-1.25rem)]">
            <CategoryPill name={category.name} />
          </div>
        )}
      </div>
      <div className="px-3.5 pb-3.5 pt-3 sm:px-4 sm:pb-4 sm:pt-3">
        <div
          className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10.5px] font-light uppercase tracking-[0.08em] tabular-nums"
          style={{ fontFamily: FONT_HEAD, color: 'rgba(238,230,216,0.42)' }}
        >
          <span className="inline-flex items-center gap-1 normal-case tracking-normal">
            <Clock size={12} strokeWidth={1.6} style={{ color: BRONZE }} aria-hidden />
            {post.reading_time} {t.blog.minutes}
          </span>
          <span className="opacity-35">·</span>
          <span>{formatDateShort(post.published_at)}</span>
        </div>
        <h3
          className="mb-2 line-clamp-2 text-[14.5px] font-normal leading-snug sm:text-[15px]"
          style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.93)' }}
        >
          {post.title}
        </h3>
        <p
          className="mb-3 line-clamp-2 text-[12.75px] font-light leading-[1.55] sm:text-[13px]"
          style={{ fontFamily: FONT_BODY, color: 'rgba(244,239,230,0.5)' }}
        >
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between gap-2 border-t pt-2.5" style={{ borderColor: 'rgba(255,255,255,0.055)' }}>
          <span className="truncate text-[11px] font-light" style={{ color: 'rgba(238,230,216,0.48)' }}>
            {post.author_name}
          </span>
          <span
            className="flex shrink-0 items-center gap-1 text-[10.5px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 group-hover:text-[rgba(248,243,232,0.82)]"
            style={{ fontFamily: FONT_HEAD, color: BRONZE_MUTED }}
          >
            {t.blog.read}
            <ArrowRight size={13} strokeWidth={2} aria-hidden />
          </span>
        </div>
      </div>
    </article>
  );
}

function BlogPostModal({
  post,
  category,
  onClose,
  formatDate,
  t,
}: {
  post: BlogPost;
  category?: BlogCategory;
  onClose: () => void;
  formatDate: (date: string) => string;
  t: typeof deTranslations;
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
        return (
          <h3
            key={idx}
            className="mb-2 mt-5 text-[1.05rem] font-normal leading-snug first:mt-0"
            style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.94)' }}
          >
            {line.slice(2)}
          </h3>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h4
            key={idx}
            className="mb-2 mt-4 text-[0.98rem] font-normal leading-snug"
            style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.92)' }}
          >
            {line.slice(3)}
          </h4>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h5
            key={idx}
            className="mb-1.5 mt-3 text-[0.9rem] font-medium leading-snug"
            style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.88)' }}
          >
            {line.slice(4)}
          </h5>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p
            key={idx}
            className="my-2.5 text-[13.25px] font-normal italic leading-relaxed"
            style={{ fontFamily: FONT_BODY, color: 'rgba(244,239,230,0.72)' }}
          >
            {line.slice(2, -2)}
          </p>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p
          key={idx}
          className="mb-2 text-[13.75px] font-light leading-[1.65]"
          style={{ fontFamily: FONT_BODY, color: 'rgba(244,239,230,0.66)' }}
        >
          {line}
        </p>
      );
    });
  };

  const img = post.featured_image?.trim();

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 pb-10 pt-[min(6rem,12vh)]"
      style={{
        backgroundColor: 'rgba(6, 5, 4, 0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-[18px] border shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
        style={{
          borderColor: BRONZE_LINE,
          background: 'linear-gradient(180deg, rgba(18,16,14,0.97) 0%, rgba(8,7,6,0.99) 100%)',
          maxHeight: 'min(92vh, 920px)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-modal-title"
      >
        <div className="flex items-start justify-between gap-3 border-b px-5 py-4 sm:px-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-light tabular-nums"
            style={{ fontFamily: FONT_BODY, color: 'rgba(238,230,216,0.48)' }}
          >
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} strokeWidth={1.6} style={{ color: BRONZE }} aria-hidden />
              {formatDate(post.published_at)}
            </span>
            <span className="opacity-35">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} strokeWidth={1.6} style={{ color: BRONZE }} aria-hidden />
              {post.reading_time} {t.blog.readingTime}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-[background,border-color] duration-200"
            style={{
              borderColor: BRONZE_LINE,
              color: BRONZE_MUTED,
              background: 'rgba(0,0,0,0.2)',
            }}
            aria-label={t.buttons.close}
          >
            <X size={18} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <div className="relative mb-5 h-44 overflow-hidden rounded-[12px] sm:h-52">
            {img ? (
              <img src={img} alt={post.title} className="h-full w-full object-cover" />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(26,24,22,1) 0%, rgba(12,10,8,1) 100%)',
                }}
              />
            )}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(5,5,5,0.55) 0%, transparent 45%)',
              }}
            />
            {category && (
              <div className="absolute left-3 top-3">
                <CategoryPill name={category.name} />
              </div>
            )}
          </div>

          <h2
            id="blog-modal-title"
            className="mb-5 text-[1.5rem] font-light leading-[1.2] tracking-[-0.02em] sm:text-[1.65rem]"
            style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.96)' }}
          >
            {post.title}
          </h2>

          <div
            className="mb-6 flex items-center gap-3 border-b pb-5"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[12px] font-medium"
              style={{
                fontFamily: FONT_HEAD,
                borderColor: BRONZE_LINE,
                background: BRONZE_SOFT,
                color: BRONZE,
              }}
              aria-hidden
            >
              {post.author_name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="truncate text-[14px] font-normal" style={{ fontFamily: FONT_HEAD, color: 'rgba(248,243,232,0.9)' }}>
                {post.author_name}
              </div>
              <div className="text-[12px] font-light" style={{ fontFamily: FONT_BODY, color: 'rgba(238,230,216,0.45)' }}>
                {t.blog.authorCoach}
              </div>
            </div>
          </div>

          <div className="mb-8 max-w-none">{renderContent(post.content)}</div>

          {post.tags.length > 0 && (
            <div className="border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={14} strokeWidth={1.6} style={{ color: BRONZE }} aria-hidden className="shrink-0 opacity-75" />
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border px-2.5 py-1 text-[11px] font-normal uppercase tracking-[0.06em]"
                    style={{
                      fontFamily: FONT_HEAD,
                      borderColor: BRONZE_LINE,
                      background: 'rgba(8,7,6,0.65)',
                      color: 'rgba(238,230,216,0.55)',
                    }}
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
    document.body,
  );
}
