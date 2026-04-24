/** Single source for FAQ hub page content + JSON-LD mainEntity. */
export interface MainFaqHubItem {
  category: string;
  question: string;
  answer: string;
}

export const MAIN_FAQ_HUB_ITEMS: MainFaqHubItem[] = [
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

/** FAQ hub listing URLs only (not /faq/:slug detail pages). */
export function isMainFaqHubPath(pathname: string): boolean {
  const p = (pathname || '').replace(/\/+$/, '') || '/';
  return p === '/faq' || p === '/en/faq' || p === '/ru/faq';
}
