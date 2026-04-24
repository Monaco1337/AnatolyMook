import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { getSectionSEO } from '../utils/seoConfig';
import { graphSchema, faqPageGraphNode } from '../seo/schemaFactory';
import { MAIN_FAQ_HUB_ITEMS, isMainFaqHubPath } from '../seo/mainFaqHubData';

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

const HREFLANG_MAP = [
  { hreflang: 'de', prefix: '' },
  { hreflang: 'de-DE', prefix: '' },
  { hreflang: 'de-AT', prefix: '' },
  { hreflang: 'de-CH', prefix: '' },
  { hreflang: 'en', prefix: '/en' },
  { hreflang: 'en-US', prefix: '/en' },
  { hreflang: 'en-GB', prefix: '/en' },
  { hreflang: 'en-CA', prefix: '/en' },
  { hreflang: 'en-AU', prefix: '/en' },
  { hreflang: 'ru', prefix: '/ru' },
  { hreflang: 'ru-RU', prefix: '/ru' },
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

  const baseUrl = 'https://www.anatoly-mook.de';
  const sectionSEO = getSectionSEO(section);

  const fullTitle = title || seoData?.title || sectionSEO.title || t('meta.defaultTitle') || 'Anatoly Mook – Klarheit, bewusste Führung & persönliche Meisterschaft';
  const fullDescription = description || seoData?.description || sectionSEO.description || t('meta.defaultDescription') || 'Anatoly Mook steht für Klarheit statt Suche. Bewusstseinsarbeit, Coaching und Formate für Menschen, die Verantwortung übernehmen und ihr Leben konsequent gestalten wollen.';
  const canonicalUrl = `${baseUrl}${path && path !== '/' ? path : ''}`;
  const finalSchemaType = schemaType || sectionSEO.schemaType || 'WebPage';
  const ogImage = seoData?.og_image || sectionSEO.ogImage || 'https://www.anatoly-mook.de/bildschirmfoto_2025-12-10_um_20.44.33.png';

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

        if (metaData) setSeoData(metaData);

        const { data: schemas } = await supabase
          .from('seo_schema_markup')
          .select('*')
          .eq('page_path', path || '/')
          .eq('language', language)
          .eq('is_active', true);

        if (schemas) setSchemaData(schemas);
      } catch {
        // Supabase not configured - static SEO only
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
    setOrUpdateMeta('robots', seoData?.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    const keywords = seoData?.keywords || sectionSEO.keywords || [];
    if (keywords.length > 0) setOrUpdateMeta('keywords', keywords.join(', '));

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

    const localeMap: Record<string, string> = { de: 'de_DE', en: 'en_US', ru: 'ru_RU' };
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

    setOrUpdateMeta('author', 'Anatoly Mook');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]:not([data-static])');
    existingHreflang.forEach(link => link.remove());

    const cleanPath = path?.replace(/^\/(en|ru)/, '') || '';
    const pagePath = cleanPath && cleanPath !== '/' ? cleanPath : '';

    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = `${baseUrl}${pagePath}`;
    document.head.appendChild(xDefault);

    HREFLANG_MAP.forEach(entry => {
      const hreflang = document.createElement('link');
      hreflang.rel = 'alternate';
      hreflang.hreflang = entry.hreflang;
      hreflang.href = `${baseUrl}${entry.prefix}${pagePath}`;
      document.head.appendChild(hreflang);
    });

    document.documentElement.lang = language;

    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"][data-dynamic]');
    existingSchemas.forEach(script => script.remove());

    const faqHubPath = isMainFaqHubPath(path || '');

    if (customSchema) {
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-dynamic', 'true');
      schemaScript.textContent = JSON.stringify(customSchema);
      document.head.appendChild(schemaScript);
    }

    schemaData.forEach(schema => {
      const json = schema.schema_json as Record<string, unknown> | undefined;
      if (faqHubPath && json && json['@type'] === 'FAQPage') return;
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-dynamic', 'true');
      schemaScript.textContent = JSON.stringify(schema.schema_json);
      document.head.appendChild(schemaScript);
    });

    if (!customSchema) {
      const entityGraph = graphSchema();
      const inLangSchema = language === 'en' ? 'en-US' : language === 'ru' ? 'ru-RU' : 'de-DE';

      if (faqHubPath && section === 'faq') {
        const qaPairs = MAIN_FAQ_HUB_ITEMS.map(({ question, answer }) => ({ question, answer }));
        entityGraph['@graph'].push(
          faqPageGraphNode(canonicalUrl, qaPairs, {
            name: fullTitle,
            description: fullDescription,
            inLanguage: inLangSchema
          })
        );
      } else {
        const graphPageType = finalSchemaType === 'FAQPage' ? 'WebPage' : finalSchemaType;
        const pageSchema: Record<string, unknown> = {
          '@type': graphPageType,
          '@id': `${canonicalUrl}#${String(graphPageType).toLowerCase()}`,
          url: canonicalUrl,
          name: fullTitle,
          description: fullDescription,
          inLanguage: inLangSchema,
          isPartOf: { '@id': `${baseUrl}/#website` },
          about: { '@id': `${baseUrl}/#person` },
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.hero-content', '.definition-block', 'h1', 'h2'] },
        };
        if (ogImage) {
          pageSchema.image = { '@type': 'ImageObject', url: ogImage, width: 1200, height: 630 };
        }
        entityGraph['@graph'].push(pageSchema);
      }

      const entityScript = document.createElement('script');
      entityScript.type = 'application/ld+json';
      entityScript.setAttribute('data-dynamic', 'true');
      entityScript.textContent = JSON.stringify(entityGraph);
      document.head.appendChild(entityScript);
    }

  }, [fullTitle, fullDescription, canonicalUrl, language, path, seoData, schemaData, finalSchemaType, customSchema, ogImage, section, sectionSEO]);

  return null;
}
