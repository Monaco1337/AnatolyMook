import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface InternalLinksProps {
  currentSection?: string;
  maxLinks?: number;
}

const linkData = [
  { slug: 'seminare', de: 'Seminare & Workshops', en: 'Seminars & Workshops', ru: 'Семинары' },
  { slug: 'coaching', de: 'Coaching & Mentoring', en: 'Coaching & Mentoring', ru: 'Коучинг' },
  { slug: 'keynotes', de: 'Keynote-Vorträge', en: 'Keynote Speaking', ru: 'Ки-ноуты' },
  { slug: 'corporate', de: 'Corporate-Programme', en: 'Corporate Programs', ru: 'Корпоративные' },
  { slug: 'transformation', de: 'Transformation', en: 'Transformation', ru: 'Трансформация' },
  { slug: 'about', de: 'Über Anatoly Mook', en: 'About Anatoly Mook', ru: 'Об Анатолии' },
  { slug: 'booking', de: 'Termin buchen', en: 'Book Appointment', ru: 'Записаться' },
  { slug: 'faq', de: 'Häufige Fragen', en: 'FAQ', ru: 'Частые вопросы' },
  { slug: 'blog', de: 'Blog & Insights', en: 'Blog & Insights', ru: 'Блог' },
  { slug: 'kontakt', de: 'Kontakt', en: 'Contact', ru: 'Контакт' },
];

export default function InternalLinks({ currentSection, maxLinks = 6 }: InternalLinksProps) {
  const { colors } = useTheme();
  const { language } = useLanguage();
  const lang = language as 'de' | 'en' | 'ru';

  const links = linkData
    .filter(l => l.slug !== currentSection)
    .slice(0, maxLinks);

  return (
    <nav aria-label="Related pages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-xl font-bold mb-6" style={{ color: colors.text.primary }}>
        {lang === 'en' ? 'Explore More' : lang === 'ru' ? 'Узнайте больше' : 'Entdecken Sie mehr'}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {links.map(link => (
          <Link
            key={link.slug}
            to={`/${link.slug}`}
            className="p-4 rounded-xl border text-center hover:border-amber-500/40 transition-all group"
            style={{ borderColor: colors.border.primary }}
          >
            <span className="text-sm font-medium group-hover:text-amber-500 transition-colors" style={{ color: colors.text.secondary }}>
              {link[lang]}
            </span>
            <ArrowRight className="w-3 h-3 mx-auto mt-2 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
