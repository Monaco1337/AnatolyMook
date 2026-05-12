export interface TestimonialEntry {
  slug: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  text: { de: string; en: string; ru: string };
  rating: number;
  date: string;
  services: string[];
  topics: string[];
}

export const testimonials: TestimonialEntry[] = [
  // ─── Technology (5) ────────────────────────────────────────────────
  {
    slug: "dr-michael-schmidt",
    name: "Dr. Michael Schmidt",
    role: "CTO",
    company: "NovaTech Solutions GmbH",
    industry: "Technology",
    text: {
      de: "Bevor ich mit Anatoly Mook arbeitete, war ich in einem Kreislauf aus reaktiven Entscheidungen gefangen. Trotz meiner technischen Expertise fehlte mir die Klarheit, mein Führungsteam strategisch auszurichten. Durch das Coaching lernte ich, innezuhalten und bewusst zu führen statt nur zu reagieren. Innerhalb von sechs Monaten reduzierten wir unsere Entscheidungszyklen um 40 Prozent. Mein Team berichtet von deutlich mehr Vertrauen in meine Führung. Die Methoden sind pragmatisch, messbar und haben unsere gesamte Führungskultur transformiert. Ich empfehle Anatoly jedem, der Klarheit in komplexen Strukturen sucht.",
      en: "Before working with Anatoly Mook, I was trapped in a cycle of reactive decision-making. Despite my technical expertise, I lacked the clarity to strategically align my leadership team. Through coaching, I learned to pause and lead consciously rather than just reacting. Within six months, we reduced our decision cycles by 40 percent. My team reports significantly more trust in my leadership. The methods are pragmatic, measurable, and have transformed our entire leadership culture. I recommend Anatoly to anyone seeking clarity in complex structures.",
      ru: "До работы с Анатолием Муком я был в замкнутом круге реактивных решений. Несмотря на техническую экспертизу, мне не хватало ясности для стратегического выстраивания команды руководителей. Благодаря коучингу я научился останавливаться и вести осознанно, а не просто реагировать. За шесть месяцев мы сократили циклы принятия решений на 40 процентов. Команда отмечает значительно больше доверия к моему руководству. Методы прагматичны, измеримы и трансформировали всю нашу культуру лидерства. Рекомендую Анатолия всем, кто ищет ясность в сложных структурах."
    },
    rating: 5,
    date: "2024-03-15",
    services: ["coaching", "corporate"],
    topics: ["bewusste-fuehrung", "entscheidungsstaerke", "klarheit"]
  },
  {
    slug: "katarina-meier",
    name: "Katarina Meier",
    role: "VP Engineering",
    company: "CloudBridge AG",
    industry: "Technology",
    text: {
      de: "Als VP Engineering leitete ich über 120 Entwickler, aber die ständigen Konflikte zwischen Teams lähmten unsere Produktivität. Anatoly half mir, meine eigene Führungsklarheit zu schärfen und diese auf die Teamdynamik zu übertragen. Wir entwickelten ein Framework für bewusste Teamführung, das heute fester Bestandteil unserer Unternehmenskultur ist. Die Mitarbeiterzufriedenheit stieg um 35 Prozent, und unsere Delivery-Rate verbesserte sich messbar. Was mich am meisten beeindruckt hat: Anatoly verbindet Tiefe mit Pragmatismus. Keine leeren Phrasen, sondern konkrete Werkzeuge für den Führungsalltag.",
      en: "As VP Engineering, I led over 120 developers, but constant conflicts between teams were paralyzing our productivity. Anatoly helped me sharpen my own leadership clarity and transfer it to team dynamics. We developed a framework for conscious team leadership that is now an integral part of our corporate culture. Employee satisfaction increased by 35 percent, and our delivery rate improved measurably. What impressed me most: Anatoly combines depth with pragmatism. No empty phrases, just concrete tools for everyday leadership.",
      ru: "Как вице-президент по инженерии, я руководила более чем 120 разработчиками, но постоянные конфликты между командами парализовали продуктивность. Анатолий помог мне отточить собственную ясность руководства и перенести её на командную динамику. Мы разработали фреймворк осознанного командного лидерства, который стал неотъемлемой частью корпоративной культуры. Удовлетворённость сотрудников выросла на 35 процентов, а скорость поставки заметно улучшилась. Что впечатлило больше всего: Анатолий сочетает глубину с прагматизмом. Никаких пустых фраз — только конкретные инструменты для повседневного руководства."
    },
    rating: 5,
    date: "2024-06-22",
    services: ["coaching", "seminare"],
    topics: ["teamfuehrung", "klarheit", "bewusste-fuehrung"]
  },
  {
    slug: "thomas-wenger",
    name: "Thomas Wenger",
    role: "CEO",
    company: "DigitalForge Schweiz",
    industry: "Technology",
    text: {
      de: "Nach dem rasanten Wachstum unseres Startups zum Scale-up fehlte mir als Gründer die Klarheit für die nächste Phase. Die Keynote von Anatoly bei unserem Offsite war der Wendepunkt. Danach buchten wir das Transformationsprogramm für das gesamte Führungsteam. Jeder Einzelne hat seine Entscheidungsstärke spürbar verbessert. Wir treffen heute mutigere, klarere Entscheidungen — und stehen gemeinsam dahinter. Unser Umsatz wuchs im Folgejahr um 60 Prozent, und ich bin überzeugt, dass die gewonnene Führungsklarheit daran einen entscheidenden Anteil hat.",
      en: "After our startup's rapid growth into a scale-up, I lacked clarity as a founder for the next phase. Anatoly's keynote at our offsite was the turning point. Afterward, we booked the transformation program for the entire leadership team. Every single person noticeably improved their decision-making strength. Today we make bolder, clearer decisions — and stand behind them together. Our revenue grew by 60 percent the following year, and I'm convinced that the leadership clarity we gained played a decisive role.",
      ru: "После стремительного роста нашего стартапа до масштабной компании мне как основателю не хватало ясности для следующего этапа. Выступление Анатолия на нашем выездном мероприятии стало поворотным моментом. После него мы заказали программу трансформации для всей команды руководителей. Каждый ощутимо улучшил свою способность принимать решения. Сегодня мы принимаем более смелые и чёткие решения — и стоим за ними вместе. Наша выручка выросла на 60 процентов в следующем году, и я убеждён, что обретённая ясность лидерства сыграла в этом решающую роль."
    },
    rating: 5,
    date: "2025-01-10",
    services: ["keynotes", "transformation"],
    topics: ["entscheidungsstaerke", "klarheit", "persoenliche-meisterschaft"]
  },
  {
    slug: "lisa-gruenwald",
    name: "Lisa Grünwald",
    role: "Head of Product",
    company: "SynthAI Labs",
    industry: "Technology",
    text: {
      de: "In der schnelllebigen KI-Branche fühlte ich mich oft getrieben statt führend. Anatoly Mooks Seminar zur persönlichen Meisterschaft gab mir die Werkzeuge, um in Unsicherheit ruhig und klar zu bleiben. Ich lernte, Prioritäten nicht nur rational, sondern auch intuitiv richtig zu setzen. Meine Produktentscheidungen wurden fundierter und schneller. Das Team spürt den Unterschied: weniger Hektik, mehr Fokus, bessere Ergebnisse. Drei Produktlaunches in Folge über Plan — das spricht für sich. Anatoly versteht die Herausforderungen moderner Führung wie kaum ein anderer.",
      en: "In the fast-paced AI industry, I often felt driven rather than leading. Anatoly Mook's seminar on personal mastery gave me the tools to remain calm and clear amid uncertainty. I learned to set priorities not just rationally but also intuitively. My product decisions became more informed and faster. The team feels the difference: less hectic energy, more focus, better results. Three consecutive product launches above plan — that speaks for itself. Anatoly understands the challenges of modern leadership like few others.",
      ru: "В стремительной индустрии ИИ я часто чувствовала себя ведомой, а не ведущей. Семинар Анатолия Мука по личному мастерству дал мне инструменты, чтобы оставаться спокойной и ясной в условиях неопределённости. Я научилась расставлять приоритеты не только рационально, но и интуитивно верно. Мои продуктовые решения стали более обоснованными и быстрыми. Команда чувствует разницу: меньше суеты, больше фокуса, лучше результаты. Три запуска продуктов подряд с превышением плана — это говорит само за себя. Анатолий понимает вызовы современного лидерства как мало кто другой."
    },
    rating: 5,
    date: "2024-09-05",
    services: ["seminare", "coaching"],
    topics: ["persoenliche-meisterschaft", "klarheit", "entscheidungsstaerke"]
  },
  {
    slug: "markus-hofer",
    name: "Markus Hofer",
    role: "IT-Direktor",
    company: "Alpina Digital",
    industry: "Technology",
    text: {
      de: "Die digitale Transformation unseres Traditionsunternehmens war ein Mammutprojekt mit enormem Widerstand. Anatoly begleitete uns durch den gesamten Change-Prozess. Seine Fähigkeit, Klarheit in chaotische Situationen zu bringen, war entscheidend. Er half mir, Resilienz aufzubauen und mein Team durch Unsicherheit zu führen. Nach 18 Monaten ist die Transformation abgeschlossen und die Ergebnisse übertreffen unsere Erwartungen. Die Mitarbeiterfluktuation sank um 25 Prozent, weil die Menschen wieder Sinn und Richtung in ihrer Arbeit sehen. Anatoly ist kein Coach, der nur redet — er liefert.",
      en: "The digital transformation of our traditional company was a mammoth project with enormous resistance. Anatoly accompanied us through the entire change process. His ability to bring clarity to chaotic situations was decisive. He helped me build resilience and lead my team through uncertainty. After 18 months, the transformation is complete, and results exceed our expectations. Employee turnover dropped by 25 percent because people see meaning and direction in their work again. Anatoly is not a coach who just talks — he delivers.",
      ru: "Цифровая трансформация нашей традиционной компании была масштабным проектом с колоссальным сопротивлением. Анатолий сопровождал нас через весь процесс изменений. Его способность вносить ясность в хаотичные ситуации была решающей. Он помог мне развить устойчивость и провести команду через неопределённость. Через 18 месяцев трансформация завершена, и результаты превосходят ожидания. Текучесть кадров снизилась на 25 процентов, потому что люди снова видят смысл и направление в своей работе. Анатолий — не коуч, который просто говорит, — он даёт результат."
    },
    rating: 5,
    date: "2025-02-18",
    services: ["transformation", "coaching", "corporate"],
    topics: ["change-management", "resilienz", "klarheit"]
  },

  // ─── Healthcare (3) ────────────────────────────────────────────────
  {
    slug: "prof-dr-anna-berger",
    name: "Prof. Dr. Anna Berger",
    role: "Ärztliche Direktorin",
    company: "Universitätsklinikum Freiburg",
    industry: "Healthcare",
    text: {
      de: "Als Ärztliche Direktorin trage ich Verantwortung für tausende Mitarbeitende und Patienten. Der Druck war erdrückend, und ich merkte, dass ich in einen Autopilot-Modus verfallen war. Anatoly Mooks Coaching brachte mich zurück zu bewusster Führung. Ich lernte, auch unter extremem Druck klare Entscheidungen zu treffen und mein Team mit Ruhe statt Hektik zu führen. Die Patientenzufriedenheit stieg, die Fehlerquote sank, und mein persönliches Wohlbefinden verbesserte sich drastisch. Seine Methoden sind evidenzbasiert und sofort anwendbar — genau das, was wir im Gesundheitswesen brauchen.",
      en: "As Medical Director, I bear responsibility for thousands of employees and patients. The pressure was overwhelming, and I noticed I had fallen into autopilot mode. Anatoly Mook's coaching brought me back to conscious leadership. I learned to make clear decisions even under extreme pressure and to lead my team with calm rather than chaos. Patient satisfaction increased, error rates dropped, and my personal well-being improved drastically. His methods are evidence-based and immediately applicable — exactly what we need in healthcare.",
      ru: "Как медицинский директор, я несу ответственность за тысячи сотрудников и пациентов. Давление было невыносимым, и я заметила, что перешла в режим автопилота. Коучинг Анатолия Мука вернул меня к осознанному руководству. Я научилась принимать чёткие решения даже под экстремальным давлением и вести команду со спокойствием, а не в суете. Удовлетворённость пациентов выросла, частота ошибок снизилась, а моё личное самочувствие кардинально улучшилось. Его методы основаны на доказательствах и сразу применимы — именно то, что нужно в здравоохранении."
    },
    rating: 5,
    date: "2024-04-28",
    services: ["coaching", "seminare"],
    topics: ["bewusste-fuehrung", "entscheidungsstaerke", "resilienz"]
  },
  {
    slug: "stefan-lang",
    name: "Stefan Lang",
    role: "Geschäftsführer",
    company: "MedVita Kliniken",
    industry: "Healthcare",
    text: {
      de: "Unsere Klinikgruppe stand vor massiven Herausforderungen: Fachkräftemangel, steigende Kosten, sinkende Moral. Ich suchte nach einem Ansatz, der über klassisches Management hinausgeht. Anatoly Mooks Corporate-Programm für unser gesamtes Führungsteam war die beste Investition des Jahres. Die Führungskräfte entwickelten eine gemeinsame Sprache für bewusste Führung. Entscheidungen werden heute schneller und mit mehr Überzeugung getroffen. Die Krankheitsquote im Management sank um 30 Prozent. Anatoly hat eine seltene Gabe: Er macht komplexe Führungsthemen greifbar und umsetzbar.",
      en: "Our clinic group faced massive challenges: skills shortage, rising costs, declining morale. I was looking for an approach that goes beyond classic management. Anatoly Mook's corporate program for our entire leadership team was the best investment of the year. Leaders developed a shared language for conscious leadership. Decisions are now made faster and with more conviction. Management sick leave dropped by 30 percent. Anatoly has a rare gift: he makes complex leadership topics tangible and actionable.",
      ru: "Наша группа клиник столкнулась с масштабными вызовами: нехватка кадров, рост затрат, падение морального духа. Я искал подход, который выходит за рамки классического менеджмента. Корпоративная программа Анатолия Мука для всей команды руководителей стала лучшей инвестицией года. Руководители выработали общий язык осознанного лидерства. Решения теперь принимаются быстрее и с большей убеждённостью. Больничные в управленческом звене сократились на 30 процентов. У Анатолия редкий дар: он делает сложные темы лидерства осязаемыми и реализуемыми."
    },
    rating: 5,
    date: "2024-11-12",
    services: ["corporate", "transformation"],
    topics: ["bewusste-fuehrung", "teamfuehrung", "change-management"]
  },
  {
    slug: "dr-elena-fischer",
    name: "Dr. Elena Fischer",
    role: "Leiterin Forschung & Entwicklung",
    company: "BioHeal Therapeutics",
    industry: "Healthcare",
    text: {
      de: "In der Pharmaforschung sind Fehlentscheidungen extrem kostspielig. Ich hatte das Gefühl, unter dem enormen Druck meine Urteilsfähigkeit zu verlieren. Das Einzelcoaching mit Anatoly gab mir Werkzeuge zur Potenzialentfaltung, die ich täglich nutze. Ich kann heute unter Zeitdruck klarere Entscheidungen treffen als je zuvor. Mein Team von 45 Forschern folgt mir mit neuem Vertrauen, weil ich Sicherheit ausstrahle, die echt ist. Zwei unserer Pipeline-Projekte erreichten vorzeitig die nächste Phase. Anatoly versteht, dass echte Führung bei der eigenen Klarheit beginnt.",
      en: "In pharmaceutical research, wrong decisions are extremely costly. I felt I was losing my judgment under enormous pressure. Individual coaching with Anatoly gave me tools for unlocking potential that I use daily. Today I can make clearer decisions under time pressure than ever before. My team of 45 researchers follows me with renewed trust because I radiate confidence that is genuine. Two of our pipeline projects reached the next phase ahead of schedule. Anatoly understands that true leadership begins with one's own clarity.",
      ru: "В фармацевтических исследованиях ошибочные решения обходятся крайне дорого. Я чувствовала, что теряю способность к суждению под колоссальным давлением. Индивидуальный коучинг с Анатолием дал мне инструменты раскрытия потенциала, которые я использую ежедневно. Сегодня я принимаю более ясные решения в условиях дефицита времени, чем когда-либо прежде. Моя команда из 45 исследователей следует за мной с новым доверием, потому что я излучаю уверенность, которая подлинна. Два наших проекта в разработке досрочно вышли на следующий этап. Анатолий понимает, что настоящее лидерство начинается с собственной ясности."
    },
    rating: 5,
    date: "2025-03-01",
    services: ["coaching"],
    topics: ["potenzialentfaltung", "entscheidungsstaerke", "klarheit"]
  },

  // ─── Finance (4) ───────────────────────────────────────────────────
  {
    slug: "christian-baumann",
    name: "Christian Baumann",
    role: "Vorstandsmitglied",
    company: "Helvetia Privatbank",
    industry: "Finance",
    text: {
      de: "Im Bankwesen ist Vertrauen alles — und Vertrauen beginnt mit klarer Führung. Nach einer turbulenten Marktphase spürte ich, dass unser Vorstand an Entscheidungsstärke verloren hatte. Anatoly Mooks Seminar für unser Führungsgremium war ein Katalysator. Wir lernten, kollektiv klarere Entscheidungen zu treffen und Verantwortung bewusst zu teilen. Die Qualität unserer strategischen Beschlüsse verbesserte sich spürbar. Unsere Kunden bemerkten den Unterschied in unserer Beratung. Anatoly bringt eine seltene Kombination aus intellektueller Tiefe und praktischer Anwendbarkeit mit. Ein echter Gewinn für jedes Führungsgremium.",
      en: "In banking, trust is everything — and trust starts with clear leadership. After a turbulent market phase, I felt our board had lost decisiveness. Anatoly Mook's seminar for our leadership board was a catalyst. We learned to make clearer collective decisions and share responsibility consciously. The quality of our strategic resolutions improved noticeably. Our clients noticed the difference in our advisory services. Anatoly brings a rare combination of intellectual depth and practical applicability. A true asset for any leadership board.",
      ru: "В банковском деле доверие — это всё, а доверие начинается с ясного руководства. После турбулентной рыночной фазы я чувствовал, что наш совет директоров утратил решительность. Семинар Анатолия Мука для нашего руководящего органа стал катализатором. Мы научились принимать более ясные коллективные решения и осознанно разделять ответственность. Качество наших стратегических решений заметно улучшилось. Клиенты отметили разницу в нашем консультировании. Анатолий привносит редкое сочетание интеллектуальной глубины и практической применимости. Настоящее приобретение для любого руководящего органа."
    },
    rating: 5,
    date: "2024-05-17",
    services: ["seminare", "corporate"],
    topics: ["entscheidungsstaerke", "bewusste-fuehrung", "klarheit"]
  },
  {
    slug: "maria-kowalski",
    name: "Maria Kowalski",
    role: "Head of Risk Management",
    company: "Frankfurt Capital Partners",
    industry: "Finance",
    text: {
      de: "Risikomanagement verlangt ständige Wachsamkeit und klare Urteile. Ich war an einem Punkt, an dem die Dauerbelastung meine Entscheidungsqualität beeinträchtigte. Anatoly half mir, Resilienz systematisch aufzubauen. Nicht durch Motivationssprüche, sondern durch konkrete Methoden für den Alltag. Ich entwickelte eine neue Fähigkeit, Risiken nüchtern zu bewerten, ohne in Angst oder Übermut zu verfallen. Mein Team adoptierte diese Herangehensweise, und unsere Risikoanalysen wurden sowohl schneller als auch präziser. Die Geschäftsführung lobte unsere verbesserte Performance ausdrücklich. Anatoly hat mein Verständnis von Führung grundlegend erweitert.",
      en: "Risk management demands constant vigilance and clear judgment. I had reached a point where chronic stress was impairing my decision quality. Anatoly helped me build resilience systematically — not through motivational quotes, but through concrete everyday methods. I developed a new ability to assess risks soberly without falling into fear or overconfidence. My team adopted this approach, and our risk analyses became both faster and more precise. Senior management explicitly praised our improved performance. Anatoly fundamentally expanded my understanding of leadership.",
      ru: "Управление рисками требует постоянной бдительности и ясных суждений. Я достигла точки, когда хроническая нагрузка ухудшала качество моих решений. Анатолий помог мне системно выстроить устойчивость — не мотивационными лозунгами, а конкретными методами на каждый день. Я развила новую способность трезво оценивать риски, не впадая в страх или самоуверенность. Моя команда переняла этот подход, и наши риск-анализы стали и быстрее, и точнее. Высшее руководство отдельно отметило нашу улучшенную работу. Анатолий фундаментально расширил моё понимание лидерства."
    },
    rating: 5,
    date: "2024-08-30",
    services: ["coaching", "seminare"],
    topics: ["resilienz", "entscheidungsstaerke", "klarheit"]
  },
  {
    slug: "andreas-von-thalberg",
    name: "Andreas von Thalberg",
    role: "Managing Director",
    company: "Thalberg Wealth Management",
    industry: "Finance",
    text: {
      de: "Als Inhaber eines Familienunternehmens in der Vermögensverwaltung trage ich Verantwortung für Generationen von Kundenbeziehungen. Die Nachfolgeplanung und Modernisierung überforderten mich zunehmend. Anatoly begleitete mich über zwölf Monate im Einzelcoaching. Er half mir, Klarheit über meine Rolle und meine Werte als Unternehmer zu gewinnen. Heute führe ich mit einer Gelassenheit, die ich zuvor nicht kannte. Die Transformation des Unternehmens läuft, und mein Sohn übernimmt schrittweise Verantwortung mit dem gleichen Führungsverständnis. Eine Investition, die über Generationen wirkt.",
      en: "As owner of a family business in wealth management, I bear responsibility for generations of client relationships. Succession planning and modernization increasingly overwhelmed me. Anatoly accompanied me over twelve months in individual coaching. He helped me gain clarity about my role and values as an entrepreneur. Today I lead with a composure I didn't know before. The company transformation is underway, and my son is gradually taking on responsibility with the same leadership understanding. An investment that pays off across generations.",
      ru: "Как владелец семейного бизнеса в управлении активами, я несу ответственность за поколения клиентских отношений. Планирование преемственности и модернизация всё больше меня перегружали. Анатолий сопровождал меня двенадцать месяцев в индивидуальном коучинге. Он помог мне обрести ясность относительно моей роли и ценностей как предпринимателя. Сегодня я руковожу с хладнокровием, которого раньше не знал. Трансформация компании идёт, и мой сын постепенно берёт на себя ответственность с тем же пониманием лидерства. Инвестиция, которая работает через поколения."
    },
    rating: 5,
    date: "2025-01-25",
    services: ["coaching"],
    topics: ["persoenliche-meisterschaft", "klarheit", "change-management"]
  },
  {
    slug: "sophie-renner",
    name: "Sophie Renner",
    role: "CFO",
    company: "FinSecure AG",
    industry: "Finance",
    text: {
      de: "Als CFO muss ich täglich Entscheidungen mit weitreichenden Konsequenzen treffen. Nach einer Fehlentscheidung, die uns teuer zu stehen kam, suchte ich nach einem Weg, meine Entscheidungsprozesse zu verbessern. Anatoly Mooks Ansatz zur Entscheidungsstärke war genau richtig. Er half mir zu verstehen, wie unbewusste Muster meine Urteile beeinflussten. Heute erkenne ich diese Muster frühzeitig und korrigiere bewusst. Mein CFO-Team hat diese Methodik übernommen, und unsere Finanzplanung ist robuster denn je. Die Fehlerquote in unseren Prognosen sank um 45 Prozent. Klare Empfehlung für jede Führungskraft im Finanzbereich.",
      en: "As CFO, I must make decisions with far-reaching consequences daily. After a costly wrong decision, I looked for a way to improve my decision-making processes. Anatoly Mook's approach to decision strength was exactly right. He helped me understand how unconscious patterns influenced my judgments. Today I recognize these patterns early and correct them consciously. My CFO team adopted this methodology, and our financial planning is more robust than ever. The error rate in our forecasts dropped by 45 percent. Clear recommendation for any leader in finance.",
      ru: "Как финансовый директор, я ежедневно принимаю решения с далеко идущими последствиями. После дорогостоящей ошибки я искала способ улучшить процессы принятия решений. Подход Анатолия Мука к укреплению решимости оказался именно тем, что нужно. Он помог мне понять, как бессознательные паттерны влияли на мои суждения. Сегодня я распознаю эти паттерны на ранней стадии и сознательно корректирую их. Моя финансовая команда переняла эту методологию, и наше финансовое планирование стало надёжнее, чем когда-либо. Частота ошибок в прогнозах снизилась на 45 процентов. Однозначная рекомендация для любого руководителя в финансовой сфере."
    },
    rating: 5,
    date: "2024-12-08",
    services: ["coaching", "seminare"],
    topics: ["entscheidungsstaerke", "bewusste-fuehrung", "persoenliche-meisterschaft"]
  },

  // ─── Education (3) ─────────────────────────────────────────────────
  {
    slug: "prof-martin-keller",
    name: "Prof. Martin Keller",
    role: "Rektor",
    company: "Hochschule Luzern",
    industry: "Education",
    text: {
      de: "Die Leitung einer Hochschule bedeutet, viele Stakeholder mit unterschiedlichsten Interessen zusammenzubringen. Ich suchte nach einem Weg, meine Führungsrolle bewusster zu gestalten. Anatoly Mooks Seminar zur bewussten Führung eröffnete mir völlig neue Perspektiven. Ich lernte, Konflikte nicht zu vermeiden, sondern als Chance für Klarheit zu nutzen. Die Zusammenarbeit im Rektorat verbesserte sich fundamental. Unsere strategische Planung wurde fokussierter, und die Zufriedenheit der Fakultäten stieg messbar. Anatoly versteht die besonderen Herausforderungen im Bildungsbereich und liefert maßgeschneiderte Lösungen statt Standardrezepte.",
      en: "Leading a university means bringing together many stakeholders with diverse interests. I was looking for a way to shape my leadership role more consciously. Anatoly Mook's seminar on conscious leadership opened entirely new perspectives for me. I learned to not avoid conflicts but to use them as opportunities for clarity. Collaboration within the rectorate improved fundamentally. Our strategic planning became more focused, and faculty satisfaction increased measurably. Anatoly understands the unique challenges in education and delivers tailored solutions instead of standard recipes.",
      ru: "Руководство университетом означает объединение множества заинтересованных сторон с самыми разными интересами. Я искал способ более осознанно выстраивать свою роль руководителя. Семинар Анатолия Мука по осознанному лидерству открыл для меня совершенно новые перспективы. Я научился не избегать конфликтов, а использовать их как возможность для ясности. Сотрудничество в ректорате улучшилось фундаментально. Наше стратегическое планирование стало более фокусированным, а удовлетворённость факультетов заметно возросла. Анатолий понимает особые вызовы в сфере образования и предлагает индивидуальные решения вместо стандартных рецептов."
    },
    rating: 5,
    date: "2024-07-14",
    services: ["seminare", "coaching"],
    topics: ["bewusste-fuehrung", "klarheit", "teamfuehrung"]
  },
  {
    slug: "claudia-hartmann",
    name: "Claudia Hartmann",
    role: "Schulleiterin",
    company: "Internationale Schule München",
    industry: "Education",
    text: {
      de: "Als Schulleiterin einer internationalen Schule mit 80 Lehrkräften aus 20 Nationen war die Teamführung meine größte Herausforderung. Kulturelle Unterschiede in der Kommunikation führten zu Missverständnissen und Frustration. Anatoly Mooks Keynote bei unserer Lehrerkonferenz inspirierte das gesamte Kollegium. Im anschließenden Workshop entwickelten wir gemeinsam Leitlinien für bewusste Kommunikation. Die Teamdynamik veränderte sich grundlegend. Konflikte werden heute konstruktiv gelöst, und die Zusammenarbeit ist von gegenseitigem Respekt geprägt. Die Schülerzufriedenheit stieg parallel dazu. Anatoly spricht eine universelle Sprache der Klarheit.",
      en: "As head of an international school with 80 teachers from 20 nations, team leadership was my greatest challenge. Cultural differences in communication led to misunderstandings and frustration. Anatoly Mook's keynote at our teacher conference inspired the entire faculty. In the subsequent workshop, we jointly developed guidelines for conscious communication. Team dynamics changed fundamentally. Conflicts are now resolved constructively, and collaboration is characterized by mutual respect. Student satisfaction rose in parallel. Anatoly speaks a universal language of clarity.",
      ru: "Как директор международной школы с 80 преподавателями из 20 стран, руководство командой было моей главной проблемой. Культурные различия в общении приводили к недопониманию и разочарованию. Выступление Анатолия Мука на нашей учительской конференции вдохновило весь коллектив. На последующем семинаре мы совместно разработали принципы осознанной коммуникации. Командная динамика изменилась фундаментально. Конфликты теперь решаются конструктивно, а сотрудничество основано на взаимном уважении. Удовлетворённость учеников параллельно возросла. Анатолий говорит на универсальном языке ясности."
    },
    rating: 5,
    date: "2024-10-20",
    services: ["keynotes", "seminare"],
    topics: ["teamfuehrung", "bewusste-fuehrung", "klarheit"]
  },
  {
    slug: "dr-rafael-steiner",
    name: "Dr. Rafael Steiner",
    role: "Dekan",
    company: "Wirtschaftsuniversität Wien",
    industry: "Education",
    text: {
      de: "Die akademische Welt ist geprägt von Ego und Konkurrenz. Als Dekan der Wirtschaftsfakultät wollte ich eine Kultur der Zusammenarbeit etablieren, stieß aber auf enormen Widerstand. Anatoly Mooks Transformationsprogramm half mir, zunächst meine eigene Haltung zu klären und dann schrittweise das Kollegium mitzunehmen. Sein Ansatz ist weder konfrontativ noch weich — er ist klar. Diese Klarheit war ansteckend. Heute arbeiten unsere Lehrstühle enger zusammen als je zuvor, und wir haben drei interdisziplinäre Forschungsprojekte gestartet. Die Potenzialentfaltung, die Anatoly ermöglicht, geht weit über individuelle Entwicklung hinaus.",
      en: "The academic world is shaped by ego and competition. As Dean of the Business Faculty, I wanted to establish a culture of collaboration but encountered enormous resistance. Anatoly Mook's transformation program helped me first clarify my own stance and then gradually bring the faculty along. His approach is neither confrontational nor soft — it's clear. This clarity was contagious. Today our departments collaborate more closely than ever, and we've launched three interdisciplinary research projects. The potential unlocking that Anatoly enables goes far beyond individual development.",
      ru: "Академический мир пронизан эго и конкуренцией. Как декан бизнес-факультета, я хотел создать культуру сотрудничества, но встретил колоссальное сопротивление. Программа трансформации Анатолия Мука помогла мне сначала прояснить собственную позицию, а затем постепенно вовлечь коллектив. Его подход не конфронтационный и не мягкий — он ясный. Эта ясность оказалась заразительной. Сегодня наши кафедры сотрудничают теснее, чем когда-либо, и мы запустили три междисциплинарных исследовательских проекта. Раскрытие потенциала, которое обеспечивает Анатолий, выходит далеко за рамки индивидуального развития."
    },
    rating: 5,
    date: "2025-02-05",
    services: ["transformation", "coaching"],
    topics: ["potenzialentfaltung", "teamfuehrung", "change-management"]
  },

  // ─── Manufacturing (2) ─────────────────────────────────────────────
  {
    slug: "hans-georg-mueller",
    name: "Hans-Georg Müller",
    role: "Werksleiter",
    company: "Präzision Maschinenbau GmbH",
    industry: "Manufacturing",
    text: {
      de: "30 Jahre Erfahrung in der Fertigung hatten mich zum Experten gemacht, aber nicht unbedingt zur besten Führungskraft. Mein autoritärer Stil funktionierte nicht mehr mit der neuen Generation von Ingenieuren. Anatoly Mook öffnete mir die Augen für bewusste Führung, ohne dass ich meine Stärken aufgeben musste. Ich lernte, Klarheit mit Empathie zu verbinden. Die Produktionseffizienz stieg um 18 Prozent, nicht durch neue Maschinen, sondern durch bessere Führung. Die Ausschussrate sank auf ein historisches Tief. Mein Team sagt mir heute Dinge, die sie sich früher nie getraut hätten. Das ist unbezahlbar.",
      en: "30 years of manufacturing experience had made me an expert, but not necessarily the best leader. My authoritarian style no longer worked with the new generation of engineers. Anatoly Mook opened my eyes to conscious leadership without requiring me to give up my strengths. I learned to combine clarity with empathy. Production efficiency increased by 18 percent — not through new machines but through better leadership. The scrap rate dropped to a historic low. My team tells me things today they never would have dared before. That's priceless.",
      ru: "30 лет опыта в производстве сделали меня экспертом, но не обязательно лучшим руководителем. Мой авторитарный стиль перестал работать с новым поколением инженеров. Анатолий Мук открыл мне глаза на осознанное лидерство, не требуя отказа от моих сильных сторон. Я научился сочетать ясность с эмпатией. Эффективность производства выросла на 18 процентов — не за счёт новых машин, а за счёт лучшего руководства. Процент брака упал до исторического минимума. Моя команда сегодня говорит мне вещи, которые раньше не осмелилась бы. Это бесценно."
    },
    rating: 5,
    date: "2024-02-10",
    services: ["coaching", "seminare"],
    topics: ["bewusste-fuehrung", "teamfuehrung", "persoenliche-meisterschaft"]
  },
  {
    slug: "ingrid-schwarz",
    name: "Ingrid Schwarz",
    role: "COO",
    company: "AlpenStahl Gruppe",
    industry: "Manufacturing",
    text: {
      de: "Die Stahlindustrie durchlebt einen fundamentalen Wandel. Als COO musste ich gleichzeitig Kosten senken, Nachhaltigkeit vorantreiben und die Belegschaft mitnehmen. Der Druck drohte mich zu zerbrechen. Anatoly Mooks Resilienz-Coaching gab mir die innere Stabilität zurück. Aber mehr noch: Er half mir, diese Stabilität als Führungsinstrument einzusetzen. Mein Team spürte den Wandel sofort. Entscheidungen wurden klarer kommuniziert, Widerstände sanken. Wir schafften es, die Nachhaltigkeitsziele ein Jahr früher zu erreichen als geplant. Anatoly hat mir gezeigt, dass Klarheit die stärkste Führungskraft ist — stärker als jede Anweisung.",
      en: "The steel industry is undergoing fundamental change. As COO, I had to simultaneously cut costs, drive sustainability, and bring the workforce along. The pressure threatened to break me. Anatoly Mook's resilience coaching restored my inner stability. But more than that: he helped me use this stability as a leadership tool. My team felt the change immediately. Decisions were communicated more clearly, resistance decreased. We managed to achieve our sustainability goals a year ahead of schedule. Anatoly showed me that clarity is the strongest leadership force — stronger than any directive.",
      ru: "Сталелитейная промышленность переживает фундаментальные перемены. Как операционный директор, мне нужно было одновременно сокращать расходы, продвигать устойчивое развитие и вести за собой коллектив. Давление грозило меня сломать. Коучинг устойчивости от Анатолия Мука вернул мне внутреннюю стабильность. Но более того: он помог мне использовать эту стабильность как инструмент лидерства. Команда сразу почувствовала перемены. Решения стали коммуницироваться яснее, сопротивление снизилось. Мы достигли целей устойчивого развития на год раньше запланированного. Анатолий показал мне, что ясность — самая сильная движущая сила лидерства, сильнее любого указания."
    },
    rating: 5,
    date: "2024-06-05",
    services: ["coaching", "corporate"],
    topics: ["resilienz", "klarheit", "change-management"]
  },

  // ─── Consulting (3) ────────────────────────────────────────────────
  {
    slug: "dr-patricia-aebi",
    name: "Dr. Patricia Aebi",
    role: "Senior Partner",
    company: "McKinney & Partners",
    industry: "Consulting",
    text: {
      de: "Als Senior Partner einer Strategieberatung dachte ich, ich wüsste alles über Führung. Anatoly Mook bewies mir das Gegenteil — auf die bestmögliche Weise. Sein Ansatz zur persönlichen Meisterschaft zeigte mir blinde Flecken, die mich jahrelang limitiert hatten. Ich wurde nicht nur eine bessere Beraterin, sondern eine authentischere Führungskraft. Meine Kundenbeziehungen vertieften sich, weil ich jetzt mit echter Klarheit statt mit angelerntem Wissen beriet. Der Umsatz meines Teams stieg um 28 Prozent. Aber der größte Gewinn war persönlich: Ich führe heute mit Freude statt mit Anstrengung.",
      en: "As Senior Partner of a strategy consultancy, I thought I knew everything about leadership. Anatoly Mook proved me wrong — in the best possible way. His approach to personal mastery revealed blind spots that had limited me for years. I became not just a better consultant but a more authentic leader. My client relationships deepened because I now advise with genuine clarity instead of learned knowledge. My team's revenue increased by 28 percent. But the greatest gain was personal: today I lead with joy rather than effort.",
      ru: "Как старший партнёр стратегической консалтинговой компании, я думала, что знаю всё о лидерстве. Анатолий Мук доказал обратное — наилучшим образом. Его подход к личному мастерству выявил слепые пятна, которые ограничивали меня годами. Я стала не просто лучшим консультантом, а более аутентичным лидером. Мои отношения с клиентами углубились, потому что теперь я консультирую с подлинной ясностью, а не с заученными знаниями. Выручка моей команды выросла на 28 процентов. Но главный выигрыш был личным: сегодня я руковожу с радостью, а не с усилием."
    },
    rating: 5,
    date: "2024-04-02",
    services: ["coaching"],
    topics: ["persoenliche-meisterschaft", "klarheit", "potenzialentfaltung"]
  },
  {
    slug: "oliver-brenner",
    name: "Oliver Brenner",
    role: "Managing Partner",
    company: "Brenner & Kollegen Unternehmensberatung",
    industry: "Consulting",
    text: {
      de: "Unsere Beratung wuchs schnell, aber die Kultur litt darunter. Jeder Partner verfolgte seine eigene Agenda, und die Zusammenarbeit erodierte. Anatoly Mooks Corporate-Programm brachte uns als Partnerschaft wieder zusammen. Wir lernten, bewusst zu führen statt im Wettbewerb zueinander zu stehen. Die Methoden waren sofort anwendbar und überzeugten selbst die skeptischsten Partner. Unsere internen Konflikte reduzierten sich um 70 Prozent, und die Kundenzufriedenheit erreichte Höchstwerte. Anatoly schafft es, in kürzester Zeit Vertrauen aufzubauen und Menschen zu bewegen, die sich normalerweise nicht bewegen lassen.",
      en: "Our consultancy grew fast, but the culture suffered. Every partner pursued their own agenda, and collaboration eroded. Anatoly Mook's corporate program brought us back together as a partnership. We learned to lead consciously instead of competing against each other. The methods were immediately applicable and convinced even the most skeptical partners. Our internal conflicts reduced by 70 percent, and client satisfaction reached record levels. Anatoly manages to build trust in the shortest time and move people who normally won't be moved.",
      ru: "Наша консалтинговая компания быстро росла, но культура страдала. Каждый партнёр преследовал свою повестку, сотрудничество разрушалось. Корпоративная программа Анатолия Мука снова объединила нас как партнёрство. Мы научились осознанно руководить, а не конкурировать друг с другом. Методы были сразу применимы и убедили даже самых скептичных партнёров. Наши внутренние конфликты сократились на 70 процентов, а удовлетворённость клиентов достигла рекордных значений. Анатолий умеет в кратчайшие сроки выстроить доверие и побудить к переменам людей, которые обычно не поддаются влиянию."
    },
    rating: 5,
    date: "2025-03-12",
    services: ["corporate", "seminare"],
    topics: ["teamfuehrung", "bewusste-fuehrung", "klarheit"]
  },
  {
    slug: "nadia-kovac",
    name: "Nadia Kovač",
    role: "Principal",
    company: "Central European Advisory Group",
    industry: "Consulting",
    text: {
      de: "Als Principal mit Teams in fünf Ländern war die Herausforderung, über Distanz und Kulturen hinweg klar zu führen. Anatoly Mooks Seminare zur Entscheidungsstärke gaben mir Werkzeuge, die kulturübergreifend funktionieren. Ich lernte, dass Klarheit eine universelle Sprache ist. Meine internationalen Teams arbeiten heute kohärenter zusammen, und die Projektqualität verbesserte sich in allen Regionen. Besonders wertvoll war die Erkenntnis, dass bewusste Führung nicht mehr Zeit kostet, sondern Zeit spart. Die Effizienz meiner Teams stieg um 22 Prozent. Anatoly ist der seltene Mentor, der Theorie und Praxis nahtlos verbindet.",
      en: "As Principal with teams in five countries, the challenge was leading clearly across distance and cultures. Anatoly Mook's seminars on decision strength gave me tools that work cross-culturally. I learned that clarity is a universal language. My international teams now work more coherently, and project quality improved across all regions. Particularly valuable was the insight that conscious leadership doesn't cost more time — it saves time. My teams' efficiency increased by 22 percent. Anatoly is the rare mentor who seamlessly connects theory and practice.",
      ru: "Как руководитель с командами в пяти странах, моей задачей было ясно управлять на расстоянии и через культуры. Семинары Анатолия Мука по укреплению решимости дали мне инструменты, работающие кросс-культурно. Я поняла, что ясность — это универсальный язык. Мои международные команды теперь работают более слаженно, и качество проектов улучшилось во всех регионах. Особенно ценным было осознание, что осознанное лидерство не стоит больше времени — оно экономит время. Эффективность моих команд выросла на 22 процента. Анатолий — редкий наставник, который безупречно соединяет теорию с практикой."
    },
    rating: 5,
    date: "2024-09-18",
    services: ["seminare", "coaching"],
    topics: ["entscheidungsstaerke", "teamfuehrung", "bewusste-fuehrung"]
  },

  // ─── Media (2) ─────────────────────────────────────────────────────
  {
    slug: "frederike-von-stein",
    name: "Frederike von Stein",
    role: "Chefredakteurin",
    company: "Zukunft Mediengruppe",
    industry: "Media",
    text: {
      de: "Die Medienbranche befindet sich im permanenten Umbruch. Als Chefredakteurin musste ich gleichzeitig journalistische Qualität sichern und digitale Transformation vorantreiben. Die widersprüchlichen Anforderungen raubten mir die Klarheit. Anatoly Mooks Coaching half mir, in dieser Komplexität einen klaren inneren Kompass zu finden. Ich lernte, Prioritäten nicht nur zu setzen, sondern sie auch klar zu kommunizieren. Die Redaktion folgt heute einer gemeinsamen Vision. Unsere digitalen Reichweiten wuchsen um 55 Prozent, während die journalistische Qualität stieg. Anatoly versteht, dass Klarheit die Grundlage jeder erfolgreichen Transformation ist.",
      en: "The media industry is in permanent upheaval. As editor-in-chief, I had to simultaneously ensure journalistic quality and drive digital transformation. The contradictory demands robbed me of clarity. Anatoly Mook's coaching helped me find a clear inner compass within this complexity. I learned not only to set priorities but to communicate them clearly. The editorial team now follows a shared vision. Our digital reach grew by 55 percent while journalistic quality increased. Anatoly understands that clarity is the foundation of every successful transformation.",
      ru: "Медиаиндустрия находится в постоянном переломе. Как главный редактор, мне нужно было одновременно обеспечивать журналистское качество и продвигать цифровую трансформацию. Противоречивые требования лишали меня ясности. Коучинг Анатолия Мука помог мне найти ясный внутренний компас в этой сложности. Я научилась не только расставлять приоритеты, но и ясно их коммуницировать. Редакция теперь следует общему видению. Наш цифровой охват вырос на 55 процентов, а журналистское качество повысилось. Анатолий понимает, что ясность — фундамент любой успешной трансформации."
    },
    rating: 5,
    date: "2024-08-12",
    services: ["coaching", "transformation"],
    topics: ["klarheit", "change-management", "bewusste-fuehrung"]
  },
  {
    slug: "jan-eriksson",
    name: "Jan Eriksson",
    role: "Creative Director",
    company: "Nordlicht Studios",
    industry: "Media",
    text: {
      de: "Kreative Führung ist ein Paradox: Man muss Freiheit geben und gleichzeitig Richtung vorgeben. Ich scheiterte jahrelang daran, dieses Gleichgewicht zu finden. Anatoly Mooks Seminar zur Potenzialentfaltung veränderte mein Verständnis von Führung fundamental. Ich erkannte, dass Klarheit über die eigene Vision der Schlüssel ist, um kreative Teams zu inspirieren statt zu kontrollieren. Seit der Zusammenarbeit mit Anatoly haben wir drei internationale Auszeichnungen gewonnen und unsere besten Talente gehalten, statt sie zu verlieren. Die Fluktuation sank von 25 auf 8 Prozent. Anatoly ist ein Meister darin, individuelle Stärken zur Entfaltung zu bringen.",
      en: "Creative leadership is a paradox: you must give freedom while providing direction. For years, I failed to find this balance. Anatoly Mook's seminar on unlocking potential fundamentally changed my understanding of leadership. I realized that clarity about one's own vision is the key to inspiring creative teams rather than controlling them. Since working with Anatoly, we've won three international awards and retained our best talent instead of losing them. Turnover dropped from 25 to 8 percent. Anatoly is a master at bringing individual strengths to full expression.",
      ru: "Креативное лидерство — парадокс: нужно давать свободу и одновременно задавать направление. Годами я не мог найти этот баланс. Семинар Анатолия Мука по раскрытию потенциала фундаментально изменил моё понимание руководства. Я осознал, что ясность собственного видения — ключ к вдохновению творческих команд, а не к их контролю. С момента сотрудничества с Анатолием мы получили три международные награды и удержали лучшие таланты, вместо того чтобы их терять. Текучесть снизилась с 25 до 8 процентов. Анатолий — мастер в раскрытии индивидуальных сильных сторон."
    },
    rating: 5,
    date: "2025-01-30",
    services: ["seminare", "coaching"],
    topics: ["potenzialentfaltung", "bewusste-fuehrung", "teamfuehrung"]
  },

  // ─── Government (2) ────────────────────────────────────────────────
  {
    slug: "margarethe-von-hagen",
    name: "Margarethe von Hagen",
    role: "Ministerialdirektorin",
    company: "Bundesministerium für Wirtschaft",
    industry: "Government",
    text: {
      de: "Führung in der öffentlichen Verwaltung ist geprägt von bürokratischen Strukturen und politischem Druck. Als Ministerialdirektorin suchte ich nach Wegen, innerhalb dieses Systems wirksamer zu führen. Anatoly Mooks Ansatz zur bewussten Führung war ein Augenöffner. Er half mir zu erkennen, wo ich Handlungsspielräume hatte, die ich nicht nutzte. Die Klarheit, die ich gewann, ermöglichte es mir, meine Abteilung effizienter und motivierter zu führen. Projektlaufzeiten verkürzten sich um 30 Prozent. Meine Mitarbeitenden berichten von einer deutlich verbesserten Arbeitskultur. Anatoly beweist, dass bewusste Führung in jedem System funktioniert.",
      en: "Leadership in public administration is shaped by bureaucratic structures and political pressure. As Ministerial Director, I looked for ways to lead more effectively within this system. Anatoly Mook's approach to conscious leadership was an eye-opener. He helped me recognize areas where I had latitude I wasn't using. The clarity I gained enabled me to lead my department more efficiently and with greater motivation. Project timelines shortened by 30 percent. My staff report a significantly improved work culture. Anatoly proves that conscious leadership works in every system.",
      ru: "Руководство в государственном управлении определяется бюрократическими структурами и политическим давлением. Как директор министерского департамента, я искала способы эффективнее руководить в рамках этой системы. Подход Анатолия Мука к осознанному лидерству стал откровением. Он помог мне увидеть пространство для действий, которое я не использовала. Обретённая ясность позволила мне руководить отделом эффективнее и с большей мотивацией. Сроки проектов сократились на 30 процентов. Сотрудники отмечают значительно улучшившуюся рабочую культуру. Анатолий доказывает, что осознанное лидерство работает в любой системе."
    },
    rating: 5,
    date: "2024-11-28",
    services: ["coaching", "seminare"],
    topics: ["bewusste-fuehrung", "klarheit", "potenzialentfaltung"]
  },
  {
    slug: "beat-zimmermann",
    name: "Beat Zimmermann",
    role: "Stadtpräsident",
    company: "Stadt Winterthur",
    industry: "Government",
    text: {
      de: "Kommunalpolitik erfordert, verschiedene Interessen zu navigieren und trotzdem eine klare Linie zu halten. Die Polarisierung der letzten Jahre machte dies zunehmend schwieriger. Anatoly Mooks Keynote beim Schweizer Gemeindetag inspirierte mich, sein Coaching-Programm zu buchen. Die Werkzeuge zur Entscheidungsstärke helfen mir täglich, komplexe politische Situationen mit Klarheit zu meistern. Mein Führungsstil wurde ruhiger, aber wirkungsvoller. Die Zusammenarbeit im Stadtrat verbesserte sich merklich, und Bürger loben die transparentere Kommunikation. Anatoly versteht, dass wahre Führung bedeutet, Klarheit zu schaffen, nicht Macht auszuüben.",
      en: "Municipal politics requires navigating diverse interests while maintaining a clear course. The polarization of recent years made this increasingly difficult. Anatoly Mook's keynote at the Swiss Municipal Congress inspired me to book his coaching program. The decision-strength tools help me daily to master complex political situations with clarity. My leadership style became calmer yet more impactful. Collaboration in the city council improved noticeably, and citizens praise the more transparent communication. Anatoly understands that true leadership means creating clarity, not exercising power.",
      ru: "Муниципальная политика требует навигации между различными интересами при сохранении ясного курса. Поляризация последних лет делала это всё сложнее. Выступление Анатолия Мука на Швейцарском конгрессе муниципалитетов вдохновило меня заказать его программу коучинга. Инструменты укрепления решимости помогают мне ежедневно справляться со сложными политическими ситуациями с ясностью. Мой стиль руководства стал спокойнее, но эффективнее. Сотрудничество в городском совете заметно улучшилось, а граждане хвалят более прозрачную коммуникацию. Анатолий понимает, что истинное лидерство — это создание ясности, а не осуществление власти."
    },
    rating: 5,
    date: "2025-02-22",
    services: ["keynotes", "coaching"],
    topics: ["entscheidungsstaerke", "klarheit", "bewusste-fuehrung"]
  },

  // ─── Retail (2) ────────────────────────────────────────────────────
  {
    slug: "julia-brandt",
    name: "Julia Brandt",
    role: "Geschäftsführerin",
    company: "Brandt & Söhne Handelsgruppe",
    industry: "Retail",
    text: {
      de: "Als Geschäftsführerin in dritter Generation stand ich vor der Aufgabe, ein traditionsreiches Handelsunternehmen in die digitale Zukunft zu führen. Die Last der Familienerwartungen und der Widerstand langjähriger Mitarbeitender machten mir zu schaffen. Anatoly Mook half mir, Klarheit über meine eigene Vision zu gewinnen und diese mit Überzeugung zu vertreten. Sein Transformationsprogramm begleitete den gesamten Wandel. Heute betreiben wir erfolgreich 35 Filialen und einen florierenden Online-Shop. Der Umsatz stieg um 40 Prozent. Aber wichtiger: Die Familie und das Team stehen hinter der neuen Richtung. Anatoly hat nicht nur mein Unternehmen, sondern mein Selbstverständnis als Führungskraft transformiert.",
      en: "As third-generation CEO, I faced the task of leading a traditional trading company into the digital future. The burden of family expectations and resistance from long-time employees weighed on me. Anatoly Mook helped me gain clarity about my own vision and represent it with conviction. His transformation program accompanied the entire change. Today we successfully operate 35 branches and a thriving online shop. Revenue increased by 40 percent. But more importantly: the family and team stand behind the new direction. Anatoly transformed not just my company but my self-understanding as a leader.",
      ru: "Как генеральный директор в третьем поколении, я стояла перед задачей привести традиционное торговое предприятие в цифровое будущее. Бремя семейных ожиданий и сопротивление давних сотрудников давили на меня. Анатолий Мук помог мне обрести ясность в отношении собственного видения и отстаивать его с убеждённостью. Его программа трансформации сопровождала весь процесс перемен. Сегодня мы успешно управляем 35 филиалами и процветающим интернет-магазином. Выручка выросла на 40 процентов. Но важнее то, что семья и команда стоят за новым курсом. Анатолий трансформировал не только мою компанию, но и моё самосознание как руководителя."
    },
    rating: 5,
    date: "2024-05-30",
    services: ["transformation", "coaching"],
    topics: ["klarheit", "change-management", "persoenliche-meisterschaft"]
  },
  {
    slug: "alexander-roth",
    name: "Alexander Roth",
    role: "Head of Operations",
    company: "LuxMart Europe",
    industry: "Retail",
    text: {
      de: "Im Luxus-Einzelhandel ist Exzellenz keine Option, sondern Pflicht. Meine 2.000 Mitarbeitenden in 12 Ländern brauchten eine Führung, die Beständigkeit und Inspiration vereint. Anatoly Mooks Corporate-Programm für unser Führungsteam setzte neue Maßstäbe. Wir entwickelten ein gemeinsames Verständnis von Teamführung, das über alle Kulturen hinweg funktioniert. Die Kundenzufriedenheit stieg in allen Märkten, und unsere Führungskräfteentwicklung wurde von der Branche als Best Practice anerkannt. Die Resilienz meines Teams in der letzten Wirtschaftskrise war bemerkenswert. Anatoly hat uns die Werkzeuge gegeben, um unter Druck exzellent zu bleiben.",
      en: "In luxury retail, excellence is not an option but an obligation. My 2,000 employees across 12 countries needed leadership that combines consistency with inspiration. Anatoly Mook's corporate program for our leadership team set new standards. We developed a shared understanding of team leadership that works across all cultures. Customer satisfaction increased in all markets, and our leadership development was recognized as best practice by the industry. My team's resilience during the last economic downturn was remarkable. Anatoly gave us the tools to remain excellent under pressure.",
      ru: "В люксовой розничной торговле превосходство — не выбор, а обязанность. Моим 2000 сотрудникам в 12 странах нужно было руководство, сочетающее постоянство и вдохновение. Корпоративная программа Анатолия Мука для нашей команды руководителей задала новые стандарты. Мы выработали общее понимание командного лидерства, работающее во всех культурах. Удовлетворённость клиентов выросла на всех рынках, а наше развитие лидерства было признано лучшей практикой в отрасли. Устойчивость моей команды во время последнего экономического спада была поразительной. Анатолий дал нам инструменты, чтобы оставаться превосходными под давлением."
    },
    rating: 5,
    date: "2024-10-05",
    services: ["corporate", "seminare"],
    topics: ["teamfuehrung", "resilienz", "bewusste-fuehrung"]
  },

  // ─── Startup (4) ───────────────────────────────────────────────────
  {
    slug: "lena-pfister",
    name: "Lena Pfister",
    role: "Co-Founder & CEO",
    company: "GreenLoop Technologies",
    industry: "Startup",
    text: {
      de: "Als Gründerin eines CleanTech-Startups war ich so in der Mission vertieft, dass ich mich selbst und mein Team aus den Augen verlor. Burnout-Symptome bei mir und drei Schlüsselpersonen waren das Warnsignal. Anatoly Mooks Coaching rettete nicht nur meine Gesundheit, sondern unser gesamtes Unternehmen. Er half mir, Klarheit darüber zu gewinnen, was wirklich wichtig ist, und Prioritäten bewusst zu setzen. Heute führe ich mit nachhaltiger Energie statt mit Erschöpfung. Unser Team wuchs von 12 auf 45 Personen, und wir schlossen eine Series-B-Runde über 15 Millionen Euro ab. Anatoly zeigt, dass persönliche Meisterschaft die Grundlage für unternehmerischen Erfolg ist.",
      en: "As founder of a CleanTech startup, I was so immersed in the mission that I lost sight of myself and my team. Burnout symptoms in myself and three key people were the warning sign. Anatoly Mook's coaching saved not just my health but our entire company. He helped me gain clarity about what truly matters and set priorities consciously. Today I lead with sustainable energy instead of exhaustion. Our team grew from 12 to 45 people, and we closed a Series B round of 15 million euros. Anatoly shows that personal mastery is the foundation for entrepreneurial success.",
      ru: "Как основательница стартапа в сфере чистых технологий, я была так погружена в миссию, что потеряла из виду себя и свою команду. Симптомы выгорания у меня и трёх ключевых сотрудников стали тревожным сигналом. Коучинг Анатолия Мука спас не только моё здоровье, но и всю компанию. Он помог мне обрести ясность в том, что действительно важно, и осознанно расставлять приоритеты. Сегодня я руковожу с устойчивой энергией, а не с истощением. Наша команда выросла с 12 до 45 человек, и мы закрыли раунд Series B на 15 миллионов евро. Анатолий показывает, что личное мастерство — фундамент предпринимательского успеха."
    },
    rating: 5,
    date: "2024-03-28",
    services: ["coaching"],
    topics: ["persoenliche-meisterschaft", "klarheit", "resilienz"]
  },
  {
    slug: "david-nguyen",
    name: "David Nguyen",
    role: "CTO & Co-Founder",
    company: "QuantumLeap AI",
    industry: "Startup",
    text: {
      de: "Als technischer Gründer war Führung nie mein Kerngebiet. Mit dem rasanten Wachstum unseres KI-Startups wurde dies zum Problem. Ich konnte Code schreiben, aber keine Menschen führen. Anatoly Mooks Seminar zur bewussten Führung war ein Wendepunkt. Er gab mir keine Formeln, sondern Prinzipien, die ich als Ingenieur sofort verstand und anwenden konnte. Mein Engineering-Team von 30 Entwicklern berichtet von dramatisch verbesserter Zusammenarbeit. Unsere Produktentwicklung beschleunigte sich um 35 Prozent. Was mich beeindruckt: Anatoly respektiert verschiedene Persönlichkeitstypen und findet für jeden den richtigen Zugang zur Führung.",
      en: "As a technical founder, leadership was never my core domain. With our AI startup's rapid growth, this became a problem. I could write code but couldn't lead people. Anatoly Mook's seminar on conscious leadership was a turning point. He didn't give me formulas but principles that I, as an engineer, could immediately understand and apply. My engineering team of 30 developers reports dramatically improved collaboration. Our product development accelerated by 35 percent. What impresses me: Anatoly respects different personality types and finds the right approach to leadership for everyone.",
      ru: "Как технический основатель, лидерство никогда не было моей сильной стороной. С быстрым ростом нашего ИИ-стартапа это стало проблемой. Я мог писать код, но не мог руководить людьми. Семинар Анатолия Мука по осознанному лидерству стал переломным моментом. Он дал мне не формулы, а принципы, которые я как инженер мог сразу понять и применить. Моя команда из 30 разработчиков отмечает кардинально улучшенное сотрудничество. Разработка продукта ускорилась на 35 процентов. Что впечатляет: Анатолий уважает разные типы личности и находит для каждого правильный подход к лидерству."
    },
    rating: 5,
    date: "2024-07-22",
    services: ["seminare", "coaching"],
    topics: ["bewusste-fuehrung", "teamfuehrung", "potenzialentfaltung"]
  },
  {
    slug: "sarah-huber",
    name: "Sarah Huber",
    role: "Founder & CEO",
    company: "FemHealth Innovations",
    industry: "Startup",
    text: {
      de: "Als Gründerin in einer männerdominierten Branche kämpfte ich mit Selbstzweifeln, die meine Führung unterminierten. Anatoly Mooks Coaching zur persönlichen Meisterschaft half mir, meine authentische Führungskraft zu entdecken. Keine Imitation männlicher Führungsstile, sondern echte Klarheit über meine Stärken. Die Transformation war tiefgreifend: Ich pitchte unsere Series A mit einer Überzeugung, die Investoren sofort spürten. Wir schlossen die Runde mit 120 Prozent Überzeichnung ab. Mein Team von 20 Frauen und Männern folgt einer Vision, die wir gemeinsam leben. Anatoly hat mir nicht beigebracht, jemand anderes zu sein — er hat mir geholfen, ich selbst zu sein, klar und bewusst.",
      en: "As a founder in a male-dominated industry, I struggled with self-doubt that undermined my leadership. Anatoly Mook's coaching on personal mastery helped me discover my authentic leadership strength — not imitating male leadership styles, but gaining genuine clarity about my strengths. The transformation was profound: I pitched our Series A with a conviction investors felt immediately. We closed the round at 120 percent oversubscription. My team of 20 women and men follows a vision we live together. Anatoly didn't teach me to be someone else — he helped me be myself, clearly and consciously.",
      ru: "Как основательница в мужской индустрии, я боролась с сомнениями, подрывавшими моё лидерство. Коучинг Анатолия Мука по личному мастерству помог мне открыть свою подлинную лидерскую силу — не имитацию мужских стилей руководства, а настоящую ясность относительно моих сильных сторон. Трансформация была глубокой: я представила нашу Series A с убеждённостью, которую инвесторы сразу почувствовали. Мы закрыли раунд с 120-процентной переподпиской. Моя команда из 20 женщин и мужчин следует видению, которым мы живём вместе. Анатолий не учил меня быть кем-то другим — он помог мне быть собой, ясно и осознанно."
    },
    rating: 5,
    date: "2025-03-18",
    services: ["coaching"],
    topics: ["persoenliche-meisterschaft", "klarheit", "potenzialentfaltung"]
  },
  {
    slug: "max-oberhauser",
    name: "Max Oberhauser",
    role: "CEO & Founder",
    company: "Alpine Robotics",
    industry: "Startup",
    text: {
      de: "Drei Jahre nach der Gründung steckten wir in einer existenziellen Krise. Schlüsselpersonen verließen uns, die Finanzierung wurde unsicher, und ich verlor den Überblick. Die Empfehlung eines befreundeten Unternehmers führte mich zu Anatoly Mook. Sein Coaching gab mir die Klarheit zurück, die ich brauchte, um die richtigen Entscheidungen zu treffen. Wir restrukturierten das Team, fokussierten unser Produkt und fanden neue Investoren. Heute sind wir profitabel, beschäftigen 60 Mitarbeitende und exportieren in acht Länder. Ohne Anatolys Fähigkeit, in chaotischen Situationen Klarheit zu schaffen, wäre unser Unternehmen heute Geschichte. Er ist der beste Mentor, den ein Gründer haben kann.",
      en: "Three years after founding, we were in an existential crisis. Key people were leaving, funding became uncertain, and I was losing oversight. A recommendation from a fellow entrepreneur led me to Anatoly Mook. His coaching restored the clarity I needed to make the right decisions. We restructured the team, focused our product, and found new investors. Today we're profitable, employ 60 people, and export to eight countries. Without Anatoly's ability to create clarity in chaotic situations, our company would be history. He is the best mentor a founder can have.",
      ru: "Через три года после основания мы оказались в экзистенциальном кризисе. Ключевые люди уходили, финансирование стало неопределённым, и я терял контроль. Рекомендация знакомого предпринимателя привела меня к Анатолию Муку. Его коучинг вернул мне ясность, необходимую для принятия правильных решений. Мы реструктурировали команду, сфокусировали продукт и нашли новых инвесторов. Сегодня мы прибыльны, в штате 60 сотрудников, и мы экспортируем в восемь стран. Без способности Анатолия создавать ясность в хаотичных ситуациях нашей компании уже не было бы. Он — лучший наставник, которого может иметь основатель."
    },
    rating: 5,
    date: "2024-12-15",
    services: ["coaching", "seminare"],
    topics: ["klarheit", "entscheidungsstaerke", "resilienz"]
  }
];

export function getTestimonialBySlug(slug: string): TestimonialEntry | undefined {
  return testimonials.find(t => t.slug === slug);
}

export function getTestimonialsByService(service: string): TestimonialEntry[] {
  return testimonials.filter(t => t.services.includes(service));
}

export function getTestimonialsByIndustry(industry: string): TestimonialEntry[] {
  return testimonials.filter(t => t.industry === industry);
}
