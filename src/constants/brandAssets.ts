/**
 * Zentrale Medien-URLs für Brand / SEO / JSON-LD (absolute URLs nur für Crawler-Meta).
 */
export const SITE_ORIGIN = 'https://www.anatoly-mook.de';

/** Vollpixel-Portrait für Hero & Rich Results (PNG-Fallback, AVIF/WebP unter gleichem Basispfad). */
export const HERO_PORTRAIT = {
  pathBase: '/images/hero/anatoly-mook-portrait-hero',
  absPng: `${SITE_ORIGIN}/images/hero/anatoly-mook-portrait-hero.png`,
  width: 1024,
  height: 576,
  /** Natürliche Sprache, Name + Rolle + Kontext (DE-Startseite). */
  altDe:
    'Anatoly Mook – Bewusstseinscoach, Mentor und Speaker für Führung und Transformation. Studio-Porträt vor dunklem, strukturiertem Hintergrund; Komposition mit Platz links für Typografie (Anatoly Mook Academy, Unna).'
} as const;
