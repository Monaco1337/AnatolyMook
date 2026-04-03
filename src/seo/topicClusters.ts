export interface TopicCluster {
  slug: string;
  slugEn: string;
  slugRu: string;
  title: { de: string; en: string; ru: string };
  description: { de: string; en: string; ru: string };
  metaTitle: { de: string; en: string; ru: string };
  metaDescription: { de: string; en: string; ru: string };
  keywords: { de: string[]; en: string[]; ru: string[] };
  relatedServices: string[];
  relatedTopics: string[];
  parentCluster?: string;
}

export const topicClusters: TopicCluster[] = [
  // ═══════════════════════════════════════════════════════════════
  // CLUSTER 1: Bewusstsein & Klarheit (12 topics)
  // ═══════════════════════════════════════════════════════════════

  {
    slug: 'bewusstseinsentwicklung',
    slugEn: 'consciousness-development',
    slugRu: 'razvitie-soznaniya',
    title: {
      de: 'Bewusstseinsentwicklung',
      en: 'Consciousness Development',
      ru: 'Развитие сознания',
    },
    description: {
      de: 'Bewusstseinsentwicklung ist der Schlüssel zu einem erfüllten Leben und bewusster Führung. Anatoly Mook begleitet Sie auf dem Weg zu tieferem Selbstverständnis und erweitertem Bewusstsein – durch erprobte Methoden aus Coaching, Mentoring und Bewusstseinsarbeit.',
      en: 'Consciousness development is the key to a fulfilled life and conscious leadership. Anatoly Mook guides you toward deeper self-understanding and expanded awareness through proven methods in coaching, mentoring, and awareness work.',
      ru: 'Развитие сознания — ключ к полноценной жизни и осознанному лидерству. Анатолий Мук сопровождает вас на пути к глубокому самопониманию и расширенному сознанию с помощью проверенных методов коучинга, менторинга и работы с сознанием.',
    },
    metaTitle: {
      de: 'Bewusstseinsentwicklung – Anatoly Mook',
      en: 'Consciousness Development – Anatoly Mook',
      ru: 'Развитие сознания – Анатолий Мук',
    },
    metaDescription: {
      de: 'Erweitern Sie Ihr Bewusstsein mit Anatoly Mook. Erprobte Wege zu Klarheit, Selbsterkenntnis und bewusster Lebensführung in Unna und online.',
      en: 'Expand your consciousness with Anatoly Mook. Proven paths to clarity, self-awareness, and conscious living in Unna, Germany and online.',
      ru: 'Расширьте своё сознание с Анатолием Муком. Проверенные пути к ясности, самопознанию и осознанной жизни в Унне и онлайн.',
    },
    keywords: {
      de: ['Bewusstseinsentwicklung', 'Bewusstsein erweitern', 'Bewusstseinscoaching', 'persönliche Entwicklung', 'Selbsterfahrung'],
      en: ['consciousness development', 'expanding awareness', 'consciousness coaching', 'personal development', 'self-discovery'],
      ru: ['развитие сознания', 'расширение осознанности', 'коучинг сознания', 'личностное развитие', 'самопознание'],
    },
    relatedServices: ['coaching', 'seminare', 'mentoring'],
    relatedTopics: ['klarheit-finden', 'selbsterkenntnis', 'bewusste-wahrnehmung', 'bewusstseinsarbeit'],
    parentCluster: 'bewusstsein-klarheit',
  },

  {
    slug: 'klarheit-finden',
    slugEn: 'finding-clarity',
    slugRu: 'obretenie-yasnosti',
    title: {
      de: 'Klarheit finden',
      en: 'Finding Clarity',
      ru: 'Обретение ясности',
    },
    description: {
      de: 'Klarheit ist die Grundlage für jede bewusste Entscheidung. Anatoly Mook hilft Ihnen, innere Klarheit über Ihre Werte, Ziele und Ihren Lebensweg zu gewinnen – damit Sie mit Überzeugung handeln und führen können.',
      en: 'Clarity is the foundation of every conscious decision. Anatoly Mook helps you gain inner clarity about your values, goals, and life path – so you can act and lead with conviction.',
      ru: 'Ясность — основа каждого осознанного решения. Анатолий Мук помогает обрести внутреннюю ясность в отношении ваших ценностей, целей и жизненного пути — чтобы вы могли действовать и руководить с убеждённостью.',
    },
    metaTitle: {
      de: 'Klarheit finden – Anatoly Mook',
      en: 'Finding Clarity – Anatoly Mook',
      ru: 'Обретение ясности – Анатолий Мук',
    },
    metaDescription: {
      de: 'Finden Sie innere Klarheit mit Anatoly Mook. Coaching und Mentoring für bewusste Entscheidungen, klare Ziele und einen stimmigen Lebensweg.',
      en: 'Find inner clarity with Anatoly Mook. Coaching and mentoring for conscious decisions, clear goals, and an aligned life path.',
      ru: 'Обретите внутреннюю ясность с Анатолием Муком. Коучинг и менторинг для осознанных решений, чётких целей и гармоничного жизненного пути.',
    },
    keywords: {
      de: ['Klarheit finden', 'innere Klarheit', 'Klarheit gewinnen', 'klare Ziele', 'Lebensklarheit'],
      en: ['finding clarity', 'inner clarity', 'gaining clarity', 'clear goals', 'life clarity'],
      ru: ['обретение ясности', 'внутренняя ясность', 'чёткие цели', 'ясность в жизни', 'прозрачность мышления'],
    },
    relatedServices: ['coaching', 'einzelcoaching', 'mentoring'],
    relatedTopics: ['bewusstseinsentwicklung', 'geistige-klarheit', 'selbstreflexion', 'lebenszweck-finden'],
    parentCluster: 'bewusstsein-klarheit',
  },

  {
    slug: 'selbsterkenntnis',
    slugEn: 'self-awareness',
    slugRu: 'samopoznanie',
    title: {
      de: 'Selbsterkenntnis',
      en: 'Self-Awareness',
      ru: 'Самопознание',
    },
    description: {
      de: 'Selbsterkenntnis ist der Anfang aller Weisheit. Anatoly Mook unterstützt Sie dabei, Ihre Muster, Stärken und blinden Flecken zu erkennen – für authentisches Handeln und bewusste Beziehungen in Führung und Leben.',
      en: 'Self-awareness is the beginning of all wisdom. Anatoly Mook supports you in recognizing your patterns, strengths, and blind spots – for authentic action and conscious relationships in leadership and life.',
      ru: 'Самопознание — начало всей мудрости. Анатолий Мук поддерживает вас в распознавании ваших паттернов, сильных сторон и слепых зон — для подлинных действий и осознанных отношений в лидерстве и жизни.',
    },
    metaTitle: {
      de: 'Selbsterkenntnis – Anatoly Mook',
      en: 'Self-Awareness – Anatoly Mook',
      ru: 'Самопознание – Анатолий Мук',
    },
    metaDescription: {
      de: 'Vertiefen Sie Ihre Selbsterkenntnis mit Anatoly Mook. Erkennen Sie Ihre Muster und Potenziale für authentische Führung und bewusstes Leben.',
      en: 'Deepen your self-awareness with Anatoly Mook. Recognize your patterns and potentials for authentic leadership and conscious living.',
      ru: 'Углубите самопознание с Анатолием Муком. Распознайте свои паттерны и потенциалы для подлинного лидерства и осознанной жизни.',
    },
    keywords: {
      de: ['Selbsterkenntnis', 'Selbstbewusstsein', 'Selbstreflexion', 'innere Muster erkennen', 'Persönlichkeitsentwicklung'],
      en: ['self-awareness', 'self-knowledge', 'self-reflection', 'recognizing patterns', 'personality development'],
      ru: ['самопознание', 'самоосознание', 'саморефлексия', 'распознавание паттернов', 'развитие личности'],
    },
    relatedServices: ['coaching', 'einzelcoaching', 'seminare'],
    relatedTopics: ['bewusstseinsentwicklung', 'selbstreflexion', 'emotionale-intelligenz', 'persoenliches-wachstum'],
    parentCluster: 'bewusstsein-klarheit',
  },

  {
    slug: 'innere-staerke',
    slugEn: 'inner-strength',
    slugRu: 'vnutrennyaya-sila',
    title: {
      de: 'Innere Stärke',
      en: 'Inner Strength',
      ru: 'Внутренняя сила',
    },
    description: {
      de: 'Innere Stärke entsteht nicht durch Härte, sondern durch bewusste Verbindung mit sich selbst. Anatoly Mook zeigt Ihnen, wie Sie unerschütterliche innere Kraft entwickeln – als Fundament für souveräne Führung und ein selbstbestimmtes Leben.',
      en: 'Inner strength does not come from toughness but from conscious connection with yourself. Anatoly Mook shows you how to develop unshakable inner power – as the foundation for sovereign leadership and a self-determined life.',
      ru: 'Внутренняя сила рождается не из жёсткости, а из осознанной связи с собой. Анатолий Мук покажет, как развить непоколебимую внутреннюю силу — как фундамент для уверенного лидерства и самостоятельной жизни.',
    },
    metaTitle: {
      de: 'Innere Stärke entwickeln – Anatoly Mook',
      en: 'Developing Inner Strength – Anatoly Mook',
      ru: 'Развитие внутренней силы – Анатолий Мук',
    },
    metaDescription: {
      de: 'Entwickeln Sie innere Stärke mit Anatoly Mook. Finden Sie unerschütterliche Kraft für bewusste Führung und ein selbstbestimmtes Leben.',
      en: 'Develop inner strength with Anatoly Mook. Find unshakable power for conscious leadership and a self-determined life.',
      ru: 'Развивайте внутреннюю силу с Анатолием Муком. Обретите непоколебимую силу для осознанного лидерства и самостоятельной жизни.',
    },
    keywords: {
      de: ['innere Stärke', 'innere Kraft', 'Resilienz', 'Stärke entwickeln', 'mentale Stärke'],
      en: ['inner strength', 'inner power', 'resilience', 'developing strength', 'mental strength'],
      ru: ['внутренняя сила', 'внутренняя мощь', 'стойкость', 'развитие силы', 'ментальная сила'],
    },
    relatedServices: ['coaching', 'seminare', 'retreat'],
    relatedTopics: ['resilienz-aufbauen', 'selbstmeisterschaft', 'praesenz-und-gegenwaertigkeit', 'disziplin-und-willenskraft'],
    parentCluster: 'bewusstsein-klarheit',
  },

  {
    slug: 'achtsamkeit-im-alltag',
    slugEn: 'mindfulness-in-daily-life',
    slugRu: 'osoznannost-v-povsednevnoy-zhizni',
    title: {
      de: 'Achtsamkeit im Alltag',
      en: 'Mindfulness in Daily Life',
      ru: 'Осознанность в повседневной жизни',
    },
    description: {
      de: 'Achtsamkeit ist keine Technik, sondern eine Haltung. Anatoly Mook vermittelt Ihnen alltagstaugliche Wege, um präsent, klar und verbunden zu bleiben – auch inmitten von Herausforderungen und hoher Verantwortung.',
      en: 'Mindfulness is not a technique but an attitude. Anatoly Mook teaches you practical ways to stay present, clear, and connected – even amid challenges and high responsibility.',
      ru: 'Осознанность — это не техника, а внутренняя позиция. Анатолий Мук научит вас практическим способам оставаться присутствующим, ясным и связанным — даже среди вызовов и высокой ответственности.',
    },
    metaTitle: {
      de: 'Achtsamkeit im Alltag – Anatoly Mook',
      en: 'Mindfulness in Daily Life – Anatoly Mook',
      ru: 'Осознанность в жизни – Анатолий Мук',
    },
    metaDescription: {
      de: 'Integrieren Sie Achtsamkeit in Ihren Alltag. Anatoly Mook zeigt praxisnahe Wege zu mehr Präsenz, Klarheit und innerer Ruhe.',
      en: 'Integrate mindfulness into your daily life. Anatoly Mook shows practical ways to greater presence, clarity, and inner calm.',
      ru: 'Интегрируйте осознанность в повседневную жизнь. Анатолий Мук покажет практические пути к присутствию, ясности и покою.',
    },
    keywords: {
      de: ['Achtsamkeit', 'Achtsamkeit im Alltag', 'Mindfulness', 'achtsam leben', 'bewusst leben'],
      en: ['mindfulness', 'daily mindfulness', 'mindful living', 'conscious living', 'present moment'],
      ru: ['осознанность', 'осознанность в жизни', 'осознанная жизнь', 'внимательность', 'присутствие'],
    },
    relatedServices: ['seminare', 'coaching', 'retreat'],
    relatedTopics: ['praesenz-und-gegenwaertigkeit', 'innere-ruhe', 'meditation-fuer-fuehrungskraefte', 'bewusste-wahrnehmung'],
    parentCluster: 'bewusstsein-klarheit',
  },

  {
    slug: 'praesenz-und-gegenwaertigkeit',
    slugEn: 'presence-and-being-present',
    slugRu: 'prisutstvie-i-bytie-zdes-i-seychas',
    title: {
      de: 'Präsenz und Gegenwärtigkeit',
      en: 'Presence and Being Present',
      ru: 'Присутствие и бытие здесь и сейчас',
    },
    description: {
      de: 'Wahre Präsenz verändert alles – Ihre Wirkung, Ihre Beziehungen, Ihre Entscheidungen. Anatoly Mook begleitet Sie darin, eine tiefe Gegenwärtigkeit zu kultivieren, die Sie in jedem Moment Ihres Lebens und Ihrer Führung trägt.',
      en: 'True presence changes everything – your impact, your relationships, your decisions. Anatoly Mook guides you in cultivating a deep state of being present that carries you through every moment of your life and leadership.',
      ru: 'Истинное присутствие меняет всё — ваше влияние, отношения, решения. Анатолий Мук помогает культивировать глубокое состояние присутствия, которое поддерживает вас в каждый момент жизни и лидерства.',
    },
    metaTitle: {
      de: 'Präsenz & Gegenwärtigkeit – Anatoly Mook',
      en: 'Presence & Being Present – Anatoly Mook',
      ru: 'Присутствие и осознанность – Анатолий Мук',
    },
    metaDescription: {
      de: 'Kultivieren Sie echte Präsenz mit Anatoly Mook. Lernen Sie, im Moment zu sein – für wirkungsvolle Führung und ein bewusstes Leben.',
      en: 'Cultivate true presence with Anatoly Mook. Learn to be in the moment – for impactful leadership and a conscious life.',
      ru: 'Культивируйте истинное присутствие с Анатолием Муком. Научитесь быть в моменте — для мощного лидерства и осознанной жизни.',
    },
    keywords: {
      de: ['Präsenz', 'Gegenwärtigkeit', 'im Moment sein', 'Achtsamkeit', 'präsent sein'],
      en: ['presence', 'being present', 'in the moment', 'mindful presence', 'present awareness'],
      ru: ['присутствие', 'бытие в моменте', 'здесь и сейчас', 'осознанное присутствие', 'настоящий момент'],
    },
    relatedServices: ['coaching', 'retreat', 'seminare'],
    relatedTopics: ['achtsamkeit-im-alltag', 'bewusste-wahrnehmung', 'innere-ruhe', 'meditation-fuer-fuehrungskraefte'],
    parentCluster: 'bewusstsein-klarheit',
  },

  {
    slug: 'bewusste-wahrnehmung',
    slugEn: 'conscious-perception',
    slugRu: 'osoznannoe-vospriyatie',
    title: {
      de: 'Bewusste Wahrnehmung',
      en: 'Conscious Perception',
      ru: 'Осознанное восприятие',
    },
    description: {
      de: 'Bewusste Wahrnehmung schärft Ihren Blick für das Wesentliche. Anatoly Mook hilft Ihnen, automatische Reaktionsmuster zu durchbrechen und die Realität klarer zu sehen – als Grundlage für weise Entscheidungen und authentische Führung.',
      en: 'Conscious perception sharpens your eye for what matters. Anatoly Mook helps you break through automatic reaction patterns and see reality more clearly – as the foundation for wise decisions and authentic leadership.',
      ru: 'Осознанное восприятие обостряет ваш взгляд на существенное. Анатолий Мук помогает преодолеть автоматические реакции и видеть реальность яснее — как основу для мудрых решений и подлинного лидерства.',
    },
    metaTitle: {
      de: 'Bewusste Wahrnehmung – Anatoly Mook',
      en: 'Conscious Perception – Anatoly Mook',
      ru: 'Осознанное восприятие – Анатолий Мук',
    },
    metaDescription: {
      de: 'Schärfen Sie Ihre bewusste Wahrnehmung mit Anatoly Mook. Durchbrechen Sie Muster und sehen Sie klarer – für bessere Entscheidungen.',
      en: 'Sharpen your conscious perception with Anatoly Mook. Break through patterns and see more clearly – for better decisions.',
      ru: 'Обострите осознанное восприятие с Анатолием Муком. Преодолейте паттерны и видьте яснее — для лучших решений.',
    },
    keywords: {
      de: ['bewusste Wahrnehmung', 'Wahrnehmung schärfen', 'klarer sehen', 'Muster durchbrechen', 'Bewusstheit'],
      en: ['conscious perception', 'sharpening awareness', 'seeing clearly', 'breaking patterns', 'consciousness'],
      ru: ['осознанное восприятие', 'обострение восприятия', 'ясное видение', 'преодоление паттернов', 'осознанность'],
    },
    relatedServices: ['coaching', 'seminare', 'bewusstseinsarbeit'],
    relatedTopics: ['bewusstseinsentwicklung', 'selbsterkenntnis', 'praesenz-und-gegenwaertigkeit', 'intuition-entwickeln'],
    parentCluster: 'bewusstsein-klarheit',
  },

  {
    slug: 'innere-ruhe',
    slugEn: 'inner-calm',
    slugRu: 'vnutrenniy-pokoy',
    title: {
      de: 'Innere Ruhe',
      en: 'Inner Calm',
      ru: 'Внутренний покой',
    },
    description: {
      de: 'Innere Ruhe ist kein Luxus, sondern eine Notwendigkeit – besonders für Menschen in Verantwortung. Anatoly Mook zeigt Ihnen Wege zu einer tiefen Gelassenheit, die auch in stürmischen Zeiten Bestand hat.',
      en: 'Inner calm is not a luxury but a necessity – especially for those in positions of responsibility. Anatoly Mook shows you paths to a deep serenity that endures even in turbulent times.',
      ru: 'Внутренний покой — не роскошь, а необходимость, особенно для людей с ответственностью. Анатолий Мук показывает пути к глубокой безмятежности, которая выдерживает даже бурные времена.',
    },
    metaTitle: {
      de: 'Innere Ruhe finden – Anatoly Mook',
      en: 'Finding Inner Calm – Anatoly Mook',
      ru: 'Обретение внутреннего покоя – Анатолий Мук',
    },
    metaDescription: {
      de: 'Finden Sie innere Ruhe mit Anatoly Mook. Wege zu tiefer Gelassenheit für Führungskräfte und Menschen in Verantwortung.',
      en: 'Find inner calm with Anatoly Mook. Paths to deep serenity for leaders and people in positions of responsibility.',
      ru: 'Обретите внутренний покой с Анатолием Муком. Пути к глубокой безмятежности для руководителей и людей с ответственностью.',
    },
    keywords: {
      de: ['innere Ruhe', 'Gelassenheit', 'Ruhe finden', 'Stressabbau', 'Entspannung'],
      en: ['inner calm', 'serenity', 'finding peace', 'stress relief', 'relaxation'],
      ru: ['внутренний покой', 'безмятежность', 'обретение покоя', 'снятие стресса', 'расслабление'],
    },
    relatedServices: ['coaching', 'retreat', 'seminare'],
    relatedTopics: ['achtsamkeit-im-alltag', 'praesenz-und-gegenwaertigkeit', 'meditation-fuer-fuehrungskraefte', 'burnout-praevention'],
    parentCluster: 'bewusstsein-klarheit',
  },

  {
    slug: 'geistige-klarheit',
    slugEn: 'mental-clarity',
    slugRu: 'umstvennaya-yasnost',
    title: {
      de: 'Geistige Klarheit',
      en: 'Mental Clarity',
      ru: 'Умственная ясность',
    },
    description: {
      de: 'Geistige Klarheit ermöglicht es Ihnen, das Wesentliche vom Unwesentlichen zu unterscheiden. Anatoly Mook unterstützt Sie dabei, mentalen Nebel zu lichten und Ihren Geist zu schärfen – für klare Gedanken und wirkungsvolles Handeln.',
      en: 'Mental clarity enables you to distinguish the essential from the non-essential. Anatoly Mook supports you in clearing mental fog and sharpening your mind – for clear thoughts and effective action.',
      ru: 'Умственная ясность позволяет отличать существенное от несущественного. Анатолий Мук помогает рассеять ментальный туман и обострить ум — для чётких мыслей и эффективных действий.',
    },
    metaTitle: {
      de: 'Geistige Klarheit – Anatoly Mook',
      en: 'Mental Clarity – Anatoly Mook',
      ru: 'Умственная ясность – Анатолий Мук',
    },
    metaDescription: {
      de: 'Gewinnen Sie geistige Klarheit mit Anatoly Mook. Schärfen Sie Ihren Geist für klare Gedanken und wirkungsvolle Entscheidungen.',
      en: 'Gain mental clarity with Anatoly Mook. Sharpen your mind for clear thoughts and effective decisions.',
      ru: 'Обретите умственную ясность с Анатолием Муком. Обострите ум для чётких мыслей и эффективных решений.',
    },
    keywords: {
      de: ['geistige Klarheit', 'mentale Klarheit', 'klarer Geist', 'Gedankenklarheit', 'Fokus'],
      en: ['mental clarity', 'clear mind', 'mental focus', 'thought clarity', 'cognitive clarity'],
      ru: ['умственная ясность', 'ясный ум', 'ментальный фокус', 'чёткость мышления', 'когнитивная ясность'],
    },
    relatedServices: ['coaching', 'einzelcoaching', 'mentoring'],
    relatedTopics: ['klarheit-finden', 'bewusstseinsentwicklung', 'selbstreflexion', 'entscheidungsstaerke'],
    parentCluster: 'bewusstsein-klarheit',
  },

  {
    slug: 'selbstreflexion',
    slugEn: 'self-reflection',
    slugRu: 'samorefleksiya',
    title: {
      de: 'Selbstreflexion',
      en: 'Self-Reflection',
      ru: 'Саморефлексия',
    },
    description: {
      de: 'Selbstreflexion ist das Werkzeug der Weisen. Anatoly Mook führt Sie in tiefe Reflexionsprozesse, die Ihnen helfen, aus Erfahrungen zu lernen, sich selbst besser zu verstehen und bewusster zu handeln.',
      en: 'Self-reflection is the tool of the wise. Anatoly Mook guides you through deep reflection processes that help you learn from experience, understand yourself better, and act more consciously.',
      ru: 'Саморефлексия — инструмент мудрых. Анатолий Мук проводит вас через глубокие процессы рефлексии, помогающие учиться на опыте, лучше понимать себя и действовать осознаннее.',
    },
    metaTitle: {
      de: 'Selbstreflexion lernen – Anatoly Mook',
      en: 'Learning Self-Reflection – Anatoly Mook',
      ru: 'Саморефлексия – Анатолий Мук',
    },
    metaDescription: {
      de: 'Lernen Sie tiefe Selbstreflexion mit Anatoly Mook. Aus Erfahrung lernen, sich selbst verstehen und bewusster handeln.',
      en: 'Learn deep self-reflection with Anatoly Mook. Learn from experience, understand yourself, and act more consciously.',
      ru: 'Освойте глубокую саморефлексию с Анатолием Муком. Учитесь на опыте, понимайте себя и действуйте осознаннее.',
    },
    keywords: {
      de: ['Selbstreflexion', 'Reflexion', 'sich selbst reflektieren', 'innere Einkehr', 'Selbstbeobachtung'],
      en: ['self-reflection', 'reflection', 'introspection', 'inner review', 'self-observation'],
      ru: ['саморефлексия', 'рефлексия', 'самоанализ', 'внутреннее созерцание', 'самонаблюдение'],
    },
    relatedServices: ['coaching', 'einzelcoaching', 'mentoring'],
    relatedTopics: ['selbsterkenntnis', 'journaling-und-reflexion', 'bewusstseinsentwicklung', 'persoenliches-wachstum'],
    parentCluster: 'bewusstsein-klarheit',
  },

  {
    slug: 'emotionale-intelligenz',
    slugEn: 'emotional-intelligence',
    slugRu: 'emotsionalnyy-intellekt',
    title: {
      de: 'Emotionale Intelligenz',
      en: 'Emotional Intelligence',
      ru: 'Эмоциональный интеллект',
    },
    description: {
      de: 'Emotionale Intelligenz ist die unsichtbare Superkraft erfolgreicher Führungskräfte. Anatoly Mook hilft Ihnen, Ihre Emotionen zu verstehen, zu regulieren und als Kraftquelle für bewusste Führung und tiefe Beziehungen zu nutzen.',
      en: 'Emotional intelligence is the invisible superpower of successful leaders. Anatoly Mook helps you understand, regulate, and harness your emotions as a source of power for conscious leadership and deep relationships.',
      ru: 'Эмоциональный интеллект — невидимая суперсила успешных руководителей. Анатолий Мук помогает понимать, регулировать и использовать эмоции как источник силы для осознанного лидерства и глубоких отношений.',
    },
    metaTitle: {
      de: 'Emotionale Intelligenz – Anatoly Mook',
      en: 'Emotional Intelligence – Anatoly Mook',
      ru: 'Эмоциональный интеллект – Анатолий Мук',
    },
    metaDescription: {
      de: 'Stärken Sie Ihre emotionale Intelligenz mit Anatoly Mook. Emotionen verstehen und als Kraft für Führung und Beziehungen nutzen.',
      en: 'Strengthen your emotional intelligence with Anatoly Mook. Understand emotions and use them as power for leadership and relationships.',
      ru: 'Укрепите эмоциональный интеллект с Анатолием Муком. Понимайте эмоции и используйте их как силу для лидерства и отношений.',
    },
    keywords: {
      de: ['emotionale Intelligenz', 'EQ', 'Emotionen verstehen', 'Gefühle regulieren', 'Empathie'],
      en: ['emotional intelligence', 'EQ', 'understanding emotions', 'emotional regulation', 'empathy'],
      ru: ['эмоциональный интеллект', 'EQ', 'понимание эмоций', 'регуляция эмоций', 'эмпатия'],
    },
    relatedServices: ['coaching', 'seminare', 'fuehrungskraefteentwicklung'],
    relatedTopics: ['selbsterkenntnis', 'bewusste-fuehrung', 'teamfuehrung', 'authentische-fuehrung'],
    parentCluster: 'bewusstsein-klarheit',
  },

  {
    slug: 'intuition-entwickeln',
    slugEn: 'developing-intuition',
    slugRu: 'razvitie-intuitsii',
    title: {
      de: 'Intuition entwickeln',
      en: 'Developing Intuition',
      ru: 'Развитие интуиции',
    },
    description: {
      de: 'Intuition ist mehr als ein Bauchgefühl – sie ist verdichtete Weisheit. Anatoly Mook zeigt Ihnen, wie Sie Ihre intuitive Intelligenz stärken und als verlässlichen Kompass für Entscheidungen in Führung und Leben nutzen.',
      en: 'Intuition is more than a gut feeling – it is condensed wisdom. Anatoly Mook shows you how to strengthen your intuitive intelligence and use it as a reliable compass for decisions in leadership and life.',
      ru: 'Интуиция — больше, чем чутьё. Это сконцентрированная мудрость. Анатолий Мук покажет, как усилить интуитивный интеллект и использовать его как надёжный компас для решений в лидерстве и жизни.',
    },
    metaTitle: {
      de: 'Intuition entwickeln – Anatoly Mook',
      en: 'Developing Intuition – Anatoly Mook',
      ru: 'Развитие интуиции – Анатолий Мук',
    },
    metaDescription: {
      de: 'Entwickeln Sie Ihre Intuition mit Anatoly Mook. Stärken Sie Ihre innere Weisheit als Kompass für bewusste Entscheidungen.',
      en: 'Develop your intuition with Anatoly Mook. Strengthen your inner wisdom as a compass for conscious decisions.',
      ru: 'Развивайте интуицию с Анатолием Муком. Усильте внутреннюю мудрость как компас для осознанных решений.',
    },
    keywords: {
      de: ['Intuition entwickeln', 'Intuition stärken', 'innere Stimme', 'Bauchgefühl', 'intuitive Führung'],
      en: ['developing intuition', 'strengthening intuition', 'inner voice', 'gut feeling', 'intuitive leadership'],
      ru: ['развитие интуиции', 'усиление интуиции', 'внутренний голос', 'чутьё', 'интуитивное лидерство'],
    },
    relatedServices: ['coaching', 'mentoring', 'retreat'],
    relatedTopics: ['bewusste-wahrnehmung', 'selbsterkenntnis', 'entscheidungsstaerke', 'bewusstseinsentwicklung'],
    parentCluster: 'bewusstsein-klarheit',
  },

  // ═══════════════════════════════════════════════════════════════
  // CLUSTER 2: Führung & Leadership (12 topics)
  // ═══════════════════════════════════════════════════════════════

  {
    slug: 'bewusste-fuehrung',
    slugEn: 'conscious-leadership',
    slugRu: 'osoznannoe-liderstvo',
    title: {
      de: 'Bewusste Führung',
      en: 'Conscious Leadership',
      ru: 'Осознанное лидерство',
    },
    description: {
      de: 'Bewusste Führung beginnt bei Ihnen selbst. Anatoly Mook begleitet Führungskräfte dabei, aus innerer Klarheit heraus zu führen – mit Authentizität, Empathie und dem Mut, neue Wege zu gehen.',
      en: 'Conscious leadership starts with yourself. Anatoly Mook accompanies leaders in leading from inner clarity – with authenticity, empathy, and the courage to forge new paths.',
      ru: 'Осознанное лидерство начинается с вас самих. Анатолий Мук сопровождает руководителей в лидерстве из внутренней ясности — с подлинностью, эмпатией и смелостью идти новыми путями.',
    },
    metaTitle: {
      de: 'Bewusste Führung – Anatoly Mook',
      en: 'Conscious Leadership – Anatoly Mook',
      ru: 'Осознанное лидерство – Анатолий Мук',
    },
    metaDescription: {
      de: 'Bewusste Führung mit Anatoly Mook. Führen Sie aus innerer Klarheit – mit Authentizität, Empathie und Mut für neue Wege.',
      en: 'Conscious leadership with Anatoly Mook. Lead from inner clarity – with authenticity, empathy, and courage for new paths.',
      ru: 'Осознанное лидерство с Анатолием Муком. Руководите из внутренней ясности — с подлинностью, эмпатией и смелостью.',
    },
    keywords: {
      de: ['bewusste Führung', 'conscious leadership', 'achtsame Führung', 'Führung mit Bewusstsein', 'moderne Führung'],
      en: ['conscious leadership', 'mindful leadership', 'aware leadership', 'modern leadership', 'leadership coaching'],
      ru: ['осознанное лидерство', 'сознательное руководство', 'внимательное лидерство', 'современное лидерство', 'коучинг лидерства'],
    },
    relatedServices: ['coaching', 'fuehrungskraefteentwicklung', 'seminare', 'executive-coaching'],
    relatedTopics: ['authentische-fuehrung', 'servant-leadership', 'leadership-mindset', 'fuehrungskultur'],
    parentCluster: 'fuehrung-leadership',
  },

  {
    slug: 'executive-coaching',
    slugEn: 'executive-coaching',
    slugRu: 'eksekutivnyy-kouching',
    title: {
      de: 'Executive Coaching',
      en: 'Executive Coaching',
      ru: 'Экзекутивный коучинг',
    },
    description: {
      de: 'Executive Coaching auf höchstem Niveau: Anatoly Mook arbeitet vertraulich mit Führungskräften und Entscheidern, um blinde Flecken aufzudecken, Klarheit zu gewinnen und die eigene Führungswirkung nachhaltig zu stärken.',
      en: 'Executive coaching at the highest level: Anatoly Mook works confidentially with leaders and decision-makers to uncover blind spots, gain clarity, and sustainably strengthen their leadership impact.',
      ru: 'Экзекутивный коучинг на высшем уровне: Анатолий Мук конфиденциально работает с руководителями и лицами, принимающими решения, чтобы выявить слепые зоны, обрести ясность и устойчиво усилить лидерское влияние.',
    },
    metaTitle: {
      de: 'Executive Coaching – Anatoly Mook',
      en: 'Executive Coaching – Anatoly Mook',
      ru: 'Экзекутивный коучинг – Анатолий Мук',
    },
    metaDescription: {
      de: 'Executive Coaching mit Anatoly Mook in Unna. Vertrauliche Begleitung für Führungskräfte – Klarheit, Wirkung und nachhaltige Entwicklung.',
      en: 'Executive coaching with Anatoly Mook. Confidential support for leaders – clarity, impact, and sustainable development.',
      ru: 'Экзекутивный коучинг с Анатолием Муком. Конфиденциальная поддержка руководителей — ясность, влияние и устойчивое развитие.',
    },
    keywords: {
      de: ['Executive Coaching', 'Führungskräfte Coaching', 'C-Level Coaching', 'Management Coaching', 'Coaching für Entscheider'],
      en: ['executive coaching', 'leadership coaching', 'C-level coaching', 'management coaching', 'coaching for executives'],
      ru: ['экзекутивный коучинг', 'коучинг руководителей', 'коучинг топ-менеджмента', 'управленческий коучинг', 'коучинг для руководителей'],
    },
    relatedServices: ['executive-coaching', 'einzelcoaching', 'coaching'],
    relatedTopics: ['bewusste-fuehrung', 'fuehrungskraefteentwicklung', 'entscheidungsstaerke', 'strategisches-denken'],
    parentCluster: 'fuehrung-leadership',
  },

  {
    slug: 'fuehrungskraefteentwicklung',
    slugEn: 'leadership-development',
    slugRu: 'razvitie-rukovoditeley',
    title: {
      de: 'Führungskräfteentwicklung',
      en: 'Leadership Development',
      ru: 'Развитие руководителей',
    },
    description: {
      de: 'Führungskräfteentwicklung mit Tiefgang: Anatoly Mook entwickelt maßgeschneiderte Programme, die nicht nur Kompetenzen trainieren, sondern Bewusstsein und Charakter von Führungspersönlichkeiten formen.',
      en: 'Leadership development with depth: Anatoly Mook creates tailored programs that do not just train competencies but shape the consciousness and character of leadership personalities.',
      ru: 'Развитие руководителей с глубиной: Анатолий Мук создаёт индивидуальные программы, которые не просто тренируют компетенции, а формируют сознание и характер лидеров.',
    },
    metaTitle: {
      de: 'Führungskräfteentwicklung – Anatoly Mook',
      en: 'Leadership Development – Anatoly Mook',
      ru: 'Развитие руководителей – Анатолий Мук',
    },
    metaDescription: {
      de: 'Ganzheitliche Führungskräfteentwicklung mit Anatoly Mook. Programme, die Bewusstsein, Charakter und Kompetenz von Führungskräften formen.',
      en: 'Holistic leadership development with Anatoly Mook. Programs that shape awareness, character, and competence of leaders.',
      ru: 'Целостное развитие руководителей с Анатолием Муком. Программы, формирующие сознание, характер и компетенции лидеров.',
    },
    keywords: {
      de: ['Führungskräfteentwicklung', 'Leadership Development', 'Führungstraining', 'Führungsprogramm', 'Führungskompetenz'],
      en: ['leadership development', 'leader development', 'leadership training', 'leadership program', 'leadership competency'],
      ru: ['развитие руководителей', 'развитие лидеров', 'тренинг лидерства', 'программа лидерства', 'компетенции лидера'],
    },
    relatedServices: ['fuehrungskraefteentwicklung', 'seminare', 'corporate-coaching'],
    relatedTopics: ['bewusste-fuehrung', 'executive-coaching', 'leadership-mindset', 'fuehrungskultur'],
    parentCluster: 'fuehrung-leadership',
  },

  {
    slug: 'servant-leadership',
    slugEn: 'servant-leadership',
    slugRu: 'sluzhashhee-liderstvo',
    title: {
      de: 'Servant Leadership',
      en: 'Servant Leadership',
      ru: 'Служащее лидерство',
    },
    description: {
      de: 'Servant Leadership stellt den Menschen in den Mittelpunkt der Führung. Anatoly Mook vermittelt diesen kraftvollen Führungsansatz, bei dem Sie durch Dienen führen und durch Ihre Haltung inspirieren.',
      en: 'Servant leadership places people at the center of leadership. Anatoly Mook teaches this powerful leadership approach where you lead by serving and inspire through your attitude.',
      ru: 'Служащее лидерство ставит людей в центр руководства. Анатолий Мук передаёт этот мощный подход, при котором вы руководите через служение и вдохновляете своей позицией.',
    },
    metaTitle: {
      de: 'Servant Leadership – Anatoly Mook',
      en: 'Servant Leadership – Anatoly Mook',
      ru: 'Служащее лидерство – Анатолий Мук',
    },
    metaDescription: {
      de: 'Servant Leadership mit Anatoly Mook. Führen durch Dienen – ein bewusster Ansatz für nachhaltige und menschenzentrierte Führung.',
      en: 'Servant leadership with Anatoly Mook. Leading by serving – a conscious approach to sustainable, people-centered leadership.',
      ru: 'Служащее лидерство с Анатолием Муком. Руководство через служение — осознанный подход к устойчивому, человекоцентричному лидерству.',
    },
    keywords: {
      de: ['Servant Leadership', 'dienende Führung', 'menschenzentrierte Führung', 'Führung durch Dienen', 'empathische Führung'],
      en: ['servant leadership', 'serving leadership', 'people-centered leadership', 'leading by serving', 'empathic leadership'],
      ru: ['служащее лидерство', 'лидерство через служение', 'человекоцентричное лидерство', 'эмпатичное лидерство', 'служение в руководстве'],
    },
    relatedServices: ['seminare', 'coaching', 'fuehrungskraefteentwicklung'],
    relatedTopics: ['bewusste-fuehrung', 'authentische-fuehrung', 'teamfuehrung', 'fuehrungskultur'],
    parentCluster: 'fuehrung-leadership',
  },

  {
    slug: 'authentische-fuehrung',
    slugEn: 'authentic-leadership',
    slugRu: 'podlinnoe-liderstvo',
    title: {
      de: 'Authentische Führung',
      en: 'Authentic Leadership',
      ru: 'Подлинное лидерство',
    },
    description: {
      de: 'Authentische Führung bedeutet, im Einklang mit Ihren Werten zu handeln. Anatoly Mook begleitet Sie dabei, Ihre wahre Führungspersönlichkeit zu entdecken und aus Ihrer Mitte heraus zu führen – ohne Maske, ohne Rolle.',
      en: 'Authentic leadership means acting in alignment with your values. Anatoly Mook accompanies you in discovering your true leadership personality and leading from your center – without masks, without roles.',
      ru: 'Подлинное лидерство — это действия в согласии со своими ценностями. Анатолий Мук сопровождает вас в открытии вашей истинной лидерской личности и руководстве из своего центра — без масок, без ролей.',
    },
    metaTitle: {
      de: 'Authentische Führung – Anatoly Mook',
      en: 'Authentic Leadership – Anatoly Mook',
      ru: 'Подлинное лидерство – Анатолий Мук',
    },
    metaDescription: {
      de: 'Authentische Führung mit Anatoly Mook. Entdecken Sie Ihre wahre Führungspersönlichkeit und führen Sie im Einklang mit Ihren Werten.',
      en: 'Authentic leadership with Anatoly Mook. Discover your true leadership personality and lead in alignment with your values.',
      ru: 'Подлинное лидерство с Анатолием Муком. Откройте свою истинную лидерскую личность и руководите в согласии с ценностями.',
    },
    keywords: {
      de: ['authentische Führung', 'Authentizität', 'wahre Führung', 'Führung mit Werten', 'echte Führung'],
      en: ['authentic leadership', 'authenticity', 'true leadership', 'values-based leadership', 'genuine leadership'],
      ru: ['подлинное лидерство', 'аутентичность', 'истинное лидерство', 'ценностное лидерство', 'настоящее лидерство'],
    },
    relatedServices: ['coaching', 'einzelcoaching', 'mentoring'],
    relatedTopics: ['bewusste-fuehrung', 'selbsterkenntnis', 'servant-leadership', 'unternehmenswerte'],
    parentCluster: 'fuehrung-leadership',
  },

  {
    slug: 'visionaere-fuehrung',
    slugEn: 'visionary-leadership',
    slugRu: 'vizionerskoe-liderstvo',
    title: {
      de: 'Visionäre Führung',
      en: 'Visionary Leadership',
      ru: 'Визионерское лидерство',
    },
    description: {
      de: 'Visionäre Führung schafft Zukunft. Anatoly Mook unterstützt Sie dabei, eine kraftvolle Vision zu entwickeln, die Ihr Team inspiriert und Ihr Unternehmen in eine bedeutungsvolle Richtung lenkt.',
      en: 'Visionary leadership creates the future. Anatoly Mook supports you in developing a powerful vision that inspires your team and steers your organization toward a meaningful direction.',
      ru: 'Визионерское лидерство создаёт будущее. Анатолий Мук помогает разработать мощное видение, которое вдохновляет команду и направляет организацию к значимым целям.',
    },
    metaTitle: {
      de: 'Visionäre Führung – Anatoly Mook',
      en: 'Visionary Leadership – Anatoly Mook',
      ru: 'Визионерское лидерство – Анатолий Мук',
    },
    metaDescription: {
      de: 'Visionäre Führung mit Anatoly Mook. Entwickeln Sie eine kraftvolle Vision, die Ihr Team inspiriert und Zukunft gestaltet.',
      en: 'Visionary leadership with Anatoly Mook. Develop a powerful vision that inspires your team and shapes the future.',
      ru: 'Визионерское лидерство с Анатолием Муком. Создайте мощное видение, вдохновляющее команду и формирующее будущее.',
    },
    keywords: {
      de: ['visionäre Führung', 'Vision entwickeln', 'Zukunftsvision', 'inspirierende Führung', 'Unternehmervision'],
      en: ['visionary leadership', 'developing vision', 'future vision', 'inspiring leadership', 'leadership vision'],
      ru: ['визионерское лидерство', 'развитие видения', 'видение будущего', 'вдохновляющее лидерство', 'лидерское видение'],
    },
    relatedServices: ['coaching', 'executive-coaching', 'seminare'],
    relatedTopics: ['bewusste-fuehrung', 'strategisches-denken', 'change-management', 'innovation-und-kreativitaet'],
    parentCluster: 'fuehrung-leadership',
  },

  {
    slug: 'fuehrung-in-der-krise',
    slugEn: 'leadership-in-crisis',
    slugRu: 'liderstvo-v-krizise',
    title: {
      de: 'Führung in der Krise',
      en: 'Leadership in Crisis',
      ru: 'Лидерство в кризисе',
    },
    description: {
      de: 'In der Krise zeigt sich wahre Führung. Anatoly Mook begleitet Führungskräfte durch herausfordernde Zeiten – mit innerer Stabilität, klarem Denken und der Fähigkeit, auch unter Druck bewusst zu handeln.',
      en: 'True leadership reveals itself in crisis. Anatoly Mook accompanies leaders through challenging times – with inner stability, clear thinking, and the ability to act consciously even under pressure.',
      ru: 'Истинное лидерство проявляется в кризисе. Анатолий Мук сопровождает руководителей в сложные времена — с внутренней стабильностью, ясным мышлением и способностью действовать осознанно даже под давлением.',
    },
    metaTitle: {
      de: 'Führung in der Krise – Anatoly Mook',
      en: 'Leadership in Crisis – Anatoly Mook',
      ru: 'Лидерство в кризисе – Анатолий Мук',
    },
    metaDescription: {
      de: 'Souverän führen in der Krise. Anatoly Mook stärkt Ihre innere Stabilität und Klarheit für bewusstes Handeln unter Druck.',
      en: 'Lead with confidence in crisis. Anatoly Mook strengthens your inner stability and clarity for conscious action under pressure.',
      ru: 'Уверенно руководите в кризисе. Анатолий Мук укрепляет внутреннюю стабильность и ясность для осознанных действий под давлением.',
    },
    keywords: {
      de: ['Führung in der Krise', 'Krisenführung', 'Krisenmanagement', 'Führung unter Druck', 'souverän in der Krise'],
      en: ['leadership in crisis', 'crisis leadership', 'crisis management', 'leading under pressure', 'composure in crisis'],
      ru: ['лидерство в кризисе', 'кризисное лидерство', 'управление в кризисе', 'руководство под давлением', 'самообладание в кризисе'],
    },
    relatedServices: ['coaching', 'executive-coaching', 'einzelcoaching'],
    relatedTopics: ['resilienz-aufbauen', 'entscheidungsstaerke', 'innere-staerke', 'change-management'],
    parentCluster: 'fuehrung-leadership',
  },

  {
    slug: 'entscheidungsstaerke',
    slugEn: 'decision-making-strength',
    slugRu: 'sila-prinyatiya-resheniy',
    title: {
      de: 'Entscheidungsstärke',
      en: 'Decision-Making Strength',
      ru: 'Сила принятия решений',
    },
    description: {
      de: 'Entscheidungsstärke entsteht aus Klarheit und Vertrauen. Anatoly Mook stärkt Ihre Fähigkeit, auch in komplexen Situationen klar, schnell und bewusst zu entscheiden – ohne Zweifel und Zögern.',
      en: 'Decision-making strength comes from clarity and trust. Anatoly Mook strengthens your ability to decide clearly, quickly, and consciously even in complex situations – without doubt and hesitation.',
      ru: 'Сила принятия решений рождается из ясности и доверия. Анатолий Мук усиливает вашу способность принимать чёткие, быстрые и осознанные решения даже в сложных ситуациях — без сомнений и колебаний.',
    },
    metaTitle: {
      de: 'Entscheidungsstärke – Anatoly Mook',
      en: 'Decision-Making Strength – Anatoly Mook',
      ru: 'Сила принятия решений – Анатолий Мук',
    },
    metaDescription: {
      de: 'Stärken Sie Ihre Entscheidungskraft mit Anatoly Mook. Klar, schnell und bewusst entscheiden – auch in komplexen Situationen.',
      en: 'Strengthen your decision-making power with Anatoly Mook. Decide clearly, quickly, and consciously – even in complex situations.',
      ru: 'Усильте способность принимать решения с Анатолием Муком. Решайте чётко, быстро и осознанно — даже в сложных ситуациях.',
    },
    keywords: {
      de: ['Entscheidungsstärke', 'Entscheidungsfähigkeit', 'besser entscheiden', 'Entscheidungscoaching', 'klare Entscheidungen'],
      en: ['decision-making strength', 'decisiveness', 'better decisions', 'decision coaching', 'clear decisions'],
      ru: ['сила решений', 'решительность', 'лучшие решения', 'коучинг решений', 'чёткие решения'],
    },
    relatedServices: ['coaching', 'executive-coaching', 'einzelcoaching'],
    relatedTopics: ['geistige-klarheit', 'intuition-entwickeln', 'fuehrung-in-der-krise', 'strategisches-denken'],
    parentCluster: 'fuehrung-leadership',
  },

  {
    slug: 'teamfuehrung',
    slugEn: 'team-leadership',
    slugRu: 'rukovodstvo-komandoy',
    title: {
      de: 'Teamführung',
      en: 'Team Leadership',
      ru: 'Руководство командой',
    },
    description: {
      de: 'Exzellente Teamführung verbindet Menschen mit einem gemeinsamen Ziel. Anatoly Mook vermittelt Ihnen, wie Sie Ihr Team mit Bewusstsein, Klarheit und Empathie zu Höchstleistungen führen.',
      en: 'Excellent team leadership connects people with a shared purpose. Anatoly Mook teaches you how to lead your team to peak performance with awareness, clarity, and empathy.',
      ru: 'Превосходное руководство командой объединяет людей общей целью. Анатолий Мук научит вас вести команду к высочайшей результативности с осознанностью, ясностью и эмпатией.',
    },
    metaTitle: {
      de: 'Teamführung – Anatoly Mook',
      en: 'Team Leadership – Anatoly Mook',
      ru: 'Руководство командой – Анатолий Мук',
    },
    metaDescription: {
      de: 'Bewusste Teamführung mit Anatoly Mook. Führen Sie Ihr Team mit Klarheit und Empathie zu Höchstleistungen und echtem Zusammenhalt.',
      en: 'Conscious team leadership with Anatoly Mook. Lead your team to peak performance and genuine cohesion with clarity and empathy.',
      ru: 'Осознанное руководство командой с Анатолием Муком. Ведите команду к результатам и сплочённости с ясностью и эмпатией.',
    },
    keywords: {
      de: ['Teamführung', 'Team führen', 'Teamleitung', 'Teamentwicklung', 'Teamcoaching'],
      en: ['team leadership', 'leading teams', 'team management', 'team development', 'team coaching'],
      ru: ['руководство командой', 'управление командой', 'тимлидерство', 'развитие команды', 'командный коучинг'],
    },
    relatedServices: ['coaching', 'seminare', 'teamentwicklung'],
    relatedTopics: ['bewusste-fuehrung', 'teamentwicklung', 'servant-leadership', 'mitarbeitermotivation'],
    parentCluster: 'fuehrung-leadership',
  },

  {
    slug: 'change-management',
    slugEn: 'change-management',
    slugRu: 'upravlenie-izmeneniyami',
    title: {
      de: 'Change Management',
      en: 'Change Management',
      ru: 'Управление изменениями',
    },
    description: {
      de: 'Wandel gelingt, wenn er bewusst gestaltet wird. Anatoly Mook begleitet Führungskräfte und Organisationen durch Veränderungsprozesse – mit Klarheit, Empathie und einem tiefen Verständnis menschlicher Dynamiken.',
      en: 'Change succeeds when it is consciously shaped. Anatoly Mook accompanies leaders and organizations through change processes – with clarity, empathy, and a deep understanding of human dynamics.',
      ru: 'Изменения удаются, когда их формируют осознанно. Анатолий Мук сопровождает руководителей и организации через процессы изменений — с ясностью, эмпатией и глубоким пониманием человеческих динамик.',
    },
    metaTitle: {
      de: 'Change Management – Anatoly Mook',
      en: 'Change Management – Anatoly Mook',
      ru: 'Управление изменениями – Анатолий Мук',
    },
    metaDescription: {
      de: 'Bewusstes Change Management mit Anatoly Mook. Veränderungsprozesse mit Klarheit und Empathie erfolgreich gestalten.',
      en: 'Conscious change management with Anatoly Mook. Successfully shape change processes with clarity and empathy.',
      ru: 'Осознанное управление изменениями с Анатолием Муком. Успешно формируйте процессы изменений с ясностью и эмпатией.',
    },
    keywords: {
      de: ['Change Management', 'Veränderungsmanagement', 'Wandel gestalten', 'Transformationsprozess', 'Veränderung führen'],
      en: ['change management', 'managing change', 'organizational change', 'transformation process', 'leading change'],
      ru: ['управление изменениями', 'менеджмент изменений', 'организационные изменения', 'процесс трансформации', 'лидерство в переменах'],
    },
    relatedServices: ['coaching', 'corporate-coaching', 'seminare'],
    relatedTopics: ['organisationsentwicklung', 'fuehrung-in-der-krise', 'visionaere-fuehrung', 'agile-fuehrung'],
    parentCluster: 'fuehrung-leadership',
  },

  {
    slug: 'leadership-mindset',
    slugEn: 'leadership-mindset',
    slugRu: 'lidersky-mayndset',
    title: {
      de: 'Leadership Mindset',
      en: 'Leadership Mindset',
      ru: 'Лидерский майндсет',
    },
    description: {
      de: 'Das richtige Mindset ist die Grundlage großer Führung. Anatoly Mook arbeitet mit Ihnen an der inneren Haltung, die Sie brauchen, um mit Klarheit, Resilienz und Weitsicht zu führen.',
      en: 'The right mindset is the foundation of great leadership. Anatoly Mook works with you on the inner attitude you need to lead with clarity, resilience, and foresight.',
      ru: 'Правильный майндсет — основа великого лидерства. Анатолий Мук работает с вами над внутренней позицией, необходимой для руководства с ясностью, стойкостью и дальновидностью.',
    },
    metaTitle: {
      de: 'Leadership Mindset – Anatoly Mook',
      en: 'Leadership Mindset – Anatoly Mook',
      ru: 'Лидерский майндсет – Анатолий Мук',
    },
    metaDescription: {
      de: 'Entwickeln Sie Ihr Leadership Mindset mit Anatoly Mook. Die innere Haltung für Klarheit, Resilienz und weitsichtige Führung.',
      en: 'Develop your leadership mindset with Anatoly Mook. The inner attitude for clarity, resilience, and far-sighted leadership.',
      ru: 'Развивайте лидерский майндсет с Анатолием Муком. Внутренняя позиция для ясности, стойкости и дальновидного руководства.',
    },
    keywords: {
      de: ['Leadership Mindset', 'Führungs-Mindset', 'Growth Mindset', 'Führungshaltung', 'mentale Stärke'],
      en: ['leadership mindset', 'growth mindset', 'leadership attitude', 'mental strength', 'leader mentality'],
      ru: ['лидерский майндсет', 'майндсет роста', 'лидерская позиция', 'ментальная сила', 'менталитет лидера'],
    },
    relatedServices: ['coaching', 'mentoring', 'seminare'],
    relatedTopics: ['bewusste-fuehrung', 'fuehrungskraefteentwicklung', 'peak-performance', 'selbstmeisterschaft'],
    parentCluster: 'fuehrung-leadership',
  },

  {
    slug: 'fuehrungskultur',
    slugEn: 'leadership-culture',
    slugRu: 'kultura-liderstva',
    title: {
      de: 'Führungskultur',
      en: 'Leadership Culture',
      ru: 'Культура лидерства',
    },
    description: {
      de: 'Eine bewusste Führungskultur ist das Fundament nachhaltigen Erfolgs. Anatoly Mook unterstützt Organisationen dabei, eine Führungskultur zu etablieren, die auf Vertrauen, Klarheit und gemeinsamen Werten basiert.',
      en: 'A conscious leadership culture is the foundation of sustainable success. Anatoly Mook supports organizations in establishing a leadership culture based on trust, clarity, and shared values.',
      ru: 'Осознанная культура лидерства — фундамент устойчивого успеха. Анатолий Мук помогает организациям создать культуру лидерства, основанную на доверии, ясности и общих ценностях.',
    },
    metaTitle: {
      de: 'Führungskultur gestalten – Anatoly Mook',
      en: 'Shaping Leadership Culture – Anatoly Mook',
      ru: 'Культура лидерства – Анатолий Мук',
    },
    metaDescription: {
      de: 'Gestalten Sie Ihre Führungskultur mit Anatoly Mook. Vertrauen, Klarheit und gemeinsame Werte als Fundament nachhaltigen Erfolgs.',
      en: 'Shape your leadership culture with Anatoly Mook. Trust, clarity, and shared values as the foundation of sustainable success.',
      ru: 'Формируйте культуру лидерства с Анатолием Муком. Доверие, ясность и общие ценности как основа устойчивого успеха.',
    },
    keywords: {
      de: ['Führungskultur', 'Unternehmenskultur', 'Führungsleitbild', 'Wertebasierte Führung', 'Kulturwandel'],
      en: ['leadership culture', 'corporate culture', 'leadership model', 'values-based leadership', 'cultural change'],
      ru: ['культура лидерства', 'корпоративная культура', 'модель лидерства', 'ценностное руководство', 'культурные изменения'],
    },
    relatedServices: ['corporate-coaching', 'seminare', 'organisationsentwicklung'],
    relatedTopics: ['unternehmenskultur', 'bewusste-fuehrung', 'unternehmenswerte', 'organisationsentwicklung'],
    parentCluster: 'fuehrung-leadership',
  },

  // ═══════════════════════════════════════════════════════════════
  // CLUSTER 3: Persönliche Meisterschaft (12 topics)
  // ═══════════════════════════════════════════════════════════════

  {
    slug: 'persoenliche-transformation',
    slugEn: 'personal-transformation',
    slugRu: 'lichnaya-transformatsiya',
    title: {
      de: 'Persönliche Transformation',
      en: 'Personal Transformation',
      ru: 'Личная трансформация',
    },
    description: {
      de: 'Persönliche Transformation ist der tiefgreifende Wandel, der entsteht, wenn Sie bereit sind, alte Muster loszulassen. Anatoly Mook begleitet Sie durch diesen kraftvollen Prozess hin zu einem authentischen, bewussten Leben.',
      en: 'Personal transformation is the profound change that occurs when you are ready to let go of old patterns. Anatoly Mook guides you through this powerful process toward an authentic, conscious life.',
      ru: 'Личная трансформация — глубокие перемены, происходящие, когда вы готовы отпустить старые паттерны. Анатолий Мук проведёт вас через этот мощный процесс к подлинной, осознанной жизни.',
    },
    metaTitle: {
      de: 'Persönliche Transformation – Anatoly Mook',
      en: 'Personal Transformation – Anatoly Mook',
      ru: 'Личная трансформация – Анатолий Мук',
    },
    metaDescription: {
      de: 'Erleben Sie persönliche Transformation mit Anatoly Mook. Alte Muster loslassen und ein authentisches, bewusstes Leben gestalten.',
      en: 'Experience personal transformation with Anatoly Mook. Let go of old patterns and create an authentic, conscious life.',
      ru: 'Пройдите личную трансформацию с Анатолием Муком. Отпустите старые паттерны и создайте подлинную, осознанную жизнь.',
    },
    keywords: {
      de: ['persönliche Transformation', 'Transformation', 'Lebensveränderung', 'innerer Wandel', 'Neuanfang'],
      en: ['personal transformation', 'transformation', 'life change', 'inner change', 'new beginning'],
      ru: ['личная трансформация', 'трансформация', 'изменение жизни', 'внутренние перемены', 'новое начало'],
    },
    relatedServices: ['coaching', 'mentoring', 'retreat'],
    relatedTopics: ['selbstmeisterschaft', 'bewusstseinsentwicklung', 'transformationsprozesse', 'gewohnheiten-aendern'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  {
    slug: 'selbstmeisterschaft',
    slugEn: 'self-mastery',
    slugRu: 'samomasterstvo',
    title: {
      de: 'Selbstmeisterschaft',
      en: 'Self-Mastery',
      ru: 'Самомастерство',
    },
    description: {
      de: 'Selbstmeisterschaft ist die höchste Form persönlicher Entwicklung. Anatoly Mook begleitet Sie auf dem Weg, Herr über Ihre Gedanken, Emotionen und Handlungen zu werden – für ein Leben in voller Souveränität.',
      en: 'Self-mastery is the highest form of personal development. Anatoly Mook accompanies you on the path to becoming the master of your thoughts, emotions, and actions – for a life of full sovereignty.',
      ru: 'Самомастерство — высшая форма личностного развития. Анатолий Мук сопровождает вас на пути к овладению своими мыслями, эмоциями и действиями — к жизни в полной суверенности.',
    },
    metaTitle: {
      de: 'Selbstmeisterschaft – Anatoly Mook',
      en: 'Self-Mastery – Anatoly Mook',
      ru: 'Самомастерство – Анатолий Мук',
    },
    metaDescription: {
      de: 'Erreichen Sie Selbstmeisterschaft mit Anatoly Mook. Der Weg zu voller Souveränität über Gedanken, Emotionen und Handlungen.',
      en: 'Achieve self-mastery with Anatoly Mook. The path to full sovereignty over your thoughts, emotions, and actions.',
      ru: 'Достигните самомастерства с Анатолием Муком. Путь к полной суверенности над мыслями, эмоциями и действиями.',
    },
    keywords: {
      de: ['Selbstmeisterschaft', 'Meisterschaft', 'Selbstbeherrschung', 'innere Meisterung', 'persönliche Meisterschaft'],
      en: ['self-mastery', 'mastery', 'self-control', 'inner mastery', 'personal mastery'],
      ru: ['самомастерство', 'мастерство', 'самообладание', 'внутреннее мастерство', 'личное мастерство'],
    },
    relatedServices: ['coaching', 'mentoring', 'retreat'],
    relatedTopics: ['persoenliche-transformation', 'disziplin-und-willenskraft', 'peak-performance', 'bewusstseinsentwicklung'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  {
    slug: 'potenzialentfaltung',
    slugEn: 'unlocking-potential',
    slugRu: 'raskrytie-potentsiala',
    title: {
      de: 'Potenzialentfaltung',
      en: 'Unlocking Potential',
      ru: 'Раскрытие потенциала',
    },
    description: {
      de: 'In jedem Menschen schlummert ungenutztes Potenzial. Anatoly Mook hilft Ihnen, Ihre verborgenen Stärken und Talente zu entdecken und systematisch zu entfalten – für ein Leben, das Ihrem wahren Potenzial entspricht.',
      en: 'Untapped potential lies dormant in every person. Anatoly Mook helps you discover your hidden strengths and talents and systematically unfold them – for a life that matches your true potential.',
      ru: 'В каждом человеке дремлет нераскрытый потенциал. Анатолий Мук помогает обнаружить скрытые силы и таланты и систематически их раскрывать — для жизни, соответствующей вашему истинному потенциалу.',
    },
    metaTitle: {
      de: 'Potenzialentfaltung – Anatoly Mook',
      en: 'Unlocking Potential – Anatoly Mook',
      ru: 'Раскрытие потенциала – Анатолий Мук',
    },
    metaDescription: {
      de: 'Entfalten Sie Ihr volles Potenzial mit Anatoly Mook. Verborgene Stärken entdecken und systematisch zur Entfaltung bringen.',
      en: 'Unlock your full potential with Anatoly Mook. Discover hidden strengths and systematically bring them to life.',
      ru: 'Раскройте свой потенциал с Анатолием Муком. Откройте скрытые силы и систематически воплотите их в жизнь.',
    },
    keywords: {
      de: ['Potenzialentfaltung', 'Potenzial entfalten', 'verborgene Stärken', 'Talententwicklung', 'Potenzial erkennen'],
      en: ['unlocking potential', 'potential development', 'hidden strengths', 'talent development', 'realizing potential'],
      ru: ['раскрытие потенциала', 'развитие потенциала', 'скрытые силы', 'развитие талантов', 'реализация потенциала'],
    },
    relatedServices: ['coaching', 'einzelcoaching', 'mentoring'],
    relatedTopics: ['persoenliches-wachstum', 'lebenszweck-finden', 'selbstmeisterschaft', 'peak-performance'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  {
    slug: 'lebenszweck-finden',
    slugEn: 'finding-life-purpose',
    slugRu: 'poisk-zhiznennoy-tseli',
    title: {
      de: 'Lebenszweck finden',
      en: 'Finding Life Purpose',
      ru: 'Поиск жизненной цели',
    },
    description: {
      de: 'Den eigenen Lebenszweck zu kennen gibt allem Handeln Richtung und Tiefe. Anatoly Mook begleitet Sie bei der Entdeckung Ihres einzigartigen Beitrags – damit Ihr Leben nicht nur erfolgreich, sondern auch bedeutsam wird.',
      en: 'Knowing your life purpose gives direction and depth to all your actions. Anatoly Mook accompanies you in discovering your unique contribution – so your life becomes not just successful but meaningful.',
      ru: 'Знание жизненной цели придаёт направление и глубину всем действиям. Анатолий Мук сопровождает вас в открытии уникального предназначения — чтобы жизнь стала не просто успешной, а значимой.',
    },
    metaTitle: {
      de: 'Lebenszweck finden – Anatoly Mook',
      en: 'Finding Life Purpose – Anatoly Mook',
      ru: 'Найти жизненную цель – Анатолий Мук',
    },
    metaDescription: {
      de: 'Finden Sie Ihren Lebenszweck mit Anatoly Mook. Entdecken Sie Ihren einzigartigen Beitrag für ein bedeutsames, erfülltes Leben.',
      en: 'Find your life purpose with Anatoly Mook. Discover your unique contribution for a meaningful, fulfilled life.',
      ru: 'Найдите жизненную цель с Анатолием Муком. Откройте своё уникальное предназначение для значимой, полноценной жизни.',
    },
    keywords: {
      de: ['Lebenszweck', 'Lebenssinn', 'Purpose', 'Berufung finden', 'Sinn des Lebens'],
      en: ['life purpose', 'meaning of life', 'purpose', 'finding calling', 'life meaning'],
      ru: ['жизненная цель', 'смысл жизни', 'предназначение', 'поиск призвания', 'цель жизни'],
    },
    relatedServices: ['coaching', 'mentoring', 'retreat'],
    relatedTopics: ['klarheit-finden', 'persoenliche-transformation', 'selbsterkenntnis', 'lebensgestaltung'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  {
    slug: 'resilienz-aufbauen',
    slugEn: 'building-resilience',
    slugRu: 'razvitie-rezilentnosti',
    title: {
      de: 'Resilienz aufbauen',
      en: 'Building Resilience',
      ru: 'Развитие резилентности',
    },
    description: {
      de: 'Resilienz ist die Fähigkeit, gestärkt aus Herausforderungen hervorzugehen. Anatoly Mook vermittelt Ihnen bewährte Strategien und innere Praktiken, um Ihre Widerstandskraft nachhaltig zu stärken.',
      en: 'Resilience is the ability to emerge stronger from challenges. Anatoly Mook teaches you proven strategies and inner practices to sustainably strengthen your resilience.',
      ru: 'Резилентность — способность выходить из испытаний сильнее. Анатолий Мук передаёт проверенные стратегии и внутренние практики для устойчивого укрепления жизнестойкости.',
    },
    metaTitle: {
      de: 'Resilienz aufbauen – Anatoly Mook',
      en: 'Building Resilience – Anatoly Mook',
      ru: 'Развитие резилентности – Анатолий Мук',
    },
    metaDescription: {
      de: 'Bauen Sie nachhaltige Resilienz auf mit Anatoly Mook. Bewährte Strategien für innere Widerstandskraft und Stärke.',
      en: 'Build sustainable resilience with Anatoly Mook. Proven strategies for inner fortitude and strength.',
      ru: 'Развивайте устойчивую резилентность с Анатолием Муком. Проверенные стратегии для внутренней стойкости и силы.',
    },
    keywords: {
      de: ['Resilienz', 'Resilienz aufbauen', 'Widerstandskraft', 'Resilienztraining', 'innere Stärke'],
      en: ['resilience', 'building resilience', 'fortitude', 'resilience training', 'inner strength'],
      ru: ['резилентность', 'развитие резилентности', 'жизнестойкость', 'тренировка стойкости', 'внутренняя сила'],
    },
    relatedServices: ['coaching', 'seminare', 'retreat'],
    relatedTopics: ['innere-staerke', 'fuehrung-in-der-krise', 'burnout-praevention', 'selbstmeisterschaft'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  {
    slug: 'gewohnheiten-aendern',
    slugEn: 'changing-habits',
    slugRu: 'izmenenie-privychek',
    title: {
      de: 'Gewohnheiten ändern',
      en: 'Changing Habits',
      ru: 'Изменение привычек',
    },
    description: {
      de: 'Ihre Gewohnheiten formen Ihr Leben. Anatoly Mook unterstützt Sie dabei, hinderliche Muster zu erkennen und durch kraftvolle neue Gewohnheiten zu ersetzen – für nachhaltige Veränderung von innen heraus.',
      en: 'Your habits shape your life. Anatoly Mook supports you in recognizing limiting patterns and replacing them with powerful new habits – for sustainable change from within.',
      ru: 'Ваши привычки формируют вашу жизнь. Анатолий Мук поддержит вас в распознавании ограничивающих паттернов и замене их мощными новыми привычками — для устойчивых изменений изнутри.',
    },
    metaTitle: {
      de: 'Gewohnheiten ändern – Anatoly Mook',
      en: 'Changing Habits – Anatoly Mook',
      ru: 'Изменение привычек – Анатолий Мук',
    },
    metaDescription: {
      de: 'Ändern Sie Ihre Gewohnheiten nachhaltig mit Anatoly Mook. Hinderliche Muster erkennen und neue, kraftvolle Routinen etablieren.',
      en: 'Change your habits sustainably with Anatoly Mook. Recognize limiting patterns and establish new, powerful routines.',
      ru: 'Измените привычки устойчиво с Анатолием Муком. Распознайте ограничивающие паттерны и установите новые, мощные рутины.',
    },
    keywords: {
      de: ['Gewohnheiten ändern', 'Gewohnheiten entwickeln', 'Routinen', 'Muster durchbrechen', 'Verhaltensänderung'],
      en: ['changing habits', 'habit formation', 'routines', 'breaking patterns', 'behavior change'],
      ru: ['изменение привычек', 'формирование привычек', 'рутины', 'преодоление паттернов', 'изменение поведения'],
    },
    relatedServices: ['coaching', 'einzelcoaching', 'mentoring'],
    relatedTopics: ['persoenliche-transformation', 'disziplin-und-willenskraft', 'selbstmeisterschaft', 'peak-performance'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  {
    slug: 'disziplin-und-willenskraft',
    slugEn: 'discipline-and-willpower',
    slugRu: 'distsiplina-i-sila-voli',
    title: {
      de: 'Disziplin und Willenskraft',
      en: 'Discipline and Willpower',
      ru: 'Дисциплина и сила воли',
    },
    description: {
      de: 'Disziplin und Willenskraft sind die Motoren jeder Meisterschaft. Anatoly Mook zeigt Ihnen, wie Sie diese Kräfte nicht durch Zwang, sondern durch bewusste Ausrichtung und innere Motivation stärken.',
      en: 'Discipline and willpower are the engines of all mastery. Anatoly Mook shows you how to strengthen these forces not through force but through conscious alignment and inner motivation.',
      ru: 'Дисциплина и сила воли — двигатели любого мастерства. Анатолий Мук покажет, как укрепить эти силы не принуждением, а осознанной направленностью и внутренней мотивацией.',
    },
    metaTitle: {
      de: 'Disziplin & Willenskraft – Anatoly Mook',
      en: 'Discipline & Willpower – Anatoly Mook',
      ru: 'Дисциплина и сила воли – Анатолий Мук',
    },
    metaDescription: {
      de: 'Stärken Sie Disziplin und Willenskraft mit Anatoly Mook. Innere Kraft durch bewusste Ausrichtung statt Zwang entwickeln.',
      en: 'Strengthen discipline and willpower with Anatoly Mook. Develop inner power through conscious alignment instead of force.',
      ru: 'Укрепите дисциплину и силу воли с Анатолием Муком. Развивайте внутреннюю силу через осознанность вместо принуждения.',
    },
    keywords: {
      de: ['Disziplin', 'Willenskraft', 'Selbstdisziplin', 'Durchhaltevermögen', 'innere Stärke'],
      en: ['discipline', 'willpower', 'self-discipline', 'perseverance', 'inner strength'],
      ru: ['дисциплина', 'сила воли', 'самодисциплина', 'упорство', 'внутренняя сила'],
    },
    relatedServices: ['coaching', 'mentoring', 'seminare'],
    relatedTopics: ['selbstmeisterschaft', 'gewohnheiten-aendern', 'peak-performance', 'innere-staerke'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  {
    slug: 'peak-performance',
    slugEn: 'peak-performance',
    slugRu: 'pikovaya-produktivnost',
    title: {
      de: 'Peak Performance',
      en: 'Peak Performance',
      ru: 'Пиковая продуктивность',
    },
    description: {
      de: 'Peak Performance entsteht, wenn Körper, Geist und Seele im Einklang sind. Anatoly Mook zeigt Ihnen, wie Sie nachhaltige Höchstleistung erreichen – ohne Burnout, mit voller Energie und klarem Fokus.',
      en: 'Peak performance happens when body, mind, and soul are in harmony. Anatoly Mook shows you how to achieve sustainable peak performance – without burnout, with full energy and clear focus.',
      ru: 'Пиковая продуктивность возникает, когда тело, ум и душа в гармонии. Анатолий Мук покажет, как достичь устойчивой высочайшей результативности — без выгорания, с полной энергией и ясным фокусом.',
    },
    metaTitle: {
      de: 'Peak Performance – Anatoly Mook',
      en: 'Peak Performance – Anatoly Mook',
      ru: 'Пиковая продуктивность – Анатолий Мук',
    },
    metaDescription: {
      de: 'Erreichen Sie Peak Performance mit Anatoly Mook. Nachhaltige Höchstleistung durch Harmonie von Körper, Geist und Seele.',
      en: 'Achieve peak performance with Anatoly Mook. Sustainable excellence through harmony of body, mind, and soul.',
      ru: 'Достигните пиковой продуктивности с Анатолием Муком. Устойчивое совершенство через гармонию тела, ума и души.',
    },
    keywords: {
      de: ['Peak Performance', 'Höchstleistung', 'Top-Performance', 'Leistungsoptimierung', 'nachhaltige Leistung'],
      en: ['peak performance', 'top performance', 'performance optimization', 'sustainable performance', 'high performance'],
      ru: ['пиковая продуктивность', 'максимальная результативность', 'оптимизация продуктивности', 'устойчивая результативность', 'высокая продуктивность'],
    },
    relatedServices: ['coaching', 'executive-coaching', 'mentoring'],
    relatedTopics: ['selbstmeisterschaft', 'disziplin-und-willenskraft', 'work-life-integration', 'burnout-praevention'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  {
    slug: 'work-life-integration',
    slugEn: 'work-life-integration',
    slugRu: 'integratsiya-raboty-i-zhizni',
    title: {
      de: 'Work-Life-Integration',
      en: 'Work-Life Integration',
      ru: 'Интеграция работы и жизни',
    },
    description: {
      de: 'Work-Life-Integration geht über Balance hinaus. Anatoly Mook zeigt Ihnen, wie Sie Beruf und Privatleben nicht gegeneinander abwägen, sondern als stimmiges Ganzes gestalten – für ein erfülltes Leben auf allen Ebenen.',
      en: 'Work-life integration goes beyond balance. Anatoly Mook shows you how to stop weighing career against personal life and instead design them as a coherent whole – for fulfillment on all levels.',
      ru: 'Интеграция работы и жизни идёт дальше баланса. Анатолий Мук покажет, как не противопоставлять карьеру и личную жизнь, а выстроить их как единое целое — для полноты на всех уровнях.',
    },
    metaTitle: {
      de: 'Work-Life-Integration – Anatoly Mook',
      en: 'Work-Life Integration – Anatoly Mook',
      ru: 'Интеграция работы и жизни – Анатолий Мук',
    },
    metaDescription: {
      de: 'Work-Life-Integration mit Anatoly Mook. Beruf und Privatleben als stimmiges Ganzes gestalten – jenseits von Balance.',
      en: 'Work-life integration with Anatoly Mook. Design career and personal life as a coherent whole – beyond balance.',
      ru: 'Интеграция работы и жизни с Анатолием Муком. Карьера и личная жизнь как единое целое — за пределами баланса.',
    },
    keywords: {
      de: ['Work-Life-Integration', 'Work-Life-Balance', 'Lebensbalance', 'Vereinbarkeit', 'ganzheitliches Leben'],
      en: ['work-life integration', 'work-life balance', 'life balance', 'holistic living', 'integrated life'],
      ru: ['интеграция работы и жизни', 'баланс работы и жизни', 'жизненный баланс', 'целостная жизнь', 'гармония жизни'],
    },
    relatedServices: ['coaching', 'einzelcoaching', 'seminare'],
    relatedTopics: ['peak-performance', 'burnout-praevention', 'lebensgestaltung', 'selbstbestimmung'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  {
    slug: 'persoenliches-wachstum',
    slugEn: 'personal-growth',
    slugRu: 'lichnostnyy-rost',
    title: {
      de: 'Persönliches Wachstum',
      en: 'Personal Growth',
      ru: 'Личностный рост',
    },
    description: {
      de: 'Persönliches Wachstum ist ein lebenslanger Weg. Anatoly Mook begleitet Sie dabei, kontinuierlich über sich hinauszuwachsen – mit Bewusstsein, Mut und der tiefen Überzeugung, dass in Ihnen mehr steckt.',
      en: 'Personal growth is a lifelong journey. Anatoly Mook accompanies you in continuously growing beyond yourself – with awareness, courage, and the deep conviction that there is more in you.',
      ru: 'Личностный рост — путь длиною в жизнь. Анатолий Мук сопровождает вас в непрерывном росте за пределы себя — с осознанностью, смелостью и глубоким убеждением, что в вас есть больше.',
    },
    metaTitle: {
      de: 'Persönliches Wachstum – Anatoly Mook',
      en: 'Personal Growth – Anatoly Mook',
      ru: 'Личностный рост – Анатолий Мук',
    },
    metaDescription: {
      de: 'Fördern Sie Ihr persönliches Wachstum mit Anatoly Mook. Kontinuierliche Entwicklung mit Bewusstsein, Mut und Tiefe.',
      en: 'Foster your personal growth with Anatoly Mook. Continuous development with awareness, courage, and depth.',
      ru: 'Способствуйте личностному росту с Анатолием Муком. Непрерывное развитие с осознанностью, смелостью и глубиной.',
    },
    keywords: {
      de: ['persönliches Wachstum', 'Selbstentwicklung', 'Persönlichkeitsentwicklung', 'Wachstum', 'sich weiterentwickeln'],
      en: ['personal growth', 'self-development', 'personality development', 'growth', 'self-improvement'],
      ru: ['личностный рост', 'саморазвитие', 'развитие личности', 'рост', 'самосовершенствование'],
    },
    relatedServices: ['coaching', 'mentoring', 'seminare'],
    relatedTopics: ['potenzialentfaltung', 'selbsterkenntnis', 'persoenliche-transformation', 'selbstreflexion'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  {
    slug: 'selbstbestimmung',
    slugEn: 'self-determination',
    slugRu: 'samoopredelenie',
    title: {
      de: 'Selbstbestimmung',
      en: 'Self-Determination',
      ru: 'Самоопределение',
    },
    description: {
      de: 'Selbstbestimmung bedeutet, Ihr Leben nach Ihren eigenen Werten und Überzeugungen zu gestalten. Anatoly Mook stärkt Ihre Fähigkeit, eigenverantwortlich zu handeln und Ihren eigenen Weg zu gehen.',
      en: 'Self-determination means shaping your life according to your own values and convictions. Anatoly Mook strengthens your ability to act with personal responsibility and walk your own path.',
      ru: 'Самоопределение — это формирование жизни в соответствии с собственными ценностями и убеждениями. Анатолий Мук укрепляет вашу способность действовать ответственно и идти своим путём.',
    },
    metaTitle: {
      de: 'Selbstbestimmung leben – Anatoly Mook',
      en: 'Living Self-Determination – Anatoly Mook',
      ru: 'Самоопределение – Анатолий Мук',
    },
    metaDescription: {
      de: 'Leben Sie selbstbestimmt mit Anatoly Mook. Stärken Sie Ihre Eigenverantwortung und gestalten Sie Ihr Leben nach Ihren Werten.',
      en: 'Live self-determined with Anatoly Mook. Strengthen your personal responsibility and shape your life by your values.',
      ru: 'Живите самостоятельно с Анатолием Муком. Укрепите личную ответственность и формируйте жизнь по своим ценностям.',
    },
    keywords: {
      de: ['Selbstbestimmung', 'Eigenverantwortung', 'selbstbestimmt leben', 'Autonomie', 'eigener Weg'],
      en: ['self-determination', 'personal responsibility', 'autonomous living', 'autonomy', 'own path'],
      ru: ['самоопределение', 'личная ответственность', 'самостоятельная жизнь', 'автономия', 'свой путь'],
    },
    relatedServices: ['coaching', 'mentoring', 'einzelcoaching'],
    relatedTopics: ['lebensgestaltung', 'klarheit-finden', 'lebenszweck-finden', 'persoenliches-wachstum'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  {
    slug: 'lebensgestaltung',
    slugEn: 'life-design',
    slugRu: 'dizayn-zhizni',
    title: {
      de: 'Lebensgestaltung',
      en: 'Life Design',
      ru: 'Дизайн жизни',
    },
    description: {
      de: 'Lebensgestaltung heißt, das eigene Leben bewusst zu entwerfen statt es dem Zufall zu überlassen. Anatoly Mook unterstützt Sie dabei, eine klare Vision für Ihr Leben zu entwickeln und sie Schritt für Schritt zu verwirklichen.',
      en: 'Life design means consciously crafting your life instead of leaving it to chance. Anatoly Mook supports you in developing a clear vision for your life and realizing it step by step.',
      ru: 'Дизайн жизни — это осознанное создание своей жизни вместо того, чтобы оставлять её на волю случая. Анатолий Мук помогает разработать ясное видение жизни и воплотить его шаг за шагом.',
    },
    metaTitle: {
      de: 'Bewusste Lebensgestaltung – Anatoly Mook',
      en: 'Conscious Life Design – Anatoly Mook',
      ru: 'Дизайн жизни – Анатолий Мук',
    },
    metaDescription: {
      de: 'Gestalten Sie Ihr Leben bewusst mit Anatoly Mook. Klare Vision entwickeln und Schritt für Schritt verwirklichen.',
      en: 'Design your life consciously with Anatoly Mook. Develop a clear vision and realize it step by step.',
      ru: 'Создавайте свою жизнь осознанно с Анатолием Муком. Разработайте ясное видение и воплотите его шаг за шагом.',
    },
    keywords: {
      de: ['Lebensgestaltung', 'Life Design', 'Leben gestalten', 'bewusstes Leben', 'Lebensvision'],
      en: ['life design', 'designing your life', 'conscious living', 'life vision', 'life planning'],
      ru: ['дизайн жизни', 'проектирование жизни', 'осознанная жизнь', 'жизненное видение', 'планирование жизни'],
    },
    relatedServices: ['coaching', 'mentoring', 'einzelcoaching'],
    relatedTopics: ['lebenszweck-finden', 'selbstbestimmung', 'work-life-integration', 'klarheit-finden'],
    parentCluster: 'persoenliche-meisterschaft',
  },

  // ═══════════════════════════════════════════════════════════════
  // CLUSTER 4: Business & Organisation (12 topics)
  // ═══════════════════════════════════════════════════════════════

  {
    slug: 'organisationsentwicklung',
    slugEn: 'organizational-development',
    slugRu: 'organizatsionnoe-razvitie',
    title: {
      de: 'Organisationsentwicklung',
      en: 'Organizational Development',
      ru: 'Организационное развитие',
    },
    description: {
      de: 'Organisationsentwicklung mit Bewusstsein: Anatoly Mook begleitet Unternehmen dabei, Strukturen, Prozesse und Kultur so zu gestalten, dass Mensch und Organisation gemeinsam wachsen.',
      en: 'Organizational development with consciousness: Anatoly Mook accompanies companies in shaping structures, processes, and culture so that people and organizations grow together.',
      ru: 'Организационное развитие с осознанностью: Анатолий Мук сопровождает компании в формировании структур, процессов и культуры для совместного роста людей и организации.',
    },
    metaTitle: {
      de: 'Organisationsentwicklung – Anatoly Mook',
      en: 'Organizational Development – Anatoly Mook',
      ru: 'Организационное развитие – Анатолий Мук',
    },
    metaDescription: {
      de: 'Bewusste Organisationsentwicklung mit Anatoly Mook. Strukturen und Kultur gestalten für gemeinsames Wachstum von Mensch und Unternehmen.',
      en: 'Conscious organizational development with Anatoly Mook. Shape structures and culture for shared growth of people and business.',
      ru: 'Осознанное организационное развитие с Анатолием Муком. Структуры и культура для совместного роста людей и бизнеса.',
    },
    keywords: {
      de: ['Organisationsentwicklung', 'OE', 'Unternehmensentwicklung', 'Organisationsberatung', 'Strukturentwicklung'],
      en: ['organizational development', 'OD', 'business development', 'organizational consulting', 'structural development'],
      ru: ['организационное развитие', 'развитие бизнеса', 'организационный консалтинг', 'структурное развитие', 'развитие организации'],
    },
    relatedServices: ['corporate-coaching', 'seminare', 'organisationsentwicklung'],
    relatedTopics: ['unternehmenskultur', 'change-management', 'fuehrungskultur', 'teamentwicklung'],
    parentCluster: 'business-organisation',
  },

  {
    slug: 'unternehmenskultur',
    slugEn: 'corporate-culture',
    slugRu: 'korporativnaya-kultura',
    title: {
      de: 'Unternehmenskultur',
      en: 'Corporate Culture',
      ru: 'Корпоративная культура',
    },
    description: {
      de: 'Die Unternehmenskultur bestimmt, wie Menschen zusammenarbeiten und Entscheidungen treffen. Anatoly Mook begleitet Organisationen dabei, eine Kultur zu schaffen, die Sinn stiftet, Vertrauen fördert und Exzellenz ermöglicht.',
      en: 'Corporate culture determines how people work together and make decisions. Anatoly Mook accompanies organizations in creating a culture that provides meaning, fosters trust, and enables excellence.',
      ru: 'Корпоративная культура определяет, как люди работают вместе и принимают решения. Анатолий Мук помогает организациям создать культуру, которая придаёт смысл, укрепляет доверие и открывает путь к совершенству.',
    },
    metaTitle: {
      de: 'Unternehmenskultur gestalten – Anatoly Mook',
      en: 'Shaping Corporate Culture – Anatoly Mook',
      ru: 'Корпоративная культура – Анатолий Мук',
    },
    metaDescription: {
      de: 'Gestalten Sie Ihre Unternehmenskultur mit Anatoly Mook. Eine Kultur, die Sinn stiftet, Vertrauen fördert und Exzellenz ermöglicht.',
      en: 'Shape your corporate culture with Anatoly Mook. A culture that provides meaning, fosters trust, and enables excellence.',
      ru: 'Формируйте корпоративную культуру с Анатолием Муком. Культура, придающая смысл, укрепляющая доверие и ведущая к совершенству.',
    },
    keywords: {
      de: ['Unternehmenskultur', 'Firmenkultur', 'Kulturentwicklung', 'Wertekultur', 'Organisationskultur'],
      en: ['corporate culture', 'company culture', 'culture development', 'values culture', 'organizational culture'],
      ru: ['корпоративная культура', 'культура компании', 'развитие культуры', 'ценностная культура', 'организационная культура'],
    },
    relatedServices: ['corporate-coaching', 'seminare', 'organisationsentwicklung'],
    relatedTopics: ['fuehrungskultur', 'unternehmenswerte', 'organisationsentwicklung', 'mitarbeitermotivation'],
    parentCluster: 'business-organisation',
  },

  {
    slug: 'corporate-coaching',
    slugEn: 'corporate-coaching',
    slugRu: 'korporativnyy-kouching',
    title: {
      de: 'Corporate Coaching',
      en: 'Corporate Coaching',
      ru: 'Корпоративный коучинг',
    },
    description: {
      de: 'Corporate Coaching von Anatoly Mook verbindet unternehmerische Ziele mit menschlicher Entwicklung. Maßgeschneiderte Coaching-Programme für Teams und Führungskräfte, die Unternehmen von innen heraus stärken.',
      en: 'Corporate coaching by Anatoly Mook connects business goals with human development. Tailored coaching programs for teams and leaders that strengthen organizations from within.',
      ru: 'Корпоративный коучинг от Анатолия Мука соединяет бизнес-цели с человеческим развитием. Индивидуальные программы коучинга для команд и руководителей, укрепляющие организацию изнутри.',
    },
    metaTitle: {
      de: 'Corporate Coaching – Anatoly Mook',
      en: 'Corporate Coaching – Anatoly Mook',
      ru: 'Корпоративный коучинг – Анатолий Мук',
    },
    metaDescription: {
      de: 'Corporate Coaching mit Anatoly Mook. Maßgeschneiderte Programme für Teams und Führungskräfte – Unternehmen von innen stärken.',
      en: 'Corporate coaching with Anatoly Mook. Tailored programs for teams and leaders – strengthening organizations from within.',
      ru: 'Корпоративный коучинг с Анатолием Муком. Индивидуальные программы для команд и руководителей — укрепление организации изнутри.',
    },
    keywords: {
      de: ['Corporate Coaching', 'Business Coaching', 'Unternehmenscoaching', 'Firmencoaching', 'Organisationscoaching'],
      en: ['corporate coaching', 'business coaching', 'company coaching', 'organizational coaching', 'enterprise coaching'],
      ru: ['корпоративный коучинг', 'бизнес-коучинг', 'коучинг в компании', 'организационный коучинг', 'коучинг для предприятий'],
    },
    relatedServices: ['corporate-coaching', 'fuehrungskraefteentwicklung', 'teamentwicklung'],
    relatedTopics: ['executive-coaching', 'teamentwicklung', 'organisationsentwicklung', 'fuehrungskraefteentwicklung'],
    parentCluster: 'business-organisation',
  },

  {
    slug: 'teamentwicklung',
    slugEn: 'team-development',
    slugRu: 'razvitie-komandy',
    title: {
      de: 'Teamentwicklung',
      en: 'Team Development',
      ru: 'Развитие команды',
    },
    description: {
      de: 'Starke Teams entstehen durch bewusste Entwicklung. Anatoly Mook begleitet Teams dabei, Vertrauen aufzubauen, Kommunikation zu verbessern und gemeinsam über sich hinauszuwachsen.',
      en: 'Strong teams are built through conscious development. Anatoly Mook accompanies teams in building trust, improving communication, and growing beyond themselves together.',
      ru: 'Сильные команды создаются через осознанное развитие. Анатолий Мук сопровождает команды в построении доверия, улучшении коммуникации и совместном росте за пределы привычного.',
    },
    metaTitle: {
      de: 'Teamentwicklung – Anatoly Mook',
      en: 'Team Development – Anatoly Mook',
      ru: 'Развитие команды – Анатолий Мук',
    },
    metaDescription: {
      de: 'Bewusste Teamentwicklung mit Anatoly Mook. Vertrauen aufbauen, Kommunikation stärken und gemeinsam Höchstleistung erreichen.',
      en: 'Conscious team development with Anatoly Mook. Build trust, strengthen communication, and achieve peak performance together.',
      ru: 'Осознанное развитие команды с Анатолием Муком. Строить доверие, усиливать коммуникацию и вместе достигать результатов.',
    },
    keywords: {
      de: ['Teamentwicklung', 'Teambuilding', 'Teamcoaching', 'Teamwork', 'Teamprozesse'],
      en: ['team development', 'team building', 'team coaching', 'teamwork', 'team processes'],
      ru: ['развитие команды', 'тимбилдинг', 'командный коучинг', 'командная работа', 'командные процессы'],
    },
    relatedServices: ['teamentwicklung', 'seminare', 'corporate-coaching'],
    relatedTopics: ['teamfuehrung', 'organisationsentwicklung', 'unternehmenskultur', 'gruppencoaching'],
    parentCluster: 'business-organisation',
  },

  {
    slug: 'agile-fuehrung',
    slugEn: 'agile-leadership',
    slugRu: 'gibkoe-liderstvo',
    title: {
      de: 'Agile Führung',
      en: 'Agile Leadership',
      ru: 'Гибкое лидерство',
    },
    description: {
      de: 'Agile Führung verbindet Flexibilität mit klarer Ausrichtung. Anatoly Mook zeigt Ihnen, wie Sie in einer komplexen Welt agil führen – mit Bewusstsein, Anpassungsfähigkeit und dem Vertrauen in Ihr Team.',
      en: 'Agile leadership combines flexibility with clear direction. Anatoly Mook shows you how to lead agilely in a complex world – with awareness, adaptability, and trust in your team.',
      ru: 'Гибкое лидерство объединяет гибкость с чётким направлением. Анатолий Мук покажет, как гибко руководить в сложном мире — с осознанностью, адаптивностью и доверием к команде.',
    },
    metaTitle: {
      de: 'Agile Führung – Anatoly Mook',
      en: 'Agile Leadership – Anatoly Mook',
      ru: 'Гибкое лидерство – Анатолий Мук',
    },
    metaDescription: {
      de: 'Agile Führung mit Anatoly Mook. Flexibel und bewusst führen in einer komplexen Welt – mit Klarheit und Vertrauen.',
      en: 'Agile leadership with Anatoly Mook. Lead flexibly and consciously in a complex world – with clarity and trust.',
      ru: 'Гибкое лидерство с Анатолием Муком. Руководите гибко и осознанно в сложном мире — с ясностью и доверием.',
    },
    keywords: {
      de: ['Agile Führung', 'agiles Management', 'Agilität', 'flexible Führung', 'VUCA'],
      en: ['agile leadership', 'agile management', 'agility', 'flexible leadership', 'VUCA'],
      ru: ['гибкое лидерство', 'гибкое управление', 'аджайл', 'гибкое руководство', 'VUCA'],
    },
    relatedServices: ['coaching', 'seminare', 'corporate-coaching'],
    relatedTopics: ['change-management', 'new-work', 'bewusste-fuehrung', 'teamfuehrung'],
    parentCluster: 'business-organisation',
  },

  {
    slug: 'new-work',
    slugEn: 'new-work',
    slugRu: 'novaya-rabota',
    title: {
      de: 'New Work',
      en: 'New Work',
      ru: 'Новая работа',
    },
    description: {
      de: 'New Work ist mehr als ein Trend – es ist ein Bewusstseinswandel in der Arbeitswelt. Anatoly Mook begleitet Organisationen und Führungskräfte dabei, Arbeit neu zu denken: sinnstiftend, menschlich und zukunftsfähig.',
      en: 'New Work is more than a trend – it is a consciousness shift in the world of work. Anatoly Mook accompanies organizations and leaders in rethinking work: meaningful, human, and future-ready.',
      ru: 'Новая работа — больше, чем тренд. Это сдвиг сознания в мире труда. Анатолий Мук сопровождает организации и руководителей в переосмыслении работы: осмысленной, человечной и готовой к будущему.',
    },
    metaTitle: {
      de: 'New Work – Anatoly Mook',
      en: 'New Work – Anatoly Mook',
      ru: 'Новая работа – Анатолий Мук',
    },
    metaDescription: {
      de: 'New Work mit Anatoly Mook. Arbeit neu denken – sinnstiftend, menschlich und zukunftsfähig für Organisationen und Führungskräfte.',
      en: 'New Work with Anatoly Mook. Rethink work – meaningful, human, and future-ready for organizations and leaders.',
      ru: 'Новая работа с Анатолием Муком. Переосмыслите работу — осмысленно, человечно и готово к будущему для организаций и лидеров.',
    },
    keywords: {
      de: ['New Work', 'Neue Arbeitswelt', 'Zukunft der Arbeit', 'moderne Arbeit', 'sinnvolle Arbeit'],
      en: ['new work', 'future of work', 'modern work', 'meaningful work', 'new ways of working'],
      ru: ['новая работа', 'будущее работы', 'современная работа', 'осмысленная работа', 'новые формы работы'],
    },
    relatedServices: ['seminare', 'corporate-coaching', 'organisationsentwicklung'],
    relatedTopics: ['agile-fuehrung', 'unternehmenskultur', 'work-life-integration', 'mitarbeitermotivation'],
    parentCluster: 'business-organisation',
  },

  {
    slug: 'burnout-praevention',
    slugEn: 'burnout-prevention',
    slugRu: 'profilaktika-vygoraniya',
    title: {
      de: 'Burnout-Prävention',
      en: 'Burnout Prevention',
      ru: 'Профилактика выгорания',
    },
    description: {
      de: 'Burnout-Prävention beginnt mit Bewusstsein. Anatoly Mook hilft Führungskräften und Unternehmen, die Anzeichen frühzeitig zu erkennen und nachhaltige Strategien zu entwickeln, die Leistung und Wohlbefinden in Einklang bringen.',
      en: 'Burnout prevention starts with awareness. Anatoly Mook helps leaders and organizations recognize the signs early and develop sustainable strategies that align performance with well-being.',
      ru: 'Профилактика выгорания начинается с осознанности. Анатолий Мук помогает руководителям и организациям распознать признаки заблаговременно и разработать устойчивые стратегии, гармонизирующие результативность и благополучие.',
    },
    metaTitle: {
      de: 'Burnout-Prävention – Anatoly Mook',
      en: 'Burnout Prevention – Anatoly Mook',
      ru: 'Профилактика выгорания – Анатолий Мук',
    },
    metaDescription: {
      de: 'Burnout-Prävention mit Anatoly Mook. Frühzeitig erkennen, nachhaltig vorbeugen – für Leistung und Wohlbefinden im Einklang.',
      en: 'Burnout prevention with Anatoly Mook. Recognize early, prevent sustainably – for performance and well-being in harmony.',
      ru: 'Профилактика выгорания с Анатолием Муком. Распознайте рано, предотвращайте устойчиво — для гармонии результативности и благополучия.',
    },
    keywords: {
      de: ['Burnout-Prävention', 'Burnout vorbeugen', 'Stressprävention', 'Erschöpfung vermeiden', 'gesunde Führung'],
      en: ['burnout prevention', 'preventing burnout', 'stress prevention', 'avoiding exhaustion', 'healthy leadership'],
      ru: ['профилактика выгорания', 'предотвращение выгорания', 'профилактика стресса', 'избежание истощения', 'здоровое лидерство'],
    },
    relatedServices: ['coaching', 'seminare', 'corporate-coaching'],
    relatedTopics: ['resilienz-aufbauen', 'innere-ruhe', 'work-life-integration', 'peak-performance'],
    parentCluster: 'business-organisation',
  },

  {
    slug: 'mitarbeitermotivation',
    slugEn: 'employee-motivation',
    slugRu: 'motivatsiya-sotrudnikov',
    title: {
      de: 'Mitarbeitermotivation',
      en: 'Employee Motivation',
      ru: 'Мотивация сотрудников',
    },
    description: {
      de: 'Echte Mitarbeitermotivation entsteht nicht durch Anreize, sondern durch Sinn und Verbindung. Anatoly Mook zeigt Führungskräften, wie sie intrinsische Motivation wecken und ein Umfeld schaffen, in dem Menschen aufblühen.',
      en: 'True employee motivation doesn\'t come from incentives but from meaning and connection. Anatoly Mook shows leaders how to awaken intrinsic motivation and create an environment where people thrive.',
      ru: 'Настоящая мотивация сотрудников рождается не из стимулов, а из смысла и связи. Анатолий Мук показывает руководителям, как пробудить внутреннюю мотивацию и создать среду, в которой люди расцветают.',
    },
    metaTitle: {
      de: 'Mitarbeitermotivation – Anatoly Mook',
      en: 'Employee Motivation – Anatoly Mook',
      ru: 'Мотивация сотрудников – Анатолий Мук',
    },
    metaDescription: {
      de: 'Steigern Sie die Mitarbeitermotivation mit Anatoly Mook. Intrinsische Motivation wecken durch Sinn, Verbindung und bewusste Führung.',
      en: 'Boost employee motivation with Anatoly Mook. Awaken intrinsic motivation through meaning, connection, and conscious leadership.',
      ru: 'Повысьте мотивацию сотрудников с Анатолием Муком. Пробудите внутреннюю мотивацию через смысл, связь и осознанное лидерство.',
    },
    keywords: {
      de: ['Mitarbeitermotivation', 'Motivation steigern', 'intrinsische Motivation', 'Mitarbeiterengagement', 'Motivation am Arbeitsplatz'],
      en: ['employee motivation', 'boosting motivation', 'intrinsic motivation', 'employee engagement', 'workplace motivation'],
      ru: ['мотивация сотрудников', 'повышение мотивации', 'внутренняя мотивация', 'вовлечённость сотрудников', 'мотивация на работе'],
    },
    relatedServices: ['seminare', 'corporate-coaching', 'fuehrungskraefteentwicklung'],
    relatedTopics: ['teamfuehrung', 'servant-leadership', 'unternehmenskultur', 'fuehrungskultur'],
    parentCluster: 'business-organisation',
  },

  {
    slug: 'unternehmenswerte',
    slugEn: 'corporate-values',
    slugRu: 'korporativnye-tsennosti',
    title: {
      de: 'Unternehmenswerte',
      en: 'Corporate Values',
      ru: 'Корпоративные ценности',
    },
    description: {
      de: 'Unternehmenswerte sind nur dann wirksam, wenn sie gelebt werden. Anatoly Mook begleitet Organisationen dabei, authentische Werte zu definieren und im Alltag spürbar zu verankern – als Kompass für Entscheidungen und Kultur.',
      en: 'Corporate values are only effective when they are lived. Anatoly Mook accompanies organizations in defining authentic values and anchoring them tangibly in daily life – as a compass for decisions and culture.',
      ru: 'Корпоративные ценности действенны, только когда их проживают. Анатолий Мук помогает организациям определить подлинные ценности и ощутимо закрепить их в повседневности — как компас для решений и культуры.',
    },
    metaTitle: {
      de: 'Unternehmenswerte leben – Anatoly Mook',
      en: 'Living Corporate Values – Anatoly Mook',
      ru: 'Корпоративные ценности – Анатолий Мук',
    },
    metaDescription: {
      de: 'Authentische Unternehmenswerte mit Anatoly Mook. Werte definieren und im Alltag verankern – als Kompass für Kultur und Entscheidungen.',
      en: 'Authentic corporate values with Anatoly Mook. Define values and anchor them in daily life – as a compass for culture and decisions.',
      ru: 'Подлинные корпоративные ценности с Анатолием Муком. Определите ценности и закрепите их — как компас для культуры и решений.',
    },
    keywords: {
      de: ['Unternehmenswerte', 'Firmenwerte', 'Werte definieren', 'Wertekultur', 'gelebte Werte'],
      en: ['corporate values', 'company values', 'defining values', 'values culture', 'lived values'],
      ru: ['корпоративные ценности', 'ценности компании', 'определение ценностей', 'ценностная культура', 'проживаемые ценности'],
    },
    relatedServices: ['corporate-coaching', 'seminare', 'organisationsentwicklung'],
    relatedTopics: ['unternehmenskultur', 'authentische-fuehrung', 'fuehrungskultur', 'organisationsentwicklung'],
    parentCluster: 'business-organisation',
  },

  {
    slug: 'strategisches-denken',
    slugEn: 'strategic-thinking',
    slugRu: 'strategicheskoe-myshlenie',
    title: {
      de: 'Strategisches Denken',
      en: 'Strategic Thinking',
      ru: 'Стратегическое мышление',
    },
    description: {
      de: 'Strategisches Denken verbindet Weitblick mit Handlungskraft. Anatoly Mook schärft Ihre Fähigkeit, Zusammenhänge zu erkennen, vorausschauend zu planen und kluge Entscheidungen für die Zukunft zu treffen.',
      en: 'Strategic thinking combines foresight with the power to act. Anatoly Mook sharpens your ability to recognize connections, plan ahead, and make wise decisions for the future.',
      ru: 'Стратегическое мышление соединяет дальновидность с силой действия. Анатолий Мук обостряет вашу способность видеть связи, планировать наперёд и принимать мудрые решения для будущего.',
    },
    metaTitle: {
      de: 'Strategisches Denken – Anatoly Mook',
      en: 'Strategic Thinking – Anatoly Mook',
      ru: 'Стратегическое мышление – Анатолий Мук',
    },
    metaDescription: {
      de: 'Stärken Sie Ihr strategisches Denken mit Anatoly Mook. Weitblick, kluge Entscheidungen und vorausschauende Planung entwickeln.',
      en: 'Strengthen your strategic thinking with Anatoly Mook. Develop foresight, wise decisions, and forward-looking planning.',
      ru: 'Усильте стратегическое мышление с Анатолием Муком. Развивайте дальновидность, мудрые решения и предусмотрительное планирование.',
    },
    keywords: {
      de: ['strategisches Denken', 'Strategie', 'Weitblick', 'strategische Planung', 'Zukunftsdenken'],
      en: ['strategic thinking', 'strategy', 'foresight', 'strategic planning', 'future thinking'],
      ru: ['стратегическое мышление', 'стратегия', 'дальновидность', 'стратегическое планирование', 'мышление о будущем'],
    },
    relatedServices: ['coaching', 'executive-coaching', 'mentoring'],
    relatedTopics: ['entscheidungsstaerke', 'visionaere-fuehrung', 'geistige-klarheit', 'innovation-und-kreativitaet'],
    parentCluster: 'business-organisation',
  },

  {
    slug: 'innovation-und-kreativitaet',
    slugEn: 'innovation-and-creativity',
    slugRu: 'innovatsii-i-kreativnost',
    title: {
      de: 'Innovation und Kreativität',
      en: 'Innovation and Creativity',
      ru: 'Инновации и креативность',
    },
    description: {
      de: 'Innovation und Kreativität entspringen einem offenen, bewussten Geist. Anatoly Mook schafft Räume und Prozesse, die kreatives Denken freisetzen und Innovationskraft in Organisationen systematisch stärken.',
      en: 'Innovation and creativity spring from an open, conscious mind. Anatoly Mook creates spaces and processes that unleash creative thinking and systematically strengthen innovation in organizations.',
      ru: 'Инновации и креативность рождаются из открытого, осознанного ума. Анатолий Мук создаёт пространства и процессы, высвобождающие творческое мышление и системно усиливающие инновационность в организациях.',
    },
    metaTitle: {
      de: 'Innovation & Kreativität – Anatoly Mook',
      en: 'Innovation & Creativity – Anatoly Mook',
      ru: 'Инновации и креативность – Анатолий Мук',
    },
    metaDescription: {
      de: 'Fördern Sie Innovation und Kreativität mit Anatoly Mook. Kreatives Denken freisetzen und Innovationskraft systematisch stärken.',
      en: 'Foster innovation and creativity with Anatoly Mook. Unleash creative thinking and systematically strengthen innovation.',
      ru: 'Стимулируйте инновации и креативность с Анатолием Муком. Высвободите творческое мышление и системно усильте инновационность.',
    },
    keywords: {
      de: ['Innovation', 'Kreativität', 'kreatives Denken', 'Innovationskultur', 'Innovationsmanagement'],
      en: ['innovation', 'creativity', 'creative thinking', 'innovation culture', 'innovation management'],
      ru: ['инновации', 'креативность', 'творческое мышление', 'культура инноваций', 'управление инновациями'],
    },
    relatedServices: ['seminare', 'corporate-coaching', 'coaching'],
    relatedTopics: ['strategisches-denken', 'visionaere-fuehrung', 'new-work', 'organisationsentwicklung'],
    parentCluster: 'business-organisation',
  },

  {
    slug: 'nachhaltiges-wirtschaften',
    slugEn: 'sustainable-business',
    slugRu: 'ustoychivy-biznes',
    title: {
      de: 'Nachhaltiges Wirtschaften',
      en: 'Sustainable Business',
      ru: 'Устойчивый бизнес',
    },
    description: {
      de: 'Nachhaltiges Wirtschaften verbindet Erfolg mit Verantwortung. Anatoly Mook unterstützt Unternehmen dabei, bewusste Geschäftsmodelle zu entwickeln, die wirtschaftlich erfolgreich und ökologisch wie sozial nachhaltig sind.',
      en: 'Sustainable business connects success with responsibility. Anatoly Mook supports companies in developing conscious business models that are economically successful while being ecologically and socially sustainable.',
      ru: 'Устойчивый бизнес соединяет успех с ответственностью. Анатолий Мук помогает компаниям развивать осознанные бизнес-модели, экономически успешные и экологически и социально устойчивые.',
    },
    metaTitle: {
      de: 'Nachhaltiges Wirtschaften – Anatoly Mook',
      en: 'Sustainable Business – Anatoly Mook',
      ru: 'Устойчивый бизнес – Анатолий Мук',
    },
    metaDescription: {
      de: 'Nachhaltiges Wirtschaften mit Anatoly Mook. Bewusste Geschäftsmodelle, die Erfolg, Verantwortung und Nachhaltigkeit verbinden.',
      en: 'Sustainable business with Anatoly Mook. Conscious business models connecting success, responsibility, and sustainability.',
      ru: 'Устойчивый бизнес с Анатолием Муком. Осознанные бизнес-модели, соединяющие успех, ответственность и устойчивость.',
    },
    keywords: {
      de: ['nachhaltiges Wirtschaften', 'Nachhaltigkeit', 'nachhaltige Unternehmensführung', 'CSR', 'verantwortungsvolles Wirtschaften'],
      en: ['sustainable business', 'sustainability', 'sustainable management', 'CSR', 'responsible business'],
      ru: ['устойчивый бизнес', 'устойчивость', 'устойчивое управление', 'КСО', 'ответственный бизнес'],
    },
    relatedServices: ['coaching', 'corporate-coaching', 'seminare'],
    relatedTopics: ['unternehmenswerte', 'unternehmenskultur', 'visionaere-fuehrung', 'organisationsentwicklung'],
    parentCluster: 'business-organisation',
  },

  // ═══════════════════════════════════════════════════════════════
  // CLUSTER 5: Methodik & Praxis (12 topics)
  // ═══════════════════════════════════════════════════════════════

  {
    slug: 'coaching-methoden',
    slugEn: 'coaching-methods',
    slugRu: 'metody-kouchinga',
    title: {
      de: 'Coaching-Methoden',
      en: 'Coaching Methods',
      ru: 'Методы коучинга',
    },
    description: {
      de: 'Anatoly Mook setzt vielfältige Coaching-Methoden ein, die tiefgreifende Veränderung ermöglichen. Von systemischem Coaching über Bewusstseinsarbeit bis hin zu körperorientierten Ansätzen – stets individuell abgestimmt auf Ihre Bedürfnisse.',
      en: 'Anatoly Mook employs diverse coaching methods that enable profound change. From systemic coaching to consciousness work to body-oriented approaches – always individually tailored to your needs.',
      ru: 'Анатолий Мук применяет разнообразные методы коучинга для глубоких изменений. От системного коучинга через работу с сознанием до телесно-ориентированных подходов — всегда индивидуально под ваши потребности.',
    },
    metaTitle: {
      de: 'Coaching-Methoden – Anatoly Mook',
      en: 'Coaching Methods – Anatoly Mook',
      ru: 'Методы коучинга – Анатолий Мук',
    },
    metaDescription: {
      de: 'Vielfältige Coaching-Methoden von Anatoly Mook. Systemisches Coaching, Bewusstseinsarbeit und mehr – individuell auf Sie abgestimmt.',
      en: 'Diverse coaching methods by Anatoly Mook. Systemic coaching, consciousness work, and more – individually tailored to you.',
      ru: 'Разнообразные методы коучинга Анатолия Мука. Системный коучинг, работа с сознанием и другое — индивидуально для вас.',
    },
    keywords: {
      de: ['Coaching-Methoden', 'Coaching-Ansätze', 'systemisches Coaching', 'Coaching-Tools', 'Coaching-Techniken'],
      en: ['coaching methods', 'coaching approaches', 'systemic coaching', 'coaching tools', 'coaching techniques'],
      ru: ['методы коучинга', 'подходы коучинга', 'системный коучинг', 'инструменты коучинга', 'техники коучинга'],
    },
    relatedServices: ['coaching', 'einzelcoaching', 'gruppencoaching'],
    relatedTopics: ['einzelcoaching', 'gruppencoaching', 'bewusstseinsarbeit', 'transformationsprozesse'],
    parentCluster: 'methodik-praxis',
  },

  {
    slug: 'seminare-und-workshops',
    slugEn: 'seminars-and-workshops',
    slugRu: 'seminary-i-vorkshopy',
    title: {
      de: 'Seminare und Workshops',
      en: 'Seminars and Workshops',
      ru: 'Семинары и воркшопы',
    },
    description: {
      de: 'Die Seminare und Workshops von Anatoly Mook sind intensive Erfahrungsräume, in denen Theorie und Praxis verschmelzen. Jede Veranstaltung bietet tiefe Einsichten, praktische Werkzeuge und transformative Erlebnisse.',
      en: 'Anatoly Mook\'s seminars and workshops are intensive experience spaces where theory and practice merge. Each event offers deep insights, practical tools, and transformative experiences.',
      ru: 'Семинары и воркшопы Анатолия Мука — интенсивные пространства опыта, где теория и практика сливаются. Каждое мероприятие даёт глубокие инсайты, практические инструменты и трансформативные переживания.',
    },
    metaTitle: {
      de: 'Seminare & Workshops – Anatoly Mook',
      en: 'Seminars & Workshops – Anatoly Mook',
      ru: 'Семинары и воркшопы – Анатолий Мук',
    },
    metaDescription: {
      de: 'Seminare und Workshops mit Anatoly Mook. Intensive Erfahrungsräume für tiefe Einsichten und transformative Praxis in Unna.',
      en: 'Seminars and workshops with Anatoly Mook. Intensive experience spaces for deep insights and transformative practice.',
      ru: 'Семинары и воркшопы с Анатолием Муком. Интенсивные пространства опыта для глубоких инсайтов и трансформативной практики.',
    },
    keywords: {
      de: ['Seminare', 'Workshops', 'Weiterbildung', 'Seminar Bewusstsein', 'Workshop Führung'],
      en: ['seminars', 'workshops', 'training', 'consciousness seminar', 'leadership workshop'],
      ru: ['семинары', 'воркшопы', 'обучение', 'семинар сознания', 'воркшоп лидерства'],
    },
    relatedServices: ['seminare', 'workshops'],
    relatedTopics: ['coaching-methoden', 'retreat-formate', 'gruppencoaching', 'bewusstseinsarbeit'],
    parentCluster: 'methodik-praxis',
  },

  {
    slug: 'mentoring',
    slugEn: 'mentoring',
    slugRu: 'mentoring',
    title: {
      de: 'Mentoring',
      en: 'Mentoring',
      ru: 'Менторинг',
    },
    description: {
      de: 'Mentoring mit Anatoly Mook ist eine tiefe, persönliche Begleitung auf Ihrem Weg. Profitieren Sie von jahrelanger Erfahrung, ehrlichem Feedback und einer vertrauensvollen Beziehung, die Ihr Wachstum beschleunigt.',
      en: 'Mentoring with Anatoly Mook is a deep, personal accompaniment on your journey. Benefit from years of experience, honest feedback, and a trusting relationship that accelerates your growth.',
      ru: 'Менторинг с Анатолием Муком — глубокое, личное сопровождение на вашем пути. Воспользуйтесь многолетним опытом, честной обратной связью и доверительными отношениями, ускоряющими ваш рост.',
    },
    metaTitle: {
      de: 'Mentoring – Anatoly Mook',
      en: 'Mentoring – Anatoly Mook',
      ru: 'Менторинг – Анатолий Мук',
    },
    metaDescription: {
      de: 'Persönliches Mentoring mit Anatoly Mook. Tiefe Begleitung, ehrliches Feedback und beschleunigtes Wachstum durch Erfahrung.',
      en: 'Personal mentoring with Anatoly Mook. Deep guidance, honest feedback, and accelerated growth through experience.',
      ru: 'Персональный менторинг с Анатолием Муком. Глубокое сопровождение, честная обратная связь и ускоренный рост через опыт.',
    },
    keywords: {
      de: ['Mentoring', 'Mentor', 'persönliche Begleitung', 'Mentoring-Programm', 'Mentor finden'],
      en: ['mentoring', 'mentor', 'personal guidance', 'mentoring program', 'finding a mentor'],
      ru: ['менторинг', 'ментор', 'личное сопровождение', 'программа менторинга', 'найти ментора'],
    },
    relatedServices: ['mentoring', 'coaching', 'einzelcoaching'],
    relatedTopics: ['einzelcoaching', 'persoenliches-wachstum', 'fuehrungskraefteentwicklung', 'potenzialentfaltung'],
    parentCluster: 'methodik-praxis',
  },

  {
    slug: 'einzelcoaching',
    slugEn: 'individual-coaching',
    slugRu: 'individualnyy-kouching',
    title: {
      de: 'Einzelcoaching',
      en: 'Individual Coaching',
      ru: 'Индивидуальный коучинг',
    },
    description: {
      de: 'Einzelcoaching mit Anatoly Mook bietet Ihnen einen geschützten Raum für tiefe persönliche Arbeit. In vertraulichen Sitzungen arbeiten Sie an Ihren individuellen Herausforderungen und Zielen – mit voller Aufmerksamkeit und maßgeschneiderter Begleitung.',
      en: 'Individual coaching with Anatoly Mook offers you a protected space for deep personal work. In confidential sessions, you work on your individual challenges and goals – with full attention and tailored guidance.',
      ru: 'Индивидуальный коучинг с Анатолием Муком предлагает защищённое пространство для глубокой личной работы. В конфиденциальных сессиях вы работаете над своими вызовами и целями — с полным вниманием и индивидуальным сопровождением.',
    },
    metaTitle: {
      de: 'Einzelcoaching – Anatoly Mook',
      en: 'Individual Coaching – Anatoly Mook',
      ru: 'Индивидуальный коучинг – Анатолий Мук',
    },
    metaDescription: {
      de: 'Einzelcoaching mit Anatoly Mook. Vertrauliche Sitzungen für tiefe persönliche Arbeit an Ihren Herausforderungen und Zielen.',
      en: 'Individual coaching with Anatoly Mook. Confidential sessions for deep personal work on your challenges and goals.',
      ru: 'Индивидуальный коучинг с Анатолием Муком. Конфиденциальные сессии для глубокой работы над вашими вызовами и целями.',
    },
    keywords: {
      de: ['Einzelcoaching', 'persönliches Coaching', '1:1 Coaching', 'Privatcoaching', 'individuelles Coaching'],
      en: ['individual coaching', 'personal coaching', 'one-on-one coaching', 'private coaching', 'bespoke coaching'],
      ru: ['индивидуальный коучинг', 'персональный коучинг', 'коучинг один на один', 'частный коучинг', 'личный коучинг'],
    },
    relatedServices: ['einzelcoaching', 'coaching', 'mentoring'],
    relatedTopics: ['coaching-methoden', 'mentoring', 'executive-coaching', 'online-coaching'],
    parentCluster: 'methodik-praxis',
  },

  {
    slug: 'gruppencoaching',
    slugEn: 'group-coaching',
    slugRu: 'gruppovoy-kouching',
    title: {
      de: 'Gruppencoaching',
      en: 'Group Coaching',
      ru: 'Групповой коучинг',
    },
    description: {
      de: 'Gruppencoaching mit Anatoly Mook nutzt die Kraft der Gemeinschaft für individuelle und kollektive Transformation. In der Gruppe entsteht ein einzigartiges Feld, das tiefe Einsichten und schnelles Wachstum ermöglicht.',
      en: 'Group coaching with Anatoly Mook harnesses the power of community for individual and collective transformation. In the group, a unique field emerges that enables deep insights and rapid growth.',
      ru: 'Групповой коучинг с Анатолием Муком использует силу сообщества для индивидуальной и коллективной трансформации. В группе возникает уникальное поле, открывающее глубокие инсайты и быстрый рост.',
    },
    metaTitle: {
      de: 'Gruppencoaching – Anatoly Mook',
      en: 'Group Coaching – Anatoly Mook',
      ru: 'Групповой коучинг – Анатолий Мук',
    },
    metaDescription: {
      de: 'Gruppencoaching mit Anatoly Mook. Die Kraft der Gemeinschaft für tiefe Einsichten und beschleunigtes persönliches Wachstum.',
      en: 'Group coaching with Anatoly Mook. The power of community for deep insights and accelerated personal growth.',
      ru: 'Групповой коучинг с Анатолием Муком. Сила сообщества для глубоких инсайтов и ускоренного личностного роста.',
    },
    keywords: {
      de: ['Gruppencoaching', 'Gruppen-Coaching', 'Gruppenarbeit', 'kollektives Coaching', 'Gruppenprozess'],
      en: ['group coaching', 'group work', 'collective coaching', 'group process', 'peer coaching'],
      ru: ['групповой коучинг', 'групповая работа', 'коллективный коучинг', 'групповой процесс', 'коучинг в группе'],
    },
    relatedServices: ['gruppencoaching', 'seminare', 'coaching'],
    relatedTopics: ['coaching-methoden', 'teamentwicklung', 'seminare-und-workshops', 'einzelcoaching'],
    parentCluster: 'methodik-praxis',
  },

  {
    slug: 'online-coaching',
    slugEn: 'online-coaching',
    slugRu: 'onlayn-kouching',
    title: {
      de: 'Online-Coaching',
      en: 'Online Coaching',
      ru: 'Онлайн-коучинг',
    },
    description: {
      de: 'Online-Coaching mit Anatoly Mook bietet Ihnen die gleiche Tiefe und Wirksamkeit wie Präsenzsitzungen – ortsunabhängig und flexibel. Nutzen Sie hochwertige Coaching-Begleitung, egal wo Sie sich befinden.',
      en: 'Online coaching with Anatoly Mook offers you the same depth and effectiveness as in-person sessions – location-independent and flexible. Benefit from high-quality coaching guidance wherever you are.',
      ru: 'Онлайн-коучинг с Анатолием Муком предлагает ту же глубину и эффективность, что и очные сессии — независимо от местоположения и гибко. Пользуйтесь качественным коучингом, где бы вы ни находились.',
    },
    metaTitle: {
      de: 'Online-Coaching – Anatoly Mook',
      en: 'Online Coaching – Anatoly Mook',
      ru: 'Онлайн-коучинг – Анатолий Мук',
    },
    metaDescription: {
      de: 'Online-Coaching mit Anatoly Mook. Tiefe und Wirksamkeit ortsunabhängig – hochwertige Begleitung, egal wo Sie sind.',
      en: 'Online coaching with Anatoly Mook. Depth and effectiveness regardless of location – quality guidance wherever you are.',
      ru: 'Онлайн-коучинг с Анатолием Муком. Глубина и эффективность независимо от места — качественное сопровождение, где бы вы ни были.',
    },
    keywords: {
      de: ['Online-Coaching', 'virtuelles Coaching', 'Coaching online', 'Remote Coaching', 'digitales Coaching'],
      en: ['online coaching', 'virtual coaching', 'remote coaching', 'digital coaching', 'coaching online'],
      ru: ['онлайн-коучинг', 'виртуальный коучинг', 'удалённый коучинг', 'цифровой коучинг', 'коучинг онлайн'],
    },
    relatedServices: ['coaching', 'einzelcoaching', 'gruppencoaching'],
    relatedTopics: ['einzelcoaching', 'coaching-methoden', 'gruppencoaching', 'mentoring'],
    parentCluster: 'methodik-praxis',
  },

  {
    slug: 'retreat-formate',
    slugEn: 'retreat-formats',
    slugRu: 'formaty-retritov',
    title: {
      de: 'Retreat-Formate',
      en: 'Retreat Formats',
      ru: 'Форматы ретритов',
    },
    description: {
      de: 'Die Retreats von Anatoly Mook schaffen einen Raum außerhalb des Alltags für tiefgreifende Transformation. In der Stille und Konzentration eines Retreats finden Sie Zugang zu Ihrer inneren Weisheit und neuer Kraft.',
      en: 'Anatoly Mook\'s retreats create a space outside daily life for profound transformation. In the stillness and concentration of a retreat, you find access to your inner wisdom and new strength.',
      ru: 'Ретриты Анатолия Мука создают пространство вне повседневности для глубокой трансформации. В тишине и сосредоточенности ретрита вы обретаете доступ к внутренней мудрости и новой силе.',
    },
    metaTitle: {
      de: 'Retreats – Anatoly Mook',
      en: 'Retreats – Anatoly Mook',
      ru: 'Ретриты – Анатолий Мук',
    },
    metaDescription: {
      de: 'Transformative Retreats mit Anatoly Mook. Ein Raum außerhalb des Alltags für tiefe innere Arbeit und neue Kraft.',
      en: 'Transformative retreats with Anatoly Mook. A space outside daily life for deep inner work and renewed strength.',
      ru: 'Трансформативные ретриты с Анатолием Муком. Пространство вне повседневности для глубокой внутренней работы и новой силы.',
    },
    keywords: {
      de: ['Retreat', 'Retreats', 'Rückzug', 'Stille-Retreat', 'Bewusstseins-Retreat'],
      en: ['retreat', 'retreats', 'silent retreat', 'consciousness retreat', 'leadership retreat'],
      ru: ['ретрит', 'ретриты', 'ретрит тишины', 'ретрит сознания', 'лидерский ретрит'],
    },
    relatedServices: ['retreat', 'seminare'],
    relatedTopics: ['seminare-und-workshops', 'bewusstseinsarbeit', 'meditation-fuer-fuehrungskraefte', 'innere-ruhe'],
    parentCluster: 'methodik-praxis',
  },

  {
    slug: 'transformationsprozesse',
    slugEn: 'transformation-processes',
    slugRu: 'protsessy-transformatsii',
    title: {
      de: 'Transformationsprozesse',
      en: 'Transformation Processes',
      ru: 'Процессы трансформации',
    },
    description: {
      de: 'Transformationsprozesse erfordern Mut, Bewusstsein und erfahrene Begleitung. Anatoly Mook gestaltet und begleitet individuelle und organisationale Transformationsprozesse, die nachhaltigen Wandel ermöglichen.',
      en: 'Transformation processes require courage, awareness, and experienced guidance. Anatoly Mook designs and accompanies individual and organizational transformation processes that enable lasting change.',
      ru: 'Процессы трансформации требуют смелости, осознанности и опытного сопровождения. Анатолий Мук разрабатывает и сопровождает индивидуальные и организационные процессы трансформации для устойчивых изменений.',
    },
    metaTitle: {
      de: 'Transformationsprozesse – Anatoly Mook',
      en: 'Transformation Processes – Anatoly Mook',
      ru: 'Процессы трансформации – Анатолий Мук',
    },
    metaDescription: {
      de: 'Transformationsprozesse mit Anatoly Mook. Erfahrene Begleitung für nachhaltigen individuellen und organisationalen Wandel.',
      en: 'Transformation processes with Anatoly Mook. Experienced guidance for sustainable individual and organizational change.',
      ru: 'Процессы трансформации с Анатолием Муком. Опытное сопровождение для устойчивых индивидуальных и организационных изменений.',
    },
    keywords: {
      de: ['Transformationsprozesse', 'Transformation', 'Wandel', 'Veränderungsprozesse', 'Transformationsbegleitung'],
      en: ['transformation processes', 'transformation', 'change', 'change processes', 'transformation guidance'],
      ru: ['процессы трансформации', 'трансформация', 'изменения', 'процессы изменений', 'сопровождение трансформации'],
    },
    relatedServices: ['coaching', 'corporate-coaching', 'seminare'],
    relatedTopics: ['persoenliche-transformation', 'change-management', 'coaching-methoden', 'bewusstseinsarbeit'],
    parentCluster: 'methodik-praxis',
  },

  {
    slug: 'bewusstseinsarbeit',
    slugEn: 'consciousness-work',
    slugRu: 'rabota-s-soznaniem',
    title: {
      de: 'Bewusstseinsarbeit',
      en: 'Consciousness Work',
      ru: 'Работа с сознанием',
    },
    description: {
      de: 'Bewusstseinsarbeit ist das Herzstück von Anatoly Mooks Methodik. Durch gezielte Praktiken und Prozesse erweitern Sie Ihr Bewusstsein, erkennen verborgene Muster und erschließen neue Möglichkeitsräume.',
      en: 'Consciousness work is the heart of Anatoly Mook\'s methodology. Through targeted practices and processes, you expand your awareness, recognize hidden patterns, and open new possibility spaces.',
      ru: 'Работа с сознанием — сердце методологии Анатолия Мука. Через целенаправленные практики и процессы вы расширяете осознанность, распознаёте скрытые паттерны и открываете новые пространства возможностей.',
    },
    metaTitle: {
      de: 'Bewusstseinsarbeit – Anatoly Mook',
      en: 'Consciousness Work – Anatoly Mook',
      ru: 'Работа с сознанием – Анатолий Мук',
    },
    metaDescription: {
      de: 'Bewusstseinsarbeit mit Anatoly Mook. Gezielte Praktiken zur Erweiterung Ihres Bewusstseins und Entdeckung neuer Möglichkeiten.',
      en: 'Consciousness work with Anatoly Mook. Targeted practices to expand your awareness and discover new possibilities.',
      ru: 'Работа с сознанием с Анатолием Муком. Целенаправленные практики для расширения осознанности и открытия новых возможностей.',
    },
    keywords: {
      de: ['Bewusstseinsarbeit', 'Bewusstseinspraxis', 'Bewusstseinsforschung', 'innere Arbeit', 'Bewusstseinscoaching'],
      en: ['consciousness work', 'awareness practice', 'consciousness exploration', 'inner work', 'consciousness coaching'],
      ru: ['работа с сознанием', 'практика осознанности', 'исследование сознания', 'внутренняя работа', 'коучинг сознания'],
    },
    relatedServices: ['coaching', 'retreat', 'seminare'],
    relatedTopics: ['bewusstseinsentwicklung', 'meditation-fuer-fuehrungskraefte', 'transformationsprozesse', 'koerperarbeit-und-bewusstsein'],
    parentCluster: 'methodik-praxis',
  },

  {
    slug: 'meditation-fuer-fuehrungskraefte',
    slugEn: 'meditation-for-leaders',
    slugRu: 'meditatsiya-dlya-rukovoditeley',
    title: {
      de: 'Meditation für Führungskräfte',
      en: 'Meditation for Leaders',
      ru: 'Медитация для руководителей',
    },
    description: {
      de: 'Meditation ist kein esoterisches Ritual, sondern ein kraftvolles Werkzeug für Führungskräfte. Anatoly Mook vermittelt praxistaugliche Meditationstechniken, die Klarheit, Fokus und innere Ruhe stärken.',
      en: 'Meditation is not an esoteric ritual but a powerful tool for leaders. Anatoly Mook teaches practical meditation techniques that strengthen clarity, focus, and inner calm.',
      ru: 'Медитация — не эзотерический ритуал, а мощный инструмент для руководителей. Анатолий Мук передаёт практичные техники медитации, усиливающие ясность, фокус и внутренний покой.',
    },
    metaTitle: {
      de: 'Meditation für Führungskräfte – Anatoly Mook',
      en: 'Meditation for Leaders – Anatoly Mook',
      ru: 'Медитация для руководителей – Анатолий Мук',
    },
    metaDescription: {
      de: 'Meditation für Führungskräfte mit Anatoly Mook. Praxistaugliche Techniken für mehr Klarheit, Fokus und innere Ruhe im Führungsalltag.',
      en: 'Meditation for leaders with Anatoly Mook. Practical techniques for more clarity, focus, and inner calm in leadership.',
      ru: 'Медитация для руководителей с Анатолием Муком. Практичные техники для ясности, фокуса и покоя в лидерстве.',
    },
    keywords: {
      de: ['Meditation Führungskräfte', 'Meditation für Manager', 'Business Meditation', 'Achtsamkeitsmeditation', 'Meditation lernen'],
      en: ['meditation for leaders', 'meditation for executives', 'business meditation', 'mindfulness meditation', 'learning meditation'],
      ru: ['медитация для руководителей', 'медитация для менеджеров', 'бизнес-медитация', 'медитация осознанности', 'обучение медитации'],
    },
    relatedServices: ['seminare', 'coaching', 'retreat'],
    relatedTopics: ['achtsamkeit-im-alltag', 'innere-ruhe', 'bewusstseinsarbeit', 'praesenz-und-gegenwaertigkeit'],
    parentCluster: 'methodik-praxis',
  },

  {
    slug: 'koerperarbeit-und-bewusstsein',
    slugEn: 'bodywork-and-consciousness',
    slugRu: 'telesnaya-rabota-i-soznanie',
    title: {
      de: 'Körperarbeit und Bewusstsein',
      en: 'Bodywork and Consciousness',
      ru: 'Телесная работа и сознание',
    },
    description: {
      de: 'Der Körper speichert Erfahrungen und Weisheit. Anatoly Mook integriert Körperarbeit in seine Begleitung, um über den Körper Zugang zu tieferen Bewusstseinsebenen zu schaffen und ganzheitliche Transformation zu ermöglichen.',
      en: 'The body stores experiences and wisdom. Anatoly Mook integrates bodywork into his guidance to create access to deeper levels of consciousness through the body and enable holistic transformation.',
      ru: 'Тело хранит опыт и мудрость. Анатолий Мук интегрирует телесную работу в сопровождение, чтобы через тело открыть доступ к глубоким уровням сознания и обеспечить целостную трансформацию.',
    },
    metaTitle: {
      de: 'Körperarbeit & Bewusstsein – Anatoly Mook',
      en: 'Bodywork & Consciousness – Anatoly Mook',
      ru: 'Телесная работа и сознание – Анатолий Мук',
    },
    metaDescription: {
      de: 'Körperarbeit und Bewusstsein mit Anatoly Mook. Ganzheitliche Transformation durch die Verbindung von Körper und Geist.',
      en: 'Bodywork and consciousness with Anatoly Mook. Holistic transformation through the connection of body and mind.',
      ru: 'Телесная работа и сознание с Анатолием Муком. Целостная трансформация через связь тела и ума.',
    },
    keywords: {
      de: ['Körperarbeit', 'Körperbewusstsein', 'Soma', 'Embodiment', 'ganzheitliche Arbeit'],
      en: ['bodywork', 'body awareness', 'soma', 'embodiment', 'holistic work'],
      ru: ['телесная работа', 'телесное осознание', 'сома', 'воплощение', 'целостная работа'],
    },
    relatedServices: ['coaching', 'retreat', 'seminare'],
    relatedTopics: ['bewusstseinsarbeit', 'bewusstseinsentwicklung', 'meditation-fuer-fuehrungskraefte', 'innere-staerke'],
    parentCluster: 'methodik-praxis',
  },

  {
    slug: 'journaling-und-reflexion',
    slugEn: 'journaling-and-reflection',
    slugRu: 'zhurnalirovanie-i-refleksiya',
    title: {
      de: 'Journaling und Reflexion',
      en: 'Journaling and Reflection',
      ru: 'Журналирование и рефлексия',
    },
    description: {
      de: 'Journaling ist ein mächtiges Werkzeug der Selbstreflexion und Bewusstseinsentwicklung. Anatoly Mook vermittelt Ihnen effektive Journaling-Methoden, die Klarheit schaffen und Ihren Wachstumsprozess beschleunigen.',
      en: 'Journaling is a powerful tool for self-reflection and consciousness development. Anatoly Mook teaches you effective journaling methods that create clarity and accelerate your growth process.',
      ru: 'Журналирование — мощный инструмент саморефлексии и развития сознания. Анатолий Мук передаёт эффективные методы журналирования, создающие ясность и ускоряющие процесс роста.',
    },
    metaTitle: {
      de: 'Journaling & Reflexion – Anatoly Mook',
      en: 'Journaling & Reflection – Anatoly Mook',
      ru: 'Журналирование и рефлексия – Анатолий Мук',
    },
    metaDescription: {
      de: 'Journaling und Reflexion mit Anatoly Mook. Effektive Methoden für Klarheit, Selbsterkenntnis und beschleunigtes Wachstum.',
      en: 'Journaling and reflection with Anatoly Mook. Effective methods for clarity, self-awareness, and accelerated growth.',
      ru: 'Журналирование и рефлексия с Анатолием Муком. Эффективные методы для ясности, самопознания и ускоренного роста.',
    },
    keywords: {
      de: ['Journaling', 'Reflexion', 'Tagebuch schreiben', 'Selbstreflexion', 'Journaling-Methoden'],
      en: ['journaling', 'reflection', 'journal writing', 'self-reflection', 'journaling methods'],
      ru: ['журналирование', 'рефлексия', 'ведение дневника', 'саморефлексия', 'методы журналирования'],
    },
    relatedServices: ['coaching', 'mentoring', 'seminare'],
    relatedTopics: ['selbstreflexion', 'selbsterkenntnis', 'bewusstseinsarbeit', 'achtsamkeit-im-alltag'],
    parentCluster: 'methodik-praxis',
  },
];

export function getTopicBySlug(
  slug: string,
  lang?: string,
): TopicCluster | undefined {
  return topicClusters.find((topic) => {
    if (!lang || lang === 'de') return topic.slug === slug;
    if (lang === 'en') return topic.slugEn === slug;
    if (lang === 'ru') return topic.slugRu === slug;
    return topic.slug === slug;
  });
}

export function getRelatedTopics(slug: string): TopicCluster[] {
  const topic = topicClusters.find((t) => t.slug === slug);
  if (!topic) return [];
  return topicClusters.filter((t) => topic.relatedTopics.includes(t.slug));
}

export function getTopicsByService(serviceSlug: string): TopicCluster[] {
  return topicClusters.filter((t) => t.relatedServices.includes(serviceSlug));
}
