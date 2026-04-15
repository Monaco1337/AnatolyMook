import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { europeanCities, generateLocalLandingPage } from '../../utils/localSEO';
import SEOHead from '../../components/SEOHead';
import { localBusinessSchema, breadcrumbSchema } from '../../seo/schemaFactory';
import InternalLinks from '../../components/InternalLinks';
import { MapPin, ArrowRight, Phone, Mail, Calendar, ChevronRight } from 'lucide-react';

interface Props {
  service: string;
}

export default function CityServicePage({ service }: Props) {
  const { city: citySlug } = useParams<{ city: string }>();
  const { colors } = useTheme();
  const { language } = useLanguage();

  const cityData = europeanCities.find(c => c.slug === citySlug);
  if (!cityData || !citySlug) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ color: colors.text.primary }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Seite nicht gefunden</h1>
          <Link to="/" className="text-amber-500 hover:text-amber-400">Zurück zur Startseite</Link>
        </div>
      </div>
    );
  }

  const { translations } = generateLocalLandingPage(cityData, service);
  const t = translations[language] || translations.de;
  const schema = localBusinessSchema({ city: cityData.city, slug: `${service}/${citySlug}`, service: t.title, lat: cityData.coordinates.latitude, lng: cityData.coordinates.longitude });
  const crumbs = breadcrumbSchema([
    { name: service.charAt(0).toUpperCase() + service.slice(1), url: `/${service}` },
    { name: cityData.city, url: `/${service}/${citySlug}` }
  ]);

  const relatedCities = europeanCities
    .filter(c => c.slug !== citySlug && c.countryCode === cityData.countryCode)
    .slice(0, 6);

  const serviceRoutes = ['seminare', 'coaching', 'keynotes', 'corporate', 'transformation'].filter(s => s !== service);

  return (
    <>
      <SEOHead
        title={t.title}
        description={t.intro}
        path={`/${service}/${citySlug}`}
        section={service}
        schemaType="Service"
        customSchema={{ '@context': 'https://schema.org', '@graph': [schema, crumbs] }}
      />

      <div className="min-h-screen pt-20" style={{ backgroundColor: colors.bg.primary }}>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm" style={{ color: colors.text.tertiary }}>
            <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/${service}`} className="hover:text-amber-500 transition-colors capitalize">{service}</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: colors.text.primary }}>{cityData.city}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-5 h-5 text-amber-500" />
            <span className="text-amber-500 font-medium">{cityData.city}, {cityData.region}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: colors.text.primary }}>
            {t.h1}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl leading-relaxed mb-8" style={{ color: colors.text.secondary }}>
            {t.intro}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-all">
              <Calendar className="w-5 h-5" />
              {t.cta}
            </Link>
            <Link to="/kontakt" className="inline-flex items-center gap-2 px-8 py-4 border border-amber-500/30 rounded-xl font-semibold hover:border-amber-500 transition-all" style={{ color: colors.text.primary }}>
              <Mail className="w-5 h-5" />
              Kontakt
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: colors.text.primary }}>{t.why}</h2>
          <p className="text-base md:text-lg leading-relaxed max-w-4xl" style={{ color: colors.text.secondary }}>{t.whyText}</p>
        </section>

        {/* Services List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: colors.text.primary }}>{t.services}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.serviceList.map((svc, i) => (
              <div key={i} className="p-6 rounded-2xl border transition-all hover:border-amber-500/40" style={{ borderColor: colors.border.subtle, backgroundColor: colors.bg.secondary }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-medium" style={{ color: colors.text.primary }}>{svc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: colors.text.primary }}>
              {language === 'en' ? 'Ready to get started?' : language === 'ru' ? 'Готовы начать?' : 'Bereit für den nächsten Schritt?'}
            </h2>
            <p className="mb-6 text-lg" style={{ color: colors.text.secondary }}>
              {language === 'en' ? 'Contact Anatoly Mook for a personal consultation.' : language === 'ru' ? 'Свяжитесь с Анатолием Муком для личной консультации.' : 'Kontaktieren Sie Anatoly Mook für ein persönliches Gespräch.'}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="tel:+4923033340628" className="inline-flex items-center gap-2 text-amber-500 font-medium hover:text-amber-400">
                <Phone className="w-4 h-4" /> 02303 334 0628
              </a>
              <a href="mailto:mail@anatoly-mook.de" className="inline-flex items-center gap-2 text-amber-500 font-medium hover:text-amber-400">
                <Mail className="w-4 h-4" /> mail@anatoly-mook.de
              </a>
            </div>
          </div>
        </section>

        {/* Other Services in this City */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text.primary }}>
            {language === 'en' ? `More services in ${cityData.city}` : language === 'ru' ? `Другие услуги в ${cityData.city}` : `Weitere Angebote in ${cityData.city}`}
          </h2>
          <div className="flex flex-wrap gap-3">
            {serviceRoutes.map(svc => (
              <Link key={svc} to={`/${svc}/${citySlug}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:border-amber-500/40 capitalize" style={{ borderColor: colors.border.subtle, color: colors.text.secondary }}>
                {svc} <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </section>

        <InternalLinks
          currentSection={service}
          currentCity={citySlug}
          currentService={service}
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
