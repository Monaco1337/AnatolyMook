export interface RouteEntry {
  path: string;
  type: 'main' | 'city-service' | 'city-overview' | 'topic' | 'glossary' | 'faq' | 'testimonial';
  lang: 'de' | 'en' | 'ru';
  title: { de: string; en: string; ru: string };
  description: { de: string; en: string; ru: string };
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly';
  params?: Record<string, string>;
}

const BASE_URL = 'https://www.anatoly-mook.de';

const mainRoutesDe: Array<{ path: string; section: string; titleDe: string; titleEn: string; titleRu: string; descDe: string; descEn: string; descRu: string; priority: number }> = [
  { path: '/', section: 'home', titleDe: 'Anatoly Mook – Klarheit, bewusste Führung & persönliche Meisterschaft', titleEn: 'Anatoly Mook – Clarity, Conscious Leadership & Personal Mastery', titleRu: 'Анатолий Мук – Ясность, осознанное лидерство и личное мастерство', descDe: 'Bewusstseinsarbeit, Coaching und Formate für Menschen, die Verantwortung übernehmen und ihr Leben konsequent gestalten wollen.', descEn: 'Consciousness work, coaching and formats for people who take responsibility and want to shape their lives consistently.', descRu: 'Работа с сознанием, коучинг и форматы для людей, которые берут ответственность и последовательно формируют свою жизнь.', priority: 1.0 },
  { path: '/about', section: 'about', titleDe: 'Über Anatoly Mook – Methode & Philosophie', titleEn: 'About Anatoly Mook – Method & Philosophy', titleRu: 'Об Анатолии Муке – Метод и философия', descDe: 'Erfahren Sie mehr über Anatoly Mooks Ansatz, seine Methode und die Philosophie hinter Klarheit und bewusster Führung.', descEn: 'Learn more about Anatoly Mook\'s approach, his method and the philosophy behind clarity and conscious leadership.', descRu: 'Узнайте больше о подходе Анатолия Мука, его методе и философии ясности и осознанного лидерства.', priority: 0.9 },
  { path: '/seminare', section: 'seminare', titleDe: 'Seminare & Workshops – Anatoly Mook', titleEn: 'Seminars & Workshops – Anatoly Mook', titleRu: 'Семинары и воркшопы – Анатолий Мук', descDe: 'Intensive Seminare und Workshops für Bewusstseinsentwicklung, persönliche Meisterschaft und bewusste Führung.', descEn: 'Intensive seminars and workshops for consciousness development, personal mastery and conscious leadership.', descRu: 'Интенсивные семинары и воркшопы для развития сознания, личного мастерства и осознанного лидерства.', priority: 0.9 },
  { path: '/coaching', section: 'coaching', titleDe: '1:1 Coaching & Mentoring – Anatoly Mook', titleEn: '1:1 Coaching & Mentoring – Anatoly Mook', titleRu: 'Индивидуальный коучинг – Анатолий Мук', descDe: 'Individuelles Coaching und Mentoring für Klarheit, Entscheidungsstärke und nachhaltige Transformation.', descEn: 'Individual coaching and mentoring for clarity, decision-making strength and sustainable transformation.', descRu: 'Индивидуальный коучинг и менторинг для ясности, силы принятия решений и устойчивой трансформации.', priority: 0.9 },
  { path: '/keynotes', section: 'keynotes', titleDe: 'Keynote-Vorträge – Anatoly Mook', titleEn: 'Keynote Speaking – Anatoly Mook', titleRu: 'Ки-ноуты – Анатолий Мук', descDe: 'Inspirierende Keynote-Vorträge zu Klarheit, Bewusstsein und persönlicher Meisterschaft für Ihr Event.', descEn: 'Inspiring keynote speeches on clarity, consciousness and personal mastery for your event.', descRu: 'Вдохновляющие ки-ноуты о ясности, сознании и личном мастерстве для вашего мероприятия.', priority: 0.8 },
  { path: '/events', section: 'events', titleDe: 'Events & Veranstaltungen – Anatoly Mook', titleEn: 'Events – Anatoly Mook', titleRu: 'Мероприятия – Анатолий Мук', descDe: 'Aktuelle Events, Veranstaltungen und Termine von Anatoly Mook.', descEn: 'Current events and dates from Anatoly Mook.', descRu: 'Актуальные мероприятия и даты Анатолия Мука.', priority: 0.7 },
  { path: '/corporate', section: 'corporate', titleDe: 'Corporate-Programme – Anatoly Mook', titleEn: 'Corporate Programs – Anatoly Mook', titleRu: 'Корпоративные программы – Анатолий Мук', descDe: 'Führungskräfteentwicklung und Organisationstransformation durch bewusste Führung für Unternehmen.', descEn: 'Leadership development and organizational transformation through conscious leadership for companies.', descRu: 'Развитие руководителей и организационная трансформация через осознанное лидерство.', priority: 0.8 },
  { path: '/transformation', section: 'transformation', titleDe: 'Transformation – Anatoly Mook', titleEn: 'Transformation – Anatoly Mook', titleRu: 'Трансформация – Анатолий Мук', descDe: 'Der Weg zur persönlichen Transformation: Bewusstseinsentwicklung und nachhaltige Veränderung.', descEn: 'The path to personal transformation: consciousness development and sustainable change.', descRu: 'Путь к личной трансформации: развитие сознания и устойчивые изменения.', priority: 0.8 },
  { path: '/blog', section: 'blog', titleDe: 'Blog – Insights & Perspektiven von Anatoly Mook', titleEn: 'Blog – Insights & Perspectives by Anatoly Mook', titleRu: 'Блог – Инсайты Анатолия Мука', descDe: 'Artikel, Insights und Perspektiven zu Bewusstsein, Führung und persönlicher Meisterschaft.', descEn: 'Articles, insights and perspectives on consciousness, leadership and personal mastery.', descRu: 'Статьи, инсайты и перспективы о сознании, лидерстве и личном мастерстве.', priority: 0.7 },
  { path: '/produkte', section: 'produkte', titleDe: 'Shop – Digitale Produkte & Kurse', titleEn: 'Shop – Digital Products & Courses', titleRu: 'Магазин – Цифровые продукты и курсы', descDe: 'Digitale Produkte, Online-Kurse und Materialien für persönliche Meisterschaft und bewusste Führung.', descEn: 'Digital products, online courses and materials for personal mastery and conscious leadership.', descRu: 'Цифровые продукты, онлайн-курсы и материалы для личного мастерства и осознанного лидерства.', priority: 0.7 },
  { path: '/resources', section: 'resources', titleDe: 'Ressourcen & Downloads – Anatoly Mook', titleEn: 'Resources & Downloads – Anatoly Mook', titleRu: 'Ресурсы и загрузки – Анатолий Мук', descDe: 'Kostenlose Ressourcen, Guides und Downloads für Ihre persönliche Entwicklung.', descEn: 'Free resources, guides and downloads for your personal development.', descRu: 'Бесплатные ресурсы, руководства и загрузки для вашего развития.', priority: 0.6 },
  { path: '/faq', section: 'faq', titleDe: 'Häufige Fragen (FAQ) – Anatoly Mook', titleEn: 'FAQ – Anatoly Mook', titleRu: 'Частые вопросы – Анатолий Мук', descDe: 'Antworten auf häufig gestellte Fragen zu Coaching, Seminaren, Corporate-Programmen und Buchung.', descEn: 'Answers to frequently asked questions about coaching, seminars, corporate programs and booking.', descRu: 'Ответы на часто задаваемые вопросы о коучинге, семинарах и бронировании.', priority: 0.6 },
  { path: '/kontakt', section: 'kontakt', titleDe: 'Kontakt – Anatoly Mook', titleEn: 'Contact – Anatoly Mook', titleRu: 'Контакт – Анатолий Мук', descDe: 'Nehmen Sie Kontakt mit Anatoly Mook auf. Anfragen zu Coaching, Seminaren und Keynotes.', descEn: 'Get in touch with Anatoly Mook. Inquiries about coaching, seminars and keynotes.', descRu: 'Свяжитесь с Анатолием Муком. Запросы о коучинге, семинарах и ки-ноутах.', priority: 0.6 },
  { path: '/booking', section: 'booking', titleDe: 'Termin buchen – Anatoly Mook', titleEn: 'Book Appointment – Anatoly Mook', titleRu: 'Записаться – Анатолий Мук', descDe: 'Buchen Sie Ihren Termin für Coaching, Seminare oder ein Erstgespräch mit Anatoly Mook.', descEn: 'Book your appointment for coaching, seminars or an initial consultation with Anatoly Mook.', descRu: 'Забронируйте встречу для коучинга, семинара или первой консультации с Анатолием Муком.', priority: 0.7 },
  { path: '/quiz', section: 'quiz', titleDe: 'Bewusstseins-Quiz – Anatoly Mook', titleEn: 'Consciousness Quiz – Anatoly Mook', titleRu: 'Тест сознания – Анатолий Мук', descDe: 'Testen Sie Ihr Bewusstseinsniveau mit dem interaktiven Quiz von Anatoly Mook.', descEn: 'Test your consciousness level with the interactive quiz by Anatoly Mook.', descRu: 'Проверьте ваш уровень сознания с интерактивным тестом Анатолия Мука.', priority: 0.5 },
  { path: '/impressum', section: 'impressum', titleDe: 'Impressum – Anatoly Mook', titleEn: 'Legal Notice – Anatoly Mook', titleRu: 'Правовая информация – Анатолий Мук', descDe: 'Impressum und rechtliche Informationen zur Website www.anatoly-mook.de.', descEn: 'Legal notice and information for www.anatoly-mook.de.', descRu: 'Правовая информация сайта www.anatoly-mook.de.', priority: 0.3 },
  { path: '/datenschutz', section: 'datenschutz', titleDe: 'Datenschutz – Anatoly Mook', titleEn: 'Privacy Policy – Anatoly Mook', titleRu: 'Политика конфиденциальности – Анатолий Мук', descDe: 'Datenschutzerklärung und Informationen zum Umgang mit personenbezogenen Daten.', descEn: 'Privacy policy and information on the handling of personal data.', descRu: 'Политика конфиденциальности и информация об обработке персональных данных.', priority: 0.3 },
];

const services = ['seminare', 'coaching', 'keynotes', 'corporate', 'transformation', 'resources', 'booking'] as const;

const serviceMetaDe: Record<string, { label: string; desc: string }> = {
  seminare: { label: 'Seminare & Workshops', desc: 'Intensive Seminare und Workshops für Bewusstseinsentwicklung und persönliche Meisterschaft' },
  coaching: { label: 'Coaching & Mentoring', desc: 'Individuelles Coaching und Mentoring für Klarheit und Entscheidungsstärke' },
  keynotes: { label: 'Keynote-Vorträge', desc: 'Inspirierende Impulsvorträge zu Klarheit, Bewusstsein und bewusster Führung' },
  corporate: { label: 'Corporate-Programme', desc: 'Führungskräfteentwicklung und Organisationstransformation für Unternehmen' },
  transformation: { label: 'Transformation', desc: 'Persönliche Transformation und nachhaltige Veränderung' },
  resources: { label: 'Ressourcen', desc: 'Materialien und Guides für persönliche Entwicklung' },
  booking: { label: 'Termin buchen', desc: 'Termin für Coaching, Seminare oder Erstgespräch buchen' },
};

const serviceMetaEn: Record<string, { label: string; desc: string }> = {
  seminare: { label: 'Seminars & Workshops', desc: 'Intensive seminars and workshops for consciousness development and personal mastery' },
  coaching: { label: 'Coaching & Mentoring', desc: 'Individual coaching and mentoring for clarity and decision-making strength' },
  keynotes: { label: 'Keynote Speaking', desc: 'Inspiring keynote speeches on clarity, consciousness and conscious leadership' },
  corporate: { label: 'Corporate Programs', desc: 'Leadership development and organizational transformation for companies' },
  transformation: { label: 'Transformation', desc: 'Personal transformation and sustainable change' },
  resources: { label: 'Resources', desc: 'Materials and guides for personal development' },
  booking: { label: 'Book Appointment', desc: 'Book an appointment for coaching, seminars or initial consultation' },
};

const serviceMetaRu: Record<string, { label: string; desc: string }> = {
  seminare: { label: 'Семинары и воркшопы', desc: 'Интенсивные семинары для развития сознания и личного мастерства' },
  coaching: { label: 'Коучинг и менторинг', desc: 'Индивидуальный коучинг для ясности и силы принятия решений' },
  keynotes: { label: 'Ки-ноуты', desc: 'Вдохновляющие доклады о ясности, сознании и осознанном лидерстве' },
  corporate: { label: 'Корпоративные программы', desc: 'Развитие руководителей и организационная трансформация' },
  transformation: { label: 'Трансформация', desc: 'Личная трансформация и устойчивые изменения' },
  resources: { label: 'Ресурсы', desc: 'Материалы и руководства для личного развития' },
  booking: { label: 'Записаться', desc: 'Забронировать встречу для коучинга или семинара' },
};

export function getMainRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [];

  for (const r of mainRoutesDe) {
    routes.push({
      path: r.path,
      type: 'main',
      lang: 'de',
      title: { de: r.titleDe, en: r.titleEn, ru: r.titleRu },
      description: { de: r.descDe, en: r.descEn, ru: r.descRu },
      priority: r.priority,
      changefreq: r.priority >= 0.8 ? 'weekly' : 'monthly',
      params: { section: r.section }
    });

    if (!['/', '/impressum', '/datenschutz'].includes(r.path)) {
      routes.push({
        path: `/en${r.path}`,
        type: 'main',
        lang: 'en',
        title: { de: r.titleDe, en: r.titleEn, ru: r.titleRu },
        description: { de: r.descDe, en: r.descEn, ru: r.descRu },
        priority: r.priority * 0.9,
        changefreq: 'monthly',
        params: { section: r.section }
      });
      routes.push({
        path: `/ru${r.path}`,
        type: 'main',
        lang: 'ru',
        title: { de: r.titleDe, en: r.titleEn, ru: r.titleRu },
        description: { de: r.descDe, en: r.descEn, ru: r.descRu },
        priority: r.priority * 0.8,
        changefreq: 'monthly',
        params: { section: r.section }
      });
    }
  }
  return routes;
}

export function getCityServiceRoutes(cities: Array<{ slug: string; city: string }>): RouteEntry[] {
  const routes: RouteEntry[] = [];

  for (const city of cities) {
    for (const svc of services) {
      const mDe = serviceMetaDe[svc];
      const mEn = serviceMetaEn[svc];
      const mRu = serviceMetaRu[svc];

      routes.push({
        path: `/${svc}/${city.slug}`,
        type: 'city-service',
        lang: 'de',
        title: { de: `${mDe.label} in ${city.city} – Anatoly Mook`, en: `${mEn.label} in ${city.city} – Anatoly Mook`, ru: `${mRu.label} в ${city.city} – Анатолий Мук` },
        description: { de: `${mDe.desc} in ${city.city}. Jetzt Termin bei Anatoly Mook vereinbaren.`, en: `${mEn.desc} in ${city.city}. Book now with Anatoly Mook.`, ru: `${mRu.desc} в ${city.city}. Записаться к Анатолию Муку.` },
        priority: 0.6,
        changefreq: 'monthly',
        params: { service: svc, city: city.slug, cityName: city.city }
      });

      routes.push({
        path: `/en/${svc}/${city.slug}`,
        type: 'city-service',
        lang: 'en',
        title: { de: `${mDe.label} in ${city.city} – Anatoly Mook`, en: `${mEn.label} in ${city.city} – Anatoly Mook`, ru: `${mRu.label} в ${city.city} – Анатолий Мук` },
        description: { de: `${mDe.desc} in ${city.city}.`, en: `${mEn.desc} in ${city.city}. Book now with Anatoly Mook.`, ru: `${mRu.desc} в ${city.city}.` },
        priority: 0.5,
        changefreq: 'monthly',
        params: { service: svc, city: city.slug, cityName: city.city }
      });

      routes.push({
        path: `/ru/${svc}/${city.slug}`,
        type: 'city-service',
        lang: 'ru',
        title: { de: `${mDe.label} in ${city.city}`, en: `${mEn.label} in ${city.city}`, ru: `${mRu.label} в ${city.city} – Анатолий Мук` },
        description: { de: `${mDe.desc} in ${city.city}.`, en: `${mEn.desc} in ${city.city}.`, ru: `${mRu.desc} в ${city.city}. Записаться к Анатолию Муку.` },
        priority: 0.4,
        changefreq: 'monthly',
        params: { service: svc, city: city.slug, cityName: city.city }
      });
    }

    routes.push({
      path: `/${city.slug}`,
      type: 'city-overview',
      lang: 'de',
      title: { de: `Anatoly Mook in ${city.city} – Coaching, Seminare & Keynotes`, en: `Anatoly Mook in ${city.city} – Coaching, Seminars & Keynotes`, ru: `Анатолий Мук в ${city.city}` },
      description: { de: `Alle Angebote von Anatoly Mook in ${city.city}: Coaching, Seminare, Corporate-Programme und Keynotes.`, en: `All offerings by Anatoly Mook in ${city.city}: coaching, seminars, corporate programs and keynotes.`, ru: `Все предложения Анатолия Мука в ${city.city}.` },
      priority: 0.5,
      changefreq: 'monthly',
      params: { city: city.slug, cityName: city.city }
    });
  }

  return routes;
}

export function getTopicRoutes(topics: Array<{ slug: string; title: { de: string; en: string; ru: string }; description: { de: string; en: string; ru: string } }>): RouteEntry[] {
  const routes: RouteEntry[] = [];
  for (const topic of topics) {
    routes.push({ path: `/thema/${topic.slug}`, type: 'topic', lang: 'de', title: topic.title, description: topic.description, priority: 0.6, changefreq: 'monthly', params: { topic: topic.slug } });
    routes.push({ path: `/en/topic/${topic.slug}`, type: 'topic', lang: 'en', title: topic.title, description: topic.description, priority: 0.5, changefreq: 'monthly', params: { topic: topic.slug } });
    routes.push({ path: `/ru/tema/${topic.slug}`, type: 'topic', lang: 'ru', title: topic.title, description: topic.description, priority: 0.4, changefreq: 'monthly', params: { topic: topic.slug } });
  }
  return routes;
}

export function getGlossaryRoutes(terms: Array<{ slug: string; term: { de: string; en: string; ru: string }; definition: { de: string; en: string; ru: string } }>): RouteEntry[] {
  const routes: RouteEntry[] = [];
  for (const t of terms) {
    routes.push({ path: `/glossar/${t.slug}`, type: 'glossary', lang: 'de', title: { de: `${t.term.de} – Glossar | Anatoly Mook`, en: `${t.term.en} – Glossary`, ru: `${t.term.ru} – Глоссарий` }, description: { de: t.definition.de.substring(0, 155), en: t.definition.en.substring(0, 155), ru: t.definition.ru.substring(0, 155) }, priority: 0.4, changefreq: 'monthly', params: { term: t.slug } });
    routes.push({ path: `/en/glossary/${t.slug}`, type: 'glossary', lang: 'en', title: { de: `${t.term.de} – Glossar`, en: `${t.term.en} – Glossary | Anatoly Mook`, ru: `${t.term.ru} – Глоссарий` }, description: { de: t.definition.de.substring(0, 155), en: t.definition.en.substring(0, 155), ru: t.definition.ru.substring(0, 155) }, priority: 0.3, changefreq: 'monthly', params: { term: t.slug } });
    routes.push({ path: `/ru/glossarij/${t.slug}`, type: 'glossary', lang: 'ru', title: { de: `${t.term.de}`, en: `${t.term.en}`, ru: `${t.term.ru} – Глоссарий | Анатолий Мук` }, description: { de: t.definition.de.substring(0, 155), en: t.definition.en.substring(0, 155), ru: t.definition.ru.substring(0, 155) }, priority: 0.3, changefreq: 'monthly', params: { term: t.slug } });
  }
  return routes;
}

export function getFaqRoutes(faqs: Array<{ slug: string; question: { de: string; en: string; ru: string }; answer: { de: string; en: string; ru: string } }>): RouteEntry[] {
  const routes: RouteEntry[] = [];
  for (const faq of faqs) {
    routes.push({ path: `/faq/${faq.slug}`, type: 'faq', lang: 'de', title: { de: `${faq.question.de} | Anatoly Mook`, en: faq.question.en, ru: faq.question.ru }, description: { de: faq.answer.de.substring(0, 155), en: faq.answer.en.substring(0, 155), ru: faq.answer.ru.substring(0, 155) }, priority: 0.4, changefreq: 'monthly', params: { faq: faq.slug } });
    routes.push({ path: `/en/faq/${faq.slug}`, type: 'faq', lang: 'en', title: { de: faq.question.de, en: `${faq.question.en} | Anatoly Mook`, ru: faq.question.ru }, description: { de: faq.answer.de.substring(0, 155), en: faq.answer.en.substring(0, 155), ru: faq.answer.ru.substring(0, 155) }, priority: 0.3, changefreq: 'monthly', params: { faq: faq.slug } });
  }
  return routes;
}

export function getTestimonialRoutes(testimonials: Array<{ slug: string; name: string; role: string }>): RouteEntry[] {
  return testimonials.map(t => ({
    path: `/erfolgsgeschichte/${t.slug}`,
    type: 'testimonial' as const,
    lang: 'de' as const,
    title: { de: `${t.name} – Erfolgsgeschichte | Anatoly Mook`, en: `${t.name} – Success Story | Anatoly Mook`, ru: `${t.name} – История успеха | Анатолий Мук` },
    description: { de: `Erfahren Sie, wie ${t.name} (${t.role}) durch die Zusammenarbeit mit Anatoly Mook nachhaltige Veränderung erlebt hat.`, en: `Discover how ${t.name} (${t.role}) experienced sustainable change through working with Anatoly Mook.`, ru: `Узнайте, как ${t.name} (${t.role}) испытал устойчивые изменения благодаря работе с Анатолием Муком.` },
    priority: 0.4,
    changefreq: 'monthly' as const,
    params: { testimonial: t.slug }
  }));
}

export function getAllRoutes(data: {
  cities: Array<{ slug: string; city: string }>;
  topics: Array<{ slug: string; title: { de: string; en: string; ru: string }; description: { de: string; en: string; ru: string } }>;
  glossary: Array<{ slug: string; term: { de: string; en: string; ru: string }; definition: { de: string; en: string; ru: string } }>;
  faqs: Array<{ slug: string; question: { de: string; en: string; ru: string }; answer: { de: string; en: string; ru: string } }>;
  testimonials: Array<{ slug: string; name: string; role: string }>;
}): RouteEntry[] {
  return [
    ...getMainRoutes(),
    ...getCityServiceRoutes(data.cities),
    ...getTopicRoutes(data.topics),
    ...getGlossaryRoutes(data.glossary),
    ...getFaqRoutes(data.faqs),
    ...getTestimonialRoutes(data.testimonials),
  ];
}

export function getRouteUrl(route: RouteEntry): string {
  return `${BASE_URL}${route.path}`;
}

export function getAlternateUrls(route: RouteEntry): Array<{ hreflang: string; href: string }> {
  const basePath = route.path.replace(/^\/(en|ru)/, '');
  return [
    { hreflang: 'x-default', href: `${BASE_URL}${basePath}` },
    { hreflang: 'de', href: `${BASE_URL}${basePath}` },
    { hreflang: 'en', href: `${BASE_URL}/en${basePath}` },
    { hreflang: 'ru', href: `${BASE_URL}/ru${basePath}` },
  ];
}
