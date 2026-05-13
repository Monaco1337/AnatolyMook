import type { CSSProperties } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export type BrandWordmarkVariant = 'nav' | 'hero' | 'slider';

export interface BrandWordmarkProps {
  variant?: BrandWordmarkVariant;
  /** Nav: an Dark-/Light-Glas der Leiste anpassen */
  theme?: 'dark' | 'light';
  className?: string;
}

/**
 * Wortmarke „ANATOLY MOOK“ — Montserrat Extra Light (200), breites Tracking.
 * Auf dunklem Grund: Metallic-Gradient (background-clip) + mehrschichtige
 * drop-shadows für Lesbarkeit auf hellen/dynamischen Bildern — keine andere Schriftfamilie.
 */
export default function BrandWordmark({ variant = 'nav', theme = 'dark', className = '' }: BrandWordmarkProps) {
  const { t, language } = useLanguage();

  const fontSize =
    variant === 'nav'
      ? 'clamp(0.84375rem, 0.76rem + 0.32vw, 0.96875rem)'
      : variant === 'hero'
        ? 'clamp(0.74rem, 0.64rem + 0.38vw, 0.875rem)'
        : 'clamp(0.605rem, 0.53rem + 0.22vw, 0.68rem)';

  const letterSpacing =
    language === 'ru'
      ? variant === 'slider'
        ? '0.12em'
        : variant === 'hero'
          ? '0.18em'
          : '0.14em'
      : variant === 'nav'
        ? '0.3em'
        : variant === 'hero'
          ? '0.36em'
          : '0.22em';

  const bronzeLight = '#8E5C3E';

  const metallicDarkStyles: CSSProperties =
    theme === 'dark'
      ? {
          backgroundImage: `linear-gradient(
          126deg,
          rgba(255, 252, 246, 1) 0%,
          rgba(248, 234, 204, 0.98) 11%,
          rgba(238, 210, 154, 0.96) 26%,
          rgba(216, 168, 98, 0.94) 44%,
          rgba(178, 124, 64, 0.92) 58%,
          rgba(148, 96, 48, 0.9) 72%,
          rgba(226, 200, 150, 0.99) 100%
        )`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          filter:
            'drop-shadow(0 1px 0 rgba(0,0,0,0.88)) drop-shadow(0 2px 8px rgba(0,0,0,0.72)) drop-shadow(0 0 1px rgba(0,0,0,0.75)) drop-shadow(0 0 36px rgba(185,130,63,0.28))',
          isolation: 'isolate'
        }
      : {};

  const lightThemeStyles: CSSProperties =
    theme === 'light'
      ? {
          color: bronzeLight,
          textShadow:
            '0 1px 0 rgba(255,255,255,0.92), 0 2px 14px rgba(142,92,62,0.26), 0 0 1px rgba(90,55,40,0.22)'
        }
      : {};

  const lineHeight = variant === 'nav' ? 1.06 : variant === 'hero' ? 1.1 : 1.14;

  return (
    <span
      className={`inline-block max-w-full transform-gpu select-none whitespace-nowrap ${className}`}
      style={{
        fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
        fontWeight: 200,
        fontSynthesis: 'none',
        letterSpacing,
        textTransform: 'uppercase',
        fontSize,
        lineHeight,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'geometricPrecision',
        ...(theme === 'dark' ? metallicDarkStyles : lightThemeStyles)
      }}
    >
      {t.nav.logo}
    </span>
  );
}
