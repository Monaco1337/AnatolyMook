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

export const europeanCities: LocalLocation[] = [
  { city: 'Berlin', slug: 'berlin', country: 'Deutschland', countryCode: 'DE', region: 'Berlin', coordinates: { latitude: 52.5200, longitude: 13.4050 }, population: 3_645_000, languages: ['de', 'en'], searchVolume: 1200 },
  { city: 'München', slug: 'muenchen', country: 'Deutschland', countryCode: 'DE', region: 'Bayern', coordinates: { latitude: 48.1351, longitude: 11.5820 }, population: 1_472_000, languages: ['de', 'en'], searchVolume: 890 },
  { city: 'Hamburg', slug: 'hamburg', country: 'Deutschland', countryCode: 'DE', region: 'Hamburg', coordinates: { latitude: 53.5511, longitude: 9.9937 }, population: 1_841_000, languages: ['de', 'en'], searchVolume: 720 },
  { city: 'Köln', slug: 'koeln', country: 'Deutschland', countryCode: 'DE', region: 'Nordrhein-Westfalen', coordinates: { latitude: 50.9375, longitude: 6.9603 }, population: 1_083_000, languages: ['de', 'en'], searchVolume: 680 },
  { city: 'Frankfurt', slug: 'frankfurt', country: 'Deutschland', countryCode: 'DE', region: 'Hessen', coordinates: { latitude: 50.1109, longitude: 8.6821 }, population: 753_000, languages: ['de', 'en'], searchVolume: 650 },
  { city: 'Stuttgart', slug: 'stuttgart', country: 'Deutschland', countryCode: 'DE', region: 'Baden-Württemberg', coordinates: { latitude: 48.7758, longitude: 9.1829 }, population: 634_000, languages: ['de', 'en'], searchVolume: 560 },
  { city: 'Düsseldorf', slug: 'duesseldorf', country: 'Deutschland', countryCode: 'DE', region: 'Nordrhein-Westfalen', coordinates: { latitude: 51.2277, longitude: 6.7735 }, population: 619_000, languages: ['de', 'en'], searchVolume: 540 },
  { city: 'Dortmund', slug: 'dortmund', country: 'Deutschland', countryCode: 'DE', region: 'Nordrhein-Westfalen', coordinates: { latitude: 51.5136, longitude: 7.4653 }, population: 588_000, languages: ['de', 'en'], searchVolume: 420 },
  { city: 'Essen', slug: 'essen', country: 'Deutschland', countryCode: 'DE', region: 'Nordrhein-Westfalen', coordinates: { latitude: 51.4556, longitude: 7.0116 }, population: 583_000, languages: ['de', 'en'], searchVolume: 380 },
  { city: 'Leipzig', slug: 'leipzig', country: 'Deutschland', countryCode: 'DE', region: 'Sachsen', coordinates: { latitude: 51.3397, longitude: 12.3731 }, population: 587_000, languages: ['de', 'en'], searchVolume: 410 },
  { city: 'Bremen', slug: 'bremen', country: 'Deutschland', countryCode: 'DE', region: 'Bremen', coordinates: { latitude: 53.0793, longitude: 8.8017 }, population: 567_000, languages: ['de', 'en'], searchVolume: 350 },
  { city: 'Dresden', slug: 'dresden', country: 'Deutschland', countryCode: 'DE', region: 'Sachsen', coordinates: { latitude: 51.0504, longitude: 13.7373 }, population: 556_000, languages: ['de', 'en'], searchVolume: 360 },
  { city: 'Hannover', slug: 'hannover', country: 'Deutschland', countryCode: 'DE', region: 'Niedersachsen', coordinates: { latitude: 52.3759, longitude: 9.7320 }, population: 536_000, languages: ['de', 'en'], searchVolume: 380 },
  { city: 'Nürnberg', slug: 'nuernberg', country: 'Deutschland', countryCode: 'DE', region: 'Bayern', coordinates: { latitude: 49.4521, longitude: 11.0767 }, population: 518_000, languages: ['de', 'en'], searchVolume: 340 },
  { city: 'Unna', slug: 'unna', country: 'Deutschland', countryCode: 'DE', region: 'Nordrhein-Westfalen', coordinates: { latitude: 51.5347, longitude: 7.6889 }, population: 59_000, languages: ['de'], searchVolume: 120 },
  { city: 'Wien', slug: 'wien', country: 'Österreich', countryCode: 'AT', region: 'Wien', coordinates: { latitude: 48.2082, longitude: 16.3738 }, population: 1_911_000, languages: ['de', 'en'], searchVolume: 840 },
  { city: 'Graz', slug: 'graz', country: 'Österreich', countryCode: 'AT', region: 'Steiermark', coordinates: { latitude: 47.0707, longitude: 15.4395 }, population: 291_000, languages: ['de', 'en'], searchVolume: 280 },
  { city: 'Linz', slug: 'linz', country: 'Österreich', countryCode: 'AT', region: 'Oberösterreich', coordinates: { latitude: 48.3069, longitude: 14.2858 }, population: 205_000, languages: ['de', 'en'], searchVolume: 220 },
  { city: 'Salzburg', slug: 'salzburg', country: 'Österreich', countryCode: 'AT', region: 'Salzburg', coordinates: { latitude: 47.8095, longitude: 13.0550 }, population: 155_000, languages: ['de', 'en'], searchVolume: 260 },
  { city: 'Innsbruck', slug: 'innsbruck', country: 'Österreich', countryCode: 'AT', region: 'Tirol', coordinates: { latitude: 47.2692, longitude: 11.4041 }, population: 131_000, languages: ['de', 'en'], searchVolume: 200 },
  { city: 'Zürich', slug: 'zuerich', country: 'Schweiz', countryCode: 'CH', region: 'Zürich', coordinates: { latitude: 47.3769, longitude: 8.5417 }, population: 402_000, languages: ['de', 'en', 'fr'], searchVolume: 680 },
  { city: 'Basel', slug: 'basel', country: 'Schweiz', countryCode: 'CH', region: 'Basel-Stadt', coordinates: { latitude: 47.5596, longitude: 7.5886 }, population: 177_000, languages: ['de', 'en'], searchVolume: 320 },
  { city: 'Bern', slug: 'bern', country: 'Schweiz', countryCode: 'CH', region: 'Bern', coordinates: { latitude: 46.9480, longitude: 7.4474 }, population: 134_000, languages: ['de', 'en'], searchVolume: 280 },
  { city: 'Genf', slug: 'genf', country: 'Schweiz', countryCode: 'CH', region: 'Genf', coordinates: { latitude: 46.2044, longitude: 6.1432 }, population: 203_000, languages: ['fr', 'en'], searchVolume: 420 },
  { city: 'London', slug: 'london', country: 'United Kingdom', countryCode: 'GB', region: 'Greater London', coordinates: { latitude: 51.5074, longitude: -0.1278 }, population: 8_982_000, languages: ['en'], searchVolume: 2800 },
  { city: 'Paris', slug: 'paris', country: 'France', countryCode: 'FR', region: 'Île-de-France', coordinates: { latitude: 48.8566, longitude: 2.3522 }, population: 2_161_000, languages: ['fr', 'en'], searchVolume: 1500 },
  { city: 'Amsterdam', slug: 'amsterdam', country: 'Netherlands', countryCode: 'NL', region: 'North Holland', coordinates: { latitude: 52.3676, longitude: 4.9041 }, population: 872_000, languages: ['nl', 'en'], searchVolume: 920 },
  { city: 'Barcelona', slug: 'barcelona', country: 'Spain', countryCode: 'ES', region: 'Catalonia', coordinates: { latitude: 41.3874, longitude: 2.1686 }, population: 1_620_000, languages: ['es', 'en'], searchVolume: 1100 },
  { city: 'Madrid', slug: 'madrid', country: 'Spain', countryCode: 'ES', region: 'Community of Madrid', coordinates: { latitude: 40.4168, longitude: -3.7038 }, population: 3_223_000, languages: ['es', 'en'], searchVolume: 1350 },
  { city: 'Rom', slug: 'rom', country: 'Italien', countryCode: 'IT', region: 'Lazio', coordinates: { latitude: 41.9028, longitude: 12.4964 }, population: 2_873_000, languages: ['it', 'en'], searchVolume: 980 },
  { city: 'Mailand', slug: 'mailand', country: 'Italien', countryCode: 'IT', region: 'Lombardei', coordinates: { latitude: 45.4642, longitude: 9.1900 }, population: 1_352_000, languages: ['it', 'en'], searchVolume: 810 },
  { city: 'Stockholm', slug: 'stockholm', country: 'Sweden', countryCode: 'SE', region: 'Stockholm', coordinates: { latitude: 59.3293, longitude: 18.0686 }, population: 975_000, languages: ['sv', 'en'], searchVolume: 540 },
  { city: 'Kopenhagen', slug: 'kopenhagen', country: 'Denmark', countryCode: 'DK', region: 'Capital Region', coordinates: { latitude: 55.6761, longitude: 12.5683 }, population: 632_000, languages: ['da', 'en'], searchVolume: 480 },
  { city: 'Prag', slug: 'prag', country: 'Tschechien', countryCode: 'CZ', region: 'Prag', coordinates: { latitude: 50.0755, longitude: 14.4378 }, population: 1_309_000, languages: ['cs', 'en'], searchVolume: 520 },
  { city: 'Budapest', slug: 'budapest', country: 'Ungarn', countryCode: 'HU', region: 'Budapest', coordinates: { latitude: 47.4979, longitude: 19.0402 }, population: 1_752_000, languages: ['hu', 'en'], searchVolume: 480 },
  { city: 'Warschau', slug: 'warschau', country: 'Polen', countryCode: 'PL', region: 'Masowien', coordinates: { latitude: 52.2297, longitude: 21.0122 }, population: 1_790_000, languages: ['pl', 'en'], searchVolume: 560 },
  { city: 'Brüssel', slug: 'bruessel', country: 'Belgien', countryCode: 'BE', region: 'Brüssel', coordinates: { latitude: 50.8503, longitude: 4.3517 }, population: 1_209_000, languages: ['fr', 'nl', 'en'], searchVolume: 440 },
  { city: 'Dubai', slug: 'dubai', country: 'UAE', countryCode: 'AE', region: 'Dubai', coordinates: { latitude: 25.2048, longitude: 55.2708 }, population: 3_331_000, languages: ['ar', 'en'], searchVolume: 1800 },
  { city: 'New York', slug: 'new-york', country: 'USA', countryCode: 'US', region: 'New York', coordinates: { latitude: 40.7128, longitude: -74.0060 }, population: 8_336_000, languages: ['en'], searchVolume: 3200 },
  { city: 'Moskau', slug: 'moskau', country: 'Russland', countryCode: 'RU', region: 'Moskau', coordinates: { latitude: 55.7558, longitude: 37.6173 }, population: 12_506_000, languages: ['ru', 'en'], searchVolume: 1600 },
  { city: 'Singapur', slug: 'singapur', country: 'Singapur', countryCode: 'SG', region: 'Singapur', coordinates: { latitude: 1.3521, longitude: 103.8198 }, population: 5_686_000, languages: ['en', 'zh'], searchVolume: 920 },
];

const BASE_URL = 'https://www.anatoly-mook.de';

const wikidataIds: Record<string, string> = {
  'Berlin': 'Q64', 'München': 'Q1726', 'Hamburg': 'Q1055', 'Köln': 'Q365', 'Frankfurt': 'Q1794',
  'Stuttgart': 'Q1022', 'Düsseldorf': 'Q1718', 'Dortmund': 'Q1295', 'Essen': 'Q2066',
  'Leipzig': 'Q2079', 'Bremen': 'Q24879', 'Dresden': 'Q1731', 'Hannover': 'Q1715',
  'Nürnberg': 'Q2090', 'Unna': 'Q2747', 'Wien': 'Q1741', 'Graz': 'Q13298',
  'Linz': 'Q41329', 'Salzburg': 'Q34713', 'Innsbruck': 'Q1735', 'Zürich': 'Q72',
  'Basel': 'Q78', 'Bern': 'Q70', 'Genf': 'Q71', 'London': 'Q84', 'Paris': 'Q90',
  'Amsterdam': 'Q727', 'Barcelona': 'Q1492', 'Madrid': 'Q2807', 'Rom': 'Q220',
  'Mailand': 'Q490', 'Stockholm': 'Q1754', 'Kopenhagen': 'Q1748', 'Prag': 'Q1085',
  'Budapest': 'Q1781', 'Warschau': 'Q270', 'Brüssel': 'Q239', 'Dubai': 'Q612',
  'New York': 'Q60', 'Moskau': 'Q649', 'Singapur': 'Q334',
};

export const getCityWikidataId = (city: string): string => wikidataIds[city] || 'Q515';

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
