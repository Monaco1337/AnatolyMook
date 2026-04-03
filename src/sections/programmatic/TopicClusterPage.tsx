import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import { topicClusters } from '../../seo/topicClusters';
import { webPageSchema, breadcrumbSchema } from '../../seo/schemaFactory';
import { ChevronRight, ArrowRight, BookOpen } from 'lucide-react';

export default function TopicClusterPage() {
  const { topic: topicSlug } = useParams<{ topic: string }>();
  const { colors } = useTheme();
  const { language } = useLanguage();

  const topic = topicClusters.find(t => t.slug === topicSlug || t.slugEn === topicSlug || t.slugRu === topicSlug);
  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ color: colors.text.primary }}>
        <Link to="/" className="text-amber-500">Zurück zur Startseite</Link>
      </div>
    );
  }

  const lang = language as 'de' | 'en' | 'ru';
  const related = topicClusters.filter(t => topic.relatedTopics.includes(t.slug)).slice(0, 6);
  const schema = webPageSchema({ url: `/thema/${topic.slug}`, title: topic.metaTitle[lang], description: topic.metaDescription[lang], type: 'Article' });
  const crumbs = breadcrumbSchema([{ name: lang === 'en' ? 'Topics' : lang === 'ru' ? 'Темы' : 'Themen', url: '/' }, { name: topic.title[lang], url: `/thema/${topic.slug}` }]);

  const serviceLinks: Record<string, { de: string; en: string; path: string }> = {
    seminare: { de: 'Seminare & Workshops', en: 'Seminars & Workshops', path: '/seminare' },
    coaching: { de: 'Coaching & Mentoring', en: 'Coaching & Mentoring', path: '/coaching' },
    keynotes: { de: 'Keynote-Vorträge', en: 'Keynote Speaking', path: '/keynotes' },
    corporate: { de: 'Corporate-Programme', en: 'Corporate Programs', path: '/corporate' },
    transformation: { de: 'Transformation', en: 'Transformation', path: '/transformation' },
  };

  return (
    <>
      <SEOHead
        title={topic.metaTitle[lang]}
        description={topic.metaDescription[lang]}
        path={`/thema/${topicSlug}`}
        section="blog"
        schemaType="Article"
        customSchema={{ '@context': 'https://schema.org', '@graph': [schema, crumbs] }}
      />

      <div className="min-h-screen pt-20" style={{ backgroundColor: colors.bg.primary }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm" style={{ color: colors.text.tertiary }}>
            <Link to="/" className="hover:text-amber-500">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: colors.text.primary }}>{topic.title[lang]}</span>
          </nav>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span className="text-amber-500 text-sm font-medium uppercase tracking-wider">
              {lang === 'en' ? 'Topic' : lang === 'ru' ? 'Тема' : 'Thema'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ color: colors.text.primary }}>
            {topic.title[lang]}
          </h1>

          <div className="prose prose-lg max-w-none" style={{ color: colors.text.secondary }}>
            <p className="text-lg md:text-xl leading-relaxed mb-8">{topic.description[lang]}</p>
          </div>

          {topic.relatedServices.length > 0 && (
            <div className="mt-12 p-8 rounded-2xl border" style={{ borderColor: colors.border.primary, backgroundColor: colors.bg.secondary }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.text.primary }}>
                {lang === 'en' ? 'Related Services' : lang === 'ru' ? 'Связанные услуги' : 'Passende Angebote'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {topic.relatedServices.map(svc => {
                  const info = serviceLinks[svc];
                  if (!info) return null;
                  return (
                    <Link key={svc} to={info.path} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:border-amber-500/40 transition-all" style={{ borderColor: colors.border.primary, color: colors.text.secondary }}>
                      {lang === 'en' ? info.en : info.de} <ArrowRight className="w-3 h-3" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </article>

        {related.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text.primary }}>
              {lang === 'en' ? 'Related Topics' : lang === 'ru' ? 'Связанные темы' : 'Verwandte Themen'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.slug} to={`/thema/${r.slug}`} className="p-6 rounded-xl border hover:border-amber-500/40 transition-all" style={{ borderColor: colors.border.primary }}>
                  <h3 className="font-semibold mb-2" style={{ color: colors.text.primary }}>{r.title[lang]}</h3>
                  <span className="text-sm text-amber-500">{lang === 'en' ? 'Read more' : lang === 'ru' ? 'Подробнее' : 'Mehr erfahren'}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
