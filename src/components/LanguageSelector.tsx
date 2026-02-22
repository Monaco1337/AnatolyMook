import { useLanguage, Language } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const languages = [
  { code: 'de' as Language, flag: '🇩🇪', label: 'Deutsch' },
  { code: 'en' as Language, flag: '🇬🇧', label: 'English' },
  { code: 'ru' as Language, flag: '🇷🇺', label: 'Русский' }
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => {
        const isActive = lang.code === language;

        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="relative w-[32px] h-[32px] flex items-center justify-center rounded-[8px] transition-all duration-300 active:scale-95 group"
            aria-label={`Switch to ${lang.label}`}
            title={lang.label}
            style={{
              background: isActive
                ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)')
                : 'transparent',
              opacity: isActive ? 1 : 0.5,
              transform: isActive ? 'scale(1)' : 'scale(0.95)'
            }}
          >
            <span
              className="text-[18px] transition-transform duration-300 group-hover:scale-110"
              style={{
                filter: isActive ? 'none' : 'grayscale(0.3)'
              }}
            >
              {lang.flag}
            </span>
          </button>
        );
      })}
    </div>
  );
}
