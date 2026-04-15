import { allCities } from '../seo/cityDatabase';

export interface LocalLocation {
  city: string;
  slug: string;
  country: string;
  countryCode: string;
  region: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  population: number;
  languages: string[];
  searchVolume: number;
}

export const europeanCities: LocalLocation[] = allCities.map(c => ({
  city: c.name,
  slug: c.slug,
  country: c.country,
  countryCode: c.countryCode,
  region: c.region,
  coordinates: { latitude: c.coordinates.lat, longitude: c.coordinates.lng },
  population: c.population,
  languages: c.languages,
  searchVolume: c.population > 1_000_000 ? 800 : c.population > 500_000 ? 500 : c.population > 100_000 ? 300 : 100,
}));

const BASE_URL = 'https://www.anatoly-mook.de';

const wikidataIndex = new Map(allCities.map(c => [c.name, c.wikidataId]));

export const getCityWikidataId = (city: string): string => wikidataIndex.get(city) || 'Q515';

export const generateLocalSchema = (location: LocalLocation, service?: string) => {
  const serviceName = service
    ? serviceLabels[service] || service
    : 'Coaching, Seminare & Mentoring';

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Anatoly Mook – ${serviceName} in ${location.city}`,
    image: `${BASE_URL}/bildschirmfoto_2025-12-10_um_20.44.33.png`,
    '@id': `${BASE_URL}/${location.slug}`,
    url: `${BASE_URL}/${location.slug}`,
    telephone: '+49-2303-3340628',
    email: 'mail@anatoly-mook.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ackerstraße 56',
      addressLocality: 'Unna',
      postalCode: '59423',
      addressRegion: 'Nordrhein-Westfalen',
      addressCountry: 'DE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude
    },
    areaServed: {
      '@type': 'City',
      name: location.city,
      '@id': `https://www.wikidata.org/wiki/${getCityWikidataId(location.city)}`
    },
    provider: { '@id': `${BASE_URL}/#person` },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    priceRange: '€€€',
    availableLanguage: ['de', 'en', 'ru']
  };
};

const serviceLabels: Record<string, string> = {
  seminare: 'Seminare & Workshops',
  coaching: 'Coaching & Mentoring',
  keynotes: 'Keynote-Vorträge',
  corporate: 'Corporate-Programme',
  transformation: 'Transformation',
  resources: 'Ressourcen',
  booking: 'Termin buchen',
};

const serviceLabelsEn: Record<string, string> = {
  seminare: 'Seminars & Workshops',
  coaching: 'Coaching & Mentoring',
  keynotes: 'Keynote Speaking',
  corporate: 'Corporate Programs',
  transformation: 'Transformation',
  resources: 'Resources',
  booking: 'Book Appointment',
};

const serviceLabelsRu: Record<string, string> = {
  seminare: 'Семинары и воркшопы',
  coaching: 'Коучинг и менторинг',
  keynotes: 'Ки-ноуты',
  corporate: 'Корпоративные программы',
  transformation: 'Трансформация',
  resources: 'Ресурсы',
  booking: 'Записаться',
};

export const generateLocalLandingPage = (location: LocalLocation, service: string) => {
  const svcDe = serviceLabels[service] || service;
  const svcEn = serviceLabelsEn[service] || service;

  const translations = {
    de: {
      title: `${svcDe} in ${location.city} – Anatoly Mook`,
      h1: `${svcDe} in ${location.city}`,
      intro: `Individuelle Begleitung für Klarheit, bewusste Führung und persönliche Meisterschaft in ${location.city}. Anatoly Mook bietet ${svcDe} – präzise, wirksam, nachhaltig.`,
      why: `${svcDe} in ${location.city}`,
      whyText: `${location.city} (${location.region}, ${location.country}) mit ${(location.population / 1000).toFixed(0)}k Einwohnern bietet ein starkes Umfeld für persönliche und berufliche Weiterentwicklung. Anatoly Mook begleitet Führungskräfte und Entscheider in ${location.city} auf dem Weg zu mehr Klarheit und bewusster Führung.`,
      services: 'Angebote',
      serviceList: [
        `${svcDe} in ${location.city}`,
        '1:1 Coaching & Mentoring',
        'Intensive Seminare & Workshops',
        'Corporate-Programme für Führungsteams',
        'Keynote-Vorträge'
      ],
      cta: 'Jetzt Termin vereinbaren'
    },
    en: {
      title: `${svcEn} in ${location.city} – Anatoly Mook`,
      h1: `${svcEn} in ${location.city}`,
      intro: `Individual guidance for clarity, conscious leadership and personal mastery in ${location.city}. Anatoly Mook offers ${svcEn} – precise, effective, sustainable.`,
      why: `${svcEn} in ${location.city}`,
      whyText: `${location.city} (${location.region}, ${location.country}) with ${(location.population / 1000).toFixed(0)}k residents provides a strong environment for personal and professional growth. Anatoly Mook supports leaders and decision-makers in ${location.city} on the path to greater clarity and conscious leadership.`,
      services: 'Services',
      serviceList: [
        `${svcEn} in ${location.city}`,
        '1:1 Coaching & Mentoring',
        'Intensive Seminars & Workshops',
        'Corporate Programs for Leadership Teams',
        'Keynote Speaking'
      ],
      cta: 'Book Appointment'
    },
    ru: {
      title: `${serviceLabelsRu[service] || service} в городе ${location.city} – Анатолий Мук`,
      h1: `${serviceLabelsRu[service] || service} в городе ${location.city}`,
      intro: `Индивидуальное сопровождение для ясности, осознанного лидерства и личного мастерства в ${location.city}. Анатолий Мук предлагает ${serviceLabelsRu[service] || service} – точно, эффективно, устойчиво.`,
      why: `${serviceLabelsRu[service] || service} в ${location.city}`,
      whyText: `${location.city} (${location.region}, ${location.country}) с населением ${(location.population / 1000).toFixed(0)} тыс. создаёт сильную среду для личного и профессионального развития.`,
      services: 'Услуги',
      serviceList: [
        `${serviceLabelsRu[service] || service} в ${location.city}`,
        'Индивидуальный коучинг и менторинг',
        'Интенсивные семинары и воркшопы',
        'Корпоративные программы',
        'Ки-ноуты'
      ],
      cta: 'Записаться'
    }
  };

  return { translations, schema: generateLocalSchema(location, service) };
};

export const localKeywords = europeanCities.flatMap(city => [
  `coaching ${city.city}`,
  `executive coaching ${city.city}`,
  `führungskräfte coaching ${city.city}`,
  `bewusste führung ${city.city}`,
  `persönliche meisterschaft ${city.city}`,
  `seminare ${city.city}`,
  `transformation coaching ${city.city}`,
  `leadership coaching ${city.city}`
]);
