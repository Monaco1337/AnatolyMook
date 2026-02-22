export interface LocalLocation {
  city: string;
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
  {
    city: 'Berlin',
    country: 'Deutschland',
    countryCode: 'DE',
    region: 'Berlin',
    coordinates: { latitude: 52.5200, longitude: 13.4050 },
    population: 3_645_000,
    languages: ['de', 'en'],
    searchVolume: 1200
  },
  {
    city: 'München',
    country: 'Deutschland',
    countryCode: 'DE',
    region: 'Bayern',
    coordinates: { latitude: 48.1351, longitude: 11.5820 },
    population: 1_472_000,
    languages: ['de', 'en'],
    searchVolume: 890
  },
  {
    city: 'Hamburg',
    country: 'Deutschland',
    countryCode: 'DE',
    region: 'Hamburg',
    coordinates: { latitude: 53.5511, longitude: 9.9937 },
    population: 1_841_000,
    languages: ['de', 'en'],
    searchVolume: 720
  },
  {
    city: 'Frankfurt',
    country: 'Deutschland',
    countryCode: 'DE',
    region: 'Hessen',
    coordinates: { latitude: 50.1109, longitude: 8.6821 },
    population: 753_000,
    languages: ['de', 'en'],
    searchVolume: 650
  },
  {
    city: 'Wien',
    country: 'Österreich',
    countryCode: 'AT',
    region: 'Wien',
    coordinates: { latitude: 48.2082, longitude: 16.3738 },
    population: 1_911_000,
    languages: ['de', 'en'],
    searchVolume: 840
  },
  {
    city: 'Zürich',
    country: 'Schweiz',
    countryCode: 'CH',
    region: 'Zürich',
    coordinates: { latitude: 47.3769, longitude: 8.5417 },
    population: 402_000,
    languages: ['de', 'en', 'fr', 'it'],
    searchVolume: 680
  },
  {
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    region: 'Île-de-France',
    coordinates: { latitude: 48.8566, longitude: 2.3522 },
    population: 2_161_000,
    languages: ['fr', 'en'],
    searchVolume: 1500
  },
  {
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Greater London',
    coordinates: { latitude: 51.5074, longitude: -0.1278 },
    population: 8_982_000,
    languages: ['en'],
    searchVolume: 2800
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    region: 'North Holland',
    coordinates: { latitude: 52.3676, longitude: 4.9041 },
    population: 872_000,
    languages: ['nl', 'en'],
    searchVolume: 920
  },
  {
    city: 'Barcelona',
    country: 'Spain',
    countryCode: 'ES',
    region: 'Catalonia',
    coordinates: { latitude: 41.3874, longitude: 2.1686 },
    population: 1_620_000,
    languages: ['es', 'ca', 'en'],
    searchVolume: 1100
  },
  {
    city: 'Madrid',
    country: 'Spain',
    countryCode: 'ES',
    region: 'Community of Madrid',
    coordinates: { latitude: 40.4168, longitude: -3.7038 },
    population: 3_223_000,
    languages: ['es', 'en'],
    searchVolume: 1350
  },
  {
    city: 'Rom',
    country: 'Italien',
    countryCode: 'IT',
    region: 'Lazio',
    coordinates: { latitude: 41.9028, longitude: 12.4964 },
    population: 2_873_000,
    languages: ['it', 'en'],
    searchVolume: 980
  },
  {
    city: 'Mailand',
    country: 'Italien',
    countryCode: 'IT',
    region: 'Lombardei',
    coordinates: { latitude: 45.4642, longitude: 9.1900 },
    population: 1_352_000,
    languages: ['it', 'en'],
    searchVolume: 810
  },
  {
    city: 'Stockholm',
    country: 'Sweden',
    countryCode: 'SE',
    region: 'Stockholm',
    coordinates: { latitude: 59.3293, longitude: 18.0686 },
    population: 975_000,
    languages: ['sv', 'en'],
    searchVolume: 540
  },
  {
    city: 'Kopenhagen',
    country: 'Denmark',
    countryCode: 'DK',
    region: 'Capital Region',
    coordinates: { latitude: 55.6761, longitude: 12.5683 },
    population: 632_000,
    languages: ['da', 'en'],
    searchVolume: 480
  }
];

export const generateLocalSchema = (location: LocalLocation) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: `Anatoly Mook - Spirituelles Erwachen ${location.city}`,
  image: 'https://anatolymook.com/og-image.jpg',
  '@id': `https://anatolymook.com/${location.city.toLowerCase()}`,
  url: `https://anatolymook.com/${location.city.toLowerCase()}`,
  telephone: '+49-xxx-xxxxxx',
  address: {
    '@type': 'PostalAddress',
    addressLocality: location.city,
    addressRegion: location.region,
    addressCountry: location.countryCode
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
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  },
  priceRange: '€€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer'
});

const getCityWikidataId = (city: string): string => {
  const wikidataIds: Record<string, string> = {
    'Berlin': 'Q64',
    'München': 'Q1726',
    'Hamburg': 'Q1055',
    'Frankfurt': 'Q1794',
    'Wien': 'Q1741',
    'Zürich': 'Q72',
    'Paris': 'Q90',
    'London': 'Q84',
    'Amsterdam': 'Q727',
    'Barcelona': 'Q1492',
    'Madrid': 'Q2807',
    'Rom': 'Q220',
    'Mailand': 'Q490',
    'Stockholm': 'Q1754',
    'Kopenhagen': 'Q1748'
  };
  return wikidataIds[city] || 'Q515';
};

export const generateLocalLandingPage = (location: LocalLocation, service: string) => {
  const translations: Record<string, Record<string, string>> = {
    de: {
      title: `Spirituelles Erwachen ${location.city} - Seminare, Coaching & Transformation`,
      h1: `Spirituelles Erwachen in ${location.city}`,
      intro: `Professionelle Begleitung für spirituelles Erwachen, Bewusstseinsdurchbruch und innere Transformation in ${location.city}. Anatoly Mook bietet Seminare, Einzelcoaching und Corporate-Programme.`,
      why: `Warum ${location.city}?`,
      whyText: `${location.city} ist ein wichtiges Zentrum für spirituelle Entwicklung und bewusste Lebensführung. Mit ${Math.round(location.population / 1000)}k Einwohnern bietet die Stadt optimale Bedingungen für Transformation und Erwachen.`,
      services: 'Angebote',
      cta: 'Jetzt Kontakt aufnehmen'
    },
    en: {
      title: `Spiritual Awakening ${location.city} - Seminars, Coaching & Transformation`,
      h1: `Spiritual Awakening in ${location.city}`,
      intro: `Professional guidance for spiritual awakening, consciousness breakthrough and inner transformation in ${location.city}. Anatoly Mook offers seminars, individual coaching and corporate programs.`,
      why: `Why ${location.city}?`,
      whyText: `${location.city} is an important center for spiritual development and conscious living. With ${Math.round(location.population / 1000)}k inhabitants, the city offers optimal conditions for transformation and awakening.`,
      services: 'Services',
      cta: 'Contact Now'
    }
  };

  const lang = location.languages[0];
  const t = translations[lang] || translations.en;

  return {
    meta: {
      title: t.title,
      description: t.intro,
      keywords: [
        `spirituelles erwachen ${location.city}`,
        `spiritual awakening ${location.city}`,
        `bewusstsein ${location.city}`,
        `transformation ${location.city}`,
        `meditation ${location.city}`,
        `coaching ${location.city}`
      ]
    },
    content: {
      h1: t.h1,
      intro: t.intro,
      sections: [
        {
          heading: t.why,
          content: t.whyText
        },
        {
          heading: t.services,
          content: `- Spirituelle Seminare in ${location.city}\n- Einzelcoaching für Erwachen\n- Corporate Consciousness Programme\n- Retreats und Intensives`
        }
      ]
    },
    schema: generateLocalSchema(location)
  };
};

export const localKeywords = europeanCities.flatMap(city => [
  `spirituelles erwachen ${city.city}`,
  `spiritual awakening ${city.city}`,
  `bewusstsein coaching ${city.city}`,
  `meditation ${city.city}`,
  `spiritueller lehrer ${city.city}`,
  `erwachen seminar ${city.city}`,
  `transformation coaching ${city.city}`,
  `conscious leadership ${city.city}`
]);
