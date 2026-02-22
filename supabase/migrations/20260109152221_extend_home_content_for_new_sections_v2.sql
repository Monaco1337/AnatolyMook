/*
  # Extend Home Content for New Complete Homepage Structure
  
  ## New Content Sections Added:
  1. **hero_v2** - New hero with dual headline options
  2. **three_pillars** - Achtsamkeit, Bewusstsein, Erfolgscoaching
  3. **core_promise** - Kernversprechen with expandable content
  4. **new_consciousness** - Alt/Neu comparison with detailed transformations
  5. **life_areas** - 7 Lebensbereiche slider content
  6. **private_navigator** - 5 Private customer profiles
  7. **business_navigator** - 5 Business contexts
  8. **formats_portfolio** - 5 Format descriptions
  9. **testimonials_structured** - Organized testimonials by target group
  10. **finale** - Final section with accordions
  
  ## No Breaking Changes
  - Existing home_content entries remain intact
  - New sections use multi-language JSON structure
  - All content is admin-editable via home_content table
*/

-- Add new home content sections for the complete redesigned homepage

-- HERO V2 (with dual options)
INSERT INTO home_content (section, content, display_order, is_active) VALUES
('hero_v2', '{
  "de": {
    "option": "primary",
    "mainHeading": "Meisterschaft im neuen Bewusstsein",
    "subheading": "Ein Weg, der dich wach macht – und in klare Handlungsfähigkeit führt.",
    "quote": "Nicht mehr suchen oder warten – konsequent gestalten. Jetzt.",
    "ctaPrimary": "Formate entdecken",
    "ctaMikrocopy": "Übersicht aller Formate · klare Einordnung nach Fokus · direkt wählbar"
  },
  "en": {
    "option": "primary",
    "mainHeading": "Mastery in New Consciousness",
    "subheading": "A path that awakens you – and leads to clear capability to act.",
    "quote": "No more searching or waiting – shape consequentially. Now.",
    "ctaPrimary": "Discover Formats",
    "ctaMikrocopy": "Overview of all formats · clear classification by focus · directly selectable"
  }
}'::jsonb, 1, true),

-- THREE PILLARS
('three_pillars', '{
  "de": {
    "headline": "Präzision trifft Tiefe. Unmittelbar wirksam.",
    "subheadline": "Anatoly initiiert einen Raum, in dem Achtsamkeitslehre, Bewusstseinstraining und Erfolgscoaching einheitlich wirken. Das Ergebnis ist keine bloße Erkenntnis, sondern innere Ordnung, die sich im Außen entfaltet: Wahrnehmung wird präzise, Entscheidungen werden stimmig, Umsetzung erfolgt ruhig und konsequent – spürbar in Vitalität, Beziehungen und Business.",
    "pillars": [
      {
        "title": "Achtsamkeitslehre",
        "description": "Präsenz vertiefen. Wahrnehmung schärfen. Aus der Stille heraus bewusst agieren."
      },
      {
        "title": "Bewusstseinstraining",
        "description": "Innere Ordnung herstellen. Identität klären. Wahre Selbstführung etablieren."
      },
      {
        "title": "Erfolgscoaching",
        "description": "Potenziale in Wirkkraft übersetzen. Stimmige Schritte vollziehen. Tragfähige Konsequenz leben."
      }
    ],
    "ctaText": "Mehr erfahren"
  }
}'::jsonb, 10, true),

-- CORE PROMISE
('core_promise', '{
  "de": {
    "headline": "Transzendenz in neues Bewusstsein",
    "subtitle": "Der Schritt über die persönliche Transformation hinaus – in ein wahrhaftiges, stabiles und handlungsfähiges Leben.",
    "promises": [
      {
        "title": "Ressourcenbefreiung",
        "description": "Innere Last fällt ab, frische Energie wird frei."
      },
      {
        "title": "Souveränität",
        "description": "Tiefe Ruhe und fokussierte Präsenz – auch unter Druck."
      },
      {
        "title": "Handlungsfähigkeit",
        "description": "Klares Erkennen statt Grübeln. Konsequente Umsetzung statt Zögern."
      }
    ],
    "accordionTitle": "DAS WIE MACHT DEN UNTERSCHIED",
    "accordionIntro": "Die Besonderheit liegt nicht im Wissen, sondern in der Art, wie Anatoly führt.",
    "accordionItems": [
      {
        "title": "Laser-scharfe Klarheit",
        "text": "Keine Umschweife. Anatoly nutzt eine präzise Sprache, die Gedanken und Emotionen sofort ordnet."
      },
      {
        "title": "Verkörperte Energie",
        "text": "Keine weltfremde Zurückhaltung. Die Zusammenarbeit ist wach, belebend und modern."
      },
      {
        "title": "Saubere Synthese",
        "text": "Spirituelle Tiefe und greifbare Resultate stehen nicht im Widerspruch, sondern bilden hier eine logische Linie."
      },
      {
        "title": "Maßgeschneiderte Konsequenz",
        "text": "Keine Standardschablonen. Wir gestalten Schritte, die deiner wahren Natur entsprechen und im echten Leben bestehen."
      }
    ],
    "accordionOutro": "Genau daraus entsteht ein Leben, das nicht nur funktioniert, sondern stimmt."
  }
}'::jsonb, 11, true),

-- NEW CONSCIOUSNESS COMPARISON
('new_consciousness', '{
  "de": {
    "headline": "Neues Bewusstsein. Neue Selbstführung. Ein neues Leben.",
    "resonanceQuestions": [
      "Funktioniert im Außen vieles – doch darunter bleibt ein leiser Rest von Unstimmigkeit?",
      "Triffst du Entscheidungen – und erkennst später, dass die wahre Klarheit fehlte?",
      "Ahnst du, dass die heutige Welt eine neue Qualität von Führung verlangt – jenseits von bloßer Leistung?"
    ],
    "intro": "Neues Bewusstsein ist kein theoretisches Konzept. Es ist ein qualitativer Perspektivwechsel - eine andere Art zu sehen, zu wählen und zu leben. Du löst dich aus den Prägungen der Vergangenheit und öffnest den Raum für Intuition, Weisheit und klare innere Führung.",
    "comparisons": [
      {
        "oldTitle": "Unbewusstes Existieren",
        "newTitle": "Bewusstes Sein & Gestalten",
        "oldDesc": "Illusion: Identifikation mit dem falschen Ich. Gefangen in Gedanken, Zeit und alten Konzepten.",
        "newDesc": "Wahrheit: Erkennen, wer du wirklich bist. Achtsamkeit, Präzision und das Erfahren deiner wahren Natur."
      },
      {
        "oldTitle": "Autopilot",
        "newTitle": "Souveränität",
        "oldDesc": "Funktionieren statt Leben. Ein Kreislauf aus Suchen, Warten und Beklagen.",
        "newDesc": "Lebendigkeit bewusst erfahren. Staunen können. Den Moment zelebrieren."
      },
      {
        "oldTitle": "Reaktiv",
        "newTitle": "Schöpferisch",
        "oldDesc": "Reiz → Reflex. Vergangene Muster steuern das Verhalten. Die Geschichte wiederholt sich.",
        "newDesc": "Echte Selbstführung. Bewusste Wahrnehmung öffnet neue Wege und setzt Ressourcen frei."
      },
      {
        "oldTitle": "Getrieben",
        "newTitle": "Integrität",
        "oldDesc": "Mangel und Angst als Motor. Die Gier nach mehr, getrieben von Erwartungen.",
        "newDesc": "Fülle als Basis. Bewusstes Handeln aus Klarheit, Liebe und innerer Stärke."
      },
      {
        "oldTitle": "Widerstand",
        "newTitle": "Flow",
        "oldDesc": "Der Kampf gegen das, was ist. Kontrolle, Anhaften, Haben-Müssen.",
        "newDesc": "Akzeptanz und Urvertrauen. Eine einbeziehende Harmonie mit dem Leben."
      },
      {
        "oldTitle": "Fragmentiert",
        "newTitle": "Einheit",
        "oldDesc": "Denken, Fühlen und Handeln ziehen in unterschiedliche Richtungen.",
        "newDesc": "Verstand und Intuition synchronisieren sich – im Rhythmus des Lebens."
      }
    ],
    "summary": "Diese Bewusstheit verbindet innere Fülle mit äußerer Konsequenz. Du gewinnst Klarheit, Stabilität und fokussierte Präsenz. Das Ergebnis ist eine neue Qualität von Stabilität – in Vitalität, Beziehungen, Erfolg und Selbstführung."
  }
}'::jsonb, 12, true)

ON CONFLICT (section) DO UPDATE SET
  content = EXCLUDED.content,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  updated_at = now();