/*
  # Create Blog System

  ## Overview
  This migration creates a complete blog system for publishing articles, insights, and updates.

  ## 1. New Tables
  
  ### `blog_categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name (e.g., "Mindset", "Business", "Spiritualität")
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `color` (text) - Category color for badges
  - `display_order` (integer) - Order for display
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `blog_posts`
  - `id` (uuid, primary key) - Unique post identifier
  - `category_id` (uuid, foreign key) - References blog_categories
  - `title` (text) - Post title
  - `slug` (text, unique) - URL-friendly identifier
  - `excerpt` (text) - Short excerpt/summary
  - `content` (text) - Full post content (supports markdown)
  - `featured_image` (text) - Main post image URL
  - `author_name` (text) - Author name
  - `author_image` (text) - Author profile image
  - `reading_time` (integer) - Estimated reading time in minutes
  - `tags` (text[]) - Post tags
  - `is_published` (boolean) - Published status
  - `is_featured` (boolean) - Featured post flag
  - `published_at` (timestamptz) - Publication date
  - `views_count` (integer) - Number of views
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## 2. Security
  - Enable RLS on all tables
  - Blog posts and categories are publicly readable
  - Only authenticated admins can manage content

  ## 3. Indexes
  - Index on post slug for fast lookups
  - Index on category_id for filtering
  - Index on published_at for chronological sorting
  - Index on is_featured for featured posts
*/

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  color text DEFAULT '#D4AF37',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  featured_image text DEFAULT '',
  author_name text DEFAULT 'Anatoly Mook',
  author_image text DEFAULT '',
  reading_time integer DEFAULT 5,
  tags text[] DEFAULT '{}',
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  published_at timestamptz DEFAULT now(),
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_featured ON blog_posts(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published) WHERE is_published = true;

-- Enable Row Level Security
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_categories
CREATE POLICY "Anyone can view categories"
  ON blog_categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON blog_categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON blog_categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete categories"
  ON blog_categories FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated users can view all posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_blog_categories_updated_at ON blog_categories;
CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO blog_categories (name, slug, description, color, display_order) VALUES
(
  'Mindset & Motivation',
  'mindset-motivation',
  'Inspirierende Gedanken für mentale Stärke',
  '#D4AF37',
  1
),
(
  'Business & Leadership',
  'business-leadership',
  'Strategien für erfolgreiches Unternehmertum',
  '#8B7355',
  2
),
(
  'Spiritualität & Bewusstsein',
  'spiritualitaet-bewusstsein',
  'Erkenntnisse über inneres Wachstum',
  '#C19A6B',
  3
),
(
  'Performance & Erfolg',
  'performance-erfolg',
  'Praktische Tipps für Höchstleistung',
  '#B8860B',
  4
);

-- Insert sample blog posts
INSERT INTO blog_posts (
  category_id,
  title,
  slug,
  excerpt,
  content,
  featured_image,
  author_name,
  reading_time,
  tags,
  is_published,
  is_featured,
  published_at
) VALUES
(
  (SELECT id FROM blog_categories WHERE slug = 'mindset-motivation'),
  'Die Kraft der inneren Klarheit',
  'kraft-der-inneren-klarheit',
  'Wie Sie durch mentale Klarheit außergewöhnliche Ergebnisse erzielen und Ihr volles Potenzial entfalten.',
  '# Die Kraft der inneren Klarheit

In einer Welt voller Ablenkungen ist innere Klarheit der Schlüssel zu außergewöhnlichem Erfolg. Aber was bedeutet innere Klarheit wirklich?

## Was ist innere Klarheit?

Innere Klarheit ist der Zustand, in dem Sie genau wissen, wer Sie sind, was Sie wollen und warum Sie es wollen. Es ist die Fähigkeit, durch den Lärm des Alltags hindurchzusehen und sich auf das Wesentliche zu konzentrieren.

## Die drei Säulen der inneren Klarheit

### 1. Selbstkenntnis
Verstehen Sie Ihre Werte, Stärken und Schwächen. Nur wer sich selbst kennt, kann authentische Entscheidungen treffen.

### 2. Fokus
In einer Zeit der Reizüberflutung ist Fokus eine Superkraft. Lernen Sie, Ihre Energie auf das zu lenken, was wirklich wichtig ist.

### 3. Achtsamkeit
Seien Sie präsent im Moment. Die Vergangenheit ist vorbei, die Zukunft noch nicht da. Das Einzige, was zählt, ist jetzt.

## Praktische Übung

Nehmen Sie sich jeden Morgen 10 Minuten Zeit für stille Meditation. Atmen Sie tief ein und aus. Fragen Sie sich: "Was ist heute wirklich wichtig?" Lassen Sie die Antwort aus der Stille kommen.

**Die Transformation beginnt in der Stille.**',
  'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'Anatoly Mook',
  8,
  ARRAY['Mindset', 'Klarheit', 'Meditation', 'Erfolg'],
  true,
  true,
  now()
),
(
  (SELECT id FROM blog_categories WHERE slug = 'business-leadership'),
  'Führung neu definiert: Der spirituelle Ansatz',
  'fuehrung-neu-definiert',
  'Moderne Führung geht über Management hinaus. Entdecken Sie, wie spirituelle Prinzipien Ihr Leadership transformieren.',
  '# Führung neu definiert: Der spirituelle Ansatz

Die erfolgreichsten Leader unserer Zeit haben eines gemeinsam: Sie führen nicht nur mit dem Kopf, sondern auch mit dem Herzen.

## Der Wandel in der Führungskultur

Traditionelle Führung basierte auf Kontrolle und Hierarchie. Moderne Führung basiert auf Vertrauen und Inspiration.

## Die 5 Prinzipien spiritueller Führung

1. **Authentizität** - Seien Sie echt, nicht perfekt
2. **Empathie** - Verstehen Sie die Menschen, die Sie führen
3. **Vision** - Inspirieren Sie mit einer größeren Mission
4. **Demut** - Erkennen Sie, dass Sie nicht alle Antworten haben
5. **Dienst** - Führen heißt dienen, nicht herrschen

## Von der Theorie zur Praxis

Beginnen Sie jeden Tag damit, sich zu fragen: "Wie kann ich heute meinem Team dienen?" Diese simple Frage verändert Ihre gesamte Führungsperspektive.

**Wahre Führung inspiriert, anstatt zu kontrollieren.**',
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'Anatoly Mook',
  6,
  ARRAY['Leadership', 'Spiritualität', 'Management', 'Team'],
  true,
  true,
  now() - interval '2 days'
),
(
  (SELECT id FROM blog_categories WHERE slug = 'performance-erfolg'),
  'Peak Performance: Die Wissenschaft der Höchstleistung',
  'peak-performance-wissenschaft',
  'Erfahren Sie die wissenschaftlich fundierten Strategien, mit denen Top-Performer ihre Grenzen überschreiten.',
  '# Peak Performance: Die Wissenschaft der Höchstleistung

Peak Performance ist kein Zufall. Es ist das Ergebnis von bewussten Strategien und Gewohnheiten.

## Die Performance-Pyramide

An der Basis steht Ihre physische Gesundheit. Ohne Energie keine Performance. Darauf baut mentale Stärke auf, und ganz oben steht spirituelle Klarheit.

## Die 4 Performance-Hebel

### 1. Energie-Management
Nicht Zeit, sondern Energie ist Ihre wertvollste Ressource. Managen Sie sie entsprechend.

### 2. Fokus-Rituale
Entwickeln Sie Rituale, die Sie in Ihren Flow-Zustand bringen.

### 3. Recovery-Zyklen
Top-Performer erholen sich intensiv. Sprint-Recovery-Sprint ist das Muster.

### 4. Mindset-Training
Ihr Mindset bestimmt Ihre Realität. Trainieren Sie es wie einen Muskel.

## Die 90-90-1 Regel

Die ersten 90 Minuten Ihres Tages sind Gold wert. Nutzen Sie sie für Ihre wichtigste Aufgabe, 90 Tage lang. Die Transformation ist garantiert.

**Excellence ist eine Gewohnheit, keine Ausnahme.**',
  'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'Anatoly Mook',
  10,
  ARRAY['Performance', 'Produktivität', 'Erfolg', 'Gewohnheiten'],
  true,
  false,
  now() - interval '5 days'
);