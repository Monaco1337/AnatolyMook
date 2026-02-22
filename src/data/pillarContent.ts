export interface PillarPage {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  locale: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
  introduction: string;
  sections: Array<{
    id: string;
    heading: string;
    content: string;
    subsections?: Array<{
      heading: string;
      content: string;
    }>;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedKeywords: string[];
  internalLinks: Array<{
    text: string;
    url: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
}

export const pillarPages: Record<string, PillarPage> = {
  'spirituelles-erwachen': {
    id: 'spirituelles-erwachen',
    slug: 'spirituelles-erwachen',
    title: 'Spirituelles Erwachen: Der ultimative Guide für Bewusstseinsdurchbruch 2026',
    metaDescription: 'Alles über spirituelles Erwachen: Symptome, Phasen, Navigation und professionelle Begleitung. Erfahren Sie, wie Sie sicher durch den Transformationsprozess gehen mit Anatoly Mook.',
    locale: 'de',
    hero: {
      title: 'Spirituelles Erwachen',
      subtitle: 'Der Weg zu direkter Erkenntnis jenseits von Konzepten',
      image: '/hero-awakening.jpg',
      imageAlt: 'Spirituelles Erwachen - Bewusstseinsdurchbruch und innere Transformation'
    },
    introduction: `Spirituelles Erwachen ist kein intellektuelles Konzept, keine Glaubensfrage und keine Leistung, die man erbringen muss. Es ist ein natürlicher Prozess, bei dem das begrenzte Selbstbild transzendiert wird und eine direkte Erfahrung der wahren Natur des Seins entsteht.

Dieser Guide basiert auf über 15 Jahren praktischer Erfahrung in der Begleitung von Menschen durch spirituelle Transformationsprozesse. Hier finden Sie keine theoretischen Konzepte, sondern lebendige Praxis.`,
    sections: [
      {
        id: 'was-ist-spirituelles-erwachen',
        heading: 'Was ist spirituelles Erwachen?',
        content: `Spirituelles Erwachen bezeichnet einen tiefgreifenden Shift im Bewusstsein. Es ist der Moment, in dem die Identifikation mit dem begrenzten "Ich" aufbricht und ein Gewahrsein jenseits dieser Identifikation entsteht.

Es ist NICHT:
- Ein permanenter Zustand von Glückseligkeit
- Eine Flucht aus der Realität
- Ein übernatürliches Phänomen
- Eine religiöse Konversion
- Ein intellektuelles Verstehen

Es IST:
- Eine direkte Erkenntnis der wahren Natur
- Ein Ende der unbewussten Identifikation mit Gedanken
- Eine Öffnung zu dem, was bereits ist
- Eine Rückkehr zum natürlichen Zustand
- Ein Durchbrechen konditionierter Wahrnehmung`,
        subsections: [
          {
            heading: 'Die wissenschaftliche Perspektive',
            content: 'Neurowissenschaftliche Studien zeigen messbare Veränderungen in der Gehirnaktivität bei Menschen, die spirituelles Erwachen erleben. Besonders der Default Mode Network (DMN) - verantwortlich für das Selbstbezogene Denken - zeigt deutlich verringerte Aktivität.'
          },
          {
            heading: 'Historischer Kontext',
            content: 'Spirituelles Erwachen ist keine moderne Erfindung. Es wird in allen großen spirituellen Traditionen beschrieben: Erleuchtung im Buddhismus, Moksha im Hinduismus, Fana im Sufismus, Henosis in der griechischen Philosophie.'
          }
        ]
      },
      {
        id: 'symptome-und-zeichen',
        heading: 'Symptome und Zeichen des spirituellen Erwachens',
        content: `Die Zeichen spirituellen Erwachens sind vielfältig und individuell. Es gibt jedoch wiederkehrende Muster:`,
        subsections: [
          {
            heading: 'Frühe Anzeichen',
            content: `- Zunehmendes Gefühl der Getrenntheit vom gewohnten Selbst
- Fragen nach dem Sinn des Lebens intensivieren sich
- Alte Identitäten und Rollen fühlen sich hohl an
- Spontane Momente tiefer Präsenz
- Erhöhte Sensibilität für Energie und Stimmungen
- Rückzugsbedürfnis von oberflächlichen Aktivitäten`
          },
          {
            heading: 'Intensivierungsphase',
            content: `- Auflösung alter Glaubenssysteme
- Emotionale Intensität oder Leerheit
- Veränderte Zeitwahrnehmung
- Synchronizitäten häufen sich
- Energetische Phänomene (Kribbeln, Hitze, Kälte)
- Schlafmuster verändern sich
- Ernährungsbedürfnisse ändern sich`
          },
          {
            heading: 'Durchbruchsphase',
            content: `- Plötzliches "Fallen" aller mentalen Konstrukte
- Direktes Gewahrsein ohne Vermittler
- Gefühl von grenzenloser Weite
- Auflösung der Trennung zwischen Innen und Außen
- Tiefes Friedensempfinden
- Erkenntnis: "Ich bin das, was immer war"`
          },
          {
            heading: 'Integationsphase',
            content: `- Stabilisierung des neuen Zustands
- Rückkehr zu "normalem" Leben mit neuer Perspektive
- Fähigkeit, zwischen Perspektiven zu wechseln
- Mitgefühl ohne persönliche Betroffenheit
- Natürliche Ethik ohne Regeln
- Handeln aus Stille statt aus Reaktion`
          }
        ]
      },
      {
        id: 'phasen-des-prozesses',
        heading: 'Die Phasen des spirituellen Erwachens',
        content: `Spirituelles Erwachen folgt keinem linearen Pfad, doch es gibt erkennbare Phasen:`,
        subsections: [
          {
            heading: '1. Die Suchphase',
            content: 'Unzufriedenheit mit dem bisherigen Leben. Suche nach Antworten in Büchern, Lehrern, Praktiken. Diese Phase kann Jahre dauern und ist geprägt von spirituellem Materialismus - dem Sammeln von Wissen und Techniken.'
          },
          {
            heading: '2. Die Krise',
            content: 'Oft ausgelöst durch Lebenskrisen, Verlust, Trauma oder Erschöpfung. Die alten Strategien funktionieren nicht mehr. Das Ego-Selbst beginnt zu kollabieren. Diese "dunkle Nacht der Seele" ist schmerzhaft aber notwendig.'
          },
          {
            heading: '3. Das Loslassen',
            content: 'Aufgabe des Suchens. Kapitulation vor dem, was ist. Dies ist nicht Resignation, sondern aktives Annehmen. In diesem Loslassen entsteht paradoxerweise die Öffnung für das Erwachen.'
          },
          {
            heading: '4. Das Erwachen',
            content: 'Spontaner oder gradueller Shift. Die Identifikation mit dem begrenzten Selbst bricht auf. Was übrig bleibt ist reines Gewahrsein. Dies kann erschreckend oder befreiend sein - oft beides.'
          },
          {
            heading: '5. Die Integration',
            content: 'Das Erwachen muss ins tägliche Leben integriert werden. Alte Muster können zurückkehren. Hier zeigt sich, ob das Erwachen stabil ist oder nur eine Erfahrung war. Diese Phase braucht oft Begleitung.'
          }
        ]
      },
      {
        id: 'herausforderungen',
        heading: 'Herausforderungen und Fallstricke',
        content: `Der Weg des Erwachens ist nicht immer angenehm. Hier sind die häufigsten Herausforderungen:`,
        subsections: [
          {
            heading: 'Spirituelles Ego',
            content: 'Das Ego adoptiert spirituelle Konzepte und macht daraus eine neue Identität. "Ich bin erwacht" wird zum neuen Stolz. Dies ist subtiler und gefährlicher als das weltliche Ego.'
          },
          {
            heading: 'Depersonalisation',
            content: 'Verlust des Selbstgefühls kann zu Desorientierung führen. Unterschied zwischen gesunder Nicht-Identifikation und pathologischer Depersonalisation muss erkannt werden.'
          },
          {
            heading: 'Spiritueller Bypass',
            content: 'Verwendung spiritueller Konzepte, um unverarbeitete Emotionen zu umgehen. "Alles ist Eins" wird benutzt, um keine Grenzen setzen zu müssen. "Ego-Tod" als Ausrede für Verantwortungslosigkeit.'
          },
          {
            heading: 'Soziale Isolation',
            content: 'Alte Beziehungen passen nicht mehr. Neue spirituelle Gemeinschaften können sektenartig sein. Balance zwischen Rückzug und Verbindung ist essentiell.'
          },
          {
            heading: 'Energetische Überlastung',
            content: 'Kundalini-Aktivierung oder andere energetische Phänomene können überwältigend sein. Ohne Guidance kann dies zu psychischen oder physischen Problemen führen.'
          }
        ]
      },
      {
        id: 'begleitung',
        heading: 'Professionelle Begleitung durch den Prozess',
        content: `Warum Begleitung entscheidend ist:

Ein erfahrener Lehrer kann:
- Normale Prozesse von pathologischen unterscheiden
- Bei energetischen Überlastungen unterstützen
- Spirituelles Ego erkennen und ansprechen
- Integration in den Alltag ermöglichen
- Irrwege vermeiden helfen
- Den Prozess beschleunigen (oder verlangsamen, wenn nötig)

Anatoly Mook arbeitet seit über 15 Jahren mit Menschen in allen Phasen des Erwachens. Der Ansatz ist:
- Nicht-direktiv: Keine Methode wird aufgezwungen
- Transmission-basiert: Arbeit findet auf der Ebene des Seins statt, nicht nur des Verstehens
- Praktisch: Keine spirituellen Fantasien, sondern gelebte Realität
- Individuell: Jeder Mensch hat einen einzigartigen Weg`
      }
    ],
    faqs: [
      {
        question: 'Kann jeder Mensch spirituelles Erwachen erleben?',
        answer: 'Ja, spirituelles Erwachen ist das natürliche Potenzial jedes Menschen. Es ist keine Frage von Begabung, Verdienst oder spiritueller Leistung. Es ist bereits da und wartet darauf, erkannt zu werden. Die Bereitschaft, alle Konzepte loszulassen, ist entscheidender als jede Praxis.'
      },
      {
        question: 'Wie lange dauert der Prozess des spirituellen Erwachens?',
        answer: 'Es gibt kein fixes Zeitfenster. Manche Menschen erleben spontane, plötzliche Durchbrüche. Andere durchlaufen einen graduellen Prozess über Monate oder Jahre. Entscheidend ist nicht die Geschwindigkeit, sondern die Tiefe und Integration. Hastige Suche nach "schnellem Erwachen" ist oft kontraproduktiv.'
      },
      {
        question: 'Ist spirituelles Erwachen gefährlich?',
        answer: 'Spirituelles Erwachen selbst ist nicht gefährlich, kann aber herausfordernd sein, da alte Strukturen zusammenbrechen. Mit professioneller Begleitung durch erfahrene Lehrer wie Anatoly Mook kann dieser Prozess sicher navigiert werden. Wichtig ist, den Prozess nicht alleine durchzugehen und bei psychischen Vorerkrankungen therapeutische Unterstützung hinzuzuziehen.'
      },
      {
        question: 'Was ist der Unterschied zwischen spirituellem Erwachen und Erleuchtung?',
        answer: 'Spirituelles Erwachen ist oft ein initiales Durchbrechen der Identifikation mit dem Ego. Es kann kommen und gehen. Erleuchtung bezeichnet eine dauerhafte Stabilität in diesem erwachten Zustand - einen irreversiblen Shift. Beide sind Teil desselben Kontinuums der Bewusstseinsentwicklung. Die Begriffe werden jedoch nicht einheitlich verwendet.'
      },
      {
        question: 'Brauche ich Meditation für spirituelles Erwachen?',
        answer: 'Meditation ist ein wertvolles Werkzeug, aber nicht zwingend notwendig. Manche Menschen erwachen spontan ohne je meditiert zu haben. Andere meditieren jahrzehntelang ohne Durchbruch. Meditation kann den Boden bereiten, aber das Erwachen selbst geschieht jenseits aller Praktiken. Es ist Gnade, nicht Leistung.'
      },
      {
        question: 'Kann man nach spirituellem Erwachen wieder "zurückfallen"?',
        answer: 'Anfängliche Erwachens-Erfahrungen können verblassen. Das ist normal und kein "Versagen". Diese Phasen dienen der Integration. Wahre Erleuchtung ist irreversibel, aber der Weg dorthin kann wellenförmig verlaufen. Wichtig ist, nicht am Zustand festzuhalten, sondern dem Prozess zu vertrauen.'
      }
    ],
    relatedKeywords: [
      'spirituelles erwachen symptome',
      'erwachen erfahrungen',
      'spirituelle krise',
      'kundalini erwachen',
      'dunkle nacht der seele',
      'ego auflösen',
      'erleuchtung erreichen',
      'bewusstsein erweitern',
      'spirituelle transformation',
      'inneres erwachen'
    ],
    internalLinks: [
      { text: 'Bewusstsein erweitern', url: '/bewusstsein-erweitern' },
      { text: 'Ego auflösen', url: '/ego-aufloesen' },
      { text: 'Innere Transformation', url: '/innere-transformation' },
      { text: 'Seminare', url: '/seminare' },
      { text: 'Coaching', url: '/coaching' }
    ],
    cta: {
      title: 'Bereit für Ihren eigenen Weg?',
      description: 'Buchen Sie ein kostenloses Erstgespräch, um zu klären, ob und wie Begleitung auf Ihrem Weg sinnvoll ist.',
      buttonText: 'Jetzt Gespräch buchen',
      buttonUrl: '/booking'
    }
  },

  'spiritual-awakening': {
    id: 'spiritual-awakening',
    slug: 'spiritual-awakening',
    title: 'Spiritual Awakening: Complete Guide to Consciousness Breakthrough 2026',
    metaDescription: 'Everything about spiritual awakening: signs, stages, navigation, and professional guidance. Learn how to safely navigate the transformation with Anatoly Mook.',
    locale: 'en',
    hero: {
      title: 'Spiritual Awakening',
      subtitle: 'The Path to Direct Recognition Beyond Concepts',
      image: '/hero-awakening.jpg',
      imageAlt: 'Spiritual Awakening - Consciousness Breakthrough and Inner Transformation'
    },
    introduction: `Spiritual awakening is not an intellectual concept, not a belief system, and not an achievement to be earned. It is a natural process in which the limited self-image is transcended and a direct experience of the true nature of being emerges.

This guide is based on over 15 years of practical experience in accompanying people through spiritual transformation processes. Here you will find no theoretical concepts, but living practice.`,
    sections: [
      {
        id: 'what-is-spiritual-awakening',
        heading: 'What is Spiritual Awakening?',
        content: `Spiritual awakening refers to a profound shift in consciousness. It is the moment when identification with the limited "I" breaks open and an awareness beyond this identification emerges.

It is NOT:
- A permanent state of bliss
- An escape from reality
- A supernatural phenomenon
- A religious conversion
- An intellectual understanding

It IS:
- A direct recognition of true nature
- An end to unconscious identification with thoughts
- An opening to what already is
- A return to the natural state
- A breakthrough of conditioned perception`,
        subsections: [
          {
            heading: 'The Scientific Perspective',
            content: 'Neuroscientific studies show measurable changes in brain activity in people experiencing spiritual awakening. Particularly the Default Mode Network (DMN) - responsible for self-referential thinking - shows significantly reduced activity.'
          },
          {
            heading: 'Historical Context',
            content: 'Spiritual awakening is not a modern invention. It is described in all major spiritual traditions: Enlightenment in Buddhism, Moksha in Hinduism, Fana in Sufism, Henosis in Greek philosophy.'
          }
        ]
      },
      {
        id: 'signs-and-symptoms',
        heading: 'Signs and Symptoms of Spiritual Awakening',
        content: `The signs of spiritual awakening are diverse and individual. However, there are recurring patterns:`,
        subsections: [
          {
            heading: 'Early Signs',
            content: `- Increasing sense of separation from habitual self
- Questions about life's meaning intensify
- Old identities and roles feel hollow
- Spontaneous moments of deep presence
- Heightened sensitivity to energy and moods
- Need to withdraw from superficial activities`
          },
          {
            heading: 'Intensification Phase',
            content: `- Dissolution of old belief systems
- Emotional intensity or emptiness
- Altered perception of time
- Synchronicities accumulate
- Energetic phenomena (tingling, heat, cold)
- Sleep patterns change
- Dietary needs shift`
          },
          {
            heading: 'Breakthrough Phase',
            content: `- Sudden "falling away" of all mental constructs
- Direct awareness without mediator
- Feeling of boundless space
- Dissolution of separation between inside and outside
- Deep sense of peace
- Recognition: "I am that which always was"`
          },
          {
            heading: 'Integration Phase',
            content: `- Stabilization of new state
- Return to "normal" life with new perspective
- Ability to shift between perspectives
- Compassion without personal involvement
- Natural ethics without rules
- Action from stillness rather than reaction`
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Can anyone experience spiritual awakening?',
        answer: 'Yes, spiritual awakening is the natural potential of every human being. It is not a matter of talent, merit, or spiritual achievement. It is already there, waiting to be recognized. The willingness to let go of all concepts is more crucial than any practice.'
      },
      {
        question: 'How long does spiritual awakening take?',
        answer: 'There is no fixed timeframe. Some people experience spontaneous, sudden breakthroughs. Others go through a gradual process over months or years. What matters is not speed but depth and integration. Hasty seeking of "quick awakening" is often counterproductive.'
      }
    ],
    relatedKeywords: [
      'spiritual awakening signs',
      'awakening experiences',
      'spiritual crisis',
      'kundalini awakening',
      'dark night of the soul',
      'ego dissolution',
      'enlightenment',
      'consciousness expansion',
      'spiritual transformation',
      'inner awakening'
    ],
    internalLinks: [
      { text: 'Consciousness Expansion', url: '/consciousness-expansion' },
      { text: 'Ego Dissolution', url: '/ego-dissolution' },
      { text: 'Inner Transformation', url: '/inner-transformation' },
      { text: 'Seminars', url: '/seminars' },
      { text: 'Coaching', url: '/coaching' }
    ],
    cta: {
      title: 'Ready for Your Own Path?',
      description: 'Book a free initial consultation to clarify if and how guidance on your path makes sense.',
      buttonText: 'Book Consultation Now',
      buttonUrl: '/booking'
    }
  }
};
