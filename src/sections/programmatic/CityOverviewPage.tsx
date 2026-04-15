import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { europeanCities } from '../../utils/localSEO';
import SEOHead from '../../components/SEOHead';
import { localBusinessSchema, breadcrumbSchema } from '../../seo/schemaFactory';
import InternalLinks from '../../components/InternalLinks';
import { MapPin, ArrowRight, ChevronRight } from 'lucide-react';

const serviceList = [
  { slug: 'seminare', de: 'Seminare & Workshops', en: 'Seminars & Workshops', ru: 'Семинары', icon: '📚' },
  { slug: 'coaching', de: 'Coaching & Mentoring', en: 'Coaching & Mentoring', ru: 'Коучинг', icon: '🎯' },
  { slug: 'keynotes', de: 'Keynote-Vorträge', en: 'Keynote Speaking', ru: 'Ки-ноуты', icon: '🎤' },
  { slug: 'corporate', de: 'Corporate-Programme', en: 'Corporate Programs', ru: 'Корпоративные', icon: '🏢' },
  { slug: 'transformation', de: 'Transformation', en: 'Transformation', ru: 'Трансформация', icon: '✨' },
];

export default function CityOverviewPage() {
  const { city: citySlug } = useParams<{ city: string }>();
  const { colors } = useTheme();
  const { language } = useLanguage();

  const cityData = europeanCities.find(c => c.slug === citySlug);
  if (!cityData || !citySlug) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ color: colors.text.primary }}>
        <Link to="/" className="text-amber-500">Zurück zur Startseite</Link>
      </div>
    );
  }

  const title = language === 'en'
    ? `Anatoly Mook in ${cityData.city} – Coaching, Seminars & Keynotes`
    : language === 'ru'
    ? `Анатолий Мук в ${cityData.city}`
    : `Anatoly Mook in ${cityData.city} – Coaching, Seminare & Keynotes`;

  const description = language === 'en'
    ? `All offerings by Anatoly Mook in ${cityData.city}: coaching, seminars, corporate programs and keynotes.`
    : language === 'ru'
    ? `Все предложения Анатолия Мука в ${cityData.city}.`
    : `Alle Angebote von Anatoly Mook in ${cityData.city}: Coaching, Seminare, Corporate-Programme und Keynotes.`;

  const nearCities = europeanCities
    .filter(c => c.slug !== citySlug && c.countryCode === cityData.countryCode)
    .slice(0, 8);

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        path={`/${citySlug}`}
        section="home"
        customSchema={{
          '@context': 'https://schema.org',
          '@graph': [
            localBusinessSchema({ city: cityData.city, slug: citySlug!, lat: cityData.coordinates.latitude, lng: cityData.coordinates.longitude }),
            breadcrumbSchema([{ name: cityData.city, url: `/${citySlug}` }])
          ]
        }}
      />

      <div className="min-h-screen pt-20" style={{ backgroundColor: colors.bg.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm" style={{ color: colors.text.tertiary }}>
            <Link to="/" className="hover:text-amber-500">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: colors.text.primary }}>{cityData.city}</span>
          </nav>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-amber-500" />
            <span className="text-amber-500 font-medium text-lg">{cityData.city}, {cityData.country}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.text.primary }}>
            {title}
          </h1>
          <p className="text-lg max-w-3xl" style={{ color: colors.text.secondary }}>{description}</p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceList.map(svc => (
              <Link key={svc.slug} to={`/${svc.slug}/${citySlug}`} className="group p-8 rounded-2xl border transition-all hover:border-amber-500/40 hover:shadow-lg" style={{ borderColor: colors.border.subtle, backgroundColor: colors.bg.secondary }}>
                <span className="text-3xl mb-4 block">{svc.icon}</span>
                <h2 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition-colors" style={{ color: colors.text.primary }}>
                  {language === 'en' ? svc.en : language === 'ru' ? svc.ru : svc.de}
                </h2>
                <span className="inline-flex items-center gap-1 text-sm text-amber-500">
                  {language === 'en' ? 'Learn more' : language === 'ru' ? 'Подробнее' : 'Mehr erfahren'} <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <InternalLinks
          currentSection="home"
          currentCity={citySlug}
          maxLinks={10}
          showTestimonials
          showFaqs
          showTopics
          showGlossary
        />
      </div>
    </>
  );
}
