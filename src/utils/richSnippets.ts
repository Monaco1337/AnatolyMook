export const reviewSchema = (product: {
  name: string;
  averageRating: number;
  reviewCount: number;
  reviews: Array<{
    author: string;
    rating: number;
    text: string;
    date: string;
  }>;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: product.averageRating,
    reviewCount: product.reviewCount,
    bestRating: 5,
    worstRating: 1
  },
  review: product.reviews.map(review => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author
    },
    datePublished: review.date,
    reviewBody: review.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    }
  }))
});

export const howToSchema = (guide: {
  name: string;
  description: string;
  totalTime: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: guide.name,
  description: guide.description,
  totalTime: guide.totalTime,
  step: guide.steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
    image: step.image
  }))
});

export const recipeSchema = (meditation: {
  name: string;
  description: string;
  prepTime: string;
  totalTime: string;
  recipeYield: string;
  instructions: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Recipe',
  name: meditation.name,
  description: meditation.description,
  prepTime: meditation.prepTime,
  totalTime: meditation.totalTime,
  recipeYield: meditation.recipeYield,
  recipeInstructions: meditation.instructions.map((instruction, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    text: instruction
  }))
});

export const testimonialSchema = (testimonial: {
  author: string;
  role: string;
  text: string;
  rating: number;
  date: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'Service',
    name: 'Spiritual Awakening Coaching',
    provider: {
      '@type': 'Person',
      name: 'Anatoly Mook'
    }
  },
  author: {
    '@type': 'Person',
    name: testimonial.author,
    jobTitle: testimonial.role
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: testimonial.rating,
    bestRating: 5
  },
  reviewBody: testimonial.text,
  datePublished: testimonial.date
});

export const spiritualTestimonials = [
  {
    author: 'Dr. Michael Schmidt',
    role: 'CEO, Tech Startup',
    text: 'Die Arbeit mit Anatoly hat meine Perspektive fundamental verändert. Nicht durch Techniken oder Methoden, sondern durch direkte Transmission. Das Erwachen, das ich erlebt habe, war kein spirituelles Konzept mehr, sondern lebendige Realität.',
    rating: 5,
    date: '2024-11-15'
  },
  {
    author: 'Sarah Weber',
    role: 'Psychotherapeutin',
    text: 'Als Therapeutin habe ich viele spirituelle Lehrer erlebt. Anatoly ist anders - keine Marketing-Versprechen, keine schnellen Lösungen. Seine Arbeit ist tief, authentisch und transformativ. Nach 6 Monaten Begleitung ist mein Leben nicht wieder zu erkennen.',
    rating: 5,
    date: '2024-10-22'
  },
  {
    author: 'Thomas Müller',
    role: 'Geschäftsführer',
    text: 'Ich kam mit dem Wunsch nach besserer Führung. Was ich bekam, war ein kompletter Durchbruch. Anatoly arbeitet nicht an Symptomen, sondern an der Wurzel. Die Veränderung in meinem Unternehmen ist messbar - aber die Veränderung in mir ist unbeschreiblich.',
    rating: 5,
    date: '2024-09-08'
  }
];

export const itemListSchema = (items: Array<{
  name: string;
  url: string;
  image?: string;
  description?: string;
}>) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Thing',
      name: item.name,
      url: item.url,
      image: item.image,
      description: item.description
    }
  }))
});

export const qaPageSchema = (questions: Array<{
  question: string;
  answer: string;
  author?: string;
}>) => ({
  '@context': 'https://schema.org',
  '@type': 'QAPage',
  mainEntity: questions.map(qa => ({
    '@type': 'Question',
    name: qa.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: qa.answer,
      author: qa.author ? {
        '@type': 'Person',
        name: qa.author
      } : undefined
    }
  }))
});

export const collectionPageSchema = (collection: {
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: collection.name,
  description: collection.description,
  url: collection.url,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: collection.numberOfItems
  }
});

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Anatoly Mook - Spiritual Awakening & Consciousness Coaching',
  image: 'https://anatolymook.com/og-image.jpg',
  '@id': 'https://anatolymook.com',
  url: 'https://anatolymook.com',
  telephone: '+49-xxx-xxxxxx',
  priceRange: '€€€',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'DE'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.1657,
    longitude: 10.4515
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  },
  sameAs: [
    'https://www.instagram.com/anatolymux',
    'https://www.youtube.com/@anatolymux',
    'https://www.linkedin.com/in/anatolymook'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Spiritual Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Individual Consciousness Coaching',
          description: 'One-on-one guidance for spiritual awakening'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Awakening Seminars',
          description: 'Intensive group seminars for consciousness transformation'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corporate Consciousness Programs',
          description: 'Leadership development through awareness'
        }
      }
    ]
  }
};
