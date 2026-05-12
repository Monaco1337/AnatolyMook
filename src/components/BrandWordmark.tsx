import { useLanguage } from '../contexts/LanguageContext';

export type BrandWordmarkVariant = 'nav' | 'hero' | 'slider';

export interface BrandWordmarkProps {
  variant?: BrandWordmarkVariant;
  /** Nav: an Dark-/Light-Glas der Leiste anpassen */
  theme?: 'dark' | 'light';
  className?: string;
}

/**
 * Wortmarke „ANATOLY MOOK“ — Montserrat Ultra Light (100), breites Tracking,
 * Bronze-Metall-Gradient + mehrschichtige Licht-/Tiefen-Schatten (ohne Text zu verwischen).
 */
export default function BrandWordmark({ variant = 'nav', theme = 'dark', className = '' }: BrandWordmarkProps) {
  const { t, language } = useLanguage();

  const fontSize =
    variant === 'nav'
      ? 'clamp(0.8125rem, 0.74rem + 0.28vw, 0.9375rem)'
      : variant === 'hero'
        ? 'clamp(0.68rem, 0.58rem + 0.35vw, 0.8rem)'
        : 'clamp(0.58rem, 0.52rem + 0.2vw, 0.65rem)';

  const letterSpacing =
    language === 'ru'
      ? variant === 'slider'
        ? '0.12em'
        : variant === 'hero'
          ? '0.18em'
          : '0.14em'
      : variant === 'nav'
        ? '0.28em'
        : variant === 'hero'
          ? '0.34em'
          : '0.22em';

  const bronzeDark = '#B98452';
  const bronzeLight = '#8E5C3E';

  const textShadow =
    theme === 'dark'
      ? '0 1px 0 rgba(20,12,6,0.55), 0 0 1px rgba(201,150,86,0.30)'
      : '0 1px 0 rgba(255,255,255,0.55), 0 0 1px rgba(142,92,62,0.28)';

  return (
    <span
      className={`inline-block max-w-full select-none whitespace-nowrap ${className}`}
      style={{
        fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
        fontWeight: 200,
        fontSynthesis: 'none',
        letterSpacing,
        textTransform: 'uppercase',
        fontSize,
        lineHeight: 1.12,
        color: theme === 'dark' ? bronzeDark : bronzeLight,
        textShadow,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'geometricPrecision' as const
      }}
    >
      {t.nav.logo}
    </span>
  );
}
