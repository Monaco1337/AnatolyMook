import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { getSectionSEO } from '../utils/seoConfig';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  section?: string;
  schemaType?: 'WebPage' | 'Article' | 'Course' | 'Event' | 'FAQPage' | 'Product' | 'Service';
  customSchema?: Record<string, unknown>;
}

interface SEOMetaData {
  title: string;
  description: string;
  keywords: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  canonical_url?: string;
  robots?: string;
  ai_optimization?: {
    quick_answer?: string;
    definition_block?: string;
    speakable_content?: string[];
  };
}

interface SchemaMarkup {
  schema_type: string;
  schema_json: Record<string, unknown>;
}

const GEO_COUNTRIES = [
  { lang: 'de', country: 'DE', url: '' },
  { lang: 'de', country: 'AT', url: '/at' },
  { lang: 'de', country: 'CH', url: '/ch' },
  { lang: 'en', country: 'US', url: '/en/us' },
  { lang: 'en', country: 'GB', url: '/en/uk' },
  { lang: 'en', country: 'CA', url: '/en/ca' },
  { lang: 'en', country: 'AU', url: '/en/au' },
  { lang: 'en', country: 'SG', url: '/en/sg' },
  { lang: 'en', country: 'IN', url: '/en/in' },
  { lang: 'en', country: 'ZA', url: '/en/za' },
  { lang: 'ru', country: 'RU', url: '/ru' },
  { lang: 'nl', country: 'NL', url: '/nl' },
  { lang: 'fr', country: 'FR', url: '/fr' },
  { lang: 'es', country: 'ES', url: '/es' },
  { lang: 'it', country: 'IT', url: '/it' },
  { lang: 'pl', country: 'PL', url: '/pl' },
  { lang: 'cs', country: 'CZ', url: '/cs' },
  { lang: 'sk', country: 'SK', url: '/sk' },
  { lang: 'hu', country: 'HU', url: '/hu' },
  { lang: 'pt', country: 'BR', url: '/pt/br' },
  { lang: 'ar', country: 'AE', url: '/ar/ae' },
];

export default function SEOHead({
  title,
  description,
  path = '',
  section = 'home',
  schemaType,
  customSchema
}: SEOHeadProps) {
  const { language, t } = useLanguage();
  const [seoData, setSeoData] = useState<SEOMetaData | null>(null);
  const [schemaData, setSchemaData] = useState<SchemaMarkup[]>([]);

  const baseUrl = 'https://anatolymook.de';
  const sectionSEO = getSectionSEO(section);

  const fullTitle = title || seoData?.title || sectionSEO.title || t('meta.defaultTitle') || 'Anatoly Mook – Klarheit, bewusste Führung & persönliche Meisterschaft';
  const fullDescription = description || seoData?.description || sectionSEO.description || t('meta.defaultDescription') || 'Anatoly Mook steht für Klarheit statt Suche. Bewusstseinsarbeit, Coaching und Formate für Menschen, die Verantwortung übernehmen und ihr Leben konsequent gestalten wollen.';
  const canonicalUrl = baseUrl;
  const finalSchemaType = schemaType || sectionSEO.schemaType || 'WebPage';
  const ogImage = seoData?.og_image || sectionSEO.ogImage || 'https://anatolymook.de/bildschirmfoto_2025-12-10_um_20.44.33.png';

  useEffect(() => {
    const loadSEOData = async () => {
      try {
        const { data: metaData } = await supabase
          .from('seo_meta_tags')
          .select('*')
          .eq('page_path', path || '/')
          .eq('language', language)
          .eq('is_active', true)
          .maybeSingle();

        if (metaData) {
          setSeoData(metaData);
        }

        const { data: schemas } = await supabase
          .from('seo_schema_markup')
          .select('*')
          .eq('page_path', path || '/')
          .eq('language', language)
          .eq('is_active', true);

        if (schemas) {
          setSchemaData(schemas);
        }
      } catch (error) {
        console.error('SEO data loading error:', error);
      }
    };

    loadSEOData();
  }, [path, language]);

  useEffect(() => {
    document.title = fullTitle;

    const setOrUpdateMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }

      meta.content = content;
    };

    setOrUpdateMeta('description', fullDescription);

    const keywords = seoData?.keywords || sectionSEO.keywords || [];
    if (keywords.length > 0) {
      setOrUpdateMeta('keywords', keywords.join(', '));
    }

    if (seoData?.robots) {
      setOrUpdateMeta('robots', seoData.robots);
    }

    setOrUpdateMeta('og:title', seoData?.og_title || fullTitle, true);
    setOrUpdateMeta('og:description', seoData?.og_description || fullDescription, true);
    setOrUpdateMeta('og:url', canonicalUrl, true);
    setOrUpdateMeta('og:type', 'website', true);
    setOrUpdateMeta('og:site_name', 'Anatoly Mook', true);

    if (ogImage) {
      setOrUpdateMeta('og:image', ogImage, true);
      setOrUpdateMeta('og:image:secure_url', ogImage, true);
      setOrUpdateMeta('og:image:type', 'image/png', true);
      setOrUpdateMeta('og:image:width', '1200', true);
      setOrUpdateMeta('og:image:height', '630', true);
      setOrUpdateMeta('og:image:alt', fullTitle, true);
    }

    const localeMap: Record<string, string> = {
      'de': 'de_DE',
      'en': 'en_US',
      'ru': 'ru_RU',
      'nl': 'nl_NL',
      'fr': 'fr_FR',
      'es': 'es_ES',
      'it': 'it_IT',
      'pl': 'pl_PL',
      'cs': 'cs_CZ',
      'sk': 'sk_SK',
      'hu': 'hu_HU',
      'pt': 'pt_BR',
      'ar': 'ar_AE'
    };
    setOrUpdateMeta('og:locale', localeMap[language] || 'de_DE', true);

    setOrUpdateMeta('twitter:card', 'summary_large_image');
    setOrUpdateMeta('twitter:title', fullTitle);
    setOrUpdateMeta('twitter:description', fullDescription);
    setOrUpdateMeta('twitter:site', '@anatolymux');
    setOrUpdateMeta('twitter:creator', '@anatolymux');
    if (ogImage) {
      setOrUpdateMeta('twitter:image', ogImage);
      setOrUpdateMeta('twitter:image:alt', fullTitle);
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]:not([data-static])');
    existingHreflang.forEach(link => link.remove());

    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = `${baseUrl}${path}`;
    document.head.appendChild(xDefault);

    GEO_COUNTRIES.forEach(geo => {
      const hreflang = document.createElement('link');
      hreflang.rel = 'alternate';
      hreflang.hreflang = geo.country ? `${geo.lang}-${geo.country}` : geo.lang;
      hreflang.href = `${baseUrl}${geo.url}${path}`;
      document.head.appendChild(hreflang);
    });

    document.documentElement.lang = language;

    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"][data-dynamic]');
    existingSchemas.forEach(script => script.remove());

    if (customSchema) {
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-dynamic', 'true');
      schemaScript.textContent = JSON.stringify(customSchema);
      document.head.appendChild(schemaScript);
    }

    schemaData.forEach(schema => {
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-dynamic', 'true');
      schemaScript.textContent = JSON.stringify(schema.schema_json);
      document.head.appendChild(schemaScript);
    });

    const defaultSchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": finalSchemaType,
      "@id": `${canonicalUrl}#${finalSchemaType.toLowerCase()}`,
      "url": canonicalUrl,
      "name": fullTitle,
      "description": fullDescription,
      "inLanguage": localeMap[language] || 'de-DE',
      "isPartOf": {
        "@id": `${baseUrl}/#website`
      }
    };

    if (ogImage) {
      defaultSchema.image = {
        "@type": "ImageObject",
        "url": ogImage,
        "width": 1200,
        "height": 630
      };
    }

    if (seoData?.ai_optimization?.speakable_content && seoData.ai_optimization.speakable_content.length > 0) {
      defaultSchema['speakable'] = {
        "@type": "SpeakableSpecification",
        "cssSelector": [".hero-content", ".definition-block", "h1", "h2"]
      };
    }

    const defaultSchemaScript = document.createElement('script');
    defaultSchemaScript.type = 'application/ld+json';
    defaultSchemaScript.setAttribute('data-dynamic', 'true');
    defaultSchemaScript.textContent = JSON.stringify(defaultSchema);
    document.head.appendChild(defaultSchemaScript);

  }, [fullTitle, fullDescription, canonicalUrl, language, path, seoData, schemaData, finalSchemaType, customSchema, ogImage, section, sectionSEO]);

  return null;
}
