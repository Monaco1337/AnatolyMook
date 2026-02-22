/*
  # Event Details Management System

  1. New Tables
    - `event_agenda_items`
      - `id` (uuid, primary key)
      - `event_id` (uuid, references home_events)
      - `time_slot` (text) - e.g., "09:00 - 10:30"
      - `title` (text)
      - `description` (text)
      - `display_order` (integer)
      - Timestamps

    - `event_benefits`
      - `id` (uuid, primary key)
      - `event_id` (uuid, references home_events)
      - `benefit_text` (text)
      - `icon_name` (text) - e.g., "CheckCircle"
      - `display_order` (integer)
      - Timestamps

    - `event_testimonials`
      - `id` (uuid, primary key)
      - `event_id` (uuid, references home_events)
      - `author_name` (text)
      - `author_image` (text)
      - `content` (text)
      - `rating` (integer) - 1-5 stars
      - `date_text` (text) - e.g., "2 Tage her"
      - `is_approved` (boolean)
      - `display_order` (integer)
      - Timestamps

    - `event_meta`
      - `id` (uuid, primary key)
      - `event_id` (uuid, references home_events, unique)
      - `event_date` (text) - display text like "Nach Vereinbarung"
      - `event_location` (text)
      - `event_format` (text) - "Live & Interaktiv"
      - `detail_description` (text) - extended description for detail view
      - `cta_button_text` (text)
      - `cta_button_link` (text)
      - Timestamps

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin users

  3. Important Notes
    - All tables reference home_events via event_id
    - display_order controls the order of items
    - event_meta has a unique constraint on event_id (one meta per event)
*/

-- Event Agenda Items
CREATE TABLE IF NOT EXISTS event_agenda_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES home_events(id) ON DELETE CASCADE,
  time_slot text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE event_agenda_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage event agenda items"
  ON event_agenda_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can view event agenda items"
  ON event_agenda_items
  FOR SELECT
  TO anon
  USING (true);

-- Event Benefits
CREATE TABLE IF NOT EXISTS event_benefits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES home_events(id) ON DELETE CASCADE,
  benefit_text text NOT NULL DEFAULT '',
  icon_name text DEFAULT 'CheckCircle',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE event_benefits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage event benefits"
  ON event_benefits
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can view event benefits"
  ON event_benefits
  FOR SELECT
  TO anon
  USING (true);

-- Event Testimonials
CREATE TABLE IF NOT EXISTS event_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES home_events(id) ON DELETE CASCADE,
  author_name text NOT NULL DEFAULT '',
  author_image text DEFAULT '',
  content text NOT NULL DEFAULT '',
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  date_text text DEFAULT 'Kürzlich',
  is_approved boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE event_testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage event testimonials"
  ON event_testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can view approved event testimonials"
  ON event_testimonials
  FOR SELECT
  TO anon
  USING (is_approved = true);

-- Event Meta
CREATE TABLE IF NOT EXISTS event_meta (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES home_events(id) ON DELETE CASCADE UNIQUE,
  event_date text DEFAULT 'Nach Vereinbarung',
  event_location text DEFAULT 'Online & Präsenz',
  event_format text DEFAULT 'Live & Interaktiv',
  detail_description text DEFAULT '',
  detail_description_extended text DEFAULT '',
  cta_button_text text DEFAULT 'Jetzt Anmelden',
  cta_button_link text DEFAULT '#contact',
  overview_section_title text DEFAULT 'Über das Event',
  benefits_section_title text DEFAULT 'Was du bekommst',
  agenda_section_title text DEFAULT 'Tagesablauf',
  testimonials_section_title text DEFAULT 'Teilnehmer-Feedback',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE event_meta ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage event meta"
  ON event_meta
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can view event meta"
  ON event_meta
  FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_event_agenda_items_event_id ON event_agenda_items(event_id);
CREATE INDEX IF NOT EXISTS idx_event_benefits_event_id ON event_benefits(event_id);
CREATE INDEX IF NOT EXISTS idx_event_testimonials_event_id ON event_testimonials(event_id);
CREATE INDEX IF NOT EXISTS idx_event_meta_event_id ON event_meta(event_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_event_agenda_items_updated_at') THEN
    CREATE TRIGGER update_event_agenda_items_updated_at
      BEFORE UPDATE ON event_agenda_items
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_event_benefits_updated_at') THEN
    CREATE TRIGGER update_event_benefits_updated_at
      BEFORE UPDATE ON event_benefits
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_event_testimonials_updated_at') THEN
    CREATE TRIGGER update_event_testimonials_updated_at
      BEFORE UPDATE ON event_testimonials
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_event_meta_updated_at') THEN
    CREATE TRIGGER update_event_meta_updated_at
      BEFORE UPDATE ON event_meta
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
