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
  {
    slug: "wie-misst-man-coaching-erfolg",
    question: { de: "Wie wird Coaching-Erfolg gemessen?", en: "How do you measure coaching success?", ru: "Как измеряется успех коучинга?" },
    answer: {
      de: "Der Erfolg wird auf mehreren Ebenen gemessen. Zu Beginn definieren wir gemeinsam klare Ziele und Erfolgsindikatoren. Regelmäßige Selbsteinschätzungen und Reflexionsgespräche machen Fortschritte sichtbar. Im Corporate-Kontext setzen wir zusätzlich 360-Grad-Feedbacks und Leistungskennzahlen ein. Neben messbaren Veränderungen in Verhalten und Ergebnissen achten wir auch auf subjektive Indikatoren wie innere Klarheit, Entscheidungssicherheit und Lebensqualität. Die meisten Klienten berichten bereits nach drei bis vier Sitzungen von deutlich spürbaren Veränderungen.",
      en: "Success is measured on multiple levels. At the outset, we jointly define clear goals and success indicators. Regular self-assessments and reflection conversations make progress visible. In the corporate context, we additionally use 360-degree feedback and performance metrics. Beyond measurable changes in behavior and results, we also pay attention to subjective indicators such as inner clarity, decision confidence, and quality of life. Most clients report noticeable changes after just three to four sessions.",
      ru: "Успех измеряется на нескольких уровнях. В начале мы совместно определяем ясные цели и индикаторы успеха. Регулярные самооценки и рефлексивные беседы делают прогресс видимым. В корпоративном контексте дополнительно используются 360-градусная обратная связь и показатели эффективности. Помимо измеримых изменений в поведении мы отслеживаем субъективные индикаторы: внутреннюю ясность, уверенность в решениях и качество жизни. Большинство клиентов отмечают заметные изменения уже после трёх-четырёх сессий."
    },
    category: "ergebnisse",
    relatedServices: ["coaching", "corporate"],
    relatedFaqs: ["welche-ergebnisse-kann-ich-erwarten", "messbarer-coaching-erfolg"]
  },
  {
    slug: "qualifikationen-anatoly-mook",
    question: { de: "Welche Qualifikationen hat Anatoly Mook?", en: "What qualifications does Anatoly Mook have?", ru: "Какими квалификациями обладает Анатолий Мук?" },
    answer: {
      de: "Anatoly Mook verfügt über umfassende Ausbildungen in Coaching, Bewusstseinsarbeit und Organisationsentwicklung. Seine Expertise basiert auf jahrelanger praktischer Erfahrung in der Begleitung von Führungskräften und Unternehmern. Er bildet sich kontinuierlich weiter und integriert Erkenntnisse aus Psychologie, Neurowissenschaft und Führungsforschung in seine Arbeit. Darüber hinaus bringt er eigene unternehmerische Erfahrung mit, die seine Coaching-Arbeit besonders praxisnah und relevant macht.",
      en: "Anatoly Mook holds comprehensive certifications in coaching, consciousness work, and organizational development. His expertise is based on years of practical experience guiding executives and entrepreneurs. He continuously furthers his education and integrates insights from psychology, neuroscience, and leadership research into his work. Additionally, he brings his own entrepreneurial experience, which makes his coaching work particularly practical and relevant.",
      ru: "Анатолий Мук обладает обширными сертификациями в коучинге, работе с сознанием и организационном развитии. Его экспертиза основана на многолетнем практическом опыте сопровождения руководителей и предпринимателей. Он постоянно повышает квалификацию и интегрирует в работу знания из психологии, нейронауки и исследований лидерства. Кроме того, он привносит собственный предпринимательский опыт, что делает его коучинг особенно практичным и актуальным."
    },
    category: "allgemein",
    relatedServices: ["coaching"],
    relatedFaqs: ["wer-ist-anatoly-mook", "was-unterscheidet-anatoly-mook"]
  },
  {
    slug: "coaching-und-therapie",
    question: { de: "Kann Coaching mit Therapie kombiniert werden?", en: "Can coaching be combined with therapy?", ru: "Можно ли сочетать коучинг с терапией?" },
    answer: {
      de: "Ja, Coaching und Therapie können sich hervorragend ergänzen. Coaching fokussiert auf Entwicklung, Ziele und Zukunftsgestaltung, während Therapie tieferliegende psychische Themen behandelt. Anatoly Mook arbeitet bei Bedarf in Abstimmung mit Therapeuten seiner Klienten. Wichtig: Coaching ersetzt keine Therapie bei akuten psychischen Erkrankungen. Im Erstgespräch klären wir gemeinsam, ob Coaching das richtige Format für Ihre Situation ist, und empfehlen gegebenenfalls ergänzende professionelle Unterstützung.",
      en: "Yes, coaching and therapy can complement each other excellently. Coaching focuses on development, goals, and shaping the future, while therapy addresses deeper psychological issues. Anatoly Mook works in coordination with his clients therapists when needed. Important: Coaching does not replace therapy for acute mental health conditions. In the initial consultation, we jointly determine whether coaching is the right format for your situation and recommend additional professional support if appropriate.",
      ru: "Да, коучинг и терапия могут отлично дополнять друг друга. Коучинг фокусируется на развитии, целях и формировании будущего, тогда как терапия работает с глубинными психологическими темами. Анатолий Мук при необходимости координируется с терапевтами клиентов. Важно: коучинг не заменяет терапию при острых психических расстройствах. На первичной консультации мы определяем, подходит ли коучинг для вашей ситуации, и при необходимости рекомендуем дополнительную поддержку."
    },
    category: "coaching",
    relatedServices: ["coaching"],
    relatedFaqs: ["wie-funktioniert-coaching", "fuer-wen-ist-das-angebot"]
  },
  {
    slug: "gruppencoaching-verfuegbar",
    question: { de: "Gibt es Gruppencoaching-Angebote?", en: "Is there group coaching available?", ru: "Доступен ли групповой коучинг?" },
    answer: {
      de: "Ja, neben dem Einzelcoaching bietet Anatoly Mook auch Gruppencoaching-Formate an. In kleinen Gruppen von vier bis acht Teilnehmern entsteht eine besondere Dynamik des gemeinsamen Lernens. Teilnehmer profitieren von verschiedenen Perspektiven und der Erfahrung, dass andere ähnliche Herausforderungen bewältigen. Gruppencoaching eignet sich besonders für Führungskräfte, die von Peer-Learning und gegenseitiger Inspiration profitieren möchten. Die Gruppen werden thematisch oder nach Entwicklungsstufe zusammengestellt.",
      en: "Yes, alongside individual coaching, Anatoly Mook also offers group coaching formats. In small groups of four to eight participants, a special dynamic of shared learning emerges. Participants benefit from different perspectives and the experience that others face similar challenges. Group coaching is particularly suitable for leaders who want to benefit from peer learning and mutual inspiration. Groups are assembled by theme or development stage.",
      ru: "Да, наряду с индивидуальным коучингом Анатолий Мук предлагает форматы группового коучинга. В малых группах из четырёх-восьми участников возникает особая динамика совместного обучения. Участники выигрывают от различных перспектив и осознания, что другие сталкиваются с похожими вызовами. Групповой коучинг особенно подходит для руководителей, желающих учиться у коллег. Группы формируются по темам или уровню развития."
    },
    category: "coaching",
    relatedServices: ["coaching", "seminare"],
    relatedFaqs: ["wie-funktioniert-coaching", "team-coaching"]
  },
  {
    slug: "retreat-themen",
    question: { de: "Welche Themen werden auf den Retreats behandelt?", en: "What topics do the retreats cover?", ru: "Какие темы охватывают ретриты?" },
    answer: {
      de: "Die Retreats behandeln Themen wie tiefe Selbsterkenntnis, Bewusstseinsentwicklung, Loslassen alter Muster, Klarheit in Lebensfragen und persönliche Neuausrichtung. Jeder Retreat hat einen thematischen Schwerpunkt, ergänzt durch Meditation, Atemarbeit und Reflexionsübungen. Die mehrtägige Intensität ermöglicht Einsichten, die in kürzeren Formaten kaum erreichbar sind. Die Retreats finden an ausgewählten, ruhigen Orten statt, die eine Atmosphäre der Konzentration und inneren Einkehr fördern.",
      en: "The retreats cover topics such as deep self-knowledge, consciousness development, releasing old patterns, clarity in life questions, and personal realignment. Each retreat has a thematic focus, complemented by meditation, breathwork, and reflection exercises. The multi-day intensity enables insights rarely achievable in shorter formats. Retreats take place at selected, quiet locations that foster an atmosphere of concentration and inner reflection.",
      ru: "Ретриты охватывают темы глубокого самопознания, развития сознания, отпускания старых паттернов, ясности в жизненных вопросах и личной переориентации. Каждый ретрит имеет тематический фокус, дополняемый медитацией, дыхательными практиками и рефлексивными упражнениями. Многодневная интенсивность позволяет достичь инсайтов, малодоступных в коротких форматах. Ретриты проходят в отобранных тихих местах с атмосферой концентрации."
    },
    category: "seminare",
    relatedServices: ["seminare"],
    relatedFaqs: ["welche-seminare-gibt-es", "vorbereitung-auf-seminar"]
  },
  {
    slug: "schnell-termin-buchen",
    question: { de: "Wie schnell kann ich eine Sitzung buchen?", en: "How quickly can I book a session?", ru: "Как быстро можно забронировать сессию?" },
    answer: {
      de: "In der Regel ist ein Erstgespräch innerhalb von ein bis zwei Wochen möglich. Bei dringenden Anliegen bemühen wir uns um kurzfristigere Termine. Reguläre Coaching-Sessions werden in einem festen Rhythmus vereinbart, der sich nach Ihren Bedürfnissen richtet. Die Buchung erfolgt bequem über den Online-Kalender auf unserer Website, per E-Mail an mail@anatoly-mook.de oder telefonisch unter 02303 334 0628.",
      en: "Typically, an initial consultation is possible within one to two weeks. For urgent matters, we endeavor to arrange shorter-notice appointments. Regular coaching sessions are scheduled in a fixed rhythm tailored to your needs. Booking is conveniently done through the online calendar on our website, via email at mail@anatoly-mook.de, or by phone at 02303 334 0628.",
      ru: "Обычно первичная консультация возможна в течение одной-двух недель. При срочных запросах мы стараемся найти более быстрый вариант. Регулярные коучинг-сессии назначаются в фиксированном ритме, адаптированном под ваши потребности. Бронирование удобно через онлайн-календарь на сайте, по электронной почте mail@anatoly-mook.de или по телефону 02303 334 0628."
    },
    category: "praktisch",
    relatedServices: ["booking", "coaching"],
    relatedFaqs: ["wie-buche-ich-einen-termin", "wie-funktioniert-erstgespraech"]
  },
  {
    slug: "langzeit-rabatte",
    question: { de: "Gibt es Rabatte bei langfristiger Zusammenarbeit?", en: "Are there discounts for long-term commitments?", ru: "Есть ли скидки при долгосрочном сотрудничестве?" },
    answer: {
      de: "Ja, für längere Begleitprozesse bieten wir attraktive Paketangebote an, die deutlich günstiger sind als Einzelsitzungen. Ein 6-Monats-Paket oder Jahresprogramm beinhaltet in der Regel einen spürbaren Preisvorteil sowie zusätzliche Leistungen wie Zwischenchecks und exklusive Materialien. Die genauen Konditionen werden im Erstgespräch individuell besprochen und auf Ihre Bedürfnisse abgestimmt. Ratenzahlung ist ebenfalls möglich.",
      en: "Yes, for longer accompaniment processes we offer attractive package deals that are significantly more affordable than individual sessions. A 6-month package or annual program typically includes a noticeable price advantage plus additional services such as interim check-ins and exclusive materials. Exact terms are discussed individually in the initial consultation and tailored to your needs. Installment payments are also available.",
      ru: "Да, для длительных процессов сопровождения мы предлагаем привлекательные пакетные предложения, значительно выгоднее отдельных сессий. Полугодовой пакет или годовая программа обычно включают заметное ценовое преимущество и дополнительные услуги: промежуточные проверки и эксклюзивные материалы. Точные условия обсуждаются индивидуально на первичной консультации. Рассрочка также доступна."
    },
    category: "kosten",
    relatedServices: ["coaching", "booking"],
    relatedFaqs: ["was-kostet-coaching", "zahlung-und-rechnung"]
  },
  {
    slug: "bewusstseins-quiz",
    question: { de: "Was ist der Bewusstseins-Quiz?", en: "What is the Consciousness Quiz?", ru: "Что такое Квиз осознанности?" },
    answer: {
      de: "Der Bewusstseins-Quiz ist ein interaktives Online-Tool auf unserer Website, das Ihnen hilft, Ihren aktuellen Stand der Bewusstseinsentwicklung einzuschätzen. In wenigen Minuten erhalten Sie eine erste Orientierung zu Ihren Stärken und Entwicklungsfeldern in Bereichen wie Selbstkenntnis, Entscheidungsstärke und Führungspräsenz. Die Ergebnisse dienen als Gesprächsgrundlage für ein mögliches Erstgespräch und zeigen konkrete Ansatzpunkte für Ihre persönliche Entwicklung.",
      en: "The Consciousness Quiz is an interactive online tool on our website that helps you assess your current level of consciousness development. In just a few minutes, you receive initial orientation about your strengths and development areas in domains such as self-knowledge, decision-making strength, and leadership presence. The results serve as a conversation basis for a potential initial consultation and reveal concrete starting points for your personal development.",
      ru: "Квиз осознанности — интерактивный онлайн-инструмент на нашем сайте, помогающий оценить текущий уровень развития сознания. За несколько минут вы получаете первичную ориентацию о ваших сильных сторонах и зонах развития в областях самопознания, силы принятия решений и лидерского присутствия. Результаты служат основой для первичной консультации и показывают конкретные точки входа для личного развития."
    },
    category: "praktisch",
    relatedServices: ["resources", "coaching"],
    relatedFaqs: ["digitale-ressourcen", "wie-funktioniert-erstgespraech"]
  },
  {
    slug: "kollege-zum-seminar",
    question: { de: "Kann ich einen Kollegen zum Seminar mitbringen?", en: "Can I bring a colleague to a seminar?", ru: "Могу ли я привести коллегу на семинар?" },
    answer: {
      de: "Ja, bei offenen Seminaren und Workshops sind zusätzliche Teilnehmer herzlich willkommen, solange Plätze verfügbar sind. Für Paarbuchungen bieten wir in der Regel einen Preisvorteil an. Wenn Sie mit mehreren Kollegen teilnehmen möchten, kann auch ein maßgeschneidertes Corporate-Format die bessere Wahl sein. Bitte melden Sie zusätzliche Teilnehmer rechtzeitig an, da die Gruppengrößen bewusst klein gehalten werden.",
      en: "Yes, for open seminars and workshops, additional participants are welcome as long as spots are available. For pair bookings, we typically offer a price advantage. If you would like to attend with several colleagues, a customized corporate format might be the better choice. Please register additional participants in advance, as group sizes are deliberately kept small.",
      ru: "Да, на открытых семинарах и воркшопах дополнительные участники приветствуются при наличии мест. Для парных бронирований обычно предоставляется ценовое преимущество. Если вы хотите участвовать с несколькими коллегами, индивидуальный корпоративный формат может быть лучшим выбором. Регистрируйте дополнительных участников заблаговременно, так как размеры групп намеренно малые."
    },
    category: "seminare",
    relatedServices: ["seminare", "corporate"],
    relatedFaqs: ["welche-seminare-gibt-es", "wie-gross-sind-die-gruppen"]
  },
  {
    slug: "corporate-bedarfsanalyse",
    question: { de: "Wie funktioniert die Corporate-Bedarfsanalyse?", en: "How does the corporate needs analysis work?", ru: "Как проводится корпоративный анализ потребностей?" },
    answer: {
      de: "Die Bedarfsanalyse beginnt mit einem ausführlichen Briefing-Gespräch mit den Entscheidungsträgern. Anschließend führen wir bei Bedarf Interviews mit Stakeholdern und Mitarbeitern durch. Auf Basis dieser Erkenntnisse erstellen wir ein maßgeschneidertes Konzept mit klaren Zielen, Meilensteinen und messbaren Erfolgsindikatoren. Der gesamte Analyseprozess ist vertraulich und ergebnisoffen. Erst nach Ihrer Zustimmung zum Konzept beginnt die eigentliche Programmarbeit.",
      en: "The needs analysis begins with a detailed briefing conversation with decision-makers. We then conduct interviews with stakeholders and employees as needed. Based on these insights, we create a customized concept with clear goals, milestones, and measurable success indicators. The entire analysis process is confidential and open-ended. Only after your approval of the concept does the actual program work begin.",
      ru: "Анализ потребностей начинается с подробного брифинга с лицами, принимающими решения. Затем при необходимости проводятся интервью с заинтересованными сторонами и сотрудниками. На основе полученных данных создаётся индивидуальная концепция с ясными целями, этапами и измеримыми показателями успеха. Весь процесс анализа конфиденциален. Программная работа начинается только после вашего одобрения концепции."
    },
    category: "corporate",
    relatedServices: ["corporate"],
    relatedFaqs: ["corporate-programme-details", "corporate-roi"]
  },
  {
    slug: "branchen",
    question: { de: "Mit welchen Branchen arbeitet Anatoly Mook?", en: "What industries does Anatoly Mook work with?", ru: "С какими отраслями работает Анатолий Мук?" },
    answer: {
      de: "Anatoly Mook arbeitet branchenübergreifend mit Führungskräften und Unternehmen aus unterschiedlichsten Bereichen — von Technologie und Finanzwesen über Gesundheitswesen und Industrie bis hin zu Beratung und Bildung. Die Kernthemen bewusste Führung, Klarheit und persönliche Meisterschaft sind universell. Die Methoden werden individuell auf die spezifischen Herausforderungen und Kontexte der jeweiligen Branche angepasst.",
      en: "Anatoly Mook works across industries with leaders and companies from diverse sectors — from technology and finance to healthcare and manufacturing to consulting and education. The core themes of conscious leadership, clarity, and personal mastery are universal. Methods are individually adapted to the specific challenges and contexts of each industry.",
      ru: "Анатолий Мук работает межотраслево с руководителями и компаниями из самых разных сфер — от технологий и финансов до здравоохранения и промышленности, от консалтинга до образования. Ключевые темы осознанного лидерства, ясности и личного мастерства универсальны. Методы индивидуально адаптируются под специфику каждой отрасли."
    },
    category: "corporate",
    relatedServices: ["corporate", "coaching"],
    relatedFaqs: ["corporate-programme-details", "fuer-wen-ist-das-angebot"]
  },
  {
    slug: "alumni-netzwerk",
    question: { de: "Gibt es ein Netzwerk für ehemalige Teilnehmer?", en: "Is there a network for former participants?", ru: "Есть ли сеть для бывших участников?" },
    answer: {
      de: "Ja, Teilnehmer unserer Seminare und Coaching-Programme werden Teil einer wachsenden Gemeinschaft Gleichgesinnter. Es gibt regelmäßige Alumni-Treffen, exklusive Online-Formate und die Möglichkeit zum gegenseitigen Austausch. Dieses Netzwerk bietet wertvolle Kontakte, kontinuierliche Inspiration und die Möglichkeit, Erfahrungen zu teilen. Ehemalige Teilnehmer erhalten zudem Vorzugskonditionen für zukünftige Seminare und Veranstaltungen.",
      en: "Yes, participants of our seminars and coaching programs become part of a growing community of like-minded individuals. There are regular alumni meetings, exclusive online formats, and opportunities for mutual exchange. This network provides valuable contacts, continuous inspiration, and the chance to share experiences. Former participants also receive preferential terms for future seminars and events.",
      ru: "Да, участники наших семинаров и коучинг-программ становятся частью растущего сообщества единомышленников. Проводятся регулярные встречи выпускников, эксклюзивные онлайн-форматы и возможности для взаимного обмена. Эта сеть предоставляет ценные контакты, непрерывное вдохновение и возможность делиться опытом. Бывшие участники получают льготные условия на будущие семинары."
    },
    category: "seminare",
    relatedServices: ["seminare", "resources"],
    relatedFaqs: ["seminar-nachbetreuung", "welche-seminare-gibt-es"]
  },
  {
    slug: "unterschied-seminar-retreat",
    question: { de: "Was ist der Unterschied zwischen Seminar und Retreat?", en: "What is the difference between a seminar and a retreat?", ru: "В чём разница между семинаром и ретритом?" },
    answer: {
      de: "Seminare sind kompakte Lernformate von einem halben bis zwei Tagen mit klarem thematischem Fokus und strukturiertem Programm. Retreats dauern mehrere Tage und bieten mehr Raum für Stille, Reflexion und tiefe persönliche Arbeit. Während Seminare stärker auf Wissensvermittlung und praktische Werkzeuge ausgerichtet sind, ermöglichen Retreats eine intensivere Transformation durch den Rückzug aus dem Alltag und die vollständige Konzentration auf die eigene Entwicklung.",
      en: "Seminars are compact learning formats lasting half a day to two days with a clear thematic focus and structured program. Retreats last several days and offer more space for silence, reflection, and deep personal work. While seminars are more oriented toward knowledge transfer and practical tools, retreats enable more intensive transformation through withdrawal from daily life and complete focus on personal development.",
      ru: "Семинары — компактные учебные форматы от полудня до двух дней с чётким тематическим фокусом и структурированной программой. Ретриты длятся несколько дней и предоставляют больше пространства для тишины, рефлексии и глубокой личной работы. Если семинары больше направлены на передачу знаний и практические инструменты, то ретриты обеспечивают более интенсивную трансформацию через уход от повседневности."
    },
    category: "seminare",
    relatedServices: ["seminare"],
    relatedFaqs: ["welche-seminare-gibt-es", "retreat-themen"]
  },
  {
    slug: "abend-sitzungen",
    question: { de: "Können Sitzungen auch abends stattfinden?", en: "Can sessions be conducted in the evening?", ru: "Можно ли проводить сессии вечером?" },
    answer: {
      de: "Ja, Anatoly Mook bietet flexible Terminoptionen, die sich an Ihren Zeitplan anpassen. Coaching-Sessions sind auch in den Abendstunden möglich, in der Regel bis 20 Uhr. Für Klienten in anderen Zeitzonen werden individuelle Termine vereinbart, die auch außerhalb der üblichen Geschäftszeiten liegen können. Die Flexibilität ist uns wichtig, damit der Coaching-Prozess sich nahtlos in Ihren anspruchsvollen Alltag integriert.",
      en: "Yes, Anatoly Mook offers flexible scheduling options that adapt to your calendar. Coaching sessions are also possible in the evening hours, typically until 8 PM. For clients in other time zones, individual appointments are arranged that may fall outside usual business hours. Flexibility is important to us so that the coaching process integrates seamlessly into your demanding daily schedule.",
      ru: "Да, Анатолий Мук предлагает гибкие варианты расписания, адаптированные под ваш график. Коучинг-сессии возможны и в вечерние часы, обычно до 20:00. Для клиентов в других часовых поясах согласовываются индивидуальные встречи, которые могут выходить за рамки обычного рабочего времени. Гибкость для нас важна, чтобы коучинг-процесс органично вписывался в ваш насыщенный день."
    },
    category: "praktisch",
    relatedServices: ["coaching", "booking"],
    relatedFaqs: ["wie-buche-ich-einen-termin", "online-oder-vor-ort"]
  },
  {
    slug: "zufriedenheitsgarantie",
    question: { de: "Was passiert, wenn ich nicht zufrieden bin?", en: "What happens if I am not satisfied?", ru: "Что будет, если я не удовлетворён?" },
    answer: {
      de: "Ihre Zufriedenheit hat oberste Priorität. Wenn Sie nach den ersten Sessions das Gefühl haben, dass der Ansatz nicht zu Ihnen passt, sprechen wir offen darüber und finden gemeinsam eine Lösung. Bei Seminaren bieten wir eine Zufriedenheitsregelung an. Unser Ziel ist eine vertrauensvolle Zusammenarbeit, in der beide Seiten ehrlich kommunizieren. Das kostenlose Erstgespräch dient auch dazu, vorab zu prüfen, ob Ansatz und Chemie stimmen.",
      en: "Your satisfaction is our top priority. If after the first sessions you feel the approach does not suit you, we discuss this openly and find a solution together. For seminars, we offer a satisfaction policy. Our goal is a trusting collaboration where both sides communicate honestly. The free initial consultation also serves to check in advance whether the approach and chemistry are right.",
      ru: "Ваша удовлетворённость — наш главный приоритет. Если после первых сессий вы чувствуете, что подход вам не подходит, мы открыто обсудим это и найдём решение. Для семинаров действует политика удовлетворённости. Наша цель — доверительное сотрудничество с честной коммуникацией. Бесплатная первичная консультация также помогает заранее проверить, подходят ли подход и взаимодействие."
    },
    category: "praktisch",
    relatedServices: ["coaching", "seminare"],
    relatedFaqs: ["wie-funktioniert-erstgespraech", "stornierung-und-umbuchung"]
  },
  {
    slug: "ressourcen-selbststudium",
    question: { de: "Gibt es Ressourcen zum Selbststudium?", en: "Are there resources for self-study?", ru: "Есть ли ресурсы для самостоятельного изучения?" },
    answer: {
      de: "Ja, auf unserer Ressourcen-Seite finden Sie kostenlose Materialien wie Reflexionstools, Guides zur Bewusstseinsentwicklung und praxisnahe Übungen. Im Shop sind darüber hinaus digitale Kurse und vertiefende Programme erhältlich, die Sie in Ihrem eigenen Tempo durcharbeiten können. Diese Materialien eignen sich hervorragend als Einstieg oder als Ergänzung zu einem Coaching-Prozess und helfen Ihnen, eigenständig an Ihrer Entwicklung zu arbeiten.",
      en: "Yes, on our resources page you will find free materials such as reflection tools, consciousness development guides, and practical exercises. The shop also offers digital courses and in-depth programs you can work through at your own pace. These materials are excellent as an introduction or supplement to a coaching process and help you work independently on your development.",
      ru: "Да, на странице ресурсов вы найдёте бесплатные материалы: инструменты рефлексии, руководства по развитию сознания и практические упражнения. В магазине также доступны цифровые курсы и углублённые программы, которые можно проходить в своём темпе. Эти материалы отлично подходят как вступление или дополнение к коучинг-процессу и помогают самостоятельно работать над развитием."
    },
    category: "praktisch",
    relatedServices: ["resources"],
    relatedFaqs: ["digitale-ressourcen", "bewusstseins-quiz"]
  },
  {
    slug: "online-vs-praesenz-coaching",
    question: { de: "Wie unterscheidet sich Online-Coaching von Präsenz-Coaching?", en: "How does online coaching differ from in-person?", ru: "Чем отличается онлайн-коучинг от очного?" },
    answer: {
      de: "Die inhaltliche Qualität ist in beiden Formaten gleich hoch. Online-Coaching bietet mehr Flexibilität und spart Reisezeit, was besonders für vielbeschäftigte Führungskräfte vorteilhaft ist. Präsenz-Coaching in Unna ermöglicht eine noch intensivere Atmosphäre und kann nonverbale Signale besser einbeziehen. Viele Klienten kombinieren beide Formate — zum Beispiel monatliche Präsenz-Sessions ergänzt durch Online-Termine. Die Wahl hängt von Ihren Präferenzen und Ihrer Situation ab.",
      en: "The quality of content is equally high in both formats. Online coaching offers more flexibility and saves travel time, which is particularly advantageous for busy executives. In-person coaching in Unna enables an even more intensive atmosphere and can better incorporate nonverbal signals. Many clients combine both formats — for example, monthly in-person sessions supplemented by online appointments. The choice depends on your preferences and situation.",
      ru: "Содержательное качество одинаково высоко в обоих форматах. Онлайн-коучинг предлагает большую гибкость и экономит время на поездки, что особенно выгодно для занятых руководителей. Очный коучинг в Унне обеспечивает ещё более интенсивную атмосферу и лучше учитывает невербальные сигналы. Многие клиенты сочетают оба формата. Выбор зависит от ваших предпочтений и ситуации."
    },
    category: "praktisch",
    relatedServices: ["coaching"],
    relatedFaqs: ["online-oder-vor-ort", "wie-funktioniert-coaching"]
  },
  {
    slug: "keynote-vorbereitung",
    question: { de: "Welche Vorbereitung ist für eine Keynote nötig?", en: "What preparation is needed for a keynote?", ru: "Какая подготовка нужна для ки-ноута?" },
    answer: {
      de: "Vor jeder Keynote führt Anatoly Mook ein ausführliches Briefing-Gespräch mit den Veranstaltern. Dabei werden Zielgruppe, Kontext der Veranstaltung, gewünschte Botschaften und technische Anforderungen besprochen. Auf Basis dieses Briefings wird die Keynote individuell angepasst. Als Veranstalter sollten Sie Informationen zu Publikum, Anlass und technischer Ausstattung bereitstellen. Einen Technik-Check empfehlen wir am Vortag oder am Veranstaltungstag selbst.",
      en: "Before every keynote, Anatoly Mook conducts a detailed briefing conversation with the organizers. This covers the target audience, event context, desired messages, and technical requirements. Based on this briefing, the keynote is individually customized. As an organizer, you should provide information about the audience, occasion, and technical equipment. We recommend a technical check the day before or on the event day itself.",
      ru: "Перед каждым ки-ноутом Анатолий Мук проводит подробный брифинг с организаторами. Обсуждаются целевая аудитория, контекст мероприятия, желаемые послания и технические требования. На основе брифинга ки-ноут индивидуально адаптируется. Как организатору вам следует предоставить информацию об аудитории, поводе и техническом оснащении. Технический тест рекомендуется за день до мероприятия."
    },
    category: "keynotes",
    relatedServices: ["keynotes", "booking"],
    relatedFaqs: ["keynote-buchen", "keynote-themen"]
  },
  {
    slug: "keynote-beispiel",
    question: { de: "Kann ich eine Keynote vorab sehen?", en: "Can I see a sample keynote?", ru: "Можно ли увидеть пример ки-ноута?" },
    answer: {
      de: "Ja, auf Anfrage stellen wir ein Showreel mit Ausschnitten vergangener Keynotes zur Verfügung. Auf unserer Website finden Sie zudem kurze Videoausschnitte und Referenzen von bisherigen Veranstaltungen. Für größere Buchungen bieten wir auch ein persönliches Vorgespräch an, in dem Anatoly Mook seinen Stil und Ansatz vorstellt. So können Sie sich vorab ein Bild machen und sicherstellen, dass der Vortrag zu Ihrer Veranstaltung passt.",
      en: "Yes, upon request we provide a showreel with excerpts from past keynotes. On our website, you will also find short video clips and references from previous events. For larger bookings, we also offer a personal preliminary conversation where Anatoly Mook presents his style and approach. This way, you can get an impression in advance and ensure the presentation fits your event.",
      ru: "Да, по запросу мы предоставляем шоурил с фрагментами прошлых ки-ноутов. На сайте также доступны короткие видеоклипы и отзывы о прошедших мероприятиях. Для крупных бронирований предлагаем личную предварительную беседу, где Анатолий Мук представляет свой стиль и подход. Так вы сможете заранее составить впечатление и убедиться, что выступление подходит вашему мероприятию."
    },
    category: "keynotes",
    relatedServices: ["keynotes"],
    relatedFaqs: ["keynote-buchen", "keynote-dauer-und-format"]
  },
  {
    slug: "keynote-publikumsgroesse",
    question: { de: "Für welche Publikumsgrößen eignen sich die Keynotes?", en: "What size audiences are keynotes suitable for?", ru: "Для какого размера аудитории подходят ки-ноуты?" },
    answer: {
      de: "Anatoly Mook spricht vor Publikumsgrößen von 20 bis über 2000 Personen. Für kleinere Gruppen werden interaktivere Formate gewählt, die intensive Teilnahme ermöglichen. Bei größeren Veranstaltungen wird der Vortrag durch visuelle Elemente und digitale Interaktionsmöglichkeiten ergänzt. Unabhängig von der Größe zeichnet sich jede Keynote durch persönliche Ansprache und die Fähigkeit aus, sowohl den einzelnen Zuhörer als auch das gesamte Publikum zu erreichen.",
      en: "Anatoly Mook speaks to audiences ranging from 20 to over 2000 people. For smaller groups, more interactive formats are chosen that enable intensive participation. For larger events, the presentation is supplemented with visual elements and digital interaction options. Regardless of size, every keynote is characterized by personal address and the ability to reach both individual listeners and the entire audience.",
      ru: "Анатолий Мук выступает перед аудиторией от 20 до более 2000 человек. Для небольших групп выбираются более интерактивные форматы с интенсивным участием. На крупных мероприятиях доклад дополняется визуальными элементами и цифровыми возможностями взаимодействия. Независимо от размера каждый ки-ноут отличается личным обращением и способностью достигать каждого слушателя."
    },
    category: "keynotes",
    relatedServices: ["keynotes"],
    relatedFaqs: ["keynote-fuer-konferenzen", "keynote-dauer-und-format"]
  },
  {
    slug: "parkplatz-unna",
    question: { de: "Gibt es Parkplätze am Standort in Unna?", en: "Is there parking at the Unna location?", ru: "Есть ли парковка у офиса в Унне?" },
    answer: {
      de: "Ja, in unmittelbarer Nähe unseres Standorts in der Ackerstraße 56 in Unna stehen ausreichend kostenlose Parkmöglichkeiten zur Verfügung. Für Anreisende mit öffentlichen Verkehrsmitteln ist der Standort gut vom Bahnhof Unna aus erreichbar. Detaillierte Anfahrtsbeschreibungen mit Karte erhalten Sie bei der Terminbestätigung. Bei Seminaren an anderen Standorten informieren wir Sie vorab über die Parksituation vor Ort.",
      en: "Yes, ample free parking is available in the immediate vicinity of our location at Ackerstraße 56 in Unna. For those arriving by public transportation, the location is easily accessible from Unna train station. Detailed directions with a map are provided with the appointment confirmation. For seminars at other locations, we inform you about the parking situation in advance.",
      ru: "Да, в непосредственной близости от нашего офиса на Ackerstraße 56 в Унне достаточно бесплатных парковочных мест. Для приезжающих общественным транспортом локация легко доступна от вокзала Унны. Подробное описание маршрута с картой предоставляется при подтверждении встречи. Для семинаров в других местах мы заранее информируем о парковочной ситуации."
    },
    category: "praktisch",
    relatedServices: ["coaching", "seminare"],
    relatedFaqs: ["online-oder-vor-ort", "wo-finden-seminare-statt"]
  },
  {
    slug: "kreditkartenzahlung",
    question: { de: "Kann ich mit Kreditkarte bezahlen?", en: "Can I pay with credit card?", ru: "Можно ли оплатить кредитной картой?" },
    answer: {
      de: "Die Zahlung erfolgt in der Regel per Banküberweisung oder auf Rechnung. Für internationale Klienten bieten wir zusätzliche Zahlungsmöglichkeiten an. Bei Seminarbuchungen über die Website stehen je nach Anbieter verschiedene Zahlungsmethoden zur Verfügung. Für Unternehmen stellen wir ordnungsgemäße Rechnungen mit ausgewiesener MwSt. aus. Kontaktieren Sie uns gerne, wenn Sie eine bestimmte Zahlungsmethode bevorzugen, und wir finden eine passende Lösung.",
      en: "Payment is typically made by bank transfer or invoice. For international clients, we offer additional payment options. For seminar bookings through the website, various payment methods are available depending on the provider. For companies, we issue proper invoices with VAT. Please contact us if you prefer a specific payment method, and we will find a suitable solution.",
      ru: "Оплата обычно производится банковским переводом или по счёту. Для международных клиентов предлагаются дополнительные варианты оплаты. При бронировании семинаров через сайт доступны различные методы оплаты. Для компаний выставляются надлежащие счета с НДС. Свяжитесь с нами, если предпочитаете определённый способ оплаты, и мы найдём подходящее решение."
    },
    category: "kosten",
    relatedServices: ["booking"],
    relatedFaqs: ["zahlung-und-rechnung", "was-kostet-coaching"]
  },
  {
    slug: "corporate-mengenrabatte",
    question: { de: "Gibt es Mengenrabatte für Unternehmen?", en: "Are there corporate volume discounts?", ru: "Есть ли корпоративные скидки за объём?" },
    answer: {
      de: "Ja, für umfangreiche Corporate-Programme bieten wir attraktive Konditionen, die sich nach Umfang, Dauer und Teilnehmerzahl richten. Mehrjährige Partnerschaften und Programme, die verschiedene Formate kombinieren, profitieren von besonders vorteilhaften Konditionen. Jedes Angebot wird individuell kalkuliert, um das beste Preis-Leistungs-Verhältnis zu gewährleisten. Im Briefing-Gespräch erstellen wir ein transparentes Angebot, das zu Ihrem Budget und Ihren Zielen passt.",
      en: "Yes, for comprehensive corporate programs we offer attractive terms based on scope, duration, and number of participants. Multi-year partnerships and programs combining various formats benefit from particularly favorable conditions. Each offer is individually calculated to ensure the best value. In the briefing conversation, we create a transparent offer that fits your budget and goals.",
      ru: "Да, для масштабных корпоративных программ мы предлагаем привлекательные условия, зависящие от объёма, продолжительности и числа участников. Многолетние партнёрства и программы, сочетающие различные форматы, получают особо выгодные условия. Каждое предложение калькулируется индивидуально для оптимального соотношения цены и качества. На брифинге создаётся прозрачное предложение под ваш бюджет и цели."
    },
    category: "kosten",
    relatedServices: ["corporate"],
    relatedFaqs: ["corporate-programme-details", "zahlung-und-rechnung"]
  },
  {
    slug: "stornierung-corporate",
    question: { de: "Wie sind die Stornierungsbedingungen für Corporate-Events?", en: "What is the cancellation policy for corporate events?", ru: "Какова политика отмены корпоративных мероприятий?" },
    answer: {
      de: "Für Corporate-Events gelten individuelle Stornierungsbedingungen, die im Vertrag festgelegt werden. In der Regel ist eine kostenlose Stornierung bis 30 Tage vor dem vereinbarten Termin möglich. Bei kurzfristiger Absage fallen gestaffelte Ausfallgebühren an. Terminverschiebungen sind in Absprache flexibler möglich. Alle Konditionen werden transparent im Angebot kommuniziert, sodass Sie von Anfang an Planungssicherheit haben.",
      en: "Corporate events have individual cancellation terms defined in the contract. Generally, free cancellation is possible up to 30 days before the agreed date. For short-notice cancellations, graduated cancellation fees apply. Rescheduling is more flexibly possible by arrangement. All terms are transparently communicated in the offer, giving you planning certainty from the start.",
      ru: "Для корпоративных мероприятий действуют индивидуальные условия отмены, зафиксированные в договоре. Обычно бесплатная отмена возможна за 30 дней до согласованной даты. При поздней отмене применяются ступенчатые сборы. Перенос сроков возможен гибче по договорённости. Все условия прозрачно сообщаются в предложении, обеспечивая вам уверенность в планировании."
    },
    category: "corporate",
    relatedServices: ["corporate", "booking"],
    relatedFaqs: ["corporate-programme-details", "stornierung-und-umbuchung"]
  },
  {
    slug: "corporate-programmstart",
    question: { de: "Wie schnell kann ein Corporate-Programm starten?", en: "How soon can a corporate program start?", ru: "Как быстро может начаться корпоративная программа?" },
    answer: {
      de: "Nach dem initialen Briefing und der Bedarfsanalyse kann ein Corporate-Programm in der Regel innerhalb von zwei bis vier Wochen starten. Für dringende Anliegen bieten wir beschleunigte Prozesse an. Die Vorlaufzeit hängt von der Komplexität des Programms und der Verfügbarkeit aller Beteiligten ab. Einfachere Formate wie eine einzelne Keynote oder ein Workshop lassen sich auch kurzfristiger realisieren.",
      en: "After the initial briefing and needs analysis, a corporate program can typically start within two to four weeks. For urgent matters, we offer accelerated processes. Lead time depends on the complexity of the program and availability of all participants. Simpler formats such as a single keynote or workshop can be realized on shorter notice.",
      ru: "После начального брифинга и анализа потребностей корпоративная программа обычно может стартовать в течение двух-четырёх недель. Для срочных запросов предлагаем ускоренные процессы. Время подготовки зависит от сложности программы и доступности всех участников. Более простые форматы, такие как отдельный ки-ноут или воркшоп, реализуются и в более сжатые сроки."
    },
    category: "corporate",
    relatedServices: ["corporate", "booking"],
    relatedFaqs: ["corporate-bedarfsanalyse", "corporate-programme-details"]
  },
  {
    slug: "einzigartigkeit-coaching-ansatz",
    question: { de: "Was macht den Coaching-Ansatz einzigartig?", en: "What makes the coaching approach unique?", ru: "Что делает коучинг-подход уникальным?" },
    answer: {
      de: "Der Ansatz von Anatoly Mook ist einzigartig durch die Verbindung von Tiefe und Pragmatismus. Statt an der Oberfläche zu bleiben, arbeiten wir auf der Ebene von Bewusstsein und Identität, wo echte Transformation stattfindet. Gleichzeitig ist jeder Schritt auf messbare Ergebnisse ausgerichtet. Die dreisprachige Arbeit, die Integration verschiedener Methoden und die Verbindung von östlicher Weisheit mit westlicher Führungspraxis machen den Ansatz besonders wirkungsvoll.",
      en: "Anatoly Mook's approach is unique through the combination of depth and pragmatism. Instead of staying on the surface, we work at the level of consciousness and identity where real transformation occurs. At the same time, every step is oriented toward measurable results. The trilingual work, integration of various methods, and connection of Eastern wisdom with Western leadership practice make the approach particularly effective.",
      ru: "Подход Анатолия Мука уникален сочетанием глубины и прагматизма. Вместо работы на поверхности мы действуем на уровне сознания и идентичности, где происходит настоящая трансформация. При этом каждый шаг направлен на измеримые результаты. Трёхъязычная работа, интеграция различных методов и связь восточной мудрости с западной практикой лидерства делают подход особенно действенным."
    },
    category: "allgemein",
    relatedServices: ["coaching", "transformation"],
    relatedFaqs: ["was-unterscheidet-anatoly-mook", "was-ist-bewusste-fuehrung"]
  },
  {
    slug: "bereitschaft-transformation",
    question: { de: "Wie erkenne ich, dass ich bereit für Transformation bin?", en: "How do I know if I am ready for transformation?", ru: "Как понять, что я готов к трансформации?" },
    answer: {
      de: "Typische Zeichen sind eine wachsende Unzufriedenheit mit dem Status quo, das Gefühl, dass es mehr geben muss, wiederkehrende Muster, die Sie verändern möchten, oder der Wunsch nach tieferer Klarheit und Authentizität. Die Bereitschaft zeigt sich oft in der Offenheit, sich ehrlich mit sich selbst auseinanderzusetzen. Sie müssen nicht alles wissen oder können — Sie müssen nur bereit sein, sich auf den Prozess einzulassen. Ein Erstgespräch kann helfen, Ihre Bereitschaft gemeinsam zu reflektieren.",
      en: "Typical signs include growing dissatisfaction with the status quo, the feeling that there must be more, recurring patterns you want to change, or the desire for deeper clarity and authenticity. Readiness often shows in openness to honestly engage with yourself. You do not need to know or be able to do everything — you just need to be willing to engage in the process. An initial consultation can help reflect on your readiness together.",
      ru: "Типичные признаки: растущая неудовлетворённость текущим положением, чувство, что должно быть нечто большее, повторяющиеся паттерны, которые хочется изменить, или желание более глубокой ясности. Готовность часто проявляется в открытости к честной работе с собой. Вам не нужно всё знать или уметь — достаточно быть готовым включиться в процесс. Первичная консультация поможет совместно оценить вашу готовность."
    },
    category: "allgemein",
    relatedServices: ["coaching", "transformation"],
    relatedFaqs: ["was-ist-transformation", "wie-funktioniert-erstgespraech"]
  },
  {
    slug: "rolle-achtsamkeit",
    question: { de: "Welche Rolle spielt Achtsamkeit im Coaching?", en: "What role does mindfulness play?", ru: "Какую роль играет осознанность в коучинге?" },
    answer: {
      de: "Achtsamkeit ist ein zentrales Element in Anatoly Mooks Arbeit. Sie bildet die Grundlage für Selbstkenntnis, klare Wahrnehmung und bewusste Entscheidungen. Im Coaching werden Achtsamkeitstechniken eingesetzt, um Klienten zu helfen, ihre automatischen Reaktionsmuster zu erkennen und bewusstere Alternativen zu entwickeln. Dabei geht es nicht um esoterische Praktiken, sondern um wissenschaftlich fundierte Methoden, die nachweislich Fokus, Stressresistenz und Entscheidungsqualität verbessern.",
      en: "Mindfulness is a central element in Anatoly Mook's work. It forms the foundation for self-knowledge, clear perception, and conscious decisions. In coaching, mindfulness techniques are used to help clients recognize their automatic reaction patterns and develop more conscious alternatives. This is not about esoteric practices but about scientifically grounded methods that demonstrably improve focus, stress resistance, and decision quality.",
      ru: "Осознанность — центральный элемент в работе Анатолия Мука. Она составляет основу самопознания, ясного восприятия и осознанных решений. В коучинге техники осознанности помогают клиентам распознавать автоматические паттерны реакций и развивать более осознанные альтернативы. Речь не об эзотерических практиках, а о научно обоснованных методах, доказанно улучшающих фокус, стрессоустойчивость и качество решений."
    },
    category: "coaching",
    relatedServices: ["coaching", "seminare"],
    relatedFaqs: ["ist-das-esoterisch", "was-ist-bewusste-fuehrung"]
  },
  {
    slug: "coaching-bei-burnout",
    question: { de: "Kann Coaching bei Burnout helfen?", en: "Can coaching help with burnout?", ru: "Может ли коучинг помочь при выгорании?" },
    answer: {
      de: "Coaching kann sowohl präventiv als auch begleitend bei Burnout-Themen wirken. In der Prävention hilft es, Stressmuster zu erkennen, gesunde Grenzen zu setzen und nachhaltige Arbeitsweisen zu entwickeln. Bei bereits aufgetretenem Burnout kann Coaching den Genesungsprozess unterstützen — ergänzend zu medizinischer oder therapeutischer Betreuung. Anatoly Mook hilft Klienten, die tieferliegenden Ursachen zu verstehen und eine neue Balance zwischen Leistung und Wohlbefinden zu finden.",
      en: "Coaching can work both preventively and supportively on burnout topics. In prevention, it helps recognize stress patterns, set healthy boundaries, and develop sustainable work practices. When burnout has already occurred, coaching can support the recovery process — complementary to medical or therapeutic care. Anatoly Mook helps clients understand the deeper causes and find a new balance between performance and well-being.",
      ru: "Коучинг может работать как превентивно, так и поддерживающе при теме выгорания. В профилактике он помогает распознавать стресс-паттерны, устанавливать здоровые границы и развивать устойчивые рабочие привычки. При уже наступившем выгорании коучинг поддерживает процесс восстановления — дополнительно к медицинской помощи. Анатолий Мук помогает клиентам понять глубинные причины и найти новый баланс между результативностью и благополучием."
    },
    category: "coaching",
    relatedServices: ["coaching"],
    relatedFaqs: ["coaching-und-therapie", "fuer-wen-ist-das-angebot"]
  },
  {
    slug: "langfristige-unterstuetzung",
    question: { de: "Welche langfristige Unterstützung gibt es?", en: "What long-term support is available?", ru: "Какая долгосрочная поддержка доступна?" },
    answer: {
      de: "Nach Abschluss eines Coaching-Prozesses bietet Anatoly Mook verschiedene Möglichkeiten der langfristigen Begleitung: regelmäßige Auffrischungssessions in größeren Abständen, Zugang zum Alumni-Netzwerk, exklusive Veranstaltungen und digitale Ressourcen. Viele Klienten wechseln nach dem intensiven Coaching in ein leichteres Format mit vierteljährlichen Check-ins. So bleibt die Verbindung bestehen und Sie haben einen vertrauten Sparring-Partner, wenn neue Herausforderungen auftreten.",
      en: "After completing a coaching process, Anatoly Mook offers various long-term support options: regular refresher sessions at longer intervals, access to the alumni network, exclusive events, and digital resources. Many clients transition from intensive coaching to a lighter format with quarterly check-ins. This maintains the connection and ensures you have a trusted sparring partner when new challenges arise.",
      ru: "После завершения коучинг-процесса Анатолий Мук предлагает различные варианты долгосрочной поддержки: регулярные обновляющие сессии с большими интервалами, доступ к сети выпускников, эксклюзивные мероприятия и цифровые ресурсы. Многие клиенты переходят от интенсивного коучинга к более лёгкому формату с ежеквартальными встречами. Это поддерживает связь и обеспечивает наличие доверенного партнёра при новых вызовах."
    },
    category: "ergebnisse",
    relatedServices: ["coaching", "resources"],
    relatedFaqs: ["langfristige-wirkung", "nachhaltige-veraenderung"]
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
