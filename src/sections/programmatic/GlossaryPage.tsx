import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import { glossaryEntries } from '../../seo/glossaryData';
import { definedTermSchema, breadcrumbSchema } from '../../seo/schemaFactory';
import InternalLinks from '../../components/InternalLinks';
import { ChevronRight, BookOpen } from 'lucide-react';

export default function GlossaryPage() {
  const { term: termSlug } = useParams<{ term: string }>();
  const { colors } = useTheme();
  const { language } = useLanguage();
  const lang = language as 'de' | 'en' | 'ru';

  const entry = glossaryEntries.find(e => e.slug === termSlug);
  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ color: colors.text.primary }}>
        <Link to="/" className="text-amber-500">Zurück zur Startseite</Link>
      </div>
    );
  }

  const related = glossaryEntries.filter(e => entry.relatedTerms.includes(e.slug)).slice(0, 8);
  const schema = definedTermSchema({ name: entry.term[lang], description: entry.definition[lang], url: `/glossar/${termSlug}` });
  const crumbs = breadcrumbSchema([
    { name: lang === 'en' ? 'Glossary' : lang === 'ru' ? 'Глоссарий' : 'Glossar', url: '/resources' },
    { name: entry.term[lang], url: `/glossar/${termSlug}` }
  ]);

  return (
    <>
      <SEOHead
        title={`${entry.term[lang]} – ${lang === 'en' ? 'Glossary' : lang === 'ru' ? 'Глоссарий' : 'Glossar'} | Anatoly Mook`}
        description={entry.definition[lang].substring(0, 155)}
        path={`/glossar/${termSlug}`}
        section="resources"
        customSchema={{ '@context': 'https://schema.org', '@graph': [schema, crumbs] }}
      />

      <div className="min-h-screen pt-20" style={{ backgroundColor: colors.bg.primary }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm" style={{ color: colors.text.tertiary }}>
            <Link to="/" className="hover:text-amber-500">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-amber-500">{lang === 'en' ? 'Glossary' : lang === 'ru' ? 'Глоссарий' : 'Glossar'}</span>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: colors.text.primary }}>{entry.term[lang]}</span>
          </nav>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span className="text-amber-500 text-sm font-medium uppercase tracking-wider">
              {lang === 'en' ? 'Glossary' : lang === 'ru' ? 'Глоссарий' : 'Glossar'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8" style={{ color: colors.text.primary }}>
            {entry.term[lang]}
          </h1>

          <div className="text-lg leading-relaxed definition-block" style={{ color: colors.text.secondary }}>
            <p>{entry.definition[lang]}</p>
          </div>

          {entry.relatedServices.length > 0 && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
              <p className="font-medium mb-3" style={{ color: colors.text.primary }}>
                {lang === 'en' ? 'Explore related services:' : lang === 'ru' ? 'Связанные услуги:' : 'Passende Angebote entdecken:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {entry.relatedServices.map(svc => (
                  <Link key={svc} to={`/${svc}`} className="px-3 py-1 rounded-full text-sm border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 capitalize transition-all">
                    {svc}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {related.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text.primary }}>
              {lang === 'en' ? 'Related Terms' : lang === 'ru' ? 'Связанные термины' : 'Verwandte Begriffe'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map(r => (
                <Link key={r.slug} to={`/glossar/${r.slug}`} className="p-4 rounded-xl border hover:border-amber-500/40 transition-all text-center" style={{ borderColor: colors.border.subtle }}>
                  <span className="font-medium text-sm" style={{ color: colors.text.primary }}>{r.term[lang]}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <InternalLinks
          currentSection="resources"
          currentGlossary={termSlug}
          maxLinks={8}
          showCities
          showTopics
          showFaqs
          showTestimonials
        />
      </div>
    </>
  );
}
