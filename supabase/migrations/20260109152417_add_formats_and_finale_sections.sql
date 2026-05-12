/*
  # Add Formats Portfolio and Finale Sections
  
  ## Sections Added:
  1. formats_portfolio - 5 format types with descriptions
  2. finale - Final section with accordions and signature
*/

-- FORMATS PORTFOLIO (5 Formats)
INSERT INTO home_content (section, content, display_order, is_active) VALUES
('formats_portfolio', '{
  "de": {
    "headline": "Architektur der Transformation",
    "subline": "Alle Formate folgen derselben Logik: Präsenz stabilisieren, innere Ordnung klären, Umsetzung verankern. Wähle den Zugang, der deinem Kontext dient.",
    "formats": [
      {
        "id": "live-events",
        "title": "LIVE-EVENTS & SEMINARE",
        "focus": "Präsenz-Seminare und Live-Events. Hier wird Erkenntnis nicht nur verstanden, sondern physisch erfahren und direkt verkörpert.",
        "signature": "Der Raum wirkt. Du tauchst in ein starkes Resonanzfeld ein. Die Gruppendynamik und die unmittelbare Energieübertragung ermöglichen ein Andocken an einen neuen Seinszustand – schneller, als es der Verstand allein könnte.",
        "result": "Spürbare Vitalität. Ein sauberer Selbstkontakt. Beziehungen und Alltag verlieren ihre Hektik und werden ruhiger, tiefer und konsequenter geführt.",
        "ctaText": "Termine ansehen",
        "ctaSubtext": "Einstieg wählen · Platz sichern"
      },
      {
        "id": "online-academy",
        "title": "ONLINE-AKADEMIE",
        "focus": "Digitale Pfade und Kurse für klare Neuordnung. Modular aufgebaut, präzise strukturiert und exakt für die Integration im Alltag konzipiert.",
        "signature": "Maximale Autonomie. Du gestaltest deine Entwicklung ortsunabhängig und ohne Reiseaufwand. Der Einstieg ist direkter, das Tempo bestimmst du – ideal für kontinuierliche Vertiefung.",
        "result": "Fokus verdrängt Zerstreuung. Innere Ordnung ersetzt Druck. Deine Präsenz stabilisiert sich Schritt für Schritt, die Umsetzung wird verlässlich.",
        "ctaText": "Academy starten",
        "ctaSubtext": "Programm wählen · direkt beginnen"
      },
      {
        "id": "coaching-1on1",
        "title": "EXKLUSIVES COACHING (1:1)",
        "focus": "Die intensivste Form der Zusammenarbeit. Exklusive 1:1 Begleitung für Menschen, die maximale Verdichtung und kompromisslose Führung suchen.",
        "signature": "Intim und maßgeschneidert. Wir leuchten blinde Flecken aus und klären Kernfragen ohne Umwege. Durch die direkte Übertragung des Bewusstseinszustands entstehen Ergebnisse, die jenseits linearer Planung liegen.",
        "result": "Unerschütterliche Stabilität – auch unter Druck. Stimmige Konsequenz und eine neue Wirkkraft in allen Bereichen: Beziehung, Vermögen, Erfolg und Selbstführung.",
        "ctaText": "Erstgespräch buchen",
        "ctaSubtext": "Standortklärung · Passung prüfen"
      },
      {
        "id": "keynotes",
        "title": "KEYNOTES & IMPULSE",
        "focus": "Bühnenformate, die Orientierung geben. Impulse, die den Raum sofort ordnen und das Publikum nicht nur informieren, sondern berühren.",
        "signature": "Keine reine Wissensvermittlung. Anatoly spricht eine Sprache mit Schnitt: modern, energetisch und würdevoll. Inspiration trifft auf tiefe Einsicht.",
        "result": "Zuhörer werden wach, fokussiert und handlungsfähig. Die Verantwortung steigt, Prioritäten klären sich. Ideal als energetischer Auftakt für Transformation oder Strategiewechsel.",
        "ctaText": "Keynote anfragen",
        "ctaSubtext": "Rahmen klären · Optionen erhalten"
      },
      {
        "id": "tools",
        "title": "ALLTAGS-TOOLS & PRAXIS",
        "focus": "Audios, Programme und kompakte Werkzeuge für die tägliche Verankerung. Kurz, präzise und sofort nutzbar.",
        "signature": "Niedrige Einstiegshürde, hohe Integration. Ob Morgenroutine oder Abend-Reset: Hier wird Präsenz trainierbar, ohne künstlichen Aufwand.",
        "result": "Weniger inneres Rauschen. Mehr Richtung. Du schaffst eine stabile Basis für Vitalität und Beziehung, die auch im stressigen Alltag hält.",
        "ctaText": "Tools entdecken",
        "ctaSubtext": "Passendes Tool finden · loslegen"
      }
    ]
  }
}'::jsonb, 16, true),

-- FINALE SECTION
('finale', '{
  "de": {
    "headline": "Der Anfang deiner Meisterschaft.",
    "subheadline": "Bereit für neue innere Ordnung – und eine Wirksamkeit, die im Außen trägt?",
    "bodyText": "Für Menschen, die nicht mehr suchen oder warten wollen, sondern konsequent gestalten. Wenn du spürst, dass die Zeit für eine klare Neuordnung reif ist, dann wähle jetzt deinen Einstieg. Kein Vielleicht mehr. Sondern ein klares Ja zu dem, was möglich ist.",
    "accordions": [
      {
        "title": "3 EBENEN DER TRANSZENDENZ",
        "items": [
          {
            "title": "Vitalität als Fundament",
            "description": "Energie wird wieder verfügbar. Dein Körper wird zum stabilen Träger von Präsenz, Ausstrahlung und echter Lebendigkeit."
          },
          {
            "title": "Klarheit im Geist",
            "description": "Gesammelte Aufmerksamkeit. Fokus. Saubere Entscheidungen und stimmige Konsequenz – weniger Reibung, mehr Wirksamkeit."
          },
          {
            "title": "Essenz im Inneren",
            "description": "Friedvolle Harmonie. Verbundenheit. Wahrhaftigkeit. Dein Handeln entspringt der Fülle und einem echten Enthusiasmus."
          }
        ]
      },
      {
        "title": "5 QUALITÄTEN, DIE SICH ENTFALTEN",
        "items": [
          {
            "title": "Mut & Urvertrauen",
            "description": "statt Mangelsteuerung."
          },
          {
            "title": "Wache Achtsamkeit",
            "description": "statt Autopilot."
          },
          {
            "title": "Innere Stabilität",
            "description": "statt Reiz-Reaktion."
          },
          {
            "title": "Verbundenheit",
            "description": "statt Kampf und Widerstand."
          },
          {
            "title": "Handeln aus Fülle",
            "description": "statt aus Angst."
          }
        ]
      }
    ],
    "signature": {
      "author": "ANATOLY MOOK",
      "quote": "Selbstverwirklichung ist kein ferner Traum, sondern ein stabiler Seinszustand – mehr Lebendigkeit, mehr Freiheit, den Moment wirklich zu leben. Dein Weg wird authentisch – deiner wahren Natur entsprechend. Und genau daraus entsteht ein wahrhaftiges, stabiles und handlungsfähiges Leben."
    },
    "ctaPrimary": "Erstgespräch vereinbaren",
    "ctaSubtext": "kostenfrei & unverbindlich · klare Ausrichtung",
    "ctaSecondary": "Formate entdecken",
    "ctaSecondarySubtext": "Seminare · Coaching · Academy"
  }
}'::jsonb, 17, true)

ON CONFLICT (section) DO UPDATE SET
  content = EXCLUDED.content,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  updated_at = now();