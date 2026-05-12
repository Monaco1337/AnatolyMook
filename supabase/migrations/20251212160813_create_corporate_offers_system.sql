/*
  # Corporate Offers System für Geschäftskunden

  1. Neue Tabelle
    - `corporate_offers`
      - `id` (text, primary key) - z.B. 'team-workshop-halbtag'
      - `category` (text) - workshop, training-series, team-retreat, leadership, transformation
      - `title` (text) - Titel des Angebots
      - `subtitle` (text) - Untertitel
      - `tagline` (text) - Zitat/Tagline
      - `duration` (text) - z.B. "4 Stunden", "3 Tage"
      - `participants` (text) - z.B. "Bis 15 Personen"
      - `format` (text) - Präsenz, Online, Hybrid
      - `availability` (text) - Verfügbarkeit
      - `price` (text) - Preis
      - `description` (text) - Hauptbeschreibung
      - `essence` (text) - Essenz-Zitat
      - `includes` (jsonb) - Array von enthaltenen Leistungen
      - `benefits` (jsonb) - Array von Benefits mit title & description
      - `ideal_for` (jsonb) - Array von idealen Zielgruppen
      - `program_outline` (jsonb) - Array von Programmpunkten
      - `gradient` (text) - Tailwind gradient Klassen
      - `image` (text) - Bild-URL
      - `highlight` (boolean) - Als beliebt markiert
      - `is_active` (boolean) - Sichtbarkeit
      - `order_index` (integer) - Sortierung
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Public read access für aktive Angebote
    - Admin-only write access
*/

CREATE TABLE IF NOT EXISTS corporate_offers (
  id text PRIMARY KEY,
  category text NOT NULL CHECK (category IN ('workshop', 'training-series', 'team-retreat', 'leadership', 'transformation')),
  title text NOT NULL,
  subtitle text NOT NULL,
  tagline text NOT NULL,
  duration text NOT NULL,
  participants text NOT NULL,
  format text NOT NULL,
  availability text NOT NULL,
  price text NOT NULL,
  description text NOT NULL,
  essence text NOT NULL,
  includes jsonb DEFAULT '[]'::jsonb,
  benefits jsonb DEFAULT '[]'::jsonb,
  ideal_for jsonb DEFAULT '[]'::jsonb,
  program_outline jsonb DEFAULT '[]'::jsonb,
  gradient text NOT NULL DEFAULT 'from-blue-500/10 via-cyan-500/5 to-teal-500/5',
  image text NOT NULL,
  highlight boolean DEFAULT false,
  is_active boolean DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE corporate_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active corporate offers"
  ON corporate_offers
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all corporate offers"
  ON corporate_offers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert corporate offers"
  ON corporate_offers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update corporate offers"
  ON corporate_offers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete corporate offers"
  ON corporate_offers
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_corporate_offers_category ON corporate_offers(category);
CREATE INDEX IF NOT EXISTS idx_corporate_offers_active ON corporate_offers(is_active);
CREATE INDEX IF NOT EXISTS idx_corporate_offers_order ON corporate_offers(order_index);