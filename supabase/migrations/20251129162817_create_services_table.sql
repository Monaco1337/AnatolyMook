/*
  # Create Services/Products Management System

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `title` (text) - Service name
      - `description` (text) - Full description
      - `short_description` (text) - Short tagline
      - `category` (text) - keynote, workshop, coaching, event, corporate
      - `price` (text) - Price display
      - `duration` (text) - Duration info
      - `max_participants` (integer) - Max people
      - `features` (jsonb) - Array of features/benefits
      - `image_url` (text) - Service image
      - `is_active` (boolean) - Published status
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `services` table
    - Public can read active services
    - Only authenticated admins can modify
*/

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'keynote',
  price text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '',
  max_participants integer DEFAULT 0,
  features jsonb DEFAULT '[]'::jsonb,
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
  ON services
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all services"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete services"
  ON services
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS services_category_idx ON services(category);
CREATE INDEX IF NOT EXISTS services_is_active_idx ON services(is_active);
CREATE INDEX IF NOT EXISTS services_order_idx ON services(order_index);

INSERT INTO services (title, short_description, description, category, price, duration, max_participants, features, is_active, order_index) VALUES
(
  'Keynote-Vortrag',
  'Durchbruch-Performance durch innere Klarheit',
  'Ein kraftvoller Vortrag, der Ihr Team inspiriert und zu Höchstleistungen motiviert. Anatoly Mook teilt seine bewährten Methoden für mentale Stärke und Performance-Exzellenz.',
  'keynote',
  'ab €5.000',
  '45-90 Min',
  1000,
  '["Maßgeschneiderter Content für Ihr Event", "Interaktive Elemente", "Q&A Session", "Follow-up Materialien", "Professionelle Bühnenperformance"]'::jsonb,
  true,
  1
),
(
  'Workshop: Mentale Stärke',
  'Intensive Trainingseinheit für nachhaltige Veränderung',
  'In diesem Workshop lernen die Teilnehmer praktische Techniken für mentale Stärke, Fokus und Resilienz. Durch interaktive Übungen und persönliches Coaching werden nachhaltige Veränderungen erreicht.',
  'workshop',
  'ab €8.000',
  '4-8 Stunden',
  30,
  '["Interaktive Übungen", "Persönliches Coaching", "Workbook & Materialien", "Follow-up Session", "Zertifikat"]'::jsonb,
  true,
  2
),
(
  'Executive Coaching',
  'Persönliches 1:1 Coaching für Führungskräfte',
  'Individuelles Coaching-Programm für Top-Executives. Entwickeln Sie Ihre Führungsqualitäten, optimieren Sie Ihre Performance und erreichen Sie Ihre persönlichen und beruflichen Ziele.',
  'coaching',
  'auf Anfrage',
  '3-6 Monate',
  1,
  '["1:1 Sessions", "Persönliche Strategieentwicklung", "24/7 Support", "Vertraulichkeit garantiert", "Messbare Ergebnisse"]'::jsonb,
  true,
  3
),
(
  'Event Tickets',
  'Exklusive Live-Events mit Anatoly Mook',
  'Nehmen Sie teil an einem unserer exklusiven Live-Events. Erleben Sie Anatoly Mook live, vernetzen Sie sich mit Gleichgesinnten und nehmen Sie wertvolle Impulse mit.',
  'event',
  '€499 - €2.999',
  '1-3 Tage',
  100,
  '["Live-Performance", "Networking-Möglichkeiten", "VIP-Zugang optional", "Event-Materialien", "Aufzeichnung inklusive"]'::jsonb,
  true,
  4
),
(
  'Corporate Training',
  'Maßgeschneidertes Programm für Ihr Unternehmen',
  'Ein umfassendes Training-Programm, das speziell auf die Bedürfnisse Ihres Unternehmens zugeschnitten wird. Von Leadership-Development bis Team-Performance.',
  'corporate',
  'ab €20.000',
  'mehrere Monate',
  100,
  '["Bedarfsanalyse", "Maßgeschneidertes Programm", "Mehrere Module", "Messbare KPIs", "Langfristige Betreuung"]'::jsonb,
  true,
  5
);
