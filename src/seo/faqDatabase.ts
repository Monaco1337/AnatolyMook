export interface FAQEntry {
  slug: string;
  question: { de: string; en: string; ru: string };
  answer: { de: string; en: string; ru: string };
  category: string;
  relatedServices: string[];
  relatedFaqs: string[];
}

export const faqEntries: FAQEntry[] = [
  {
    slug: "wer-ist-anatoly-mook",
    question: { de: "Wer ist Anatoly Mook?", en: "Who is Anatoly Mook?", ru: "Кто такой Анатолий Мук?" },
    answer: {
      de: "Anatoly Mook ist Mentor für Klarheit, bewusste Führung und persönliche Meisterschaft. Er begleitet Führungskräfte, Unternehmer und Menschen in Verantwortung dabei, Klarheit in komplexen Situationen zu finden und bewusste Entscheidungen zu treffen. Mit Sitz in Unna (NRW) arbeitet er sowohl vor Ort als auch online im gesamten DACH-Raum und international.",
      en: "Anatoly Mook is a mentor for clarity, conscious leadership, and personal mastery. He guides executives, entrepreneurs, and people in positions of responsibility to find clarity in complex situations and make conscious decisions. Based in Unna (NRW, Germany), he works both on-site and online throughout the DACH region and internationally.",
      ru: "Анатолий Мук — ментор в области ясности, осознанного лидерства и личного мастерства. Он сопровождает руководителей, предпринимателей и людей на ответственных позициях в обретении ясности в сложных ситуациях. Базируясь в Унне (Германия), он работает очно и онлайн по всей Европе и за её пределами."
    },
    category: "allgemein",
    relatedServices: ["coaching", "seminare"],
    relatedFaqs: ["was-ist-bewusste-fuehrung", "fuer-wen-ist-das-angebot"]
  },
  {
    slug: "was-ist-bewusste-fuehrung",
    question: { de: "Was bedeutet bewusste Führung?", en: "What does conscious leadership mean?", ru: "Что означает осознанное лидерство?" },
    answer: {
      de: "Bewusste Führung bedeutet, Entscheidungen nicht aus Reaktion, Gewohnheit oder Druck zu treffen, sondern aus Klarheit und Selbstkenntnis. Es geht darum, die eigenen Muster zu erkennen, authentisch zu handeln und andere durch Präsenz statt Kontrolle zu inspirieren. Anatoly Mook vermittelt konkrete Werkzeuge, um diese Art der Führung im Alltag zu leben.",
      en: "Conscious leadership means making decisions not from reaction, habit, or pressure, but from clarity and self-knowledge. It is about recognizing your own patterns, acting authentically, and inspiring others through presence rather than control. Anatoly Mook teaches practical tools to live this kind of leadership in everyday life.",
      ru: "Осознанное лидерство означает принятие решений не из реакции, привычки или давления, а из ясности и самопознания. Речь идёт о распознавании собственных паттернов, аутентичных действиях и вдохновении других через присутствие, а не контроль. Анатолий Мук передаёт конкретные инструменты для практики такого лидерства."
    },
    category: "allgemein",
    relatedServices: ["coaching", "corporate"],
    relatedFaqs: ["wer-ist-anatoly-mook", "was-unterscheidet-anatoly-mook"]
  },
  {
    slug: "fuer-wen-ist-das-angebot",
    question: { de: "Für wen sind die Angebote von Anatoly Mook?", en: "Who are Anatoly Mook's offerings for?", ru: "Для кого предназначены программы Анатолия Мука?" },
    answer: {
      de: "Die Angebote richten sich an Führungskräfte, Unternehmer, Selbstständige und Menschen in Verantwortung, die mehr Klarheit, Entscheidungsstärke und bewusste Lebensführung anstreben. Ob Geschäftsführer eines Mittelständlers, C-Level Executive oder jemand am Beginn einer persönlichen Transformation — entscheidend ist die Bereitschaft, sich ehrlich mit sich selbst auseinanderzusetzen.",
      en: "The offerings are designed for executives, entrepreneurs, self-employed professionals, and people in positions of responsibility who seek more clarity, decision-making strength, and conscious living. Whether you are a managing director, C-level executive, or someone at the beginning of a personal transformation — what matters is the willingness to honestly engage with yourself.",
      ru: "Программы предназначены для руководителей, предпринимателей, самозанятых и людей на ответственных позициях, стремящихся к большей ясности, силе принятия решений и осознанной жизни. Будь вы генеральный директор, топ-менеджер или человек в начале личной трансформации — важна готовность честно работать с собой."
    },
    category: "allgemein",
    relatedServices: ["coaching", "seminare", "corporate"],
    relatedFaqs: ["wer-ist-anatoly-mook", "wie-funktioniert-erstgespraech"]
  },
  {
    slug: "was-unterscheidet-anatoly-mook",
    question: { de: "Was unterscheidet Anatoly Mook von anderen Coaches?", en: "What sets Anatoly Mook apart from other coaches?", ru: "Чем Анатолий Мук отличается от других коучей?" },
    answer: {
      de: "Anatoly Mook verbindet tiefgreifende Bewusstseinsarbeit mit pragmatischen, messbaren Ergebnissen. Es geht nicht um Motivation oder Tipps, sondern um echte Transformation auf der Ebene von Wahrnehmung und Identität. Sein Ansatz ist direkt, klar und frei von esoterischem Beiwerk. Klienten schätzen besonders die Verbindung aus Tiefe und Umsetzbarkeit.",
      en: "Anatoly Mook combines deep consciousness work with pragmatic, measurable results. It is not about motivation or tips, but about genuine transformation at the level of perception and identity. His approach is direct, clear, and free from esoteric accessories. Clients especially value the combination of depth and practical applicability.",
      ru: "Анатолий Мук сочетает глубокую работу с сознанием и прагматичные, измеримые результаты. Речь не о мотивации или советах, а о настоящей трансформации на уровне восприятия и идентичности. Его подход прямой, ясный и свободный от эзотерики. Клиенты особенно ценят сочетание глубины и практической применимости."
    },
    category: "allgemein",
    relatedServices: ["coaching"],
    relatedFaqs: ["wer-ist-anatoly-mook", "welche-ergebnisse-kann-ich-erwarten"]
  },
  {
    slug: "wie-funktioniert-coaching",
    question: { de: "Wie funktioniert das 1:1 Coaching?", en: "How does 1:1 coaching work?", ru: "Как работает индивидуальный коучинг?" },
    answer: {
      de: "Das 1:1 Coaching beginnt mit einem ausführlichen Erstgespräch, in dem Ihre aktuelle Situation, Ziele und Herausforderungen erfasst werden. Darauf basierend entwickeln wir einen individuellen Begleitprozess. Die Sessions finden in der Regel alle zwei bis vier Wochen statt, wahlweise vor Ort in Unna oder online. Zwischen den Sessions erhalten Sie konkrete Übungen und Reflexionsaufgaben.",
      en: "The 1:1 coaching begins with a detailed initial consultation where your current situation, goals, and challenges are assessed. Based on this, we develop an individual accompaniment process. Sessions typically take place every two to four weeks, either on-site in Unna or online. Between sessions, you receive specific exercises and reflection tasks.",
      ru: "Индивидуальный коучинг начинается с подробной первичной консультации, где оцениваются ваша текущая ситуация, цели и вызовы. На этой основе разрабатывается индивидуальный процесс сопровождения. Сессии проходят каждые две-четыре недели, очно в Унне или онлайн. Между сессиями вы получаете конкретные упражнения и задания для рефлексии."
    },
    category: "coaching",
    relatedServices: ["coaching", "booking"],
    relatedFaqs: ["wie-lang-dauert-coaching", "online-oder-vor-ort"]
  },
  {
    slug: "wie-lang-dauert-coaching",
    question: { de: "Wie lange dauert ein Coaching-Prozess?", en: "How long does a coaching process take?", ru: "Сколько длится коучинг-процесс?" },
    answer: {
      de: "Ein typischer Coaching-Prozess umfasst 6 bis 12 Monate mit Sessions alle zwei bis vier Wochen. Für spezifische Themen kann auch ein kürzeres Intensivformat sinnvoll sein. Die Dauer hängt von der Tiefe der Veränderung ab, die Sie anstreben. In der Regel zeigen sich erste spürbare Veränderungen bereits nach den ersten drei Sessions.",
      en: "A typical coaching process spans 6 to 12 months with sessions every two to four weeks. For specific topics, a shorter intensive format may also be appropriate. The duration depends on the depth of change you are aiming for. Usually, first noticeable changes appear after the first three sessions.",
      ru: "Типичный коучинг-процесс длится от 6 до 12 месяцев с сессиями каждые две-четыре недели. Для конкретных тем подходит и более короткий интенсивный формат. Продолжительность зависит от глубины изменений, к которым вы стремитесь. Первые заметные изменения обычно появляются уже после первых трёх сессий."
    },
    category: "coaching",
    relatedServices: ["coaching"],
    relatedFaqs: ["wie-funktioniert-coaching", "was-kostet-coaching"]
  },
  {
    slug: "online-oder-vor-ort",
    question: { de: "Finden die Sessions online oder vor Ort statt?", en: "Do sessions take place online or in person?", ru: "Сессии проходят онлайн или очно?" },
    answer: {
      de: "Beides ist möglich. Coaching-Sessions und kleinere Formate finden sowohl in Unna (Ackerstraße 56) als auch online via Zoom statt. Seminare und Workshops werden meist als Präsenzveranstaltungen durchgeführt. Für internationale Klienten bieten wir vollständig digitale Begleitung an. Die Qualität der Arbeit ist in beiden Formaten gleich hoch.",
      en: "Both are possible. Coaching sessions and smaller formats take place both in Unna (Ackerstraße 56) and online via Zoom. Seminars and workshops are usually conducted as in-person events. For international clients, we offer fully digital accompaniment. The quality of work is equally high in both formats.",
      ru: "Возможны оба варианта. Коучинг-сессии проходят как в Унне (Ackerstraße 56), так и онлайн через Zoom. Семинары обычно проводятся очно. Для международных клиентов предлагаем полностью цифровое сопровождение. Качество работы одинаково высокое в обоих форматах."
    },
    category: "praktisch",
    relatedServices: ["coaching", "seminare"],
    relatedFaqs: ["wie-funktioniert-coaching", "wo-finden-seminare-statt"]
  },
  {
    slug: "wie-funktioniert-erstgespraech",
    question: { de: "Wie läuft ein Erstgespräch ab?", en: "How does an initial consultation work?", ru: "Как проходит первичная консультация?" },
    answer: {
      de: "Das kostenlose Erstgespräch dauert ca. 30 Minuten und dient dem gegenseitigen Kennenlernen. Wir besprechen Ihre aktuelle Situation, Ihre Ziele und ob eine Zusammenarbeit sinnvoll ist. Es gibt keinen Verkaufsdruck — es geht darum, zu prüfen, ob die Chemie stimmt und der Ansatz zu Ihnen passt. Buchen Sie einfach einen Termin über die Website.",
      en: "The free initial consultation lasts about 30 minutes and serves to get to know each other. We discuss your current situation, your goals, and whether a collaboration makes sense. There is no sales pressure — it is about checking whether the chemistry is right and the approach suits you. Simply book an appointment through the website.",
      ru: "Бесплатная первичная консультация длится около 30 минут и служит для знакомства. Мы обсуждаем вашу текущую ситуацию, цели и целесообразность сотрудничества. Никакого давления — важно проверить, подходит ли вам подход. Просто забронируйте встречу на сайте."
    },
    category: "praktisch",
    relatedServices: ["booking", "coaching"],
    relatedFaqs: ["was-kostet-coaching", "wie-funktioniert-coaching"]
  },
  {
    slug: "welche-seminare-gibt-es",
    question: { de: "Welche Seminare und Workshops bietet Anatoly Mook an?", en: "What seminars and workshops does Anatoly Mook offer?", ru: "Какие семинары предлагает Анатолий Мук?" },
    answer: {
      de: "Das Seminarangebot umfasst intensive Tages- und Wochenendseminare zu Themen wie Bewusstseinsentwicklung, bewusste Führung, Entscheidungsstärke und persönliche Transformation. Zudem gibt es spezielle Corporate-Workshops für Unternehmen und Führungsteams. Die Formate variieren von kompakten Halbtagesworkshops bis zu mehrtägigen Retreats.",
      en: "The seminar offerings include intensive day and weekend seminars on topics such as consciousness development, conscious leadership, decision-making strength, and personal transformation. There are also special corporate workshops for companies and leadership teams. Formats range from compact half-day workshops to multi-day retreats.",
      ru: "Программа семинаров включает интенсивные дневные и выходные семинары по темам развития сознания, осознанного лидерства, силы принятия решений и личной трансформации. Также проводятся специальные корпоративные воркшопы. Форматы варьируются от компактных полудневных до многодневных ретритов."
    },
    category: "seminare",
    relatedServices: ["seminare", "corporate"],
    relatedFaqs: ["wo-finden-seminare-statt", "wie-gross-sind-die-gruppen"]
  },
  {
    slug: "wo-finden-seminare-statt",
    question: { de: "Wo finden die Seminare statt?", en: "Where do seminars take place?", ru: "Где проходят семинары?" },
    answer: {
      de: "Seminare finden an verschiedenen Orten in Deutschland, Österreich und der Schweiz statt — oft in ausgewählten Hotels oder Seminarräumen mit inspirierender Atmosphäre. Unna dient als Homebase, aber regelmäßig werden Seminare auch in Berlin, München, Wien, Zürich und weiteren Städten angeboten. Die genauen Orte werden bei der Anmeldung bekanntgegeben.",
      en: "Seminars take place at various locations in Germany, Austria, and Switzerland — often in selected hotels or seminar rooms with an inspiring atmosphere. Unna serves as the home base, but seminars are regularly offered in Berlin, Munich, Vienna, Zurich, and other cities. Exact locations are announced upon registration.",
      ru: "Семинары проходят в различных городах Германии, Австрии и Швейцарии — часто в отобранных отелях или залах с вдохновляющей атмосферой. Унна — основная база, но семинары регулярно проводятся в Берлине, Мюнхене, Вене, Цюрихе и других городах. Точные места объявляются при регистрации."
    },
    category: "seminare",
    relatedServices: ["seminare"],
    relatedFaqs: ["welche-seminare-gibt-es", "wie-gross-sind-die-gruppen"]
  },
  {
    slug: "wie-gross-sind-die-gruppen",
    question: { de: "Wie groß sind die Seminargruppen?", en: "How large are the seminar groups?", ru: "Какого размера группы на семинарах?" },
    answer: {
      de: "Um eine hohe Qualität und individuelle Betreuung zu gewährleisten, sind die Gruppen bewusst klein gehalten. In der Regel nehmen 8 bis 16 Personen an einem Seminar teil. Bei Retreats sind es oft noch weniger. Corporate-Workshops werden individuell auf die Teamgröße angepasst.",
      en: "To ensure high quality and individual attention, groups are deliberately kept small. Typically, 8 to 16 people participate in a seminar. Retreats often have even fewer participants. Corporate workshops are individually tailored to team size.",
      ru: "Для обеспечения высокого качества и индивидуального внимания группы намеренно малые. Обычно в семинаре участвуют 8-16 человек. На ретритах часто ещё меньше. Корпоративные воркшопы адаптируются под размер команды."
    },
    category: "seminare",
    relatedServices: ["seminare"],
    relatedFaqs: ["welche-seminare-gibt-es", "was-kostet-ein-seminar"]
  },
  {
    slug: "was-kostet-coaching",
    question: { de: "Was kostet ein Coaching bei Anatoly Mook?", en: "How much does coaching with Anatoly Mook cost?", ru: "Сколько стоит коучинг у Анатолия Мука?" },
    answer: {
      de: "Die Investition für ein Coaching richtet sich nach Umfang und Dauer der Begleitung. Einzelsessions starten ab 350 Euro pro Stunde. Für längere Begleitprozesse gibt es Paketangebote, die individuell zusammengestellt werden. Im kostenlosen Erstgespräch erhalten Sie ein transparentes Angebot, das zu Ihrer Situation passt.",
      en: "The investment for coaching depends on the scope and duration of the accompaniment. Individual sessions start at 350 euros per hour. For longer accompaniment processes, there are package offers that are individually compiled. In the free initial consultation, you receive a transparent offer that fits your situation.",
      ru: "Инвестиция в коучинг зависит от объёма и продолжительности сопровождения. Отдельные сессии начинаются от 350 евро в час. Для длительных процессов есть пакетные предложения, составляемые индивидуально. На бесплатной первичной консультации вы получите прозрачное предложение."
    },
    category: "kosten",
    relatedServices: ["coaching", "booking"],
    relatedFaqs: ["wie-funktioniert-erstgespraech", "was-kostet-ein-seminar"]
  },
  {
    slug: "was-kostet-ein-seminar",
    question: { de: "Was kostet ein Seminar?", en: "How much does a seminar cost?", ru: "Сколько стоит семинар?" },
    answer: {
      de: "Die Seminarpreise variieren je nach Format und Dauer. Tagesworkshops beginnen ab 490 Euro pro Person, Wochenendseminare ab 990 Euro. Mehrtägige Intensivformate und Retreats liegen bei 1.500 bis 3.500 Euro. Frühbucher-Rabatte und Ratenzahlung sind möglich. Alle aktuellen Preise finden Sie auf der Events-Seite.",
      en: "Seminar prices vary depending on format and duration. Day workshops start at 490 euros per person, weekend seminars from 990 euros. Multi-day intensive formats and retreats range from 1,500 to 3,500 euros. Early bird discounts and installment payments are available. All current prices can be found on the events page.",
      ru: "Цены на семинары зависят от формата и продолжительности. Дневные воркшопы — от 490 евро, выходные семинары — от 990 евро. Многодневные интенсивы и ретриты — от 1500 до 3500 евро. Скидки за раннее бронирование и рассрочка доступны. Актуальные цены — на странице мероприятий."
    },
    category: "kosten",
    relatedServices: ["seminare", "booking"],
    relatedFaqs: ["was-kostet-coaching", "welche-seminare-gibt-es"]
  },
  {
    slug: "corporate-programme-details",
    question: { de: "Wie sehen die Corporate-Programme aus?", en: "What do corporate programs look like?", ru: "Как устроены корпоративные программы?" },
    answer: {
      de: "Corporate-Programme werden individuell auf die Bedürfnisse Ihres Unternehmens zugeschnitten. Sie können Führungskräfte-Coaching, Team-Workshops, Keynotes oder langfristige Transformationsbegleitung umfassen. Nach einem Briefing-Gespräch erstellen wir ein maßgeschneidertes Konzept. Typische Themen sind bewusste Führungskultur, Entscheidungsqualität und nachhaltige Teamentwicklung.",
      en: "Corporate programs are individually tailored to your organization's needs. They can include executive coaching, team workshops, keynotes, or long-term transformation accompaniment. After a briefing conversation, we create a customized concept. Typical topics include conscious leadership culture, decision quality, and sustainable team development.",
      ru: "Корпоративные программы индивидуально адаптируются под потребности организации. Они включают коучинг руководителей, командные воркшопы, ки-ноуты или долгосрочное трансформационное сопровождение. После брифинга создаётся индивидуальная концепция. Типичные темы: культура осознанного лидерства, качество решений, устойчивое развитие команд."
    },
    category: "corporate",
    relatedServices: ["corporate", "coaching"],
    relatedFaqs: ["corporate-roi", "keynote-buchen"]
  },
  {
    slug: "corporate-roi",
    question: { de: "Welchen ROI bringt ein Corporate-Programm?", en: "What ROI does a corporate program deliver?", ru: "Какой ROI приносит корпоративная программа?" },
    answer: {
      de: "Klienten berichten von messbaren Verbesserungen in Bereichen wie Entscheidungsgeschwindigkeit, Mitarbeiterzufriedenheit, Fluktuationsrate und Führungseffektivität. Typische Ergebnisse: 30-40% schnellere Entscheidungszyklen, signifikant höhere Teamkohäsion und verbesserte Unternehmenskultur. Der genaue ROI wird im Vorfeld gemeinsam definiert und im Prozess gemessen.",
      en: "Clients report measurable improvements in areas such as decision speed, employee satisfaction, turnover rate, and leadership effectiveness. Typical results: 30-40% faster decision cycles, significantly higher team cohesion, and improved corporate culture. The exact ROI is jointly defined in advance and measured throughout the process.",
      ru: "Клиенты отмечают измеримые улучшения в скорости принятия решений, удовлетворённости сотрудников, текучести кадров и эффективности лидерства. Типичные результаты: на 30-40% быстрее циклы решений, значительно выше сплочённость команды, улучшенная корпоративная культура. Точный ROI определяется заранее и измеряется в процессе."
    },
    category: "corporate",
    relatedServices: ["corporate"],
    relatedFaqs: ["corporate-programme-details", "welche-ergebnisse-kann-ich-erwarten"]
  },
  {
    slug: "keynote-buchen",
    question: { de: "Wie kann ich einen Keynote-Vortrag buchen?", en: "How can I book a keynote speech?", ru: "Как забронировать ки-ноут?" },
    answer: {
      de: "Keynote-Anfragen richten Sie bitte per E-Mail an mail@anatoly-mook.de oder über das Kontaktformular. Bitte nennen Sie Datum, Veranstaltungsort, erwartete Teilnehmerzahl und gewünschtes Thema. Keynotes dauern in der Regel 45 bis 90 Minuten und können durch interaktive Elemente ergänzt werden. Technische Anforderungen werden im Vorfeld abgestimmt.",
      en: "Please direct keynote inquiries via email to mail@anatoly-mook.de or through the contact form. Please include the date, venue, expected number of participants, and desired topic. Keynotes typically last 45 to 90 minutes and can be supplemented with interactive elements. Technical requirements are coordinated in advance.",
      ru: "Запросы на ки-ноуты направляйте на mail@anatoly-mook.de или через форму на сайте. Укажите дату, место, ожидаемое число участников и желаемую тему. Ки-ноуты длятся 45-90 минут и могут дополняться интерактивными элементами. Технические требования согласовываются заранее."
    },
    category: "keynotes",
    relatedServices: ["keynotes", "booking"],
    relatedFaqs: ["keynote-themen", "corporate-programme-details"]
  },
  {
    slug: "keynote-themen",
    question: { de: "Welche Keynote-Themen bietet Anatoly Mook?", en: "What keynote topics does Anatoly Mook offer?", ru: "Какие темы ки-ноутов предлагает Анатолий Мук?" },
    answer: {
      de: "Kernthemen sind: Bewusste Führung in Zeiten des Wandels, Klarheit als Wettbewerbsvorteil, Persönliche Meisterschaft für Entscheider, Die Kraft bewusster Entscheidungen, Transformation statt Optimierung, sowie maßgeschneiderte Themen nach Absprache. Jeder Vortrag verbindet tiefe Einsichten mit praktisch anwendbaren Impulsen.",
      en: "Core topics include: Conscious leadership in times of change, Clarity as a competitive advantage, Personal mastery for decision-makers, The power of conscious decisions, Transformation instead of optimization, and customized topics by arrangement. Every speech combines deep insights with practically applicable impulses.",
      ru: "Основные темы: Осознанное лидерство в эпоху перемен, Ясность как конкурентное преимущество, Личное мастерство для руководителей, Сила осознанных решений, Трансформация вместо оптимизации, а также индивидуальные темы. Каждый доклад сочетает глубокие инсайты с практическими импульсами."
    },
    category: "keynotes",
    relatedServices: ["keynotes"],
    relatedFaqs: ["keynote-buchen", "corporate-programme-details"]
  },
  {
    slug: "welche-ergebnisse-kann-ich-erwarten",
    question: { de: "Welche Ergebnisse kann ich erwarten?", en: "What results can I expect?", ru: "Каких результатов можно ожидать?" },
    answer: {
      de: "Die Ergebnisse variieren individuell, aber häufig berichten Klienten von: deutlich mehr Klarheit in komplexen Situationen, besserer Entscheidungsqualität, gestärkter Führungspräsenz, verbesserter Work-Life-Balance, tieferer Selbstkenntnis und nachhaltig verändertem Verhalten. Messbare Ergebnisse zeigen sich typischerweise innerhalb von 3-6 Monaten.",
      en: "Results vary individually, but clients frequently report: significantly more clarity in complex situations, better decision quality, strengthened leadership presence, improved work-life balance, deeper self-knowledge, and sustainably changed behavior. Measurable results typically appear within 3-6 months.",
      ru: "Результаты индивидуальны, но клиенты часто отмечают: значительно больше ясности в сложных ситуациях, лучшее качество решений, усиленное лидерское присутствие, улучшенный баланс работы и жизни, глубокое самопознание и устойчивые изменения поведения. Измеримые результаты обычно проявляются в течение 3-6 месяцев."
    },
    category: "ergebnisse",
    relatedServices: ["coaching", "seminare"],
    relatedFaqs: ["wie-lang-dauert-coaching", "was-unterscheidet-anatoly-mook"]
  },
  {
    slug: "ist-das-esoterisch",
    question: { de: "Ist Bewusstseinsarbeit esoterisch?", en: "Is consciousness work esoteric?", ru: "Работа с сознанием — это эзотерика?" },
    answer: {
      de: "Nein. Der Ansatz von Anatoly Mook ist pragmatisch, evidenzbasiert und frei von esoterischem Beiwerk. Bewusstseinsarbeit bedeutet hier: die eigenen Denk- und Verhaltensmuster zu erkennen, blinde Flecken aufzudecken und bewusstere Entscheidungen zu treffen. Die Methoden basieren auf Erkenntnissen aus Psychologie, Neurowissenschaft und Führungsforschung.",
      en: "No. Anatoly Mook's approach is pragmatic, evidence-based, and free from esoteric accessories. Consciousness work here means: recognizing your own thinking and behavioral patterns, uncovering blind spots, and making more conscious decisions. The methods are based on insights from psychology, neuroscience, and leadership research.",
      ru: "Нет. Подход Анатолия Мука прагматичен, основан на доказательствах и свободен от эзотерики. Работа с сознанием здесь означает: распознавание собственных паттернов мышления и поведения, выявление слепых зон и принятие более осознанных решений. Методы основаны на психологии, нейронауке и исследованиях лидерства."
    },
    category: "allgemein",
    relatedServices: ["coaching", "seminare"],
    relatedFaqs: ["was-ist-bewusste-fuehrung", "was-unterscheidet-anatoly-mook"]
  },
  {
    slug: "sprachen-der-begleitung",
    question: { de: "In welchen Sprachen wird gearbeitet?", en: "In which languages is coaching available?", ru: "На каких языках доступен коучинг?" },
    answer: {
      de: "Anatoly Mook arbeitet in Deutsch, Englisch und Russisch. Coaching, Seminare und Keynotes können in jeder dieser drei Sprachen durchgeführt werden. Bei Corporate-Programmen mit internationalen Teams ist auch ein mehrsprachiges Format möglich.",
      en: "Anatoly Mook works in German, English, and Russian. Coaching, seminars, and keynotes can be conducted in any of these three languages. For corporate programs with international teams, a multilingual format is also possible.",
      ru: "Анатолий Мук работает на немецком, английском и русском языках. Коучинг, семинары и ки-ноуты проводятся на любом из трёх языков. Для корпоративных программ с международными командами возможен мультиязычный формат."
    },
    category: "praktisch",
    relatedServices: ["coaching", "seminare", "keynotes"],
    relatedFaqs: ["online-oder-vor-ort", "fuer-wen-ist-das-angebot"]
  },
  {
    slug: "wie-buche-ich-einen-termin",
    question: { de: "Wie buche ich einen Termin?", en: "How do I book an appointment?", ru: "Как записаться на встречу?" },
    answer: {
      de: "Sie können einen Termin direkt über die Buchungsseite auf unserer Website vereinbaren, uns per E-Mail an mail@anatoly-mook.de kontaktieren oder telefonisch unter 02303 334 0628 anrufen. Für ein Erstgespräch wählen Sie einfach einen freien Slot im Online-Kalender.",
      en: "You can schedule an appointment directly through the booking page on our website, contact us via email at mail@anatoly-mook.de, or call 02303 334 0628. For an initial consultation, simply choose an available slot in the online calendar.",
      ru: "Записаться можно через страницу бронирования на сайте, по электронной почте mail@anatoly-mook.de или по телефону 02303 334 0628. Для первичной консультации выберите свободный слот в онлайн-календаре."
    },
    category: "praktisch",
    relatedServices: ["booking"],
    relatedFaqs: ["wie-funktioniert-erstgespraech", "was-kostet-coaching"]
  },
  {
    slug: "stornierung-und-umbuchung",
    question: { de: "Kann ich stornieren oder umbuchen?", en: "Can I cancel or reschedule?", ru: "Можно ли отменить или перенести?" },
    answer: {
      de: "Coaching-Sessions können bis 48 Stunden vorher kostenfrei umgebucht werden. Bei Seminaren gelten die jeweiligen Stornierungsbedingungen, in der Regel ist bis 14 Tage vor Beginn eine kostenlose Stornierung möglich. Danach wird eine Ausfallgebühr erhoben. Bei wichtigen Gründen finden wir gemeinsam eine Lösung.",
      en: "Coaching sessions can be rescheduled free of charge up to 48 hours in advance. For seminars, the respective cancellation conditions apply — generally, free cancellation is possible up to 14 days before the start. After that, a cancellation fee applies. For important reasons, we will find a solution together.",
      ru: "Коучинг-сессии можно перенести бесплатно за 48 часов. Для семинаров действуют соответствующие условия отмены — обычно бесплатная отмена возможна за 14 дней до начала. После этого взимается плата. При важных причинах найдём решение вместе."
    },
    category: "kosten",
    relatedServices: ["booking"],
    relatedFaqs: ["wie-buche-ich-einen-termin", "was-kostet-coaching"]
  },
  {
    slug: "vertraulichkeit",
    question: { de: "Wie steht es um die Vertraulichkeit?", en: "How is confidentiality handled?", ru: "Как обеспечивается конфиденциальность?" },
    answer: {
      de: "Absolute Vertraulichkeit ist selbstverständlich und Grundlage jeder Zusammenarbeit. Alle Inhalte der Sessions sind streng vertraulich. Bei Corporate-Aufträgen werden Vertraulichkeitsvereinbarungen geschlossen. Ergebnisse werden nur mit Ihrem ausdrücklichen Einverständnis an Dritte kommuniziert.",
      en: "Absolute confidentiality is a given and the foundation of every collaboration. All session contents are strictly confidential. For corporate assignments, confidentiality agreements are concluded. Results are only communicated to third parties with your explicit consent.",
      ru: "Абсолютная конфиденциальность — основа каждого сотрудничества. Все содержание сессий строго конфиденциально. При корпоративных заказах заключаются соглашения о конфиденциальности. Результаты передаются третьим лицам только с вашего явного согласия."
    },
    category: "allgemein",
    relatedServices: ["coaching", "corporate"],
    relatedFaqs: ["wie-funktioniert-coaching", "corporate-programme-details"]
  },
  {
    slug: "nachhaltige-veraenderung",
    question: { de: "Wie nachhaltig sind die Ergebnisse?", en: "How sustainable are the results?", ru: "Насколько устойчивы результаты?" },
    answer: {
      de: "Der Ansatz zielt auf tiefgreifende Veränderung auf der Ebene von Bewusstsein und Identität, nicht nur auf Verhaltensanpassung. Deshalb sind die Ergebnisse besonders nachhaltig. Klienten berichten, dass die gewonnene Klarheit und Bewusstheit auch Jahre nach der Zusammenarbeit wirkt und sich weiterentwickelt.",
      en: "The approach aims at profound change at the level of consciousness and identity, not just behavioral adjustment. Therefore, the results are particularly sustainable. Clients report that the clarity and awareness gained continues to work and develop even years after the collaboration.",
      ru: "Подход направлен на глубокие изменения на уровне сознания и идентичности, а не просто коррекцию поведения. Поэтому результаты особенно устойчивы. Клиенты отмечают, что обретённая ясность и осознанность продолжают работать и развиваться даже спустя годы."
    },
    category: "ergebnisse",
    relatedServices: ["coaching", "seminare"],
    relatedFaqs: ["welche-ergebnisse-kann-ich-erwarten", "wie-lang-dauert-coaching"]
  },
  {
    slug: "vorbereitung-auf-seminar",
    question: { de: "Wie bereite ich mich auf ein Seminar vor?", en: "How do I prepare for a seminar?", ru: "Как подготовиться к семинару?" },
    answer: {
      de: "Nach der Anmeldung erhalten Sie eine Vorbereitungsmail mit konkreten Reflexionsfragen und Hinweisen. Grundsätzlich ist es hilfreich, sich ein bis zwei persönliche Fragen oder Themen mitzunehmen. Bitte planen Sie auch ausreichend An- und Abreisetag ein, um das Seminar in Ruhe wirken zu lassen.",
      en: "After registration, you will receive a preparation email with specific reflection questions and guidance. Generally, it is helpful to bring one or two personal questions or topics. Please also plan sufficient arrival and departure days to let the seminar take effect in peace.",
      ru: "После регистрации вы получите письмо с рефлексивными вопросами и рекомендациями по подготовке. Полезно иметь один-два личных вопроса или темы. Также планируйте достаточно времени на приезд и отъезд, чтобы семинар мог подействовать."
    },
    category: "seminare",
    relatedServices: ["seminare"],
    relatedFaqs: ["welche-seminare-gibt-es", "wo-finden-seminare-statt"]
  },
  {
    slug: "unterschied-coaching-mentoring",
    question: { de: "Was ist der Unterschied zwischen Coaching und Mentoring?", en: "What is the difference between coaching and mentoring?", ru: "В чём разница между коучингом и менторингом?" },
    answer: {
      de: "Im Coaching stellt Anatoly Mook gezielte Fragen, um Ihnen zu helfen, eigene Antworten zu finden. Im Mentoring teilt er darüber hinaus auch eigene Erfahrungen und gibt direktere Empfehlungen. In der Praxis verbindet er beides je nach Situation — der Fokus liegt immer auf dem, was Sie in diesem Moment am meisten weiterbringt.",
      en: "In coaching, Anatoly Mook asks targeted questions to help you find your own answers. In mentoring, he also shares his own experiences and gives more direct recommendations. In practice, he combines both depending on the situation — the focus is always on what advances you most in any given moment.",
      ru: "В коучинге Анатолий Мук задаёт целенаправленные вопросы, помогая найти собственные ответы. В менторинге он также делится своим опытом и даёт более прямые рекомендации. На практике он сочетает оба подхода в зависимости от ситуации — фокус всегда на том, что продвинет вас больше всего."
    },
    category: "coaching",
    relatedServices: ["coaching"],
    relatedFaqs: ["wie-funktioniert-coaching", "fuer-wen-ist-das-angebot"]
  },
  {
    slug: "team-coaching",
    question: { de: "Gibt es auch Team-Coaching?", en: "Is team coaching available?", ru: "Доступен ли командный коучинг?" },
    answer: {
      de: "Ja, Team-Coaching ist ein wesentlicher Bestandteil der Corporate-Programme. Dabei arbeiten wir mit Führungsteams an Themen wie Kommunikation, Entscheidungskultur, Vertrauen und gemeinsamer Ausrichtung. Team-Coachings finden in der Regel als Tages- oder Halbtagesformate statt und werden individuell auf Ihre Teamdynamik abgestimmt.",
      en: "Yes, team coaching is an essential part of corporate programs. We work with leadership teams on topics such as communication, decision culture, trust, and shared alignment. Team coaching usually takes place as full-day or half-day formats and is individually tailored to your team dynamics.",
      ru: "Да, командный коучинг — существенная часть корпоративных программ. Мы работаем с командами руководителей над коммуникацией, культурой принятия решений, доверием и общим направлением. Командный коучинг проводится в формате полного или половины дня и адаптируется под вашу командную динамику."
    },
    category: "corporate",
    relatedServices: ["corporate", "coaching"],
    relatedFaqs: ["corporate-programme-details", "corporate-roi"]
  },
  {
    slug: "zahlung-und-rechnung",
    question: { de: "Welche Zahlungsmöglichkeiten gibt es?", en: "What payment options are available?", ru: "Какие способы оплаты доступны?" },
    answer: {
      de: "Zahlungen erfolgen per Überweisung oder auf Rechnung. Für Privatpersonen ist auch Ratenzahlung möglich. Unternehmen erhalten eine ordnungsgemäße Rechnung mit ausgewiesener MwSt. Bei Coaching-Paketen wird in der Regel eine Anzahlung vereinbart, der Rest wird in monatlichen Raten gezahlt.",
      en: "Payments are made by bank transfer or invoice. Installment payments are also available for individuals. Companies receive a proper invoice with VAT. For coaching packages, a down payment is usually agreed upon, with the rest paid in monthly installments.",
      ru: "Оплата производится банковским переводом или по счёту. Для частных лиц доступна рассрочка. Компании получают надлежащий счёт с НДС. Для пакетов коучинга обычно согласовывается предоплата, остаток выплачивается ежемесячными взносами."
    },
    category: "kosten",
    relatedServices: ["booking"],
    relatedFaqs: ["was-kostet-coaching", "stornierung-und-umbuchung"]
  },
  {
    slug: "was-ist-transformation",
    question: { de: "Was bedeutet persönliche Transformation?", en: "What does personal transformation mean?", ru: "Что означает личная трансформация?" },
    answer: {
      de: "Persönliche Transformation geht über Verhaltensänderung hinaus. Es ist ein tiefgreifender Wandel in der Art, wie Sie sich selbst, andere und die Welt wahrnehmen. Es bedeutet, alte Muster zu erkennen und loszulassen, die Ihnen nicht mehr dienen, und eine bewusstere, authentischere Version Ihrer selbst zu leben.",
      en: "Personal transformation goes beyond behavioral change. It is a profound shift in how you perceive yourself, others, and the world. It means recognizing and releasing old patterns that no longer serve you, and living a more conscious, authentic version of yourself.",
      ru: "Личная трансформация выходит за рамки изменения поведения. Это глубокий сдвиг в восприятии себя, других и мира. Это означает распознавание и отпускание старых паттернов, которые больше не служат вам, и жизнь более осознанной, аутентичной версией себя."
    },
    category: "allgemein",
    relatedServices: ["transformation", "coaching"],
    relatedFaqs: ["ist-das-esoterisch", "welche-ergebnisse-kann-ich-erwarten"]
  },
  {
    slug: "erfahrungsberichte",
    question: { de: "Gibt es Erfahrungsberichte von Klienten?", en: "Are there client testimonials?", ru: "Есть ли отзывы клиентов?" },
    answer: {
      de: "Ja, auf unserer Website finden Sie zahlreiche Erfolgsgeschichten von Führungskräften, Unternehmern und Privatpersonen, die ihre Erfahrungen mit der Zusammenarbeit teilen. Aufgrund der Vertraulichkeit erfolgen manche Berichte anonym. Gerne vermitteln wir auch persönliche Referenzgespräche.",
      en: "Yes, on our website you will find numerous success stories from executives, entrepreneurs, and individuals sharing their experiences. Due to confidentiality, some reports are anonymous. We are also happy to arrange personal reference conversations.",
      ru: "Да, на нашем сайте вы найдёте многочисленные истории успеха руководителей, предпринимателей и частных лиц. Из-за конфиденциальности некоторые отзывы анонимны. Также можем организовать личные рекомендательные беседы."
    },
    category: "ergebnisse",
    relatedServices: ["coaching", "seminare"],
    relatedFaqs: ["welche-ergebnisse-kann-ich-erwarten", "nachhaltige-veraenderung"]
  },
  {
    slug: "corporate-fuehrungskraefteentwicklung",
    question: { de: "Was umfasst die Führungskräfteentwicklung?", en: "What does leadership development include?", ru: "Что включает развитие руководителей?" },
    answer: {
      de: "Die Führungskräfteentwicklung umfasst individuelle Coaching-Einheiten, Gruppen-Workshops und praxisnahe Übungen. Inhalte reichen von Selbstreflexion und Bewusstseinsentwicklung über Kommunikation und Konfliktfähigkeit bis hin zu strategischer Entscheidungsstärke. Jedes Programm wird auf die konkreten Herausforderungen Ihrer Organisation zugeschnitten.",
      en: "Leadership development includes individual coaching units, group workshops, and hands-on exercises. Content ranges from self-reflection and consciousness development to communication, conflict competence, and strategic decision-making strength. Each program is tailored to the specific challenges of your organization.",
      ru: "Развитие руководителей включает индивидуальные коучинг-сессии, групповые воркшопы и практические упражнения. Содержание охватывает саморефлексию и развитие сознания, коммуникацию, управление конфликтами и стратегическую силу принятия решений. Каждая программа адаптирована под конкретные вызовы организации."
    },
    category: "corporate",
    relatedServices: ["corporate", "coaching"],
    relatedFaqs: ["corporate-programme-details", "team-coaching"]
  },
  {
    slug: "digitale-ressourcen",
    question: { de: "Gibt es digitale Ressourcen oder Online-Kurse?", en: "Are there digital resources or online courses?", ru: "Есть ли цифровые ресурсы или онлайн-курсы?" },
    answer: {
      de: "Ja, auf der Ressourcen-Seite finden Sie kostenlose Guides, Reflexionstools und Materialien. Darüber hinaus bietet der Shop digitale Produkte und Online-Kurse für die eigenständige Arbeit an Klarheit und bewusster Führung. Klienten im Coaching erhalten zusätzliche exklusive Materialien.",
      en: "Yes, on the resources page you will find free guides, reflection tools, and materials. Additionally, the shop offers digital products and online courses for independent work on clarity and conscious leadership. Coaching clients receive additional exclusive materials.",
      ru: "Да, на странице ресурсов есть бесплатные руководства, инструменты рефлексии и материалы. Магазин предлагает цифровые продукты и онлайн-курсы для самостоятельной работы над ясностью и осознанным лидерством. Клиенты коучинга получают дополнительные эксклюзивные материалы."
    },
    category: "praktisch",
    relatedServices: ["resources"],
    relatedFaqs: ["fuer-wen-ist-das-angebot", "welche-seminare-gibt-es"]
  },
  {
    slug: "keynote-dauer-und-format",
    question: {
      de: "Wie lange dauert eine Keynote und welche Formate gibt es?",
      en: "How long does a keynote last and what formats are available?",
      ru: "Какова продолжительность доклада и какие форматы доступны?"
    },
    answer: {
      de: "Eine Standard-Keynote von Anatoly Mook dauert 45 bis 60 Minuten. Erweiterte Formate mit interaktiven Elementen und Fragerunde umfassen 90 bis 120 Minuten. Darüber hinaus bietet Anatoly Mook Halbtages- oder Ganztagesworkshops als Ergänzung zur Keynote an, wenn ein tieferer Einstieg gewünscht ist. Alle Formate können auf Deutsch, Englisch oder Russisch gehalten werden. Die technischen Anforderungen werden vorab abgestimmt, um einen reibungslosen Ablauf sicherzustellen.",
      en: "A standard keynote by Anatoly Mook lasts 45 to 60 minutes. Extended formats with interactive elements and Q&A sessions span 90 to 120 minutes. Additionally, Anatoly Mook offers half-day or full-day workshops to complement the keynote when deeper engagement is desired. All formats can be delivered in German, English, or Russian. Technical requirements are coordinated in advance to ensure smooth execution.",
      ru: "Стандартный доклад Анатолия Мука длится от 45 до 60 минут. Расширенные форматы с интерактивными элементами и сессией вопросов и ответов занимают от 90 до 120 минут. Кроме того, Анатолий Мук предлагает полудневные или дневные воркшопы в дополнение к докладу для более глубокого погружения. Все форматы могут проводиться на немецком, английском или русском языках. Технические требования согласовываются заранее."
    },
    category: "keynotes",
    relatedServices: ["keynotes"],
    relatedFaqs: ["keynote-buchen", "virtuelle-keynotes"]
  },
  {
    slug: "virtuelle-keynotes",
    question: {
      de: "Bietet Anatoly Mook auch virtuelle Keynotes an?",
      en: "Does Anatoly Mook offer virtual keynotes?",
      ru: "Предлагает ли Анатолий Мук виртуальные выступления?"
    },
    answer: {
      de: "Ja, Anatoly Mook bietet professionelle virtuelle Keynotes an, die speziell für das Online-Format optimiert sind. Die virtuellen Formate nutzen interaktive Elemente wie Live-Umfragen, Chat-Interaktionen und digitale Gruppenübungen, um das Publikum aktiv einzubinden. Die technische Umsetzung erfolgt in Broadcast-Qualität mit professionellem Setup. Virtuelle Keynotes eignen sich besonders für internationale Veranstaltungen, hybride Events oder Situationen, in denen Reisezeit minimiert werden soll.",
      en: "Yes, Anatoly Mook offers professional virtual keynotes specifically optimized for the online format. Virtual formats use interactive elements such as live polls, chat interactions, and digital group exercises to actively engage the audience. Technical delivery is in broadcast quality with professional setup. Virtual keynotes are particularly suited for international events, hybrid events, or situations where travel time needs to be minimized.",
      ru: "Да, Анатолий Мук предлагает профессиональные виртуальные выступления, специально оптимизированные для онлайн-формата. Виртуальные форматы используют интерактивные элементы — опросы в реальном времени, чат и цифровые групповые упражнения для активного вовлечения аудитории. Техническая реализация осуществляется в вещательном качестве. Виртуальные доклады особенно подходят для международных и гибридных мероприятий."
    },
    category: "keynotes",
    relatedServices: ["keynotes", "booking"],
    relatedFaqs: ["keynote-dauer-und-format", "keynote-fuer-konferenzen"]
  },
  {
    slug: "keynote-fuer-konferenzen",
    question: {
      de: "Ist Anatoly Mook als Redner für Konferenzen verfügbar?",
      en: "Is Anatoly Mook available as a speaker for conferences?",
      ru: "Доступен ли Анатолий Мук как спикер на конференциях?"
    },
    answer: {
      de: "Ja, Anatoly Mook ist als Keynote-Speaker für Konferenzen, Kongresse, Leadership-Summits und Firmenveranstaltungen verfügbar. Er spricht regelmäßig auf nationalen und internationalen Bühnen vor Publikumsgrößen von 50 bis über 2000 Personen. Neben der Hauptkeynote bietet er ergänzende Formate wie Podiumsdiskussionen, Masterclasses oder Meet-and-Greet-Sessions an. Anfragen werden über mail@anatoly-mook.de oder telefonisch unter 02303 334 0628 entgegengenommen.",
      en: "Yes, Anatoly Mook is available as a keynote speaker for conferences, congresses, leadership summits, and corporate events. He regularly speaks on national and international stages to audiences ranging from 50 to over 2000 people. Beyond the main keynote, he offers complementary formats such as panel discussions, masterclasses, or meet-and-greet sessions. Inquiries are accepted via mail@anatoly-mook.de or by phone at 02303 334 0628.",
      ru: "Да, Анатолий Мук доступен как ключевой спикер на конференциях, конгрессах, лидерских саммитах и корпоративных мероприятиях. Он регулярно выступает на национальных и международных площадках перед аудиторией от 50 до более чем 2000 человек. Помимо основного доклада он предлагает дополнительные форматы — панельные дискуссии, мастер-классы и сессии знакомства. Запросы принимаются через mail@anatoly-mook.de или по телефону 02303 334 0628."
    },
    category: "keynotes",
    relatedServices: ["keynotes", "booking"],
    relatedFaqs: ["keynote-buchen", "virtuelle-keynotes"]
  },
  {
    slug: "messbarer-coaching-erfolg",
    question: {
      de: "Wie wird der Erfolg im Coaching messbar gemacht?",
      en: "How is coaching success made measurable?",
      ru: "Как измеряется успех коучинга?"
    },
    answer: {
      de: "Anatoly Mook setzt auf eine Kombination aus qualitativen und quantitativen Methoden. Zu Beginn werden klare, messbare Ziele definiert. Im Prozess werden regelmäßig Selbsteinschätzungen und Fortschrittsreflexionen durchgeführt. Bei Corporate-Programmen kommen zusätzlich 360-Grad-Feedbacks und Team-Assessments zum Einsatz. Zwischen- und Abschlussevaluationen dokumentieren die erzielten Veränderungen. So wird der Erfolg der Zusammenarbeit transparent und nachvollziehbar für alle Beteiligten.",
      en: "Anatoly Mook uses a combination of qualitative and quantitative methods. At the outset, clear measurable goals are defined. During the process, regular self-assessments and progress reflections are conducted. For corporate programs, 360-degree feedback and team assessments are additionally employed. Interim and final evaluations document the changes achieved. This makes the success of the collaboration transparent and traceable for everyone involved.",
      ru: "Анатолий Мук использует комбинацию качественных и количественных методов. В начале определяются чёткие измеримые цели. В процессе регулярно проводятся самооценки и рефлексии прогресса. Для корпоративных программ дополнительно применяются 360-градусная обратная связь и командные оценки. Промежуточные и итоговые оценки документируют достигнутые изменения. Это делает успех сотрудничества прозрачным и отслеживаемым для всех участников."
    },
    category: "ergebnisse",
    relatedServices: ["coaching", "corporate"],
    relatedFaqs: ["welche-ergebnisse-kann-ich-erwarten", "erfahrungsberichte"]
  },
  {
    slug: "langfristige-wirkung",
    question: {
      de: "Wie wirkt sich die Zusammenarbeit langfristig aus?",
      en: "What is the long-term impact of the collaboration?",
      ru: "Каково долгосрочное влияние сотрудничества?"
    },
    answer: {
      de: "Die Zusammenarbeit mit Anatoly Mook wirkt weit über den eigentlichen Coaching-Zeitraum hinaus. Klienten entwickeln eigene Werkzeuge und Fähigkeiten, die sie dauerhaft einsetzen können. Die veränderten Denk- und Verhaltensmuster werden zu einem natürlichen Teil des Alltags. Viele Klienten berichten auch Jahre nach der Zusammenarbeit von anhaltenden positiven Veränderungen in Führung, Beziehungen und Lebensqualität. Optional bietet Anatoly Mook Auffrischungssitzungen für langfristige Begleitung an.",
      en: "The collaboration with Anatoly Mook has effects well beyond the actual coaching period. Clients develop their own tools and skills they can use permanently. The changed thinking and behavior patterns become a natural part of daily life. Many clients report lasting positive changes in leadership, relationships, and quality of life even years after the collaboration. Optionally, Anatoly Mook offers refresher sessions for long-term support.",
      ru: "Сотрудничество с Анатолием Муком оказывает влияние далеко за пределами самого периода коучинга. Клиенты развивают собственные инструменты и навыки для постоянного использования. Изменённые паттерны мышления и поведения становятся естественной частью повседневной жизни. Многие клиенты отмечают устойчивые позитивные изменения в лидерстве, отношениях и качестве жизни спустя годы после сотрудничества. Дополнительно доступны сессии обновления."
    },
    category: "ergebnisse",
    relatedServices: ["coaching", "transformation"],
    relatedFaqs: ["nachhaltige-veraenderung", "welche-ergebnisse-kann-ich-erwarten"]
  },
  {
    slug: "coaching-fuer-fuehrungskraefte",
    question: {
      de: "Gibt es spezielles Coaching für Führungskräfte?",
      en: "Is there special coaching for executives?",
      ru: "Есть ли специальный коучинг для руководителей?"
    },
    answer: {
      de: "Ja, Anatoly Mook bietet spezialisiertes Executive Coaching für Führungskräfte auf allen Ebenen an. Der Fokus liegt auf bewusster Selbstführung, strategischer Klarheit, authentischem Führungsstil und dem Umgang mit den besonderen Herausforderungen einer Führungsposition. Das Executive Coaching verbindet persönliche Entwicklung mit strategischem Denken und hilft, Führung als kraftvollen Ausdruck innerer Klarheit zu leben. Die Sitzungen werden flexibel gestaltet und passen sich Ihrem anspruchsvollen Zeitplan an.",
      en: "Yes, Anatoly Mook offers specialized executive coaching for leaders at all levels. The focus is on conscious self-leadership, strategic clarity, authentic leadership style, and navigating the unique challenges of a leadership position. Executive coaching combines personal development with strategic thinking and helps you experience leadership as a powerful expression of inner clarity. Sessions are flexibly structured to fit your demanding schedule.",
      ru: "Да, Анатолий Мук предлагает специализированный коучинг для руководителей всех уровней. Фокус направлен на осознанное самоуправление, стратегическую ясность, аутентичный стиль руководства и работу с особыми вызовами руководящей позиции. Executive-коучинг сочетает личностное развитие со стратегическим мышлением и помогает проживать лидерство как мощное выражение внутренней ясности. Сессии гибко организованы под ваш плотный график."
    },
    category: "coaching",
    relatedServices: ["coaching", "corporate"],
    relatedFaqs: ["was-ist-bewusste-fuehrung", "corporate-fuehrungskraefteentwicklung"]
  },
  {
    slug: "coaching-bei-neuorientierung",
    question: {
      de: "Hilft Coaching bei beruflicher Neuorientierung?",
      en: "Can coaching help with career reorientation?",
      ru: "Помогает ли коучинг при смене профессии?"
    },
    answer: {
      de: "Absolut. Coaching bei Anatoly Mook ist besonders wirkungsvoll in Phasen beruflicher Neuorientierung. Der Prozess hilft Ihnen, Klarheit über Ihre wahren Werte, Stärken und Ambitionen zu gewinnen. Statt voreiliger Entscheidungen entwickeln Sie eine fundierte innere Ausrichtung, die als Kompass für berufliche Veränderungen dient. Gemeinsam werden konkrete nächste Schritte erarbeitet und mögliche Hindernisse antizipiert. Viele Klienten finden durch diesen Prozess nicht nur einen neuen Job, sondern eine tiefere berufliche Erfüllung.",
      en: "Absolutely. Coaching with Anatoly Mook is particularly effective during phases of career reorientation. The process helps you gain clarity about your true values, strengths, and ambitions. Instead of hasty decisions, you develop a well-founded inner alignment that serves as a compass for professional changes. Together, concrete next steps are developed and potential obstacles anticipated. Many clients find not just a new job through this process, but deeper professional fulfillment.",
      ru: "Безусловно. Коучинг у Анатолия Мука особенно эффективен в фазах профессиональной переориентации. Процесс помогает обрести ясность относительно ваших истинных ценностей, сильных сторон и амбиций. Вместо поспешных решений вы формируете обоснованную внутреннюю направленность, которая служит компасом для профессиональных изменений. Совместно разрабатываются конкретные следующие шаги и предвосхищаются возможные препятствия. Многие клиенты находят через этот процесс не просто новую работу, а глубокое профессиональное удовлетворение."
    },
    category: "coaching",
    relatedServices: ["coaching", "transformation"],
    relatedFaqs: ["wie-funktioniert-coaching", "was-ist-bewusste-fuehrung"]
  },
  {
    slug: "seminar-nachbetreuung",
    question: {
      de: "Gibt es nach den Seminaren eine Nachbetreuung?",
      en: "Is there follow-up support after the seminars?",
      ru: "Есть ли поддержка после семинаров?"
    },
    answer: {
      de: "Ja, Anatoly Mook legt großen Wert auf nachhaltige Wirkung der Seminare. Nach jedem Seminar erhalten Teilnehmer umfangreiche Begleitmaterialien und Reflexionsaufgaben für die Integration im Alltag. Für ausgewählte Seminare gibt es Follow-up-Termine nach vier bis sechs Wochen, in denen Erfahrungen und Herausforderungen besprochen werden. Teilnehmer haben zudem die Möglichkeit, in ein individuelles Coaching-Programm einzusteigen, um die Seminarinhalte gezielt zu vertiefen und persönlich weiterzuarbeiten.",
      en: "Yes, Anatoly Mook places great emphasis on the lasting impact of seminars. After each seminar, participants receive comprehensive supporting materials and reflection exercises for integration into daily life. For selected seminars, follow-up sessions are offered after four to six weeks to discuss experiences and challenges. Participants also have the option to enter an individual coaching program to deepen seminar content and continue personal development.",
      ru: "Да, Анатолий Мук придаёт большое значение устойчивому эффекту семинаров. После каждого семинара участники получают обширные сопроводительные материалы и задания для рефлексии и интеграции в повседневную жизнь. Для отдельных семинаров предусмотрены контрольные встречи через четыре-шесть недель для обсуждения опыта и трудностей. Участники также могут перейти в индивидуальную программу коучинга для углубления содержания семинара."
    },
    category: "seminare",
    relatedServices: ["seminare", "resources"],
    relatedFaqs: ["welche-seminare-gibt-es", "vorbereitung-auf-seminar"]
  },
];

export function getFaqBySlug(slug: string): FAQEntry | undefined {
  return faqEntries.find(f => f.slug === slug);
}

export function getFaqsByCategory(category: string): FAQEntry[] {
  return faqEntries.filter(f => f.category === category);
}

export function getRelatedFaqs(slug: string): FAQEntry[] {
  const faq = getFaqBySlug(slug);
  if (!faq) return [];
  return faq.relatedFaqs.map(s => getFaqBySlug(s)).filter((f): f is FAQEntry => !!f);
}
