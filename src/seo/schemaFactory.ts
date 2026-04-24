const BASE_URL = 'https://www.anatoly-mook.de';
const OG_IMAGE = `${BASE_URL}/bildschirmfoto_2025-12-10_um_20.44.33.png`;

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Anatoly Mook',
    alternateName: 'Anatolij Mook',
    url: BASE_URL,
    image: { '@type': 'ImageObject', url: OG_IMAGE, caption: 'Anatoly Mook – Mentor für Klarheit, bewusste Führung und persönliche Meisterschaft' },
    sameAs: [
      'https://www.linkedin.com/in/anatolymook',
      'https://twitter.com/anatolymux',
      'https://www.facebook.com/anatolymux',
      'https://www.instagram.com/anatolymux',
      'https://www.youtube.com/@anatolymux'
    ],
    jobTitle: 'Mentor für Bewusstsein & persönliche Meisterschaft',
    description: 'Anatoly Mook steht für Klarheit statt Suche. Bewusstseinsarbeit, Coaching und Formate für Menschen, die Verantwortung übernehmen und ihr Leben konsequent gestalten wollen.',
    knowsAbout: [
      'Bewusstseinsentwicklung', 'Persönliche Meisterschaft', 'Bewusste Führung', 'Entscheidungsstärke',
      'Transformation', 'Mentoring', 'Executive Coaching', 'Persönlichkeitsentwicklung',
      'Organisationsentwicklung', 'Führungskräfteentwicklung', 'Corporate Training', 'Keynote Speaking',
      'Resilienz', 'Work-Life-Integration', 'Achtsamkeit', 'Servant Leadership',
      'Change Management', 'Teamentwicklung', 'Potenzialentfaltung', 'Selbstreflexion'
    ],
    address: { '@type': 'PostalAddress', streetAddress: 'Ackerstraße 56', addressLocality: 'Unna', postalCode: '59423', addressRegion: 'Nordrhein-Westfalen', addressCountry: 'DE' },
    telephone: '+49-2303-3340628',
    email: 'mail@anatoly-mook.de',
    knowsLanguage: [
      { '@type': 'Language', name: 'Deutsch', alternateName: 'de' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Русский', alternateName: 'ru' }
    ]
  };
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Anatoly Mook Academy',
    url: BASE_URL,
    logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon-512x512.png`, width: 512, height: 512 },
    image: { '@type': 'ImageObject', url: OG_IMAGE },
    founder: { '@id': `${BASE_URL}/#person` },
    description: 'Coaching, Seminare und Mentoring für Klarheit, bewusste Führung und persönliche Meisterschaft.',
    sameAs: [
      'https://www.linkedin.com/in/anatolymook',
      'https://twitter.com/anatolymux',
      'https://www.facebook.com/anatolymux',
      'https://www.instagram.com/anatolymux',
      'https://www.youtube.com/@anatolymux'
    ],
    address: { '@type': 'PostalAddress', streetAddress: 'Ackerstraße 56', addressLocality: 'Unna', postalCode: '59423', addressRegion: 'Nordrhein-Westfalen', addressCountry: 'DE' },
    telephone: '+49-2303-3340628',
    email: 'mail@anatoly-mook.de',
    contactPoint: { '@type': 'ContactPoint', contactType: 'Customer Service', telephone: '+49-2303-3340628', email: 'mail@anatoly-mook.de', availableLanguage: ['Deutsch', 'English', 'Русский'] },
    areaServed: [
      { '@type': 'Country', name: 'Deutschland' },
      { '@type': 'Country', name: 'Österreich' },
      { '@type': 'Country', name: 'Schweiz' }
    ]
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Anatoly Mook – Klarheit, bewusste Führung & persönliche Meisterschaft',
    description: 'Coaching, Seminare und Mentoring für Menschen, die Verantwortung übernehmen und ihr Leben konsequent gestalten wollen.',
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: ['de-DE', 'en-US', 'ru-RU'],
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
      }))
    ]
  };
}

export function webPageSchema(opts: { url: string; title: string; description: string; type?: string; datePublished?: string; dateModified?: string }) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': opts.type || 'WebPage',
    '@id': `${opts.url.startsWith('http') ? opts.url : BASE_URL + opts.url}#webpage`,
    url: opts.url.startsWith('http') ? opts.url : `${BASE_URL}${opts.url}`,
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#person` },
    inLanguage: 'de-DE',
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.hero-content', '.definition-block', 'h1', 'h2'] },
  };
  if (opts.datePublished) schema.datePublished = opts.datePublished;
  if (opts.dateModified) schema.dateModified = opts.dateModified;
  return schema;
}

export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };
}

/** One FAQPage node for @graph (no nested @context). Google requires mainEntity. */
export function faqPageGraphNode(
  canonicalUrl: string,
  faqs: Array<{ question: string; answer: string }>,
  opts?: { name?: string; description?: string; inLanguage?: string }
): Record<string, unknown> {
  const node: Record<string, unknown> = {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faqpage`,
    url: canonicalUrl,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };
  if (opts?.name) node.name = opts.name;
  if (opts?.description) node.description = opts.description;
  if (opts?.inLanguage) node.inLanguage = opts.inLanguage;
  return node;
}

function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${BASE_URL}${path}`;
}

/** BreadcrumbList for embedding in @graph (no nested @context). */
export function breadcrumbListGraphNode(
  canonicalUrl: string,
  trail: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      ...trail.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: toAbsoluteUrl(item.url)
      }))
    ]
  };
}

export function courseSchema(course: { name: string; description: string; url: string; provider?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    url: course.url.startsWith('http') ? course.url : `${BASE_URL}${course.url}`,
    provider: { '@id': `${BASE_URL}/#organization` },
    performer: { '@id': `${BASE_URL}/#person` },
    availableLanguage: ['de', 'en', 'ru']
  };
}

export function eventSchema(event: { name: string; description: string; startDate: string; endDate?: string; location?: string; url?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: event.location ? { '@type': 'Place', name: event.location } : { '@type': 'VirtualLocation', url: BASE_URL },
    organizer: { '@id': `${BASE_URL}/#organization` },
    performer: { '@id': `${BASE_URL}/#person` },
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: `${BASE_URL}/booking` }
  };
}

export function serviceSchema(service: { name: string; description: string; url: string; serviceType: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url.startsWith('http') ? service.url : `${BASE_URL}${service.url}`,
    serviceType: service.serviceType,
    provider: { '@id': `${BASE_URL}/#person` },
    areaServed: [
      { '@type': 'Country', name: 'Deutschland' },
      { '@type': 'Country', name: 'Österreich' },
      { '@type': 'Country', name: 'Schweiz' }
    ],
    availableLanguage: ['de', 'en', 'ru']
  };
}

export function definedTermSchema(term: { name: string; description: string; url: string; inDefinedTermSet?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.name,
    description: term.description,
    url: term.url.startsWith('http') ? term.url : `${BASE_URL}${term.url}`,
    inDefinedTermSet: term.inDefinedTermSet || `${BASE_URL}/glossar`
  };
}

export function reviewSchema(review: { author: string; role: string; text: string; rating: number; date: string; serviceName?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'Service', name: review.serviceName || 'Coaching & Mentoring', provider: { '@id': `${BASE_URL}/#person` } },
    author: { '@type': 'Person', name: review.author, jobTitle: review.role },
    reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: 5 },
    reviewBody: review.text,
    datePublished: review.date
  };
}

export function localBusinessSchema(opts: { city: string; slug: string; service?: string; lat: number; lng: number; wikidataId?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Anatoly Mook – ${opts.service || 'Coaching & Mentoring'} in ${opts.city}`,
    image: OG_IMAGE,
    '@id': `${BASE_URL}/${opts.slug}`,
    url: `${BASE_URL}/${opts.slug}`,
    telephone: '+49-2303-3340628',
    email: 'mail@anatoly-mook.de',
    address: { '@type': 'PostalAddress', streetAddress: 'Ackerstraße 56', addressLocality: 'Unna', postalCode: '59423', addressCountry: 'DE' },
    geo: { '@type': 'GeoCoordinates', latitude: opts.lat, longitude: opts.lng },
    areaServed: { '@type': 'City', name: opts.city, ...(opts.wikidataId ? { '@id': `https://www.wikidata.org/wiki/${opts.wikidataId}` } : {}) },
    provider: { '@id': `${BASE_URL}/#person` },
    priceRange: '€€€',
    availableLanguage: ['de', 'en', 'ru']
  };
}

export function graphSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [personSchema(), organizationSchema(), websiteSchema()]
  };
}
