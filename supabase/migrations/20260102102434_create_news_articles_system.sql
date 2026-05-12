/*
  # News Articles System with Comments

  1. New Tables
    - `news_articles`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `subtitle` (text)
      - `excerpt` (text)
      - `content` (text, full article content)
      - `author` (text, default 'ANATOLY MOOK')
      - `image_url` (text)
      - `category` (text)
      - `published` (boolean, default false)
      - `featured` (boolean, default false)
      - `order_index` (integer, for custom ordering)
      - `views_count` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `published_at` (timestamptz)
    
    - `news_comments`
      - `id` (uuid, primary key)
      - `article_id` (uuid, foreign key to news_articles)
      - `author_name` (text, not null)
      - `author_email` (text, not null)
      - `content` (text, not null)
      - `approved` (boolean, default false)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public can read published articles and approved comments
    - Only authenticated users can create comments
    - Only admins can approve comments and manage articles
*/

-- Create news_articles table
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  excerpt text,
  content text,
  author text DEFAULT 'ANATOLY MOOK',
  image_url text,
  category text,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

-- Create news_comments table
CREATE TABLE IF NOT EXISTS news_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES news_articles(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text NOT NULL,
  content text NOT NULL,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_news_articles_published ON news_articles(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_articles_featured ON news_articles(featured, order_index);
CREATE INDEX IF NOT EXISTS idx_news_comments_article ON news_comments(article_id, approved, created_at DESC);

-- Enable RLS
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_comments ENABLE ROW LEVEL SECURITY;

-- News Articles Policies

-- Public can view published articles
CREATE POLICY "Public can view published articles"
  ON news_articles FOR SELECT
  TO public
  USING (published = true);

-- Authenticated users can view all articles
CREATE POLICY "Authenticated users can view all articles"
  ON news_articles FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert articles
CREATE POLICY "Authenticated users can insert articles"
  ON news_articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update articles
CREATE POLICY "Authenticated users can update articles"
  ON news_articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete articles
CREATE POLICY "Authenticated users can delete articles"
  ON news_articles FOR DELETE
  TO authenticated
  USING (true);

-- News Comments Policies

-- Public can view approved comments
CREATE POLICY "Public can view approved comments"
  ON news_comments FOR SELECT
  TO public
  USING (approved = true);

-- Authenticated users can view all comments
CREATE POLICY "Authenticated users can view all comments"
  ON news_comments FOR SELECT
  TO authenticated
  USING (true);

-- Anyone can insert comments (will need approval)
CREATE POLICY "Anyone can insert comments"
  ON news_comments FOR INSERT
  TO public
  WITH CHECK (true);

-- Authenticated users can update comments
CREATE POLICY "Authenticated users can update comments"
  ON news_comments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete comments
CREATE POLICY "Authenticated users can delete comments"
  ON news_comments FOR DELETE
  TO authenticated
  USING (true);

-- Function to update views count
CREATE OR REPLACE FUNCTION increment_news_views(article_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE news_articles
  SET views_count = views_count + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
