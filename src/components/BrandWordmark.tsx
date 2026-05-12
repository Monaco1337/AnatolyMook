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

  const gradientDark =
    'linear-gradient(188deg, #FFFCF7 0%, #F2E2C0 14%, #D6A85E 38%, #A06A3D 62%, #5C3620 88%, #2a1810 100%)';

  const gradientLight =
    'linear-gradient(188deg, #1c100c 0%, #4a2c1a 22%, #6b4428 45%, #8e5c3e 62%, #b07a52 82%, #c99552 100%)';

  const filterGlow =
    theme === 'dark'
      ? [
          'drop-shadow(0 -0.5px 0 rgba(255,252,245,0.22))',
          'drop-shadow(0 1px 0 rgba(28,16,10,0.65))',
          'drop-shadow(0 2px 1px rgba(0,0,0,0.55))',
          'drop-shadow(0 0 18px rgba(214,168,94,0.42))',
          'drop-shadow(0 0 42px rgba(166,124,82,0.28))',
          'drop-shadow(0 10px 28px rgba(0,0,0,0.45))'
        ].join(' ')
      : [
          'drop-shadow(0 -0.5px 0 rgba(255,255,255,0.85))',
          'drop-shadow(0 1px 0 rgba(62,40,26,0.18))',
          'drop-shadow(0 4px 14px rgba(166,124,82,0.2))',
          'drop-shadow(0 0 20px rgba(185,130,63,0.14))'
        ].join(' ');

  return (
    <span
      className={`inline-block max-w-full select-none whitespace-nowrap ${className}`}
      style={{
        fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
        fontWeight: 100,
        fontSynthesis: 'none',
        letterSpacing,
        textTransform: 'uppercase',
        fontSize,
        lineHeight: 1.12,
        backgroundImage: theme === 'dark' ? gradientDark : gradientLight,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        filter: filterGlow,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'geometricPrecision' as const
      }}
    >
      {t.nav.logo}
    </span>
  );
}
