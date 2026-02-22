/*
  # Populate Initial Seminars Data

  ## Beschreibung
    Fügt alle initialen Seminar-Daten in die Datenbank ein
    - 10 Seminare über alle Formate (Präsenz, Online-Live, Webinar, On-Demand, Hybrid)
    - Alle mit vollständigen Daten: Termine, Preise, Module, Transformationen, etc.

  ## Wichtig
    - Verwendet INSERT mit ON CONFLICT DO NOTHING um Duplikate zu vermeiden
    - Alle Daten sind produktionsbereit
*/

-- Seminare einfügen (nur wenn sie noch nicht existieren)
INSERT INTO seminars (id, format, title, subtitle, tagline, duration, price, capacity, dates, description, essence, includes, transformationen, module, gradient, image, is_active, order_index)
VALUES
  -- Neues Bewusstsein (Präsenz)
  (
    'bewusstsein-praesenz',
    'praesenz',
    'Neues Bewusstsein',
    'Die Transformation des Seins',
    'Vom Denken zur Wahrheit',
    '3 Tage Intensiv',
    '€2.997',
    '20 Teilnehmer',
    '[
      {"month": "März", "days": "14-16", "year": "2025", "location": "Berlin", "available": 8},
      {"month": "Juni", "days": "20-22", "year": "2025", "location": "München", "available": 12},
      {"month": "Sept", "days": "12-14", "year": "2025", "location": "Zürich", "available": 15}
    ]'::jsonb,
    'Eine tiefgreifende Reise zur Erkenntnis deiner wahren Natur. Von der Identifikation mit Gedanken zur reinen Bewusstheit. Die Befreiung vom denkenden Geist in die Dimension des Seins.',
    'Die Wahrheit kann nicht gedacht werden. Sie kann nur spürbar erlebt werden.',
    '["Intensive Präsenz-Sessions mit Anatoly Mook", "Geführte Meditationen & Kontemplationen", "Persönliche Transformation durch direkten Kontakt", "Exklusives Seminarhandbuch", "Lebenslanger Zugang zur Online-Bibliothek", "Teilnehmer-Zertifikat"]'::jsonb,
    '[
      {"von": "Denken", "zu": "Fühlen"},
      {"von": "Konditionierung", "zu": "Bewusstheit"},
      {"von": "Ansichten", "zu": "Wahrheit"},
      {"von": "Zeit", "zu": "Achtsamkeit"}
    ]'::jsonb,
    '[
      {"tag": "Tag 1", "title": "Befreiung vom Denken", "content": "Erkenntnis: Du bist nicht der denkende Geist. Lösung von Identifikation. Zugang zum Raum des Bewusstseins."},
      {"tag": "Tag 2", "title": "Gegenwärtigkeit & Präsenz", "content": "Der einzig wahre Zeitpunkt: JETZT. Achtsame Wahrnehmung ohne Interpretation. Befreiung von psychologischer Zeit."},
      {"tag": "Tag 3", "title": "Leben als Bewusstsein", "content": "Integration ins Leben. Rechtes Handeln aus der Stille. Verbindung mit universeller Intelligenz."}
    ]'::jsonb,
    'from-amber-500/10 via-orange-500/5 to-yellow-500/5',
    'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920',
    true,
    1
  ),

  -- Mensch 2.0 (Präsenz)
  (
    'mensch-20-praesenz',
    'praesenz',
    'Mensch 2.0',
    'Spirituelles Erwachen',
    'Heute ist der erste Tag deines neuen Lebens',
    '5 Tage Retreat',
    '€4.997',
    '16 Teilnehmer',
    '[
      {"month": "Mai", "days": "1-5", "year": "2025", "location": "Schwarzwald", "available": 5},
      {"month": "Aug", "days": "7-11", "year": "2025", "location": "Alpen", "available": 9},
      {"month": "Nov", "days": "6-10", "year": "2025", "location": "Toskana", "available": 11}
    ]'::jsonb,
    'Zeit, Angst und Ego verlieren ihre Macht. Von der Raupe zum Schmetterling. Transzendenz auf das nächsthöhere Level des einen ewigen Seins. Spirituelles Erwachen und seelische Erleuchtung.',
    'Du bist nun reif. Du bist jetzt bereit. Das neue höchstbewusste Ich erscheint – jetzt.',
    '["5 Tage intensive Retreat-Erfahrung", "Luxus-Unterkunft mit Vollpension", "Tägliche Sessions mit Anatoly Mook", "Einzelgespräche & Gruppenarbeit", "Naturverbundene Übungen & Stille-Phasen", "Premium-Kursmaterialien & Aufzeichnungen"]'::jsonb,
    '[
      {"von": "Getrenntheit", "zu": "Einheit"},
      {"von": "Begrenzung", "zu": "Freiheit"},
      {"von": "Existieren", "zu": "Sein"},
      {"von": "Suchen", "zu": "Finden"}
    ]'::jsonb,
    '[
      {"tag": "Tag 1-2", "title": "Ego-Auflösung", "content": "Verleugne dich selbst. Löse Konditionierungen auf. Befreiung von alten Mustern und Identitäten."},
      {"tag": "Tag 3", "title": "Wahre Liebe", "content": "Einbeziehend, einvernehmlich, einfühlend. Ausstrahlung reinen Friedens. Freude des Beisammenseins."},
      {"tag": "Tag 4-5", "title": "Höchstes Bewusstsein", "content": "Du bist das Licht der Welt. Kreativ schöpferische Kraft. Ausstrahlung der Schöpfung leben."}
    ]'::jsonb,
    'from-rose-500/10 via-orange-500/5 to-amber-500/5',
    'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1920',
    true,
    2
  ),

  -- Spirituelle Führung (Präsenz)
  (
    'leadership-praesenz',
    'praesenz',
    'Spirituelle Führung',
    'Management & Bewusstheit',
    'Lasse los, was du nicht bist – damit erscheint, wer du bist',
    '3 Tage Executive',
    '€3.997',
    '15 Teilnehmer',
    '[
      {"month": "April", "days": "24-26", "year": "2025", "location": "München", "available": 7},
      {"month": "Juli", "days": "9-11", "year": "2025", "location": "Zürich", "available": 10},
      {"month": "Okt", "days": "23-25", "year": "2025", "location": "Wien", "available": 13}
    ]'::jsonb,
    'Bewusstheit als Kompass, Intuition als Werkzeug, Präsenz als Kraftquelle. Führung aus der tiefen Dimension – im Verbund mit universeller Intelligenz. Reine Weisheit und grenzenlose Kreativität.',
    'Rechtes Handeln geschieht durch dich, wenn du dem großen Ganzen dienst.',
    '["Exklusives Executive-Format", "Business-Cases aus bewusster Perspektive", "Networking mit bewussten Führungskräften", "Persönliches Leadership-Audit", "3-Monats-Follow-up-Programm", "Premium-Lounge & Verpflegung"]'::jsonb,
    '[
      {"von": "Ego-Denken", "zu": "Bewusstheit"},
      {"von": "Arbeiten", "zu": "Beitragen"},
      {"von": "Selbstbezogen", "zu": "Einbeziehend"},
      {"von": "Kontrolle", "zu": "Hingabe"}
    ]'::jsonb,
    '[
      {"tag": "Tag 1", "title": "Bewusste Führung", "content": "Spirituelle Kraft und Vertrauen entwickeln. Aufmerksamkeit als Aktivator. Einklang mit dem Leben."},
      {"tag": "Tag 2", "title": "Intuitive Präzision", "content": "Entscheidungen aus der Stille. Wie Vergrößerungsglas Sonnenlicht zum Feuer führt."},
      {"tag": "Tag 3", "title": "Rechtes Handeln", "content": "Im Einklang mit dem Leben. Deine Hände sind Hände der Ursprungsquelle. Diene dem Ganzen."}
    ]'::jsonb,
    'from-emerald-500/10 via-teal-500/5 to-cyan-500/5',
    'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1920',
    true,
    3
  ),

  -- Innere Klarheit Online (Online-Live)
  (
    'klarheit-online',
    'online-live',
    'Innere Klarheit Online',
    'Höchstleistung durch Präsenz',
    'Ich bin die Antwort',
    '2 Tage Live-Online',
    '€1.497',
    'Unbegrenzt',
    '[
      {"month": "April", "days": "11-12", "year": "2025", "location": "Online via Zoom", "available": 999},
      {"month": "Juli", "days": "16-17", "year": "2025", "location": "Online via Zoom", "available": 999},
      {"month": "Okt", "days": "9-10", "year": "2025", "location": "Online via Zoom", "available": 999}
    ]'::jsonb,
    'Fokus, Stabilität und Spitzenentscheidungen aus dem Raum der Stille. Die Kraft der Gegenwart für höchste Leistungsfähigkeit. Du bist die Lebensenergie der Ursprungsquelle.',
    'Wenn ich sage ich – meine ich uns alle. Das einzig wahre ICHBIN – das sind wir alle.',
    '["Live-Streaming in HD-Qualität", "Interaktive Q&A-Sessions", "Breakout-Rooms für Gruppenübungen", "Zugang zur Aufzeichnung (30 Tage)", "Digitales Workbook & Ressourcen", "Online-Community-Zugang"]'::jsonb,
    '[
      {"von": "Widerstand", "zu": "Hingabe"},
      {"von": "Kontrolle", "zu": "Vertrauen"},
      {"von": "Stress", "zu": "Frieden"},
      {"von": "Reaktion", "zu": "Präsenz"}
    ]'::jsonb,
    '[
      {"tag": "Tag 1", "title": "Höchste Leistungsfähigkeit", "content": "Rechtes Handeln aus der Stille. Im Verbund mit universeller Intelligenz. Dein Energiefeld aktivieren."},
      {"tag": "Tag 2", "title": "Innerer Körper & Energie", "content": "Zugang zur Quelle: Wahre Lebensenergie. 30 Meter Magnetfeld. Grenzenlose Kreativität entfalten."}
    ]'::jsonb,
    'from-cyan-500/10 via-sky-500/5 to-blue-500/5',
    'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1920',
    true,
    4
  ),

  -- Hingabe & Wandlung Online (Online-Live)
  (
    'transformation-online',
    'online-live',
    'Hingabe & Wandlung Online',
    'Vom Widerstand zum Flow',
    'Lebe jetzt dein Dann – dann löst sich das Wenn',
    '4 Wochen Live-Kurs',
    '€997',
    'Unbegrenzt',
    '[
      {"month": "März", "days": "Start 10.", "year": "2025", "location": "Online via Zoom", "available": 999},
      {"month": "Juni", "days": "Start 2.", "year": "2025", "location": "Online via Zoom", "available": 999},
      {"month": "Sept", "days": "Start 8.", "year": "2025", "location": "Online via Zoom", "available": 999}
    ]'::jsonb,
    'Blockaden lösen und in harmonischen Flow eintreten. Die Kraft der Hingabe: Akzeptieren, Zulassen, Erlauben. Der alchemistische Wandlungsprozess, der Wunder geschehen lässt.',
    'Hingabe ist der alchemistische Wandlungsprozess, der Wunder geschehen lässt.',
    '["8 Live-Sessions über 4 Wochen", "Wöchentliche Hausaufgaben & Übungen", "Private Telegram/Slack-Gruppe", "Alle Aufzeichnungen lebenslang", "Bonus: 12 geführte Meditationen", "Persönliches Abschluss-Zertifikat"]'::jsonb,
    '[
      {"von": "Urteilen", "zu": "Akzeptanz"},
      {"von": "Verlangen", "zu": "Geben"},
      {"von": "Angst", "zu": "Liebe"},
      {"von": "Widerstand", "zu": "Flow"}
    ]'::jsonb,
    '[
      {"tag": "Woche 1-2", "title": "Kraft der Hingabe", "content": "Zulassen, erlauben, beselen. Transparent werden. Befreiung von Urteilen und Widerstand."},
      {"tag": "Woche 3-4", "title": "Alchemie des Wandels", "content": "Friedlicher Raum für Verwandlung. Leben spielt dir zu. Neue Wege erschaffen."}
    ]'::jsonb,
    'from-orange-500/10 via-amber-500/5 to-yellow-500/5',
    'https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&w=1920',
    true,
    5
  ),

  -- Die Kraft des JETZT (Webinar)
  (
    'webinar-jetzt',
    'webinar',
    'Die Kraft des JETZT',
    'Einführungs-Webinar',
    'Dein Leben verändert sich – jetzt',
    '90 Minuten',
    '€97',
    'Unbegrenzt',
    '[
      {"month": "Jeden", "days": "Dienstag 19:00", "year": "2025", "location": "Online", "available": 999},
      {"month": "Jeden", "days": "Donnerstag 19:00", "year": "2025", "location": "Online", "available": 999}
    ]'::jsonb,
    'Einführung in die Kraft der Gegenwärtigkeit. Lerne die Grundprinzipien bewussten Lebens. Erfahre, wie du sofort Frieden und Klarheit in dein Leben bringst.',
    'Es gibt nur diesen einen Moment. Alles andere ist Illusion.',
    '["Live-Webinar mit Anatoly Mook", "Interaktive Meditation", "Q&A-Session am Ende", "Download der Aufzeichnung (7 Tage)", "PDF-Zusammenfassung", "Bonus: Meditations-Audio"]'::jsonb,
    '[
      {"von": "Vergangenheit", "zu": "Gegenwart"},
      {"von": "Sorgen", "zu": "Klarheit"}
    ]'::jsonb,
    '[
      {"tag": "Teil 1", "title": "Was ist JETZT", "content": "Verstehen der zeitlosen Dimension. Befreiung von psychologischer Zeit."},
      {"tag": "Teil 2", "title": "Praktische Anwendung", "content": "Sofort umsetzbare Techniken für den Alltag. Leben in der Präsenz."}
    ]'::jsonb,
    'from-yellow-500/10 via-amber-500/5 to-orange-500/5',
    'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1920',
    true,
    6
  ),

  -- Ego & Befreiung (Webinar)
  (
    'webinar-ego',
    'webinar',
    'Ego & Befreiung',
    'Meister-Webinar',
    'Erkenne was du nicht bist',
    '2 Stunden',
    '€147',
    'Unbegrenzt',
    '[
      {"month": "Erster", "days": "Montag im Monat", "year": "2025", "location": "Online", "available": 999}
    ]'::jsonb,
    'Tiefgreifende Betrachtung des Ego-Konzepts. Wie Identifikation Leiden erschafft. Der Weg zur Befreiung durch Nicht-Identifikation.',
    'Du bist nicht der Denkende. Du bist das Bewusstsein hinter den Gedanken.',
    '["Tiefgehende Lehrsession", "Live-Demonstration der Ego-Auflösung", "Exklusive Übungsanleitungen", "Aufzeichnung 14 Tage verfügbar", "Begleit-PDF mit Vertiefung", "Follow-up-Email-Serie"]'::jsonb,
    '[
      {"von": "Identifikation", "zu": "Freiheit"},
      {"von": "Ego", "zu": "Sein"}
    ]'::jsonb,
    '[
      {"tag": "Teil 1", "title": "Anatomie des Ego", "content": "Was ist das Ego? Wie funktioniert Identifikation? Warum leiden wir?"},
      {"tag": "Teil 2", "title": "Der Weg zur Freiheit", "content": "Nicht-Identifikation praktizieren. Leben als Bewusstsein. Frieden finden."}
    ]'::jsonb,
    'from-amber-500/10 via-orange-500/5 to-rose-500/5',
    'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1920',
    true,
    7
  ),

  -- Das Fundament (On-Demand)
  (
    'ondemand-fundament',
    'on-demand',
    'Das Fundament',
    'Grundlagen-Videokurs',
    'Alles was du wissen musst',
    '12 Module • 8 Stunden',
    '€497',
    'Unbegrenzt',
    '[
      {"month": "Sofort", "days": "verfügbar", "year": "2025", "location": "Jederzeit", "available": 999}
    ]'::jsonb,
    'Umfassender Selbstlern-Kurs mit allen Grundlagen spiritueller Bewusstheit. In deinem Tempo, wann und wo du willst. Lebenslanger Zugang.',
    'Der Weg beginnt mit dem ersten Schritt – mach ihn jetzt.',
    '["12 Video-Module in HD", "Über 8 Stunden Premium-Content", "Downloadbare Audio-Versionen", "Umfangreiches Workbook (150+ Seiten)", "24 geführte Meditationen", "Lebenslanger Zugang & Updates"]'::jsonb,
    '[
      {"von": "Unwissenheit", "zu": "Verständnis"},
      {"von": "Chaos", "zu": "Struktur"},
      {"von": "Suchen", "zu": "Wissen"},
      {"von": "Theorie", "zu": "Praxis"}
    ]'::jsonb,
    '[
      {"tag": "Module 1-4", "title": "Fundamentale Prinzipien", "content": "Bewusstsein, Ego, Zeit, Denken – die vier Säulen des Verstehens."},
      {"tag": "Module 5-8", "title": "Praktische Anwendung", "content": "Meditation, Achtsamkeit, Hingabe – leben in der Präsenz."},
      {"tag": "Module 9-12", "title": "Meisterschaft", "content": "Integration, Ausstrahlung, Sein – das erwachte Leben."}
    ]'::jsonb,
    'from-sky-500/10 via-cyan-500/5 to-teal-500/5',
    'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1920',
    true,
    8
  ),

  -- Bewusstseins-Meisterklasse (On-Demand)
  (
    'ondemand-meisterklasse',
    'on-demand',
    'Bewusstseins-Meisterklasse',
    'Advanced Videokurs',
    'Für die, die tiefer gehen wollen',
    '20 Module • 15 Stunden',
    '€997',
    'Unbegrenzt',
    '[
      {"month": "Sofort", "days": "verfügbar", "year": "2025", "location": "Jederzeit", "available": 999}
    ]'::jsonb,
    'Fortgeschrittener Kurs für ernsthafte Praktizierende. Tiefste Lehren, komplexe Konzepte, höchste Erkenntnisse. Für die, die bereit sind.',
    'Spirituelles Erwachen ist kein Konzept. Es ist eine lebendige Wirklichkeit.',
    '["20 ausführliche Video-Module", "Über 15 Stunden Tiefenlehre", "Exklusive unveröffentlichte Sessions", "Premium-Workbook (300+ Seiten)", "Bonus: 50 geführte Meditationen", "Privater Mitglieder-Bereich"]'::jsonb,
    '[
      {"von": "Anfänger", "zu": "Fortgeschritten"},
      {"von": "Verstehen", "zu": "Verkörpern"},
      {"von": "Wissen", "zu": "Sein"},
      {"von": "Schüler", "zu": "Meister"}
    ]'::jsonb,
    '[
      {"tag": "Module 1-7", "title": "Erweiterte Konzepte", "content": "Formlose Dimension, Schmerzkkörper, Energiefeld, kollektives Bewusstsein."},
      {"tag": "Module 8-14", "title": "Transformation", "content": "Ego-Auflösung, spirituelles Erwachen, Erleuchtung, Leben als Meister."},
      {"tag": "Module 15-20", "title": "Lehren & Wirken", "content": "Bewusstheit ausstrahlen, anderen dienen, die Welt transformieren."}
    ]'::jsonb,
    'from-amber-500/10 via-orange-500/5 to-rose-500/5',
    'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&w=1920',
    true,
    9
  ),

  -- Bewusstseins-Immersion (Hybrid)
  (
    'hybrid-immersion',
    'hybrid',
    'Bewusstseins-Immersion',
    'Hybrid-Intensiv-Programm',
    'Das Beste aus beiden Welten',
    '6 Wochen Hybrid',
    '€3.497',
    '30 Teilnehmer',
    '[
      {"month": "Mai", "days": "Start 5.", "year": "2025", "location": "Online + Berlin", "available": 18},
      {"month": "Sept", "days": "Start 1.", "year": "2025", "location": "Online + München", "available": 22}
    ]'::jsonb,
    'Einzigartiges Hybrid-Format: 4 Wochen Online-Sessions kombiniert mit 2 Tagen Präsenz-Intensiv. Die perfekte Verbindung von Flexibilität und direkter Erfahrung.',
    'Transformation kennt keine Grenzen – weder räumlich noch zeitlich.',
    '["12 Live-Online-Sessions über 4 Wochen", "2 Tage Präsenz-Intensiv am Ende", "Persönliche Betreuung hybrid", "Alle Aufzeichnungen lebenslang", "Premium-Kursmaterialien physisch & digital", "VIP-Networking-Event"]'::jsonb,
    '[
      {"von": "Digital", "zu": "Real"},
      {"von": "Flexibel", "zu": "Intensiv"},
      {"von": "Lernen", "zu": "Erleben"},
      {"von": "Allein", "zu": "Gemeinschaft"}
    ]'::jsonb,
    '[
      {"tag": "Woche 1-4", "title": "Online-Phase", "content": "12 Live-Sessions mit Theorie, Übungen, Meditation. Wöchentliche Hausaufgaben."},
      {"tag": "Wochenende", "title": "Präsenz-Intensiv", "content": "2 Tage mit Anatoly Mook persönlich. Integration, Vertiefung, Gemeinschaft."}
    ]'::jsonb,
    'from-rose-500/10 via-amber-500/5 to-orange-500/5',
    'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=1920',
    true,
    10
  )
ON CONFLICT (id) DO NOTHING;
