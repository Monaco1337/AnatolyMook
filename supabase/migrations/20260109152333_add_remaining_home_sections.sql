/*
  # Add Remaining Home Content Sections
  
  ## Sections Added:
  1. life_areas - 7 Lebensbereiche slider
  2. private_navigator - 5 customer profiles
  3. business_navigator - 5 business contexts  
  4. formats_portfolio - 5 format types
  5. finale - Final section with accordions
*/

-- LIFE AREAS (7 Slides)
INSERT INTO home_content (section, content, display_order, is_active) VALUES
('life_areas', '{
  "de": {
    "headline": "Hier wird Tiefe zur Realität.",
    "subline": "Wir übersetzen Einsicht in gelebte Stabilität und verankern deine neue Ausrichtung in den Fundamenten deines Lebens.",
    "areas": [
      {
        "title": "VITALITÄT ALS BASIS",
        "approach": "Wenn die Physis schwankt, sinkt die Bewusstseins-Frequenz. Schlaf, Rhythmus und Fokus leiden – und damit die Qualität deiner Entscheidungen.",
        "transformation": "Anatoly strukturiert Energiehaushalt und Selbstführung so, dass Vitalität kein Zufall, sondern eine stabile Ressource ist.",
        "result": "Verfügbare Kraft. Wachheit. Eine klare Tagesstruktur und eine Umsetzungskraft, die neue Maßstäbe setzt."
      },
      {
        "title": "BEZIEHUNG ALS KRAFTQUELLE",
        "approach": "Wiederkehrende Konflikte entstehen selten aus mangelnder Liebe, sondern aus unscharfer Innenführung, fehlenden Grenzen und alten Mustern.",
        "transformation": "Wir klären Beziehungen im Kern. Durch präzise Sprache, Auflösung von Triggern und reife Präsenz.",
        "result": "Begegnung statt Verstrickung. Weniger Reibung, mehr echte Nähe. Das Miteinander wird zur Kraftquelle für persönliche Entfaltung und Erfolg."
      },
      {
        "title": "ERFOLG ALS AUSDRUCK",
        "approach": "Wenn die Leistung stimmt, aber Sinn und Erfüllung fehlen, mangelt es an innerer Kongruenz. Erfolg wird anstrengend.",
        "transformation": "Wir synchronisieren deine Ambition mit deiner inneren Wahrheit. Prioritäten werden glasklar, Handlungen konsequent.",
        "result": "Erfolg ohne Verschleiß. Dein Außen wird zum natürlichen Spiegel deiner inneren Souveränität."
      },
      {
        "title": "WANDLUNG & ORDNUNG",
        "approach": "Echte Transformation ist kein bloßes Verbessern, sondern eine radikale Neuordnung widerstreitender Kräfte.",
        "transformation": "Wir beenden den inneren Widerstreit. Aus Reibung wird Synergie. Aus Unruhe wird stabile Struktur.",
        "result": "Du gewinnst Zugriff auf deine volle Energie zurück. Glasklare Entscheidungen und mühelose Wirksamkeit im Außen."
      },
      {
        "title": "PRÄSENZ & FÜHRUNG",
        "approach": "Wenn Aufmerksamkeit zerstreut ist, verlieren selbst die besten Strategien ihre Kraft.",
        "transformation": "Attention Mastery: Wir bündeln deine Wahrnehmung. Präsenz heißt hier: klarsehen, bewusst wählen, konsequent agieren – auch unter Druck.",
        "result": "Spürbare Ruhe. Souveränes Auftreten. Ein Weg, der nicht mehr getrieben, sondern fokussiert und stimmig verläuft."
      },
      {
        "title": "ESSENZ & HEIMAT",
        "approach": "Solange Wahrheit nur ein mentales Konzept bleibt, holt dich der Alltag immer wieder ein.",
        "transformation": "Wir führen Stille präzise, bis Klarheit nicht mehr nur gedacht, sondern als Zustand erfahren und verinnerlicht wird.",
        "result": "Tiefer Frieden als Basis. Geklärte Beziehungen. Eine natürliche Autorität, die entspannt deiner wahren Identität entspringt."
      },
      {
        "title": "FREIHEIT ALS ZUSTAND",
        "approach": "Wahre Freiheit ist unabhängig von äußeren Umständen. Sie entsteht durch absolute Selbstautorität.",
        "transformation": "Sicherheit wird hier nicht mehr gesucht, sondern ist dein Standard. Dadurch verliert das Außen seine Schwere.",
        "result": "Tiefe Erfüllung. Echte Wahlfreiheit. Eine Lebendigkeit, die sich nicht mehr bremsen lässt."
      }
    ]
  }
}'::jsonb, 13, true),

-- PRIVATE NAVIGATOR (5 Profiles)
('private_navigator', '{
  "de": {
    "headline": "Wähle deinen Einstieg",
    "subline": "der deiner aktuellen Lebensphase und deinen Zielen entspricht. Maßgeschneiderte Formate für spezifische Herausforderungen.",
    "profiles": [
      {
        "id": "life-mastery",
        "title": "LIFE MASTERY (Junge Generation)",
        "resonance": "Du hast viele Optionen, spürst aber keinen inneren Kurs, der wirklich trägt? Du optimierst dich ständig, doch das Gefühl von Ankommen bleibt aus? Der Druck steigt, die Richtung fehlt.",
        "approach": "Life-Mastery Coaching & Potenzial-Alignment. Wir beenden das wahllose Probieren. Anatoly bündelt deine Aufmerksamkeit (Attention Mastery) und richtet dein Talent auf ein klares Ziel aus.",
        "format": "1:1 Intensiv-Coaching oder Live-Seminare.",
        "result": "Klarheit statt Grübeln. Vitalität als Fundament. Du gestaltest stimmige Karriere-Schritte und führst Beziehungen bewusst, statt dich treiben zu lassen."
      },
      {
        "id": "next-level",
        "title": "NEXT LEVEL MINDSET (Erfolgsorientierte Transformer)",
        "resonance": "Die Leistung stimmt, aber Sinn und innere Ruhe sind nicht stabil verfügbar? Du gewinnst im Außen, zahlst aber innerlich einen hohen Preis durch Stress oder Leere?",
        "approach": "High-Performance Coaching & Identitäts-Reset. Wir entkoppeln Erfolg von Verschleiß. Anatoly initiiert eine Ressourcen-Strategie und ein Mindset-Upgrade, das Leistung aus Fülle statt aus Mangel generiert.",
        "format": "Exklusives 1:1 Mentoring.",
        "result": "Entscheidungsstärke aus der Ruhe. Wachstum ohne Ausbrennen. Stimmiger Wohlstand und präsente Führungskraft – im Business wie im Privatleben."
      },
      {
        "id": "strahlkraft",
        "title": "STRAHLKRAFT & WIR (Frauen Special)",
        "resonance": "Du sehnst dich nach Nähe ohne Drama und Liebe ohne Selbstverlust? Du möchtest Grenzen wahren, ohne hart zu werden, und eine Verbindung leben, die dich nährt?",
        "approach": "Beziehungs- & Präsenz-Training. Wir lösen wiederkehrende Konfliktmuster auf und verankern ein tiefes WIR-Bewusstsein. Du verinnerlichst Selbstwert und klare Kommunikation.",
        "format": "Themen-Special, 1:1 oder Live-Integration.",
        "result": "Liebe als stabile Basis. Weniger Reibung, mehr Frieden. Du entwickelst eine Strahlkraft durch Echtheit und erlebst sichere Bindung bei voller Autonomie."
      },
      {
        "id": "vitalitaet",
        "title": "VITALITÄT (Lebenserfahrene & Best Ager)",
        "resonance": "Der Ruf nach einem Neustart ist da, aber der Körper sendet Stop-Signale? Du willst das nächste Kapitel bewusst gestalten, statt nur den Ruhestand zu verwalten?",
        "approach": "Vitalitäts-Programme & Neuorientierung. Wir ordnen deinen Lebensrhythmus und aktivieren frische Ressourcen – sanft und präzise. Attention Mastery hilft dir, den Fokus neu auszurichten.",
        "format": "Sanfte Begleitung, Audio-Impulse & Strategie-Gespräche.",
        "result": "Spürbare Vitalität und ein klarer Plan für die Zukunft. Du gewinnst Sicherheit von innen und genießt Freiheit mit einer Struktur, die dich lebendig hält."
      },
      {
        "id": "essenz",
        "title": "ESSENZ (Spirituell Reife)",
        "resonance": "Du kennst spirituelle Konzepte, bist aber müde vom Suchen? Du willst weniger Wissen anhäufen und mehr Wahrheit als direkte, stabile Erfahrung leben?",
        "approach": "Deep-Dive Lehre & Weisheitsarbeit. Wir verlassen die mentale Ebene. Anatoly führt dich durch präzise Bewusstheitslehre in die direkte Erfahrung der Stille – jenseits von Konzepten.",
        "format": "Retreats, Academy & Vertiefungs-Seminare.",
        "result": "Tiefer Frieden als Dauerzustand. Glasklare Wahrnehmung. Deine Wirksamkeit wird natürlich und mühelos, getragen von einer inneren Stille, die bleibt."
      }
    ]
  }
}'::jsonb, 14, true),

-- BUSINESS NAVIGATOR (5 Contexts)
('business_navigator', '{
  "de": {
    "headline": "Führung aus Präsenz",
    "lead": "Wahre Führung beginnt im Bewusstsein. Anatoly synchronisiert Bewusstseinsarchitektur mit unternehmerischer Realität. Wir initiieren einen Raum, in dem Führung nicht aus Druck reagiert, sondern aus wacher Wahrnehmung agiert. Das Ergebnis ist Ordnung: fokussierte Energie, klare Orientierung und tragfähige Handlungsfähigkeit.",
    "contexts": [
      {
        "id": "unternehmen",
        "title": "UNTERNEHMEN & ORGANISATIONEN (Kultur & Performance)",
        "resonance": "Die Leistung ist hoch – doch im System herrschen Reibung, Druck oder diffuse Verantwortlichkeiten? Kompetenz ist vorhanden, doch Energie versickert in ineffizienten Schleifen?",
        "approach": "Kultur-Prozess & Kontext-Workshops. Wir etablieren klare Verantwortungsräume und einen sauberen Entscheidungsrhythmus. Anatoly klärt die Kommunikation und reguliert das kollektive Stresslevel.",
        "format": "Inhouse-Workshops, Prozessbegleitung.",
        "result": "Synergie statt Reibung. Schlankere Abläufe durch klare Zuordnung. Die Umsetzung erfolgt stabil und kraftvoll – wirtschaftlich erfolgreich, menschlich gesund."
      },
      {
        "id": "selbststaendige",
        "title": "SELBSTSTÄNDIGE & UNTERNEHMER (Durchbruch & Fokus)",
        "resonance": "Maximaler Einsatz – aber zu viele Fronten gleichzeitig? Du spürst eine innere Zerstreuung oder ein permanentes Anziehen im System, das dich ermüdet?",
        "approach": "Fokus-Setup & Flow-Mentoring. Die Engstelle ist selten das Know-how, sondern innere Unschärfe. Wir lösen hinderliche Muster, schärfen die Ausrichtung und übersetzen Druck in tragfähige Energie.",
        "format": "1:1 Strategie-Sparring & Mindset-Training.",
        "result": "Mehr Fokus, weniger Energieverlust. Deine Entscheidungen werden ruhiger, die Umsetzung präziser. Ziele werden wieder steuerbar, der Fortschritt spürbar."
      },
      {
        "id": "manager-ceo",
        "title": "MANAGER & CEOS (Souveränität & Verantwortung)",
        "resonance": "Du trägst maximale Verantwortung – und wünschst dir wieder echte Steuerung statt ständiger Reaktivität? In Turbulenzen droht der Blick für das Wesentliche zu verengen?",
        "approach": "Executive Coaching & Leadership-Programm. Wir kalibrieren deine Entscheidungsfähigkeit neu. Du integrierst Verantwortung, ohne dich von ihr erdrücken zu lassen, und führst aus Präsenz statt aus Druck.",
        "format": "Exklusives 1:1 Coaching & Sparring.",
        "result": "Ruhige Souveränität an der Spitze. Deine Kommunikation setzt Richtung und entlädt Konflikte. Präzise Entscheidungen sichern den Kurs."
      },
      {
        "id": "fuehrungskraefte",
        "title": "FÜHRUNGSKRÄFTE (Innere Autorität)",
        "resonance": "Du funktionierst in deiner Rolle – wünschst dir aber mehr natürliche Autorität und Klarheit im Führungsalltag? Dein Team soll dir folgen, nicht nur deiner Position?",
        "approach": "Leadership-Training & Management-Qualifizierung. Teams folgen keinem Titel, sondern einem Zustand. Wir trainieren Präsenz, Haltung und eine Kommunikation, die bindet und orientiert.",
        "format": "Training & Praxistransfer.",
        "result": "Hohes Vertrauen und klare Orientierung. Weniger Reibungsverluste im Team. Deine Führung wird verbindlich und klar – ohne inneren Kraftverlust."
      },
      {
        "id": "teams",
        "title": "TEAMS (Synergie & Flow)",
        "resonance": "Die Leistung ist da – doch Spannungen, Missverständnisse oder unklare Rollen wirken wie eine Bremse? Ihr wollt Höchstleistung nicht durch Druck, sondern durch sauberes Zusammenspiel?",
        "approach": "Synergie-Workshops & Rollenklärung. Wir machen Unausgesprochenes sichtbar und lösen unterschwellige Spannungen. Ziele werden präzisiert, die Zusammenarbeit neu ausgerichtet.",
        "format": "Teamentwicklung & Konfliktlösung.",
        "result": "Spürbar höhere Effektivität. Weniger Abstimmungsschleifen, stabilere Ergebnisse. Das Miteinander gewinnt an Leichtigkeit und Zugkraft."
      }
    ]
  }
}'::jsonb, 15, true)

ON CONFLICT (section) DO UPDATE SET
  content = EXCLUDED.content,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  updated_at = now();