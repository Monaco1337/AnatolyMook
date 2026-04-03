import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import { testimonials } from '../../seo/testimonialData';
import { reviewSchema, breadcrumbSchema } from '../../seo/schemaFactory';
import { ChevronRight, Star, ArrowRight } from 'lucide-react';

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const { colors } = useTheme();
  const { language } = useLanguage();
  const lang = language as 'de' | 'en' | 'ru';

  const testimonial = testimonials.find(t => t.slug === slug);
  if (!testimonial) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ color: colors.text.primary }}>
        <Link to="/" className="text-amber-500">Zurück zur Startseite</Link>
      </div>
    );
  }

  const schema = reviewSchema({ author: testimonial.name, role: testimonial.role, text: testimonial.text[lang], rating: testimonial.rating, date: testimonial.date });
  const crumbs = breadcrumbSchema([
    { name: lang === 'en' ? 'Success Stories' : lang === 'ru' ? 'Истории успеха' : 'Erfolgsgeschichten', url: '/' },
    { name: testimonial.name, url: `/erfolgsgeschichte/${slug}` }
  ]);
  const others = testimonials.filter(t => t.slug !== slug).slice(0, 4);

  return (
    <>
      <SEOHead
        title={`${testimonial.name} – ${lang === 'en' ? 'Success Story' : lang === 'ru' ? 'История успеха' : 'Erfolgsgeschichte'} | Anatoly Mook`}
        description={testimonial.text[lang].substring(0, 155)}
        path={`/erfolgsgeschichte/${slug}`}
        section="about"
        customSchema={{ '@context': 'https://schema.org', '@graph': [schema, crumbs] }}
      />

      <div className="min-h-screen pt-20" style={{ backgroundColor: colors.bg.primary }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm" style={{ color: colors.text.tertiary }}>
            <Link to="/" className="hover:text-amber-500">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: colors.text.primary }}>{testimonial.name}</span>
          </nav>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-6 block">
            {lang === 'en' ? 'Success Story' : lang === 'ru' ? 'История успеха' : 'Erfolgsgeschichte'}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 hero-content" style={{ color: colors.text.primary }}>
            {testimonial.name}
          </h1>
          <p className="text-lg mb-2" style={{ color: colors.text.secondary }}>
            {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
          </p>
          {testimonial.industry && (
            <span className="inline-block px-3 py-1 rounded-full text-xs border border-amber-500/30 text-amber-500 mb-8">
              {testimonial.industry}
            </span>
          )}

          <div className="flex gap-1 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-600'}`} />
            ))}
          </div>

          <blockquote className="text-lg md:text-xl leading-relaxed italic border-l-4 border-amber-500 pl-6 definition-block" style={{ color: colors.text.secondary }}>
            &ldquo;{testimonial.text[lang]}&rdquo;
          </blockquote>

          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
            <p className="font-medium mb-4" style={{ color: colors.text.primary }}>
              {lang === 'en' ? 'Start your transformation' : lang === 'ru' ? 'Начните вашу трансформацию' : 'Starten Sie Ihre Transformation'}
            </p>
            <Link to="/booking" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-all">
              {lang === 'en' ? 'Book Appointment' : lang === 'ru' ? 'Записаться' : 'Termin buchen'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {others.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text.primary }}>
              {lang === 'en' ? 'More Success Stories' : lang === 'ru' ? 'Больше историй' : 'Weitere Erfolgsgeschichten'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {others.map(o => (
                <Link key={o.slug} to={`/erfolgsgeschichte/${o.slug}`} className="p-6 rounded-xl border hover:border-amber-500/40 transition-all" style={{ borderColor: colors.border.primary }}>
                  <p className="font-semibold mb-1" style={{ color: colors.text.primary }}>{o.name}</p>
                  <p className="text-sm" style={{ color: colors.text.tertiary }}>{o.role}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
