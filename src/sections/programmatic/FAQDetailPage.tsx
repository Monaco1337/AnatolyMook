import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import { faqEntries } from '../../seo/faqDatabase';
import { faqPageSchema, breadcrumbSchema } from '../../seo/schemaFactory';
import InternalLinks from '../../components/InternalLinks';
import { ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';

export default function FAQDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { colors } = useTheme();
  const { language } = useLanguage();
  const lang = language as 'de' | 'en' | 'ru';

  const faq = faqEntries.find(f => f.slug === slug);
  if (!faq) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ color: colors.text.primary }}>
        <Link to="/faq" className="text-amber-500">Zurück zu FAQ</Link>
      </div>
    );
  }

  const related = faqEntries.filter(f => faq.relatedFaqs.includes(f.slug)).slice(0, 5);
  const schema = faqPageSchema([{ question: faq.question[lang], answer: faq.answer[lang] }]);
  const crumbs = breadcrumbSchema([
    { name: 'FAQ', url: '/faq' },
    { name: faq.question[lang].substring(0, 50), url: `/faq/${slug}` }
  ]);

  return (
    <>
      <SEOHead
        title={`${faq.question[lang]} | Anatoly Mook`}
        description={faq.answer[lang].substring(0, 155)}
        path={`/faq/${slug}`}
        section="faq"
        schemaType="FAQPage"
        customSchema={{ '@context': 'https://schema.org', '@graph': [schema, crumbs] }}
      />

      <div className="min-h-screen pt-20" style={{ backgroundColor: colors.bg.primary }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm" style={{ color: colors.text.tertiary }}>
            <Link to="/" className="hover:text-amber-500">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/faq" className="hover:text-amber-500">FAQ</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: colors.text.primary }}>{faq.question[lang].substring(0, 40)}...</span>
          </nav>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <span className="text-amber-500 text-sm font-medium uppercase tracking-wider">FAQ</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight hero-content" style={{ color: colors.text.primary }}>
            {faq.question[lang]}
          </h1>

          <div className="text-lg leading-relaxed whitespace-pre-line definition-block" style={{ color: colors.text.secondary }}>
            {faq.answer[lang]}
          </div>

          {faq.relatedServices.length > 0 && (
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
              <p className="font-medium mb-3" style={{ color: colors.text.primary }}>
                {lang === 'en' ? 'Related services' : lang === 'ru' ? 'Связанные услуги' : 'Passende Angebote'}
              </p>
              <div className="flex flex-wrap gap-3">
                {faq.relatedServices.map(svc => (
                  <Link key={svc} to={`/${svc}`} className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 capitalize text-sm transition-all">
                    {svc} <ArrowRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {related.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text.primary }}>
              {lang === 'en' ? 'Related Questions' : lang === 'ru' ? 'Связанные вопросы' : 'Verwandte Fragen'}
            </h2>
            <div className="space-y-3">
              {related.map(r => (
                <Link key={r.slug} to={`/faq/${r.slug}`} className="block p-5 rounded-xl border hover:border-amber-500/40 transition-all" style={{ borderColor: colors.border.subtle }}>
                  <span className="font-medium" style={{ color: colors.text.primary }}>{r.question[lang]}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <InternalLinks
          currentSection="faq"
          currentFaq={slug}
          maxLinks={8}
          showCities
          showTopics
          showGlossary
          showTestimonials
        />
      </div>
    </>
  );
}
