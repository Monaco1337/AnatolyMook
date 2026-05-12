/*
  # Seminare Management System

  ## Neue Tabellen
    - `seminars`
      - `id` (uuid, primary key) - Eindeutige ID
      - `format` (text) - Format: praesenz, online-live, webinar, on-demand, hybrid
      - `title` (text) - Haupttitel des Seminars
      - `subtitle` (text) - Untertitel/Kategorie
      - `tagline` (text) - Kernaussage/Motto
      - `duration` (text) - Dauer (z.B. "3 Tage Intensiv")
      - `price` (text) - Preis (z.B. "€2.997")
      - `capacity` (text) - Max. Teilnehmer (z.B. "20 Teilnehmer")
      - `dates` (jsonb) - Array von Terminen mit {month, days, year, location, available}
      - `description` (text) - Ausführliche Beschreibung
      - `essence` (text) - Essenz/Kernbotschaft
      - `includes` (jsonb) - Array von enthaltenen Leistungen
      - `transformationen` (jsonb) - Array von Transformationen {von, zu}
      - `module` (jsonb) - Array von Modulen {tag, title, content}
      - `gradient` (text) - CSS-Gradient für Hintergrund
      - `image` (text) - Bild-URL
      - `is_active` (boolean) - Aktiv/Inaktiv Status
      - `order_index` (integer) - Sortierreihenfolge
      - `created_at` (timestamptz) - Erstellungsdatum
      - `updated_at` (timestamptz) - Aktualisierungsdatum

  ## Sicherheit
    - RLS aktiviert für `seminars` Tabelle
    - Policy: Öffentlich lesbar
    - Policy: Nur authentifizierte Admins können erstellen/bearbeiten/löschen
*/

-- Seminare Tabelle erstellen
CREATE TABLE IF NOT EXISTS seminars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  format text NOT NULL CHECK (format IN ('praesenz', 'online-live', 'webinar', 'on-demand', 'hybrid')),
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  capacity text NOT NULL DEFAULT '',
  dates jsonb NOT NULL DEFAULT '[]'::jsonb,
  description text NOT NULL DEFAULT '',
  essence text NOT NULL DEFAULT '',
  includes jsonb NOT NULL DEFAULT '[]'::jsonb,
  transformationen jsonb NOT NULL DEFAULT '[]'::jsonb,
  module jsonb NOT NULL DEFAULT '[]'::jsonb,
  gradient text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS aktivieren
ALTER TABLE seminars ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann Seminare lesen
CREATE POLICY "Anyone can view active seminars"
  ON seminars
  FOR SELECT
  USING (true);

-- Policy: Nur authentifizierte Admins können Seminare erstellen
CREATE POLICY "Authenticated users can create seminars"
  ON seminars
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Nur authentifizierte Admins können Seminare bearbeiten
CREATE POLICY "Authenticated users can update seminars"
  ON seminars
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Nur authentifizierte Admins können Seminare löschen
CREATE POLICY "Authenticated users can delete seminars"
  ON seminars
  FOR DELETE
  TO authenticated
  USING (true);

-- Index für Performance
CREATE INDEX IF NOT EXISTS seminars_format_idx ON seminars(format);
CREATE INDEX IF NOT EXISTS seminars_is_active_idx ON seminars(is_active);
CREATE INDEX IF NOT EXISTS seminars_order_index_idx ON seminars(order_index);
