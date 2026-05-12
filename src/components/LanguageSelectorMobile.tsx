import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const languages = [
  { code: 'de' as Language, label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
  { code: 'ru' as Language, label: 'Русский', flag: '🇷🇺' }
];

export default function LanguageSelectorMobile() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="grid grid-cols-3 gap-2">
      {languages.map((lang) => {
        const isActive = lang.code === language;

        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="relative h-[40px] rounded-[10px] text-[13px] font-[510] tracking-[0.01em] transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-2"
            style={{
              background: isActive
                ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)')
                : (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'),
              color: theme === 'dark' ? 'white' : '#1c1917',
              boxShadow: isActive
                ? (theme === 'dark'
                  ? `inset 0 0.5px 0 0 rgba(255, 255, 255, 0.2), 0 2px 8px rgba(0, 0, 0, 0.2)`
                  : `inset 0 1px 2px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)`)
                : (theme === 'dark'
                  ? `inset 0 0.5px 0 0 rgba(255, 255, 255, 0.1), 0 1px 4px rgba(0, 0, 0, 0.15)`
                  : `inset 0 0.5px 1px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04)`)
            }}
          >
            <span className="text-base">{lang.flag}</span>
            <span className={isActive ? 'opacity-100' : 'opacity-70'}>{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
}
