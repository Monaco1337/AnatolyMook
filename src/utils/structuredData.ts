export function generateBreadcrumbSchema(section: string) {
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.anatoly-mook.de"
    }
  ];

  const sectionMap: Record<string, string> = {
    about: 'Über mich',
    seminare: 'Seminare',
    coaching: 'Coaching',
    keynotes: 'Keynotes',
    events: 'Events',
    corporate: 'Corporate',
    transformation: 'Transformation',
    blog: 'Blog',
    produkte: 'Produkte',
    faq: 'FAQ',
    kontakt: 'Kontakt',
    booking: 'Termin buchen',
    quiz: 'Bewusstseins-Quiz',
    resources: 'Ressourcen'
  };

  if (section !== 'home' && sectionMap[section]) {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": sectionMap[section],
      "item": `https://www.anatoly-mook.de/${section}`
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.anatoly-mook.de/#organization",
    "name": "Anatoly Mook",
    "url": "https://www.anatoly-mook.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.anatoly-mook.de/favicon-512x512.png",
      "width": 512,
      "height": 512
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://www.anatoly-mook.de/bildschirmfoto_2025-12-10_um_20.44.33.png",
      "width": 1200,
      "height": 630
    },
    "founder": {
      "@id": "https://www.anatoly-mook.de/#person"
    },
    "description": "Anatoly Mook steht für Klarheit statt Suche. Bewusstseinsarbeit, Coaching und Formate für Menschen, die Verantwortung übernehmen und ihr Leben konsequent gestalten wollen.",
    "sameAs": [
      "https://www.linkedin.com/in/anatolymook",
      "https://twitter.com/anatolymux",
      "https://www.facebook.com/anatolymux"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["Deutsch", "English", "Русский"]
    }
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.anatoly-mook.de/#person",
    "name": "Anatoly Mook",
    "alternateName": "Anatolij Mook",
    "url": "https://www.anatoly-mook.de",
    "image": {
      "@type": "ImageObject",
      "url": "https://www.anatoly-mook.de/bildschirmfoto_2025-12-10_um_20.44.33.png",
      "caption": "Anatoly Mook – Mentor für Klarheit, bewusste Führung und persönliche Meisterschaft"
    },
    "sameAs": [
      "https://www.linkedin.com/in/anatolymook",
      "https://twitter.com/anatolymux",
      "https://www.facebook.com/anatolymux"
    ],
    "jobTitle": "Mentor für Bewusstsein & persönliche Meisterschaft",
    "description": "Anatoly Mook steht für Klarheit statt Suche. Bewusstseinsarbeit, Coaching und Formate für Menschen, die Verantwortung übernehmen und ihr Leben konsequent gestalten wollen.",
    "knowsAbout": [
      "Bewusstseinsentwicklung",
      "Persönliche Meisterschaft",
      "Bewusste Führung",
      "Entscheidungsstärke",
      "Transformation",
      "Mentoring",
      "Executive Coaching",
      "Persönlichkeitsentwicklung"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Coach und Mentor für Bewusstsein & persönliche Meisterschaft",
      "occupationLocation": {
        "@type": "Country",
        "name": "Deutschland"
      }
    },
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "Deutsch",
        "alternateName": "de"
      },
      {
        "@type": "Language",
        "name": "Englisch",
        "alternateName": "en"
      },
      {
        "@type": "Language",
        "name": "Russisch",
        "alternateName": "ru"
      }
    ]
  };
}

export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.anatoly-mook.de/#service",
    "name": "Anatoly Mook Coaching & Mentoring",
    "url": "https://www.anatoly-mook.de",
    "description": "Coaching, Mentoring und Seminare für Bewusstseinsentwicklung, persönliche Meisterschaft und bewusste Führung",
    "provider": {
      "@id": "https://www.anatoly-mook.de/#person"
    },
    "serviceType": [
      "Executive Coaching",
      "Personal Mentoring",
      "Bewusstseinsseminare",
      "Führungskräfteentwicklung",
      "Persönliche Transformation",
      "Corporate Training",
      "Keynote Speaking"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "Deutschland"
      },
      {
        "@type": "Country",
        "name": "Österreich"
      },
      {
        "@type": "Country",
        "name": "Schweiz"
      }
    ],
    "availableLanguage": ["de", "en", "ru"]
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.anatoly-mook.de/#website",
    "url": "https://www.anatoly-mook.de",
    "name": "Anatoly Mook – Klarheit, bewusste Führung & persönliche Meisterschaft",
    "description": "Anatoly Mook steht für Klarheit statt Suche. Bewusstseinsarbeit, Coaching und Formate für Menschen, die Verantwortung übernehmen und ihr Leben konsequent gestalten wollen.",
    "publisher": {
      "@id": "https://www.anatoly-mook.de/#organization"
    },
    "inLanguage": ["de-DE", "en-US", "ru-RU"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.anatoly-mook.de/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image || "https://www.anatoly-mook.de/bildschirmfoto_2025-12-10_um_20.44.33.png",
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@id": "https://www.anatoly-mook.de/#person"
    },
    "publisher": {
      "@id": "https://www.anatoly-mook.de/#organization"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.anatoly-mook.de"
    }
  };
}

export function generateCourseSchema(course: {
  name: string;
  description: string;
  provider: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "provider": {
      "@id": "https://www.anatoly-mook.de/#organization"
    }
  };
}

export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate || event.startDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "location": event.location ? {
      "@type": "Place",
      "name": event.location
    } : undefined,
    "organizer": {
      "@id": "https://www.anatoly-mook.de/#organization"
    },
    "performer": {
      "@id": "https://www.anatoly-mook.de/#person"
    }
  };
}
