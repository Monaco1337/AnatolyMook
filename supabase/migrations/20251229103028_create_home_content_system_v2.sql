/*
  # Home Content Management System

  1. New Tables
    - `home_content`
      - `id` (uuid, primary key)
      - `section` (text) - Section identifier
      - `content` (jsonb) - Flexible JSON structure for section content
      - `is_active` (boolean) - Whether section is visible
      - `display_order` (integer) - Order of sections
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `home_news_boxes`
      - `id` (uuid, primary key)
      - `title` (text) - Box title
      - `description` (text) - Box description
      - `icon_name` (text) - Lucide icon name
      - `gradient_from` (text) - Gradient start color
      - `gradient_to` (text) - Gradient end color
      - `target_section` (text) - Section to navigate to
      - `button_text` (text) - CTA button text
      - `button_color` (text) - Button text color
      - `is_active` (boolean)
      - `display_order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `home_events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subtitle` (text)
      - `description` (text)
      - `image_url` (text)
      - `event_type` (text) - Type: keynote, workshop, seminar
      - `gradient_from` (text)
      - `gradient_to` (text)
      - `is_active` (boolean)
      - `display_order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin users to manage content
*/

-- Create home_content table
CREATE TABLE IF NOT EXISTS home_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL UNIQUE,
  content jsonb NOT NULL DEFAULT '{}',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create home_news_boxes table
CREATE TABLE IF NOT EXISTS home_news_boxes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon_name text DEFAULT 'Calendar',
  gradient_from text DEFAULT 'yellow-500',
  gradient_to text DEFAULT 'orange-500',
  target_section text NOT NULL,
  button_text text DEFAULT 'Mehr erfahren',
  button_color text DEFAULT 'yellow-400',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create home_events table
CREATE TABLE IF NOT EXISTS home_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text,
  image_url text,
  event_type text DEFAULT 'keynote',
  gradient_from text DEFAULT 'yellow-400',
  gradient_to text DEFAULT 'orange-500',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_news_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_events ENABLE ROW LEVEL SECURITY;

-- Policies for home_content
CREATE POLICY "Anyone can view active home content"
  ON home_content FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage home content"
  ON home_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for home_news_boxes
CREATE POLICY "Anyone can view active news boxes"
  ON home_news_boxes FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage news boxes"
  ON home_news_boxes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for home_events
CREATE POLICY "Anyone can view active events"
  ON home_events FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage events"
  ON home_events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default news boxes
INSERT INTO home_news_boxes (title, description, icon_name, gradient_from, gradient_to, target_section, button_text, button_color, display_order) VALUES
('Events & Seminare', 'Intensive Workshops für echte Transformation und nachhaltigen Wandel.', 'Calendar', 'yellow-500', 'orange-500', 'events', 'Mehr erfahren', 'yellow-400', 1),
('1:1 Coaching', 'Individuelle Begleitung für deine persönliche Entwicklung.', 'Zap', 'blue-500', 'purple-500', 'coaching', 'Pakete ansehen', 'blue-400', 2),
('Blog & Insights', 'Gedanken, Impulse und Perspektiven zur inneren Entwicklung.', 'Book', 'green-500', 'teal-500', 'blog', 'Weiterlesen', 'green-400', 3);

-- Insert default events
INSERT INTO home_events (title, subtitle, description, event_type, gradient_from, gradient_to, display_order) VALUES
('BUSINESS MASTERY', 'Von der Vision zur unaufhaltsamen Umsetzung', 'Führende Unternehmen transformieren durch bewusste Präsenz', 'keynote', 'yellow-400', 'orange-500', 1),
('LEADERSHIP', 'Führen durch Präsenz und authentische Autorität', 'Entwickle die innere Stabilität für wahre Führungskraft', 'keynote', 'blue-400', 'purple-500', 2);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_home_content_updated_at ON home_content;
CREATE TRIGGER update_home_content_updated_at
  BEFORE UPDATE ON home_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_home_news_boxes_updated_at ON home_news_boxes;
CREATE TRIGGER update_home_news_boxes_updated_at
  BEFORE UPDATE ON home_news_boxes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_home_events_updated_at ON home_events;
CREATE TRIGGER update_home_events_updated_at
  BEFORE UPDATE ON home_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
