import { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, MessageCircle, Users, ShoppingCart, BookOpen, Mail, Calendar, CreditCard, Shield, HelpCircle, Search, Zap, ArrowRight, Briefcase, Home, Clock, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: typeof Sparkles;
  color: string;
  gradient: string;
}

export default function FAQ() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories: FAQCategory[] = [
    { id: 'all', label: 'Alle Themen', icon: HelpCircle, color: 'text-amber-400', gradient: 'from-amber-500 to-orange-500' },
    { id: 'eignung', label: 'Eignung & Einstieg', icon: Users, color: 'text-orange-400', gradient: 'from-orange-500 to-amber-500' },
    { id: 'business', label: 'Business & Führung', icon: Briefcase, color: 'text-yellow-400', gradient: 'from-yellow-500 to-orange-500' },
    { id: 'seminare', label: 'Seminare & Events', icon: Calendar, color: 'text-amber-400', gradient: 'from-amber-500 to-yellow-500' },
    { id: 'organisation', label: 'Organisation', icon: Clock, color: 'text-orange-400', gradient: 'from-orange-500 to-red-500' },
    { id: 'storno', label: 'Storno & Umbuchung', icon: FileText, color: 'text-yellow-400', gradient: 'from-yellow-500 to-amber-500' },
    { id: 'corporate', label: 'Corporate & Inhouse', icon: Briefcase, color: 'text-amber-400', gradient: 'from-amber-500 to-orange-500' },
    { id: 'kurse', label: 'Online-Kurse', icon: BookOpen, color: 'text-orange-400', gradient: 'from-orange-500 to-amber-500' }
  ];

  const faqItems: FAQItem[] = [
    // Eignung & Einstieg
    {
      category: 'eignung',
      question: 'Für wen sind die Seminare geeignet?',
      answer: 'Für Menschen, die Präsenz, innere Ordnung und klare Selbstführung vertiefen wollen – pragmatisch, präzise, ohne Floskeln. Du musst nichts „können". Offenheit, Ehrlichkeit und Bereitschaft zur wachen Teilnahme reichen aus.'
    },
    {
      category: 'eignung',
      question: 'Brauche ich Vorerfahrung in Meditation oder Achtsamkeit?',
      answer: 'Nein. Die Praxis wird so geführt, dass Einsteiger klar folgen können – und Erfahrene zugleich Tiefe finden. Entscheidend ist nicht Vorwissen, sondern wache Teilnahme.'
    },
    {
      category: 'eignung',
      question: 'Was ist der Fokus von Anatolys Methode?',
      answer: 'Es geht um Transzendenz in neues Bewusstsein – praktisch und alltagstauglich: Achtsamkeitslehre (Präsenz stabilisieren), Bewusstseinstraining (innere Ordnung, Orientierung) und Umsetzung (stimmige Schritte in Alltag, Beziehung, Beruf/Wirksamkeit).'
    },
    {
      category: 'eignung',
      question: 'Welche Ergebnisse kann ich realistisch erwarten?',
      answer: 'Keine Versprechen, aber eine klare Ergebnislogik: Viele Teilnehmende erleben mehr Ruhe unter Druck, klarere Entscheidungen, stimmigere Grenzen, fokussierte Energie und eine tragfähige Ausrichtung, die im Alltag weiterwirkt.'
    },
    {
      category: 'eignung',
      question: 'Muss ich körperlich fit sein?',
      answer: 'Nein. Die Praxis ist zugänglich und kann angepasst werden. Wenn du akute körperliche Einschränkungen hast, gib uns vorab kurz Bescheid, damit wir gut begleiten können.'
    },
    {
      category: 'eignung',
      question: 'Gibt es Themen, bei denen ich vorher Rücksprache halten sollte?',
      answer: 'Ja – aus Verantwortung: Wenn du gerade in einer akuten psychischen Krise, in intensiver Traumabearbeitung oder in instabiler Behandlungssituation bist, melde dich bitte vorab. Dann prüfen wir gemeinsam, ob dieses Format jetzt stimmig ist (oder welcher Einstieg besser passt).'
    },
    {
      category: 'eignung',
      question: 'Gibt es eine Möglichkeit, "reinzuschnuppern"?',
      answer: 'Ja, du hast die Möglichkeit, an einem der kostenlosen Live-Events teilzunehmen. Dort werden bereits nützliche Techniken gezeigt, die du in deinem Alltag anwenden kannst. Bei den meisten Events bekommst du sogar die Chance, dich für ein kostenloses 1:1-Coaching zu bewerben. Trage dich für den Newsletter ein, um das nächste Event nicht zu verpassen.'
    },

    // Business & Führung
    {
      category: 'business',
      question: 'Bin ich für die Ausbildung geeignet?',
      answer: 'Egal, ob du bereits Führungskraft oder ambitionierter Angestellter bist. Für jede Stufe in deiner Karriere gibt es Verbesserungspotenzial. Deine Schwächen erkennst du meistens erst, wenn du dich aktiv mit dem Thema auseinandersetzt. Und hast du erst deine Schwäche in deine größte Stärke umgewandelt, lässt der nächste Karrieresprung nicht lange auf sich warten.'
    },
    {
      category: 'business',
      question: 'Was sind die Inhalte der Ausbildung?',
      answer: 'Im Alltag stehen wir vor unzähligen kommunikativen Herausforderungen. Du kannst dir selbst aussuchen, mit welchem Thema du als Erstes startest. Sei es Konfliktmanagement, Verhandlungsgeschick, Persönlichkeitsentwicklung oder Effizienz. Zu jedem Thema findest du spannendes Know-how, das auch im privaten Bereich nützlich ist.'
    },
    {
      category: 'business',
      question: 'Wie wird die Ausbildung mein Gehalt steigern?',
      answer: 'Du lernst, wie du abseits von deiner Fachkompetenz mit deinem Auftreten punktest. Überzeugend zu argumentieren ist in den meisten Fällen wichtiger als der Inhalt deiner Aussage. Mit selbstbewusstem und gleichzeitig sympathischem Erscheinungsbild, bewaffnet mit den besten Verhandlungstechniken, wirst du mit Vorgesetzten oder Vertragspartnern bessere Ergebnisse für dich aushandeln.'
    },
    {
      category: 'business',
      question: 'Was sind die Unterschiede zu anderen Führungs-Weiterbildungen?',
      answer: 'Andere Führungskräfte-"Trainings" dauern meist 2 bis 3 Tage und behandeln dementsprechend alles sehr oberflächlich. Da wir wissen, dass eine signifikante Veränderung deiner Persönlichkeit nur mit viel Übung und praktischem Anwenden zu erreichen ist, dauert unsere Ausbildung mindestens 6 Monate. Wir nehmen uns viel Zeit, damit du das Gelernte tatsächlich verinnerlichst und die Routine entwickelst, um es anzuwenden.'
    },
    {
      category: 'business',
      question: 'Wird sich die Ausbildung für mich auszahlen?',
      answer: 'Die Absolventen der Masterclass erreichen ihre Ziele noch während des 6-monatigen Zeitraums. Seien es Gehaltserhöhungen oder Beförderungen. Die Investition rechnet sich in allen Fällen noch schneller, als die Teilnehmer es erwartet hätten. Die einzige Bedingung: Du musst 3 bis 4 Stunden die Woche in deine Veränderung investieren und aktiv mitmachen.'
    },

    // Corporate & Inhouse
    {
      category: 'corporate',
      question: 'Bieten Sie die Seminare auch exklusiv für unser Team vor Ort an?',
      answer: 'Ja, alle Themen können als Inhouse-Schulung gebucht werden. Dabei passen wir die Schwerpunkte individuell an Ihre branchenspezifischen Herausforderungen an.'
    },
    {
      category: 'corporate',
      question: 'Können die Seminarinhalte auf unsere unternehmenseigenen Tools/Prozesse zugeschnitten werden?',
      answer: 'Absolut. In einem Vorgespräch definieren wir Ihre Ziele, damit der Trainer Praxisbeispiele direkt aus Ihrem Arbeitsalltag integrieren kann.'
    },

    // Seminare & Events
    {
      category: 'seminare',
      question: 'Wie läuft ein Seminartag ab?',
      answer: 'Der genaue Ablauf hängt vom Format ab. Typischer Rhythmus: Ankommen & Ausrichtung (Präsenz öffnen), Praxisblöcke (geführt, klar strukturiert), Impulse & präzise Klärung, Integration (konkrete Alltags-Übersetzung). Pausen sind eingeplant. Details stehen in der Event-Info und in der Bestätigungsmail.'
    },
    {
      category: 'seminare',
      question: 'Welche Sprache wird gesprochen?',
      answer: 'Standard: Deutsch. Wenn einzelne Impulse auf Englisch vorkommen, werden sie verständlich eingeordnet. (Falls ein Event bilingual ist, steht es ausdrücklich dabei.)'
    },
    {
      category: 'seminare',
      question: 'Wo finden die Seminare statt?',
      answer: 'Die genauen Veranstaltungsorte werden bei jedem Event angegeben. Anreiseinfos erhältst du zusätzlich per E-Mail nach Buchung.'
    },
    {
      category: 'seminare',
      question: 'Gibt es eine Teilnahme online (Livestream/Replay)?',
      answer: 'Wenn verfügbar, steht es direkt beim Event. Hinweis: Die tiefste Wirkung entsteht in der Präsenz im Raum. Online ist eine Alternative, wenn Reise/Timing es erfordern.'
    },
    {
      category: 'seminare',
      question: 'Was soll ich mitbringen?',
      answer: 'Empfohlen: Bequeme Kleidung (Schichten), Notizbuch & Stift, Wasserflasche. Optional: leichte Decke / warme Socken. Alles Weitere ist vor Ort geklärt.'
    },
    {
      category: 'seminare',
      question: 'Gibt es Verpflegung vor Ort?',
      answer: 'Das hängt vom Veranstaltungsort ab und wird bei jedem Event angegeben (Getränke/Snacks/Mittag). Wenn du spezielle Anforderungen hast (Allergien/Unverträglichkeiten), melde dich kurz bei uns.'
    },
    {
      category: 'seminare',
      question: 'Ist die Verpflegung während des Seminartages inbegriffen?',
      answer: 'In der Tagungspauschale sind Kaffeepausen, Kaltgetränke und ein gemeinsames Mittagessen enthalten.'
    },
    {
      category: 'seminare',
      question: 'Werden Foto- oder Videoaufnahmen gemacht?',
      answer: 'Manchmal ja – ausschließlich für Dokumentation/Marketing und mit respektvollem Rahmen. Wenn du nicht sichtbar sein möchtest, sag uns bitte vorher kurz Bescheid; wir berücksichtigen das zuverlässig.'
    },
    {
      category: 'seminare',
      question: 'Ist der Veranstaltungsort barrierefrei?',
      answer: 'Bitte prüfe die Angaben beim jeweiligen Event. Bei Bedarf klären wir das gern konkret mit dir.'
    },

    // Organisation
    {
      category: 'organisation',
      question: 'Bis wann kann ich mich spätestens anmelden?',
      answer: 'Anmeldungen sind in der Regel bis 7 Tage vor Seminarbeginn möglich, sofern noch Plätze verfügbar sind.'
    },
    {
      category: 'organisation',
      question: 'Wie melde ich mich an?',
      answer: 'Über den Button „Ticket buchen" auf der Event-Seite. Nach erfolgreicher Buchung erhältst du automatisch: Bestätigungsmail, Ticket/Beleg und organisatorische Details (Zeiten, Ort, Hinweise).'
    },
    {
      category: 'organisation',
      question: 'Gibt es eine Warteliste, wenn das Seminar ausgebucht ist?',
      answer: 'Ja. Wenn ein Event ausgebucht ist, kannst du dich in die Warteliste eintragen. Sobald ein Platz frei wird, melden wir uns in Reihenfolge der Einträge.'
    },
    {
      category: 'organisation',
      question: 'Erhalte ich eine Rechnung?',
      answer: 'Ja, wenn du beim Checkout deine Rechnungsdaten angibst, erhältst du den Beleg automatisch. Wenn du nachträglich eine angepasste Rechnung brauchst (z. B. Firma), schreib uns mit: Buchungsnummer + korrekte Daten.'
    },
    {
      category: 'organisation',
      question: 'Unterstützen Sie bei der Hotelbuchung?',
      answer: 'Wir halten in den Seminartiteln oft begrenzte Abrufkontingente zu Sonderkonditionen für dich bereit. Gib dies einfach bei der Buchung an.'
    },
    {
      category: 'organisation',
      question: 'Kann ich den Trainer nach dem Seminar bei spezifischen Fragen kontaktieren?',
      answer: 'Ja, unsere Referenten stehen dir für eine vereinbarte Zeit nach dem Seminar via E-Mail für kurze Rückfragen zur Verfügung.'
    },
    {
      category: 'organisation',
      question: 'Wie erreiche ich euch bei Fragen?',
      answer: 'Schreibe eine E-Mail mit dem Betreff „Seminarfrage + [Eventname]". Antwortzeit: in der Regel innerhalb von 1–2 Werktagen.'
    },

    // Storno & Umbuchung
    {
      category: 'storno',
      question: 'Was passiert, wenn ich kurzfristig absagen muss?',
      answer: 'Eine Stornierung der Seminarteilnahme ist bis 14 Tage vor Beginn kostenfrei möglich. Danach fallen – sofern kein Ersatzteilnehmer benannt wird – gestaffelte Stornogebühren an: 13–8 Tage: 30%, 7–4 Tage: 50%, 3–2 Tage: 80%, ab 24 Stunden vor Beginn / Nichterscheinen: 100% der Seminar-/Ticketgebühr.'
    },
    {
      category: 'storno',
      question: 'Kann ich mein Ticket stornieren oder umbuchen?',
      answer: 'Kostenfreie Stornierung bis einschließlich 14 Tage vor Beginn. Danach (wenn kein Ersatzteilnehmer benannt wird): 13–8 Tage: 30%, 7–4 Tage: 50%, 3–2 Tage: 80%, ab 24 Stunden vor Beginn oder Nichterscheinen: 100% der Teilnahmegebühr. Alternativ kannst du jederzeit kostenfrei einen Ersatzteilnehmer benennen.'
    },
    {
      category: 'storno',
      question: 'Kann ich mein Ticket auf eine andere Person übertragen?',
      answer: 'Ja. Die Benennung eines Ersatzteilnehmers ist (insbesondere nach Ablauf der 14-Tage-Frist) kostenfrei möglich. Bitte sende Name + E-Mail der Ersatzperson rechtzeitig (empfohlen: spätestens 24 Stunden vor Beginn).'
    },
    {
      category: 'storno',
      question: 'Gilt die Storno-Regel auch für mein Hotel?',
      answer: 'Nein. Das Hotel wird eigenständig gebucht. Für Übernachtung/Verpflegung gelten ausschließlich die Storno- und Umbuchungsbedingungen des Hotels. Bitte wende dich dazu direkt an das Hotel.'
    },
    {
      category: 'storno',
      question: 'Ich kann doch nicht kommen – was ist die beste Option?',
      answer: 'Bis 14 Tage vor Beginn kannst du kostenfrei stornieren. Danach empfehlen wir in vielen Fällen die kostenfreie Benennung eines Ersatzteilnehmers, um Gebühren zu vermeiden.'
    },
    {
      category: 'storno',
      question: 'Wie benenne ich einen Ersatzteilnehmer?',
      answer: 'Per E-Mail mit Eventname, Buchungsnummer, Name und E-Mail-Adresse der Ersatzperson. Empfehlung: spätestens 24 Stunden vor Beginn.'
    },

    // Online-Kurse
    {
      category: 'kurse',
      question: 'Wann kann ich mit dem Kurs beginnen?',
      answer: 'Du kannst jederzeit mit dem Kurs starten, da alle Lektionen sofort nach der Buchung für dich freigeschaltet sind. Zusätzlich sind die Live-Sessions als Aufzeichnungen auf der Kursplattform verfügbar.'
    },
    {
      category: 'kurse',
      question: 'Wie lange habe ich Zugriff auf alle Kursinhalte / das Kurspaket?',
      answer: 'Du hast lebenslangen Zugriff auf diesen Kurs und dessen Inhalt.'
    },
    {
      category: 'kurse',
      question: 'Wie viel Zeit benötige ich für die Inhalte des Kurses?',
      answer: 'Wir empfehlen, wöchentlich zwei Lektionen zu absolvieren, die jeweils etwa eine Stunde in Anspruch nehmen. Da alle Kursinhalte von Beginn an verfügbar sind, kannst du den Kurs in deinem eigenen Tempo durchgehen. Es gibt keine festen Termine, sodass du die Zeit für den Kurs flexibel nach deinem eigenen Zeitplan gestalten kannst.'
    },
    {
      category: 'kurse',
      question: 'Kann ich ohne Meditationskenntnisse an diesem Kurs teilnehmen?',
      answer: 'Ja, absolut. Die Kurse sind so gestaltet, dass sie sowohl für Anfänger als auch für Fortgeschrittene geeignet sind. Du wirst Schritt für Schritt angeleitet.'
    }
  ];

  const filteredFAQs = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faq-schema', 'true');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-black to-orange-900/10" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.06) 0%, transparent 50%)',
            animation: 'pulse 8s ease-in-out infinite'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,146,60,0.1),transparent_70%)]" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10 relative group"
              style={{
                background: 'rgba(251, 146, 60, 0.05)',
                border: '1px solid rgba(251, 146, 60, 0.2)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(251, 146, 60, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 animate-pulse" />
              <HelpCircle className="w-5 h-5 text-amber-400 relative z-10" strokeWidth={2.5} />
              <span className="text-sm font-semibold text-amber-400 tracking-wide relative z-10">FAQ</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
              <span
                className="block text-white"
                style={{
                  textShadow: '0 0 80px rgba(251, 146, 60, 0.3)'
                }}
              >
                Häufig gestellte Fragen
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 mb-14 leading-relaxed max-w-3xl mx-auto font-light">
              Hier findest du Antworten auf alle wichtigen Fragen rund um Seminare, Coaching und unsere Angebote.
            </p>

            {/* Premium Search Bar */}
            <div className="max-w-2xl mx-auto mb-16">
              <div
                className={`relative group transition-all duration-500 ${
                  isSearchFocused ? 'scale-105' : 'scale-100'
                }`}
              >
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"
                  style={{
                    animation: isSearchFocused ? 'pulse 2s ease-in-out infinite' : 'none'
                  }}
                />
                <div
                  className="relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: isSearchFocused
                      ? '1px solid rgba(251, 146, 60, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    boxShadow: isSearchFocused
                      ? '0 20px 60px rgba(251, 146, 60, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Search
                    className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                      isSearchFocused ? 'text-amber-400' : 'text-gray-400'
                    }`}
                    strokeWidth={2.5}
                  />
                  <input
                    type="text"
                    placeholder="Durchsuche alle Fragen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full pl-14 pr-6 py-5 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg font-light"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ChevronDown className="w-5 h-5 rotate-45" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group relative overflow-hidden"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${idx * 0.05}s both`
                }}
              >
                <div
                  className={`relative px-6 py-3.5 rounded-2xl font-semibold transition-all duration-500 ${
                    isActive ? 'scale-105' : 'scale-100 hover:scale-105'
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`
                      : 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: isActive
                      ? '1px solid rgba(251, 146, 60, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: isActive
                      ? '0 8px 32px rgba(251, 146, 60, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      : '0 4px 16px rgba(0, 0, 0, 0.1)',
                    ...isActive && {
                      '--tw-gradient-from': category.gradient.includes('amber') ? '#f59e0b' : '#fb923c',
                      '--tw-gradient-to': category.gradient.includes('red') ? '#dc2626' : '#f97316'
                    } as any
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute inset-0 opacity-50"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                        animation: 'shimmer 2s infinite'
                      }}
                    />
                  )}
                  <div className="flex items-center gap-2.5 relative z-10">
                    <Icon
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? 'text-white' : category.color
                      }`}
                      strokeWidth={2.5}
                    />
                    <span className={isActive ? 'text-white' : 'text-gray-300'}>
                      {category.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {filteredFAQs.length === 0 ? (
          <div
            className="text-center py-24"
            style={{ animation: 'fadeIn 0.5s ease-out' }}
          >
            <div
              className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center relative"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Search className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">Keine Ergebnisse gefunden</h3>
            <p className="text-lg text-gray-400">Versuche es mit anderen Suchbegriffen oder wähle eine andere Kategorie.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => {
              const isExpanded = expandedId === `${item.category}-${index}`;
              const categoryInfo = categories.find(c => c.id === item.category);

              return (
                <div
                  key={`${item.category}-${index}`}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
                  }}
                >
                  <div
                    className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${
                      isExpanded ? 'scale-[1.02]' : 'scale-100'
                    }`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(20px)',
                      border: isExpanded
                        ? '1px solid rgba(251, 146, 60, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      boxShadow: isExpanded
                        ? '0 20px 60px rgba(251, 146, 60, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        : '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
                    }}
                  >
                    {isExpanded && (
                      <div
                        className="absolute inset-0 opacity-5"
                        style={{
                          background: `linear-gradient(135deg, ${categoryInfo?.gradient.includes('amber') ? '#f59e0b' : '#fb923c'}, ${categoryInfo?.gradient.includes('red') ? '#dc2626' : '#f97316'})`,
                          pointerEvents: 'none'
                        }}
                      />
                    )}

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : `${item.category}-${index}`)}
                      className="w-full px-7 py-6 text-left flex items-start gap-5 group/button"
                    >
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${categoryInfo?.gradient} flex items-center justify-center transition-all duration-500 ${
                          isExpanded ? 'scale-110 rotate-3' : 'scale-100 rotate-0 group-hover/button:scale-105'
                        }`}
                        style={{
                          boxShadow: isExpanded
                            ? '0 8px 24px rgba(251, 146, 60, 0.4)'
                            : '0 4px 16px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {categoryInfo && <categoryInfo.icon className="w-6 h-6 text-white" strokeWidth={2.5} />}
                      </div>

                      <div className="flex-1 min-w-0 pt-0.5">
                        <h3 className="text-xl font-bold text-white mb-0 pr-12 leading-tight group-hover/button:text-amber-400 transition-colors duration-300">
                          {item.question}
                        </h3>
                      </div>

                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isExpanded ? 'rotate-180 bg-amber-500/20' : 'rotate-0 bg-white/5 group-hover/button:bg-white/10'
                        }`}
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isExpanded ? 'text-amber-400' : 'text-gray-400 group-hover/button:text-white'
                          }`}
                          strokeWidth={2.5}
                        />
                      </div>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: isExpanded ? '1000px' : '0px',
                        opacity: isExpanded ? 1 : 0
                      }}
                    >
                      <div className="px-7 pb-7 pl-24">
                        <div
                          className="pt-5 border-t"
                          style={{
                            borderColor: 'rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <p className="text-gray-300 leading-relaxed text-lg font-light">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pb-32">
        <div
          className="relative overflow-hidden rounded-[32px] group"
          style={{
            background: 'rgba(251, 146, 60, 0.03)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(251, 146, 60, 0.2)',
            boxShadow: '0 20px 80px rgba(251, 146, 60, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)',
              animation: 'pulse 4s ease-in-out infinite'
            }}
          />

          <div className="relative px-8 py-16 sm:px-12 sm:py-20 text-center">
            <div
              className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"
              style={{
                boxShadow: '0 12px 40px rgba(251, 146, 60, 0.4)',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              <Zap className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Noch Fragen?
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Wir sind für dich da und beantworten gerne alle deine Fragen persönlich.
            </p>

            <a
              href="#kontakt"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg group/cta relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #fb923c)',
                boxShadow: '0 12px 40px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(251, 146, 60, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shimmer 2s infinite'
                }}
              />
              <Mail className="w-6 h-6 text-white relative z-10" strokeWidth={2.5} />
              <span className="text-white relative z-10">Jetzt Kontakt aufnehmen</span>
              <ArrowRight className="w-5 h-5 text-white relative z-10 group-hover/cta:translate-x-1 transition-transform" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
