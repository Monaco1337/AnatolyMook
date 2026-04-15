import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, MapPin, BookOpen, HelpCircle, Lightbulb, Star } from 'lucide-react';
import { europeanCities } from '../utils/localSEO';
import { topicClusters } from '../seo/topicClusters';
import { glossaryEntries } from '../seo/glossaryData';
import { faqEntries } from '../seo/faqDatabase';
import { testimonials } from '../seo/testimonialData';

interface InternalLinksProps {
  currentSection?: string;
  currentCity?: string;
  currentService?: string;
  currentTopic?: string;
  currentGlossary?: string;
  currentFaq?: string;
  maxLinks?: number;
  showCities?: boolean;
  showTopics?: boolean;
  showGlossary?: boolean;
  showFaqs?: boolean;
  showTestimonials?: boolean;
}

const SERVICE_SLUGS = ['seminare', 'coaching', 'keynotes', 'corporate', 'transformation'] as const;

const serviceLabels: Record<string, { de: string; en: string; ru: string }> = {
  seminare: { de: 'Seminare & Workshops', en: 'Seminars & Workshops', ru: 'Семинары' },
  coaching: { de: 'Coaching & Mentoring', en: 'Coaching & Mentoring', ru: 'Коучинг' },
  keynotes: { de: 'Keynote-Vorträge', en: 'Keynote Speaking', ru: 'Ки-ноуты' },
  corporate: { de: 'Corporate-Programme', en: 'Corporate Programs', ru: 'Корпоративные' },
  transformation: { de: 'Transformation', en: 'Transformation', ru: 'Трансформация' },
};

const mainPages = [
  { slug: 'about', de: 'Über Anatoly Mook', en: 'About Anatoly Mook', ru: 'Об Анатолии' },
  { slug: 'booking', de: 'Termin buchen', en: 'Book Appointment', ru: 'Записаться' },
  { slug: 'faq', de: 'Häufige Fragen', en: 'FAQ', ru: 'Частые вопросы' },
  { slug: 'blog', de: 'Blog & Insights', en: 'Blog & Insights', ru: 'Блог' },
  { slug: 'kontakt', de: 'Kontakt', en: 'Contact', ru: 'Контакт' },
  { slug: 'events', de: 'Events', en: 'Events', ru: 'Мероприятия' },
  { slug: 'resources', de: 'Ressourcen', en: 'Resources', ru: 'Ресурсы' },
  { slug: 'produkte', de: 'Shop', en: 'Shop', ru: 'Магазин' },
];

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export default function InternalLinks({
  currentSection,
  currentCity,
  currentService,
  currentTopic,
  currentGlossary,
  currentFaq,
  maxLinks = 8,
  showCities = true,
  showTopics = true,
  showGlossary = true,
  showFaqs = true,
  showTestimonials = true,
}: InternalLinksProps) {
  const { colors } = useTheme();
  const { language } = useLanguage();
  const lang = language as 'de' | 'en' | 'ru';

  const seed = hashString(`${currentSection}-${currentCity}-${currentService}-${currentTopic}`);

  const relatedCities = seededShuffle(
    europeanCities.filter(c => c.slug !== currentCity),
    seed,
  ).slice(0, maxLinks);

  const svc = currentService || currentSection || 'coaching';

  const relatedTopics = seededShuffle(
    topicClusters.filter(t => t.slug !== currentTopic),
    seed + 1,
  ).slice(0, Math.min(6, maxLinks));

  const relatedGlossary = seededShuffle(
    glossaryEntries.filter(g => g.slug !== currentGlossary),
    seed + 2,
  ).slice(0, Math.min(6, maxLinks));

  const relatedFaqs = seededShuffle(
    faqEntries.filter(f => f.slug !== currentFaq),
    seed + 3,
  ).slice(0, Math.min(4, maxLinks));

  const relatedTestimonials = seededShuffle(testimonials, seed + 4).slice(0, 3);

  const serviceLinks = SERVICE_SLUGS.filter(s => s !== currentService && s !== currentSection);
  const mainLinks = mainPages.filter(p => p.slug !== currentSection);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Services */}
      <nav aria-label="Services">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.text.primary }}>
          <Star className="w-4 h-4 text-amber-500" />
          {lang === 'en' ? 'Our Services' : lang === 'ru' ? 'Наши услуги' : 'Unsere Angebote'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {serviceLinks.map(s => (
            <Link
              key={s}
              to={currentCity ? `/${s}/${currentCity}` : `/${s}`}
              className="px-4 py-2 rounded-lg border text-sm font-medium hover:border-amber-500/40 hover:text-amber-500 transition-all"
              style={{ borderColor: colors.border.subtle, color: colors.text.secondary }}
            >
              {serviceLabels[s]?.[lang] || s}
            </Link>
          ))}
          {mainLinks.slice(0, 4).map(p => (
            <Link
              key={p.slug}
              to={`/${p.slug}`}
              className="px-4 py-2 rounded-lg border text-sm font-medium hover:border-amber-500/40 hover:text-amber-500 transition-all"
              style={{ borderColor: colors.border.subtle, color: colors.text.secondary }}
            >
              {p[lang]}
            </Link>
          ))}
        </div>
      </nav>

      {/* Cities */}
      {showCities && relatedCities.length > 0 && (
        <nav aria-label="Related cities">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.text.primary }}>
            <MapPin className="w-4 h-4 text-amber-500" />
            {lang === 'en' ? `${serviceLabels[svc]?.en || 'Services'} in other cities` : lang === 'ru' ? 'В других городах' : `${serviceLabels[svc]?.de || 'Angebote'} in weiteren Städten`}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {relatedCities.map(c => (
              <Link
                key={c.slug}
                to={currentService ? `/${currentService}/${c.slug}` : `/${c.slug}`}
                className="p-3 rounded-lg border text-center text-sm hover:border-amber-500/40 transition-all group"
                style={{ borderColor: colors.border.subtle }}
              >
                <span className="font-medium group-hover:text-amber-500 transition-colors" style={{ color: colors.text.secondary }}>
                  {c.city}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Topics */}
      {showTopics && relatedTopics.length > 0 && (
        <nav aria-label="Related topics">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.text.primary }}>
            <Lightbulb className="w-4 h-4 text-amber-500" />
            {lang === 'en' ? 'Explore Topics' : lang === 'ru' ? 'Темы' : 'Themen entdecken'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {relatedTopics.map(t => (
              <Link
                key={t.slug}
                to={lang === 'en' ? `/en/topic/${t.slugEn}` : lang === 'ru' ? `/ru/tema/${t.slugRu}` : `/thema/${t.slug}`}
                className="p-3 rounded-lg border text-sm hover:border-amber-500/40 transition-all flex items-center gap-2 group"
                style={{ borderColor: colors.border.subtle }}
              >
                <ArrowRight className="w-3 h-3 text-amber-500/50 group-hover:text-amber-500 flex-shrink-0" />
                <span className="group-hover:text-amber-500 transition-colors" style={{ color: colors.text.secondary }}>
                  {t.title[lang]}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Glossary */}
      {showGlossary && relatedGlossary.length > 0 && (
        <nav aria-label="Related glossary terms">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.text.primary }}>
            <BookOpen className="w-4 h-4 text-amber-500" />
            {lang === 'en' ? 'Glossary' : lang === 'ru' ? 'Глоссарий' : 'Glossar'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedGlossary.map(g => (
              <Link
                key={g.slug}
                to={lang === 'en' ? `/en/glossary/${g.slug}` : lang === 'ru' ? `/ru/glossarij/${g.slug}` : `/glossar/${g.slug}`}
                className="px-3 py-1.5 rounded-full border text-xs font-medium hover:border-amber-500/40 hover:text-amber-500 transition-all"
                style={{ borderColor: colors.border.subtle, color: colors.text.tertiary }}
              >
                {g.term[lang]}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* FAQs */}
      {showFaqs && relatedFaqs.length > 0 && (
        <nav aria-label="Related FAQs">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.text.primary }}>
            <HelpCircle className="w-4 h-4 text-amber-500" />
            {lang === 'en' ? 'Common Questions' : lang === 'ru' ? 'Частые вопросы' : 'Häufige Fragen'}
          </h3>
          <div className="space-y-2">
            {relatedFaqs.map(f => (
              <Link
                key={f.slug}
                to={lang === 'en' ? `/en/faq/${f.slug}` : `/faq/${f.slug}`}
                className="block p-3 rounded-lg border text-sm hover:border-amber-500/40 transition-all group"
                style={{ borderColor: colors.border.subtle }}
              >
                <span className="group-hover:text-amber-500 transition-colors" style={{ color: colors.text.secondary }}>
                  {f.question[lang]}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Testimonials */}
      {showTestimonials && relatedTestimonials.length > 0 && (
        <nav aria-label="Success stories">
          <h3 className="text-lg font-bold mb-4" style={{ color: colors.text.primary }}>
            {lang === 'en' ? 'Success Stories' : lang === 'ru' ? 'Истории успеха' : 'Erfolgsgeschichten'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedTestimonials.map(t => (
              <Link
                key={t.slug}
                to={`/erfolgsgeschichte/${t.slug}`}
                className="px-4 py-2 rounded-lg border text-sm hover:border-amber-500/40 hover:text-amber-500 transition-all"
                style={{ borderColor: colors.border.subtle, color: colors.text.secondary }}
              >
                {t.name} – {t.role}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* noscript fallback for crawlers */}
      <noscript>
        <div>
          <h3>Alle Angebote</h3>
          <ul>
            {SERVICE_SLUGS.map(s => (
              <li key={s}><a href={`/${s}`}>{serviceLabels[s]?.de}</a></li>
            ))}
            {mainPages.map(p => (
              <li key={p.slug}><a href={`/${p.slug}`}>{p.de}</a></li>
            ))}
          </ul>
          <h3>Standorte</h3>
          <ul>
            {europeanCities.slice(0, 50).map(c => (
              <li key={c.slug}>
                <a href={`/${c.slug}`}>{c.city}</a>
                {' – '}
                {SERVICE_SLUGS.map(s => (
                  <span key={s}><a href={`/${s}/${c.slug}`}>{serviceLabels[s]?.de} in {c.city}</a>{' | '}</span>
                ))}
              </li>
            ))}
          </ul>
          <h3>Themen</h3>
          <ul>
            {topicClusters.slice(0, 30).map(t => (
              <li key={t.slug}><a href={`/thema/${t.slug}`}>{t.title.de}</a></li>
            ))}
          </ul>
          <h3>Glossar</h3>
          <ul>
            {glossaryEntries.slice(0, 30).map(g => (
              <li key={g.slug}><a href={`/glossar/${g.slug}`}>{g.term.de}</a></li>
            ))}
          </ul>
        </div>
      </noscript>
    </div>
  );
}
