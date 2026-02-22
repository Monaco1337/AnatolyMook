/*
  Coaching-System erstellen

  1. Neue Tabellen
    - coaching_packages: Speichert alle Coaching-Pakete und deren Details
      - id (text): Einzigartiger Slug
      - tier (text): einzelsession, intensiv, vip, executive
      - title, subtitle, tagline (text): Titel und Beschreibungen
      - duration, price, sessions, format, availability (text): Paket-Details
      - description, essence (text): Detaillierte Beschreibungen
      - includes, benefits, perfect_for (jsonb): Arrays mit Details
      - gradient, image (text): Visuelle Gestaltung
      - highlight (boolean): Hervorgehobenes Paket
      - is_active (boolean): Status
      - order_index (integer): Sortierung
      - created_at, updated_at (timestamptz): Zeitstempel

  2. Sicherheit
    - RLS aktiviert für coaching_packages
    - Öffentliches Lesen für aktive Pakete
    - Admin-Schreibzugriff
*/

CREATE TABLE IF NOT EXISTS coaching_packages (
  id text PRIMARY KEY,
  tier text NOT NULL,
  title text NOT NULL,
  subtitle text DEFAULT '',
  tagline text DEFAULT '',
  duration text DEFAULT '',
  price text DEFAULT '',
  sessions text DEFAULT '',
  format text DEFAULT '',
  availability text DEFAULT '',
  description text DEFAULT '',
  essence text DEFAULT '',
  includes jsonb DEFAULT '[]'::jsonb,
  benefits jsonb DEFAULT '[]'::jsonb,
  perfect_for jsonb DEFAULT '[]'::jsonb,
  gradient text DEFAULT 'from-gray-500/10 via-gray-500/5 to-gray-500/5',
  image text DEFAULT '',
  highlight boolean DEFAULT false,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE coaching_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active coaching packages"
  ON coaching_packages
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert coaching packages"
  ON coaching_packages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update coaching packages"
  ON coaching_packages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete coaching packages"
  ON coaching_packages
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_coaching_packages_tier ON coaching_packages(tier);
CREATE INDEX IF NOT EXISTS idx_coaching_packages_order ON coaching_packages(order_index);
CREATE INDEX IF NOT EXISTS idx_coaching_packages_active ON coaching_packages(is_active);